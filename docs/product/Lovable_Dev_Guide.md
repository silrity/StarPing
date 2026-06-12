# HƯỚNG DẪN CHUẨN BỊ & LÀM VIỆC VỚI LOVABLE DEV
## Đại Hồng Việt Tử Vi — MVP Phase 02

---

## PHẦN 1: DOMAIN & HOSTING

### 1.1. Chọn Domain

**Gợi ý tên domain:**
- `daiviettinhtu.com` — tên thương hiệu đầy đủ
- `tinhtuvn.com` — ngắn gọn, dễ nhớ
- `dvtt.vn` — viết tắt, dạng app

**Đăng ký ở đâu (rẻ + uy tín):**

| Đơn vị | Domain | Giá/năm | Ghi chú |
|---|---|---|---|
| **Cloudflare Registrar** | .com | ~210,000 VNĐ | Rẻ nhất, DNS + CDN miễn phí, không mark-up |
| **Namecheap** | .com | ~240,000 VNĐ | Giao diện tốt, WhoisGuard miễn phí |
| **Mắt Bão** (matbao.net) | .vn | ~500,000 VNĐ | Uy tín Việt Nam, hỗ trợ tiếng Việt |
| **PA Vietnam** (pavietnam.vn) | .vn | ~480,000 VNĐ | Uy tín, phổ biến với doanh nghiệp VN |

> ✅ **Khuyến nghị:** Đăng ký `.com` trên **Cloudflare Registrar** — vừa rẻ vừa được Cloudflare CDN + DNS miễn phí, tự động bảo vệ DDoS. Sau này nếu cần `.vn` thì mua thêm trên Mắt Bão và redirect về `.com`.

**Lưu ý .vn:** Cần CMND/CCCD (cá nhân) hoặc Giấy phép kinh doanh. Mất 1–3 ngày duyệt.

---

### 1.2. Infrastructure & Hosting

Stack được thiết kế **serverless** — không cần thuê VPS hay shared hosting truyền thống. Chi phí khởi đầu gần như bằng 0.

| Dịch vụ | Mục đích | Free tier | Paid (khi cần) |
|---|---|---|---|
| **Supabase** | Database + Auth + Storage + Edge Functions | 500MB DB, 50k MAU, 2GB bandwidth | $25/tháng (Pro) |
| **Vercel** | Frontend hosting + deployment | Unlimited deploy, 100GB bandwidth | $20/tháng (Pro) |
| **Cloudflare** | CDN + DNS + DDoS protection | Miễn phí vĩnh viễn cho plan cơ bản | — |
| **Resend** | Gửi email (verify, Nhật Vận) | 3,000 email/tháng | $20/tháng (50k emails) |
| **Upstash** | Cron job (Nhật Vận 7am) | 10k req/ngày | $10/tháng |

> **Tổng chi phí MVP ban đầu: ~$0/tháng.** Khi vượt free tier: ~$45–65/tháng — hợp lý cho 100+ paid users đầu tiên.

---

## PHẦN 2: ĐĂNG KÝ TÀI KHOẢN (CHECKLIST)

### 2.1. Tài Khoản Hạ Tầng (Làm Ngay)

- [ ] **GitHub** — [github.com](https://github.com) — Tạo organization `DaiVietTinhTu`, repository `dvtt-platform` (private)
- [ ] **Supabase** — [supabase.com](https://supabase.com) — Tạo project `dvtt-production` + `dvtt-staging`
- [ ] **Vercel** — [vercel.com](https://vercel.com) — Kết nối GitHub, tạo project
- [ ] **Cloudflare** — [cloudflare.com](https://cloudflare.com) — Thêm domain, bật proxy
- [ ] **Resend** — [resend.com](https://resend.com) — Tạo API key, verify domain email
- [ ] **Lovable** — [lovable.dev](https://lovable.dev) — Tạo project, kết nối GitHub ngay (xem Phần 4)

### 2.2. Zalo OA (Official Account)

**Timeline:** Duyệt 1–3 ngày làm việc. Làm sớm.

**Các bước:**
1. Truy cập [oa.zalo.me](https://oa.zalo.me) → Tạo OA mới
2. Chọn loại: **Doanh nghiệp** (để được dùng ZNS)
3. Tải lên: Logo, ảnh cover, mô tả thương hiệu
4. Xác minh: CMND/CCCD cá nhân hoặc Giấy phép kinh doanh

**Sau khi có OA — đăng ký ZNS (Zalo Notification Service):**
1. Vào [business.zalo.me](https://business.zalo.me) → Đăng ký ZNS
2. Tạo **ZNS Template** cho từng loại tin nhắn:
   - Template "Chào mừng đăng ký" (thông báo trial bắt đầu)
   - Template "Nhật Vận hàng ngày" (nội dung luận đoán)
   - Template "Nhắc gia hạn" (khi trial hết hạn)
   - Template "Xác nhận thanh toán"
3. Mỗi template cần được **Zalo duyệt** trước khi dùng (1–5 ngày)

> ⚠️ ZNS tính phí theo tin nhắn gửi đi (~100–300 VNĐ/tin). Budget cho 100 users × 30 ngày ≈ 300k–900k VNĐ/tháng.

### 2.3. MoMo Business (Partner API)

**Timeline:** 3–7 ngày làm việc. Cần giấy tờ doanh nghiệp.

**Các bước:**
1. Truy cập [business.momo.vn](https://business.momo.vn) → Đăng ký đối tác
2. Chuẩn bị hồ sơ:
   - Giấy phép kinh doanh (hoặc đăng ký hộ kinh doanh)
   - MST (Mã số thuế)
   - CMND/CCCD đại diện
   - Logo thương hiệu
3. Chọn giải pháp: **MoMo Payment Gateway** (App-to-App hoặc QR)
4. Nhận: `partnerCode`, `accessKey`, `secretKey` để tích hợp

> 💡 Nếu chưa có giấy phép kinh doanh, có thể dùng **MoMo cá nhân** tạm thời cho giai đoạn closed beta (<100 users). Nhưng phải chuyển sang Business trước khi mở rộng.

### 2.4. Tài Khoản Phụ Trợ

- [ ] **Google Workspace** (tùy chọn) — Email doanh nghiệp `hello@daiviettinhtu.com`, $6/user/tháng
- [ ] **Notion** (tùy chọn) — Quản lý nội dung CMS tạm thời trước khi Admin Portal hoàn thiện
- [ ] **Figma** (tùy chọn) — Nếu muốn thiết kế mockup trước khi đưa vào Lovable

---

## PHẦN 3: CHECKLIST SONG SONG VỚI DEVELOPMENT

Những việc này **không chờ dev xong mới làm** — chạy song song để tiết kiệm thời gian.

### Tuần 1–2 (Song song với Giai đoạn 1 Backend)

- [ ] Đăng ký domain + cấu hình Cloudflare DNS
- [ ] Tạo tài khoản Supabase, GitHub, Vercel
- [ ] Nộp hồ sơ Zalo OA
- [ ] Nộp hồ sơ MoMo Business
- [ ] Viết Privacy Policy + Terms of Service (bắt buộc cho PDPA)
- [ ] Thiết kế logo + brand assets (Canva hoặc Figma)
- [ ] Sư Phụ bắt đầu soạn nội dung Nhật Vận cho 2 tuần đầu tiên

### Tuần 3–4 (Song song với Giai đoạn 2 Frontend)

- [ ] Duyệt Zalo OA → đăng ký + submit ZNS templates
- [ ] Nhận thông tin MoMo Partner API
- [ ] Chuẩn bị danh sách whitelist (email/SĐT của nhóm test đầu tiên)
- [ ] Chạy database schema trên Supabase production
- [ ] Cấu hình Resend domain verification
- [ ] Sư Phụ soạn nội dung Nhật Vận cho tháng đầu tiên

### Tuần 5–6 (Song song với Giai đoạn 3 Payment)

- [ ] Test toàn bộ luồng MoMo trên sandbox
- [ ] Chuẩn bị thông tin tài khoản ngân hàng cho chuyển khoản
- [ ] Tạo nội dung ZNS template chờ Zalo duyệt
- [ ] Test gửi email Nhật Vận thử (Resend)

---

## PHẦN 4: LÀM VIỆC HIỆU QUẢ VỚI LOVABLE

### 4.1. Thiết Lập Ban Đầu (Làm 1 Lần)

**Bước 1 — Tạo project Lovable:**
1. Vào [lovable.dev](https://lovable.dev) → New Project → "Blank project"
2. Đặt tên: `DVTT Platform`

**Bước 2 — Kết nối GitHub NGAY (quan trọng nhất):**
1. Settings → GitHub → Connect repository
2. Chọn repo `dvtt-platform` đã tạo sẵn
3. Từ đây, mọi thay đổi Lovable generate đều push lên GitHub
4. Anh có thể edit code trực tiếp trên GitHub/VS Code/Cursor **mà không tốn credit Lovable**

**Bước 3 — Kết nối Supabase:**
1. Settings → Supabase → Connect project
2. Nhập Supabase URL + anon key
3. Lovable sẽ tự gen TypeScript types từ schema

**Bước 4 — Chạy database schema trên Supabase TRƯỚC:**
Vào Supabase SQL Editor, chạy toàn bộ SQL từ `Product.md` Section 5 trước khi bắt đầu prompt Lovable. Lovable sẽ tự detect schema và sinh code đúng.

---

### 4.2. Nguyên Tắc Tiết Kiệm Credit

Lovable tính credit theo mỗi lần **generate code** (mỗi lần anh nhấn Send và Lovable viết code). "Chat" mode (hỏi không generate) thường miễn phí hoặc rẻ hơn.

**Tiết kiệm credit:**
1. **Batch tất cả thứ liên quan vào 1 prompt** — thay vì 5 prompt nhỏ, gộp thành 1 prompt lớn chi tiết
2. **Chỉ Lovable làm phần khó** (scaffolding, complex components) — phần đơn giản (CSS tweak, text thay đổi) edit thẳng trên GitHub
3. **Dùng "Select component"** — trỏ vào đúng component cần sửa thay vì để Lovable đoán
4. **Dùng "Restore"** nếu kết quả sai — không tốn credit thêm
5. **Không để Lovable handle database migration** — tự chạy SQL trên Supabase Editor
6. **Comment bảo vệ code quan trọng:**
   ```javascript
   // ⚠️ DO NOT MODIFY: Core calculation API call
   const response = await calculateChart(birthData);
   ```

---

### 4.3. Cấu Trúc Prompt Chuẩn

Mỗi prompt nên theo format:

```
## CONTEXT
[Mô tả ngắn: đây là phần nào của hệ thống]

## TASK
[Mô tả chính xác cần làm gì]

## SPECS
[Paste đúng section từ Product.md liên quan]

## CONSTRAINTS
- Không thay đổi [component/file X]
- Dùng màu #0F1B2D cho nền, #C9A227 cho accent
- Tất cả text tiếng Việt
- Font: Be Vietnam Pro

## DATABASE
[Tên bảng và fields cần dùng]
```

---

### 4.4. Prompt Sequence Theo Giai Đoạn

---

#### PROMPT 0 — Project Setup (Đầu tiên, làm 1 lần)

```
## CONTEXT
Building "Đại Hồng Việt Tử Vi" — a Vietnamese astrology decision-support SaaS platform.

## TASK
Set up the base project structure with:
1. Dark theme with these exact CSS variables:
   --primary: #0F1B2D
   --secondary: #1E3A5F  
   --accent: #C9A227
   --text: #F4F1EC
   --alert: #C0392B
   --success: #2ECC71
2. Google Font: Be Vietnam Pro (import in index.html)
3. React Router with routes: / (landing), /dashboard, /auth/register, /auth/login, /admin
4. Supabase client setup (already connected in settings)
5. Base layout component with dark background

## CONSTRAINTS
- All UI text in Vietnamese
- No placeholder lorem ipsum text
- Keep it minimal — just the structure, not the content yet
```

---

#### PROMPT 1 — Landing Page + Lá Số Form

```
## CONTEXT
Landing page: user enters birth info → system calls backend API → displays Tử Vi chart.

## TASK
Build the landing page with:
1. Hero section: tên thương hiệu "Đại Hồng Việt Tử Vi", tagline "Phân tích chu kỳ vận trình cá nhân"
2. Birth info form with fields:
   - Họ và tên (text)
   - Giới tính (radio: Nam / Nữ)
   - Ngày sinh (day/month/year dropdowns, dương lịch)
   - Giờ sinh (12 options: Tý 23-1h / Sửu 1-3h / ... / Hợi 21-23h)
   - Năm xem vận trình (year input, default: current year)
   - Tháng xem (month dropdown)
3. Submit button: "Xem lá số của tôi"
4. On submit: show loading spinner, then display chart result section (placeholder for now — chart will be rendered from API response JSON)
5. Below chart: CTA section "Nhận luận đoán hàng ngày" with Register button

## CONSTRAINTS
- Dark theme, mobile responsive
- Form validation: tất cả fields bắt buộc
- Disclaimer text ở cuối trang: "Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính."
```

---

#### PROMPT 2 — Registration & Auth Flow

```
## CONTEXT
User registration flow after viewing their chart. 
Supabase tables already exist: users, user_profiles, subscriptions, whitelist.

## TASK
Build complete auth flow:

1. REGISTRATION FORM (/auth/register):
   - Fields: Họ và tên, Email, Số điện thoại Zalo, Mật khẩu (min 8 chars), Confirm password
   - Checkbox: đồng ý điều khoản dịch vụ (required)
   - Whitelist check: before allowing register, query `whitelist` table for email OR phone_zalo. If not found → show message: "Hệ thống đang trong giai đoạn thử nghiệm nội bộ. Vui lòng để lại thông tin tại [link]."
   - On success: insert into `users` table, insert into `user_profiles` (pre-fill from landing page form if available), create `subscriptions` record (plan_type='trial', status='trial', trial_start=today, trial_end=today+3)
   - Send verification email via Supabase Auth

2. EMAIL VERIFICATION:
   - Show "Kiểm tra email của bạn" page with resend button
   - After verification redirect: show popup modal:
     "🎉 Chào mừng [Tên]! Bạn sẽ nhận luận đoán đầu tiên vào 07:00 sáng ngày [tomorrow DD/MM/YYYY]."
     Button: "Xem lá số của tôi"

3. LOGIN FORM (/auth/login):
   - Email + Password
   - "Quên mật khẩu?" link → send reset email via Supabase Auth
   - Rate limit: show error after 5 failed attempts "Vui lòng thử lại sau 15 phút"

## CONSTRAINTS
- Use Supabase Auth for all auth operations
- All error messages in Vietnamese
- Password strength indicator on register form
```

---

#### PROMPT 3 — User Dashboard

```
## CONTEXT
Logged-in user dashboard showing their chart and subscription status.

## TASK
Build user dashboard (/dashboard):

1. TOP BANNER (conditional):
   - If email not verified: yellow banner "⚠️ Vui lòng xác thực email để kích hoạt dịch vụ" + "Gửi lại email" button
   - If subscription status = 'trial': show days remaining "🔔 Còn X ngày dùng thử"
   - If subscription status = 'expired': orange banner "Dịch vụ đã tạm dừng" + "Nâng cấp ngay" button

2. CHART SECTION:
   - Display user's Tử Vi chart (same component as landing page, loaded from user_profiles data)
   - Year/month selector to change view

3. SUBSCRIPTION CARD:
   - Current plan name, status, expiry date
   - Upgrade button (links to /pricing)

4. RECENT NOTIFICATIONS:
   - Last 7 ngày Nhật Vận received (from notification_log table)
   - Show: date, title, preview of body

## DATABASE TABLES: users, user_profiles, subscriptions, notification_log
```

---

#### PROMPT 4 — Pricing & Payment Page

```
## CONTEXT
User selects a subscription plan and pays. Two methods: MoMo (auto) or bank transfer (manual).

## TASK
Build pricing + payment flow:

1. PRICING PAGE (/pricing):
   - 4 plan cards: Miễn phí / Cơ Bản (49k/tháng, 390k/năm) / Chuyên Sâu (149k/390k) / Chiến Lược (349k/2.9M)
   - Toggle: Tháng / Năm (năm = discount highlighted)
   - CTA button on each paid plan: "Chọn gói này"
   - Current plan highlighted

2. PAYMENT PAGE (/payment):
   - Show order summary: plan, amount, billing cycle
   - Payment method selector:
     a) MoMo button → call POST /api/payment/momo/create → redirect to payUrl
     b) Chuyển khoản → show bank info card:
        Ngân hàng, STK, Tên TK, Số tiền, NỘI DUNG: [reference_code]
        Timer countdown 24h
        Note: "Sau khi chuyển khoản, admin sẽ xác nhận trong vòng 24 giờ"
   - Insert payment record into `payments` table on page load

3. SUCCESS PAGE (/payment/success):
   - Shown after MoMo webhook confirms
   - "🎉 Thanh toán thành công! Dịch vụ đã được kích hoạt."

## CONSTRAINTS
- Reference code format: DVTT-{6 random chars}-{YYYYMMDD}
- MoMo integration via Supabase Edge Function (not frontend)
```

---

#### PROMPT 5 — Admin Portal

```
## CONTEXT
Internal admin portal for managing customers, subscriptions, payments, and content.
Three roles: admin (full), van_hanh (operational), tu_van_vien (read-only).

## TASK
Build admin portal at /admin with role-based access:

1. SIDEBAR NAVIGATION:
   - Dashboard (all roles)
   - Khách hàng (all roles)
   - Thanh toán (admin + van_hanh)
   - Nội dung Nhật Vận (admin + van_hanh)
   - Whitelist (admin only)
   - Báo cáo (admin only)

2. DASHBOARD: stats cards — users today/week/month, active trials, paid subscribers, monthly revenue

3. CUSTOMER LIST (/admin/customers):
   - Table with: tên, email, phone, trạng thái gói, email verified, ngày đăng ký
   - Filter + search
   - Click vào → customer detail page
   - Customer detail: thông tin + subscription actions (pause/resume/extend/suspend)
   - All actions call Supabase + insert into audit_log

4. PAYMENT LIST (/admin/payments):
   - Pending bank transfers at top (highlighted)
   - "Xác nhận thanh toán" button → confirm_payment action → update payment + subscription

5. CONTENT CMS (/admin/content):
   - Calendar view (month)
   - Click on date → form to add/edit nhat_van_content
   - Fields: cung_chi (dropdown 1-12 or "Tất cả"), signal_type, linh_vuc, title (≤100 chars), body (≤500 chars), action_tip, canh_bao
   - Days with content = green dot, without = red dot

6. WHITELIST (/admin/whitelist):
   - List + add/remove email or phone
   - Toggle: WHITELIST_ENABLED on/off

## DATABASE: users, subscriptions, payments, nhat_van_content, whitelist, audit_log
## CONSTRAINT: Check user role from users.role — redirect to /dashboard if insufficient permission
```

---

### 4.5. Quy Trình GitHub Hiệu Quả

```
main ←────── (merge khi done + tested)
  │
develop ←─── (Lovable generates code here)
  │
feature/registration
feature/payment
feature/admin-portal
```

**Nguyên tắc:**
1. Lovable làm việc trên nhánh `develop` — không bao giờ push thẳng lên `main`
2. Mỗi giai đoạn hoàn thành → tạo PR từ `develop` → `main` → anh review → merge
3. Dùng **Cursor** hoặc **VS Code** để sửa chi tiết nhỏ (không tốn Lovable credit):
   ```bash
   git clone https://github.com/DaiVietTinhTu/dvtt-platform
   git checkout develop
   # sửa code...
   git add . && git commit -m "fix: adjust registration popup timing"
   git push origin develop
   ```
4. Lovable sẽ tự sync khi anh push lên GitHub

---

### 4.6. Phần KHÔNG Dùng Lovable

Những phần này nên làm **thủ công bên ngoài Lovable** để bảo vệ IP và kiểm soát tốt hơn:

**1. Thuật toán Tử Vi (quan trọng nhất):**
- Convert `demo_laso_tuvi.html` sang TypeScript
- Deploy thành **Supabase Edge Function** (không phải frontend code)
- Lovable chỉ gọi API endpoint này, không biết logic bên trong

```typescript
// supabase/functions/calculate-chart/index.ts
import { serve } from "https://deno.land/std/http/server.ts"

serve(async (req) => {
  const { birth_day, birth_month, birth_year, birth_hour_chi, gender, view_year, view_month } = await req.json()
  
  // Toàn bộ thuật toán an sao chạy ở đây — không bao giờ expose ra frontend
  const result = calculateTuViChart(...)
  
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" }
  })
})
```

**2. MoMo Webhook:**
- Deploy thành Supabase Edge Function riêng
- Verify signature, update DB — không để trên frontend

**3. Cron Job Nhật Vận:**
- Dùng Supabase pg_cron hoặc Upstash Cron
- Gọi Edge Function để xử lý, không phải Lovable code

---

### 4.7. Checklist Trước Khi Giao Cho Lovable Dev

- [ ] Database schema đã chạy xong trên Supabase (Section 5 của Product.md)
- [ ] Supabase project đã tạo (production + staging)
- [ ] GitHub repo đã tạo (`dvtt-platform`, private)
- [ ] Lovable project đã kết nối GitHub + Supabase
- [ ] Lovable dev đã đọc `Product.md` (anh paste hoặc share file)
- [ ] Đã confirm: Thuật toán Tử Vi deploy riêng thành Edge Function, Lovable chỉ call API
- [ ] Đã thống nhất: Lovable làm Frontend + UI, không động vào backend algorithm

---

## PHẦN 5: TÓM TẮT ƯU TIÊN THEO TUẦN

| Tuần | Anh Bang cần làm | Lovable Dev làm |
|---|---|---|
| 1 | Đăng ký domain, Supabase, GitHub, Vercel, nộp hồ sơ Zalo OA + MoMo | Prompt 0: Project setup + base theme |
| 2 | Chạy DB schema trên Supabase, convert thuật toán sang Edge Function | Prompt 1: Landing page + lá số form |
| 3 | Test Edge Function thuật toán, chờ Zalo OA duyệt | Prompt 2: Registration & Auth flow |
| 4 | Nhận MoMo Partner API credentials, chuẩn bị ZNS templates | Prompt 3: User dashboard |
| 5 | Test MoMo sandbox, setup Resend email | Prompt 4: Pricing & Payment |
| 6 | Submit ZNS templates cho Zalo duyệt | Prompt 5: Admin portal |
| 7 | Chuẩn bị whitelist khách hàng test đầu tiên | Integration testing + bug fixes |
| 8 | Sư Phụ nhập nội dung Nhật Vận tháng 1 | Setup cron job + Zalo OA integration |

---

*Tài liệu này là working guide — cập nhật khi có thay đổi trong quá trình dev.*
*Cập nhật lần cuối: 06/2026*
