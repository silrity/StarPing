# RESUME PROMPT — StarPing session 07/07/2026

> Paste đoạn dưới vào Claude Code khi mở máy lại.

---

```
Tiếp tục STARPING từ session 07/07/2026.

Model: Claude Fable 5 (claude-fable-5) — Bang đã đổi mặc định giữa session 07/07.

═══════════════════════════════════════
STATE HIỆN TẠI
═══════════════════════════════════════

Supabase project: gqmjuzpwfpnvlpodqckt
Lovable app URL: https://tuvidaihongviet.lovable.app
Lovable repo: https://github.com/silrity/tuvidaihongviet.git (clone tại C:/Users/BGN/Documents/GitHub/tuvidaihongviet)
Backend repo: https://github.com/silrity/StarPing.git
WHITELIST_ENABLED = 'false' (open registration)

ACCOUNTS NỘI BỘ:
- ted.bgn@gmail.com — role=admin (public.users + auth.users app_metadata)
- admin@daihongviet.com — role=admin (public.users + auth.users app_metadata)

DENO: 2.9.1 đã cài qua winget (07/07). Shell mới gọi `deno` trực tiếp.
Shell không nhận PATH: /c/Users/BGN/AppData/Local/Microsoft/WinGet/Packages/DenoLand.Deno_Microsoft.Winget.Source_8wekyb3d8bbwe/deno.exe

═══════════════════════════════════════
SESSION 07/07 ĐÃ HOÀN THÀNH
═══════════════════════════════════════

FRONTEND (tuvidaihongviet — đã push):
✅ Commit fa4e259: Bỏ nút "Đăng ký nhận Nhật Vận" ở #la-so, thay bằng 2 nút:
   - "Tải lá số" → xuất .md đầy đủ (Tứ Trụ + Cục + Mệnh/Thân + 12 cung, WYSIWYG theo toggle lưu tháng)
   - "In lá số" → xuất .png (toàn khung chart + chú thích, loại Phi Tinh toolbar
     qua data-export-exclude + filter)
✅ Commit f8565c4: Fix PNG bị cắt cột phải — THAY html-to-image BẰNG modern-screenshot
   (domToPng, scale: 2). html-to-image bug với DOM phức tạp (SVG trung gian >15MB,
   rasterize thiếu). KHÔNG quay lại html-to-image.
   → package.json: modern-screenshot ^4.7.0 (bun.lock sẽ tự update khi Lovable build)

BACKEND (StarPing — đã push):
✅ Commit b49e95f: GOLDEN TESTS cho thuật toán an sao
   - Tách calculate-la-so/index.ts (742 dòng) → index.ts (chỉ serve) + logic.ts (thuật toán)
   - 23 golden cases tại calculate-la-so/tests/ (cases.ts + golden/*.json):
     giờ Tý/Ngọ (Thân trùng Mệnh), cặp nam/nữ, Mệnh VCD, trước/sau Tết 2006,
     tháng nhuận 2004, đủ 10 can Tứ Hóa, biên 1925/2008, lưu tháng + đổi năm xem
   - Chạy: cd supabase/functions/calculate-la-so && deno test --allow-read tests/
   - BẮT BUỘC chạy trước mỗi lần deploy calculate-la-so
   - Quy trình sửa thuật toán: sửa logic.ts → test đỏ → regen.ts → git diff golden/
     → Master duyệt → commit. Chi tiết: tests/README.md
   - Test đã verify: 23/23 xanh + bắt được lỗi giả lập với output tiếng Việt dễ đọc
   - Commit này GỒM CẢ 2 thay đổi thuật toán từ phiên trước chưa commit:
     fix sunLong PI/6 + thêm sao Quốc Ấn + Thiên Trù
✅ Enhancement.md (root repo): KẾT QUẢ CODE REVIEW 14 mục — đọc file này trước khi
   làm bảo mật/nghiệp vụ. Tóm tắt mức nghiêm trọng:
   🔴 #1 users self-update không WITH CHECK → customer tự set role='admin'
   🔴 #2 .or() filter injection ở register + check-whitelist → bypass whitelist
   🔴 #3 sepay-webhook fail-open khi SEPAY_WEBHOOK_SECRET chưa set
   🟠 #5 webhook không set paid_until → sub active vô thời hạn
   🟠 #6 send-nhat-van gửi trùng khi chạy lại cùng ngày
   🟠 #7 register không atomic → auth user mồ côi
   🟠 #8 customer_code có trong spec nhưng KHÔNG có trong migration nào
   ✅ ĐÃ KIỂM TRA LIVE DB (07/07, dump 46 policies qua supabase db dump):
   - Live ĐÃ dùng JWT app_metadata toàn bộ → #13 xong trên live, chỉ còn sync repo
   - #1 hạ 🔴→🟠: đổi users.role không leo thang RLS nữa, nhưng vẫn tự set được
     email_verified=true (bypass verify) → vẫn cần fix bằng column grants
   - #4 (audit_log insert authenticated) còn nguyên trên live
   - Snapshot live: supabase/schema_live_snapshot.sql
   - DRIFT MỚI (Enhancement.md mục 15): bảng profiles LEGACY còn sống trên live;
     custom_access_token_hook đọc profiles legacy (claim user_role sai cho user mới,
     may là không policy nào dùng); 2 cặp policy trùng; 2 bộ trigger updated_at trùng;
     system_config đọc được bởi mọi authenticated; tu_van_vien mất quyền đọc payments
     (khác CLAUDE.md §12); customer_code chỉ có trên profiles legacy
✅ CLAUDE.md cập nhật: cấu trúc calculate-la-so mới, quy tắc golden tests,
   quy tắc dùng modern-screenshot, nút xuất lá số trong LaSoSection

═══════════════════════════════════════
VIỆC CẦN LÀM TIẾP (theo thứ tự)
═══════════════════════════════════════

BƯỚC 1 — XUẤT PNG 23 LÁ GỬI MASTER DUYỆT (đã thống nhất cách làm, chưa chạy)
   → Gấu tự động hóa bằng Playwright (scratchpad pw-test đã có harness):
     nhập từng case từ cases.ts vào web local → bấm "In lá số" → gom PNG
     vào folder để Bang gửi Master
   → Ưu tiên duyệt 5 lá: 016-can-canh (Tứ Hóa can Canh tranh cãi giữa các phái),
     008-thang-nhuan, 006/007 (Tết), 001 (giờ Tý)
   → Master duyệt lá nào → đổi verified: true trong cases.ts lá đó
   → Song song: xin Master 3-5 lá đã lập tay thật (giá trị xác nhận cao hơn)
     → thêm case mới

BƯỚC 2 — FIX BẢO MẬT 🔴 (Enhancement.md #1 #2 #3, ~nửa ngày)
   → NHỚ kiểm tra live DB policies trước (xem lưu ý trên)

BƯỚC 3 — FIX NGHIỆP VỤ 🟠 (#5 #6 #7 #8, ~1 ngày)

BƯỚC 4 — CÁC VIỆC TREO TỪ SESSION TRƯỚC (chưa rõ trạng thái, cần Bang confirm):
   - Quyết định business model: giữ/bỏ Daily Nhật Vận, Advisory Packages
     (chi tiết trong RESUME 01/07, Bang nói "sẽ hồi đáp sau")
   - SePay: đăng ký my.sepay.vn merchant account
   - Verify lá số 7/5/1984 giờ Mùi Nữ (tháng 4 ÂL) + xác nhận Thầy can giờ Ất/Tân Mùi
   - IOT E2 Customer Detail: apply Lovable_E2_Fix_Navigate.md + test navigate

═══════════════════════════════════════
GHI CHÚ KỸ THUẬT QUAN TRỌNG
═══════════════════════════════════════

GOLDEN TESTS:
  cd supabase/functions/calculate-la-so && deno test --allow-read tests/
  Regen (chỉ khi đổi thuật toán có chủ đích): deno run --allow-read --allow-write tests/regen.ts
  `deno check` sinh supabase/functions/deno.lock → xóa trước khi commit nếu không chủ đích

XUẤT PNG LÁ SỐ: modern-screenshot (domToPng), KHÔNG dùng html-to-image (bug cắt cột phải)

DEV LOCAL tuvidaihongviet:
  npm run dev → localhost:8080. Lockfile thật là bun.lock —
  npm install sinh package-lock.json → PHẢI XÓA trước khi commit.
  routeTree.gen.ts bị dev server regen → git checkout -- trước khi commit.
  Kill dev server: tasklist //FI "IMAGENAME eq node.exe" → taskkill //PID <pid> //F
  (PID từ ps aux của Git Bash là PID ảo MSYS, không dùng được)

BROWSER TEST: Playwright trong scratchpad (không cài vào repo),
  chromium.launch({ channel: "msedge", headless: true }) dùng Edge có sẵn.
  TanStack Start cần chờ networkidle + ~1.5s hydration trước khi click submit.

BACKEND calculate-la-so:
  Thuật toán ở logic.ts (index.ts chỉ serve). Response có _lunar: {d,m,y,leap}
  (field ngắn). sunLong dùng fl(r/(PI/6)).

RLS PATTERN CHUẨN (theo session 01/07):
  coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') IN ('admin', 'van_hanh')
  KHÔNG dùng subquery EXISTS vào users → recursive.
  Migration files trong repo CHƯA phản ánh pattern này — cần đối chiếu live DB.

JWT role set bằng SQL:
  UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
  WHERE email = '...';
  Sau đó user phải đăng nhập lại.
```
