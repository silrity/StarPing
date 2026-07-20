# ĐVTT — CLAUDE.md

> File này dành cho Claude Code (terminal / VS Code). Đọc toàn bộ trước khi làm bất kỳ task nào.

---

## 1. ĐỊNH DANH DỰ ÁN

| Hạng mục | Giá trị |
|---|---|
| Tên thương hiệu (khách hàng) | **Đại Hồng Việt Tử Vi** (ĐHVTV) |
| Tên project nội bộ | **ĐVTT** / StarPing |
| PM | Bang (ted.bgn@gmail.com) |
| Master | Thầy Tử Vi (đối tác nội dung) |
| Giai đoạn | MVP — Phase 2 (Frontend + Auth live, Notification pending) |
| Ngôn ngữ UI | **Tiếng Việt** (mọi nội dung user-facing) |
| Ngôn ngữ code | English (biến, hàm, schema) |

**Tóm tắt:** **Đại Hồng Việt Tử Vi** (ĐHVTV) là tên thương hiệu khách hàng. **ĐVTT** là tên project nội bộ. Nền tảng SaaS phân tích chu kỳ vận trình cá nhân (Tử Vi đẩu số), gửi tín hiệu hàng ngày (Nhật Vận) cá nhân hóa cho từng người dùng qua Zalo OA và Email.

---

## 2. HAI REPO — QUAN TRỌNG

| Repo | Mục đích | Path cục bộ |
|---|---|---|
| `StarPing` | Backend: Supabase Edge Functions, migrations, spec docs | `C:\Users\BGN\Documents\GitHub\StarPing` |
| `tuvidaihongviet` | Frontend: Lovable React app | `C:\Users\BGN\Documents\GitHub\tuvidaihongviet` |

> **Khi Claude làm việc:** Luôn xác định đang sửa repo nào trước. Hầu hết Edge Function logic ở `StarPing/supabase/functions/`, UI component ở `tuvidaihongviet/src/`.

---

## 3. CẤU TRÚC FILE THỰC TẾ

```
StarPing/                              ← Repo backend + docs
├── CLAUDE.md                          ← File này
├── README.md
│
├── docs/
│   ├── demo_laso_tuvi.html            ← Prototype thuật toán gốc (BẢO MẬT, không deploy)
│   ├── email_templates.md             ← Mẫu email Resend (confirm, nhat-van, monthly)
│   ├── live-payments-design-system-FINAL.zip  ← Design assets (project cũ, tham khảo)
│   │
│   ├── algorithm/
│   │   └── TUVI_ALGORITHM_SPEC.md     ← ⭐ SPEC THUẬT TOÁN ĐẦY ĐỦ (source of truth)
│   │
│   ├── domainKnowledge/
│   │   ├── 01-nen-tang-co-ban.md      ← Nền tảng Tử Vi
│   │   ├── 02-lap-la-so.md            ← Lập lá số
│   │   ├── 03-14-chinh-tinh.md        ← 14 chính tinh (ngũ hành, miếu/hãm)
│   │   ├── 04-phu-tinh-toa-tinh.md   ← Phụ tinh, tọa tinh
│   │   ├── 05-12-cung.md              ← 12 cung
│   │   ├── 06-cach-cuc.md             ← Cách cục
│   │   ├── anSao.md                   ← An sao tổng hợp
│   │   ├── ngayAmDuong.md             ← Chuyển đổi âm/dương lịch
│   │   ├── nguHanh.md                 ← Ngũ hành
│   │   ├── tinhDau.md                 ← Tinh đẩu
│   │   ├── tuTru.md                   ← Tứ trụ
│   │   ├── SKILL.md                   ← Kỹ năng luận đoán
│   │   ├── bo-sung-01.md              ← Bổ sung kiến thức 1
│   │   └── bo-sung-02.md              ← Bổ sung kiến thức 2
│   │
│   └── product/
│       ├── Product.md                 ← PRD đầy đủ v1.1
│       ├── Ops.md                     ← IOT Portal spec v0.3
│       ├── DaiVietTinhTu_Proposal.md  ← Tài liệu chiến lược gốc
│       ├── Design-system-FINAL.md     ← Design system ĐVTT
│       ├── DVTT_Lovable_MasterPrompt.md
│       ├── DVTT_Lovable_Prompt_LandingPage.md
│       ├── DVTT_ZaloOA_Claude_UntitledUI_Guide.md
│       ├── Lovable_Dev_Guide.md
│       ├── Lovable_B2_Prompt.md       ┐
│       ├── Lovable_B3_Fix_LaSo.md     │
│       ├── Lovable_B4_Fix_Code.md     │
│       ├── Lovable_B4_C1_Navbar_LaSo_Fix.md │ Lịch sử Lovable iterations
│       ├── Lovable_C1_CustomerPortal.md     │ (dùng để trace lại nếu cần)
│       ├── Lovable_C2_IOT.md          │
│       ├── Lovable_D1_Fix_LaSo_After_C2.md │
│       ├── Lovable_D2_IOT_Separate_Auth.md │
│       ├── Lovable_D4_LaSo_New_Layout.md   │
│       ├── Lovable_E1_CustomerDetail_BatTu_LaSo.md
│       ├── Lovable_E2_CustomerDetail_FullPage.md
│       ├── Lovable_E2_Fix_Navigate.md
│       ├── Lovable_F1_SupportInbox_UI.md  ← Support Ticket UI (nay đã live DB, xem Section 7)
│       └── PUSH_NOTIFICATION_APP_SPEC.md  ← ⚠️ Project cũ (Live Payments), KHÔNG phải ĐVTT
│
├── src/
│   └── loveable_extracted/            ← Snapshot frontend export (tham khảo, KHÔNG deploy từ đây)
│
└── supabase/
    ├── SUPABASE_SETUP.md              ← Hướng dẫn setup backend đầy đủ
    ├── functions/
    │   ├── _shared/cors.ts
    │   ├── calculate-la-so/
    │   │   ├── index.ts               ← Chỉ serve HTTP
    │   │   ├── logic.ts               ← ⭐ Thuật toán an sao (backend only, pure function)
    │   │   └── tests/                 ← Golden tests (23 lá số chuẩn) — xem tests/README.md
    │   ├── check-whitelist/index.ts
    │   ├── register/index.ts          ← Đăng ký + kích hoạt trial
    │   ├── resend-confirm/index.ts    ← Gửi lại email xác nhận
    │   ├── send-nhat-van/index.ts     ← Gửi Nhật Vận qua Email
    │   ├── send-inquiry-reply/index.ts ← Email báo khách khi staff trả lời ticket
    │   └── sepay-webhook/index.ts     ← Nhận callback thanh toán từ SePay
    └── migrations/
        ├── 20260613000001_initial_schema.sql      ← users, user_profiles, subscriptions, payments, nhat_van_content, notification_log, whitelist, audit_log, system_config
        ├── 20260614000002_nguyet_van_and_monitoring.sql  ← nguyet_van_content, notification_dispatch_log
        ├── 20260615000003_iot_rls.sql             ← RLS policies cho IOT
        ├── 20260615000004_user_charts.sql         ← user_charts (cache lá số cố định)
        ├── 20260628000005_pg_cron_setup.sql       ← pg_cron cho send-nhat-van
        ├── 20260628000006_inquiries.sql           ← inquiries, inquiry_messages, view inquiry_list, RLS
        ├── 20260706000007_inquiry_assignment.sql  ← inquiry_assignments, RLS gán/từ chối, view consultant_workload
        ├── 20260706000008_realtime_inquiries.sql  ← Bật Realtime cho bảng inquiries
        └── 20260706000009_inquiry_category.sql    ← Cột category (tu_van/tai_khoan_thanh_toan) + RLS siết theo category
```

```
tuvidaihongviet/                       ← Repo frontend (Lovable)
└── src/
    ├── components/
    │   ├── LaSoSection.tsx            ← ⭐ Hiển thị lá số + xuất Tải lá số (.md)/In lá số (.png, `modern-screenshot`) — export `LaSoGrid`/`getCurrentLunarMonth` dùng lại ở nơi khác cần hiển thị lá số. `LaSoGrid` tự vẽ nút chuyển năm/tháng xem (`QuickStepper` nội bộ) qua props `onChangeViewYear`/`onChangeViewMonth` — nơi gọi chỉ cần truyền callback set state, KHÔNG tự vẽ nút mũi tên riêng (từng có bug 2 bộ nút trùng nhau do nơi gọi chưa wire callback, đã dọn 07/2026)
    │   └── ...
    ├── lib/
    │   ├── supabase.ts                ← Client Customer Portal (KHÔNG hardcode global.headers.Authorization!)
    │   └── supabase-iot.ts            ← Client IOT (session riêng, storageKey khác)
    ├── hooks/
    │   └── use-iot-auth.ts            ← Đọc quyền từ session.user.app_metadata.role
    └── routes/
        ├── index.tsx                  ← Landing page
        ├── dang-ky.tsx                ← Đăng ký
        ├── dang-nhap.tsx              ← Đăng nhập
        ├── tai-khoan.tsx               ← Customer Portal (tabs: Hồ Sơ/Gói/Giao Dịch/Tư Vấn/Hỗ Trợ)
        └── iot.*.tsx                  ← IOT internal portal (iot.ho-tro.tsx = Tư Vấn + Hỗ Trợ Tài Khoản)
```

---

## 4. QUY TẮC NGÔN NGỮ THƯƠNG HIỆU — BẮT BUỘC

**KHÔNG BAO GIỜ** dùng ngôn ngữ tâm linh / bói toán:

| ❌ TRÁNH | ✅ DÙNG THAY |
|---|---|
| Xem tử vi | Phân tích chu kỳ vận trình |
| Sao xấu chiếu mệnh | Giai đoạn kháng lực cao |
| Hóa giải | Tối ưu hóa quyết định |
| Vận hạn | Cửa sổ chiến lược |
| Thầy tử vi | Chuyên gia phân tích vận trình |
| Tốt / xấu | Thuận lợi / kháng lực |
| Số mệnh | Mô hình chu kỳ cá nhân |

**Disclaimer pháp lý** — bắt buộc xuất hiện trên mọi nội dung user-facing:
```
Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống
phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế,
hoặc tài chính.
```

---

## 5. DESIGN SYSTEM

### Bảng màu
```css
--color-primary:    #0F1B2D;  /* Deep Navy — background chính */
--color-secondary:  #1E3A5F;  /* Cosmic Blue — surface/card */
--color-accent:     #C9A227;  /* Gold — dùng tiết kiệm, CTA, highlight */
--color-text:       #F4F1EC;  /* Off-White — text chính */
--color-muted:      #5A7A9A;  /* Muted Blue — placeholder, secondary text */
--color-alert:      #C0392B;  /* Warm Red — cảnh báo, kháng lực */
--color-success:    #2ECC71;  /* Jade — thuận lợi, thành công */
```

### Font
- **Be Vietnam Pro** — heading + body (hỗ trợ tiếng Việt đầy đủ)

### Màu sắc sao (hiển thị lá số)
| Loại | Màu |
|---|---|
| Chính tinh | Vàng / Cam |
| Hóa Lộc, tài lộc | Xanh lá (`#2ECC71`) |
| Sát tinh, Hóa Kỵ | Đỏ (`#C0392B`) |
| Sao lưu động (Phi tinh) | Xanh Teal, in nghiêng |

---

## 6. KIẾN TRÚC KỸ THUẬT

### Stack hiện tại

| Layer | Công nghệ | Trạng thái |
|---|---|---|
| Frontend | React (Lovable) — repo `tuvidaihongviet` | ✅ Live |
| Backend / API | Supabase Edge Functions (Deno) | ✅ Live |
| Database | Supabase PostgreSQL | ✅ Live (4 migrations deployed) |
| Auth | Supabase Auth (email + password) | ✅ Live |
| Email | **Resend** (API key trong Supabase Secrets) | ✅ Live (cần verify domain cho production) |
| Payment | **SePay webhook** + chuyển khoản thủ công | ✅ Webhook live, manual confirm qua IOT |
| Zalo OA | Zalo OA API (ZNS + tin nhắn cá nhân) | 🔄 Pending stakeholder |
| Cron | Supabase `pg_cron` | 🔄 Chưa schedule |
| Hosting | Lovable hosting (auto-deploy) | ✅ Live |

### Nguyên tắc kiến trúc BẮT BUỘC
- **Thuật toán Tử Vi chỉ chạy trên Backend** — KHÔNG xử lý tính toán ở Frontend
- `docs/demo_laso_tuvi.html` chứa prototype gốc — chỉ dùng nội bộ để verify edge case
- Source of truth cho thuật toán: `docs/algorithm/TUVI_ALGORITHM_SPEC.md` + `supabase/functions/calculate-la-so/logic.ts`
- **Golden tests bắt buộc:** trước mỗi lần deploy `calculate-la-so`, chạy `deno test --allow-read tests/` từ thư mục function. Sửa thuật toán có chủ đích → regen golden + Master duyệt diff (quy trình: `tests/README.md`)
- Frontend chỉ: nhận input → gọi API → render output
- RLS (Row-Level Security) bắt buộc trên mọi bảng Supabase
- **RLS pattern chuẩn (live từ 01/07/2026):** `coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') IN (...)` — KHÔNG dùng subquery `EXISTS` vào `users` (gây đệ quy). ⚠️ Migration files 001–003 vẫn là pattern cũ, live DB đã khác — trạng thái thật của live: `supabase/schema_live_snapshot.sql` (chụp 07/07/2026). Drift chi tiết: `Enhancement.md` mục 15.
- **Xuất ảnh lá số (PNG):** dùng `modern-screenshot` (`domToPng`), KHÔNG dùng `html-to-image` — thư viện cũ bị bug cắt mất cột phải khi chụp DOM lá số (quá nhiều CSS property/element khiến SVG trung gian phình to, rasterize thiếu), đã thay hẳn ở `LaSoSection.tsx` (07/2026)
- **Lưu tinh (Lưu Năm/Lưu Tháng) — Tứ Hóa + sắp xếp tốt/xấu (07/2026):** `anLuuTinh()` trong `logic.ts` tính Tứ Hóa (Lộc/Quyền/Khoa/Kỵ) dùng chung 1 bảng `THL` theo Can cho cả lưu Năm và lưu Tháng (từng có bug chỉ tính cho lưu Năm do bọc nhầm trong `if (isNam)`, đã bỏ). Field `hoa` trên mỗi sao lưu PHẢI được set đúng (`'loc'|'quyen'|'khoa'|'ky'`, không để `null`) — frontend (`LaSoSection.tsx`, hàm `isXau()`) dựa vào field này để xếp Hóa Kỵ lưu vào cột xấu bên phải, giống quy tắc tốt-trái/xấu-phải đang áp dụng cho phụ tinh cố định. Không hiển thị badge chữ tắt (L/Q/K/K) cạnh tên sao lưu — tên sao đã ghi rõ "Hóa Lộc/Quyền/Khoa/Kỵ" nên badge dư thừa.
- **Local frontend gọi thẳng Edge Function production, không hot-reload theo `logic.ts` local:** sửa thuật toán trong `logic.ts` chỉ có hiệu lực trên `localhost` sau khi `supabase functions deploy calculate-la-so` — vì `tuvidaihongviet/src/lib/supabase.ts` gắn cứng URL production, Edge Function chạy trên hạ tầng Supabase chứ không chạy local. Đừng báo "đã sửa xong, test trên localhost đi" nếu chưa deploy.

---

## 7. DATABASE SCHEMA (Supabase PostgreSQL)

> **Lưu ý kiến trúc:** Supabase quản lý `auth.users`. ĐVTT dùng **`public.users`** (1-1 FK với `auth.users`, KHÔNG phải `public.profiles` như tên gọi cũ ở vài chỗ tài liệu) để lưu dữ liệu mở rộng — KHÔNG tạo lại bảng users thủ công.
> ⚠️ Bảng `public.profiles` LEGACY **vẫn tồn tại trên live DB** (chưa drop, không được ghi nữa) — thấy nó trong query/dump thì đừng nhầm là bảng đang dùng. Kế hoạch dọn: `Enhancement.md` mục 15a.
>
> **⚠️ Tạo tài khoản nội bộ (staff) — 2 bước bắt buộc, hay bị quên:**
> 1. Insert/update row trong `public.users` với `role` đúng (`admin`/`van_hanh`/`tu_van_vien`).
> 2. **Riêng biệt**, set `app_metadata.role` trên chính `auth.users` — 2 nơi này KHÔNG tự đồng bộ:
>    ```sql
>    update auth.users set raw_app_meta_data = raw_app_meta_data || jsonb_build_object('role', 'tu_van_vien')
>    where id = '<uid>';
>    ```
>    IOT (`useIotAuth`) đọc quyền từ `session.user.app_metadata.role` (= `auth.users.raw_app_meta_data`), KHÔNG query `public.users`. Thiếu bước 2 → tài khoản báo "không có quyền truy cập" dù `public.users.role` đã đúng. Sau khi set, tài khoản phải đăng nhập lại (session cũ không tự refresh claim).

### Bảng `users` (extend auth.users)
```sql
id UUID PK (= auth.users.id) | email TEXT | full_name TEXT | phone_zalo TEXT
role TEXT: 'customer' | 'tu_van_vien' | 'van_hanh' | 'admin'
is_active BOOLEAN | email_verified BOOLEAN | customer_code TEXT UNIQUE  -- format: DVTT00101+
created_at | updated_at
```
*Tạo thủ công trong `register` Edge Function lúc signup (không có trigger tự động) — staff account tạo tay qua Supabase Dashboard + SQL (xem lưu ý trên).*
*Trigger `on_auth_user_created` tự tạo profile khi user signup.*

### Bảng `user_profiles` (Bát Tự)
```sql
id UUID PK | user_id UUID FK → users (UNIQUE)
birth_day INT | birth_month INT | birth_year INT
birth_hour_input INT (0–23) | birth_hour_chi INT (1=Tý...12=Hợi)
gender TEXT: 'male' | 'female'
lunar_day INT | lunar_month INT | lunar_year INT | is_leap_month BOOLEAN
```

### Bảng `user_charts` (Cache lá số cố định)
```sql
id UUID PK | user_id UUID FK → users (UNIQUE)
can_nam/chi_nam/can_thang/chi_thang/can_ngay/chi_ngay/can_gio/chi_gio TEXT
cung_menh INT | cung_than INT | cuc_so INT | cuc_name TEXT
palaces JSONB  -- 12 cung + sao cố định (cat: chinh/phu/sat), KHÔNG có lưu tinh
computed_at TIMESTAMPTZ
```
*Chỉ service role (Edge Functions) mới ghi được. Notification engine đọc bảng này để tránh tính lại mỗi lần.*

### Bảng `subscriptions`
```sql
id UUID PK | user_id UUID FK → users
plan_type: 'free' | 'trial' | 'co_ban' | 'chuyen_sau' | 'chien_luoc'
billing_cycle: 'monthly' | 'yearly'
status: 'trial' | 'active' | 'paused' | 'expired' | 'cancelled' | 'suspended'
trial_start DATE | trial_end DATE | paid_start DATE | paid_until DATE
paused_at TIMESTAMPTZ | paused_days INT | notes TEXT
```

### Bảng `payments`
```sql
id UUID PK | user_id FK | subscription_id FK
amount INT (VNĐ) | payment_method: 'sepay' | 'bank_transfer'
status: 'pending' | 'completed' | 'failed' | 'refunded' | 'expired'
plan_type TEXT | billing_cycle TEXT  -- snapshot tại thời điểm thanh toán
reference_code TEXT UNIQUE  -- format: DVTT-XXXXXX-YYYYMMDD
bank_reference TEXT | confirmed_by UUID FK | confirmed_at TIMESTAMPTZ
expires_at TIMESTAMPTZ | refund_amount INT | refund_reason TEXT
```

### Bảng `nhat_van_content` (CMS Nhật Vận)
```sql
id UUID PK | ngay DATE | cung_chi INT (1-12, NULL = tất cả cung)
signal_type: 'thuan_loi' | 'khang_luc' | 'trung_tinh'
linh_vuc: 'su_nghiep' | 'tai_chinh' | 'tinh_cam' | 'suc_khoe' | 'chung'
title TEXT (≤100) | body TEXT (≤500) | action_tip TEXT | canh_bao TEXT
created_by UUID FK
```

### Bảng `nguyet_van_content` (CMS Nguyệt Vận)
```sql
id UUID PK | thang DATE (ngày đầu tháng, vd 2026-07-01) | cung_chi INT (1-12, NULL = tất cả)
signal_type: 'thuan_loi' | 'khang_luc' | 'trung_tinh'
title TEXT (≤120) | tong_quan TEXT (≤800) ← BẮT BUỘC
su_nghiep/tai_chinh/tinh_cam/suc_khoe TEXT (≤300 each) ← optional
action_tips TEXT (≤400) | canh_bao TEXT (≤300) ← optional
created_by UUID FK → users
```

### Bảng `notification_dispatch_log`
```sql
id UUID PK | dispatch_date DATE | prediction_type: 'daily' | 'monthly'
total_eligible INT | total_sent INT | total_failed INT
status: 'running' | 'completed' | 'partial' | 'failed'
error_summary TEXT | started_at TIMESTAMPTZ | completed_at TIMESTAMPTZ
UNIQUE (dispatch_date, prediction_type)
```
*1 record mỗi đợt gửi. IOT dashboard đọc bảng này để monitor.*

### Bảng `notification_log`
```sql
id UUID PK | user_id FK | sent_at TIMESTAMPTZ
channel: 'zalo' | 'email'
content_id UUID FK → nhat_van_content
prediction_type: 'daily' | 'monthly'
dispatch_id UUID FK → notification_dispatch_log
delivery_status: 'sent' | 'delivered' | 'failed' | 'bounced'
error_message TEXT
```

### Bảng `whitelist` (Closed Beta)
```sql
id UUID PK | email TEXT | phone_zalo TEXT | notes TEXT
added_by UUID FK | added_at TIMESTAMPTZ
```

### Bảng `system_config`
```sql
key TEXT PK | value TEXT | updated_by UUID FK | updated_at TIMESTAMPTZ
-- Seeds: WHITELIST_ENABLED='true', TRIAL_DAYS='3', BANK_ACCOUNT_NAME/NUMBER/NAME=''
```

### Bảng `audit_log`
```sql
id UUID PK | actor_id UUID FK → users
action TEXT | target_type TEXT | target_id UUID
details JSONB | ip_address INET | created_at TIMESTAMPTZ
```

### Bảng `inquiries` + `inquiry_messages` + `inquiry_assignments` ✅ LIVE (migrations 006–009)
```sql
-- inquiries: ticket Tư Vấn hoặc Hỗ Trợ Tài Khoản/Thanh Toán từ khách hàng
id UUID PK | inquiry_code TEXT UNIQUE  -- DVTT-INQ-000001 (auto, trigger)
customer_id UUID FK → users | subject TEXT
status: 'open' | 'in_progress' | 'resolved' | 'closed'
priority: 'high' | 'normal'
category: 'tu_van' | 'tai_khoan_thanh_toan'  -- tách "Tư Vấn" (chat với tư vấn viên) vs "Hỗ Trợ" (tài khoản/giao dịch/thanh toán, chỉ admin/van_hanh)
assigned_to UUID FK → users | channel: 'web_form' | 'email'
created_at | updated_at

-- inquiry_messages: thread tin nhắn trong ticket
id UUID PK | inquiry_id UUID FK | sender_id UUID FK → users
body TEXT | is_internal BOOLEAN (staff-only note)
created_at

-- inquiry_assignments: lịch sử gán/từ chối (nội bộ, khách không thấy)
id UUID PK | inquiry_id UUID FK | action: 'assigned' | 'declined'
from_user UUID FK → users | to_user UUID FK → users (NULL nếu từ chối → về hàng chờ)
reason TEXT (bắt buộc khi declined) | actor_id UUID FK → users | created_at
```
**View `inquiry_list`**: gộp ticket + tên/email KH + gói + `assigned_to_name` + `message_count`/`last_message_at`, dùng chung cho Customer Portal (lọc theo `customer_id` + `category`) và IOT (`security_invoker = true`).
**View `consultant_workload`**: số khách/ticket đang active (`open`/`in_progress`) theo từng tư vấn viên — hiện trong IOT cho admin/van_hanh.

**RLS quan trọng:** `tu_van_vien` chỉ SELECT/UPDATE được ticket `assigned_to = auth.uid() AND category = 'tu_van'`; chỉ tự đặt `assigned_to = NULL` (từ chối, bắt buộc lý do qua `inquiry_assignments`), KHÔNG tự gán cho tư vấn viên khác. `admin`/`van_hanh` full access mọi category. Ticket category `tai_khoan_thanh_toan` KHÔNG bao giờ gán cho tư vấn viên (IOT chặn ở UI).

**Realtime:** bật cho `inquiries` và `inquiry_messages` (`postgres_changes`) — ticket mới/vừa gán và tin nhắn hiện live ở cả 2 phía, không cần refresh.

**Customer Portal (`tai-khoan.tsx`):** 2 tab dùng chung component `SupportTab` (khác nhau qua prop `category`) — **"Tư Vấn"** (chat hỏi đáp Tử Vi) và **"Hỗ Trợ"** (tài khoản/giao dịch/thanh toán, giữ khối liên hệ Zalo/Email + FAQ). Mỗi tab có 3 view: danh sách hội thoại → khung chat toàn phần → form câu hỏi mới.

**IOT (`iot.ho-tro.tsx`):** bộ lọc theo category, nút "Từ chối ticket" cho tư vấn viên (bắt buộc lý do), panel workload cho admin/van_hanh.

---

## 8. API CONTRACT — `calculate-la-so`

### Input (Frontend → Backend)
```json
{
  "birth_day": 15,
  "birth_month": 3,
  "birth_year": 1990,
  "birth_hour_chi": 5,
  "gender": "male",
  "view_year": 2026,
  "view_month": 1
}
```
*`view_month`: tháng âm lịch (1–12). Frontend hiển thị Can-Chi để user xác nhận đúng tháng âm.*

### Output (Backend → Frontend)
```json
{
  "tu_tru": { "can_nam": "Canh", "chi_nam": "Ngọ", "can_thang": "Mậu", "chi_thang": "Dần", "can_ngay": "...", "chi_ngay": "...", "can_gio": "...", "chi_gio": "..." },
  "cuc_so": 5,
  "cuc_name": "Thổ ngũ Cục",
  "cung_menh": 3,
  "cung_than": 7,
  "palaces": [{
    "chi": 1,
    "cung_name": "Mệnh",
    "can": "Giáp",
    "stars": [
      { "name": "Tử Vi", "cat": "chinh", "vuong_miet": "Vượng", "hoa": null },
      { "name": "L.Thái Tuế", "cat": "luu", "vuong_miet": null, "hoa": null }
    ],
    "dai_han_age_start": 25,
    "dai_han_age_end": 34,
    "tieu_han_year": 2026,
    "truong_sinh": "Trường Sinh",
    "khong_vong": false,
    "is_menh": true,
    "is_than": false
  }]
}
```

---

## 9. NOTIFICATION ENGINE

### 9A. NHẬT VẬN — Cron job 06:00 GMT+7 (23:00 UTC) mỗi ngày
1. Tạo record `notification_dispatch_log` (status='running', prediction_type='daily')
2. Quét users có subscription `trial` hoặc `active` + `email_verified = true`
3. Đọc `user_charts` cho từng user → tính lưu tinh ngày hiện tại
4. Đối chiếu sao lưu với cung trọng yếu (Mệnh, Thân, Tiểu Hạn, Quan Lộc, Tài Bạch)
5. Match content từ `nhat_van_content`:
   ```
   Ưu tiên 1: ngày + cung_chi cụ thể + signal_type
   Ưu tiên 2: ngày + cung_chi = NULL + signal_type
   Ưu tiên 3: Generic fallback
   Ưu tiên 4: Không có → ghi lỗi vào dispatch_log, skip user
   ```
6. Gửi **07:00 sáng** qua Email (Zalo OA pending)
7. Ghi `notification_log` + cập nhật `notification_dispatch_log`

### 9B. NGUYỆT VẬN — Cron job ngày 25 DL lúc 07:00 UTC (14:00 GMT+7)
1–7: Tương tự Nhật Vận nhưng dùng `nguyet_van_content`, gửi tháng kế tiếp

### Template Nhật Vận (Email / Zalo)
```
🔔 Nhật Vận [DD/MM/YYYY] — [Tên]

[TITLE]
[BODY]

💡 Gợi ý hôm nay: [ACTION_TIP]
⚠️ [CẢNH BÁO — chỉ hiển thị nếu có]

---
Đại Hồng Việt Tử Vi · Nội dung mang tính tham khảo, không thay thế tư vấn chuyên môn.
```

### Template Nguyệt Vận (Email / Zalo)
```
📅 Nguyệt Vận Tháng [MM/YYYY] — [Tên]

[TITLE]
🔍 Tổng quan: [TONG_QUAN]
[nếu có] 💼 Sự nghiệp / 💰 Tài chính / ❤️ Tình cảm / 🌿 Sức khỏe

💡 Gợi ý tháng: [ACTION_TIPS]
⚠️ [CẢNH BÁO — chỉ hiển thị nếu có]

---
Đại Hồng Việt Tử Vi · Nội dung mang tính tham khảo, không thay thế tư vấn chuyên môn.
```

---

## 10. USER JOURNEY

```
Landing Page (nhập Bát Tự)
  → Backend tính lá số → Hiển thị tinh bàn (Dark Mode)
    → CTA đăng ký nhận Nhật Vận
      → Form: Họ tên + Email + SĐT Zalo + Mật khẩu
        → Email verify (Resend, link 24h)
          → Popup xác nhận: "Nhận luận đoán đầu tiên 07:00 sáng [ngày mai]"
            → Trial 3 ngày (gửi Nhật Vận hàng sáng)
              → Ngày 4: mời nâng cấp gói subscription
```

---

## 11. SẢN PHẨM & GIÁ

### 3 Module
1. **Intelligence** — Dashboard lá số + Nhật Vận (freemium, core)
2. **Advisory** — Báo cáo + tư vấn 1-1 (trả phí)
3. **Education** — Khóa học Tử Vi (Phase 2+, chưa làm)

### Bảng giá
| Gói | Tháng | Năm |
|---|---|---|
| Miễn phí | 0 | 0 |
| Cơ Bản | 49,000 VNĐ | 390,000 VNĐ |
| Chuyên Sâu | 149,000 VNĐ | 990,000 VNĐ |
| Chiến Lược | 349,000 VNĐ | 2,900,000 VNĐ |

---

## 12. PHÂN QUYỀN HỆ THỐNG

| Role | Quyền |
|---|---|
| `admin` | Full access: quản lý user, subscription, payment, audit log |
| `van_hanh` (Operator) | Vận hành ngày-ngày: nhập CMS, xem KH, pause/resume subscription |
| `tu_van_vien` (Consultant) | Chỉ ticket **category='tu_van'** được gán cho mình: xem thông tin KH + lá số + trả lời. KHÔNG thấy ticket `tai_khoan_thanh_toan`. Có thể tự "Từ chối" ticket của mình (bắt buộc lý do) → về hàng chờ, không tự gán cho người khác. |
| `customer` | User thông thường |

**IOT (Internal Operation Tool):** Portal nội bộ tại `/iot/*` trong `tuvidaihongviet`.
- Xem/lọc danh sách khách hàng
- Thao tác: Block, Pause/Resume, Extend, Manual Activate subscription
- Quản lý giao dịch + hoàn tiền
- Coupon management
- Support/Tư Vấn Inbox (`iot.ho-tro.tsx`) — xem/trả lời ticket, gán/từ chối tư vấn viên (chỉ `tu_van`), lọc theo category, xem workload tư vấn viên (admin/van_hanh)
- Báo cáo tài chính (Revenue Report, Reconciliation, Tax Report)
- Audit log (chỉ Admin xem)

**Mã KH:** Format `DVTT00101` trở đi (DVTT00001–DVTT00100 reserved nội bộ)

---

## 13. THANH TOÁN

### SePay (webhook tự động — phương thức chính)
- `sepay-webhook` function nhận callback từ SePay khi phát hiện CK đến TK ngân hàng
- Khớp `reference_code` trong nội dung chuyển khoản → tự kích hoạt subscription
- Merchant account SePay: *pending đăng ký*

### Chuyển khoản ngân hàng (manual fallback)
- Tạo `reference_code` format `DVTT-XXXXXX-YYYYMMDD`
- User chuyển khoản ghi nội dung = reference_code
- Admin xác nhận thủ công trên IOT nếu SePay không bắt được

### Lưu ý quan trọng
- **KHÔNG tích hợp MoMo** trong giai đoạn hiện tại
- `payment_method` trong DB: `'sepay'` hoặc `'bank_transfer'`
- Deadline thanh toán: 24h sau khi tạo payment record

---

## 14. WHITELIST / CLOSED BETA

Giai đoạn MVP: chỉ user được whitelist mới đăng ký được.
- Kiểm tra `email` HOẶC `phone_zalo` trong bảng `whitelist`
- Flag `WHITELIST_ENABLED` trong `system_config` — Admin bật/tắt không cần redeploy
- Khi tắt: mở đăng ký public ngay lập tức

---

## 15. LỘ TRÌNH TRIỂN KHAI

### Phase 1 — Backend & Core Algorithm ✅ DONE
- [x] Migrate thuật toán → `calculate-la-so` Edge Function
- [x] Database schema trên Supabase (4 migrations deployed)
- [x] API: nhận Bát Tự → trả JSON 12 cung
- [x] RLS Supabase

### Phase 2 — Frontend & Auth Flow ✅ Phần lớn DONE
- [x] Landing page + form Bát Tự → hiển thị lá số (Lovable)
- [x] Đăng ký / email verify / trial activate (`register` + `resend-confirm` functions)
- [x] Dashboard khách hàng (Customer Portal)
- [x] IOT Portal (Internal Operation Tool)
- [x] Whitelist gate (`check-whitelist` function + `system_config`)
- [ ] Trang chọn gói subscription + thanh toán (pending)
- [x] Support/Tư Vấn chat 2 chiều — `inquiries`/`inquiry_messages`/`inquiry_assignments` live (migrations 006–009), Customer Portal tab "Tư Vấn" + "Hỗ Trợ", IOT gán/từ chối/workload, Realtime cả 2 phía

### Phase 3 — Payment 🔄 Partial
- [x] SePay webhook (`sepay-webhook` function)
- [ ] UI chọn gói + tạo payment record
- [ ] Manual confirm flow trên IOT
- [ ] SePay merchant account (pending đăng ký)

### Phase 4 — Nhật Vận Engine 🔄 Partial
- [x] Email delivery (`send-nhat-van` function + Resend)
- [ ] Cron job scheduling (pg_cron, chưa set up trong Dashboard)
- [ ] Logic match content đầy đủ
- [ ] Zalo OA integration (pending stakeholder meeting)
- [ ] Luồng trial hết hạn → upsell email

### Phase 5 — Admin Portal & CMS 🔄 Partial
- [x] IOT portal UI (Lovable) — Customer list, subscription management
- [x] Support Inbox UI — live DB (`inquiries`), gán/từ chối/workload, filter theo category
- [ ] CMS nhập Nhật Vận (calendar view)
- [ ] Xác nhận thanh toán thủ công trên IOT
- [ ] Audit log viewer

---

## 16. KPI 90 NGÀY

| Chỉ số | Mục tiêu |
|---|---|
| Hồ sơ miễn phí đã giao | 100 |
| Share Card được chia sẻ | 30+ |
| Convert free → trả phí | ≥ 15% |
| Retention tháng 2 | ≥ 70% |
| Doanh thu tháng 3 | ≥ 10M VNĐ |

---

## 17. PERSONA KHÁCH HÀNG

1. **Người Tìm Hướng** (25–38t) — ngã rẽ cuộc đời, đổi việc
2. **Bà Mẹ Lo Lắng** (38–55t, nữ) — quyết định cho con cái, gia đình
3. **Doanh Nhân Tâm Linh** (30–50t) — chủ doanh nghiệp, quyết định kinh doanh
4. **Gen Z Khám Phá** (18–26t) — self-discovery, viral content
5. **Người Học Tử Vi** (28–45t) — muốn tự hiểu hệ thống

---

## 18. QUY TẮC ZALO OA

- Tần suất tối đa: **1 thông báo/ngày**
- Lịch broadcast: Thứ 2 (tín hiệu tuần) / Thứ 4 (giáo dục) / Thứ 6 (cuối tuần)
- KHÔNG hứa hẹn kết quả chắc chắn
- KHÔNG dùng từ ngữ tôn giáo / thần linh

---

## 19. AUTH & BẢO MẬT

- Password: Supabase Auth quản lý (bcrypt)
- Rate limiting: Supabase Auth built-in
- JWT session: 7 ngày (cấu hình trong Supabase Dashboard)
- Role trong JWT: đọc từ `session.user.app_metadata.role` (= `auth.users.raw_app_meta_data`) — RLS và IOT đều dùng nguồn này. ⚠️ KHÔNG dùng claim `user_role` từ `custom_access_token_hook`: hook đó trên live đang đọc bảng `profiles` LEGACY (không được ghi nữa) → claim luôn sai cho user mới. Cần sửa hook hoặc gỡ (Enhancement.md mục 15b)
- PDPA compliance: Nghị định 13/2023/NĐ-CP
- Bát Tự lưu trong `user_profiles` — chỉ owner + staff đọc được (RLS)
- User có quyền yêu cầu xóa toàn bộ dữ liệu

---

## 20. HƯỚNG DẪN CHO CLAUDE

### Khi làm việc với code
- Đặt tên biến/hàm bằng **English** (snake_case cho DB, camelCase cho JS/TS)
- Comments trong code có thể dùng tiếng Việt nếu giải thích logic nghiệp vụ
- Mọi string user-facing → **tiếng Việt**
- **Bảo vệ thuật toán:** không để logic tính toán Tử Vi trên Frontend

### Khi viết nội dung
- Luôn dùng ngôn ngữ phân tích, không dùng ngôn ngữ tâm linh (xem Section 4)
- Disclaimer pháp lý phải có trên mọi nội dung user-facing

### Test local frontend trước khi push (thay vì tin vào preview Lovable)
Bang tự duyệt UI bằng mắt tại `localhost:8080` trước khi cho phép commit/push — không cần Claude tự động hóa Playwright/browser cho mỗi thay đổi nhỏ.

1. `cd tuvidaihongviet && npm install` (chỉ khi `package.json` đổi) `&& npm run dev`
2. Chờ server sẵn sàng bằng cách poll port (`curl -sf http://localhost:8080`), KHÔNG dùng `sleep` cố định
3. Báo Bang: "mở `http://localhost:8080` xem [chỗ cần chú ý]" — Bang tự duyệt UI
4. Bang ok → commit + push (luôn hỏi trước khi push, xem Git Safety Protocol)
5. Tắt dev server: `tasklist //FI "IMAGENAME eq node.exe"` rồi `taskkill //PID <pid> //F`
   (PID cột `ps aux` trong Git Bash là PID ảo MSYS, KHÔNG dùng được với `taskkill`)

**Chỉ dùng Playwright/browser automation khi** cần verify thứ mắt thường không thấy: file tải về (MD/PNG export), lỗi console, luồng nhiều bước tự động, hoặc khi Bang không có mặt mà Claude cần tự xác nhận đầu-cuối trước khi báo cáo.

⚠️ **Local KHÔNG có database riêng** — `tuvidaihongviet/src/lib/supabase.ts` gắn cứng URL + anon key production (`gqmjuzpwfpnvlpodqckt`), không có staging. An toàn để xem UI/layout; **không an toàn** để test luồng ghi dữ liệu thật (đăng ký, payment, gửi email) vì sẽ tạo record thật trên DB thật.

### Files quan trọng nhất để đọc khi cần context sâu

| File | Mục đích |
|---|---|
| `docs/product/Product.md` | Full PRD kỹ thuật |
| `docs/product/Ops.md` | IOT spec |
| `supabase/SUPABASE_SETUP.md` | Backend setup guide + migration SQL đầy đủ |
| `docs/algorithm/TUVI_ALGORITHM_SPEC.md` | ⭐ Spec thuật toán (source of truth) |
| `supabase/functions/calculate-la-so/logic.ts` | Implementation thuật toán hiện tại (index.ts chỉ serve) |
| `supabase/functions/calculate-la-so/tests/README.md` | Golden tests — quy trình sửa thuật toán an toàn |
| `supabase/functions/send-nhat-van/index.ts` | Nhật Vận email engine |
| `docs/demo_laso_tuvi.html` | Prototype gốc (chỉ đọc khi verify edge case) |
| `tuvidaihongviet/src/components/LaSoSection.tsx` | UI hiển thị lá số + selector + xuất Tải lá số/In lá số |
| `docs/email_templates.md` | Nội dung email templates |
| `supabase/migrations/20260628000006_inquiries.sql` → `...009_inquiry_category.sql` | Schema + RLS hệ thống Tư Vấn/Hỗ Trợ (chat 2 chiều) |
| `tuvidaihongviet/src/routes/tai-khoan.tsx` | Customer Portal — tab Tư Vấn/Hỗ Trợ (`SupportTab`) |
| `tuvidaihongviet/src/routes/iot.ho-tro.tsx` | IOT — quản lý ticket, gán/từ chối tư vấn viên, workload |

### Items đang chờ / blocked
- **Zalo OA**: Pending họp stakeholder — chưa có OA account và ZNS template
- **SePay**: Pending đăng ký merchant account
- **Email domain**: Cần verify domain để Resend gửi cho mọi người (hiện tại sandbox → chỉ gửi được cho ted.bgn@gmail.com)
- **Cron schedule**: Cần vào Supabase Dashboard → pg_cron → setup job cho `send-nhat-van`
- **Thiên Lương ngũ hành**: Đã chốt "Dương Mộc (đới Thổ)" (Bang quyết định 07/2026) — đồng bộ ở code frontend + `nguHanh.md` + `anSao.md`
- **Trang chọn gói + thanh toán**: UI chưa làm, chỉ có SePay webhook backend

---

*Cập nhật: 07/2026 | PM: Bang (ted.bgn@gmail.com)*
