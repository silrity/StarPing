# TÀI LIỆU ĐẶC TẢ SẢN PHẨM (PRD): HỆ THỐNG ĐẠI VIỆT TINH TỬ v1.1
*Tài liệu hướng dẫn nghiệp vụ và luồng phát triển End-to-End dành cho Đội ngũ Lập trình*
*Cập nhật: 06/2026 — Bổ sung Auth, Database Schema, Payment, Admin Roles, Content CMS, Whitelist*

---

## MỤC LỤC

1. [Tổng Quan Sản Phẩm & Mô Hình Kinh Doanh](#1)
2. [Hành Trình Khách Hàng (User Journey)](#2)
3. [Đăng Ký & Xác Thực (Registration & Auth Flow)](#3)
4. [Kiến Trúc & Bảo Mật](#4)
5. [Cơ Sở Dữ Liệu (Database Schema)](#5)
6. [Giao Diện & Trải Nghiệm (UI/UX)](#6)
7. [Hệ Thống Nhật Vận Engine](#7)
8. [Quản Lý Nội Dung Luận Đoán (Content CMS)](#8)
9. [Thanh Toán (Payment)](#9)
10. [Phân Quyền & Admin Portal](#10)
11. [Whitelist / Closed Beta (MVP Phase)](#11)
12. [Lộ Trình Triển Khai](#12)

---

## 1. TỔNG QUAN SẢN PHẨM & MÔ HÌNH KINH DOANH <a name="1"></a>

### 1.1. Tầm Nhìn Sản Phẩm

**Đại Việt Tinh Tử** được định vị là một **Nền tảng Hỗ trợ Quyết định (Decision-Support Platform)** dựa trên chu kỳ vận trình cá nhân, hướng tới tệp khách hàng là doanh nhân, nhà quản lý và những người cần định hướng chiến lược.

Sản phẩm không dừng lại ở việc "giải lá số một lần" mà hoạt động như một cố vấn ảo: cung cấp tín hiệu hành động mỗi ngày (Nhật Vận) để giúp khách hàng biết "khi nào nên tiến, khi nào nên dừng, và rủi ro nằm ở đâu".

> **Disclaimer bắt buộc trên mọi nội dung:**
> *"Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính."*

### 1.2. Mô Hình Kinh Doanh (SaaS Subscription)

Sản phẩm vận hành theo mô hình Thuê bao định kỳ với luồng phễu khách hàng:

* **Mồi nhử (Freemium):** Khách hàng tra cứu lá số và xem tinh bàn miễn phí trên Website. Link lá số là public/shareable để tạo traffic; thuật toán an sao được bảo vệ hoàn toàn trên Backend.
* **Trải nghiệm (Free Trial 3 Ngày):** Khách hàng để lại thông tin (Email + SĐT Zalo) để nhận tín hiệu hàng sáng miễn phí trong 3 ngày.
* **Chuyển đổi (Subscription Conversion):** Sau 3 ngày, hệ thống ngừng gửi tín hiệu và mời khách đăng ký gói thuê bao.

### 1.3. Bảng Giá Subscription

| Gói | Giá Tháng | Giá Năm | Tính năng chính |
|---|---|---|---|
| Miễn phí | 0 | 0 | Xem lá số, không nhận Nhật Vận |
| Cơ Bản | 49,000 VNĐ | 390,000 VNĐ | Nhật Vận hàng ngày |
| Chuyên Sâu | 149,000 VNĐ | 990,000 VNĐ | Nhật Vận + phân tích chuyên sâu |
| Chiến Lược | 349,000 VNĐ | 2,900,000 VNĐ | Nhật Vận + tư vấn 1-1 |

---

## 2. HÀNH TRÌNH KHÁCH HÀNG (USER JOURNEY) <a name="2"></a>

Hệ thống cần được thiết kế với 4 bước trải nghiệm liền mạch:

* **Bước 1 — Tiếp cận & Nhập liệu (Landing Page):** Người dùng truy cập nền tảng, nhập thông tin Bát Tự cơ bản: Họ tên, Giới tính, Ngày/Tháng/Năm sinh (Dương lịch), Giờ sinh (theo 12 khung giờ Địa chi), chọn Năm/Tháng muốn xem vận trình.

* **Bước 2 — Trả Kết Quả Lá Số (Secure Rendering):** Nền tảng hiển thị tinh bàn Tử Vi Dark Mode cao cấp. Bản vẽ gồm ma trận 12 cung, khối Tứ Trụ ở giữa, phân lớp rõ sao cố định và sao lưu động. Link lá số là public shareable. Thuật toán tính toán chạy hoàn toàn trên Backend.

* **Bước 3 — Kích Hoạt Trải Nghiệm (Free Trial Sign-up):** Sau khi xem lá số, CTA xuất hiện mời đăng ký nhận luận đoán hàng ngày. Người dùng nhập Email + SĐT Zalo, tạo mật khẩu, xác thực email. Hệ thống lưu hồ sơ và hiển thị popup xác nhận thời gian bắt đầu nhận thông báo (07:00 sáng ngày hôm sau), đồng thời gửi email xác nhận.

* **Bước 4 — Nhận Nhật Vận & Chuyển Đổi (Retention & Conversion):** Từ 07:00 sáng ngày tiếp theo, hệ thống gửi luận đoán cá nhân hóa mỗi ngày qua Zalo OA và/hoặc Email. Đến ngày thứ 4, tin nhắn chuyển sang kịch bản mời nâng cấp gói cước kèm link thanh toán.

---

## 3. ĐĂNG KÝ & XÁC THỰC (REGISTRATION & AUTH FLOW) <a name="3"></a>

### 3.1. Luồng Đăng Ký Mới

```
[Landing Page / Lá số]
       │
       ▼
[Form đăng ký]
  - Họ và Tên (bắt buộc)
  - Email (bắt buộc, dùng để đăng nhập & nhận luận đoán)
  - Số điện thoại Zalo (bắt buộc, dùng để nhận tin nhắn Zalo OA)
  - Mật khẩu (bắt buộc, tối thiểu 8 ký tự)
  - Checkbox đồng ý điều khoản dịch vụ & chính sách bảo mật (bắt buộc)
       │
       ▼
[Hệ thống gửi email xác thực]
  - Link xác thực có hiệu lực 24 giờ
  - Nếu hết hạn: user có thể request gửi lại
       │
       ▼
[User click link xác thực → email_verified = true]
       │
       ▼
[Popup xác nhận]
  "Chào mừng [Tên]! Bạn sẽ nhận luận đoán đầu tiên vào 07:00 sáng ngày [ngày mai, DD/MM/YYYY]."
  → Nút: "Xem lá số của tôi"
       │
       ▼
[Trial tự động kích hoạt]
  trial_start = ngày đăng ký (DATE)
  trial_end   = trial_start + 3 ngày
  Thông báo đầu tiên gửi vào 07:00 sáng ngày (trial_start + 1)
```

**Lưu ý quan trọng:**
- User PHẢI xác thực email trước khi nhận Nhật Vận. Nếu chưa verify, dashboard hiển thị banner "⚠️ Vui lòng xác thực email để kích hoạt dịch vụ" + nút "Gửi lại email".
- Thông tin Bát Tự đã nhập ở Bước 1 được tự động pre-fill vào profile khi đăng ký (không cần nhập lại).
- Khi mở rộng lên Mobile App (v2+): auth có thể chuyển sang OTP / Magic Link mà không ảnh hưởng database schema.

### 3.2. Luồng Đăng Nhập

* **Tiêu chuẩn:** Email + Password
* **Quên mật khẩu:** Gửi link reset qua email (hiệu lực 1 giờ)
* **Tương lai (v2+):** OTP / Magic Link khi phát triển Mobile App

### 3.3. Bảo Vệ Tài Khoản

* Giới hạn 5 lần đăng nhập sai → khóa tạm thời 15 phút (rate limiting)
* Tất cả password được hash bằng bcrypt (salt rounds ≥ 12)
* Session token JWT với thời hạn 7 ngày, refresh token 30 ngày

---

## 4. KIẾN TRÚC & BẢO MẬT <a name="4"></a>

### 4.1. Cô Lập Thuật Toán (Backend Isolation) — BẮT BUỘC

**Tuyệt đối không xử lý logic tính toán trên Frontend.** Frontend chỉ làm nhiệm vụ thu thập thông tin đầu vào và hiển thị dữ liệu đầu ra.

Toàn bộ các thuật toán: tịnh tiến lịch pháp, chia mượn cục số, định vị 111 tinh đẩu, tính vòng Tiểu hạn, và phủ Lưu phi tinh **bắt buộc được đóng gói tại Backend** (API hoặc Serverless Functions).

> ⚠️ **File `demo_laso_tuvi.html` hiện tại chứa toàn bộ thuật toán an sao trên Frontend — đây là bản demo nội bộ, KHÔNG được deploy công khai dưới dạng này. Khi đưa lên production, toàn bộ logic phải được migrate sang Backend.**

### 4.2. Giao Tiếp Dữ Liệu (API Flow)

**Input (Frontend → Backend):**
```json
{
  "birth_day": 15,
  "birth_month": 3,
  "birth_year": 1990,
  "birth_hour_chi": 5,
  "gender": "male",
  "view_year": 2026,
  "view_month": 6
}
```

**Output (Backend → Frontend):**
```json
{
  "tu_tru": { "can_nam": "Canh", "chi_nam": "Ngọ", "can_thang": "...", "chi_thang": "..." },
  "cung_menh": 3,
  "cung_than": 7,
  "palaces": [
    {
      "chi": 1,
      "cung_name": "Mệnh",
      "can": "Giáp",
      "stars": [
        { "name": "Tử Vi", "cat": "chinh", "vuong_miet": "Vượng", "hoa": null },
        { "name": "Thiên Phủ", "cat": "chinh", "vuong_miet": "Hãm", "hoa": null }
      ],
      "dai_han_label": "25–34",
      "tieu_han_year": 2026,
      "truong_sinh": "Trường Sinh",
      "khong_vong": false,
      "is_menh": true,
      "is_than": false
    }
  ]
}
```

### 4.3. Bảo Mật Dữ Liệu Cá Nhân (PDPA Compliance)

Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân:
* Có trang Privacy Policy và Terms of Service trước khi ra mắt
* Checkbox đồng ý chia sẻ dữ liệu khi đăng ký (explicit consent)
* User có quyền yêu cầu xóa tài khoản và toàn bộ dữ liệu cá nhân
* Dữ liệu Bát Tự được mã hóa at-rest trong database

### 4.4. Stack Đề Xuất cho Lovable Dev

| Layer | Công nghệ đề xuất |
|---|---|
| Frontend | React (Lovable) |
| Backend / API | Supabase Edge Functions hoặc Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email + password) |
| Storage | Supabase Storage (PDF lá số, assets) |
| Email | Resend hoặc SendGrid |
| Zalo OA | Zalo OA API (ZNS + tin nhắn cá nhân) |
| Payment — MoMo | MoMo Payment API (Business Account) |
| Cron Jobs | Supabase pg_cron hoặc Upstash Cron |
| Hosting | Vercel hoặc Netlify |

---

## 5. CƠ SỞ DỮ LIỆU (DATABASE SCHEMA) <a name="5"></a>

### 5.1. Bảng `users`
```sql
CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               TEXT UNIQUE NOT NULL,
  phone_zalo          TEXT,
  full_name           TEXT NOT NULL,
  password_hash       TEXT NOT NULL,
  email_verified      BOOLEAN DEFAULT FALSE,
  email_verified_at   TIMESTAMPTZ,
  role                TEXT DEFAULT 'customer'
                      CHECK (role IN ('customer','tu_van_vien','van_hanh','admin')),
  is_active           BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2. Bảng `user_profiles` (Thông Tin Bát Tự)
```sql
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  birth_day       INTEGER NOT NULL,
  birth_month     INTEGER NOT NULL,
  birth_year      INTEGER NOT NULL,
  birth_hour_chi  INTEGER NOT NULL,  -- 1=Tý, 2=Sửu, ..., 12=Hợi
  gender          TEXT NOT NULL CHECK (gender IN ('male','female')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.3. Bảng `subscriptions`
```sql
CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_type       TEXT NOT NULL
                  CHECK (plan_type IN ('free','trial','co_ban','chuyen_sau','chien_luoc')),
  billing_cycle   TEXT CHECK (billing_cycle IN ('monthly','yearly')),
  status          TEXT DEFAULT 'trial'
                  CHECK (status IN ('trial','active','paused','expired','cancelled','suspended')),
  trial_start     DATE,
  trial_end       DATE,
  paid_start      DATE,
  paid_until      DATE,
  notes           TEXT,       -- ghi chú nội bộ (chỉ admin xem)
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**Quy tắc trạng thái subscription:**

| Status | Ý nghĩa |
|---|---|
| `trial` | Đang dùng thử 3 ngày, chưa thanh toán |
| `active` | Đã thanh toán, đang dùng dịch vụ |
| `paused` | Tạm dừng theo yêu cầu, admin có thể resume bất lúc nào |
| `expired` | Hết hạn, chưa gia hạn |
| `cancelled` | Khách hàng hủy chủ động |
| `suspended` | Bị đình chỉ do vi phạm điều khoản dịch vụ |

### 5.4. Bảng `payments`
```sql
CREATE TABLE payments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id),
  subscription_id     UUID REFERENCES subscriptions(id),
  amount              INTEGER NOT NULL,          -- đơn vị: VNĐ
  payment_method      TEXT NOT NULL CHECK (payment_method IN ('momo','bank_transfer')),
  status              TEXT DEFAULT 'pending'
                      CHECK (status IN ('pending','completed','failed','refunded','expired')),
  reference_code      TEXT UNIQUE,               -- mã tham chiếu nội bộ (DVTT-XXXX-YYYY)
  momo_transaction_id TEXT,                      -- ID giao dịch từ MoMo webhook
  bank_reference      TEXT,                      -- nội dung chuyển khoản do user nhập
  confirmed_by        UUID REFERENCES users(id), -- admin thực hiện xác nhận (bank_transfer)
  confirmed_at        TIMESTAMPTZ,
  expires_at          TIMESTAMPTZ,               -- deadline thanh toán (24h sau tạo)
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.5. Bảng `notification_log`
```sql
CREATE TABLE notification_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id),
  sent_at         TIMESTAMPTZ,
  channel         TEXT CHECK (channel IN ('zalo','email')),
  content_id      UUID REFERENCES nhat_van_content(id),
  delivery_status TEXT CHECK (delivery_status IN ('sent','delivered','failed','bounced')),
  error_message   TEXT
);
```

### 5.6. Bảng `nhat_van_content` (Nội Dung Luận Đoán)
```sql
CREATE TABLE nhat_van_content (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngay         DATE NOT NULL,       -- ngày áp dụng
  cung_chi     INTEGER,             -- 1–12, NULL = áp dụng cho mọi cung
  signal_type  TEXT CHECK (signal_type IN ('thuan_loi','khang_luc','trung_tinh')),
  linh_vuc     TEXT CHECK (linh_vuc IN ('su_nghiep','tai_chinh','tinh_cam','suc_khoe','chung')),
  title        TEXT NOT NULL,       -- tiêu đề ngắn (hiển thị trên Zalo, ≤100 ký tự)
  body         TEXT NOT NULL,       -- nội dung đầy đủ (≤500 ký tự cho ZNS)
  action_tip   TEXT,                -- 1 hành động cụ thể / lời khuyên
  canh_bao     TEXT,                -- cảnh báo kháng lực nếu có
  created_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.7. Bảng `whitelist` (Closed Beta MVP)
```sql
CREATE TABLE whitelist (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT,
  phone_zalo  TEXT,
  notes       TEXT,
  added_by    UUID REFERENCES users(id),
  added_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.8. Bảng `audit_log` (Lịch Sử Thao Tác Admin)
```sql
CREATE TABLE audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID REFERENCES users(id),
  action      TEXT NOT NULL,   -- 'pause_subscription', 'confirm_payment', 'extend_subscription', ...
  target_type TEXT,            -- 'subscription', 'user', 'payment'
  target_id   UUID,
  details     JSONB,           -- snapshot trước/sau thay đổi
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. GIAO DIỆN & TRẢI NGHIỆM CHUYÊN GIA (UI/UX) <a name="6"></a>

### 6.1. Bảng Màu Thương Hiệu
```
Primary:    Deep Navy   #0F1B2D
Secondary:  Cosmic Blue #1E3A5F
Accent:     Gold        #C9A227  (dùng tiết kiệm)
Text:       Off-White   #F4F1EC
Alert:      Warm Red    #C0392B
Success:    Jade        #2ECC71
```
Font: **Be Vietnam Pro** (hỗ trợ tiếng Việt tốt, dùng cho cả heading và body)

### 6.2. Thẩm Mỹ Chuẩn (Dark Theme)

* Nền tối Navy/Đen để giảm mỏi mắt
* Khối Tứ Trụ ở giữa tinh bàn: Thiên Can màu trắng, Địa Chi màu vàng
* Serif font mỏng cho cảm giác quyền lực, đáng tin cậy

### 6.3. Hệ Thống Màu Sắc Sao

| Loại sao | Màu |
|---|---|
| Chính tinh (cốt lõi bản mệnh) | Vàng / Cam |
| Hóa Lộc, sao tài lộc, tín hiệu tăng trưởng | Xanh lá |
| Sát tinh, Hóa Kỵ, rủi ro, phá hoại | Đỏ |
| Sao Lưu động theo thời gian | Xanh Teal (in nghiêng) |

### 6.4. Chế Độ Tập Trung (Focus Mode — Tiểu Hạn)

Hệ thống tự động nhận diện cung Tiểu Hạn của năm hiện tại và làm sáng viền cung đó. Người dùng bị thu hút ngay vào "chiến trường chính" của năm mà không cần tìm kiếm.

### 6.5. Không Vong (Tuần/Triệt)

Các cung bị Tuần Không hoặc Triệt Lộ: giảm opacity các sao bên trong. Truyền đạt trực quan cảm giác bế tắc, đóng băng của cung vị đó.

---

## 7. HỆ THỐNG NHẬT VẬN ENGINE <a name="7"></a>

Đây là "trái tim" tạo ra doanh thu cho hệ thống.

### 7.1. Tiến Trình Tự Động (Cron Job)

Mỗi ngày lúc **06:00 sáng** (trước giờ gửi 1 tiếng), hệ thống:
1. Quét toàn bộ users có subscription `trial` hoặc `active` và đã `email_verified`
2. Tính toán vị trí sao lưu của ngày hôm đó cho từng lá số (gọi Backend API)
3. Đối chiếu sao lưu với cung trọng yếu (Mệnh, Thân, Tiểu Hạn, Quan Lộc, Tài Bạch)
4. Match với nội dung luận đoán đã soạn sẵn trong `nhat_van_content`
5. Queue tin nhắn → gửi đúng **07:00 sáng** qua Zalo OA và/hoặc Email
6. Ghi lại vào `notification_log`

### 7.2. Logic Match Nội Dung

```
Ưu tiên 1: (ngày = hôm nay) + (cung_chi = cung Tiểu Hạn user) + signal_type
Ưu tiên 2: (ngày = hôm nay) + (cung_chi = NULL) + signal_type
Ưu tiên 3: Generic fallback content cho signal_type đó
Ưu tiên 4: Không có content → gửi alert admin, bỏ qua user đó hôm nay
```

### 7.3. Template Tin Nhắn Nhật Vận

```
🔔 Nhật Vận [DD/MM/YYYY] — [Tên khách hàng]

[TITLE]

[BODY]

💡 Gợi ý hôm nay: [ACTION_TIP]

⚠️ [CẢNH BÁO — chỉ hiển thị nếu có]

---
Đại Việt Tinh Tử · Nền tảng phân tích chu kỳ vận trình
Nội dung mang tính tham khảo, không thay thế tư vấn chuyên môn.
```

### 7.4. Xử Lý Trial Hết Hạn

Ngày thứ 4 sau đăng ký (trial_end + 1), hệ thống gửi thông báo chuyển đổi thay vì Nhật Vận:

```
⏰ [Tên], tín hiệu hàng sáng của bạn đã tạm dừng.

Bạn vừa trải nghiệm 3 ngày luận đoán cá nhân hóa.
Để tiếp tục nhận tín hiệu mỗi sáng, hãy chọn gói phù hợp:

👉 [Link trang chọn gói + thanh toán]
```

---

## 8. QUẢN LÝ NỘI DUNG LUẬN ĐOÁN (CONTENT CMS) <a name="8"></a>

### 8.1. Tổng Quan

Toàn bộ nội dung Nhật Vận được **Sư Phụ soạn thủ công**. Hệ thống cần một giao diện CMS đơn giản để nhập, chỉnh sửa và quản lý nội dung theo ngày, sau đó tự động map với lá số của từng khách hàng dựa trên cung Tiểu Hạn và signal type.

### 8.2. Yêu Cầu Giao Diện CMS

Giao diện chỉ dành cho Admin và Vận Hành. Cần có:
* Calendar view theo tháng — ô ngày nào có content thì hiển thị xanh, chưa có thì đỏ
* Form nhập/sửa content cho từng ngày: chọn cung chi, lĩnh vực, signal type, điền Title/Body/Action Tip/Cảnh báo
* Preview tin nhắn trước khi lưu (xem đúng như user nhận)
* Duplicate từ ngày khác (để tái sử dụng khi nội dung tương tự)
* Giới hạn ký tự: Title ≤ 100, Body ≤ 500 (giới hạn Zalo ZNS)
* Alert nội bộ khi có ngày trong 3 ngày tới chưa có content

### 8.3. Quy Tắc Vận Hành

* Nội dung phải được nhập trước ít nhất **1 ngày** so với ngày áp dụng
* Nếu cron job chạy mà không tìm thấy content cho ngày đó → ghi log cảnh báo, skip user, gửi alert cho admin qua email
* Một ngày có thể có nhiều bản content (mỗi cung chi + signal type là một bản)

---

## 9. THANH TOÁN (PAYMENT) <a name="9"></a>

### 9.1. Phương Thức Thanh Toán MVP

| Phương thức | Xác nhận | Kích hoạt dịch vụ |
|---|---|---|
| MoMo | Tự động qua webhook | Ngay lập tức |
| Chuyển khoản ngân hàng | Admin xác nhận thủ công trên Portal | Sau khi admin confirm |

### 9.2. Luồng Thanh Toán MoMo (Tự Động)

```
[User chọn gói → "Thanh toán qua MoMo"]
       │
       ▼
[Backend: POST /api/payment/momo/create]
  - Tạo payment record: status='pending', reference_code='DVTT-XXXX-YYYYMMDD'
  - Gọi MoMo Partner API → nhận payUrl
       │
       ▼
[Frontend redirect → MoMo payment page]
       │
       ▼
[User hoàn tất trên MoMo]
       │
       ▼
[MoMo gọi webhook: POST /api/payment/momo/webhook]
  1. Backend verify MoMo signature (bắt buộc)
  2. Kiểm tra idempotency (tránh xử lý 2 lần)
  3. Cập nhật payments.status = 'completed'
  4. Cập nhật subscriptions: status='active', paid_until = NOW() + duration
  5. Ghi audit_log
  6. Gửi email xác nhận cho user
       │
       ▼
[User redirect về "Thanh toán thành công" — dịch vụ kích hoạt ngay]
```

**Yêu cầu kỹ thuật:**
* MoMo Business Account (Partner API)
* HTTPS endpoint cho webhook
* Verify signature bắt buộc (phòng tránh fake webhook)
* Idempotency check: nếu nhận webhook trùng transaction ID → bỏ qua, không kích hoạt 2 lần

### 9.3. Luồng Thanh Toán Chuyển Khoản Ngân Hàng (Manual)

```
[User chọn "Chuyển khoản ngân hàng"]
       │
       ▼
[Hệ thống tạo reference_code: DVTT-{6 ký tự}-{ngày}]
[Hiển thị thông tin chuyển khoản:]
  ┌─────────────────────────────────────────┐
  │ Ngân hàng:        [Tên ngân hàng]       │
  │ Số tài khoản:     [STK]                 │
  │ Tên tài khoản:    [Tên]                 │
  │ Số tiền:          [Amount] VNĐ          │
  │ NỘI DUNG CK:      DVTT-XXXXXX ⚠️        │
  │ Hiệu lực:         24 giờ kể từ bây giờ  │
  └─────────────────────────────────────────┘
       │
       ▼
[User chuyển khoản]
       │
       ▼
[Admin nhận CK → vào Admin Portal → tìm payment bằng reference_code]
[Admin nhấn "Xác nhận thanh toán" + nhập bank_reference]
       │
       ▼
[Hệ thống: payment.status='completed' → kích hoạt subscription → email user]
```

**Xử lý hết hạn:** Nếu sau 24 giờ không có xác nhận → payment tự động chuyển sang `expired`, user nhận email nhắc chuyển khoản lại nếu cần.

### 9.4. Hoàn Tiền (Refund — MVP)

Xử lý thủ công. Admin cập nhật `payment.status = 'refunded'`, ghi lý do vào `audit_log`. Chưa tích hợp tự động refund API trong giai đoạn MVP.

---

## 10. PHÂN QUYỀN & ADMIN PORTAL <a name="10"></a>

### 10.1. Ba Cấp Phân Quyền

| Cấp | Role DB | Quyền hạn |
|---|---|---|
| **Admin** | `admin` | Full access: xem tất cả, đổi mật khẩu user, thay đổi gói, chỉnh sửa thông tin KH, xác nhận thanh toán, tạo/vô hiệu hóa tài khoản nội bộ, xem toàn bộ audit log, xuất báo cáo, bật/tắt whitelist |
| **Vận Hành** | `van_hanh` | Xem thông tin KH, cập nhật thông tin Bát Tự, nhập nội dung CMS Nhật Vận, xem trạng thái gói, gửi yêu cầu lên Admin (không tự thực hiện thay đổi gói/thanh toán) |
| **Tư Vấn Viên** | `tu_van_vien` | Chỉ xem thông tin KH và lá số (read-only), không thấy thông tin payment, không chỉnh sửa bất kỳ thứ gì |

### 10.2. Tính Năng Admin Portal

**Dashboard tổng quan:**
* Số user mới hôm nay / 7 ngày / 30 ngày
* Số trial đang active / sắp hết hạn (trong 24h)
* Số paid subscribers theo gói
* Doanh thu tháng hiện tại (MoMo + chuyển khoản)
* Tỷ lệ convert trial → paid

**Quản lý khách hàng:**
* Danh sách user: filter theo trạng thái gói, email verified, ngày đăng ký, tên/email
* Chi tiết user: thông tin cá nhân, Bát Tự, link xem lá số, lịch sử subscription, lịch sử thanh toán, lịch sử thông báo đã nhận
* Thao tác: pause / resume / extend (gia hạn đến ngày) / cancel / suspend subscription
* Tất cả thao tác thay đổi ghi vào `audit_log` tự động

**Quản lý thanh toán:**
* Danh sách payments `pending` chờ xác nhận (bank transfer) — ưu tiên hiển thị đầu
* Xác nhận / từ chối thanh toán chuyển khoản
* Lịch sử toàn bộ giao dịch

**Xuất báo cáo:**
* Danh sách users (CSV / Excel): tên, email, phone, trạng thái, ngày đăng ký, ngày hết hạn
* Lịch sử giao dịch (CSV / Excel): ngày, user, số tiền, phương thức, trạng thái
* Filter theo khoảng thời gian, trạng thái, phương thức thanh toán

**Content CMS:**
* Nhập / chỉnh sửa nội dung Nhật Vận (Admin + Vận Hành)
* Calendar view theo tháng với trạng thái từng ngày
* Cảnh báo ngày sắp tới chưa có content

**Whitelist Management (Admin only):**
* Thêm / xóa email hoặc SĐT khỏi whitelist
* Bật/tắt chế độ Closed Beta (flag `WHITELIST_ENABLED`)

---

## 11. WHITELIST / CLOSED BETA (MVP PHASE) <a name="11"></a>

### 11.1. Mục Đích

Giai đoạn MVP đầu tiên chỉ cho phép một tập khách hàng được whitelist trước. Điều này giúp kiểm soát chất lượng vận hành và đảm bảo Sư Phụ chuẩn bị đủ nội dung luận đoán trước khi mở rộng.

### 11.2. Cơ Chế

Khi user cố gắng đăng ký:
* Kiểm tra `email` HOẶC `phone_zalo` có trong bảng `whitelist` không
* **Có trong whitelist:** cho phép đăng ký bình thường
* **Không trong whitelist:** hiển thị thông báo:
  > *"Hệ thống đang trong giai đoạn thử nghiệm nội bộ. Để nhận lời mời sớm, vui lòng để lại thông tin tại [link form đăng ký chờ]."*

### 11.3. Tắt Closed Beta

Admin bật/tắt cờ `WHITELIST_ENABLED = false` trong cài đặt hệ thống → đăng ký mở public ngay lập tức. Không cần deploy lại code.

---

## 12. LỘ TRÌNH TRIỂN KHAI <a name="12"></a>

### Giai Đoạn 1 — Backend & Core Algorithm *(Ưu tiên cao nhất)*
- [ ] Migrate toàn bộ thuật toán Tử Vi từ `demo_laso_tuvi.html` sang Backend API (bảo vệ IP)
- [ ] Xây dựng database schema trên Supabase theo spec Section 5
- [ ] API endpoint: nhận Bát Tự → trả JSON 12 cung (input/output theo Section 4.2)
- [ ] Row-level security (RLS) Supabase cho các bảng sensitive

### Giai Đoạn 2 — Frontend & Registration Flow *(Song song với G1)*
- [ ] Landing page + form nhập Bát Tự → hiển thị lá số (call Backend API)
- [ ] Luồng đăng ký: form → gửi email verify → popup xác nhận → trial activate
- [ ] Luồng đăng nhập / quên mật khẩu
- [ ] Dashboard cá nhân (xem lá số, trạng thái gói, banner chưa verify)
- [ ] Whitelist gate (Closed Beta check khi đăng ký)
- [ ] Trang chọn gói subscription

### Giai Đoạn 3 — Payment Integration
- [ ] MoMo Payment API + webhook xử lý tự động
- [ ] Luồng chuyển khoản ngân hàng + manual confirm trên Admin Portal
- [ ] Email xác nhận thanh toán / kích hoạt gói

### Giai Đoạn 4 — Nhật Vận Engine & Notifications
- [ ] Cron job 06:00 sáng quét users active
- [ ] Logic match content (Section 7.2)
- [ ] Tích hợp Zalo OA API (đăng ký ZNS template với Zalo)
- [ ] Tích hợp Email gửi Nhật Vận
- [ ] Xử lý luồng trial hết hạn → mời nâng cấp

### Giai Đoạn 5 — Admin Portal & Content CMS
- [ ] Quản lý khách hàng (xem, thao tác subscription)
- [ ] Content CMS nhập nội dung Nhật Vận (calendar view)
- [ ] Xác nhận thanh toán chuyển khoản
- [ ] Xuất báo cáo CSV / Excel
- [ ] Whitelist management + toggle Closed Beta
- [ ] Audit log viewer

---

*Tài liệu này được chuẩn bị cho Đội ngũ Lovable Dev — Phase 02 MVP 01.*
*Mọi thay đổi yêu cầu phải được cập nhật vào tài liệu này trước khi triển khai.*
*Cập nhật lần cuối: 06/2026*
