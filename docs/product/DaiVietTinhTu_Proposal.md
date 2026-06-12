# ĐẠI VIỆT TINH TỬ (ĐVTT)
## Tài Liệu Đề Xuất Kinh Doanh & Kế Hoạch Triển Khai
### Phiên bản 1.0 — Tháng 5/2026

---

> **Tuyên bố định vị:**
> *"Công cụ ra quyết định cá nhân hóa, dựa trên chu kỳ vận trình của bạn."*
> Hệ thống phân tích chu kỳ cá nhân — giúp bạn biết khi nào nên tiến, khi nào nên dừng, và làm gì để vượt qua giai đoạn khó.

---

# MỤC LỤC

1. [Tổng Quan Dự Án](#1-tổng-quan-dự-án)
2. [Phân Tích Thị Trường](#2-phân-tích-thị-trường)
3. [Vấn Đề Thị Trường & Cơ Hội](#3-vấn-đề-thị-trường--cơ-hội)
4. [Định Vị Thương Hiệu](#4-định-vị-thương-hiệu)
5. [Cơ Chế Hóa Giải — Hook Point Cốt Lõi](#5-cơ-chế-hóa-giải--hook-point-cốt-lõi)
6. [Phân Tích Persona Khách Hàng](#6-phân-tích-persona-khách-hàng)
7. [Kiến Trúc Sản Phẩm](#7-kiến-trúc-sản-phẩm)
8. [Chiến Lược Giá](#8-chiến-lược-giá)
9. [Lộ Trình MVP 90 Ngày](#9-lộ-trình-mvp-90-ngày)
10. [Hướng Dẫn Zalo OA](#10-hướng-dẫn-zalo-oa)
11. [Hướng Dẫn Xây Dựng Website Chuyên Nghiệp](#11-hướng-dẫn-xây-dựng-website-chuyên-nghiệp)
12. [Design System & Công Cụ](#12-design-system--công-cụ)
13. [Những Điều CẦN và KHÔNG CẦN Làm](#13-những-điều-cần-và-không-cần-làm)
14. [Bảng Theo Dõi Tiến Độ 90 Ngày](#14-bảng-theo-dõi-tiến-độ-90-ngày)

---

# 1. TỔNG QUAN DỰ ÁN

## Thông Tin Cơ Bản

| Hạng mục | Thông tin |
|---|---|
| **Tên thương hiệu** | Đại Việt Tinh Tử |
| **Tên viết tắt** | ĐVTT / TinhTử (dùng cho digital) |
| **Loại hình** | Nền tảng phân tích chu kỳ vận trình cá nhân |
| **Mô hình doanh thu** | Freemium + Subscription + Report + Marketplace |
| **Đối tượng** | 20–45 tuổi, nam và nữ, mọi ngành nghề |
| **Địa bàn** | Việt Nam (ưu tiên HCMC và Hà Nội giai đoạn đầu) |
| **Giai đoạn hiện tại** | Pre-product, 2 người sáng lập |
| **Kênh phân phối chính** | Zalo OA + Website + TikTok + Facebook |

## Đội Ngũ Sáng Lập

| Vai trò | Trách nhiệm |
|---|---|
| **Product Manager (PM)** | Chiến lược sản phẩm, vận hành, marketing, công nghệ |
| **Thầy Tử Vi (Master)** | Kiến thức cốt lõi, luận giải lá số, tư vấn chuyên sâu, nội dung |

## Vốn Triển Khai Giai Đoạn Đầu

- Chi phí công nghệ MVP: **Dưới 500K VND/tháng** (toàn bộ công cụ miễn phí)
- Chi phí design system: **~2.9M VND** (Untitled UI PRO, một lần duy nhất)
- Chi phí vận hành tháng 1–3: **Gần như bằng 0** — xác nhận mô hình trước khi đầu tư

---

# 2. PHÂN TÍCH THỊ TRƯỜNG

## Quy Mô Thị Trường Toàn Cầu

| Thị trường | Giá trị 2025 | Dự báo 2030 | Tăng trưởng |
|---|---|---|---|
| Ứng dụng chiêm tinh học toàn cầu | $4.73 tỷ USD | $9 tỷ USD | CAGR 20%/năm |
| Dịch vụ tâm linh số toàn cầu | $392 tỷ USD | Tăng 7.5%/năm | — |
| Thị trường chiêm tinh APAC | $2 tỷ USD | $6.3 tỷ USD vào 2034 | — |

**Việt Nam được nhắc tên trực tiếp** là một trong các thị trường dẫn đầu APAC về thương mại số trong lĩnh vực tâm linh/văn hóa truyền thống.

## Thị Trường Việt Nam — Các Đơn Vị Hiện Tại

| Đơn vị | Hình thức | Điểm mạnh | Điểm yếu |
|---|---|---|---|
| **tuvi.vn** | Cổng thông tin web | Traffic lớn, SEO mạnh | Nội dung chung, không cá nhân hóa, đầy quảng cáo |
| **lyso.vn** | Web portal | Công cụ lập lá số miễn phí | Không có tư vấn, nội dung tĩnh |
| **HOROS** | App + cộng đồng | Gen Z, sự kiện offline, thiết kế hiện đại | Mới ra mắt app (4/2026), thiếu lớp tư vấn chuyên sâu |
| **Tử Vi Đại Việt** | Web AI | AI phân tích lá số, báo cáo PDF | Không có con người, thiếu uy tín |
| **Thầy tử vi cá nhân** | Facebook/Zalo | Tin tưởng cao, tư vấn sâu | Không có hệ thống, không mở rộng được |

## Thực Trạng Kênh Truyền Thông Xã Hội

| Nền tảng | Mức độ phổ biến tại VN | Vai trò |
|---|---|---|
| **TikTok** | 85% người dùng influencer | Acquisition — content ngắn, viral |
| **Facebook** | 65% | Retention — groups, long-form, booking |
| **Zalo** | 85% smartphone users (~79M MAU) | CRM, delivery, conversion |
| **YouTube** | 50% | Education — nội dung học chuyên sâu |

---

# 3. VẤN ĐỀ THỊ TRƯỜNG & CƠ HỘI

## 6 Vấn Đề Cốt Lõi Của Thị Trường Hiện Tại

**Vấn đề 1 — Chất lượng không đồng đều**
Bất kỳ ai cũng có thể tự xưng là "thầy tử vi". Không có tiêu chuẩn, không có kiểm định, không có trách nhiệm. Khách hàng không có cách nào đánh giá chất lượng trước khi trả tiền.

**Vấn đề 2 — Nội dung chung chung vs. không có cá nhân hóa**
Các nền tảng lớn sản xuất nội dung 12 con giáp áp dụng cho hàng triệu người — nghĩa là không thực sự hữu ích cho ai. Ở chiều ngược lại, để nhận tư vấn thực sự cá nhân hóa, người dùng phải tự tìm thầy trên mạng xã hội với không có hệ thống, không giá công khai, không đảm bảo chất lượng.

**Vấn đề 3 — Thiếu niềm tin nghiêm trọng**
Nhiều người bị lừa đảo qua video quảng cáo giả và livestream. Thị trường tâm linh đặc biệt dễ bị lạm dụng vì dịch vụ vô hình.

**Vấn đề 4 — Khoảng cách về kiến thức**
Phần lớn người dùng không hiểu hệ thống tử vi. Không ai đang phục vụ phân khúc "muốn hiểu đủ để hành động" — không cần trở thành học giả, nhưng cũng không chỉ muốn nghe "năm nay tốt hay xấu".

**Vấn đề 5 — Không có đầu ra hành động**
Dịch vụ hiện tại chỉ nói "vận hạn của bạn như vậy" mà không nói bạn cần làm gì. Không ai cung cấp **kế hoạch hành động cụ thể**.

**Vấn đề 6 — Các thầy giỏi đang "vô hình" trên không gian số**
Nhiều người có kiến thức sâu về tử vi đang hoạt động offline, không có hiện diện số. Không ai xây dựng hạ tầng để kết nối họ với người dùng hiện đại.

## Cơ Hội

| Khoảng trống | Cơ hội cụ thể |
|---|---|
| Không có tiêu chuẩn chất lượng | Xây dựng marketplace với hệ thống xác minh và đánh giá |
| Nội dung chung, không hành động | Kế hoạch hóa giải cá nhân hóa với hành động cụ thể |
| Thầy giỏi không có kênh số | Onboard thầy lên nền tảng, cung cấp hạ tầng |
| Gen Z muốn ngôn ngữ hiện đại | Content brand nói ngôn ngữ họ mà không mất chiều sâu |
| Quyết định kinh doanh chưa được phục vụ | Tư vấn B2B cho doanh nhân, đầu tư |
| Không có lộ trình học | Chương trình giáo dục có cấu trúc từ cơ bản đến chuyên gia |

---

# 4. ĐỊNH VỊ THƯƠNG HIỆU

## Tên Thương Hiệu

**Đại Việt Tinh Tử** — được chọn vì:

- **"Đại Việt"** — tên lịch sử của Việt Nam qua các triều đại Lý, Trần, Lê. Mang tính dân tộc, học thuật, không mang tính tôn giáo.
- **"Tinh"** (星) — sao, tinh tú. Kết nối trực tiếp với hệ thống sao Tử Vi mà không cần dùng từ "bói toán".
- **"Tử"** — từ Tử Vi (紫微), sao Bắc Đẩu, trung tâm của toàn bộ hệ thống.
- **Ý nghĩa tổng hợp:** "Hệ thống tinh học của Đại Việt" — di sản phân tích học thuật dân tộc.
- **Viết tắt thương hiệu số:** **TinhTử** (dùng cho tên miền, app, handle mạng xã hội)

## Bảng Ngôn Ngữ Thương Hiệu

| Tránh dùng (ngôn ngữ tâm linh) | Thay bằng (ngôn ngữ quyết định) |
|---|---|
| Xem tử vi | Phân tích chu kỳ vận trình |
| Sao xấu chiếu mệnh | Giai đoạn kháng lực cao |
| Hóa giải | Tối ưu hóa quyết định |
| Vận hạn | Cửa sổ chiến lược |
| Lá số tử vi | Hồ sơ vận trình cá nhân |
| Thầy tử vi | Chuyên gia phân tích vận trình |
| Số mệnh / định mệnh | Mô hình chu kỳ cá nhân |
| Tốt / xấu | Thuận lợi / kháng lực |

## Tuyên Bố Pháp Lý (Bắt Buộc Trên Mọi Nội Dung)

> *"Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính."*

---

# 5. CƠ CHẾ HÓA GIẢI — HOOK POINT CỐT LÕI

## Tại Sao Đây Là Điểm Khác Biệt Thực Sự

Mọi đối thủ cạnh tranh đang ở trong **ngành chẩn đoán**. Đại Việt Tinh Tử ở trong **ngành bảo vệ**.

| Đối thủ | Họ cung cấp gì | Dừng ở đâu |
|---|---|---|
| tuvi.vn / lyso.vn | Chẩn đoán (chung) | Sau khi đọc xong |
| HOROS | Insight cá tính | Sau khi tải báo cáo |
| Thầy tử vi cá nhân | Chẩn đoán + giải pháp cơ bản | Sau buổi tư vấn |
| **Đại Việt Tinh Tử** | **Chẩn đoán → Giải pháp → Theo dõi → Điều chỉnh → Gia hạn** | **Không bao giờ — là vòng lặp** |

## 6 Lớp Hóa Giải — Mỗi Lớp Là Một Cơ Hội Doanh Thu

### Lớp 1 — Tránh né & Chọn thời điểm (Timing)
Sao xấu không hoạt động đều — chúng có đỉnh điểm ở các cửa sổ Tiểu Vận, Nguyệt Vận, Nhật Vận cụ thể.

**Sản phẩm:** Lịch quyết định cá nhân hóa hàng tháng.

### Lớp 2 — Ngũ Hành Bổ Trợ (Rebalancing)
Mỗi sao xấu có ký hiệu hành. Hóa giải bằng cách đưa vào hành tương sinh/tương khắc phù hợp.

| Sao xấu | Hành | Hóa giải |
|---|---|---|
| Kình Dương | Kim | Thêm Thủy (Kim sinh Thủy) để dẫn năng lượng đi |
| Đà La | Kim (cản trở) | Thêm Hỏa (Hỏa khắc Kim) — cần cẩn thận |
| Hóa Kỵ | Theo ngữ cảnh | Kích hoạt Hóa Lộc hoặc Hóa Quyền đối trọng |
| Địa Không / Địa Kiếp | Năng lượng trống rỗng | Thêm Thổ; bố thí để hóa giải Kiếp |
| Hỏa Tinh / Linh Tinh | Hỏa (bất ổn) | Thêm Thủy; tránh môi trường xung đột |

**Sản phẩm:** Kit hóa giải cá nhân hóa (màu sắc, đá quý, phong cách sống).

### Lớp 3 — Kích Hoạt Sao Cát (Activation)
Khi có sao xấu, tìm sao tốt có thể trung hòa và hướng năng lượng sang chiều tích cực.
- Kình Dương + Tử Vi / Phụ Bật → chuyển từ phá hoại thành lực mạnh
- Đà La được chế hóa → trở thành sự kiên trì, tỉ mỉ

**Sản phẩm:** Tư vấn định hướng nghề nghiệp và môi trường dựa trên cấu hình sao.

### Lớp 4 — Phong Thủy Tích Hợp (Environment)
Khi sao xấu kích hoạt cung Gia Trạch hoặc Quan Lộc — điều chỉnh môi trường vật lý.

**Sản phẩm:** Tư vấn phong thủy nhà/văn phòng cao cấp.

### Lớp 5 — Hành Vi & Nhận Thức (Behavioral Reframe)
**Đây là lớp quan trọng nhất và khác biệt nhất.**

| Cấu hình xấu | Diễn giải truyền thống | Kế hoạch hành vi hiện đại |
|---|---|---|
| Hóa Kỵ tại Tài Bạch | Tiền bạc sẽ mất | "Giai đoạn tài chính rủi ro cao. Không cho vay tiền, không ký hợp đồng mới, kiểm tra lại các cam kết tài chính trước ngày [X]." |
| Kình Dương hãm địa tại Quan Lộc | Cản trở sự nghiệp, xung đột | "Quý có xung đột công việc cao. Ghi chép mọi thứ. Hoãn đề xuất thăng chức. Tránh đối đầu trực tiếp với cấp trên." |
| Địa Kiếp tại Phúc Đức | Tâm linh trống rỗng | "Giai đoạn hao tổn năng lượng. Giảm cam kết, bảo vệ băng thông tinh thần. Đây là năm củng cố, không phải mở rộng." |
| Tam Sát | Hung họa hướng [X] | "Không cải tạo hoặc dọn về hướng [X] năm nay. Tránh thay đổi địa điểm lớn." |

**Sản phẩm:** Kế hoạch hành động theo quý, tư vấn định kỳ hàng tháng.

### Lớp 6 — Giáo Dục (Education — Tương Lai)
Dạy người dùng hiểu hệ thống để tự hỗ trợ. Đây là lớp pháp lý an toàn nhất vì "giáo dục" được bảo vệ.

**Sản phẩm:** Khóa học từ cơ bản đến chuyên gia (triển khai giai đoạn 2+).

## Vòng Lặp Giữ Chân (Retention Loop)

```
Lập lá số → Phát hiện cấu hình kháng lực
     ↓
Tạo sự khẩn cấp: "Chu kỳ này bắt đầu trong 21 ngày"
     ↓
Kê khai giải pháp cụ thể → Người dùng hành động
     ↓
Check-in: "Giai đoạn diễn ra như thế nào?"
     ↓
Điều chỉnh kế hoạch → Sản phẩm / dịch vụ mới
     ↓
Tiểu Vận mới → Cấu hình mới → Vòng lặp tái khởi động
```

---

# 6. PHÂN TÍCH PERSONA KHÁCH HÀNG

## Phân Khúc Chính: 20–45 Tuổi, Mọi Ngành Nghề

### Persona 1 — "Người Tìm Hướng" (Tuổi 25–38)
- **Bối cảnh:** Ngã rẽ cuộc đời — đổi việc, quyết định mối quan hệ, khởi nghiệp
- **Hành vi:** Tìm kiếm câu trả lời cho câu hỏi cụ thể ("năm nay có nên đổi việc không")
- **Mức chi trả:** 100K–500K/phiên
- **Điểm đau:** Không biết tin ai, nhận được nội dung chung chung không giải đáp được câu hỏi cụ thể
- **Kênh tiếp cận:** TikTok, Facebook

### Persona 2 — "Bà Mẹ Lo Lắng" (Tuổi 38–55, nữ)
- **Bối cảnh:** Quyết định cho con — thi đại học, hôn nhân, chọn năm sinh con
- **Hành vi:** Tìm kiếm qua nhóm Facebook, tin tưởng truyền miệng
- **Mức chi trả:** 500K–2M/phiên (quyết định cho cả gia đình)
- **Điểm đau:** Sợ bị lừa, không biết chọn thầy nào đáng tin
- **Kênh tiếp cận:** Facebook Groups, Zalo

### Persona 3 — "Doanh Nhân Tâm Linh" (Tuổi 30–50)
- **Bối cảnh:** Chủ doanh nghiệp, quyết định kinh doanh lớn
- **Hành vi:** Tham khảo cả thầy tử vi LÀ phong thủy để lọc rủi ro trước quyết định lớn
- **Mức chi trả:** 2M–10M+/phiên
- **Điểm đau:** Không tìm được người hiểu cả bối cảnh kinh doanh LẪN tử vi ở độ sâu chuyên nghiệp
- **Kênh tiếp cận:** Giới thiệu cá nhân, LinkedIn, Facebook

### Persona 4 — "Gen Z Khám Phá" (Tuổi 18–26)
- **Bối cảnh:** Khám phá bản thân, content viral trên TikTok
- **Hành vi:** Follow kênh huyền học, chia sẻ phân tích cá tính như MBTI
- **Mức chi trả:** Thấp (dưới 100K/lần), nhưng số lượng lớn và tốc độ lan truyền cao
- **Điểm đau:** Nội dung hiện tại quá cũ kỹ, phức tạp hoặc mang tính mê tín
- **Kênh tiếp cận:** TikTok, Instagram

### Persona 5 — "Người Học Tử Vi" (Tuổi 28–45)
- **Bối cảnh:** Tò mò trí thức, muốn tự đọc lá số
- **Hành vi:** Xem YouTube series, tham gia nhóm Facebook học tử vi
- **Mức chi trả:** 1M–5M/khóa học
- **Điểm đau:** Tài liệu học rải rác, không có giáo trình, không có cộng đồng
- **Kênh tiếp cận:** YouTube, Facebook Groups

---

# 7. KIẾN TRÚC SẢN PHẨM

## Ba Module Chính

```
┌─────────────────────────────────────────────────────┐
│  MODULE 1: INTELLIGENCE          (Core, thường xuyên)│
│  "Hiểu chu kỳ hiện tại của bạn"                     │
├─────────────────────────────────────────────────────┤
│  MODULE 2: ADVISORY              (Trả phí, theo yêu cầu)│
│  "Tối ưu quyết định với hỗ trợ chuyên gia"          │
├─────────────────────────────────────────────────────┤
│  MODULE 3: EDUCATION             (Freemium + trả phí) │
│  "Học hệ thống, tự hỗ trợ bản thân"                 │
└─────────────────────────────────────────────────────┘
```

## Module 1 — Intelligence Platform

### Luồng Onboarding (Dưới 90 giây)
```
Màn hình 1: Nhập thông tin
  → Ngày/tháng/năm sinh
  → Giờ sinh (có thể gần đúng)
  → Giới tính
  → Mối quan tâm chính (Sự nghiệp / Tài chính / Tình cảm / Gia đình / Kinh doanh)

Màn hình 2: Animation phân tích (5 giây)
  → "Đang phân tích 12 chu kỳ vận trình..."

Màn hình 3: Hồ Sơ Vận Trình MIỄN PHÍ
  → Mệnh element + mô tả 2 dòng (ngôn ngữ bình dân)
  → Giai đoạn chu kỳ hiện tại
  → Lĩnh vực nổi bật nhất NGAY BÂY
  → 1 insight cụ thể cho tháng này
  → Nút [Chia sẻ] + [Xem toàn bộ phân tích → paywall]
```

### Dashboard Chính (Người Dùng Trả Phí)

| Panel | Nội dung | Tần suất cập nhật |
|---|---|---|
| **Trạng thái chu kỳ** | Tiểu Vận hiện tại: thuận lợi / trung tính / kháng lực cao | Hàng tháng |
| **Cửa sổ quyết định** | 3 khoảng thời gian tốt nhất tháng này cho: sự nghiệp, tài chính, quan hệ | Hàng tháng |
| **Cảnh báo lĩnh vực** | Lĩnh vực nào đang chịu áp lực ngay lúc này | Hàng tuần |
| **Tín hiệu ngày** | 1 hành động cụ thể cho hôm nay dựa trên Nhật Vận | Hàng ngày |
| **Cờ sắp tới** | "Giai đoạn kháng lực 12 ngày bắt đầu sau 18 ngày — chuẩn bị ngay" | Liên tục |
| **Kế hoạch tối ưu** | 3 điều chỉnh hành vi cho giai đoạn hiện tại | Theo chu kỳ |

## Module 2 — Advisory (Marketplace)

### Sản Phẩm Báo Cáo (Mua Lẻ)

| Báo cáo | Trigger | Giá |
|---|---|---|
| Chu kỳ năm (Annual Cycle) | Đầu năm / Tiểu Vận mới | 199K–349K |
| Phân tích quyết định | Có quyết định cụ thể cần đưa ra | 149K–249K |
| Tương hợp đối tác | Đối tác kinh doanh / mối quan hệ mới | 299K–499K |
| Phân tích sự nghiệp | Ngã rẽ nghề nghiệp | 399K–699K |
| Phân tích kinh doanh | Khởi nghiệp / dự án mới | 699K–1.5M |

### Phiên Tư Vấn Trực Tiếp

| Loại | Format | Giá | Hoa hồng platform |
|---|---|---|---|
| Tư vấn nhanh | 30 phút chat | 200K–400K | 30% |
| Phiên quyết định | 60 phút voice/video | 500K–1M | 30% |
| Phân tích lá số sâu | 90 phút + tóm tắt văn bản | 1M–2.5M | 30% |
| Tư vấn kinh doanh | 2 giờ có cấu trúc | 2M–5M | 25% |
| Retainer hàng tháng | Quan hệ cố vấn liên tục | 3M–10M/tháng | 20% |

## Module 3 — Education (Giai Đoạn 2+)

| Cấp độ | Tên khóa | Nội dung | Giá |
|---|---|---|---|
| Level 1 | Tự Hiểu | Hiểu lá số của bạn trong 4 tuần | 149K–299K |
| Level 2 | Tự Hỗ Trợ | Phân tích cho gia đình và bạn bè | 499K–999K |
| Level 3 | Chuyên Gia | Chứng chỉ chuyên gia phân tích vận trình → vào marketplace | 2M–5M |

---

# 8. CHIẾN LƯỢC GIÁ

## Bảng Giá Subscription

| Gói | Giá tháng | Giá năm | Giá trị |
|---|---|---|---|
| **Miễn phí** | 0 | 0 | Hồ sơ vận trình + 1 insight/tuần + Share card |
| **Cơ Bản** | 49K | 390K | Full dashboard + tín hiệu tuần + lịch tháng |
| **Chuyên Sâu** | 149K | 990K | Trên + deep-dive lĩnh vực + hệ thống cảnh báo + 1 báo cáo/năm |
| **Chiến Lược** | 349K | 2.9M | Trên + check-in chuyên gia 20 phút/tháng + ưu tiên đặt lịch |

**Nguyên tắc giá:**
- Cơ Bản năm = 390K — dưới 1 tách cà phê/tuần
- Chuyên Sâu năm = 990K — dưới 1 triệu cho cả năm (neo tâm lý quan trọng)
- Chiến Lược năm = 2.9M — rẻ hơn một phiên tư vấn đơn lẻ

## Mô Hình Doanh Thu Ở Quy Mô

*Tại 100,000 người dùng miễn phí (có thể đạt trong 18 tháng với content tốt):*

| Nguồn doanh thu | Tỷ lệ chuyển đổi | Doanh thu/tháng |
|---|---|---|
| Cơ Bản (5%) | 5,000 × 49K | 245M VND |
| Chuyên Sâu (2%) | 2,000 × 149K | 298M VND |
| Chiến Lược (0.5%) | 500 × 349K | 174.5M VND |
| Báo cáo lẻ (3%) | 3,000 × 199K avg | 597M VND |
| Tư vấn (1%, hoa hồng 30%) | 1,000 × 500K × 30% | 150M VND |
| **Tổng** | | **~1.46 Tỷ VND/tháng** |

---

# 9. LỘ TRÌNH MVP 90 NGÀY

## Nguyên Tắc Cốt Lõi

> **Không xây dựng công nghệ cho đến khi mô hình kinh doanh được xác nhận.**
> Mục tiêu 90 ngày: trả lời 3 câu hỏi:
> 1. Người dùng có trả tiền cho định vị "công cụ ra quyết định" không?
> 2. Tính năng nào giữ chân họ: tín hiệu hàng ngày, báo cáo, hay phiên tư vấn?
> 3. Thầy có thể phục vụ bao nhiêu người dùng với chất lượng đảm bảo?

## Phân Công Hai Sáng Lập Viên

| PM (Bang) | Thầy (Master) |
|---|---|
| Nhận form onboarding, quản lý database | Review lá số, xác định cấu hình chính |
| Quản lý Zalo OA, gửi tin nhắn | Viết nội dung giải thích (template + cá nhân hóa) |
| Thiết kế Share Card (Canva) | Thực hiện các phiên tư vấn |
| Xử lý thanh toán, subscription | Review và phê duyệt báo cáo trước khi giao |
| Tạo nội dung TikTok / Facebook | Cung cấp insight nội dung và kiến thức |
| Quản lý database trong Sheets | Sẵn sàng cho các câu hỏi leo thang của người dùng |

## Stack Công Nghệ — Không Cần Code

| Chức năng | Công cụ | Chi phí |
|---|---|---|
| Landing page | Carrd.co hoặc Webflow free | Miễn phí |
| Form onboarding | Google Forms | Miễn phí |
| Database người dùng | Google Sheets | Miễn phí |
| Quản lý tác vụ | Notion | Miễn phí |
| Kênh delivery | Zalo OA | Miễn phí |
| Thiết kế Share Card | Canva | Miễn phí |
| Giao báo cáo | Canva PDF → Google Drive link | Miễn phí |
| Thanh toán | ZaloPay / MoMo / chuyển khoản | Miễn phí |
| Đặt lịch tư vấn | Calendly free tier | Miễn phí |
| Nội dung | TikTok + Facebook Page | Miễn phí |
| **Tổng chi phí** | | **< 500K VND/tháng** |

## Lịch 4 Tuần Chi Tiết

### Tuần 1 — Xây Dựng Nền Tảng

**Ngày 1–2: Tạo luồng onboarding**
- Google Form thu thập: Họ tên, Ngày/tháng/năm sinh, Giờ sinh, Giới tính, Mối quan tâm chính, Số Zalo
- Tiêu đề form: "Khám phá chu kỳ vận trình của bạn — Đại Việt Tinh Tử"

**Ngày 3: Xây dựng pipeline Google Sheets**
- Cột: Timestamp | Tên | Ngày sinh | Giờ sinh | Giới tính | Mối quan tâm | Zalo | Tier | Profile sent? | Next alert date | Đã thanh toán? | Số tiền | Ghi chú

**Ngày 4–5: Tạo 5 mẫu Share Card trên Canva**
- Một card cho mỗi Mệnh: Kim / Mộc / Thủy / Hỏa / Thổ
- Thiết kế hiện đại, sạch, không có hình tượng tâm linh
- Aesthetic: dashboard analytics, không phải bói toán

**Ngày 6–7: Thiết lập Zalo OA**
- Tên: Đại Việt Tinh Tử
- Mô tả: "Phân tích chu kỳ vận trình cá nhân — hỗ trợ ra quyết định"
- Ghim welcome message với link Google Form

### Tuần 2 — Người Dùng Đầu Tiên (30 người)

**Nguồn:** Mạng cá nhân của cả hai sáng lập viên

**Quy trình delivery (25–30 phút/người):**
```
1. Form được gửi → vào Sheets
2. PM đánh dấu để Thầy review
3. Thầy phân tích lá số (15–20 phút)
4. Thầy điền template:
   - Mệnh profile (3 câu)
   - Giai đoạn chu kỳ hiện tại (1 câu)
   - Lĩnh vực nổi bật nhất ngay bây giờ (2 câu)
   - 1 insight cụ thể cho tháng này (2–3 câu)
   - 1 tín hiệu sắp tới trong 30–60 ngày (1–2 câu)
5. PM cá nhân hóa Share Card Canva với tên + mệnh
6. PM gửi qua Zalo kèm tin nhắn cá nhân
7. Follow up sau 3 ngày: "Phần nào bạn thấy phù hợp nhất?"
```

### Tuần 3 — Người Dùng Trả Phí Đầu Tiên

**Tin nhắn chuyển đổi (gửi cho người dùng miễn phí đang tương tác):**

> *"[Tên] ơi, mình thấy bạn quan tâm đến phần [sự nghiệp / tài chính / etc.]. Bên mình có thêm dịch vụ phân tích sâu hơn — bao gồm lịch quyết định tháng tới và cảnh báo chu kỳ 90 ngày. Phí 149K/tháng. Bạn muốn thử không?"*

**Mục tiêu tuần 3:** 10 người dùng trả phí × 149K = 1.49M VND
(Không phải để kiếm tiền — để chứng minh willingness-to-pay)

### Tuần 4 — Phỏng Vấn & Điều Chỉnh

**Phỏng vấn 5 người dùng (cả miễn phí và trả phí):**

| Câu hỏi | Mục đích |
|---|---|
| "Phần nào trong hồ sơ bạn thấy chính xác nhất?" | Tìm wow moment |
| "Bạn đã chia sẻ với ai chưa? Tại sao / không?" | Đánh giá viral |
| "Nếu trả tiền, bạn mong nhận được thêm gì?" | Ưu tiên tính năng |
| "Điều gì khiến bạn ngần ngại không muốn trả tiền?" | Rào cản chuyển đổi |
| "Bạn sẽ giới thiệu cho ai? Mô tả người đó cho mình nghe." | Xác nhận persona |

## Bảng Điểm 90 Ngày

| Chỉ số | Mục tiêu | Ý nghĩa |
|---|---|---|
| Hồ sơ miễn phí đã giao | 100 | Năng lực phân phối |
| Share Card được chia sẻ | 30+ | Tiềm năng viral |
| Tỷ lệ chuyển đổi (miễn phí → trả phí) | ≥ 15% | Product-market fit |
| Retention tháng 2 | ≥ 70% | Độ gắn kết |
| Doanh thu tháng 3 | ≥ 10M VND | Khả thi kinh doanh |
| Công suất chuyên gia sử dụng | ≥ 80% | Tín hiệu cần mở rộng supply |

---

# 10. HƯỚNG DẪN ZALO OA

## Zalo OA Là Gì và Tại Sao Quan Trọng

Zalo OA (Official Account) là tài khoản chính thức của doanh nghiệp trên Zalo — tương đương Facebook Page nhưng mạnh hơn ở thị trường Việt Nam vì Zalo có **~79 triệu MAU** và tỷ lệ mở thông báo cao hơn nhiều so với email hay SMS.

Đối với Đại Việt Tinh Tử, Zalo OA là:
- **Kênh delivery** — nơi gửi insight hàng ngày/tuần đến người dùng
- **CRM chính** — nơi quản lý quan hệ khách hàng
- **Kênh chuyển đổi** — từ miễn phí sang trả phí
- **Bộ nhớ đệm trước khi có app** — phục vụ toàn bộ chức năng không cần xây app ngay

## Bước 1 — Đăng Ký Zalo OA

### Yêu Cầu
- Tài khoản Zalo cá nhân đã xác thực CCCD/CMND
- Ảnh CCCD/CMND (mặt trước và sau)
- Ảnh chân dung (selfie)
- Tên thương hiệu và mô tả

### Quy Trình Đăng Ký
1. Truy cập **oa.zalo.me**
2. Đăng nhập bằng tài khoản Zalo cá nhân
3. Chọn **"Tạo Official Account"**
4. Chọn loại OA (xem bảng bên dưới)
5. Điền thông tin: Tên OA, mô tả, danh mục
6. Upload ảnh đại diện + ảnh bìa
7. Xác minh danh tính bằng CCCD
8. Chờ duyệt: thường 1–3 ngày làm việc

### Chọn Loại OA Phù Hợp

| Loại OA | Phù hợp khi | Chi phí |
|---|---|---|
| **OA Cá Nhân (Personal Brand)** | Thầy có thể là mặt thương hiệu, muốn xây personal brand trước | Miễn phí |
| **OA Doanh Nghiệp (Enterprise)** | Có giấy phép kinh doanh, muốn credibility cao hơn | Miễn phí cơ bản, trả phí cho gói nâng cao |

**Khuyến nghị giai đoạn đầu:** Tạo OA cá nhân dưới tên thương hiệu "Đại Việt Tinh Tử" trước. Nâng cấp lên OA doanh nghiệp khi có doanh thu đủ để đăng ký pháp nhân.

## Bước 2 — Thiết Lập Hồ Sơ OA Chuyên Nghiệp

### Ảnh Đại Diện
- Kích thước: **180×180px**
- Nội dung: Logo ĐVTT trên nền tối hoặc xanh đậm
- Không dùng: ảnh thầy tử vi, ảnh tâm linh, màu vàng/đỏ quá rực

### Ảnh Bìa
- Kích thước: **1170×390px**
- Nội dung gợi ý: "Phân tích chu kỳ vận trình cá nhân" + tagline + CTA nhẹ
- Tone màu: Xanh đậm / tím đậm / navy — gợi cảm giác chuyên nghiệp, không tâm linh

### Mô Tả OA (Dưới 150 ký tự)
> *"Công cụ ra quyết định dựa trên chu kỳ vận trình cá nhân. Phân tích tử vi theo hướng hỗ trợ chiến lược — không phải bói toán."*

### Tin Nhắn Chào Mừng (Auto-reply)
Cài đặt tin nhắn tự động gửi ngay khi có người follow OA:

> *"Chào bạn! Cảm ơn đã theo dõi Đại Việt Tinh Tử 🌟*
> *Để nhận Hồ Sơ Vận Trình miễn phí của bạn, hãy điền vào form này:*
> *[link Google Form]*
> *Chúng tôi sẽ gửi phân tích cá nhân hóa trong vòng 24 giờ.*
> *— Đội ngũ ĐVTT"*

## Bước 3 — Thiết Lập Tính Năng ZNS (Zalo Notification Service)

ZNS là tính năng gửi thông báo theo template đến người dùng đã đồng ý nhận tin. Đây là **kênh delivery cốt lõi** của sản phẩm.

### Khi Nào Dùng ZNS vs. Broadcast
- **ZNS:** Thông báo transactional — giao báo cáo, nhắc phiên tư vấn, cảnh báo chu kỳ cá nhân
- **Broadcast:** Nội dung marketing — bài đăng chung, insight tuần, khuyến mãi

### Tần Suất Gửi Tin (Dựa Trên Nghiên Cứu Zalo)
- **20–27 tuổi:** 3–4 thông báo/tuần
- **28–45 tuổi:** 2–3 thông báo/tuần
- **Không bao giờ gửi quá 1 thông báo/ngày** — sẽ bị unfollow

### Lịch Nội Dung Zalo OA Hàng Tuần

| Ngày | Loại nội dung | Ví dụ |
|---|---|---|
| **Thứ Hai** | Tín hiệu tuần (Weekly Signal) | "Tuần này, lĩnh vực SỰ NGHIỆP được kích hoạt tích cực cho các mệnh [X, Y]. Đây là cửa sổ tốt để..." |
| **Thứ Tư** | Insight giáo dục (Education) | "Bạn có biết: Hóa Kỵ không phải lúc nào cũng xấu? Khi ở đúng cung, nó có thể..." |
| **Thứ Sáu** | Prompt cuối tuần (Decision) | "Cuối tuần này phù hợp để đưa ra quyết định về [tài chính / sự nghiệp]. Mệnh [X] cần lưu ý..." |
| **Khi có sự kiện** | Cảnh báo chu kỳ (Alert) | "⚠️ Giai đoạn kháng lực đang đến gần cho [segment]. Xem kế hoạch chuẩn bị của bạn tại..." |

## Bước 4 — Quy Trình Vận Hành Zalo OA Hàng Ngày

```
Sáng (8:00–9:00):
  → Kiểm tra tin nhắn đến
  → Reply các câu hỏi cơ bản (dùng canned responses)
  → Đánh dấu leads cần chuyển cho Thầy

Chiều (14:00–15:00):
  → Giao hồ sơ/báo cáo cho người dùng mới
  → Gửi ZNS cảnh báo cho người dùng có chu kỳ sắp thay đổi
  → Cập nhật Sheets pipeline

Tối (20:00–21:00):
  → Đăng nội dung scheduled (nếu có)
  → Review metrics: lượt follow mới, lượt mở tin, click link
```

## Bước 5 — Tính Năng OA Nâng Cao (Giai Đoạn 2+)

### Zalo Mini App
Khi đã có ~500 người dùng trả phí, build Zalo Mini App để:
- Người dùng xem dashboard ngay trong Zalo (không cần mở web riêng)
- Thanh toán subscription trực tiếp qua ZaloPay
- Nhận tín hiệu hàng ngày có giao diện đẹp

**Chi phí build:** 20–40M VND thuê 1 developer (4–6 tuần)
**Điều kiện build:** Chỉ khi có ≥500 người dùng trả phí và doanh thu ≥50M VND/tháng

### Zalo Shop
Khi ra mắt sản phẩm vật lý (kit hóa giải, đá quý theo mệnh), dùng Zalo Shop để bán trực tiếp trong OA.

## Những Điều KHÔNG Làm Với Zalo OA

| Không làm | Lý do |
|---|---|
| ❌ Gửi hơn 1 tin/ngày | Người dùng sẽ unfollow ngay |
| ❌ Dùng nội dung hoàn toàn sao chép từ nguồn khác | Vi phạm chính sách Zalo, mất credibility |
| ❌ Hứa hẹn kết quả chắc chắn ("bạn sẽ giàu năm nay") | Vi phạm pháp luật, mất tin cậy |
| ❌ Spam link báo cáo không được yêu cầu | Coi là spam, bị report |
| ❌ Dùng từ ngữ tôn giáo / thần linh | Nhạy cảm pháp lý, sai định vị thương hiệu |
| ❌ Mua follower Zalo OA | Follower ảo không có giá trị, lãng phí tiền |
| ❌ Bắt đầu chạy quảng cáo Zalo ngay từ tháng 1 | Chưa có nội dung chất lượng để chuyển đổi — lãng phí ngân sách |

---

# 11. HƯỚNG DẪN XÂY DỰNG WEBSITE CHUYÊN NGHIỆP

## Mục Tiêu Website

Website của ĐVTT không phải là blog hay trang thông tin. Nó là **máy chuyển đổi (conversion machine)**. Mỗi trang đều phục vụ một mục tiêu cụ thể trong hành trình người dùng.

## Giai Đoạn 1 — Website MVP (Tháng 1–3): Không Cần Code

### Công Cụ Khuyến Nghị: Carrd.co

**Tại sao Carrd:**
- Miễn phí cho landing page 1 trang
- $19/năm cho pro (tên miền riêng, nhiều trang, form)
- Build xong trong 1 ngày
- Đủ chuyên nghiệp cho giai đoạn validate

### Cấu Trúc Trang Landing Page MVP (1 Trang)

```
[SECTION 1 — HERO]
Tiêu đề: "Biết khi nào nên tiến. Khi nào nên dừng."
Phụ đề: "Phân tích chu kỳ vận trình cá nhân — dựa trên hệ thống tử vi cổ học"
CTA button: [Nhận Hồ Sơ Vận Trình Miễn Phí]

[SECTION 2 — VẤN ĐỀ]
3 điểm đau:
  • "Bạn đang đứng trước quyết định lớn nhưng không biết đây có phải thời điểm đúng?"
  • "Bạn đã thử xem tử vi nhưng chỉ nhận được dự đoán chung chung?"
  • "Bạn muốn hiểu chu kỳ của mình để chủ động — không phải lo sợ?"

[SECTION 3 — GIẢI PHÁP]
Mô tả sản phẩm bằng 3 bước:
  1. Nhập thông tin sinh → hệ thống phân tích 12 chu kỳ
  2. Nhận Hồ Sơ Vận Trình cá nhân hóa
  3. Theo dõi tín hiệu hàng tuần + kế hoạch hành động

[SECTION 4 — BẰNG CHỨNG XÃ HỘI]
Testimonials từ người dùng thử nghiệm đầu tiên
(Quote + tên viết tắt + mệnh element)

[SECTION 5 — BẢNG GIÁ]
3 gói: Miễn phí | Cơ Bản 49K | Chuyên Sâu 149K
Nhấn mạnh: [Bắt đầu miễn phí]

[SECTION 6 — FORM ONBOARDING]
Nhúng trực tiếp Google Form
Hoặc nút CTA → Zalo OA

[FOOTER]
Disclaimer pháp lý | Liên hệ | Chính sách bảo mật
```

## Giai Đoạn 2 — Website Đầy Đủ (Tháng 4–9)

### Công Cụ Khuyến Nghị: Webflow

**Tại sao Webflow:**
- Không cần code nhưng có khả năng tùy chỉnh cao
- CMS tốt cho blog/content marketing
- SEO-friendly
- Tích hợp được Memberstack (quản lý membership/subscription)
- Giá: $14–23/tháng

### Cấu Trúc Website Đầy Đủ

```
Trang chủ (/)
  → Hero section với animation nhẹ
  → Social proof (số người dùng, testimonials)
  → Feature highlights (3 module)
  → Bảng giá
  → FAQ
  → CTA cuối trang

Hồ Sơ Vận Trình (/ho-so-van-trinh)
  → Form onboarding đầy đủ
  → Giải thích quy trình (người dùng nhận gì)
  → Samples/preview của báo cáo

Dịch Vụ (/dich-vu)
  → Subscription tiers chi tiết
  → Báo cáo chuyên sâu
  → Tư vấn 1-1 (booking calendar)
  → B2B packages

Blog / Kiến Thức (/kien-thuc)
  → Bài viết giáo dục về chu kỳ vận trình
  → Không dùng từ "tử vi" trong title SEO — dùng "chu kỳ cá nhân", "phân tích vận trình"
  → 2 bài/tuần để xây SEO organic

Về Chúng Tôi (/ve-chung-toi)
  → Câu chuyện thương hiệu (không tôn giáo)
  → Giới thiệu Thầy với credentials học thuật
  → Phương pháp luận (tại sao tin tưởng hệ thống này)

Chính Sách (/chinh-sach)
  → Điều khoản sử dụng
  → Chính sách bảo mật (bắt buộc nếu thu thập thông tin cá nhân)
  → Disclaimer pháp lý
```

## Yêu Cầu Kỹ Thuật Website

### Domain (Tên Miền)

**Gợi ý:**
- `tinhtu.vn` — ngắn, dễ nhớ (kiểm tra xem đã có người dùng chưa)
- `daiviettinh.com` hoặc `.vn`
- `tinh-tu.vn`

**Mua tên miền tại:** PA.vn, Inet.vn, hoặc Namecheap
**Chi phí .vn:** ~300K–500K/năm

### Tích Hợp Thanh Toán

**Giai đoạn 1 (manual):** Chuyển khoản ngân hàng + ZaloPay (link cá nhân)
**Giai đoạn 2 (tự động):** Tích hợp PayOS hoặc VNPay vào website

**Lưu ý:** Chưa cần tài khoản merchant phức tạp ở giai đoạn đầu. Chuyển khoản tay + Sheets ghi nhận là đủ cho 50–100 người đầu tiên.

### Analytics — Cài Ngay Từ Ngày Đầu

```
Bắt buộc:
  ✓ Google Analytics 4 — theo dõi traffic, conversion
  ✓ Google Search Console — theo dõi SEO
  ✓ Facebook Pixel — cho remarketing sau này
  ✓ Zalo Pixel (nếu chạy Zalo Ads) — tương tự Facebook Pixel

Tùy chọn giai đoạn 2:
  ✓ Hotjar (heatmap, session recording) — hiểu hành vi người dùng
  ✓ Mixpanel — phân tích funnel conversion chi tiết
```

## SEO Cơ Bản — Làm Ngay

### Từ Khóa Mục Tiêu (Tránh Từ Nhạy Cảm)

**Dùng:**
- "phân tích vận trình cá nhân"
- "chu kỳ quyết định"
- "hồ sơ vận trình"
- "công cụ ra quyết định tử vi"
- "tử vi hỗ trợ quyết định"

**Tránh làm tiêu đề SEO chính:**
- "xem bói"
- "đoán vận mệnh"
- "thầy bói"

### Blog Content Plan (2 Bài/Tuần)

| Tuần | Chủ đề | Từ khóa SEO |
|---|---|---|
| 1 | Tử vi đẩu số là gì? Hệ thống phân tích chu kỳ 2000 năm tuổi | phân tích chu kỳ tử vi |
| 2 | Mệnh Kim là gì? Điểm mạnh và chu kỳ phù hợp | mệnh kim tử vi |
| 3 | Cách đọc Tiểu Vận — biết năm nay của bạn thuộc giai đoạn nào | tiểu vận tử vi |
| 4 | Hóa Kỵ không phải lúc nào cũng xấu — góc nhìn hiện đại | hóa kỵ trong tử vi |

## Những Điều KHÔNG Làm Với Website

| Không làm | Lý do |
|---|---|
| ❌ Thuê agency build website ngay từ đầu | Tốn 20–50M VND trước khi biết mình cần gì |
| ❌ Mua hosting đắt tiền khi traffic còn thấp | Carrd/Webflow tốt hơn nhiều ở giai đoạn này |
| ❌ Build membership portal phức tạp ngay từ đầu | Dùng Zalo OA + Sheets thay thế trong 3 tháng đầu |
| ❌ Chạy Google Ads trước khi có ít nhất 20 testimonials | CPA sẽ rất cao, không hiệu quả |
| ❌ Copy-paste nội dung từ tuvi.vn hoặc trang khác | Google penalty + mất credibility |
| ❌ Không có trang Chính Sách Bảo Mật | Vi phạm luật bảo vệ dữ liệu, mất trust |
| ❌ Thiết kế website màu đỏ/vàng theo kiểu phong thủy truyền thống | Phá vỡ hoàn toàn định vị "công cụ quyết định" |
| ❌ Pop-up mỗi 5 giây kêu gọi đăng ký | Trải nghiệm người dùng tệ, tăng bounce rate |

---

# 12. DESIGN SYSTEM & CÔNG CỤ

## Phân Tách Rõ Hai Loại Tài Nguyên

| Loại | Dùng để làm gì | Nguồn |
|---|---|---|
| **Design System** | Thiết kế UI/UX cho website và app — components, tokens, Figma files | **Untitled UI** (Gumroad) |
| **Visual Assets** | Hình ảnh, illustration, icon cho marketing/content | **Aggregator trong screenshot** (FreePik, Vecteezy) |

## Design System Khuyến Nghị: Untitled UI

| Thông tin | Chi tiết |
|---|---|
| **Tên** | Untitled UI |
| **Giá** | $129 USD (~3.2M VND) — một lần duy nhất, cập nhật vĩnh viễn |
| **Mua tại** | untitledui.gumroad.com/l/untitled-ui |
| **Thử miễn phí** | Figma Community → search "Untitled UI" → duplicate |

**Tại sao Untitled UI phù hợp với ĐVTT:**
- 10,000+ components, dark mode hoàn chỉnh (phù hợp dashboard analytics)
- 420+ trang ready-to-use (không phải bắt đầu từ zero)
- Auto Layout 5.0 + Variables (future-proof)
- Đi kèm React + Tailwind CSS components (developer handoff sẵn sàng)
- Được trust bởi 320,000 designers toàn cầu
- Cập nhật liên tục theo từng Figma Config

## Lịch Trình Sử Dụng

```
Tuần 1–3:   Dùng Canva (miễn phí) cho Share Cards và nội dung marketing
Tháng 2:    Tải bản miễn phí Untitled UI từ Figma Community
            → Thử nghiệm với concept dashboard
Tháng 3:    Mua Untitled UI PRO ($129) khi sẵn sàng build website thực
Tháng 4+:   Dùng Untitled UI làm nguồn thiết kế duy nhất cho website + app
```

## Từ Design System Sang Tên Miền Thương Hiệu

### Bảng Màu Đề Xuất

```
Primary:    Deep Navy #0F1B2D — chủ đạo, nền tối
Secondary:  Cosmic Blue #1E3A5F — gradient nhẹ
Accent:     Gold #C9A227 — dùng tiết kiệm cho call-to-action
Text:       Off-White #F4F1EC — dễ đọc trên nền tối
Alert:      Warm Red #C0392B — chỉ dùng cho cảnh báo chu kỳ
Success:    Jade #2ECC71 — giai đoạn thuận lợi
```

### Typography

```
Heading:    Inter hoặc Be Vietnam Pro (hỗ trợ tiếng Việt tốt)
Body:       Inter
Mono:       JetBrains Mono (cho số liệu, ngày tháng trong dashboard)
```

---

# 13. NHỮNG ĐIỀU CẦN VÀ KHÔNG CẦN LÀM

## ✅ NHỮNG ĐIỀU CẦN LÀM

### Về Định Vị
- ✅ Luôn dùng ngôn ngữ phân tích, quyết định — không bao giờ dùng ngôn ngữ tâm linh trong sản phẩm chính
- ✅ Đặt disclaimer pháp lý trên MỌI nội dung
- ✅ Định vị thầy là "chuyên gia phân tích", không phải "thầy bói"
- ✅ Giải thích phương pháp luận — tại sao hệ thống này đáng tin cậy

### Về Sản Phẩm
- ✅ Bắt đầu thủ công hoàn toàn trong 90 ngày đầu
- ✅ Phỏng vấn ít nhất 10 người dùng trước khi build bất kỳ tính năng mới nào
- ✅ Đo retention trước khi đo acquisition
- ✅ Xây dựng template cho Thầy để tăng tốc độ mà không mất chất lượng
- ✅ Tạo Share Card viral ngay từ ngày đầu

### Về Kinh Doanh
- ✅ Xác nhận willingness-to-pay trước khi đầu tư vào công nghệ
- ✅ Bắt đầu với mạng cá nhân, không phải quảng cáo
- ✅ Đặt mức giá thực — không cho miễn phí vô thời hạn
- ✅ Onboard thêm advisor thứ hai ngay khi đạt 30 người dùng trả phí
- ✅ Theo dõi doanh thu, retention, và NPS mỗi tuần

### Về Pháp Lý
- ✅ Đăng ký hộ kinh doanh cá thể khi doanh thu đạt ~20M VND/tháng
- ✅ Có hợp đồng rõ ràng với các thầy trong marketplace (chia hoa hồng, quyền sở hữu thương hiệu)
- ✅ Bảo vệ tên thương hiệu "Đại Việt Tinh Tử" — đăng ký nhãn hiệu sớm

## ❌ NHỮNG ĐIỀU KHÔNG CẦN LÀM (Giai Đoạn Đầu)

### Về Công Nghệ
- ❌ Không cần build app ngay — Zalo OA làm được tất cả trong 6 tháng đầu
- ❌ Không cần thuê developer ngay — Carrd + Webflow + Google Sheets là đủ
- ❌ Không cần AI phức tạp ngay — Thầy phân tích thủ công tốt hơn AI rất nhiều ở giai đoạn này
- ❌ Không cần hệ thống payment gateway ngay — chuyển khoản + ZaloPay cá nhân là đủ

### Về Marketing
- ❌ Không cần chạy quảng cáo paid trong 3 tháng đầu — focus vào organic
- ❌ Không cần influencer bự — micro-influencer 5K–50K followers hiệu quả hơn và rẻ hơn nhiều
- ❌ Không cần có mặt trên mọi kênh — TikTok + Zalo là đủ cho năm đầu
- ❌ Không cần brand video production đắt tiền

### Về Sản Phẩm
- ❌ Không cần xây module giáo dục ngay — đây là giai đoạn 2+
- ❌ Không cần cúng sao hay dịch vụ nghi lễ trong sản phẩm chính (nhạy cảm pháp lý)
- ❌ Không cần báo cáo cho 12 con giáp hàng ngày — đây là nội dung đại trà, không phải hướng đi
- ❌ Không cần nhiều SKU sản phẩm ngay — 2–3 tier là đủ

### Về Vận Hành
- ❌ Không cần văn phòng
- ❌ Không cần nhân viên full-time trước khi có 100M VND ARR
- ❌ Không cần đối tác đầu tư ngay — bootstrap hoàn toàn có thể trong 12 tháng đầu

---

# 14. BẢNG THEO DÕI TIẾN ĐỘ 90 NGÀY

## Tuần 1

| Hạng mục | Việc cần làm | Người chịu trách nhiệm | Trạng thái |
|---|---|---|---|
| Zalo OA | Tạo và thiết lập OA đầy đủ | PM | ⬜ |
| Form onboarding | Build Google Form | PM | ⬜ |
| Database | Tạo Google Sheets pipeline | PM | ⬜ |
| Share Card | Tạo 5 mẫu Canva theo 5 mệnh | PM | ⬜ |
| Welcome message | Cài auto-reply Zalo OA | PM | ⬜ |
| Template | Thầy xây dựng template giải thích cơ bản | Thầy | ⬜ |

## Tuần 2

| Hạng mục | Việc cần làm | Người chịu trách nhiệm | Trạng thái |
|---|---|---|---|
| Người dùng | Giao 30 hồ sơ miễn phí | PM + Thầy | ⬜ |
| Follow-up | Nhắn tin follow-up sau 3 ngày | PM | ⬜ |
| Content | Đăng 2 post đầu tiên lên Zalo OA | PM | ⬜ |
| Landing page | Build Carrd landing page | PM | ⬜ |

## Tuần 3

| Hạng mục | Việc cần làm | Người chịu trách nhiệm | Trạng thái |
|---|---|---|---|
| Conversion | Gửi offer upgrade cho 30 người dùng miễn phí | PM | ⬜ |
| Payment | Thiết lập quy trình nhận tiền | PM | ⬜ |
| Mục tiêu | 10 người dùng trả phí đầu tiên | PM + Thầy | ⬜ |
| Content | TikTok video đầu tiên | PM | ⬜ |

## Tuần 4

| Hạng mục | Việc cần làm | Người chịu trách nhiệm | Trạng thái |
|---|---|---|---|
| Phỏng vấn | Phỏng vấn 5 người dùng | PM | ⬜ |
| Review | Đánh giá conversion rate, retention | PM | ⬜ |
| Quyết định | Xác nhận hoặc điều chỉnh mô hình | PM + Thầy | ⬜ |
| Kế hoạch | Lên kế hoạch tháng 2 dựa trên learnings | PM | ⬜ |

---

## Chỉ Số Quan Trọng Cần Theo Dõi Mỗi Tuần

```
📊 ACQUISITION
  • Số người mới follow Zalo OA
  • Số form onboarding được submit

📊 ACTIVATION
  • Số hồ sơ được giao (trong 24h)
  • Tỷ lệ mở tin nhắn Zalo

📊 RETENTION
  • % người dùng mở tin nhắn tuần thứ 2
  • % người dùng tương tác trong tháng 2

📊 REVENUE
  • Số người dùng trả phí
  • Doanh thu tháng
  • Giá trị trung bình/người dùng (ARPU)

📊 REFERRAL
  • Số Share Card được chia sẻ
  • Số người dùng mới đến từ giới thiệu
```

---

*Tài liệu này được chuẩn bị cho đội ngũ sáng lập Đại Việt Tinh Tử. Phiên bản 1.0 — Tháng 5/2026.*
*Cập nhật định kỳ sau mỗi sprint 30 ngày dựa trên learnings từ thị trường.*

---

**Đại Việt Tinh Tử — TinhTử**
*Biết khi nào nên tiến. Khi nào nên dừng.*
