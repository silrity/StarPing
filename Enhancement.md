# ĐVTT — Enhancement / Code Review

> Kết quả review toàn bộ code 2 repo (StarPing backend + tuvidaihongviet frontend), ngày 07/07/2026.
> Phạm vi: 7 Edge Functions, 9 migrations, các file frontend chính.
> **Đã đối chiếu với LIVE DB ngày 07/07/2026** (dump: `supabase/schema_live_snapshot.sql`) —
> live DB đã được clean RLS sang JWT pattern (01/07) nên nhiều finding ban đầu được điều chỉnh bên dưới.
> Trạng thái: ⬜ chưa làm · ✅ đã xong

---

## 🔴 Bảo mật — sửa trước khi mở đăng ký public

### 1. ⬜ 🟠 (hạ từ 🔴 sau khi soi live DB) Customer tự sửa được cột nhạy cảm trên `users`
**Live policy:** `p_self_update` ON users FOR UPDATE USING (auth.uid() = id) — không WITH CHECK, không giới hạn cột.

**Điều chỉnh sau khi đối chiếu live (07/07):** live RLS đã dùng JWT `app_metadata.role` (không đọc `users.role`), nên tự đổi `role` **không còn leo thang quyền RLS** như đánh giá ban đầu. Nhưng vẫn còn thật:
- Tự set `email_verified = true` → **bypass xác nhận email** (send-nhat-van lọc `email_verified` từ `public.users`) → nhận Nhật Vận không cần verify
- Tự đổi `role`/`is_active` trong `public.users` → gây nhiễu IOT và mọi logic đọc bảng này

**Fix (không đổi):** thu hồi quyền update cột nhạy cảm ở tầng grant:
```sql
REVOKE UPDATE ON public.users FROM authenticated;
GRANT UPDATE (full_name, phone_zalo) ON public.users TO authenticated;
```

### 2. ⬜ Bypass whitelist bằng filter injection
**File:** `supabase/functions/register/index.ts:63`, `check-whitelist/index.ts:41`

Input người dùng nối thẳng vào chuỗi filter PostgREST:
```ts
wq.or(`email.eq.${email},phone_zalo.eq.${phone_zalo}`)
```
Đăng ký với `phone_zalo = "x,email.not.is.null"` → filter match mọi row → `count > 0` → vượt whitelist trong closed beta.

**Fix:** chạy 2 query `.eq()` riêng cho email và phone rồi OR kết quả ở tầng code, hoặc validate chặt format phone/email trước khi nối chuỗi.

### 3. ⬜ SePay webhook "fail-open"
**File:** `supabase/functions/sepay-webhook/index.ts:24`

```ts
if (SEPAY_WEBHOOK_SECRET && incomingKey !== SEPAY_WEBHOOK_SECRET) { ... 401 }
```
Nếu `SEPAY_WEBHOOK_SECRET` chưa set trong Supabase Secrets (SePay còn pending đăng ký nên khả năng cao chưa set) → điều kiện đầu false → **bỏ qua hoàn toàn xác thực**. Ai biết URL đều POST giả payload confirm payment và kích hoạt subscription miễn phí được.

**Fix:** fail-closed — secret chưa cấu hình thì trả 503 + log lỗi, không xử lý.

### 4. ⬜ Ai cũng ghi được audit log
**File:** `supabase/migrations/20260615000003_iot_rls.sql:45` — **đã xác nhận còn nguyên trên live DB (07/07)**

Policy `audit: admin write` thực chất là `WITH CHECK (auth.role() = 'authenticated')` — mọi user đăng nhập đều insert được vào `audit_log`, làm nhiễu/giả mạo audit trail.

**Fix:** giới hạn insert cho staff hoặc chỉ service role.

---

## 🟠 Đúng đắn nghiệp vụ — sẽ gây sự cố khi có khách trả phí

### 5. ⬜ Kích hoạt subscription không set hạn dùng
**File:** `supabase/functions/sepay-webhook/index.ts:101`

Khi confirm payment chỉ set `status='active'` + `paid_start`, **không tính `paid_until`** từ `billing_cycle`, không cập nhật `plan_type` từ payment snapshot. Khách trả 1 tháng nhưng active vô thời hạn; không có gì để cron kiểm tra hết hạn.

### 6. ⬜ Gửi Nhật Vận trùng khi chạy lại
**File:** `supabase/functions/send-nhat-van/index.ts`

Dispatch log dùng upsert "resume" nhưng vòng lặp gửi không kiểm tra `notification_log` — cron retry hoặc trigger tay lần 2 cùng ngày → **toàn bộ user nhận email đúp**.

**Fix:** trước khi gửi, query user đã có `notification_log` với `dispatch_id` + `delivery_status='sent'` và skip.

### 7. ⬜ Đăng ký không atomic → tài khoản "kẹt"
**File:** `supabase/functions/register/index.ts`

4 bước insert tuần tự (auth user → users → user_profiles → subscriptions). Fail giữa chừng → auth user tồn tại nhưng hồ sơ thiếu → đăng ký lại bị "Email đã được đăng ký", đăng nhập cũng không dùng được.

**Fix:** bọc phần DB vào Postgres function (RPC, 1 transaction), hoặc cleanup `admin.auth.admin.deleteUser(userId)` trong catch.

### 8. ⬜ `customer_code` chỉ tồn tại trên bảng `profiles` LEGACY, không có trên `users` thật

**Đính chính sau khi soi live (07/07):** live DB CÓ cột `customer_code` + trigger `assign_customer_code()` — nhưng nằm trên bảng **`profiles` legacy** (thiết kế cũ, xem mục 15). Bảng `users` đang dùng thật KHÔNG có cột này, `register` không sinh mã. Cần quyết định: chuyển cột + trigger sang `users`, hoặc gỡ khỏi spec.

### 9. ⬜ Thuật toán Tiểu Hạn bị nhân đôi
**File:** `send-nhat-van/index.ts:13-43` vs `calculate-la-so/index.ts`

`CHI_MAP`, `TIEU_HAN_START`, `dich()` copy tay sang engine gửi mail. Khi chỉnh thuật toán (như vụ Thiên Lương) mà chỉ sửa 1 nơi → khách nhận Nhật Vận sai cung mà không ai biết.

**Fix:** tách `_shared/tuvi.ts` cho các hàm dùng chung.

---

## 🟡 Khả năng mở rộng / bảo trì

### 10. ✅ Thuật toán 742 dòng không có test — golden tests (hạ tầng xong 07/07/2026)
`calculate-la-so` là source of truth, đầy biến 1 ký tự và magic number, mỗi lần sửa phải verify tay với prototype HTML.

**Đã làm:** tách thuật toán ra `logic.ts` (index.ts chỉ còn serve), bộ 23 golden cases tại `calculate-la-so/tests/` (giờ Tý/Ngọ, nam/nữ, VCD, ranh giới Tết, tháng nhuận, 10 can Tứ Hóa, biên 1925/2008, lưu tháng/năm xem). Chạy: `deno test --allow-read tests/` — bắt buộc trước mỗi lần deploy. Quy trình đầy đủ: `tests/README.md`.

**⬜ Còn lại:** Master xác nhận tay từng lá (in PNG gửi duyệt) → đổi `verified: true` trong `cases.ts`. Ưu tiên: `016-can-canh` (Tứ Hóa can Canh tranh cãi), `008-thang-nhuan`, `006`/`007` (Tết), `001` (giờ Tý). Hiện golden là regression baseline (chặn đổi ngoài ý muốn), chưa phải chân lý tuyệt đối.

### 11. ⬜ `LaSoSection.tsx` 1.939 dòng + bản render lá số thứ 2
File gồm form, fetch, grid, PalaceCell, CenterCell, phi tinh overlay, export MD/PNG trong 1 file. Đồng thời `LaSoView.tsx` (327 dòng) là bản hiển thị lá số khác với logic normalize riêng → đổi UI lá số phải sửa 2 nơi.

**Fix:** tách folder `src/components/laso/` (types, api, Form, Grid, PalaceCell, exporters); hợp nhất 2 bản render về 1 component nhận props.

### 12. ⬜ Email template HTML copy-paste 4 nơi
`register`, `resend-confirm` (giống nhau ~90%), `send-nhat-van`, `send-inquiry-reply` đều tự dựng cùng layout (header vàng, footer disclaimer).

**Fix:** tách `_shared/email.ts` với `buildEmailLayout(title, bodyHtml)` — đổi brand/disclaimer chỉ sửa 1 chỗ.

### 13. ✅ (trên live) / ⬜ (repo chưa sync) Role check RLS bằng subquery đệ quy
**Xác nhận 07/07:** live DB **ĐÃ được clean toàn bộ** (session 01/07) — cả 46 policies dùng pattern `COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '')`, không còn subquery đệ quy. Nhưng thay đổi làm qua SQL Editor nên **migration files trong repo vẫn là pattern cũ** → `supabase db reset` local sẽ dựng ra schema khác live.

**Việc còn lại:** viết migration sync (drop policy tên cũ + tạo lại theo live, tham chiếu `supabase/schema_live_snapshot.sql`) rồi `supabase migration repair --status applied` để không chạy đè lên live. Nên làm CHUNG với đợt dọn dẹp mục 15 để chỉ tốn 1 migration.

### 14. ⬜ Các điểm nhỏ
- `redirectTo` hardcode `https://tuvidaihongviet.lovable.app/dang-nhap` ở 2 function → env var `SITE_URL` (cần khi có domain thật).
- `calculate-la-so` trả field `_lunar` debug ra production response.
- `calculate-la-so` public không rate-limit → tốn compute + người ngoài dump thuật toán qua brute-force input. Cân nhắc rate limit theo IP.
- `nhat_van_content` cho mọi authenticated user đọc kể cả hết trial — vô hại khi nội dung đi qua email, nhưng khi làm dashboard hiển thị Nhật Vận cần siết theo subscription.
- `use-iot-auth.ts` chỉ check session lúc mount, không subscribe `onAuthStateChange` → session hết hạn giữa chừng vẫn ngồi trong IOT.
- Đã cài `@tanstack/react-query` nhưng `tai-khoan.tsx`/`iot.ho-tro.tsx` toàn fetch tay + useState (29 và 22 hooks) — refactor dần sang query hooks giảm boilerplate + có cache/refetch.

### 15. ⬜ Drift live DB vs repo — phát hiện khi đối chiếu 07/07/2026
Snapshot đầy đủ: `supabase/schema_live_snapshot.sql`. Các thay đổi làm qua SQL Editor không có trong migration files:

**a) Bảng `profiles` LEGACY vẫn tồn tại trên live** — thiết kế cũ (CLAUDE.md §7 đã cảnh báo "KHÔNG phải public.profiles"), có cột `customer_code`, trigger `assign_customer_code`, 3 policies riêng. `register` không ghi vào bảng này → data chết. Cần verify không còn gì đọc rồi DROP.

**b) ⚠️ `custom_access_token_hook` đọc role từ `profiles` LEGACY** — hook (nếu đang bật trong Auth settings) SELECT `role FROM public.profiles`, trong khi user mới chỉ được ghi vào `users` → claim `user_role` luôn = 'customer' cho user mới. May là không policy nào dùng claim `user_role` (tất cả dùng `app_metadata.role`), nhưng đây là bom nổ chậm nếu ai đó viết policy theo CLAUDE.md §19. Fix: sửa hook đọc `public.users` hoặc tắt hook + sửa CLAUDE.md §19.

**c) Policies trùng lặp trên live** (2 cặp làm cùng 1 việc):
- `notification_log`: "notif: self read" ≡ "notification_log: customer xem cua minh"
- `nhat_van_content`: "nvc: auth read" ≡ "nhat_van: authenticated doc"

**d) Triggers `updated_at` trùng lặp** — 2 bộ (`set_updated_at` + `handle_updated_at`) cùng gắn trên `user_profiles`, `subscriptions`, `nhat_van_content` → set updated_at 2 lần mỗi update. Gộp về 1 function.

**e) `system_config: read all`** — live cho mọi authenticated user ĐỌC toàn bộ system_config (migration gốc: admin-only). Có thể chủ đích (hiện bank account cho trang thanh toán), nhưng key nhạy cảm sau này sẽ leak. Nên tách bảng/view public config riêng.

**f) `payments`: live bỏ quyền đọc của `tu_van_vien`** (migration 003 có cấp) — CLAUDE.md §12 vẫn ghi tư vấn viên xem được giao dịch. Cần thống nhất doc theo live.

**g) `users.password_hash`** — cột legacy không dùng (Supabase Auth quản lý password). Xóa khi tiện.

**Fix tổng:** 1 migration dọn dẹp (sau khi Bang duyệt từng điểm a–g) + `migration repair` cho phần đã áp dụng sẵn trên live (mục 13).

---

## Thứ tự làm đề xuất

| Ưu tiên | Việc | Effort |
|---|---|---|
| 1 | Fail-closed SePay (#3) + fix `.or()` injection (#2) + sửa hook đọc profiles legacy (#15b) | ~nửa ngày |
| 2 | Chặn sửa cột nhạy cảm `users` (#1) + audit_log insert (#4) | ~nửa buổi |
| 3 | `paid_until` khi kích hoạt (#5) + chống gửi trùng Nhật Vận (#6) | ~nửa ngày |
| 4 | Register atomic/cleanup (#7) + quyết định `customer_code` (#8) | ~nửa ngày |
| 5 | Migration dọn dẹp + sync repo↔live (#13 + #15 a,c,d,e,f,g — Bang duyệt từng điểm trước) | ~1 ngày |
| 6 | ~~Golden tests (#10)~~ ✅ xong 07/07 — còn Master duyệt golden | — |
| 7 | Refactor dần: `_shared/tuvi.ts` (#9), `_shared/email.ts` (#12), tách LaSoSection (#11) | rải rác |

---

*Review bởi Claude Code · 07/07/2026 · PM: Bang*
