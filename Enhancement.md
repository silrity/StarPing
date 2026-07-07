# ĐVTT — Enhancement / Code Review

> Kết quả review toàn bộ code 2 repo (StarPing backend + tuvidaihongviet frontend), ngày 07/07/2026.
> Phạm vi: 7 Edge Functions, 9 migrations, các file frontend chính.
> Trạng thái: ⬜ chưa làm · ✅ đã xong

---

## 🔴 Bảo mật — sửa trước khi mở đăng ký public

### 1. ⬜ Khách hàng có thể tự nâng quyền lên admin
**File:** `supabase/migrations/20260613000001_initial_schema.sql:199`

Policy `users: self update` chỉ có `USING (auth.uid() = id)`, không có `WITH CHECK` giới hạn cột. RLS Postgres không chặn theo cột — customer đã đăng nhập có thể chạy:
```sql
update users set role = 'admin' where id = auth.uid()
```
qua anon key (đang công khai trong frontend). Sau đó mọi policy `role in ('admin', ...)` trên `payments`, `subscriptions`, `whitelist`, `system_config` đều mở với người đó.

**Fix:** thu hồi quyền update cột nhạy cảm ở tầng grant:
```sql
REVOKE UPDATE ON public.users FROM authenticated;
GRANT UPDATE (full_name, phone_zalo) ON public.users TO authenticated;
```
hoặc trigger chặn thay đổi `role`/`is_active`/`email_verified` khi actor không phải service role.

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
**File:** `supabase/migrations/20260615000003_iot_rls.sql:45`

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

### 8. ⬜ `customer_code` có trong spec nhưng không tồn tại trong DB

CLAUDE.md mô tả cột `customer_code TEXT UNIQUE` format DVTT00101+, nhưng không migration nào tạo cột và `register` không sinh mã. Cần quyết định: làm thật (cột + sequence + trigger) hoặc gỡ khỏi spec.

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

### 13. ⬜ Role check RLS bằng subquery đệ quy vào chính `public.users`
Pattern `EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role...)` lặp ở ~15 policy — tốn 1 subquery mỗi query, và là nguồn gốc vụ "2 nơi lưu role không đồng bộ" từng gây bug IOT.

**Fix:** vì đã có `custom_access_token_hook` (CLAUDE.md §19), chuyển sang check `(auth.jwt()->>'user_role')` hoặc hàm `security definer is_staff()` — nhanh hơn, không đệ quy, 1 nguồn role duy nhất.

### 14. ⬜ Các điểm nhỏ
- `redirectTo` hardcode `https://tuvidaihongviet.lovable.app/dang-nhap` ở 2 function → env var `SITE_URL` (cần khi có domain thật).
- `calculate-la-so` trả field `_lunar` debug ra production response.
- `calculate-la-so` public không rate-limit → tốn compute + người ngoài dump thuật toán qua brute-force input. Cân nhắc rate limit theo IP.
- `nhat_van_content` cho mọi authenticated user đọc kể cả hết trial — vô hại khi nội dung đi qua email, nhưng khi làm dashboard hiển thị Nhật Vận cần siết theo subscription.
- `use-iot-auth.ts` chỉ check session lúc mount, không subscribe `onAuthStateChange` → session hết hạn giữa chừng vẫn ngồi trong IOT.
- Đã cài `@tanstack/react-query` nhưng `tai-khoan.tsx`/`iot.ho-tro.tsx` toàn fetch tay + useState (29 và 22 hooks) — refactor dần sang query hooks giảm boilerplate + có cache/refetch.

---

## Thứ tự làm đề xuất

| Ưu tiên | Việc | Effort |
|---|---|---|
| 1 | Chặn tự đổi `role` (#1) + fail-closed SePay (#3) + fix `.or()` injection (#2) | ~nửa ngày |
| 2 | `paid_until` khi kích hoạt (#5) + chống gửi trùng Nhật Vận (#6) | ~nửa ngày |
| 3 | Register atomic/cleanup (#7) + quyết định `customer_code` (#8) | ~nửa ngày |
| 4 | Golden tests cho thuật toán (#10) — làm trước đợt chỉnh thuật toán tiếp theo | 1–2 ngày |
| 5 | Refactor dần: `_shared/tuvi.ts` (#9), `_shared/email.ts` (#12), tách LaSoSection (#11) | rải rác |

---

*Review bởi Claude Code · 07/07/2026 · PM: Bang*
