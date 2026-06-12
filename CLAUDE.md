# ĐVTT — CLAUDE.md

> File này dành cho Claude Code (terminal / VS Code). Đọc toàn bộ trước khi làm bất kỳ task nào.

---

## 1. ĐỊNH DANH DỰ ÁN

| Hạng mục | Giá trị |
|---|---|
| Tên thương hiệu (khách hàng) | **Đại Hồng Việt Tử Vi** (ĐHVTV) |
| Tên project nội bộ | **ĐVTT** / StarPing |
| Tên thư mục | `StarPing` |
| PM | Bang (ted.bgn@gmail.com) |
| Master | Thầy Tử Vi (đối tác nội dung) |
| Giai đoạn | Pre-product MVP — Phase 1 |
| Ngôn ngữ UI | **Tiếng Việt** (mọi nội dung user-facing) |
| Ngôn ngữ code | English (biến, hàm, schema) |

**Tóm tắt:** **Đại Hồng Việt Tử Vi** (ĐHVTV) là tên thương hiệu khách hàng. **ĐVTT** là tên project nội bộ. Nền tảng SaaS phân tích chu kỳ vận trình cá nhân (Tử Vi đẩu số), gửi tín hiệu hàng ngày (Nhật Vận) cá nhân hóa cho từng người dùng qua Zalo OA và Email.

---

## 2. CẤU TRÚC FILE TRONG THƯ MỤC

```
StarPing/
├── CLAUDE.md                          ← File này (instructions cho Claude)
├── DaiVietTinhTu_Proposal.md          ← Tài liệu chiến lược gốc (đọc để hiểu vision)
├── Product.md                         ← PRD đầy đủ v1.1 (spec kỹ thuật toàn bộ)
├── Ops.md                             ← IOT Portal spec v0.3 (internal ops tool)
├── PUSH_NOTIFICATION_APP_SPEC.md      ← ⚠️ Spec từ project cũ (Live Payments, KHÔNG phải ĐVTT)
│
├── demo_laso_tuvi.html                ← Demo lá số Tử Vi (frontend-only, KHÔNG deploy)
│                                         ⚠️ Chứa toàn bộ thuật toán — BẢO MẬT
│
├── Chinh tinh.js                      ← Logic an sao: chính tinh
├── Phu Tinh.js                        ← Logic an sao: phụ tinh
├── Phi Tinh.js                        ← Logic an sao: phi tinh (lưu động)
│
├── Ngũ Hành.md                        ← Tài liệu tham khảo: ngũ hành Tử Vi
├── Tinh Dau.md                        ← Tài liệu tham khảo: tinh đẩu
├── Tu Tru.md                          ← Tài liệu tham khảo: tứ trụ
├── An Sao.md                          ← Tài liệu tham khảo: an sao
│
├── DVTT_Lovable_MasterPrompt.md       ← Prompt tổng cho Lovable dev
├── DVTT_Lovable_Prompt_LandingPage.md ← Prompt riêng cho landing page
├── DVTT_ZaloOA_Claude_UntitledUI_Guide.md ← Hướng dẫn Zalo OA + UI
├── Lovable_Dev_Guide.md               ← Hướng dẫn dev trên Lovable
│
├── live-payments-design-system-FINAL.md   ← Design system (từ project cũ, dùng tham khảo)
├── live-payments-design-system-FINAL.zip  ← Assets design system
│
├── LaSo_GIANG.docx                    ← Lá số mẫu (dữ liệu thật — bảo mật)
└── NGÀY MẬU TÝ.docx                  ← Tài liệu nội dung (ngày cụ thể)
```

---

## 3. QUY TẮC NGÔN NGỮ THƯƠNG HIỆU — BẮT BUỘC

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

## 4. DESIGN SYSTEM

### Bảng màu
```css
--color-primary:    #0F1B2D;  /* Deep Navy — background chính */
--color-secondary:  #1E3A5F;  /* Cosmic Blue — surface/card */
--color-accent:     #C9A227;  /* Gold — dùng tiết kiệm, CTA, highlight */
--color-text:       #F4F1EC;  /* Off-White — text chính */
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

## 5. KIẾN TRÚC KỸ THUẬT

### Stack đề xuất (Lovable / Supabase)

| Layer | Công nghệ |
|---|---|
| Frontend | React (Lovable-generated) |
| Backend / API | Supabase Edge Functions |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email + password) |
| Storage | Supabase Storage |
| Email | Resend hoặc SendGrid |
| Zalo | Zalo OA API (ZNS + tin nhắn cá nhân) |
| Payment | MoMo Business API + manual bank transfer |
| Cron | Supabase `pg_cron` hoặc Upstash Cron |
| Hosting | Vercel hoặc Netlify |

### Nguyên tắc kiến trúc BẮT BUỘC
- **Thuật toán Tử Vi chỉ chạy trên Backend** — KHÔNG xử lý tính toán ở Frontend
- `demo_laso_tuvi.html` chứa toàn bộ logic — chỉ dùng nội bộ, không deploy public
- Frontend chỉ: nhận input → gọi API → render output
- RLS (Row-Level Security) bắt buộc trên mọi bảng Supabase

---

## 6. DATABASE SCHEMA (Supabase PostgreSQL)

### Bảng `users`
```sql
id UUID PK | email TEXT UNIQUE | phone_zalo TEXT | full_name TEXT
password_hash TEXT | email_verified BOOLEAN | email_verified_at TIMESTAMPTZ
role TEXT: 'customer' | 'tu_van_vien' | 'van_hanh' | 'admin'
is_active BOOLEAN | created_at | updated_at
```

### Bảng `user_profiles` (Bát Tự)
```sql
id UUID PK | user_id UUID FK → users
birth_day INT | birth_month INT | birth_year INT
birth_hour_chi INT  -- 1=Tý ... 12=Hợi
gender TEXT: 'male' | 'female'
-- Lưu cả dương lịch và âm lịch
```

### Bảng `subscriptions`
```sql
id UUID PK | user_id UUID FK → users
plan_type: 'free' | 'trial' | 'co_ban' | 'chuyen_sau' | 'chien_luoc'
billing_cycle: 'monthly' | 'yearly'
status: 'trial' | 'active' | 'paused' | 'expired' | 'cancelled' | 'suspended'
trial_start DATE | trial_end DATE | paid_start DATE | paid_until DATE
```

### Bảng `payments`
```sql
id UUID PK | user_id FK | subscription_id FK
amount INT (VNĐ) | payment_method: 'momo' | 'bank_transfer'
status: 'pending' | 'completed' | 'failed' | 'refunded' | 'expired'
reference_code TEXT UNIQUE  -- format: DVTT-XXXX-YYYYMMDD
momo_transaction_id TEXT | bank_reference TEXT
confirmed_by UUID FK → users | confirmed_at TIMESTAMPTZ
expires_at TIMESTAMPTZ  -- 24h sau khi tạo
```

### Bảng `nhat_van_content` (CMS Nhật Vận)
```sql
id UUID PK | ngay DATE | cung_chi INT (1-12, NULL = tất cả cung)
signal_type: 'thuan_loi' | 'khang_luc' | 'trung_tinh'
linh_vuc: 'su_nghiep' | 'tai_chinh' | 'tinh_cam' | 'suc_khoe' | 'chung'
title TEXT (≤100 ký tự) | body TEXT (≤500 ký tự)
action_tip TEXT | canh_bao TEXT | created_by UUID FK
```

### Bảng `notification_log`
```sql
id UUID PK | user_id FK | sent_at TIMESTAMPTZ
channel: 'zalo' | 'email'
content_id UUID FK → nhat_van_content
delivery_status: 'sent' | 'delivered' | 'failed' | 'bounced'
error_message TEXT
```

### Bảng `whitelist` (Closed Beta)
```sql
id UUID PK | email TEXT | phone_zalo TEXT | notes TEXT
added_by UUID FK | added_at TIMESTAMPTZ
```

### Bảng `audit_log`
```sql
id UUID PK | actor_id UUID FK → users
action TEXT  -- 'pause_subscription', 'confirm_payment', ...
target_type TEXT | target_id UUID
details JSONB  -- snapshot trước/sau
created_at TIMESTAMPTZ
```

---

## 7. API CONTRACT

### Input (Frontend → Backend)
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

### Output (Backend → Frontend)
```json
{
  "tu_tru": { "can_nam": "Canh", "chi_nam": "Ngọ", "can_thang": "...", "chi_thang": "..." },
  "cung_menh": 3,
  "cung_than": 7,
  "palaces": [{
    "chi": 1,
    "cung_name": "Mệnh",
    "can": "Giáp",
    "stars": [
      { "name": "Tử Vi", "cat": "chinh", "vuong_miet": "Vượng", "hoa": null }
    ],
    "dai_han_label": "25–34",
    "tieu_han_year": 2026,
    "truong_sinh": "Trường Sinh",
    "khong_vong": false,
    "is_menh": true,
    "is_than": false
  }]
}
```

---

## 8. NHẬT VẬN ENGINE

### Cron job: mỗi ngày 06:00 sáng
1. Quét users có subscription `trial` hoặc `active` + `email_verified = true`
2. Tính vị trí sao lưu của ngày cho từng lá số (gọi Backend API)
3. Đối chiếu sao lưu với cung trọng yếu (Mệnh, Thân, Tiểu Hạn, Quan Lộc, Tài Bạch)
4. Match content từ `nhat_van_content` theo logic:
   ```
   Ưu tiên 1: ngày + cung_chi cụ thể + signal_type
   Ưu tiên 2: ngày + cung_chi = NULL + signal_type
   Ưu tiên 3: Generic fallback
   Ưu tiên 4: Không có → alert admin, skip user
   ```
5. Queue → gửi **07:00 sáng** qua Zalo OA + Email
6. Ghi `notification_log`

### Template tin nhắn Nhật Vận
```
🔔 Nhật Vận [DD/MM/YYYY] — [Tên]

[TITLE]

[BODY]

💡 Gợi ý hôm nay: [ACTION_TIP]

⚠️ [CẢNH BÁO — chỉ hiển thị nếu có]

---
Đại Hồng Việt Tử Vi · Nền tảng phân tích chu kỳ vận trình
Nội dung mang tính tham khảo, không thay thế tư vấn chuyên môn.
```

---

## 9. USER JOURNEY

```
Landing Page (nhập Bát Tự)
  → Backend tính lá số → Hiển thị tinh bàn (Dark Mode)
    → CTA đăng ký nhận Nhật Vận
      → Form: Họ tên + Email + SĐT Zalo + Mật khẩu
        → Email verify (link 24h)
          → Popup xác nhận: "Nhận luận đoán đầu tiên 07:00 sáng [ngày mai]"
            → Trial 3 ngày (gửi Nhật Vận hàng sáng)
              → Ngày 4: mời nâng cấp gói subscription
```

---

## 10. SẢN PHẨM & GIÁ

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

## 11. PHÂN QUYỀN HỆ THỐNG

| Role | Quyền |
|---|---|
| `admin` | Full access: quản lý user, subscription, payment, audit log |
| `van_hanh` (Operator) | Vận hành ngày-ngày: nhập CMS, xem KH, pause/resume subscription |
| `tu_van_vien` (Consultant) | Read-only: xem thông tin KH + lá số |
| `customer` | User thông thường |

**IOT (Internal Operation Tool):** Portal nội bộ riêng cho team vận hành.
- Xem/lọc danh sách khách hàng
- Thao tác: Block, Pause/Resume, Extend, Manual Activate subscription
- Quản lý giao dịch + hoàn tiền
- Coupon management
- Báo cáo tài chính (Revenue Report, Reconciliation, Tax Report)
- Audit log (chỉ Admin xem)

**Mã KH:** Format `DVTT00101` trở đi (DVTT00001–DVTT00100 reserved nội bộ)

---

## 12. THANH TOÁN

### MoMo (tự động)
- Tạo payment → MoMo Partner API → payUrl → webhook callback → verify signature → kích hoạt

### Chuyển khoản ngân hàng (manual)
- Tạo `reference_code` format `DVTT-XXXXXX-YYYYMMDD`
- Admin xác nhận thủ công trên IOT → kích hoạt subscription

### Lưu ý quan trọng
- **KHÔNG tích hợp payment gateway tự động** — thanh toán vẫn là manual (chuyển khoản + ZaloPay cá nhân) trong giai đoạn hiện tại
- Deadline thanh toán: 24h sau khi tạo payment record

---

## 13. WHITELIST / CLOSED BETA

Giai đoạn MVP: chỉ user được whitelist mới đăng ký được.
- Kiểm tra `email` HOẶC `phone_zalo` trong bảng `whitelist`
- Flag `WHITELIST_ENABLED` — Admin bật/tắt không cần redeploy
- Khi tắt: mở đăng ký public ngay lập tức

---

## 14. LỘ TRÌNH TRIỂN KHAI

### Phase 1 — Backend & Core Algorithm *(ưu tiên cao nhất)*
- [ ] Migrate thuật toán từ `demo_laso_tuvi.html` → Backend API
- [ ] Xây database schema trên Supabase (theo Section 6)
- [ ] API: nhận Bát Tự → trả JSON 12 cung
- [ ] RLS Supabase cho bảng sensitive

### Phase 2 — Frontend & Auth Flow
- [ ] Landing page + form Bát Tự → hiển thị lá số
- [ ] Luồng đăng ký / email verify / trial activate
- [ ] Dashboard cá nhân
- [ ] Whitelist gate (Closed Beta)
- [ ] Trang chọn gói subscription

### Phase 3 — Payment
- [ ] MoMo API + webhook
- [ ] Luồng chuyển khoản + manual confirm

### Phase 4 — Nhật Vận Engine
- [ ] Cron job 06:00
- [ ] Logic match content
- [ ] Tích hợp Zalo OA API + Email
- [ ] Luồng trial hết hạn → upsell

### Phase 5 — Admin Portal & CMS
- [ ] IOT: quản lý KH, subscription
- [ ] CMS nhập Nhật Vận (calendar view)
- [ ] Xác nhận thanh toán, xuất báo cáo
- [ ] Audit log viewer

---

## 15. KPI 90 NGÀY

| Chỉ số | Mục tiêu |
|---|---|
| Hồ sơ miễn phí đã giao | 100 |
| Share Card được chia sẻ | 30+ |
| Convert free → trả phí | ≥ 15% |
| Retention tháng 2 | ≥ 70% |
| Doanh thu tháng 3 | ≥ 10M VNĐ |

---

## 16. STACK NO-CODE HIỆN TẠI (trước khi build)

| Chức năng | Công cụ |
|---|---|
| Onboarding | Google Forms |
| Database | Google Sheets |
| Delivery | Zalo OA |
| Share Card | Canva |
| Báo cáo PDF | Canva → Google Drive |
| Landing page | Carrd.co |
| Đặt lịch | Calendly |
| Thanh toán | Chuyển khoản + ZaloPay cá nhân |

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

- Password: bcrypt, salt rounds ≥ 12
- Rate limiting: 5 lần sai → khóa 15 phút
- JWT session: 7 ngày, refresh token: 30 ngày
- PDPA compliance: Nghị định 13/2023/NĐ-CP
- Bát Tự mã hóa at-rest trong database
- User có quyền yêu cầu xóa toàn bộ dữ liệu

---

## 20. HƯỚNG DẪN CHO CLAUDE

### Khi làm việc với code
- Đặt tên biến/hàm bằng **English** (snake_case cho DB, camelCase cho JS/TS)
- Comments trong code có thể dùng tiếng Việt nếu giải thích logic nghiệp vụ
- Mọi string user-facing → **tiếng Việt**
- Bảo vệ thuật toán: không để logic tính toán Tử Vi trên Frontend

### Khi viết nội dung
- Luôn dùng ngôn ngữ phân tích, không dùng ngôn ngữ tâm linh (xem Section 3)
- Disclaimer pháp lý phải có trên mọi nội dung user-facing

### Files quan trọng nhất để đọc khi cần context sâu
- `Product.md` — Full PRD kỹ thuật (schema, API, auth flow, payment)
- `Ops.md` — IOT spec (internal portal)
- `docs/algorithm/TUVI_ALGORITHM_SPEC.md` — ⭐ SPEC THUẬT TOÁN ĐẦY ĐỦ (source of truth, đọc file này thay vì demo HTML)
- `docs/demo_laso_tuvi.html` — Code gốc thuật toán (bảo mật, chỉ đọc khi cần verify edge case)
- `Chinh tinh.js`, `Phu Tinh.js`, `Phi Tinh.js` — Logic an sao module hóa

---

*Cập nhật: 06/2026 | PM: Bang (ted.bgn@gmail.com)*
