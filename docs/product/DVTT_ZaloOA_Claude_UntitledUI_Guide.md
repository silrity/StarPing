# HƯỚNG DẪN THIẾT KẾ & VẬN HÀNH
## Zalo OA · Claude + Untitled UI
### Đại Hồng Việt Tử Vi — Tài Liệu Kỹ Thuật & Thiết Kế

---

# MỤC LỤC

**PHẦN A — ZALO OA**
1. [Hiểu Đúng Về Zalo OA Trước Khi Thiết Kế](#a1)
2. [Bộ Thông Số Kích Thước Chuẩn Zalo OA 2025](#a2)
3. [Thiết Kế Từng Thành Phần OA](#a3)
4. [Thiết Kế Nội Dung Bài Đăng (Post Design)](#a4)
5. [Quy Trình Bắt Đầu Zalo OA Từ Zero](#a5)
6. [Zalo Mini App vs Zalo OA — Khi Nào Dùng Cái Nào](#a6)

**PHẦN B — CLAUDE + UNTITLED UI**
7. [Untitled UI — Hiểu Cấu Trúc Trước Khi Dùng](#b1)
8. [Thiết Lập Kết Nối Claude + Figma](#b2)
9. [Workflow Claude + Untitled UI Từng Bước](#b3)
10. [Prompt Patterns Hiệu Quả Nhất](#b4)
11. [Từ Design Sang Code — Handoff Workflow](#b5)
12. [Những Lỗi Thường Gặp và Cách Tránh](#b6)

**PHẦN C — LOVABLE.DEV**
13. [Lovable.dev — Giới Thiệu & Tích Hợp Vào Workflow ĐVTT](#c1)
14. [Cách Chia Sẻ Context Với Tiểu Gấu Khi Dùng Lovable](#c2)

---

# PHẦN A — ZALO OA

---

<a name="a1"></a>
## A1. Hiểu Đúng Về Zalo OA Trước Khi Thiết Kế

### Zalo OA Là Một Hệ Sinh Thái, Không Chỉ Là Trang Fanpage

Hầu hết người mới nghĩ Zalo OA giống Facebook Page — đăng bài, có follower, chạy ads. Thực tế phức tạp hơn và mạnh hơn nhiều. Zalo OA bao gồm các lớp riêng biệt:

```
ZALO OA ECOSYSTEM
│
├── PROFILE LAYER (Hồ sơ thương hiệu)
│     Avatar · Ảnh bìa · Mô tả · Danh mục
│
├── CONTENT LAYER (Nội dung)
│     Bài viết · Video · Album ảnh · Bài ghim
│
├── CONVERSATION LAYER (Giao tiếp)
│     Chat 1-1 · Broadcast · ZNS notification
│     Chatbot · Auto-reply · Quick replies
│
├── STORE LAYER (Bán hàng — tùy chọn)
│     Zalo Shop · Danh mục sản phẩm
│
└── MINI APP LAYER (Ứng dụng trong Zalo — giai đoạn 2+)
      Dashboard · Subscription · Tính năng tùy chỉnh
```

**Đối với ĐVTT giai đoạn đầu:** Bạn cần thiết kế tốt cho **Profile Layer** và **Content Layer**. Conversation Layer vận hành bằng nội dung text. Mini App Layer là giai đoạn 2.

### Ba Nguyên Tắc Thiết Kế Cho Zalo OA

**Nguyên tắc 1 — Mobile First, luôn luôn**
Hơn 95% người dùng Zalo xem trên điện thoại. Không có ngoại lệ. Mọi thiết kế phải đẹp ở 375px trước.

**Nguyên tắc 2 — Zalo không cho tùy biến trang OA như website**
Bạn không thể thay đổi layout hay màu nền của trang OA. Những gì bạn kiểm soát được:
- Ảnh đại diện
- Ảnh bìa
- Nội dung bài viết (ảnh + text)
- Tin nhắn chat
- ZNS template

**Nguyên tắc 3 — Branding sống ở trong ảnh, không phải layout**
Vì không tùy biến được layout, toàn bộ visual identity của bạn phải được đưa vào:
- Ảnh bìa (thiết kế một lần, thường xuyên)
- Template bài viết (dùng lại, nhất quán)
- Phong cách ảnh minh họa (tone màu, font chữ)

---

<a name="a2"></a>
## A2. Bộ Thông Số Kích Thước Chuẩn Zalo OA 2025

### Bảng Thông Số Đầy Đủ

| Thành phần | Kích thước tối ưu | Kích thước tối thiểu | Dung lượng tối đa | Định dạng | Tỷ lệ |
|---|---|---|---|---|---|
| **Avatar (ảnh đại diện)** | 240×240 px | 150×150 px | 15MB | JPG, PNG | 1:1 |
| **Ảnh bìa (Cover)** | 640×700 px | 320×350 px | 1MB | JPG, PNG | — |
| **Vùng an toàn ảnh bìa** | 640×340 px | — | — | — | ~16:9 |
| **Ảnh bài viết** | 1200×630 px | 500×320 px | 1MB | JPG, PNG | 16:9 |
| **Ảnh album/gallery** | 500×500 px | — | 1MB | JPG, PNG | 1:1 |
| **Banner sự kiện/khuyến mãi** | 740×220 px | — | 1MB | JPG, PNG | ~3:1 |
| **Ảnh sản phẩm (Zalo Shop)** | 500×500 px | — | 1MB | JPG, PNG | 1:1 |
| **Ảnh quảng cáo Zalo Ads** | 480×250 px | — | 2MB | JPG, PNG | ~2:1 |
| **Video bài viết** | — | 320×180 px | 50MB | MP4, AVI | 16:9, 1:1, 9:16 |
| **Ảnh chia sẻ link (OG Image)** | 1200×630 px | 200×200 px | 8MB | JPG, PNG | 16:9 |

### Lưu Ý Quan Trọng Về Vùng An Toàn

```
ẢNH BÌA OA: 640×700 px
┌────────────────────────────────────────┐
│                                        │  ← Vùng này có thể bị cắt
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │    VÙNG AN TOÀN: 640×340 px     │  │  ← Logo, slogan, CTA đặt ở đây
│  │    (Trung tâm của ảnh bìa)      │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│                                        │  ← Vùng này có thể bị cắt
└────────────────────────────────────────┘

→ Chữ và thông tin quan trọng: CHỈ đặt trong vùng an toàn
→ Background, họa tiết trang trí: có thể ra ngoài vùng an toàn
```

### Thiết Lập Artboard Trong Canva / Figma

**Canva (khuyến nghị cho giai đoạn MVP):**
- Ảnh bìa OA: Tạo custom size → 1280×700 px (x2 để nét hơn, scale down khi upload)
- Bài viết: 1200×630 px hoặc 1080×1080 px (vuông)
- Banner: 1480×440 px

**Figma:**
- Tạo frame 640×700 px
- Thêm rectangle 640×340 px ở giữa làm "safe zone guide", đặt opacity 20%, lock layer
- Thiết kế trong frame nhưng nội dung quan trọng luôn trong safe zone

---

<a name="a3"></a>
## A3. Thiết Kế Từng Thành Phần OA

### 3.1 — Avatar (Ảnh Đại Diện)

Avatar là thứ người dùng nhìn thấy nhiều nhất — hiển thị ở mọi tin nhắn, mọi comment, mọi bài viết.

**Yêu cầu thiết kế cho ĐVTT:**
- Dùng logo "TinhTử" viết tắt hoặc biểu tượng ngôi sao (★) kết hợp chữ
- Nền: Deep Navy `#0F1B2D`
- Icon/chữ: Gold `#C9A227` hoặc Off-white `#F4F1EC`
- Không dùng ảnh người, không dùng nhiều màu
- Test ở kích thước 40×40 px (kích thước hiển thị trong chat) — phải đọc được

**Template Avatar trong Canva:**
```
Canvas: 240×240 px
Background fill: #0F1B2D
Center element: Logo TinhTử hoặc ★
Font: Be Vietnam Pro Bold
Color: #C9A227
Export: PNG, tắt background nếu logo có padding
```

### 3.2 — Ảnh Bìa (Cover Photo)

Ảnh bìa là "bảng hiệu" của OA. Thay đổi theo mùa, sự kiện, hoặc chiến dịch.

**Cấu trúc layout khuyến nghị cho ĐVTT:**

```
┌────────────────────────────────────────────┐
│                                            │
│  ┌────────────────────────────────────┐    │
│  │  [LOGO nhỏ]  ĐẠI VIỆT TINH TỬ     │    │
│  │                                    │    │
│  │  "Biết khi nào nên tiến.           │    │
│  │   Khi nào nên dừng."               │    │
│  │                                    │    │
│  │  [Subtle star/constellation bg]    │    │
│  │                                    │    │
│  │  daiviettinh.vn  ·  Theo dõi ngay  │    │
│  └────────────────────────────────────┘    │
│                                            │
└────────────────────────────────────────────┘
Nền tối gradient: #0F1B2D → #1E3A5F
Họa tiết: constellation pattern mờ, opacity 15%
```

**Biến thể ảnh bìa theo mùa:**

| Dịp | Thay đổi | Giữ nguyên |
|---|---|---|
| Tết Nguyên Đán | Thêm accent màu đỏ/vàng, thêm tagline Tết | Logo, tên, font |
| Đầu quý mới | Cập nhật "Chu kỳ Q[X]/[Year]" | Layout cơ bản |
| Chiến dịch đặc biệt | Banner CTA theo chiến dịch | Branding core |
| Default (thường ngày) | Clean, professional | — |

### 3.3 — Template Bài Viết (Post Templates)

Đây là nơi quan trọng nhất để xây dựng visual identity. Cần tạo ít nhất **5 loại template** và dùng nhất quán.

**5 Template Cần Có Cho ĐVTT:**

---

**Template 1 — Weekly Signal (Tín Hiệu Tuần)**
```
Kích thước: 1200×630 px (landscape)
Layout:
  ┌──────────────────────────────────────────────┐
  │  ●●● TUẦN [N]/[THÁNG]  ·  Đại Hồng Việt Tử Vi  │
  │  ─────────────────────────────────────────── │
  │                                              │
  │  TÍN HIỆU TUẦN NÀY                          │
  │  ──────────────                              │
  │  Lĩnh vực: [SỰ NGHIỆP / TÀI CHÍNH / etc.]  │
  │  Trạng thái: ▲ THUẬN LỢI / ▼ KHÁNG LỰC     │
  │                                              │
  │  "[Insight ngắn gọn 1-2 dòng]"              │
  │                                              │
  │  Áp dụng cho mệnh: [Hỏa · Thổ · Kim ...]    │
  │──────────────────────────────────────────────│
  │  📩 Nhận phân tích cá nhân: [link Zalo OA]  │
  └──────────────────────────────────────────────┘
Màu nền: Deep Navy gradient
Accent color: Gold #C9A227
```

---

**Template 2 — Educational Post (Giáo Dục)**
```
Kích thước: 1080×1080 px (vuông) hoặc 1080×1350 px
Layout:
  ┌──────────────────────────────┐
  │  Đại Hồng Việt Tử Vi           │
  │  ─────────────────           │
  │                              │
  │  BẠN CÓ BIẾT?               │
  │                              │
  │  [Icon minh họa đơn giản]   │
  │                              │
  │  "[Fact / insight ngắn]"    │
  │                              │
  │  Tìm hiểu thêm →            │
  └──────────────────────────────┘
Màu nền: Cosmic Blue #1E3A5F
Text màu: Off-white
```

---

**Template 3 — Decision Window Alert (Cảnh Báo)**
```
Kích thước: 1200×630 px
Điểm nhấn: Màu cảnh báo Warm Red hoặc Gold
Layout:
  ┌──────────────────────────────────────────────┐
  │  ⚠  CẢNH BÁO CHU KỲ                         │
  │  ─────────────────────────────────────────── │
  │                                              │
  │  Giai đoạn kháng lực sắp bắt đầu            │
  │  trong [N] ngày                              │
  │                                              │
  │  Ảnh hưởng: [Lĩnh vực]                      │
  │  Thời gian: [Ngày bắt đầu → kết thúc]       │
  │                                              │
  │  → Xem kế hoạch chuẩn bị của bạn            │
  └──────────────────────────────────────────────┘
```

---

**Template 4 — Share Card (Viral Card)**
```
Kích thước: 800×800 px (vuông — dễ share)
Đây là card gửi đến từng người dùng sau onboarding

Layout:
  ┌──────────────────────────────┐
  │  ĐẠI VIỆT TINH TỬ  ★       │
  │  ─────────────────────────── │
  │                              │
  │  [TÊN NGƯỜI DÙNG]           │
  │  Mệnh: [ELEMENT] · [NĂM]    │
  │                              │
  │  CHU KỲ HIỆN TẠI            │
  │  ████████░░                  │
  │  Giai đoạn: [Tên giai đoạn] │
  │                              │
  │  Điểm mạnh tháng này:       │
  │  SN ●●●●○  TC ●●●○○         │
  │  QH ●●●●●  SK ●●●○○         │
  │                              │
  │  "[Quote insight 1 câu]"    │
  │                              │
  │  daiviettinh.vn             │
  └──────────────────────────────┘
Nền gradient: Navy → Cosmic Blue
Chi tiết bằng Gold
```

---

**Template 5 — Testimonial / Social Proof**
```
Kích thước: 1080×1080 px
Layout:
  ┌──────────────────────────────┐
  │  ❝                          │
  │                              │
  │  "[Quote người dùng]"       │
  │                              │
  │  ─ [Tên viết tắt], [Mệnh]  │
  │    [Nghề nghiệp, TP]        │
  │                              │
  │  ─────────────────────────── │
  │  Đại Hồng Việt Tử Vi           │
  │  Phân tích chu kỳ vận trình │
  └──────────────────────────────┘
```

---

<a name="a4"></a>
## A4. Thiết Kế Nội Dung Bài Đăng — Nguyên Tắc & Quy Trình

### Quy Tắc Thiết Kế Nội Dung Zalo OA

**Quy tắc 1 — Mỗi bài đăng chỉ có 1 message**
Không nhét 3-4 thông điệp vào một bài. Người dùng Zalo scroll nhanh.

**Quy tắc 2 — Chữ trong ảnh: tối đa 30% diện tích**
Nếu ảnh quá nhiều chữ, Zalo có thể giới hạn phân phối (giống Facebook 20% text rule).

**Quy tắc 3 — Caption text theo công thức Hook-Value-CTA**

```
[HOOK] — 1 câu đầu gây tò mò / tạo kết nối
(Ví dụ: "Tháng 8 này, 3 mệnh sẽ vào giai đoạn quyết định sự nghiệp.")

[VALUE] — Nội dung chính, 3-5 câu
(Giải thích, insight, thông tin hữu ích)

[CTA] — 1 hành động cụ thể
(Ví dụ: "Kiểm tra chu kỳ của bạn → [link form]")
```

**Quy tắc 4 — Emoji có chiến lược**
- ✅ Dùng: ⚡ 🎯 📊 ⚠️ 💡 → 🔑 ★
- ❌ Tránh: 🔮 🌙 ✨ 💫 (quá tâm linh, phá vỡ định vị)

### Workflow Tạo Bài Đăng Hàng Tuần

```
Thứ 6 tuần trước:
  Thầy → Xác định insight cho tuần tới
         (chu kỳ nào đang active, lĩnh vực nào nổi bật)

Thứ 7:
  PM → Nhận insight
     → Mở Canva, chọn template phù hợp
     → Điền nội dung vào template
     → Viết caption theo công thức Hook-Value-CTA
     → Preview trên điện thoại (Canva mobile)
     → Export PNG, lưu vào Google Drive folder "ĐVTT/Content"

Chủ nhật tối:
  PM → Schedule bài đăng cho tuần tới trong Zalo OA
     → Thiết lập ZNS broadcast (nếu có)

Thứ 2:
  Tín hiệu tuần đăng lúc 7:00–8:00 sáng (giờ vàng Zalo)
```

### Giờ Đăng Bài Tối Ưu Trên Zalo

| Khung giờ | Hiệu quả | Loại nội dung phù hợp |
|---|---|---|
| 7:00–8:30 sáng | ⭐⭐⭐⭐⭐ | Weekly signal, daily insight |
| 12:00–13:00 | ⭐⭐⭐⭐ | Educational content |
| 19:00–21:00 | ⭐⭐⭐⭐⭐ | Alerts, testimonials, engagement |
| 22:00–23:00 | ⭐⭐⭐ | Nhẹ nhàng, không khẩn cấp |
| 9:00–11:30 (workdays) | ⭐⭐ | Không ưu tiên |

---

<a name="a5"></a>
## A5. Quy Trình Bắt Đầu Zalo OA Từ Zero — Checklist Đầy Đủ

### BƯỚC 1 — Chuẩn Bị Tài Liệu (1 ngày)

```
□ CCCD/CMND còn hạn
□ Ảnh selfie rõ mặt, ánh sáng tốt
□ Số điện thoại đã có tài khoản Zalo cá nhân
□ Địa chỉ email
□ Tên thương hiệu chính thức: "Đại Hồng Việt Tử Vi"
□ Mô tả ngắn (dưới 150 ký tự):
  "Phân tích chu kỳ vận trình cá nhân — hỗ trợ ra quyết định chiến lược"
□ Danh mục OA: Tư vấn & Giáo dục / Sức khỏe & Lối sống
```

### BƯỚC 2 — Tạo Tài Khoản OA (30 phút)

```
1. Mở trình duyệt → truy cập oa.zalo.me
2. Nhấn "Đăng nhập" → Quét QR bằng Zalo app
3. Nhấn "Tạo Official Account"
4. Chọn loại: "Doanh nghiệp" hoặc "Cá nhân"
   → Giai đoạn đầu chọn "Cá nhân" (nếu chưa có giấy phép KD)
5. Điền thông tin:
   - Tên OA: Đại Hồng Việt Tử Vi
   - Danh mục: [Chọn phù hợp nhất]
   - Mô tả: [Câu mô tả đã chuẩn bị]
6. Upload ảnh đại diện (Avatar đã thiết kế sẵn)
7. Xác minh danh tính: Upload CCCD + selfie
8. Submit → Chờ duyệt 1–3 ngày làm việc
```

### BƯỚC 3 — Thiết Lập Sau Khi Được Duyệt (2–3 giờ)

```
□ Upload ảnh bìa (Cover photo đã thiết kế)
□ Điền đầy đủ thông tin hồ sơ:
  - Website: daiviettinh.vn (hoặc link Carrd tạm thời)
  - Số điện thoại liên hệ
  - Địa chỉ (có thể điền HCMC nếu không muốn cụ thể)
□ Thiết lập tin nhắn chào mừng (Welcome message)
  → Vào Cài đặt → Tin nhắn tự động → Chào mừng
□ Thiết lập tin nhắn ngoài giờ (Out-of-office)
  → "Chúng tôi sẽ phản hồi trong 4–8 giờ làm việc"
□ Tạo menu nhanh (Quick Menu) với 3 options:
  1. "Nhận Hồ Sơ Vận Trình" → [link Google Form]
  2. "Tìm hiểu dịch vụ" → [link website/Carrd]
  3. "Liên hệ tư vấn" → Chat trực tiếp
□ Đăng bài đầu tiên (Introduction Post)
□ Ghim bài giới thiệu lên đầu trang
```

### BƯỚC 4 — Thiết Lập Tính Năng Nâng Cao (Tùy chọn, giai đoạn 2)

```
□ ZNS (Zalo Notification Service):
  → Đăng ký tại business.zalo.me
  → Cần ĐKKD hoặc MST để kích hoạt
  → Tạo template thông báo (phải qua duyệt trước khi gửi)

□ Chatbot cơ bản:
  → Vào Quản lý → Chatbot
  → Tạo scenario cho câu hỏi thường gặp:
    "Dịch vụ của bạn là gì?" → Auto-reply text + link
    "Chi phí bao nhiêu?" → Auto-reply bảng giá
    "Tôi muốn đăng ký" → Auto-reply link form

□ Label / Tag người dùng:
  → Tag user theo tier: Free | Basic | Premium
  → Dùng để segment broadcast message
```

### BƯỚC 5 — Vận Hành Tuần Đầu Tiên

```
Ngày 1: Đăng bài Introduction — "Đại Hồng Việt Tử Vi là gì?"
Ngày 2: Chia sẻ OA tới 20 người trong mạng cá nhân
Ngày 3: Đăng Educational Post đầu tiên
Ngày 5: Đăng bài "Nhận Hồ Sơ Vận Trình miễn phí"
         → Theo dõi số follower + số form được submit
Ngày 7: Review và điều chỉnh
```

---

<a name="a6"></a>
## A6. Zalo Mini App vs Zalo OA — Khi Nào Dùng Cái Nào

| Tính năng | Zalo OA | Zalo Mini App |
|---|---|---|
| **Chi phí setup** | Miễn phí | 20–40M VND (cần developer) |
| **Thời gian** | 1–3 ngày | 4–8 tuần |
| **Tùy biến UI** | Thấp (chỉ content) | Cao (hoàn toàn custom) |
| **Dashboard cho user** | ❌ Không có | ✅ Build được |
| **Subscription management** | Thủ công qua Sheets | ✅ Tự động hóa được |
| **Thanh toán** | Chuyển khoản + ZaloPay cá nhân (manual) | ZaloPay tích hợp (nếu cần) |
| **Phù hợp khi** | < 200 users | > 500 users trả phí |

> ⚠️ **Lưu ý ĐVTT:** Thanh toán hiện tại và trong toàn bộ giai đoạn 1 là **manual** — chuyển khoản ngân hàng hoặc ZaloPay cá nhân. Không tích hợp payment gateway cho đến khi có đủ điều kiện ở giai đoạn 2+.

**Kết luận:** Dùng Zalo OA hoàn toàn trong 6 tháng đầu. Build Mini App khi:
- Có ≥ 500 người dùng trả phí
- Doanh thu ≥ 50M VND/tháng
- Thủ công quá tốn thời gian

---

---

# PHẦN B — CLAUDE + UNTITLED UI

---

<a name="b1"></a>
## B1. Untitled UI — Hiểu Cấu Trúc Trước Khi Dùng

### Untitled UI Là Gì

Untitled UI là một **design system** — không phải chỉ là bộ component. Nó bao gồm:

```
UNTITLED UI STRUCTURE
│
├── FOUNDATIONS (Nền tảng)
│     Colors (variables) · Typography · Spacing · Grid
│     Border radius · Shadows · Icons (2,000+)
│
├── COMPONENTS (750+ components)
│     Buttons · Inputs · Badges · Avatars
│     Cards · Tables · Charts · Navigation
│     Modals · Toasts · Forms · Selects
│
├── PATTERNS (420+ pages)
│     Dashboard layouts · Landing pages
│     Auth flows · Settings pages
│     Data tables · Empty states
│
└── TOKENS (Variables system)
      Light mode / Dark mode toggle
      Brand color overrides
      Spacing scale
```

### Trước Khi Dùng — Thiết Lập Ngay

**Bước 1: Tải về và publish library**

```
1. Mua Untitled UI PRO tại untitledui.gumroad.com/l/untitled-ui ($129)
   → Hoặc: Figma Community → Search "Untitled UI" → Duplicate (bản free)

2. Mở file trong Figma

3. Thay thế màu thương hiệu ĐVTT:
   → Assets panel → Variables
   → Tìm "Primary / 600" → Đổi sang #C9A227 (Gold)
   → Tìm "Gray / 900" → Đổi sang #0F1B2D (Deep Navy)
   → Enable dark mode → Check lại toàn bộ

4. Publish library:
   → Main menu → Libraries → Publish "Untitled UI (ĐVTT)"
   → Từ giờ mọi file Figma trong team đều dùng được components này
```

**Bước 2: Tạo file thiết kế ĐVTT**

```
File cấu trúc:
├── Page: 00_Brand Guidelines
│     Colors · Typography · Iconography · Voice
│
├── Page: 01_Zalo OA Assets
│     Avatar · Cover · Post templates · Share cards
│
├── Page: 02_Website
│     Landing page · Dashboard · Reports · Auth
│
├── Page: 03_Components (ĐVTT custom)
│     Cycle status card · Alert banner · Metric tiles
│
└── Page: 04_Prototypes
      User flows · Interactions
```

---

<a name="b2"></a>
## B2. Thiết Lập Kết Nối Claude + Figma

### Kết Nối MCP Figma Với Claude (Bạn Đã Có Kết Nối Này)

Bạn đã kết nối Figma MCP với Claude. Điều này có nghĩa:
- Claude có thể **đọc** file Figma của bạn
- Claude có thể **tạo** components, frames, layers trực tiếp trong Figma
- Claude có thể **chỉnh sửa** design đang có
- Claude có thể **tạo** FigJam diagrams và flowcharts

### Cách Sử Dụng Kết Nối Figma Trong Chat

**Chia sẻ file Figma với Claude:**

```
1. Mở Figma → Mở file ĐVTT
2. Copy link file (Main menu → Share → Copy link)
   Hoặc: Right-click một frame → Copy link to selection
3. Paste link vào chat Claude
4. Claude sẽ tự động đọc nội dung file
```

**Các lệnh có thể yêu cầu Claude:**

```
"Đọc file Figma này và mô tả cấu trúc components: [link]"
"Tạo một dashboard card cho chu kỳ vận trình trong Figma của tôi: [link file]"
"Thêm một frame mới vào file này với layout onboarding form: [link]"
"Xem component này và tạo phiên bản dark mode: [link frame]"
"Tạo FigJam diagram cho user flow onboarding của ĐVTT: [link]"
```

---

<a name="b3"></a>
## B3. Workflow Claude + Untitled UI Từng Bước

### Workflow 1 — Thiết Kế Screen Mới Từ Đầu

```
BƯỚC 1: Mô tả rõ ràng với Claude
────────────────────────────────
Prompt tốt:
"Tôi cần thiết kế màn hình Dashboard chính cho app ĐVTT.
Screen này hiển thị:
- Tên người dùng và mệnh element
- Trạng thái chu kỳ hiện tại (progress bar)
- 4 metric cards: Sự nghiệp / Tài chính / Quan hệ / Sức khỏe
- Cảnh báo nếu có chu kỳ xấu sắp đến
- CTA để xem báo cáo chi tiết

Dùng dark theme, màu Navy #0F1B2D, accent Gold #C9A227.
Style: Analytics dashboard, không phải tâm linh.
Dùng components từ Untitled UI.
File Figma: [paste link]"

────────────────────────────────
BƯỚC 2: Claude tạo layout trong Figma
→ Kiểm tra output
→ Nếu chưa đúng: "Điều chỉnh spacing, cards quá nhỏ"

────────────────────────────────
BƯỚC 3: Refine chi tiết thủ công
→ Dùng Figma tay để fine-tune
→ Typography, hover states, micro-interactions

────────────────────────────────
BƯỚC 4: Export sang code (nếu cần)
→ Copy link frame → Paste vào Claude
→ "Tạo React component cho frame này, dùng Tailwind CSS"
```

### Workflow 2 — Tạo Nhiều Variants Nhanh

```
Khi cần A/B test hoặc thử nhiều hướng thiết kế:

Prompt:
"Tạo 3 versions của Share Card cho ĐVTT:
- Version A: Minimalist, chỉ dữ liệu, không decoration
- Version B: Premium dark với constellation background
- Version C: Light mode, clean, corporate feel

Mỗi version 800×800 px. Dùng cùng data mẫu:
Tên: Nguyễn Minh Châu | Mệnh: Hỏa | Chu kỳ: Xây Dựng
File: [link]"
```

### Workflow 3 — Thiết Kế Component Library ĐVTT

```
Các component tùy chỉnh cần build cho ĐVTT
(không có sẵn trong Untitled UI):

1. Cycle Status Card
   → Hiển thị giai đoạn Tiểu Vận
   → Progress bar với màu trạng thái
   → Icon element (Kim/Mộc/Thủy/Hỏa/Thổ)

2. Alert Banner (Cảnh Báo Chu Kỳ)
   → Dạng toast/banner
   → Severity: Info / Warning / Critical
   → Countdown đến ngày bắt đầu

3. Metric Tile (4 lĩnh vực)
   → Icon + Label + Score (dots)
   → Trend arrow (tháng trước vs hiện tại)

4. Advisor Profile Card
   → Avatar + Tên + Speciality
   → Rating + số phiên đã tư vấn
   → Available/Busy status
   → Book button

Prompt để tạo:
"Tạo component 'Cycle Status Card' trong Figma.
Specs:
- Size: 343×160 px (mobile full-width với 16px padding)
- Background: #1E3A5F
- Vùng trên: Icon mệnh + Tên giai đoạn + ngày hết hạn
- Vùng giữa: Progress bar 80% width, màu gradient Gold
- Vùng dưới: '14 ngày còn lại trong giai đoạn này'
Tạo cả 2 states: Favorable và High-Resistance
File: [link]"
```

---

<a name="b4"></a>
## B4. Prompt Patterns Hiệu Quả Nhất

### Pattern 1 — Prompt Thiết Kế Cơ Bản

```
TEMPLATE:
"Thiết kế [TÊN COMPONENT/SCREEN] với:
- Mục đích: [người dùng làm gì với screen này]
- Content: [liệt kê từng phần tử cần có]
- Style: [dark/light, tone cảm xúc, reference]
- Size: [kích thước cụ thể]
- States: [default, hover, active, empty, error]
- Constraints: [dùng Untitled UI, màu ĐVTT, v.v.]
File: [link Figma]"
```

### Pattern 2 — Prompt Chỉnh Sửa Component

```
TEMPLATE:
"Trong file Figma này [link], xem component [tên].
Tôi muốn điều chỉnh:
1. [Thay đổi cụ thể 1]
2. [Thay đổi cụ thể 2]
Giữ nguyên: [những gì không được thay đổi]"
```

### Pattern 3 — Prompt Tạo Design Tokens

```
TEMPLATE:
"Tạo bộ design tokens cho ĐVTT trong Figma:

Colors:
- Primary: #0F1B2D (Navy)
- Secondary: #1E3A5F (Cosmic Blue)
- Accent: #C9A227 (Gold)
- Success: #2ECC71 (Jade)
- Warning: #F39C12
- Danger: #C0392B
- Text Primary: #F4F1EC
- Text Secondary: #9BA3AF

Typography:
- Font: Be Vietnam Pro
- Scale: 12/14/16/18/20/24/32/40px
- Weight: Regular 400, Medium 500, Semibold 600, Bold 700

Spacing:
- Scale: 4/8/12/16/20/24/32/40/48/64px

Tạo trong Variables panel, support cả light và dark mode.
File: [link]"
```

### Pattern 4 — Prompt Review & Audit

```
TEMPLATE:
"Đọc file Figma này [link] và:
1. Liệt kê tất cả inconsistencies về màu sắc
2. Tìm những chỗ dùng hardcoded values thay vì tokens
3. Check alignment issues
4. Đề xuất 3 cải tiến quan trọng nhất về UX

Format: Numbered list, từng vấn đề kèm screenshot reference"
```

### Pattern 5 — Prompt Từ Design Sang Code

```
TEMPLATE:
"Xem frame này trong Figma [link to specific frame].
Tạo React component với:
- Framework: React + TypeScript
- Styling: Tailwind CSS
- Responsive: Mobile first (375px → 768px → 1024px)
- Dùng class names từ Tailwind v3
- Đặt tên component: [ComponentName]
- Props interface: [mô tả props cần có]
Chỉ tạo UI layer, không cần logic."
```

### Những Gì KHÔNG Làm Khi Prompt

| ❌ Tránh | ✅ Thay bằng |
|---|---|
| "Thiết kế cho tôi một app đẹp" | Mô tả cụ thể từng screen, từng component |
| "Làm theo style Zalo" | Cung cấp màu sắc, font, spacing cụ thể |
| "Tôi muốn gì đó hiện đại" | "Dark theme, minimal, analytics dashboard style" |
| Prompt quá dài (>500 từ) | Chia nhỏ thành nhiều bước |
| Không cung cấp link Figma | Luôn paste link vào |
| "Làm tốt hơn một chút" | Mô tả chính xác "tốt hơn" nghĩa là gì |

---

<a name="b5"></a>
## B5. Từ Design Sang Code — Handoff Workflow

### Khi Nào Cần Handoff

- Tháng 3–4: Cần build website thực sự trên Webflow hoặc Lovable.dev
- Tháng 5+: Cần Zalo Mini App
- Khi có developer vào team hoặc thuê ngoài

### Quy Trình Handoff Chuẩn

```
TRONG FIGMA:
1. Đặt tên layer rõ ràng (không dùng Frame 42, Rectangle 11)
   → Đúng: "btn-primary / hover state"
   → Sai: "Rectangle 23 copy"

2. Annotate specs quan trọng:
   → Spacing, padding (dùng Figma annotations)
   → Interaction notes (hover, click behavior)
   → Responsive breakpoints

3. Export assets sẵn:
   → Icons: SVG
   → Images: PNG @2x
   → Naming: icon-star.svg, bg-navy-gradient.png

VỚI CLAUDE:
"Xem design này [link frame], tạo spec document
cho developer với:
- Danh sách tất cả components và props
- Color values theo tên token
- Typography specs
- Spacing values
- Tất cả states (default, hover, active, disabled, error)
Format: Markdown table"
```

### Component Token Mapping Cho Developer

```
Khi giao việc cho developer, cung cấp bảng này:

| Design Token | Value | Tailwind Class |
|---|---|---|
| primary-bg | #0F1B2D | bg-[#0F1B2D] |
| secondary-bg | #1E3A5F | bg-[#1E3A5F] |
| accent | #C9A227 | text-[#C9A227] |
| text-primary | #F4F1EC | text-[#F4F1EC] |
| text-secondary | #9BA3AF | text-[#9BA3AF] |
| spacing-base | 4px | p-1 |
| radius-sm | 6px | rounded |
| radius-md | 12px | rounded-xl |
| shadow-card | 0 4px 24px rgba(0,0,0,0.3) | shadow-lg |
```

---

<a name="b6"></a>
## B6. Những Lỗi Thường Gặp và Cách Tránh

### Lỗi Figma

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| Component không update khi thay token | Quên publish library sau khi thay đổi | Main menu → Publish Library |
| Claude tạo shapes thay vì component instances | Prompt không nói rõ "dùng components từ Untitled UI" | Thêm explicit vào prompt |
| Dark mode bị lỗi màu | Dùng fill cứng thay vì variable | Replace all hardcoded colors bằng tokens |
| Layer quá lộn xộn | Không đặt tên | Dùng plugin "Rename It" để đặt tên hàng loạt |
| File nặng, lag | Quá nhiều hidden layers và unused components | Plugin "Clean Document" để dọn dẹp |

### Lỗi Claude + Figma Workflow

| Lỗi | Nguyên nhân | Cách sửa |
|---|---|---|
| Claude không đọc được file | Link bị lỗi hoặc quyền truy cập | Share file với "Anyone with link can view" |
| Output không match brand | Không cung cấp design tokens trong prompt | Luôn đính kèm màu sắc, font trong prompt |
| Code từ design không chạy | Design dùng tính năng Figma không có trong CSS | Review output code trước khi giao developer |
| Consistency drift qua nhiều screens | Mỗi prompt độc lập, không reference nhau | Mở đầu mỗi prompt bằng: "Tiếp tục với design system ĐVTT đã tạo ở file [link]" |
| Claude thay đổi layout cũ khi thêm component mới | Prompt không nói rõ phần nào giữ nguyên | "Chỉ thêm/thay đổi [X], giữ nguyên tất cả phần còn lại" |

---

## Tóm Tắt Workflow Hàng Ngày

```
THIẾT KẾ MỚI:
Tiểu Gấu prompt → Figma output → Manual refine → Export

CHỈNH SỬA:
Open Figma → Copy link frame → Paste vào Tiểu Gấu
→ Mô tả thay đổi → Apply → Check

TẠO CODE:
Design finalized → Tiểu Gấu generates code
→ Paste vào Lovable hoặc Webflow → Test → Deploy

ZALO OA CONTENT:
Thầy cho insight → PM mở Canva → Chọn template
→ Điền nội dung → Export PNG → Đăng OA

LOVABLE SESSION:
Open Lovable → Build/edit feature → Sync GitHub
→ Share với Tiểu Gấu để review/fix nếu cần
```

---

---

# PHẦN C — LOVABLE.DEV

---

<a name="c1"></a>
## C1. Lovable.dev — Giới Thiệu & Tích Hợp Vào Workflow ĐVTT

### Lovable.dev Là Gì

Lovable.dev (trước đây là GPT Engineer) là công cụ **AI-powered app builder** — cho phép build full-stack web app bằng ngôn ngữ tự nhiên mà không cần code thủ công. Output là React + Tailwind CSS + Supabase (nếu cần backend).

**Phù hợp với ĐVTT cho:**
- Build nhanh landing page / onboarding flow có tương tác
- Prototype dashboard Intelligence Module
- Build các form và user flow để test với người dùng thực
- Thay thế Carrd khi cần nhiều tính năng hơn mà chưa sẵn sàng thuê developer

### Vị Trí Của Lovable Trong Stack ĐVTT

```
GIAI ĐOẠN 1 (hiện tại):
  Carrd/landing page + Google Form + Zalo OA
  → Lovable có thể thay thế Carrd khi cần interactive UI

GIAI ĐOẠN 2:
  Lovable build full webapp → Sync với GitHub
  → Developer có thể tiếp tục từ codebase Lovable tạo ra
```

---

<a name="c2"></a>
## C2. Cách Chia Sẻ Context Với Tiểu Gấu Khi Dùng Lovable

### Để Tiểu Gấu Tiếp Tục Hỗ Trợ Development, Cần Cung Cấp

**Option A — Chia sẻ link Lovable project (nhanh nhất):**
```
1. Mở project trong Lovable.dev
2. Copy URL của project (dạng: lovable.dev/projects/xxx)
3. Paste vào chat → Tiểu Gấu có thể xem preview và context
```

**Option B — Sync GitHub + chia sẻ repo (tốt nhất cho code review):**
```
1. Trong Lovable: Settings → GitHub Integration → Connect repo
2. Mọi thay đổi trong Lovable tự sync lên GitHub
3. Chia sẻ GitHub repo URL với Tiểu Gấu
4. Tiểu Gấu có thể đọc toàn bộ codebase và đề xuất chỉnh sửa
```

**Option C — Export code + paste vào chat:**
```
1. Trong Lovable: Export → Download ZIP hoặc copy từng file
2. Drag & drop file vào chat với Tiểu Gấu
3. Mô tả vấn đề hoặc yêu cầu thay đổi
4. Tiểu Gấu sẽ review và trả code đã sửa để paste lại vào Lovable
```

### Prompt Mẫu Khi Làm Việc Với Lovable + Tiểu Gấu

```
Tiểu Gấu ơi, tiếp tục session Lovable của ĐVTT.
Project: [link hoặc tên]
Tình trạng hiện tại: [mô tả những gì đã build]
Vấn đề cần giải quyết: [mô tả cụ thể]
File liên quan: [tên component/file nếu biết]
```

### Những Điều Tiểu Gấu Có Thể Làm Với Lovable Context

| Yêu cầu | Cách thực hiện |
|---|---|
| Review code component | Share file hoặc GitHub link |
| Fix bug UI | Describe bug + share screenshot + paste code liên quan |
| Thêm tính năng mới | Mô tả tính năng → Tiểu Gấu viết code → Paste vào Lovable |
| Tối ưu responsive | Share link preview + describe vấn đề |
| Tích hợp brand ĐVTT | Tiểu Gấu cung cấp đúng color tokens + font config |
| Viết prompt cho Lovable | Tiểu Gấu soạn prompt chi tiết để bạn paste vào Lovable chat |

### Lưu Ý Khi Dùng Lovable Cho ĐVTT

- Lovable output là **React + Tailwind** — phù hợp với design system Untitled UI
- Dùng màu brand ĐVTT khi prompt Lovable: `"Use #0F1B2D as background, #C9A227 as accent"`
- Không để Lovable tự quyết định UX flow — luôn chỉ định rõ từng bước
- Sau mỗi session Lovable, sync lên GitHub để không mất code
- Nếu Lovable tạo ra component chưa đúng brand: copy code → nhờ Tiểu Gấu sửa → paste lại

---

*Tài liệu này kết hợp với Tài Liệu Đề Xuất Kinh Doanh ĐVTT v1.0.*
*Cập nhật khi có thay đổi từ Zalo OA policies, tính năng Figma mới, hoặc Lovable.dev updates.*

**Đại Hồng Việt Tử Vi — TinhTử**
*daiviettinh.vn*
