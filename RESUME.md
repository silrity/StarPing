# RESUME PROMPT — StarPing session 15/07/2026

> Paste đoạn dưới vào Claude Code khi mở máy lại.

---

```
Tiếp tục STARPING từ session 15/07/2026.

═══════════════════════════════════════
STATE HIỆN TẠI
═══════════════════════════════════════

Supabase project: gqmjuzpwfpnvlpodqckt
Lovable app URL: https://tuvidaihongviet.lovable.app
Lovable repo: https://github.com/silrity/tuvidaihongviet.git (clone tại C:/Users/BGN/Documents/GitHub/tuvidaihongviet)
Backend repo: https://github.com/silrity/StarPing.git

Commit mới nhất:
- StarPing: ca0d776 "feat: quan ly nhan vien va bat tu khach hang qua IOT"
- tuvidaihongviet: a919d40 "feat: Customer Portal - tab Tu Van len dau + giao dien tach doi"

Supabase CLI đã link project — `supabase db push` / `supabase functions deploy <name>`
chạy được thẳng, không cần Docker (chỉ `supabase db dump` mới cần Docker).

═══════════════════════════════════════
SESSION 15/07 ĐÃ HOÀN THÀNH
═══════════════════════════════════════

IOT — "Hỗ Trợ & Tư Vấn" (tuvidaihongviet/src/routes/iot.ho-tro.tsx):
✅ Tách 2 tab "Tickets" / "Ban Tư Vấn" (component mới ConsultantTeamTab.tsx):
   - Badge "Tickets" = số ticket category=tu_van chưa gán (không tính tai_khoan_thanh_toan,
     loại này vốn không bao giờ gán cho tư vấn viên)
   - Badge "Ban Tư Vấn" = số tư vấn viên đang Hoạt động mà chưa có khách/ticket nào
   - Bảng Ban Tư Vấn: tên, trạng thái (dropdown sửa trực tiếp), khách đang hỗ trợ,
     ticket đang hỗ trợ, ngày gán gần nhất
   - Bỏ 3 nút lọc category (Tất cả loại/Tư Vấn/Tài khoản) khỏi tab Tickets — nhãn
     category vẫn hiện trên từng dòng ticket, chỉ bỏ phần filter theo yêu cầu Bang
   - Dropdown gán tư vấn viên: ẩn hẳn người "Nghỉ dài hạn", vẫn hiện "Tạm nghỉ"
     kèm nhãn (Tạm nghỉ)
✅ Migration 20260715000010_consultant_status.sql (đã apply live):
   - Cột users.consultant_status: 'hoat_dong'|'tam_nghi'|'nghi_dai_han' (default hoat_dong)
   - RLS mới: van_hanh được sửa consultant_status (trước đó live chỉ admin ghi được users
     qua p_admin_write — van_hanh không có quyền, phải thêm policy riêng scope theo
     role='tu_van_vien' để không mở rộng quyền ghi bừa bãi)
   - View consultant_workload thêm consultant_status + last_assigned_at (subquery
     MAX(created_at) từ inquiry_assignments where action='assigned')
   - LƯU Ý: CREATE OR REPLACE VIEW không cho đổi thứ tự cột — cột mới phải thêm
     ở CUỐI SELECT, không chèn giữa

IOT — "Nhân Viên" (đổi tên từ "Nội Bộ", tuvidaihongviet/src/routes/iot.noi-bo.tsx):
✅ Icon pencil cho admin: sửa tên/role/email đăng nhập/password nhân viên khác
✅ Admin KHÔNG tự sửa được chính mình qua đây (icon ẩn ở dòng của mình) — tránh
   tự khóa/tự hạ quyền; sửa chính mình vẫn phải qua Supabase Dashboard
✅ Backend mới: Edge Function admin-update-staff (đã deploy)
   - Xác thực caller qua auth.getUser() (forward Authorization header) rồi check
     app_metadata.role === 'admin'
   - Đổi role: cập nhật ĐỒNG THỜI auth.users.app_metadata (qua admin.auth.admin.
     updateUserById) VÀ public.users.role — 2 nơi này không tự đồng bộ (xem CLAUDE.md §7)
   - Đổi email/password: qua Supabase Admin API (service role), không thể làm
     từ client trực tiếp

IOT — "Khách Hàng" (tuvidaihongviet/src/routes/iot.khach-hang.tsx):
✅ Đổi cột "Zalo" → "SĐT", nút "Xem" → icon 👁, thêm icon ✏️ (chỉ admin) mở modal sửa
✅ Cột mới "Tickets" (đếm ticket open/in_progress của khách) và "Giới tính"
✅ Modal edit: Tên + SĐT (ghi thẳng bảng users qua RLS p_admin_write) + nhóm
   "Bát tự" (Giới tính + Ngày/Tháng/Năm/Giờ sinh) → gọi Edge Function riêng
✅ Backend mới: Edge Function admin-update-birth-data (đã deploy 3 lần, xem bug bên dưới)
   - Nhận birth_day/month/year/hour_chi + gender, validate, upsert vào user_profiles,
     rồi TÍNH LẠI TOÀN BỘ user_charts (dùng chung logic.ts với calculate-la-so, import
     trực tiếp — không gọi HTTP self-call) — vì user_charts là cache, đổi bát tự mà
     không tính lại sẽ để lại lá số cũ sai
   - user_profiles/user_charts không có RLS UPDATE cho admin (chỉ chủ sở hữu ghi được /
     staff chỉ SELECT) → bắt buộc chạy qua service role trong Edge Function

BUG ĐàTÌM & SỬA (quan trọng, dễ tái phát ở chỗ khác):
1. Ambiguous FK embed: inquiries có 2 FK trỏ vào users (customer_id VÀ assigned_to).
   Viết `inquiries(status)` trong .select() làm PostgREST không biết join theo cột
   nào → query lỗi ÂM THẦM (không throw, chỉ trả rỗng). Fix: `inquiries!customer_id(status)`.
   → Nếu sau này embed lỗi mà không có error rõ ràng, nghi ngờ FK ambiguous trước.
2. `.update()` trên bảng KHÔNG CÓ row sẵn (VD user_profiles của khách thiếu hồ sơ)
   khớp 0 dòng và KHÔNG BÁO LỖI (đúng ngữ nghĩa SQL) → tưởng đã lưu nhưng thực ra
   không có gì thay đổi. Fix: dùng `.upsert(..., { onConflict: 'user_id' })` thay
   vì `.update()` bất cứ khi nào bảng đích có thể không có row từ trước.
3. supabase-js `functions.invoke()` khi Edge Function trả lỗi (400+) chỉ báo
   "Edge Function returned a non-2xx status code" — message thật nằm trong
   `error.context` (Response gốc), phải `await error.context.json()` mới đọc được.
   → Đã tạo helper dùng chung: tuvidaihongviet/src/lib/edgeFunctionError.ts
   (`edgeFunctionErrorMessage(error)`), áp dụng ở iot.noi-bo.tsx + iot.khach-hang.tsx.
   NÊN DÙNG helper này ở MỌI invoke() mới trong tương lai, đừng chỉ throw error.message.

Customer Portal (tuvidaihongviet/src/routes/tai-khoan.tsx):
✅ Tab "Tư Vấn" chuyển lên đầu tiên + làm mặc định (trước đó default là "Hồ Sơ")
✅ Chưa có ticket nào (chỉ tab Tư Vấn): hero + CTA "Đặt câu hỏi đầu tiên" thay
   khối trống cũ (tab Hỗ Trợ vẫn giữ khối trống cũ, không đổi)
✅ Đã có ticket: desktop (≥768px) hiện giao diện tách đôi kiểu Tickets IOT (danh
   sách trái/nội dung phải, dòng đang chọn tô sáng); mobile (<768px) giữ nguyên
   kiểu cũ list→bấm→toàn màn hình — dùng Tailwind `md:hidden` / `hidden md:flex`
   để render cả 2 layout cùng lúc, không cần JS detect kích thước màn hình
✅ Fix bug type có sẵn: state tab thiếu "tuvan" trong union type (so sánh vô nghĩa,
   tsc đã cảnh báo từ trước session này)

⚠️ CHƯA XÁC NHẬN: Bang chưa duyệt mắt phần Customer Portal split-view (câu hỏi
   làm rõ về phạm vi/mobile-behavior bị timeout, Gấu tự chọn phương án đề xuất
   và làm luôn). Cần mở localhost:8080/tai-khoan duyệt cả desktop lẫn thu nhỏ
   cửa sổ trước khi coi là xong hẳn.

═══════════════════════════════════════
VIỆC CẦN LÀM TIẾP / CHƯA RÕ TRẠNG THÁI
═══════════════════════════════════════

- Bang duyệt UI Customer Portal (tab Tư Vấn mặc định + split view) — xem trên
  cả desktop và mobile viewport
- Enhancement.md (từ session 07/07) vẫn còn nhiều mục 🔴🟠 CHƯA fix (bảo mật +
  nghiệp vụ) — không đụng tới trong session này, xem file gốc để tiếp tục
- StarPing repo có RẤT NHIỀU file untracked/modified TỪ TRƯỚC session này
  (docs/domainKnowledge/*, Images/, src/, package-lock.json, README.md sửa,
  docs/product/live-payments-design-system-FINAL.md đã xóa, 5 migration file cũ
  001-005 hiện thành "??" dù đã có từ lâu...) — CHƯA commit vì không thuộc phạm
  vi các task được giao, để Bang tự quyết định. ĐỪNG git add -A/. bừa — luôn hỏi
  hoặc chỉ add đúng file liên quan tới task đang làm.
- Chưa test lại: liệu bug #2 (update 0-row) có ảnh hưởng chỗ nào khác ngoài
  admin-update-birth-data không (VD: bất kỳ chỗ nào khác dùng .update() vào bảng
  có thể thiếu row) — chưa rà soát toàn bộ, chỉ mới phát hiện qua báo lỗi cụ thể

═══════════════════════════════════════
GHI CHÚ KỸ THUẬT QUAN TRỌNG (kế thừa từ session trước + mới)
═══════════════════════════════════════

GOLDEN TESTS:
  cd supabase/functions/calculate-la-so && deno test --allow-read tests/
  Regen (chỉ khi đổi thuật toán có chủ đích): deno run --allow-read --allow-write tests/regen.ts
  23/23 case đã Bang xác nhận đúng (07/07/2026)

XUẤT PNG LÁ SỐ: modern-screenshot (domToPng), KHÔNG dùng html-to-image (bug cắt cột phải)

EDGE FUNCTIONS mới có service-role + xác thực caller (mẫu chuẩn để copy):
  1. Tạo client với ANON_KEY + forward Authorization header → .auth.getUser() lấy caller
  2. Check caller.app_metadata.role
  3. Tạo client riêng với SERVICE_ROLE_KEY cho phần ghi dữ liệu thật
  Xem admin-update-staff/index.ts hoặc admin-update-birth-data/index.ts làm mẫu.

DEV LOCAL tuvidaihongviet:
  npm run dev → localhost:8080. Poll port bằng curl thay vì sleep cố định.
  Kill: Get-CimInstance Win32_Process -Filter "Name='node.exe'" | chọn đúng PID
  (npm run dev + vite con), Stop-Process -Force. (PowerShell CIM cho command line
  đầy đủ để nhận diện đúng process, tránh nhầm PID ảo MSYS của Git Bash ps aux.)
  ⚠️ Local KHÔNG có DB riêng — gắn thẳng Supabase production.

RLS PATTERN CHUẨN:
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') IN ('admin', 'van_hanh')
  KHÔNG dùng subquery EXISTS vào users → recursive.

JWT role set bằng SQL (khi cần set tay, không qua UI):
  UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
  WHERE email = '...';
  Sau đó user phải đăng nhập lại (session cũ không tự refresh claim).

CREATE OR REPLACE VIEW: không đổi được thứ tự cột đã có — cột mới luôn thêm ở CUỐI.
```
