# ĐVTT — Lovable.dev Master Prompt
## Đại Hồng Việt Tử Vi · Full-Stack Web Application
**Phiên bản 1.0 · Tháng 6/2026**

> **Cách dùng:** Copy toàn bộ Prompt 1 vào Lovable.dev khi tạo project mới.
> Sau khi Lovable build xong Phase 1, tiếp tục với Prompt 2, 3, 4 theo thứ tự.
> Mỗi prompt là một session làm việc riêng biệt trong Lovable.

---

# PROMPT 1 — PROJECT SETUP, DESIGN SYSTEM & LANDING PAGE

```
Build a Vietnamese astrology decision-support web application called "Đại Hồng Việt Tử Vi" 
(short name: HồngViệt). This is NOT a fortune-telling app — it's a personal cycle analysis 
platform that helps users make better decisions based on the Tử Vi Đẩu Số system.

## CRITICAL LANGUAGE RULE
ALL user-facing content, labels, buttons, navigation, error messages, and UI text 
must be in Vietnamese. No English text should appear on any user-facing page.
Variable names and code can be in English.

---

## TECH STACK

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS with custom design tokens (specified below)
- Backend: Supabase (Auth + Database + Edge Functions)
- State management: React Query (TanStack Query)
- Routing: React Router v6
- Forms: React Hook Form + Zod validation
- Icons: Lucide React
- Charts: Recharts (for Tử Vi chart display)

---

## DESIGN SYSTEM — ĐVTT BRAND

### Color Tokens (add to tailwind.config.js)
```js
colors: {
  'dvtt-navy':     '#0F1B2D',  // Primary background — dark
  'dvtt-blue':     '#1E3A5F',  // Secondary background — slightly lighter
  'dvtt-gold':     '#C9A227',  // Accent — use sparingly for CTA and highlights
  'dvtt-offwhite': '#F4F1EC',  // Primary text on dark backgrounds
  'dvtt-muted':    '#9BA3AF',  // Secondary text, placeholders
  'dvtt-alert':    '#C0392B',  // Warnings and resistance periods only
  'dvtt-success':  '#2ECC71',  // Favorable periods only
  'dvtt-border':   '#1E3A5F',  // Default border color
}
```

### Typography
- Font: "Be Vietnam Pro" (import from Google Fonts)
- Headings: Be Vietnam Pro, font-weight 700
- Body: Be Vietnam Pro, font-weight 400
- Numbers/dates: Be Vietnam Pro, font-weight 500, tabular-nums
- NO other fonts. Never use Inter, Poppins, or system fonts.

### Global Styles
```css
body {
  background-color: #0F1B2D;
  color: #F4F1EC;
  font-family: 'Be Vietnam Pro', sans-serif;
}
```

### Component Style Rules
- Card backgrounds: #1E3A5F (dvtt-blue), border: 1px solid rgba(201, 162, 39, 0.2)
- Border radius: 16px for cards, 12px for inputs, 8px for buttons
- Primary button: background #C9A227, text #0F1B2D, hover: opacity 0.9
- Secondary button: border 1px solid #C9A227, text #C9A227, background transparent
- Input fields: background #1E3A5F, border #2A4A7A, text #F4F1EC
- Focus ring: 0 0 0 3px rgba(201, 162, 39, 0.3)

---

## SUPABASE DATABASE SCHEMA

Create these tables in Supabase:

### Table: profiles
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  zalo_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'co_ban', 'chuyen_sau', 'chien_luoc')),
  subscription_expires_at TIMESTAMPTZ
);
```

### Table: birth_profiles
```sql
CREATE TABLE birth_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  birth_date DATE NOT NULL,           -- Solar calendar date
  birth_hour TEXT,                    -- Giờ sinh: 'ty', 'suu', 'dan', ... 'hoi'
  birth_gender TEXT CHECK (birth_gender IN ('nam', 'nu')),
  is_primary BOOLEAN DEFAULT false,   -- Main profile vs family member
  la_so_data JSONB,                   -- Computed chart data (populated by Edge Function)
  la_so_computed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: consultation_requests
```sql
CREATE TABLE consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  birth_profile_id UUID REFERENCES birth_profiles(id),
  requester_name TEXT NOT NULL,
  requester_zalo TEXT NOT NULL,
  requester_email TEXT,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN (
    'phan_tich_chu_ky_nam',     -- Annual cycle analysis
    'phan_tich_quyet_dinh',      -- Decision analysis
    'tuong_hop_doi_tac',         -- Partner compatibility
    'phan_tich_su_nghiep',       -- Career analysis
    'phan_tich_kinh_doanh',      -- Business analysis
    'tu_van_nhanh'               -- Quick consultation
  )),
  question_detail TEXT,
  status TEXT DEFAULT 'cho_xu_ly' CHECK (status IN (
    'cho_xu_ly',    -- Waiting
    'dang_xu_ly',   -- In progress
    'hoan_thanh',   -- Completed
    'da_huy'        -- Cancelled
  )),
  priority TEXT DEFAULT 'thuong' CHECK (priority IN ('cao', 'thuong', 'thap')),
  assigned_to TEXT DEFAULT 'thay',
  admin_notes TEXT,
  response_content TEXT,              -- Master's response
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: daily_signals
```sql
CREATE TABLE daily_signals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  birth_profile_id UUID REFERENCES birth_profiles(id),
  signal_date DATE NOT NULL,
  nhat_van_type TEXT,                 -- Daily cycle type
  domain_highlight TEXT,              -- sự_nghiệp / tài_chính / tình_cảm / sức_khỏe
  action_suggestion TEXT,             -- Specific advice for the day
  resistance_warning TEXT,            -- Warning if resistance period
  is_favorable BOOLEAN,
  content_reviewed_by_master BOOLEAN DEFAULT false,
  master_notes TEXT,
  delivered_via TEXT DEFAULT 'web',   -- web / zalo
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: report_orders
```sql
CREATE TABLE report_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  birth_profile_id UUID REFERENCES birth_profiles(id),
  report_type TEXT NOT NULL,
  amount_vnd INTEGER NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('chuyen_khoan', 'zalopay')),
  payment_status TEXT DEFAULT 'cho_thanh_toan' CHECK (payment_status IN (
    'cho_thanh_toan', 'da_thanh_toan', 'da_huy'
  )),
  payment_confirmed_at TIMESTAMPTZ,
  payment_confirmed_by TEXT,         -- Admin who confirmed
  report_file_url TEXT,              -- Google Drive link to PDF
  delivered_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security
Enable RLS on all tables. Users can only read/write their own data.
Admins (role: 'admin') can read all data.

---

## PAGES TO BUILD

### 1. Landing Page: / (Trang Chủ)

Build a modern, dark-themed landing page. All text in Vietnamese.

**Navigation bar (sticky):**
- Logo: "Đại Hồng Việt Tử Vi ★" — left side, text in dvtt-gold
- Nav links: Giới Thiệu | Dịch Vụ | Lá Số | Bảng Giá
- CTA button: "Bắt Đầu Miễn Phí" — dvtt-gold button, right side
- Mobile: hamburger menu

**Section 1 — Hero:**
- Headline (H1): "Biết khi nào nên tiến. Khi nào nên dừng."
- Sub-headline: "Phân tích chu kỳ vận trình cá nhân dựa trên hệ thống Tử Vi Đẩu Số — hỗ trợ quyết định chiến lược, không phải bói toán."
- Two CTA buttons: Primary "Nhận Hồ Sơ Vận Trình Miễn Phí" | Secondary "Tìm Hiểu Thêm"
- Background: dark navy with subtle constellation/star pattern (CSS animated dots, opacity 0.15)

**Section 2 — 3 Key Value Propositions:**
Display as 3 horizontal cards (stacked on mobile):

Card 1 — Master-Reviewed Content:
- Icon: graduation cap or certificate icon
- Title: "Luận Giải Bởi Chuyên Gia Thực Sự"
- Description: "Mọi phân tích và kết luận đều được Thầy Tử Vi trực tiếp viết và kiểm duyệt — không phải AI tự động. Bạn nhận được góc nhìn sâu từ người am hiểu hệ thống, không phải template đại trà."

Card 2 — Daily Signals:
- Icon: calendar/notification icon
- Title: "Tín Hiệu Hàng Ngày Cá Nhân Hóa"
- Description: "Mỗi ngày nhận một tín hiệu được tính từ lá số của riêng bạn — biết hôm nay thuận lợi cho điều gì, cần thận trọng điều gì, và một hành động cụ thể để chuẩn bị tốt hơn cho ngày của mình."

Card 3 — Always Ready:
- Icon: headset/support icon
- Title: "Sẵn Sàng Cho Mọi Yêu Cầu Tư Vấn"
- Description: "Từ quyết định sự nghiệp, đầu tư kinh doanh, đến tương hợp đối tác — đặt lịch tư vấn chuyên sâu 1-1 với chuyên gia phân tích vận trình bất kỳ lúc nào bạn cần."

**Section 3 — How It Works (Cách Hoạt Động):**
3-step horizontal flow (numbered):
1. "Nhập Thông Tin Sinh" — Điền ngày, giờ sinh và thông tin cơ bản
2. "Nhận Hồ Sơ Vận Trình" — Lá số được phân tích và luận giải bởi Thầy
3. "Theo Dõi & Quyết Định" — Nhận tín hiệu hàng ngày, đặt tư vấn khi cần

**Section 4 — Pricing (Bảng Giá):**
4 tier cards in a row (2x2 on mobile):
- Miễn Phí: 0đ — Hồ sơ cơ bản + 1 insight/tuần
- Cơ Bản: 49.000đ/tháng — Full dashboard + lịch tháng
- Chuyên Sâu: 149.000đ/tháng — Trên + cảnh báo chu kỳ + 1 báo cáo/năm
- Chiến Lược: 349.000đ/tháng — Trên + check-in chuyên gia 20 phút/tháng
Highlight the "Chuyên Sâu" tier as "Phổ Biến Nhất"

**Section 5 — Legal Disclaimer (bắt buộc):**
Small text at bottom:
"Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính."

**Footer:**
- Logo + tagline
- Links: Giới Thiệu | Dịch Vụ | Liên Hệ | Chính Sách Bảo Mật
- Contact: Zalo link + email

---

### 2. Auth Pages

**/dang-ky (Register):**
Form fields:
- Họ và tên (required)
- Email (required)
- Mật khẩu (required, min 8 chars)
- Số Zalo (optional, for notification delivery)
- Checkbox: "Tôi đã đọc và đồng ý với Điều Khoản Sử Dụng"
Submit button: "Tạo Tài Khoản"
Link: "Đã có tài khoản? Đăng nhập"

**/dang-nhap (Login):**
Form fields:
- Email
- Mật khẩu
- Checkbox: "Ghi nhớ đăng nhập"
Submit: "Đăng Nhập"
Links: "Quên mật khẩu?" | "Tạo tài khoản mới"

**/dat-lai-mat-khau (Reset password):**
Standard password reset flow.

---

### 3. Dashboard: /dashboard

Protected route (requires login).

**Layout:**
- Left sidebar navigation (desktop): Logo | Tổng Quan | Lá Số | Tín Hiệu Ngày | Đặt Tư Vấn | Cài Đặt
- Bottom navigation (mobile)
- Top bar: User name + avatar placeholder + notification bell

**Dashboard Main Content:**
Show a summary dashboard with:

1. "Chu Kỳ Hiện Tại" card — shows current cycle status (placeholder until chart computed)
   - Status badge: THUẬN LỢI (green) / TRUNG TÍNH (gray) / KHÁNG LỰC (red)

2. "Tín Hiệu Hôm Nay" card — today's signal (placeholder text if no chart)
   - Domain highlight (sự nghiệp/tài chính/tình cảm/sức khỏe)
   - 1 action suggestion

3. "Hồ Sơ Vận Trình" prompt card — if user has no birth profile, show CTA to create one

4. "Yêu Cầu Tư Vấn Gần Đây" — last 3 consultation requests, status badges

---

### 4. Birth Profile Setup: /dashboard/la-so/tao-moi

**Step 1 — Nhập Thông Tin Sinh:**
Form with:
- Họ và tên (for this profile — could be a family member)
- Ngày sinh dương lịch: day/month/year (3 separate dropdowns — DO NOT use date picker, use dropdowns)
- Giờ sinh: dropdown with 12 earthly branch hours:
  Tý (23:00-01:00) | Sửu (01:00-03:00) | Dần (03:00-05:00) | Mão (05:00-07:00) |
  Thìn (07:00-09:00) | Tỵ (09:00-11:00) | Ngọ (11:00-13:00) | Mùi (13:00-15:00) |
  Thân (15:00-17:00) | Dậu (17:00-19:00) | Tuất (19:00-21:00) | Hợi (21:00-23:00) |
  Không biết giờ sinh
- Giới tính: Nam | Nữ
- Checkbox: "Đây là hồ sơ chính của tôi"

**Step 2 — Confirmation:**
Show summary of entered data + note:
"Lá số của bạn sẽ được Thầy xem xét và bổ sung luận giải trong vòng 24 giờ. Bạn sẽ nhận thông báo qua Zalo khi hoàn tất."

Submit button: "Tạo Hồ Sơ Vận Trình"

On submit: save to birth_profiles, trigger la_so_data computation via Edge Function (see PROMPT 3).

---

### 5. Lá Số Viewer: /dashboard/la-so/[id]

Display the computed Tử Vi chart for a birth profile.
(Full chart implementation in PROMPT 3 — for now, show a loading/placeholder state)

Structure:
- Header: User name + birth info summary
- Main area: Circular or grid chart layout placeholder
- Tab: "Luận Giải" — Master's written analysis (from la_so_data.master_notes)
- Tab: "Chi Tiết Từng Cung" — Details per palace

---

### 6. Consultation Booking: /dashboard/tu-van

**Step 1 — Choose Type:**
6 consultation type cards to select from:
- Phân Tích Chu Kỳ Năm (199K-349K)
- Phân Tích Quyết Định Cụ Thể (149K-249K)
- Tương Hợp Đối Tác (299K-499K)
- Phân Tích Sự Nghiệp (399K-699K)
- Phân Tích Kinh Doanh (699K-1.5M)
- Tư Vấn Nhanh 30 phút (200K-400K)

**Step 2 — Fill Details:**
- Select birth profile (dropdown of user's saved profiles)
- Describe specific question (textarea, max 500 chars)
- Preferred contact: Zalo | Điện thoại | Video call
- Preferred time slot: Sáng | Chiều | Tối

**Step 3 — Payment Instructions:**
Show bank transfer details and ZaloPay QR placeholder.
Note: "Sau khi chuyển khoản, vui lòng nhắn tin xác nhận qua Zalo của chúng tôi."
Save to consultation_requests with status: 'cho_xu_ly'

---

### 7. Settings: /dashboard/cai-dat

- Update profile (name, phone, Zalo)
- Change password
- Notification preferences
- Delete account option

---

## IMPORTANT NOTES FOR LOVABLE

1. All navigation links and buttons must be in Vietnamese as specified
2. The Tử Vi chart calculation engine will be added in PROMPT 3 — for now build the UI containers
3. Payment is MANUAL (bank transfer / personal ZaloPay) — no payment gateway integration
4. Use Supabase Auth (email/password) — no social login for MVP
5. Mobile-first responsive design, optimized for 375px screens
6. Subtle animations: fade in sections on scroll, smooth transitions between pages
7. Star/constellation subtle background pattern on landing page using CSS (no images needed)

Build this now. Start with the landing page and auth pages, then the dashboard structure.
```

---

# PROMPT 2 — ADMIN / INTERNAL OPS PANEL

```
Add an admin panel to the Đại Hồng Việt Tử Vi application.
This is an internal tool for the product operations team (PM + Master).

## ADMIN ROUTES

All admin routes under /admin — protected, only accessible to users with admin role.
Add admin role check: query profiles table for role='admin', redirect non-admins to /dashboard.

### /admin — Dashboard Overview
Show 4 metric cards:
- Tổng yêu cầu hôm nay (consultation requests today)
- Đang chờ xử lý (pending requests count) — highlight in orange if > 5
- Hồ sơ mới hôm nay (new birth profiles today)
- Doanh thu tuần này (this week's confirmed payments in VND)

Show a table of latest 10 consultation requests with:
Columns: Tên | Loại tư vấn | Trạng thái | Thời gian | Thao tác
Status badges: Chờ xử lý (yellow) | Đang xử lý (blue) | Hoàn thành (green) | Đã hủy (red)
Action: View detail button

### /admin/yeu-cau — Consultation Requests Management

Full table of all consultation_requests with:
- Filter by: status | consultation_type | date range
- Sort by: created_at | priority
- Search by: name | zalo phone

Row actions:
- View full request details
- Update status (dropdown: chờ xử lý → đang xử lý → hoàn thành)
- Add admin notes
- Mark payment as confirmed (update payment_status in report_orders)
- Add response/notes for the customer

### /admin/ho-so-van-trinh — Birth Profiles Management

Table of all birth_profiles with:
- Filter by: la_so_computed (yes/no) | subscription_tier
- For each profile: link to view la_so, mark as reviewed by Master
- Add Master's luận giải notes (textarea → saves to la_so_data.master_notes)
- Mark content_reviewed_by_master = true

### /admin/nguoi-dung — User Management

Table of all profiles:
- Columns: Tên | Email | Zalo | Gói | Ngày đăng ký | Hành động
- Change subscription tier
- View user's consultation history

### /admin/don-hang — Payment Orders

Table of all report_orders:
- Filter by payment_status
- Mark as paid (update payment_confirmed_at + payment_confirmed_by)
- Upload report file URL (Google Drive link for PDF delivery)
- Mark as delivered

### /admin/tin-hieu-ngay — Daily Signals Management

Interface to review and approve daily signals before they're shown to users:
- List of generated signals for today
- For each signal: show content + edit button
- Toggle: content_reviewed_by_master
- Bulk approve all

## ADMIN SIDEBAR NAVIGATION
Tổng Quan | Yêu Cầu Tư Vấn | Hồ Sơ Vận Trình | Người Dùng | Đơn Hàng | Tín Hiệu Ngày

## IMPORTANT
- Admin panel uses same design tokens as main app (dark theme, ĐVTT colors)
- All admin tables should be sortable and filterable
- Show Vietnamese labels everywhere
- Real-time updates for consultation_requests using Supabase realtime subscriptions
```

---

# PROMPT 3 — TỬ VI CALCULATION ENGINE

```
Implement the Tử Vi Đẩu Số (紫微斗數) chart calculation engine as a Supabase Edge Function.

## OVERVIEW

The Tử Vi system places 14 main stars and dozens of secondary stars across 12 palaces (cung) 
based on the person's birth data. This is a Vietnamese/Chinese astrology system with 
complex calculation rules.

## SUPABASE EDGE FUNCTION: calculate-la-so

Create a Supabase Edge Function at supabase/functions/calculate-la-so/index.ts

**Input:**
```typescript
interface CalculationInput {
  birth_profile_id: string;
  birth_date: string;          // YYYY-MM-DD solar calendar
  birth_hour: string;          // ty, suu, dan, mao, thin, ty, ngo, mui, than, dau, tuat, hoi
  birth_gender: 'nam' | 'nu';
}
```

**Output: la_so_data JSONB structure:**
```typescript
interface LasoData {
  menh_element: 'kim' | 'moc' | 'thuy' | 'hoa' | 'tho';
  menh_cuc: string;            // Ngũ hành cục: Kim tứ cục, Mộc tam cục, etc.
  thien_can: string;           // Year's heavenly stem
  dia_chi: string;             // Year's earthly branch
  an_sao: PalaceData[];        // 12 palaces with stars
  tu_hoa: TransformationData;  // 4 transformations
  menh_chu: string;            // Mệnh chủ star
  than_chu: string;            // Thân chủ star
  computed_at: string;
}

interface PalaceData {
  palace_index: number;        // 0-11
  palace_name: string;         // Mệnh, Phụ Mẫu, Phúc Đức, etc.
  can: string;                 // Heavenly stem of this palace
  chi: string;                 // Earthly branch of this palace
  main_stars: string[];        // Main stars in this palace
  secondary_stars: string[];   // Secondary stars
  transformation: string | null; // Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ
}
```

## CALCULATION ALGORITHM

### Step 1: Convert Solar to Lunar Calendar
Use a Vietnamese lunar calendar conversion library or implement the conversion.
We need: lunar year (can chi), lunar month, lunar day.

### Step 2: Determine Ngũ Hành Cục (Five Element Group)
Based on the Thiên Can of birth year and the Địa Chi of Mệnh cung:
- Kim tứ cục (4): certain year/palace combinations
- Mộc tam cục (3): certain combinations  
- Thủy nhị cục (2): certain combinations
- Thổ ngũ cục (5): certain combinations
- Hỏa lục cục (6): certain combinations
(Implement full lookup table)

### Step 3: Determine Mệnh Cung Position
Based on birth month and birth hour:
- 12 birth months × 12 birth hours = position of Mệnh cung
- Use the standard Tử Vi palace placement table

### Step 4: Place 12 Palaces
Starting from Mệnh cung, place the 12 palaces in order:
Mệnh → Phụ Mẫu → Phúc Đức → Điền Trạch → Quan Lộc → Nô Bộc → 
Thiên Di → Tật Ách → Tài Bạch → Tử Tức → Phu Thê → Huynh Đệ

### Step 5: Place Tử Vi Star
Based on the day of birth and Ngũ Hành Cục number, find which palace gets Tử Vi.
Use the standard Tử Vi placement table (day 1-30 × cục 2-6).

### Step 6: Place the 14 Main Stars (An Chính Tinh)
Once Tử Vi is placed, the other 13 main stars follow fixed relative positions:
- Thiên Cơ: 1 palace before Tử Vi (counter-clockwise)
- Thái Dương: 2 palaces before
- Vũ Khúc: 3 palaces before
- Thiên Đồng: 4 palaces before
- Liêm Trinh: 5 palaces before
- Thiên Phủ: placed separately based on Tử Vi position (mirror placement)
- Thái Âm: 1 palace after Thiên Phủ
- Tham Lang: 2 after Thiên Phủ
- Cự Môn: 3 after
- Thiên Tướng: 4 after
- Thiên Lương: 5 after
- Thất Sát: 6 after
- Phá Quân: 7 after

### Step 7: Place Secondary Stars
Place based on birth year's Can Chi:
- Lộc Tồn: based on Thiên Can
- Kình Dương: 1 palace after Lộc Tồn
- Đà La: 1 palace before Lộc Tồn
- Thiên Khôi, Thiên Việt: based on Thiên Can
- Văn Xương, Văn Khúc: based on birth hour
- Hóa Tinh group (Hỏa Tinh, Linh Tinh): based on birth year Chi and birth hour
- Địa Không, Địa Kiếp: based on birth hour

### Step 8: Determine Tứ Hóa (4 Transformations)
Based on birth year's Thiên Can, assign transformations to 4 specific stars:
- Hóa Lộc (prosperity)
- Hóa Quyền (power)
- Hóa Khoa (reputation)
- Hóa Kỵ (obstacle)

Each Thiên Can has a fixed set of 4 stars that receive these transformations.
Implement the full 10-can × 4-transformation lookup table.

## FRONTEND: Lá Số Chart Display

After the edge function computes la_so_data, display it as a visual chart.

### Chart Layout (12-palace grid):
```
┌──────┬──────┬──────┬──────┐
│ Tỵ   │ Ngọ  │ Mùi  │ Thân │
│ [4]  │ [3]  │ [2]  │ [1]  │
├──────┼──────┴──────┼──────┤
│ Thìn │              │ Dậu  │
│ [5]  │   USER INFO  │ [12] │
├──────┼──────┬──────┼──────┤
│ Mão  │ Dần  │ Sửu  │ Tuất │
│ [6]  │ [7]  │ [8]  │ [9]  │
└──────┴──────┴──────┴──────┘
```
Each cell shows:
- Palace name (Mệnh, Tài Bạch, etc.)
- Stars in that palace (list)
- Transformation indicator if applicable
- Cycle status indicator (favorable/resistant)

Use CSS Grid for the chart layout.
Dark background (#1E3A5F) with gold (#C9A227) for star names.

## TRIGGER
When a birth_profile is saved, automatically call this edge function.
Update birth_profiles.la_so_data with the result.
Send realtime notification to the user's dashboard.
```

---

# PROMPT 4 — DAILY SIGNAL SYSTEM

```
Implement the daily signal system for Đại Hồng Việt Tử Vi.

## OVERVIEW
Each user with a computed lá số receives a personalized daily signal based on their 
individual chart. The signal is reviewed by the Master before delivery.

## SUPABASE EDGE FUNCTION: generate-daily-signals

Create: supabase/functions/generate-daily-signals/index.ts

This function runs daily (cron job) and generates signals for all active users.

**Logic:**
1. Get all birth_profiles with la_so_data computed
2. For each profile, calculate today's Nhật Vận (daily cycle) based on:
   - Current solar date → convert to lunar
   - Today's Can Chi (heavenly stem + earthly branch of today)
   - User's natal chart configuration
3. Determine which domain is highlighted (sự_nghiệp/tài_chính/tình_cảm/sức_khỏe)
4. Generate initial signal text (template-based, not AI-generated)
5. Save to daily_signals with content_reviewed_by_master = false
6. Admin reviews and approves in the admin panel before signals go live

## DAILY SIGNAL DISPLAY

In the user dashboard, show today's signal card:

```
┌─────────────────────────────────────────┐
│  📅  TÍN HIỆU HÔM NAY                  │
│  [date in Vietnamese]                    │
├─────────────────────────────────────────┤
│  Lĩnh vực nổi bật:  SỰ NGHIỆP ↑        │
│                                          │
│  Nhật Vận: [type]                        │
│                                          │
│  "[Action suggestion text]"             │
│                                          │
│  [Warning banner if resistance period]  │
└─────────────────────────────────────────┘
```

If signal not yet reviewed by Master, show:
"Tín hiệu hôm nay đang được Thầy xem xét — sẽ cập nhật trước 8:00 sáng."

## SIGNAL TEMPLATES

Create a template system where the content is editable by admin.
Templates are stored in a new table:

```sql
CREATE TABLE signal_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nhat_van_type TEXT NOT NULL,
  domain TEXT NOT NULL,
  is_favorable BOOLEAN NOT NULL,
  template_text TEXT NOT NULL,
  action_suggestion TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

The generated signal picks the right template based on the calculated Nhật Vận type 
and domain, then the Master can edit the specific text before approving.

## ADMIN: Signal Review Interface

In /admin/tin-hieu-ngay:
- Show all today's generated signals grouped by domain
- Each signal: user name | domain | template text | Master notes field | Approve toggle
- "Duyệt Tất Cả" (Approve All) button
- Signals only become visible to users after approval

## WEEKLY BROADCAST SIGNALS

In addition to personalized daily signals, there are weekly group signals:
- Monday: Weekly Signal (Tín Hiệu Tuần) — for all users, by Mệnh element group
- Wednesday: Educational content
- Friday: Decision prompt for weekend

These are created manually by admin in /admin/tin-hieu-ngay with a "broadcast" flag.
Show in all users' dashboards as a separate "Tín Hiệu Tuần" section.
```

---

## GHI CHÚ SỬ DỤNG

### Thứ tự thực hiện trong Lovable:
1. **Prompt 1** — Chạy đầu tiên. Xây toàn bộ FE và DB schema cơ bản.
2. **Prompt 2** — Sau khi Prompt 1 hoàn thành. Thêm admin panel.
3. **Prompt 3** — Sau khi Prompt 2 xong. Implement Tử Vi engine + chart display.
4. **Prompt 4** — Cuối cùng. Daily signal system.

### Khi paste vào Lovable:
- Copy từ dòng đầu tiên (````) đến dòng cuối (```) của mỗi prompt
- Không cần copy header và ghi chú ngoài dấu backtick
- Nếu Lovable hỏi về auth: chọn Supabase Auth
- Nếu Lovable hỏi về database: dùng Supabase Postgres

### Sau mỗi Prompt:
1. Sync code lên GitHub (Settings → GitHub Integration trong Lovable)
2. Test các tính năng cơ bản
3. Báo cáo lại cho Tiểu Gấu nếu có lỗi hoặc cần điều chỉnh

### Điều chỉnh cần thiết sau khi build:
- Thay thế text placeholder trong landing page bằng nội dung thực tế từ Thầy
- Cập nhật bank transfer details trong phần thanh toán
- Cài đặt Supabase Edge Function cron job cho daily signals
- Test Tử Vi calculation với ít nhất 5 lá số mẫu

---

*Tài liệu này được Tiểu Gấu (Claude) chuẩn bị cho team ĐVTT · Tháng 6/2026*
*Cập nhật sau mỗi sprint dựa trên feedback từ Lovable build.*
