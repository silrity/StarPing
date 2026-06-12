# ĐVTT — Lovable.dev Prompt: Landing Page + Đăng Ký
## Phase 1A · Paste nguyên vào Lovable.dev khi tạo project mới

---

```
Build a Vietnamese astrology decision-support web application called "Đại Hồng Việt Tử Vi"
(brand: ĐVTT, digital name: HồngViệt). This is NOT fortune-telling — it's a personal
cycle-analysis platform using the Tử Vi Đẩu Số system.

════════════════════════════════════════════
CRITICAL RULES (enforce throughout)
════════════════════════════════════════════

1. ALL user-facing text must be in Vietnamese (labels, buttons, nav, errors, toasts).
2. NEVER use the words: xem tướng, bói toán, số mệnh, thần linh, linh thiêng.
   Use instead: phân tích chu kỳ, cửa sổ chiến lược, giai đoạn kháng lực, mô hình chu kỳ.
3. Disclaimer (append to every page footer):
   "Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống
   phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế,
   hoặc tài chính."
4. Manual payments only — NO payment gateway. Bank transfer + ZaloPay instructions only.

════════════════════════════════════════════
TECH STACK
════════════════════════════════════════════

- React + TypeScript + Vite
- Tailwind CSS (custom tokens below)
- Supabase (Auth + Postgres + Storage)
- React Query (TanStack Query v5)
- React Hook Form + Zod validation
- React Router v6
- Lucide React icons
- Font: Be Vietnam Pro (Google Fonts — supports Vietnamese diacritics)

════════════════════════════════════════════
DESIGN SYSTEM TOKENS
════════════════════════════════════════════

In tailwind.config.ts, add these custom colors:

colors: {
  'dvtt-navy':    '#0B1624',
  'dvtt-blue':    '#152237',
  'dvtt-blue2':   '#1C3050',
  'dvtt-gold':    '#C9A227',
  'dvtt-gold-lt': '#E8C84A',
  'dvtt-gold-dk': '#8B6F1A',
  'dvtt-off':     '#F4F1EC',
  'dvtt-muted':   '#7A8FA5',
  'dvtt-dim':     '#3A4E63',
  'dvtt-alert':   '#C0392B',
  'dvtt-success': '#27AE60',
  'dvtt-teal':    '#1ABC9C',
}

Global styles (index.css):
- body: background dvtt-navy, color dvtt-off, font Be Vietnam Pro
- All headings may use Cormorant Garamond (import from Google Fonts) for a refined look
- Scrollbar: thin, dark themed

════════════════════════════════════════════
SUPABASE DATABASE SCHEMA
════════════════════════════════════════════

Create these tables via Supabase migrations:

-- Table: registrations (core signup table, no auth required initially)
create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  zalo_phone text not null,
  email text,
  birth_date date not null,
  birth_hour smallint not null check (birth_hour between 1 and 12),
  -- 1=Tý, 2=Sửu, 3=Dần, 4=Mão, 5=Thìn, 6=Tỵ, 7=Ngọ, 8=Mùi, 9=Thân, 10=Dậu, 11=Tuất, 12=Hợi
  gender text not null check (gender in ('nam', 'nu')),
  subscription_tier text default 'free' check (subscription_tier in ('free','co-ban','chuyen-sau','chien-luoc')),
  status text default 'pending' check (status in ('pending','active','inactive')),
  notes text,
  referral_source text
);

-- Enable RLS
alter table public.registrations enable row level security;

-- Allow anyone to insert (public signup)
create policy "Anyone can register" on public.registrations
  for insert with check (true);

-- Only service role can read (admin only)
create policy "Service role reads all" on public.registrations
  for select using (auth.role() = 'service_role');

════════════════════════════════════════════
PAGES TO BUILD (Phase 1A)
════════════════════════════════════════════

Routes:
  /           → Landing page
  /dang-ky    → Registration form page
  /cam-on     → Thank-you page (after successful registration)

════════════════════════════════════════════
PAGE 1: LANDING PAGE (/)
════════════════════════════════════════════

Build a dark, cosmic-aesthetic Vietnamese landing page. Sections in order:

─── SECTION 1: HERO ───
Full-viewport section. Background: dvtt-navy with a subtle CSS radial-gradient
star pattern (scattered gold/white dots at low opacity using multiple
radial-gradient backgrounds). Centered content:

  - Small eyebrow text (gold, uppercase, letter-spacing): "ĐẠI VIỆT TINH TỬ"
  - H1 (Cormorant Garamond, gradient text gold): 
    "Chu Kỳ Vận Trình Của Bạn — Trong Tầm Tay"
  - Subheadline (14-16px, dvtt-muted, italic):
    "Mỗi ngày, nhận phân tích cá nhân từ lá số Tử Vi của bạn.
     Biết khi nào nên tiến, khi nào nên chờ."
  - 2 CTAs side by side:
      Primary (gold bg, navy text): "Đăng Ký Miễn Phí →"  → links to /dang-ky
      Secondary (outline gold): "Xem Demo Lá Số"           → smooth-scrolls to #demo
  - Trust indicators below (small, dvtt-muted):
      "✦ Phân tích từ lá số cá nhân · Không phải theo nhóm"
      "✦ Soạn bởi chuyên gia phân tích vận trình · Không phải AI"
      "✦ Giao qua Zalo mỗi sáng"

─── SECTION 2: HOW IT WORKS (3 steps) ───
Section title: "Cách Hoạt Động"
3-column card layout on desktop, stacked on mobile:

  Step 1 — Icon: UserPlus
  Title: "Tạo Hồ Sơ Vận Trình"
  Body: "Nhập ngày, giờ sinh và giới tính. Hệ thống lập lá số tử vi riêng cho bạn trong vài giây."

  Step 2 — Icon: Star
  Title: "Chuyên Gia Phân Tích"
  Body: "Mỗi ngày, chuyên gia phân tích vận trình soạn nội dung dựa trên chu kỳ thực của lá số bạn — không dùng AI để viết kết luận."

  Step 3 — Icon: Bell
  Title: "Nhận Tín Hiệu Mỗi Sáng"
  Body: "Thông báo Zalo OA gửi lúc 6–7 giờ sáng. Biết ngày hôm nay thuận lợi hay kháng lực, nên tập trung vào lĩnh vực nào."

─── SECTION 3: KEY PROPOSITIONS (3 cards) ───
Section title: "Tại Sao Khác Biệt"
3 dark cards with gold border accent on hover:

  Card 1 — Icon: Brain
  Title: "Phân Tích Cá Nhân, Không Phải Nhóm"
  Body: "Mỗi lá số là duy nhất. Tín hiệu của bạn khác hoàn toàn với người sinh cùng năm hay cùng cung hoàng đạo."

  Card 2 — Icon: CheckCircle  
  Title: "Kết Luận Từ Chuyên Gia"
  Body: "Mọi nội dung đều được soạn và kiểm duyệt bởi chuyên gia phân tích vận trình — đảm bảo tính chính xác và chiều sâu."

  Card 3 — Icon: Zap
  Title: "Hành Động Được Ngay"
  Body: "Không chỉ 'tốt' hay 'xấu'. Mỗi tín hiệu đi kèm gợi ý hành động cụ thể: ký hợp đồng, họp quan trọng, khởi động dự án."

─── SECTION 4: DEMO LÁ SỐ (id="demo") ───
Section title: "Thử Lập Lá Số Của Bạn"
Subtitle (dvtt-muted): "Demo minh hoạ — kết quả đầy đủ có trong hồ sơ cá nhân"

Embed a WORKING lá số calculator:

  Input form (dark card, gold border):
    - Date picker: "Ngày sinh (dương lịch)"
    - Select: "Giờ sinh" — options:
        Tý (23:00-01:00), Sửu (01:00-03:00), Dần (03:00-05:00), Mão (05:00-07:00),
        Thìn (07:00-09:00), Tỵ (09:00-11:00), Ngọ (11:00-13:00), Mùi (13:00-15:00),
        Thân (15:00-17:00), Dậu (17:00-19:00), Tuất (19:00-21:00), Hợi (21:00-23:00)
    - Select: "Giới tính" — Nam / Nữ
    - Button (gold): "Lập Lá Số"

  Result display: a 4×4 grid Tử Vi chart with:
    - 12 palace cells around a center info box
    - Each cell: Chi name (top), Cung chủ name, Đại hạn range, stars listed
    - Color coding: gold=chính tinh, green=Hóa Lộc, orange=Hóa Quyền, blue=Hóa Khoa, red=Hóa Kỵ/sát tinh, grey=phi tinh
    - Small state badge on chính tinh: M=Miếu, V=Vượng, H=Hãm
    - Badge: "MỆNH" on mệnh palace, "THÂN" on thân palace

  The calculation logic (implement in a useZuviCalculation.ts hook):

  === LUNAR CALENDAR (Ho Ngoc Duc algorithm) ===
  function sol2lun(dd, mm, yy) → {d, m, y, leap}
  Use the HND astronomical algorithm (NewMoon, SunLongitude functions) with timezone +7.
  Key: use getLeapMonthOffset() to correctly handle intercalary months.

  === AN SAO ALGORITHM ===
  canNam(lunarYear) = (lunarYear + 6) % 10 + 1  // 1-10, Giáp to Quý
  chiNam(lunarYear) = (lunarYear + 8) % 12 + 1  // 1-12, Tý to Hợi

  cungMenh = dich(3, thangAm - 1, -gioSinh + 1)
  cungThan  = dich(3, thangAm - 1,  gioSinh - 1)
  where dich(start, ...offsets) = ((start + sum(offsets) - 1) % 12) + 1  [modulo 1-12]

  cucSo = napAmCuc(cungMenh, canThangMenh)
    where canThangMenh = ((cungMenh - 3 + 12) % 12 + canThangGieng) % 10 || 10
          canThangGieng = (canNam * 2 + 1) % 10 || 10

  Nạp âm cục lookup table napAmCuc[chi][can]:
  // Returns cục số: 2=Thủy, 3=Mộc, 4=Kim, 5=Thổ, 6=Hỏa
  const NAP_AM = [
    null,
    [0, 4,0,2,0,6,0,5,0,3,0], // Tý(1)
    [0, 0,4,0,2,0,6,0,5,0,3], // Sửu(2)
    [0, 2,0,6,0,5,0,3,0,4,0], // Dần(3)
    [0, 0,2,0,6,0,5,0,3,0,4], // Mão(4)
    [0, 6,0,5,0,3,0,4,0,2,0], // Thìn(5)
    [0, 0,6,0,5,0,3,0,4,0,2], // Tỵ(6)
    [0, 4,0,2,0,6,0,5,0,3,0], // Ngọ(7)
    [0, 0,4,0,2,0,6,0,5,0,3], // Mùi(8)
    [0, 2,0,6,0,5,0,3,0,4,0], // Thân(9)
    [0, 0,2,0,6,0,5,0,3,0,4], // Dậu(10)
    [0, 6,0,5,0,3,0,4,0,2,0], // Tuất(11)
    [0, 0,6,0,5,0,3,0,4,0,2], // Hợi(12)
  ];

  timTuVi(cucSo, ngayAm):
    let cungDan=3, cuc=cucSo
    while(cuc < ngayAm) { cuc += cucSo; cungDan++ }
    let saiLech = cuc - ngayAm
    if(saiLech % 2 === 1) saiLech = -saiLech
    return dich(cungDan, saiLech)

  14 chính tinh positions (from tvP = timTuVi result, tpP = Thiên Phủ):
    tpP = dich(3, 3 - tvP)  // Thiên Phủ đối cung với Tử Vi qua Ngọ-Tý

    Tử Vi hệ (từ tvP):
      Tử Vi=tvP, Liêm Trinh=dich(tvP,4), Thiên Đồng=dich(tvP,7),
      Vũ Khúc=dich(tvP,8), Thái Dương=dich(tvP,9), Thiên Cơ=dich(tvP,11)

    Thiên Phủ hệ (từ tpP):
      Thiên Phủ=tpP, Thái Âm=dich(tpP,1), Tham Lang=dich(tpP,2),
      Cự Môn=dich(tpP,3), Thiên Tướng=dich(tpP,4), Thiên Lương=dich(tpP,5),
      Thất Sát=dich(tpP,6), Phá Quân=dich(tpP,10)

  Trạng thái chính tinh (Miếu/Vượng/Đắc/Bình/Hãm) — store as a lookup object
  keyed by star name, value = array[13] (index 1-12 = chi position):
  const TRANG_THAI = {
    'Tử Vi':     [,'B','Đ','M','B','V','M','M','Đ','M','B','V','B'],
    'Liêm Trinh':[,'V','Đ','V','H','M','H','V','Đ','V','H','M','H'],
    'Thiên Đồng':[,'V','H','M','Đ','H','Đ','H','H','M','H','H','Đ'],
    'Vũ Khúc':   [,'V','M','V','Đ','M','H','V','M','V','Đ','M','H'],
    'Thái Dương':[,'H','Đ','V','V','V','M','M','Đ','H','H','H','H'],
    'Thiên Cơ':  [,'Đ','Đ','H','M','M','V','Đ','Đ','V','M','M','H'],
    'Thái Âm':   [,'V','Đ','H','H','H','H','H','Đ','V','M','M','M'],
    'Tham Lang':  [,'H','M','Đ','H','V','H','H','M','Đ','H','V','H'],
    'Cự Môn':    [,'V','H','V','M','H','H','V','H','Đ','M','H','Đ'],
    'Thiên Tướng':[,'V','Đ','M','H','V','Đ','V','Đ','M','H','V','Đ'],
    'Thiên Lương':[,'V','Đ','V','V','M','H','M','Đ','V','H','M','H'],
    'Thất Sát':  [,'M','Đ','M','H','H','V','M','Đ','M','H','H','V'],
    'Phá Quân':  [,'M','V','H','H','Đ','H','M','V','H','H','Đ','H'],
  };

  Tứ Hóa (by canNam 1-10) — [Lộc, Quyền, Khoa, Kỵ] as palace positions:
    1(Giáp): [ltP,   pqP,    vkP,  tduP]
    2(Ất):   [tkP,   tluP,   tvP,  taP]
    3(Bính): [tdP,   tkP,    vxP,  ltP]
    4(Đinh): [taP,   tdP,    tkP,  cmP]
    5(Mậu):  [tlangP,taP,    hbP,  tkP]  // hbP=Hữu Bật
    6(Kỷ):   [vkP,   tlangP, tluP, vkhP] // vkhP=Văn Khúc
    7(Canh): [tduP,  vkP,    tdP,  taP]
    8(Tân):  [cmP,   tduP,   vkhP, vxP]
    9(Nhâm): [tluP,  tvP,    tpP,  vkP]
    10(Quý): [pqP,   cmP,    taP,  tlangP]

  Sát tinh:
    Lộc Tồn position by canNam: [,3,4,6,7,6,7,9,10,12,1] (index=canNam)
    Kình Dương = dich(locTon, 1)
    Đà La      = dich(locTon, -1)
    Hỏa/Linh positions: computed from chiNam + gioSinh + gender + amDuongCan
    Địa Kiếp = dich(11, gioSinh);  Địa Không = dich(12, 12 - diaKiep)

  Phi tinh (include in order of importance):
    Văn Xương = dich(2, 2 - vanKhuc);  Văn Khúc = dich(5, gioSinh - 1)
    Tả Phù = dich(5, thangAm - 1);     Hữu Bật = dich(2, 2 - taPhu)
    Thiên Khôi = [,2,1,12,10,8,1,8,7,6,4][canNam]; Thiên Việt = dich(5, 5-khoi)
    Thiên Mã: chiNam%4=1→3; =2→12; =3→9; =0→6
    Hồng Loan = dich(4, -chiNam+1);    Thiên Hỷ = dich(hongLoan, 6)

  Chart grid position mapping (địa chi → [row, col] in 4×4 grid):
    Tý=1:[3,2], Sửu=2:[3,1], Dần=3:[3,0], Mão=4:[2,0], Thìn=5:[1,0], Tỵ=6:[0,0],
    Ngọ=7:[0,1], Mùi=8:[0,2], Thân=9:[0,3], Dậu=10:[1,3], Tuất=11:[2,3], Hợi=12:[3,3]
    Center (rows 2-3, cols 2-3): user info box

─── SECTION 5: PRICING ───
Section title: "Chọn Gói Phù Hợp"
4 pricing cards in a row (or 2×2 on mobile):

  Miễn Phí — 0đ/tháng
  • Lá số cơ bản (online)
  • 3 tín hiệu đầu tiên
  • CTA: "Đăng Ký Ngay →" → /dang-ky

  Cơ Bản — 49.000đ/tháng (390.000đ/năm)
  • Tín hiệu hàng ngày qua Zalo
  • Phân tích 4 lĩnh vực
  • CTA: "Bắt Đầu →" → /dang-ky

  Chuyên Sâu — 149.000đ/tháng (990.000đ/năm) [FEATURED — gold border]
  • Tất cả của Cơ Bản
  • Báo cáo vận trình hàng tháng (PDF)
  • 1 câu hỏi tư vấn/tháng
  • CTA: "Đăng Ký →" → /dang-ky

  Chiến Lược — 349.000đ/tháng (2.900.000đ/năm)
  • Tất cả của Chuyên Sâu
  • Tư vấn 1-1 không giới hạn câu hỏi
  • Ưu tiên phản hồi trong ngày
  • CTA: "Liên Hệ →" → /dang-ky

  Note: "Thanh toán: chuyển khoản ngân hàng hoặc ZaloPay. Sau đăng ký, chúng tôi sẽ liên hệ qua Zalo để hướng dẫn."

─── SECTION 6: TESTIMONIALS (placeholder) ───
3 testimonial cards with gold quote marks. Use placeholder text:
  "Tôi đã dùng 3 tháng, thực sự giúp tôi chuẩn bị tinh thần cho các tuần kháng lực..."
  — Chị M.T., Hà Nội

─── SECTION 7: FOOTER ───
Left: Logo text "ĐẠI VIỆT TINH TỬ" + tagline
Center: Links (Về Chúng Tôi / Bảng Giá / Liên Hệ)
Right: "Theo dõi trên Zalo OA: [link placeholder]"
Bottom: Disclaimer text (see CRITICAL RULES above)

════════════════════════════════════════════
PAGE 2: REGISTRATION FORM (/dang-ky)
════════════════════════════════════════════

Dark page, centered card (max-width 560px).

Header:
  - Eyebrow: "BẮT ĐẦU HÀNH TRÌNH"
  - H1: "Đăng Ký Nhận Phân Tích Vận Trình"
  - Subtitle: "Miễn phí • Không cần thẻ tín dụng • Nhận tín hiệu qua Zalo"

Form (React Hook Form + Zod):
  1. Họ và tên* (text, min 2 chars)
  2. Số điện thoại Zalo* (text, Vietnamese phone format: 0xxxxxxxxx, 10 digits)
  3. Email (optional, email format)
  4. Ngày sinh* (date picker, label: "Ngày sinh dương lịch")
  5. Giờ sinh* (select, 12 địa chi options with time ranges)
  6. Giới tính* (radio: Nam / Nữ)
  7. Bạn biết đến chúng tôi qua... (optional select):
      Zalo / TikTok / Facebook / Bạn bè giới thiệu / Khác

  Checkbox (required):
    "Tôi đồng ý nhận thông báo phân tích vận trình qua Zalo OA từ Đại Hồng Việt Tử Vi"

  Submit button (gold, full-width): "Hoàn Tất Đăng Ký →"

  On submit:
    1. Validate with Zod
    2. POST to Supabase: insert into registrations table
    3. Show loading state on button
    4. On success: navigate to /cam-on
    5. On error: show toast "Đăng ký thất bại, vui lòng thử lại"

  Legal note below form (small, muted):
    "Thông tin của bạn được bảo mật. Chúng tôi chỉ liên hệ qua Zalo để gửi phân tích vận trình."

═══════════════════════════════════════
PAGE 3: THANK-YOU PAGE (/cam-on)
════════════════════════════════════════

Centered, minimal, warm.

Content:
  - Large gold checkmark icon (✓)
  - H1 (Cormorant Garamond): "Đăng Ký Thành Công"
  - Body text:
    "Cảm ơn bạn đã tin tưởng Đại Hồng Việt Tử Vi.
     
     Chúng tôi sẽ liên hệ qua Zalo trong vòng 24 giờ để:
     • Xác nhận thông tin lá số của bạn
     • Hướng dẫn theo dõi Zalo OA để nhận tín hiệu
     • Chia sẻ 3 phân tích đầu tiên miễn phí"
  - Secondary info box (border gold):
    "Trong khi chờ đợi: tham gia Zalo OA Đại Hồng Việt Tử Vi để nhận các bài chia sẻ hàng ngày"
    Button (outline): "Theo Dõi Zalo OA"  [href="#" placeholder]
  - Link: "← Quay về trang chủ"

════════════════════════════════════════
GLOBAL COMPONENTS TO BUILD
════════════════════════════════════════

Navbar (sticky, backdrop-blur):
  - Left: Logo "ĐẠI VIỆT TINH TỬ" (gold text, Cormorant Garamond)
  - Right: Nav links (Tính Năng / Bảng Giá / Demo) + CTA button "Đăng Ký" → /dang-ky
  - Mobile: hamburger menu

Footer: as described in Section 7

Toast notifications: use a simple toast hook for success/error states

════════════════════════════════════════
ENVIRONMENT VARIABLES (.env)
════════════════════════════════════════

VITE_SUPABASE_URL=<from Supabase project settings>
VITE_SUPABASE_ANON_KEY=<from Supabase project settings>

════════════════════════════════════════
IMPORTANT NOTES FOR LOVABLE
════════════════════════════════════════

- The lá số calculator in Section 4 (Demo) should be a self-contained React component
  called <ZuviChart />. It does NOT need Supabase — all calculation is client-side.
- The registration form DOES need Supabase insert.
- Do not implement authentication (login/logout) yet — this is Phase 1A only.
- The "Tính Năng" and "Về Chúng Tôi" nav links can be placeholder anchors for now.
- Use Lucide React for all icons. No external icon libraries.
- All animations: subtle (opacity transitions, slight translateY on hover). No heavy animations.
- The site must look like a premium Vietnamese service — NOT a generic SaaS template.
  Dark, cosmic, gold accents. Think elegant, not flashy.
```

---

## Hướng Dẫn Dùng Prompt Này

**Bước 1:** Truy cập [lovable.dev](https://lovable.dev) → New Project

**Bước 2:** Copy toàn bộ đoạn trong cặp ``` ``` ở trên → paste vào chat của Lovable

**Bước 3:** Khi Lovable hỏi về Supabase, click "Connect Supabase" và làm theo hướng dẫn

**Bước 4:** Sau khi build xong, test với link preview:
- Thử form demo lá số với ngày 22/04/1985, giờ Thìn, Nam → kết quả Ất Sửu, Hỏa lục Cục
- Thử submit form đăng ký → kiểm tra Supabase dashboard có data không

**Bước 5:** Khi anh thấy ổn, share GitHub link với Tiểu Gấu để tiếp tục Prompt 2 (Admin panel)

---

## Context Bổ Sung Cho Tiểu Gấu (Không Paste Vào Lovable)

Sau khi Phase 1A xong, các bước tiếp theo:
- **Prompt 2 (Admin):** Bảng quản lý đăng ký, xem lá số người dùng, xác nhận payment thủ công
- **Prompt 3 (Auth + Dashboard):** Người dùng đăng nhập → xem lá số đầy đủ, lịch sử tín hiệu
- **Prompt 4 (Nhật Vận Engine):** Tính toán tín hiệu hàng ngày dựa trên lá số + ngày hiện tại

*Cập nhật: 06/2026 — Tiểu Gấu soạn từ DVTT_Lovable_MasterPrompt.md*
