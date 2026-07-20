# YÊU CẦU CẬP NHẬT: THUẬT TOÁN TỨ TRỤ (CENTER BOX)

Hủy bỏ logic sử dụng "offset 21/1/2020" và "công thức lục thập hoa giáp" vì có sai số vật lý. Vui lòng áp dụng các chuẩn mực thuật toán cổ học dưới đây để định vị Thiên Can / Địa Chi cho Tứ Trụ (Năm, Tháng, Ngày, Giờ).

**(Giả định Index Can: 1=Giáp... 10=Quý. Index Chi: 1=Tý... 12=Hợi)**

## 1. TRỤ NĂM (Đã có sẵn trong core)
* `canNam = (lunarYear + 6) % 10 || 10;`
* `chiNam = (lunarYear + 8) % 12 || 12;`

## 2. TRỤ NGÀY (Từ JDN tuyệt đối)
Tính Julian Day Number (JDN) từ hàm `_VT(dd, mm, yy)` của ngày Dương Lịch.
* `jdn = _VT(D, M, Y);`
* `canNgay = jdn % 10 || 10;`
* `chiNgay = (jdn + 2) % 12 || 12;`

## 3. TRỤ GIỜ (Quy tắc "Ngũ Thử Độn")
Bản chất Can của giờ phụ thuộc tuyệt đối vào Can của ngày.
* `chiGio = gs; // gs lấy từ Input người dùng (1 đến 12)`
* `canGio = (canNgay * 2 + chiGio - 2) % 10 || 10;`

## 4. TRỤ THÁNG (Quy tắc "Ngũ Hổ Độn")
Bản chất Can của tháng phụ thuộc tuyệt đối vào Can của năm và khởi từ tháng Dần (Index = 3).
* `chiThang = (thangAm + 1) % 12 || 12; // Tháng 1 âm luôn là Dần (3)`
* `canThang = (canNam * 2 + chiThang - 2) % 10 || 10;`

---
**Ví dụ Test Case để confirm code hoạt động đúng:**
Input DL: 22/04/1985 (Âm: 03/03/1985), Giờ Thìn (5)
* Trụ Năm: Ất Sửu (Can 2, Chi 2)
* Trụ Tháng: Canh Thìn (Can 7, Chi 5)
* Trụ Ngày: Tân Mão (Can 8, Chi 4) -> jdn của 22/4/1985 là 2446178. `2446178 % 10 = 8 (Tân)`. `(2446178+2)%12 = 4 (Mão)`.
* Trụ Giờ: Nhâm Thìn (Can 9, Chi 5) -> `(8 * 2 + 5 - 2) % 10 = 19 % 10 = 9 (Nhâm)`.

**UI/UX Requirement:**
Render thông tin vào Center Box theo bảng 4 cột: [Giờ] - [Ngày] - [Tháng] - [Năm].
Style: Chữ Thiên Can màu `var(--off)` (trắng), chữ Địa Chi màu `var(--gold)` (vàng).