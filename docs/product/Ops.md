# Internal Operation Tool (IOT)
## Đại Hồng Việt Tử Vi — Đặc Tả Tính Năng Portal Nội Bộ

**Phiên bản:** 0.3 (Draft để review — Q&A decisions, Notification System, Coupon, Business Advisory)
**Ngày tạo:** 11/06/2026
**Tác giả:** Bang (PM)
**Trạng thái:** Chờ review & phê duyệt

---

## 1. Tổng Quan

IOT (Internal Operation Tool) là portal web nội bộ dành cho team vận hành ĐVTT. Công cụ này cho phép các thành viên nội bộ quản lý danh sách khách hàng, theo dõi trạng thái đăng ký, và thực hiện các thao tác vận hành thủ công mà không cần can thiệp trực tiếp vào database.

**Đối tượng sử dụng:** Team nội bộ (không phải khách hàng)
**Quyền truy cập:** Tài khoản được cấp bởi Admin nội bộ — không có đăng ký tự do
**Ngôn ngữ giao diện:** Tiếng Việt

---

## 2. Phân Quyền (Role-Based Access Control)

IOT có 4 cấp phân quyền. Tài khoản được Admin tạo thủ công và gán role tương ứng.

### 2.1 Bảng Phân Quyền Tổng Quan

| Tính năng | Admin | Accounting | Operator | Consultant |
|---|:---:|:---:|:---:|:---:|
| Xem danh sách khách hàng | ✅ | ✅ | ✅ | ✅ (giới hạn) |
| Xem thông tin chi tiết khách hàng | ✅ | ✅ | ✅ | ✅ (giới hạn) |
| Xuất Excel / CSV (khách hàng) | ✅ | ❌ | ✅ | ❌ |
| Block / Unblock khách hàng | ✅ | ❌ | ✅ | ❌ |
| Pause / Resume gói đăng ký | ✅ | ❌ | ✅ | ❌ |
| Gia hạn ngày hết hạn | ✅ | ✅ | ✅ | ❌ |
| Kích hoạt gói thủ công | ✅ | ✅ | ✅ | ❌ |
| Xem danh sách giao dịch | ✅ | ✅ | ✅ | ❌ |
| Tạo giao dịch thủ công | ✅ | ✅ | ✅ | ❌ |
| Cập nhật trạng thái giao dịch | ✅ | ✅ | ❌ | ❌ |
| Hoàn tiền (Refund) | ✅ | ✅ | ❌ | ❌ |
| Xuất báo cáo tài chính / đối soát | ✅ | ✅ | ❌ | ❌ |
| Xuất báo cáo thuế | ✅ | ✅ | ❌ | ❌ |
| Quản lý tài khoản nội bộ | ✅ | ❌ | ❌ | ❌ |
| Xem audit log | ✅ | ❌ | ❌ | ❌ |

### 2.2 Mô Tả Từng Role

**Admin**
- Toàn quyền trên toàn bộ hệ thống
- Là người duy nhất có thể tạo, sửa, xóa tài khoản nội bộ
- Có thể xem audit log của mọi thao tác
- Thường là: Co-founder / Tech Lead

**Accounting**
- Tập trung hoàn toàn vào mảng tài chính: giao dịch, đối soát, báo cáo thuế
- Có thể xem danh sách khách hàng và chi tiết để đối chiếu giao dịch, nhưng **không xuất được danh sách khách hàng**
- Có thể kích hoạt gói và gia hạn (phục vụ xác nhận thanh toán thủ công)
- Toàn quyền trên module Transaction Management và Accounting Reports
- Không thể block hoặc pause subscription
- Thường là: Kế toán / Finance

**Operator**
- Xử lý vận hành hàng ngày
- Có thể thực hiện hầu hết thao tác trên khách hàng (block, pause, gia hạn, kích hoạt)
- Không thể quản lý tài khoản nội bộ
- Thường là: Customer Support / Ops staff

**Consultant**
- Chỉ xem thông tin để hỗ trợ tư vấn và phân tích lá số khách hàng
- Xem đầy đủ thông tin khách hàng bao gồm email, bát tự, trạng thái gói (không ẩn trường nào — có thể điều chỉnh theo nhu cầu sau)
- Không thể thực hiện bất kỳ thao tác nào thay đổi dữ liệu, không thể xuất dữ liệu
- Thường là: Chuyên gia phân tích vận trình (Thầy Tử Vi và cộng sự)

---

## 3. Màn Hình & Tính Năng Chi Tiết

### 3.1 Đăng Nhập (Login)

- Form đăng nhập đơn giản: Email + Password
- **Bắt buộc dùng email domain công ty** (VD: `@daiviettinh.tu` hoặc domain nội bộ được cấu hình) — email cá nhân (Gmail, Yahoo...) không được chấp nhận
- Không có chức năng "Đăng ký tài khoản" — chỉ Admin mới tạo được tài khoản mới
- Có chức năng "Quên mật khẩu" → gửi link reset qua email nội bộ
- Session timeout sau 8 giờ không hoạt động
- Giới hạn tối đa **2 tài khoản Admin** cùng tồn tại (hard limit)

**Trường thông tin tài khoản nội bộ:**
- Họ tên
- Email nội bộ
- Role (Admin / Accounting / Operator / Consultant)
- Trạng thái tài khoản (Active / Suspended)
- Ngày tạo / Người tạo

---

### 3.2 Danh Sách Khách Hàng (Customer List)

**Màn hình chính — bảng danh sách với các cột sau:**

| Cột | Mô tả | Hiển thị với role |
|---|---|---|
| ID | Mã định danh nội bộ (hệ thống tự tăng) | Tất cả |
| Mã KH | Mã khách hàng theo định dạng `DVTT00101` trở đi (DVTT00001–DVTT00100 reserved cho nội bộ/gia đình) | Tất cả |
| Email | Địa chỉ email đăng ký (hiển thị đầy đủ với mọi role) | Tất cả |
| Họ tên | Tên khách hàng (nếu có) | Tất cả |
| Bát Tự | Ngày giờ sinh — lưu đồng thời **dương lịch** và **âm lịch** | Tất cả |
| Verified Email | Trạng thái xác minh email: ✅ Đã xác minh / ⏳ Chưa xác minh | Tất cả |
| Gói hiện tại | Free Trial / Cơ Bản / Chuyên Sâu / Chiến Lược | Tất cả |
| Trạng thái gói | Active / Paused / Expired / Blocked | Tất cả |
| Ngày bắt đầu | Ngày kích hoạt gói hiện tại | Admin, Accounting, Operator |
| Ngày hết hạn | Ngày hết hạn gói | Tất cả |
| Thao tác | Nút hành động nhanh | Theo phân quyền |

**Tính năng trên màn hình danh sách:**

- **Tìm kiếm:** Theo email, tên, ID
- **Lọc (Filter):**
  - Theo gói: Free Trial / Cơ Bản / Chuyên Sâu / Chiến Lược
  - Theo trạng thái gói: Active / Paused / Expired / Blocked
  - Theo verified email: Đã xác minh / Chưa xác minh
  - Theo ngày hết hạn: Hết hạn trong 7 ngày / 30 ngày / Đã hết hạn
- **Sắp xếp:** Theo ngày đăng ký, ngày hết hạn, tên
- **Phân trang:** 20 / 50 / 100 bản ghi mỗi trang

---

### 3.3 Trang Chi Tiết Khách Hàng (Customer Detail)

Nhấn vào một khách hàng để xem trang chi tiết, gồm:

**Thông tin cơ bản:**
- Email, Họ tên
- Số điện thoại (nếu có)
- Bát Tự đầy đủ (ngày, tháng, năm, giờ sinh — dương lịch và âm lịch)
- Ngày đăng ký tài khoản
- Trạng thái xác minh email

**Thông tin gói đăng ký:**
- Gói hiện tại
- Trạng thái: Active / Paused / Expired / Blocked
- Ngày bắt đầu gói
- Ngày hết hạn
- Lịch sử các gói đã dùng (log đơn giản)

**Lịch sử thao tác nội bộ (Activity Log):**
- Danh sách các thao tác đã thực hiện trên tài khoản này
- Gồm: loại thao tác, thời gian, người thực hiện, ghi chú

---

### 3.4 Các Thao Tác Trên Khách Hàng (Customer Actions)

Tất cả thao tác dưới đây đều yêu cầu xác nhận (confirmation dialog) trước khi thực thi và tự động ghi vào audit log.

---

#### 3.4.1 Block / Unblock Khách Hàng

**Mục đích:** Ngăn khách hàng truy cập dịch vụ (vi phạm điều khoản, không thanh toán, v.v.)

**Yêu cầu khi Block:**
- Bắt buộc nhập lý do (text field, tối đa 500 ký tự)
- Confirmation dialog: "Bạn có chắc muốn block [email]? Khách hàng sẽ không thể đăng nhập."

**Hiệu ứng:**
- Tài khoản khách hàng chuyển sang trạng thái `Blocked`
- Khách hàng không thể đăng nhập vào dịch vụ
- Gói đăng ký bị tạm ngưng (không tính thời gian trong thời gian bị block)

**Unblock:**
- Có thể unblock bất kỳ lúc nào
- Tài khoản quay lại trạng thái trước khi bị block

**Phân quyền:** Admin, Operator

---

#### 3.4.2 Pause / Resume Gói Đăng Ký

**Mục đích:** Tạm dừng gói đăng ký của khách hàng (theo yêu cầu của khách, hoặc chờ thanh toán)

**Pause:**
- Bắt buộc nhập lý do
- Thời gian pause không được tính vào thời hạn gói → ngày hết hạn tự động cộng thêm khi resume

**Resume:**
- Gói tiếp tục từ trạng thái đã dừng
- Ngày hết hạn được cập nhật = ngày hết hạn gốc + số ngày đã pause

**Phân quyền:** Admin, Operator

---

#### 3.4.3 Gia Hạn Ngày Hết Hạn (Extend Expiry)

**Mục đích:** Kéo dài thời hạn gói cho khách hàng (tặng thêm ngày, xử lý khiếu nại, promotion)

**Giao diện:**
- Chọn số ngày gia hạn thêm: input số ngày (VD: 7, 14, 30) hoặc chọn ngày hết hạn mới cụ thể
- Bắt buộc nhập lý do (VD: "Tặng 7 ngày do sự cố kỹ thuật", "Promotion tháng 6")
- Xem trước: "Ngày hết hạn mới: DD/MM/YYYY"

**Phân quyền:** Admin, Accounting, Operator

---

#### 3.4.4 Kích Hoạt Gói Thủ Công (Manual Activate)

**Mục đích:** Kích hoạt hoặc nâng cấp gói cho khách hàng sau khi xác nhận thanh toán thủ công (chuyển khoản / ZaloPay)

**Giao diện:**
- Chọn gói cần kích hoạt: Cơ Bản / Chuyên Sâu / Chiến Lược
- Chọn chu kỳ: 1 tháng / 12 tháng
- Ngày bắt đầu: mặc định hôm nay (có thể chỉnh)
- Ngày hết hạn: tự tính dựa trên gói + chu kỳ (có thể override)
- Bắt buộc nhập mã giao dịch / ghi chú thanh toán
- Confirmation dialog tóm tắt trước khi xác nhận

**Hiệu ứng:**
- Gói của khách hàng được cập nhật lên gói mới
- Trạng thái chuyển thành `Active`
- Lịch sử ghi nhận: loại gói, ngày kích hoạt, người thực hiện, mã giao dịch

**Phân quyền:** Admin, Accounting, Operator

---

### 3.5 Xuất Dữ Liệu (Export)

**Định dạng hỗ trợ:** Excel (.xlsx) và CSV (.csv)

**Phạm vi xuất:**
- Xuất toàn bộ danh sách
- Xuất theo bộ lọc hiện tại (filter đang áp dụng)
- Xuất các bản ghi đã chọn (checkbox)

**Các trường được xuất:**
- ID, Email, Họ tên, Bát Tự, Verified Email, Gói hiện tại, Trạng thái gói, Ngày đăng ký, Ngày bắt đầu gói, Ngày hết hạn

**Lưu ý bảo mật:**
- File xuất chứa dữ liệu nhạy cảm → chỉ dùng nội bộ
- Consultant không có quyền xuất

**Phân quyền:** Admin, Accounting, Operator

---

### 3.6 Quản Lý Tài Khoản Nội Bộ (User Management)

*Chỉ dành cho Admin*

**Danh sách tài khoản nội bộ:**
- Xem tất cả tài khoản đang hoạt động
- Lọc theo role, trạng thái

**Tạo tài khoản mới:**
- Nhập: Họ tên, Email, Role
- Hệ thống gửi email mời + link đặt mật khẩu lần đầu
- Không Admin nào được đặt mật khẩu thay người dùng mới

**Sửa tài khoản:**
- Thay đổi role
- Đổi trạng thái: Active / Suspended

**Xóa tài khoản:**
- Soft delete (ẩn khỏi danh sách, giữ audit log)
- Tài khoản bị xóa không thể đăng nhập

---

### 3.7 Audit Log

*Chỉ Admin xem được*

Ghi lại toàn bộ thao tác quan trọng trong hệ thống:

| Trường | Mô tả |
|---|---|
| Thời gian | Timestamp chính xác |
| Người thực hiện | Email tài khoản nội bộ |
| Loại thao tác | Block / Unblock / Pause / Resume / Extend / Activate / Login / Export |
| Đối tượng | ID / Email khách hàng liên quan |
| Ghi chú | Lý do / mã giao dịch |
| IP Address | IP của người thực hiện |

**Tính năng:**
- Lọc theo loại thao tác, người thực hiện, khoảng thời gian
- Xuất audit log ra CSV

---

### 3.8 Quản Lý Giao Dịch (Transaction Management)

#### 3.8.1 Tổng Quan

Mỗi lần thanh toán — dù thủ công (chuyển khoản, ZaloPay) hay tự động (tương lai) — đều được ghi lại thành một giao dịch độc lập. Transaction Management là nơi team theo dõi toàn bộ luồng tiền, đối soát với ngân hàng/ZaloPay, và chuẩn bị dữ liệu cho báo cáo thuế.

#### 3.8.2 Danh Sách Giao Dịch (Transaction List)

**Các cột hiển thị:**

| Cột | Mô tả |
|---|---|
| Mã GD | Mã giao dịch nội bộ (tự sinh, VD: `TXN-20260611-0001`) |
| Mã tham chiếu | Mã từ ngân hàng / ZaloPay (nhập thủ công hoặc tự nhận) |
| Khách hàng | Tên + Email (link sang Customer Detail) |
| Loại giao dịch | Subscription mới / Gia hạn / Nâng cấp gói / Hoàn tiền |
| Gói | Cơ Bản / Chuyên Sâu / Chiến Lược |
| Chu kỳ | 1 tháng / 12 tháng |
| Số tiền | Số tiền thực thu (VND) |
| Phương thức | Chuyển khoản ngân hàng / ZaloPay / Khác |
| Trạng thái | Thành công / Thất bại / Chờ xác nhận / Đã hoàn tiền |
| Ngày giao dịch | Ngày giờ giao dịch thực tế |
| Người xác nhận | Tài khoản nội bộ xác nhận (với giao dịch thủ công) |

**Tính năng lọc & tìm kiếm:**
- Tìm theo mã GD, mã tham chiếu, email khách hàng
- Lọc theo trạng thái: Thành công / Thất bại / Chờ xác nhận / Đã hoàn tiền
- Lọc theo phương thức thanh toán
- Lọc theo loại giao dịch
- Lọc theo khoảng thời gian (date range picker)
- Lọc theo gói

**Tóm tắt nhanh (Summary Bar) — hiển thị trên đầu trang:**
- Tổng doanh thu kỳ đang lọc
- Số giao dịch thành công / thất bại / chờ xác nhận
- Số tiền hoàn trả trong kỳ

---

#### 3.8.3 Chi Tiết Giao Dịch (Transaction Detail)

Nhấn vào một giao dịch để xem trang chi tiết:

- Mã GD nội bộ + Mã tham chiếu ngân hàng/ZaloPay
- Thông tin khách hàng (link sang Customer Detail)
- Loại giao dịch, Gói, Chu kỳ
- Số tiền gốc (giá niêm yết của gói)
- Mã coupon áp dụng (nếu có) + % / số tiền giảm
- Số tiền thực thu = Số tiền gốc − Giảm giá
- Phương thức thanh toán + thông tin tài khoản nhận (tên ngân hàng, số TK nhận — ẩn đầu số)
- Trạng thái + lịch sử thay đổi trạng thái
- Ghi chú nội bộ (text field, Accounting có thể điền)
- Người tạo / xác nhận + timestamp

---

#### 3.8.4 Tạo Giao Dịch Thủ Công

**Mục đích:** Ghi nhận một thanh toán thủ công sau khi xác nhận tiền đã nhận qua chuyển khoản hoặc ZaloPay.

**Luồng thao tác:**
1. Chọn khách hàng (tìm theo email / Mã KH)
2. Chọn loại giao dịch: Subscription mới / Gia hạn / Nâng cấp gói
3. Chọn gói + chu kỳ → hệ thống tự điền số tiền gốc theo bảng giá
4. Nhập mã coupon (tuỳ chọn) → hệ thống tính lại số tiền thực thu
5. Nhập phương thức thanh toán
6. Nhập mã tham chiếu ngân hàng / ZaloPay
7. Nhập ngày giờ giao dịch thực tế (mặc định là hiện tại)
8. Nhập ghi chú (tuỳ chọn)
9. Confirmation dialog tóm tắt → Xác nhận

**Khi xác nhận:**
- Giao dịch được tạo với trạng thái `Thành công`
- Gói đăng ký của khách hàng được kích hoạt / gia hạn tự động (tương đương Manual Activate ở 3.4.4)
- Hai bước này liên kết với nhau — không cần làm thủ công 2 lần

**Phân quyền:** Admin, Accounting, Operator

---

#### 3.8.5 Cập Nhật Trạng Thái Giao Dịch

**Mục đích:** Xử lý các trường hợp đặc biệt — giao dịch bị nhầm, không nhận được tiền, cần đánh dấu thất bại.

**Các thay đổi trạng thái được phép:**

| Từ trạng thái | Sang trạng thái | Điều kiện |
|---|---|---|
| Chờ xác nhận | Thành công | Xác nhận đã nhận tiền |
| Chờ xác nhận | Thất bại | Không nhận được tiền |
| Thành công | Đã hoàn tiền | Chỉ khi đã thực hiện Refund |

- Bắt buộc nhập lý do khi thay đổi trạng thái
- Mọi thay đổi đều được ghi audit log

**Phân quyền:** Admin, Accounting

---

#### 3.8.6 Hoàn Tiền (Refund)

**Mục đích:** Ghi nhận hoàn tiền cho khách hàng. Do thanh toán hiện tại là manual, hoàn tiền cũng là manual — IOT chỉ ghi nhận, không tự chuyển tiền.

**Luồng:**
1. Mở giao dịch cần hoàn
2. Nhấn "Tạo Hoàn Tiền"
3. Nhập số tiền hoàn (mặc định = toàn bộ, có thể hoàn một phần)
4. Nhập lý do hoàn tiền
5. Nhập mã giao dịch chuyển khoản hoàn tiền (sau khi đã chuyển thực tế)
6. Xác nhận

**Hiệu ứng:**
- Giao dịch gốc chuyển sang `Đã hoàn tiền`
- Một bản ghi giao dịch mới loại `Hoàn tiền` được tạo với số tiền âm (để đối soát)
- Gói đăng ký khách hàng: tuỳ trường hợp — Operator/Accounting quyết định có pause/cancel không

**Phân quyền:** Admin, Accounting

---

### 3.9 Quản Lý Mã Giảm Giá (Coupon Management)

#### 3.9.1 Tổng Quan

Coupon là mã giảm giá được tạo nội bộ để hỗ trợ tiếp cận khách hàng mới, chương trình promotion, hoặc tặng khách mời / gia đình. Coupon **không phải do khách hàng tự tạo** — chỉ team nội bộ mới được tạo mã.

#### 3.9.2 Danh Sách Coupon

| Cột | Mô tả |
|---|---|
| Mã coupon | Chuỗi ký tự (VD: `KHAI-TRUONG`, `FAMILY2026`) |
| Loại giảm | % giảm (VD: 20%) hoặc số tiền cố định (VD: -50,000đ) |
| Gói áp dụng | Tất cả / Cơ Bản / Chuyên Sâu / Chiến Lược |
| Số lần dùng tối đa | Giới hạn tổng (VD: 50 lần) — để trống = không giới hạn |
| Số lần / khách | 1 lần / khách hoặc không giới hạn |
| Ngày hiệu lực | Từ ngày → đến ngày |
| Trạng thái | Active / Paused / Expired |
| Số lần đã dùng | Đếm thực tế |

#### 3.9.3 Tạo / Sửa Coupon

- Mã coupon: nhập thủ công (chữ in hoa, số, gạch ngang) — hệ thống kiểm tra trùng lặp
- Chọn loại giảm: % hoặc số tiền cố định
- Thiết lập giới hạn sử dụng và thời hạn
- Có thể pause / kích hoạt lại bất kỳ lúc nào

**Phân quyền tạo/sửa:** Admin, Operator
**Phân quyền xem:** Admin, Accounting, Operator

#### 3.9.4 Lịch Sử Sử Dụng Coupon

Mỗi coupon có tab lịch sử: danh sách khách hàng đã dùng, mã GD liên kết, số tiền giảm thực tế.

---

### 3.10 Báo Cáo Tài Chính & Hỗ Trợ Kế Toán (Accounting Reports)

#### 3.10.1 Tổng Quan

Section này dành riêng cho Accounting, cung cấp các công cụ để đối soát doanh thu và chuẩn bị hồ sơ thuế. Mọi báo cáo đều có thể xuất ra Excel để kế toán xử lý tiếp.

---

#### 3.10.2 Báo Cáo Doanh Thu (Revenue Report)

**Bộ lọc:**
- Khoảng thời gian: tuần / tháng / quý / năm / tuỳ chỉnh
- Theo gói, theo phương thức thanh toán

**Nội dung báo cáo:**

| Chỉ số | Mô tả |
|---|---|
| Tổng doanh thu | Tổng tiền thực thu trong kỳ |
| Doanh thu theo gói | Breakdown: Cơ Bản / Chuyên Sâu / Chiến Lược |
| Doanh thu theo chu kỳ | Tháng vs. Năm |
| Doanh thu theo kênh TT | Chuyển khoản vs. ZaloPay |
| Số giao dịch mới | Subscription lần đầu |
| Số giao dịch gia hạn | Renewal |
| Tổng hoàn tiền | Tổng số tiền đã refund trong kỳ |
| Doanh thu thuần | Tổng doanh thu − Tổng hoàn tiền |
| MRR (Monthly Recurring Revenue) | Ước tính doanh thu định kỳ tháng |

**Phân quyền:** Admin, Accounting

---

#### 3.10.3 Đối Soát Giao Dịch (Reconciliation)

**Mục đích:** So sánh dữ liệu giao dịch trong IOT với sao kê ngân hàng / ZaloPay để phát hiện lệch lạc.

**Luồng đối soát:**
1. Kế toán tải lên file sao kê (CSV/Excel từ ngân hàng hoặc ZaloPay)
2. Hệ thống tự khớp (auto-match) theo mã tham chiếu và số tiền
3. Kết quả hiển thị 3 nhóm:
   - **Khớp:** Giao dịch IOT ↔ Sao kê trùng khớp
   - **Chỉ có trong IOT:** Giao dịch đã ghi nhưng chưa thấy trong sao kê
   - **Chỉ có trong sao kê:** Tiền vào ngân hàng nhưng chưa được ghi trong IOT
4. Kế toán xử lý thủ công các mục chưa khớp
5. Xuất kết quả đối soát ra Excel

**Phân quyền:** Admin, Accounting

---

#### 3.10.4 Báo Cáo Thuế (Tax Report)

**Lưu ý:** ĐVTT hiện ở giai đoạn sơ khai. Báo cáo thuế được thiết kế đơn giản, phù hợp hộ kinh doanh cá thể hoặc công ty startup giai đoạn đầu, dễ bàn giao cho kế toán/đại lý thuế.

**Báo cáo Tổng Hợp Doanh Thu Theo Tháng:**
- Tháng / Số giao dịch / Doanh thu gộp / Hoàn tiền / Doanh thu thuần
- Dùng làm cơ sở khai thuế thu nhập cá nhân / doanh nghiệp

**Danh Sách Giao Dịch Đầy Đủ (Full Transaction Ledger):**
- Toàn bộ giao dịch trong kỳ với đủ trường: ngày, khách hàng, loại dịch vụ, số tiền, phương thức, trạng thái
- Định dạng phù hợp để nộp cho kế toán / cơ quan thuế nếu cần

**Xuất định dạng:**
- Excel (.xlsx) — có sheet tóm tắt + sheet chi tiết
- CSV

**Phân quyền:** Admin, Accounting

---

#### 3.10.5 Dashboard Tài Chính Nhanh (Finance Dashboard)

Trang tổng quan dành cho Accounting, hiển thị các chỉ số tài chính real-time:

- Doanh thu tháng hiện tại (so với tháng trước)
- Số giao dịch chờ xác nhận (cần xử lý ngay)
- Số giao dịch thất bại trong 7 ngày gần nhất
- MRR hiện tại
- Số khách hàng sắp hết hạn trong 7 ngày (rủi ro churn)
- Tổng hoàn tiền tháng hiện tại

**Phân quyền:** Admin, Accounting

---

### 3.11 Hệ Thống Thông Báo (Notification System)

#### 3.11.1 Tổng Quan

Notification System gửi email tự động đến khách hàng khi có sự kiện liên quan đến tài khoản hoặc gói đăng ký của họ. **Giai đoạn đầu chỉ gửi qua Email.** Khi tích hợp Zalo OA trong tương lai, các template sẽ được nhân đôi sang kênh Zalo mà không cần thiết kế lại logic.

**Kênh gửi hiện tại:** Email (transactional email — dùng SendGrid / Mailgun / Resend)
**Kênh tương lai:** Zalo ZNS (khi có Zalo OA Official)
**Ngôn ngữ email:** Tiếng Việt
**Sender name:** Đại Hồng Việt Tử Vi | `noreply@[domain]`

---

#### 3.11.2 Danh Sách Sự Kiện & Template Email

| # | Sự kiện | Trigger | Gửi cho |
|---|---|---|---|
| N01 | Tạo tài khoản thành công | Khách hàng đăng ký xong | Khách hàng |
| N02 | Xác minh email (Verify Email) | Ngay sau N01 | Khách hàng |
| N03 | Xác minh email thành công | Sau khi click link verify | Khách hàng |
| N04 | Thanh toán thành công | Giao dịch → Thành công | Khách hàng |
| N05 | Thanh toán thất bại | Giao dịch → Thất bại | Khách hàng |
| N06 | Gói đăng ký được kích hoạt | Manual Activate / sau N04 | Khách hàng |
| N07 | Gói được gia hạn | Extend Expiry / Renewal | Khách hàng |
| N08 | Gói sắp hết hạn — 7 ngày | Cron job hàng ngày | Khách hàng |
| N09 | Gói sắp hết hạn — 1 ngày | Cron job hàng ngày | Khách hàng |
| N10 | Gói đã hết hạn | Ngày hết hạn qua đi | Khách hàng |
| N11 | Gói bị tạm dừng (Pause) | Operator thực hiện Pause | Khách hàng |
| N12 | Gói được tiếp tục (Resume) | Operator thực hiện Resume | Khách hàng |
| N13 | Hoàn tiền thành công | Refund được xác nhận | Khách hàng |
| N14 | Tài khoản bị khoá | Block bởi Operator/Admin | Khách hàng |
| N15 | Đặt lại mật khẩu | Yêu cầu "Quên mật khẩu" | Khách hàng |

---

#### 3.11.3 Nội Dung Chi Tiết Từng Template

**N01 — Chào mừng / Tạo tài khoản thành công**
- Chủ đề: `Chào mừng bạn đến với Đại Hồng Việt Tử Vi 🌟`
- Nội dung: Tên khách hàng, thông tin tài khoản (email), link đến dashboard, nhắc xác minh email
- CTA: "Xác minh email của bạn"

**N02 — Xác minh email**
- Chủ đề: `Xác minh địa chỉ email của bạn`
- Nội dung: Link verify (có hiệu lực 24 giờ)
- CTA: "Xác minh ngay"
- Lưu ý: Link hết hạn sau 24h — có nút "Gửi lại email xác minh"

**N03 — Xác minh email thành công**
- Chủ đề: `Email của bạn đã được xác minh ✅`
- Nội dung: Xác nhận thành công, hướng dẫn bước tiếp theo (khám phá dashboard / nâng cấp gói)

**N04 — Thanh toán thành công**
- Chủ đề: `Xác nhận thanh toán — [Tên gói] | [Số tiền]đ`
- Nội dung: Mã giao dịch, tên gói, chu kỳ, số tiền thực thu (sau coupon nếu có), phương thức thanh toán, ngày giao dịch
- Footer: "Nếu bạn không thực hiện giao dịch này, vui lòng liên hệ support"

**N05 — Thanh toán thất bại**
- Chủ đề: `Giao dịch không thành công — Cần hỗ trợ?`
- Nội dung: Thông báo giao dịch thất bại, hướng dẫn liên hệ để xử lý lại
- CTA: "Liên hệ hỗ trợ"

**N06 — Gói đăng ký được kích hoạt**
- Chủ đề: `Gói [Tên gói] đã được kích hoạt — Bắt đầu hành trình của bạn`
- Nội dung: Tên gói, ngày bắt đầu, ngày hết hạn, tóm tắt quyền lợi gói
- CTA: "Vào dashboard ngay"

**N07 — Gói được gia hạn**
- Chủ đề: `Gói của bạn đã được gia hạn đến [ngày hết hạn mới]`
- Nội dung: Ngày hết hạn mới, lý do gia hạn (nếu có — VD: "Tặng thêm 7 ngày từ ĐVTT")

**N08 & N09 — Sắp hết hạn (7 ngày / 1 ngày)**
- Chủ đề: `Gói của bạn sắp hết hạn — còn [X] ngày`
- Nội dung: Ngày hết hạn, nhắc gia hạn, bảng giá tóm tắt
- CTA: "Gia hạn ngay"

**N10 — Đã hết hạn**
- Chủ đề: `Gói đăng ký của bạn đã hết hạn`
- Nội dung: Thông báo hết hạn, các tính năng bị giới hạn, khuyến khích gia hạn
- CTA: "Gia hạn để tiếp tục"

**N11 — Gói bị tạm dừng**
- Chủ đề: `Gói đăng ký của bạn đang tạm dừng`
- Nội dung: Thông báo trạng thái, lý do (nếu Operator cho phép hiển thị), hướng dẫn liên hệ

**N12 — Gói được tiếp tục**
- Chủ đề: `Gói đăng ký của bạn đã được tiếp tục — Ngày hết hạn mới: [ngày]`
- Nội dung: Ngày hết hạn cập nhật (đã cộng thêm thời gian pause)

**N13 — Hoàn tiền thành công**
- Chủ đề: `Xác nhận hoàn tiền — [Số tiền]đ`
- Nội dung: Mã giao dịch hoàn tiền, số tiền, lý do, thời gian nhận tiền ước tính
- Lưu ý: Do thanh toán manual, thời gian nhận tiền phụ thuộc vào xử lý thủ công

**N14 — Tài khoản bị khoá**
- Chủ đề: `Tài khoản của bạn đã bị tạm khoá`
- Nội dung: Thông báo khoá, hướng dẫn liên hệ để giải quyết
- Không hiển thị lý do chi tiết (chỉ hướng dẫn liên hệ)

**N15 — Đặt lại mật khẩu**
- Chủ đề: `Yêu cầu đặt lại mật khẩu — Đại Hồng Việt Tử Vi`
- Nội dung: Link reset (hiệu lực 1 giờ)
- Footer: "Nếu bạn không yêu cầu, hãy bỏ qua email này"

---

#### 3.11.4 Quản Lý Notification trong IOT

**Trang Notification Settings (Admin only):**
- Bật / tắt từng loại notification (N01–N15)
- Xem preview template email trước khi bật
- Chỉnh sửa nội dung template (basic rich text editor)

**Notification Log:**
- Lịch sử email đã gửi: người nhận, loại email, thời gian, trạng thái (Delivered / Bounced / Failed)
- Lọc theo khách hàng, loại email, trạng thái
- Có thể gửi lại email thất bại (Resend)

**Phân quyền:** Admin (cấu hình) / Admin + Accounting + Operator (xem log)

---

## 4. Yêu Cầu Phi Chức Năng

### 4.1 Bảo Mật
- Truy cập qua web thông thường; **bắt buộc email domain công ty** để đăng nhập (IP whitelist / VPN / 2FA để xem xét ở giai đoạn sau khi quy mô tăng)
- Mật khẩu phải đủ mạnh: tối thiểu 8 ký tự, có chữ hoa, số, ký tự đặc biệt
- Session hết hạn sau 8 giờ không hoạt động
- Mọi thao tác nhạy cảm phải được ghi audit log
- Không hiển thị thông tin thanh toán thô (số tài khoản ngân hàng) trong portal

### 4.2 Giao Diện
- Web-based, responsive (ưu tiên desktop)
- Ngôn ngữ: Tiếng Việt
- Màu sắc: Theo brand ĐVTT (Deep Navy, Cosmic Blue, Gold accent)
- Thao tác quan trọng luôn có confirmation dialog
- Hiển thị toast notification sau mỗi thao tác thành công / thất bại

### 4.3 Hiệu Năng
- Danh sách khách hàng load dưới 2 giây với 10,000 bản ghi
- Export file dưới 30 giây với 10,000 bản ghi

---

## 5. Quyết Định Đã Xác Nhận & Điểm Còn Mở

### 5.1 Đã quyết định ✅

| # | Nội dung | Quyết định |
|---|---|---|
| 1 | Data source | Customer data + Transaction data của chính hệ thống ĐVTT |
| 2 | Xác thực tài khoản nội bộ | Email domain công ty bắt buộc; không cần IP whitelist giai đoạn đầu |
| 3 | Thông báo khi thao tác | Trigger email tự động (15 loại — xem Section 3.11); Zalo để sau |
| 4 | Định dạng Bát Tự | Lưu cả dương lịch + âm lịch |
| 5 | Consultant view | Xem full thông tin, không ẩn trường nào; điều chỉnh sau nếu cần |
| 6 | Accounting Export | Chỉ xuất dữ liệu giao dịch/tài chính — không xuất danh sách khách hàng |
| 7 | Số lượng Admin | Giới hạn cứng 2 Admin |
| 9 | Định dạng Mã KH | `DVTT00001–DVTT00100` reserved; khách hàng đầu tiên = `DVTT00101` |
| 11 | Coupon/Discount | Áp dụng — đã thiết kế Section 3.9 + trường coupon trong Transaction |

### 5.2 Còn cần thảo luận thêm 🔄

**Câu 8 — Tích hợp sao kê ngân hàng:**
Cần research thêm các phương án cho thị trường Việt Nam:
- Phương án A: Upload file sao kê thủ công (CSV từ ngân hàng) — đơn giản, không cần tích hợp
- Phương án B: Open Banking API (MB Bank, Vietcombank, Techcombank đều có) — tự động hơn, mất phí + effort tích hợp
- Phương án C: ZaloPay Business API — phù hợp nếu chuẩn hoá kênh thanh toán về ZaloPay
- **Khuyến nghị tạm:** Bắt đầu Phương án A cho giai đoạn đầu, migrate lên B/C khi đạt 200+ giao dịch/tháng

**Câu 10 — Hình thức đăng ký doanh nghiệp:**
Xem Section 7 bên dưới để đọc phân tích và khuyến nghị.

---

## 6. Định Nghĩa Các Trạng Thái Hệ Thống

**Trạng thái Gói Đăng Ký (Subscription Status):**
```
Free Trial   → Dùng thử miễn phí, chưa có gói trả phí
Active       → Gói đang hoạt động, còn hạn
Paused       → Gói bị tạm dừng bởi team nội bộ
Expired      → Gói đã hết hạn, chưa gia hạn
Blocked      → Tài khoản bị chặn bởi team nội bộ
```

**Trạng thái Giao Dịch (Transaction Status):**
```
Chờ xác nhận  → Giao dịch đã ghi nhận, chưa xác minh tiền vào
Thành công    → Đã nhận tiền, gói đã được kích hoạt
Thất bại      → Không nhận được tiền hoặc hủy giao dịch
Đã hoàn tiền  → Đã hoàn trả cho khách hàng
```

---

---

## 7. Tư Vấn Hình Thức Đăng Ký Doanh Nghiệp

*Phần này không thuộc phạm vi kỹ thuật IOT nhưng ảnh hưởng trực tiếp đến thiết kế báo cáo thuế (Section 3.10.4) và vấn đề bảo hộ tài sản trí tuệ.*

> ⚠️ **Lưu ý:** Đây là phân tích tham khảo, không thay thế tư vấn pháp lý chuyên nghiệp. Khuyến nghị tham khảo thêm luật sư / đại lý thuế trước khi quyết định.

---

### 7.1 So Sánh Hai Hình Thức

| Tiêu chí | Hộ Kinh Doanh Cá Thể | Công ty TNHH (2 thành viên) |
|---|---|---|
| Thủ tục đăng ký | Đơn giản, nhanh (3–5 ngày) | Phức tạp hơn (7–15 ngày), đăng ký tại Sở KH&ĐT |
| Cơ cấu sở hữu | 1 chủ duy nhất | Bang + Thầy Tử Vi — tỷ lệ góp vốn linh hoạt |
| Trách nhiệm pháp lý | Vô hạn (tài sản cá nhân chịu rủi ro) | Hữu hạn trong phạm vi vốn góp |
| Thuế | Thuế khoán ~1–2% doanh thu (đơn giản) | VAT 10% + CIT 20% trên lợi nhuận (sau khấu trừ chi phí hợp lệ) |
| Chi phí kế toán | Thấp | Cao hơn — cần báo cáo tài chính định kỳ |
| Bảo hộ nhãn hiệu | Có thể đăng ký, nhưng uy tín thấp hơn | Đăng ký nhãn hiệu dưới tên công ty — bảo hộ mạnh hơn |
| Bảo hộ bản quyền phần mềm | Đăng ký được, nhưng gắn với cá nhân | Gắn với pháp nhân công ty — an toàn hơn khi có tranh chấp |
| Khả năng gọi vốn | Không thể | Có thể phát hành thêm phần vốn góp |
| Ký hợp đồng B2B | Được, nhưng kém uy tín hơn | Tốt hơn — dễ ký hợp đồng với doanh nghiệp/tổ chức |
| Giới hạn nhân sự | Tối đa 10 người lao động | Không giới hạn |

---

### 7.2 Khuyến Nghị: Công ty TNHH 2 Thành Viên

Với đặc thù của ĐVTT — sản phẩm digital/SaaS xây dựng trên hệ thống phân tích độc quyền kết hợp giữa 2 sáng lập viên — mình khuyến nghị chọn **Công ty TNHH 2 thành viên**, vì 4 lý do:

**1. Bảo hộ tài sản trí tuệ vững chắc hơn**
Tên thương hiệu "Đại Hồng Việt Tử Vi", hệ thống phân tích vận trình, và phần mềm IOT đều là tài sản cốt lõi. Khi đăng ký bản quyền và nhãn hiệu dưới tên pháp nhân công ty, quyền sở hữu được bảo vệ rõ ràng hơn — không phụ thuộc vào 1 cá nhân và tránh tranh chấp nếu sau này có thay đổi nhân sự.

**2. Cơ cấu góp vốn minh bạch giữa 2 sáng lập viên**
TNHH 2 thành viên cho phép ghi rõ tỷ lệ góp vốn của Bang và Thầy Tử Vi trong điều lệ công ty (VD: 70/30 hoặc thoả thuận khác). Điều này bảo vệ cả hai bên về mặt pháp lý và tránh nhập nhằng sau này.

**3. Nền tảng để scale**
Khi đạt mục tiêu 90 ngày và bắt đầu gọi vốn hoặc hợp tác chiến lược, TNHH dễ chuyển đổi thành Công ty Cổ phần hơn nhiều so với hộ kinh doanh.

**4. Ký hợp đồng B2B & đối tác**
Nếu ĐVTT muốn ký hợp đồng với doanh nghiệp (gói Chiến Lược cho chủ doanh nghiệp, hợp tác với media/HR), tư cách pháp nhân công ty là bắt buộc ở nhiều trường hợp.

---

### 7.3 Lưu Ý Về Thuế Khi Chọn TNHH

- **VAT:** Dịch vụ SaaS/phần mềm tại Việt Nam áp thuế VAT 10%. Cần xuất hoá đơn điện tử cho mỗi giao dịch (phù hợp với thiết kế Transaction Management).
- **CIT:** 20% trên lợi nhuận sau khấu trừ. Giai đoạn đầu doanh thu thấp nên thực tế thuế thấp; khi có chi phí hợp lệ (server, marketing, lương) thì lợi nhuận tính thuế giảm đáng kể.
- **Hoá đơn điện tử:** Bắt buộc từ 01/07/2022 với mọi doanh nghiệp. Cần tích hợp hệ thống xuất hoá đơn điện tử vào Transaction Management ở giai đoạn tiếp theo (không phải giai đoạn 1).

---

### 7.4 Bước Tiếp Theo Nếu Chọn TNHH

1. Thoả thuận và ghi rõ tỷ lệ góp vốn giữa 2 sáng lập viên
2. Đăng ký tên công ty tại Sở KH&ĐT (kiểm tra tên trước tại cổng thông tin doanh nghiệp quốc gia)
3. Đăng ký nhãn hiệu "Đại Hồng Việt Tử Vi" / "ĐVTT" tại Cục Sở hữu trí tuệ (NOIP) — nên làm sớm trước khi ra mắt
4. Mở tài khoản ngân hàng doanh nghiệp → chuẩn hoá tài khoản nhận thanh toán

---

*Tài liệu này là bản draft để review nội bộ. Sau khi phê duyệt, sẽ được chuyển thành task development.*
