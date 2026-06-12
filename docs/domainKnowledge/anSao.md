# YÊU CẦU CẬP NHẬT THUẬT TOÁN AN SAO: TÍCH HỢP "LƯU PHI TINH" (TỬ VI BỬU ĐÌNH)

Hệ thống hiện tại đang thiếu lớp sao di động theo năm (Lưu Phi Tinh). Trong Tử Vi Bửu Đình, ngoài lá số gốc, ta phải an thêm một vòng sao dựa trên **Can Năm Hiện Tại** và **Chi Năm Hiện Tại** (Ví dụ: Năm 2026 là Bính Ngọ -> Can Bính, Chi Ngọ).

Hãy viết thêm một module `calculateTransitStars(canNamHan, chiNamHan, gioiTinh, amDuongMoiNam)` và render các sao này với tiền tố "L." (Ví dụ: L.Lộc Tồn, L.Thái Tuế) hoặc đổi màu chữ để phân biệt với sao cố định.

Dưới đây là toàn bộ công thức toán học để định vị 12 cung (Index từ 1 đến 12, tương ứng Tý đến Hợi). Hàm cơ bản `dich(start, offset)` là di chuyển `offset` bước từ `start` trên vòng tròn 12 cung.

### 1. HỆ THỐNG LƯU SAO THEO THIÊN CAN NĂM HẠN (Ví dụ: Can Bính)

**A. Vòng Lưu Lộc Tồn & Bác Sĩ:**
Tọa độ Lưu Lộc Tồn (L.Lộc Tồn) phụ thuộc vào Can Năm Hạn (Index Can từ 1-10: Giáp=1... Quý=10).
*   `pos_L_LocTon` = `[0, 3, 4, 6, 7, 6, 7, 9, 10, 12, 1][canNamHan]`
*   `pos_L_KinhDuong` = `dich(pos_L_LocTon, 1)`
*   `pos_L_DaLa` = `dich(pos_L_LocTon, -1)`

**Vòng Lưu Bác Sĩ (12 sao):** 
1. L.Bác Sĩ (Đồng cung L.Lộc Tồn)
2. L.Lực Sĩ
3. L.Thanh Long
4. L.Tiểu Hao
5. L.Tướng Quân
6. L.Tấu Thư
7. L.Phi Liêm
8. L.Hỉ Thần
9. L.Bệnh Phù
10. L.Đại Hao
11. L.Phục Binh
12. L.Quan Phủ
*   *Chiều an sao:* Chiều an vòng Bác Sĩ phụ thuộc vào giới tính và Âm Dương của Can Năm Hạn. Nam Dương/Nữ Âm thì đi thuận (+1). Nam Âm/Nữ Dương thì đi nghịch (-1). Hoặc theo chuẩn Bửu Đình ứng dụng, vòng Lưu Bác Sĩ luôn đi **Thuận (+1)** theo Can Năm Dương và **Nghịch (-1)** theo Can Năm Âm.

**B. Lưu Khôi - Việt:**
*   `pos_L_Khoi` = `[0, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4][canNamHan]`
*   `pos_L_Viet` = `dich(5, 5 - pos_L_Khoi)`

**C. Lưu Tứ Hóa:**
Sử dụng ma trận Tứ Hóa giống hệt sao cố định, nhưng áp dụng cho Can Năm Hạn để sinh ra: L.Hóa Lộc, L.Hóa Quyền, L.Hóa Khoa, L.Hóa Kỵ. Đính kèm các sao này vào các cung có chứa Chính Tinh tương ứng.

**D. Lưu Hà:**
An theo Can Năm Hạn, bảng cố định (giống Lưu Hà bản mệnh nhưng áp dụng cho năm lưu):
*   `luuHaMap = [0, 10, 11, 8, 9, 6, 7, 4, 5, 12, 1]` (index = canNamHan, 1=Giáp...10=Quý)
*   Giáp→Dậu(10), Ất→Tuất(11), Bính→Mùi(8), Đinh→Thân(9), Mậu→Tỵ(6), Kỷ→Ngọ(7), Canh→Mão(4), Tân→Thìn(5), Nhâm→Hợi(12), Quý→Tý(1)

---

### 2. HỆ THỐNG LƯU SAO THEO ĐỊA CHI NĂM HẠN (Ví dụ: Chi Ngọ = 7)

**A. Vòng Lưu Thái Tuế (12 sao):**
Luôn bắt đầu từ cung có vị trí bằng với `chiNamHan` và đi Thuận (+1).
1. L.Thái Tuế (Tại `chiNamHan`)
2. L.Thiếu Dương
3. L.Tang Môn
4. L.Thiếu Âm
5. L.Quan Phù (Chú ý: khác với Quan Phủ của vòng Bác Sĩ)
6. L.Tử Phù
7. L.Tuế Phá
8. L.Long Đức
9. L.Bạch Hổ
10. L.Phúc Đức
11. L.Điếu Khách
12. L.Trực Phù

**B. Vòng Lưu Đào - Hồng - Hỉ:**
*   `L.Đào Hoa`: Dần/Ngọ/Tuất -> Mão (4); Thân/Tý/Thìn -> Dậu (10); Tỵ/Dậu/Sửu -> Ngọ (7); Hợi/Mão/Mùi -> Tý (1).
*   `L.Hồng Loan`: `dich(4, -chiNamHan + 1)` (Khởi Mão là năm Tý, đi nghịch).
*   `L.Thiên Hỉ`: `dich(pos_L_HongLoan, 6)` (Luôn xung chiếu Hồng Loan).

**C. L.Thiên Mã:**
*   Nhóm Dần/Ngọ/Tuất -> Thân (9)
*   Nhóm Thân/Tý/Thìn -> Dần (3)
*   Nhóm Tỵ/Dậu/Sửu -> Hợi (12)
*   Nhóm Hợi/Mão/Mùi -> Tỵ (6)

**E. L.Khốc - L.Hư:**
Khởi **Ngọ (7)** là năm Tý (giống hệt sao cố định). L.Thiên Khốc đi nghịch, L.Thiên Hư đi thuận.
*   `L.Thiên Khốc` = `dich(7, -chiNamHan + 1)`
*   `L.Thiên Hư` = `dich(7, chiNamHan - 1)`
*   *Ví dụ kiểm tra: Năm Bính Ngọ 2026 (chiNamHan=7) → Lưu Khốc = Lưu Hư = Tý (1) ✓*

**F. Lưu Cô Thần - Quả Tú (Theo mùa của Địa Chi năm):**
*   Năm Dần/Mão/Thìn (Mùa Xuân): L.Cô Thần tại Tỵ (6), L.Quả Tú tại Sửu (2).
*   Năm Tỵ/Ngọ/Mùi (Mùa Hạ): L.Cô Thần tại Thân (9), L.Quả Tú tại Thìn (5).
*   Năm Thân/Dậu/Tuất (Mùa Thu): L.Cô Thần tại Hợi (12), L.Quả Tú tại Mùi (8).
*   Năm Hợi/Tý/Sửu (Mùa Đông): L.Cô Thần tại Dần (3), L.Quả Tú tại Tuất (11).

**G. Các Lưu tinh phụ khác:**
*   `L.Phá Toái`: Năm Tý/Ngọ/Mão/Dậu -> Tỵ (6); Dần/Thân/Tỵ/Hợi -> Dậu (10); Thìn/Tuất/Sửu/Mùi -> Sửu (2).
*   `L.Long Trì`: Khởi Thìn là năm Tý, đi thuận -> `dich(5, chiNamHan - 1)`.
*   `L.Phượng Các`: Khởi Tuất là năm Tý, đi nghịch -> `dich(11, -chiNamHan + 1)`.
*   `L.Đường Phù`: Tý (8), Sửu (9), Dần (10), Mão (11), Thìn (12), Tỵ (1), Ngọ (2), Mùi (3), Thân (4), Dậu (5), Tuất (6), Hợi (7).


THIẾT LẬP MỆNH, THÂN VÀ 12 CUNG CHỨC NĂNG
1. Nguyên lý Thiết lập Cung Mệnh (Bản thể cốt lõi)

Cung Mệnh đại diện cho tư tưởng, tài năng bẩm sinh, ngoại hình và bản ngã của đương số. Cách an Mệnh dựa vào sự giao thoa giữa Tháng sinh (chu kỳ Mặt Trăng) và Giờ sinh (chu kỳ Trái Đất tự quay).

    Bước 1 - Khởi Tháng Sinh: Bắt đầu luôn luôn từ cung Dần (quy ước là tháng Giêng / tháng 1). Đếm THUẬN chiều kim đồng hồ (Dần, Mão, Thìn...) mỗi cung là một tháng cho đến tháng sinh Âm lịch. Dừng lại ở cung nào, cung đó được gọi là "Cung Tháng Sinh".

    Bước 2 - Khởi Giờ Sinh: Lấy chính "Cung Tháng Sinh" vừa tìm được làm giờ Tý. Bắt đầu đếm NGHỊCH chiều kim đồng hồ (lùi lại), mỗi cung là một giờ (Tý, Sửu, Dần...) cho đến giờ sinh của đương số.

    Bước 3 - Định vị Mệnh: Vị trí dừng lại ở bước 2 chính là Cung Mệnh.

2. Nguyên lý Thiết lập Cung Thân (Hành động và Hậu vận)

Cung Thân đại diện cho sự nỗ lực, môi trường thực tế và xu hướng hành động của đương số từ độ tuổi trưởng thành (sau 30 tuổi).

    Bước 1 - Khởi Tháng Sinh: Giống hệt như cách an Mệnh. Khởi từ cung Dần là tháng Giêng, đếm THUẬN đến tháng sinh để tìm "Cung Tháng Sinh".

    Bước 2 - Khởi Giờ Sinh: Lấy "Cung Tháng Sinh" làm giờ Tý. Nhưng lần này bắt đầu đếm THUẬN chiều kim đồng hồ, mỗi cung là một giờ (Tý, Sửu, Dần...) cho đến giờ sinh.

    Bước 3 - Định vị Thân: Vị trí dừng lại ở bước 2 chính là Cung Thân.

3. Hệ quả tất yếu: Vị trí "Thân Cư" theo Giờ Sinh

Do thuật toán Đếm Nghịch (Mệnh) và Đếm Thuận (Thân) xuất phát cùng một điểm (Cung Tháng Sinh), nên Cung Thân luôn luôn trùng lặp với một trong 6 cung chức năng cố định trên lá số tùy thuộc vào giờ sinh. Đây là một quy luật bất biến giúp chuyên gia kiểm tra nhanh tính chính xác của tinh bàn:

    Sinh giờ Tý, Ngọ: Thân cư Mệnh (Người độc lập, tự làm tự chịu, bảo thủ, tin vào bản thân).

    Sinh giờ Sửu, Mùi: Thân cư Phúc Đức (Người chịu ảnh hưởng nặng nề từ truyền thống gia đình, dòng họ, thiên về tâm linh hoặc gánh vác việc họ hàng).

    Sinh giờ Dần, Thân: Thân cư Quan Lộc (Người tham công tiếc việc, đặt sự nghiệp lên hàng đầu, lấy công việc làm thước đo giá trị bản thân).

    Sinh giờ Mão, Dậu: Thân cư Thiên Di (Người thích hướng ngoại, bôn ba, cuộc đời biến động theo môi trường xã hội, thường ly hương hoặc hay dịch chuyển).

    Sinh giờ Thìn, Tuất: Thân cư Tài Bạch (Người thực tế, coi trọng giá trị vật chất, có đầu óc kinh doanh, lấy tài chính làm cán cân quyết định).

    Sinh giờ Tỵ, Hợi: Thân cư Phu Thê (Người nặng tình, cuộc sống hậu vận chịu ảnh hưởng cực lớn từ người bạn đời, đặt gia đình nhỏ làm trọng tâm).

4. Trải 12 Cung Chức Năng (12 Cường/Nhược Cung)

Sau khi đã định vị được Cung Mệnh, 11 cung còn lại sẽ được trải theo một thứ tự cố định, luôn luôn đếm NGHỊCH chiều kim đồng hồ bắt đầu từ Mệnh. Thứ tự này mô phỏng các vòng tròn quan hệ từ bản thể vươn ra ngoài xã hội và quay về với cội nguồn:

    Mệnh (Bản ngã)

    Huynh Đệ (Anh em, cộng sự ngang hàng)

    Phu Thê (Người phối ngẫu)

    Tử Tức (Con cái, sản phẩm tạo ra, thế hệ sau)

    Tài Bạch (Cách kiếm tiền và tiêu tiền)

    Tật Ách (Thể chất, tâm bệnh, ách tắc vô hình)

    Thiên Di (Giao diện xã hội, môi trường bên ngoài) -> Luôn xung chiếu với Mệnh

    Nô Bộc / Giao Hữu (Cấp dưới, bạn bè xã giao, khách hàng)

    Quan Lộc / Sự Nghiệp (Thái độ làm việc, nghề nghiệp)

    Điền Trạch (Môi trường sống, bất động sản, kho lưu trữ)

    Phúc Đức (Phước báu tổ tiên, thế giới nội tâm)

    Phụ Mẫu (Cha mẹ, bề trên, pháp luật, quy chuẩn)

1. Hệ Thống 14 Chính Tinh

    Tử Vi: Âm Thổ

    Thiên Cơ: Âm Mộc

    Thái Dương: Dương Hỏa

    Vũ Khúc: Âm Kim

    Thiên Đồng: Dương Thủy

    Liêm Trinh: Âm Hỏa (đới Mộc)

    Thiên Phủ: Dương Thổ

    Thái Âm: Âm Thủy

    Tham Lang: Âm Thủy (đới Mộc)

    Cự Môn: Âm Thủy (đới Kim)

    Thiên Tướng: Dương Thủy

    Thiên Lương: Âm Mộc (đới Thổ)

    Thất Sát: Dương Kim (đới Hỏa)

    Phá Quân: Âm Thủy (đới Kim)

2. Hệ Thống Tứ Hóa & Không Vong

    Hóa Lộc: Âm Mộc (đới Thổ)

    Hóa Quyền: Dương Mộc (đới Thủy)

    Hóa Khoa: Dương Thủy (đới Mộc)

    Hóa Kỵ: Âm Thủy (đới Kim)

    Tuần Trung: Âm Hỏa (đới Thủy)

    Triệt Lộ: Dương Kim (đới Thủy)

3. Lục Cát & Lục Sát Tinh

    Văn Xương: Âm Kim (đới Thổ) | Văn Khúc: Âm Thủy

    Tả Phù: Dương Thổ | Hữu Bật: Âm Thổ

    Thiên Khôi: Dương Hỏa (đới Kim) | Thiên Việt: Âm Hỏa (đới Mộc)

    Kình Dương: Dương Kim (đới Hỏa) | Đà La: Âm Kim (đới Hỏa)

    Hỏa Tinh: Dương Hỏa | Linh Tinh: Âm Hỏa

    Địa Không: Âm Hỏa | Địa Kiếp: Dương Hỏa

4. Hệ Thống Phụ Tinh Trọng Yếu

    Hành Thủy: Hồng Loan (Âm), Thiên Hỷ (Dương), Thiên Y (Âm), Thiên Riêu (Âm đới Mộc), Lưu Hà (Âm), Bác Sĩ (Âm), Thanh Long (Dương), Thiên Hư (Âm), Thiếu Âm (Âm), Long Đức (Dương), Long Trì (Dương), Thiên Sứ (Âm), Tam Thai (Dương đới Thổ).

    Hành Hỏa: Thiên Mã (Dương), Đẩu Quân (Âm), Kiếp Sát (Âm), Ân Quang (Dương), Thái Tuế (Dương), Thiếu Dương (Dương), Quan Phù (Dương), Tuế Phá (Âm), Điếu Khách (Âm), Lực Sĩ (Dương), Tiểu Hao (Dương), Phi Liêm (Dương), Hỉ Thần (Dương), Đại Hao (Âm), Phục Binh (Dương), Quan Phủ (Dương), Thiên Quan (Dương), Phá Toái (Âm), Thiên Giải (Dương).

    Hành Mộc: Đào Hoa (Dương), Tang Môn (Âm), Tướng Quân (Dương), Đường Phù (Âm), Giải Thần (Dương).

    Hành Kim: Thiên Khốc (Dương), Thiên Hình (Dương đới Hỏa), Thai Phụ (Dương), Tử Phù (Âm), Bạch Hổ (Dương), Trực Phù (Âm đới Thủy), Tấu Thư (Âm), Hoa Cái (Dương).

    Hành Thổ: Lộc Tồn (Âm), Cô Thần (Dương), Quả Tú (Âm), Thiên Quý (Âm), Phong Cáo (Âm), Phúc Đức (Dương), Bệnh Phù (Âm), Thiên Tài (Âm), Thiên Thọ (Dương), Thiên Phúc (Dương), Phượng Các (Dương đới Mộc), Bát Tọa (Âm), Thiên Thương (Dương), Địa Giải (Âm).

PHẦN 2: NGUYÊN LÝ THIẾT LẬP ĐỊA BÀN VÀ MỆNH CỤC

1. Định vị Mệnh và Thân

    Cung Mệnh: Từ cung Dần (tháng Giêng), đếm thuận đến tháng sinh, rồi từ cung đó đếm nghịch đến giờ sinh. Dừng ở đâu, đó là cung Mệnh.

    Cung Thân: Từ cung Dần, đếm thuận đến tháng sinh, rồi từ cung đó đếm THUẬN tiếp đến giờ sinh.

2. Tìm Ngũ Hành Cục (Cục Số)
Dựa vào Thiên Can của cung Mệnh (tính theo luật Ngũ Hổ Độn: tháng Giêng năm Giáp/Kỷ luôn là Bính Dần, Ất/Canh là Mậu Dần...) kết hợp với Địa Chi của cung Mệnh để tìm ra Nạp Âm. Ngũ Hành của Nạp Âm đó chính là Cục Số (Thủy nhị Cục = 2, Mộc tam Cục = 3, Kim tứ Cục = 4, Thổ ngũ Cục = 5, Hỏa lục Cục = 6).
PHẦN 3: LÝ THUYẾT AN 14 CHÍNH TINH

1. Xác định Vị Trí Sao Tử Vi
Lấy ngày sinh Âm lịch chia cho Cục Số.

    Nếu chia hết: Từ cung Dần (vị trí số 1), đếm thuận theo thương số sẽ ra cung an Tử Vi.

    Nếu không chia hết: Phải mượn thêm số để chia hết. Nếu mượn số lẻ thì đếm lùi, mượn số chẵn thì đếm tiến từ thương số để ra vị trí Tử Vi.

2. Xác định Thiên Phủ
Thiên Phủ luôn đối xứng với Tử Vi qua trục Dần - Thân. Nếu Tử Vi ở cung Dần hoặc Thân thì Thiên Phủ đồng cung. Nếu Tử Vi ở Tỵ thì Thiên Phủ ở Hợi (và ngược lại).

3. Vòng Tử Vi (Đếm Nghịch / Ngược chiều kim đồng hồ)
Từ cung an Tử Vi, đếm nghịch theo thứ tự: Tử Vi -> Thiên Cơ -> (Bỏ trống 1 cung) -> Thái Dương -> Vũ Khúc -> Thiên Đồng -> (Bỏ trống 2 cung) -> Liêm Trinh.

4. Vòng Thiên Phủ (Đếm Thuận / Cùng chiều kim đồng hồ)
Từ cung an Thiên Phủ, đếm thuận theo thứ tự: Thiên Phủ -> Thái Âm -> Tham Lang -> Cự Môn -> Thiên Tướng -> Thiên Lương -> Thất Sát -> (Bỏ trống 3 cung) -> Phá Quân.
PHẦN 4: LÝ THUYẾT AN CÁC VÒNG SAO CHÍNH

1. Vòng Thái Tuế (12 sao)
Khởi Thái Tuế tại cung mang tên Địa Chi của Năm Sinh. Đếm Thuận liên tục 12 cung: Thái Tuế, Thiếu Dương, Tang Môn, Thiếu Âm, Quan Phù, Tử Phù, Tuế Phá, Long Đức, Bạch Hổ, Phúc Đức, Điếu Khách, Trực Phù.

2. Vòng Lộc Tồn & Bác Sĩ (12 sao)

    Vị trí Lộc Tồn: An theo Thiên Can của năm sinh (Giáp ở Dần, Ất ở Mão, Bính/Mậu ở Tỵ, Đinh/Kỷ ở Ngọ, Canh ở Thân, Tân ở Dậu, Nhâm ở Hợi, Quý ở Tý).

    Kình Dương & Đà La: Kình Dương luôn đứng trước Lộc Tồn 1 cung (chiều thuận). Đà La luôn đứng sau Lộc Tồn 1 cung.

    Vòng Bác Sĩ: Khởi Bác Sĩ đồng cung Lộc Tồn. Chiều an: Nam Dương/Nữ Âm đếm Thuận; Âm Nam/Dương Nữ đếm Nghịch. Thứ tự 12 sao: Bác Sĩ, Lực Sĩ, Thanh Long, Tiểu Hao, Tướng Quân, Tấu Thư, Phi Liêm, Hỉ Thần, Bệnh Phù, Đại Hao, Phục Binh, Quan Phủ.

3. Vòng Tràng Sinh (12 trạng thái)
Khởi Tràng Sinh dựa vào Cục Số (Thủy cục khởi tại Thân, Mộc cục tại Hợi, Kim cục tại Tỵ, Hỏa cục tại Dần, Thổ cục tại Thân).
Chiều an: Nam Dương/Nữ Âm đếm Thuận; Âm Nam/Dương Nữ đếm Nghịch.
Thứ tự: Tràng Sinh, Mộc Dục, Quan Đới, Lâm Quan, Đế Vượng, Suy, Bệnh, Tử, Mộ, Tuyệt, Thai, Dưỡng.
PHẦN 5: LÝ THUYẾT AN HỆ THỐNG PHỤ TINH

1. Các Sao An Theo Thiên Can Năm

    Tứ Hóa: Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ an bám vào các Chính/Phụ tinh tùy theo Thiên Can (Ví dụ: Can Giáp thì Liêm Trinh Hóa Lộc, Phá Quân Hóa Quyền, Vũ Khúc Hóa Khoa, Thái Dương Hóa Kỵ).

    Thiên Khôi - Thiên Việt: Dựa vào quy tắc Lục thập hoa giáp (Giáp/Mậu tại Sửu/Mùi, Ất/Kỷ tại Tý/Thân...).

    Thiên Quan - Thiên Phúc: An theo Can năm sinh.

    Lưu Hà, Quốc Ấn: Quốc Ấn luôn đứng trước Lộc Tồn 8 cung (thuận). Lưu Hà an theo bảng Can năm.

2. Các Sao An Theo Địa Chi Năm

    Đào Hoa: Thuộc nhóm Tam hợp tuổi (Dần/Ngọ/Tuất an tại Mão; Thân/Tý/Thìn an tại Dậu; Tỵ/Dậu/Sửu an tại Ngọ; Hợi/Mão/Mùi an tại Tý).

    Thiên Mã: Tương tự Đào Hoa nhưng ở vị trí khác (Dần/Ngọ/Tuất tại Thân...).

    Hồng Loan - Thiên Hỷ: Hồng Loan khởi từ Mão (năm Tý), đếm nghịch đến Địa chi năm sinh. Thiên Hỷ luôn xung chiếu với Hồng Loan.

    Thiên Khốc - Thiên Hư: Cùng khởi từ Ngọ (năm Tý). Khốc đếm nghịch, Hư đếm thuận đến năm sinh.

    Long Trì - Phượng Các: Long Trì khởi Thìn (năm Tý) đếm thuận. Phượng Các khởi Tuất đếm nghịch. Giải Thần luôn đồng cung Phượng Các.

    Cô Thần - Quả Tú: Dựa vào Mùa của năm sinh (Năm Dần/Mão/Thìn thì Cô Thần ở Tỵ, Quả Tú ở Sửu...).

    Các sao khác: Kiếp Sát, Phá Toái, Đường Phù, Hoa Cái, Thiên Đức, Nguyệt Đức.

3. Các Sao An Theo Tháng Sinh

    Tả Phù - Hữu Bật: Tả Phù khởi Thìn (tháng Giêng) đếm thuận đến tháng sinh. Hữu Bật khởi Tuất đếm nghịch.

    Thiên Y - Thiên Riêu: Khởi Sửu (tháng Giêng) đếm thuận. Luôn đồng cung.

    Thiên Hình: Khởi Dậu đếm thuận.

    Thiên Giải - Địa Giải: Thiên Giải khởi Thân đếm thuận. Địa Giải khởi Mùi đếm thuận.

4. Các Sao An Theo Ngày Sinh

    Tam Thai - Bát Tọa: Tam Thai khởi từ cung có Tả Phù (mùng 1) đếm thuận. Bát Tọa khởi từ cung có Hữu Bật đếm nghịch.

    Ân Quang - Thiên Quý: Ân Quang khởi từ cung có Văn Xương, đếm thuận đến ngày sinh, lùi 1 cung. Thiên Quý khởi từ Văn Khúc, đếm nghịch đến ngày sinh, lùi 1 cung.

5. Các Sao An Theo Giờ Sinh

    Văn Xương - Văn Khúc: Văn Khúc khởi Thìn (giờ Tý) đếm thuận. Văn Xương khởi Tuất đếm nghịch.

    Địa Không - Địa Kiếp: Khởi Hợi (giờ Tý). Kiếp đếm thuận, Không đếm nghịch.

    Hỏa Tinh - Linh Tinh: Cực kỳ phức tạp. Phụ thuộc vào Tam hợp Chi Năm Sinh để tìm cung Khởi (giờ Tý). Sau đó Âm Nam/Dương Nữ đếm nghịch; Dương Nam/Âm Nữ đếm thuận đến giờ sinh.

    Thai Phụ - Phong Cáo: Thai Phụ luôn đứng trước Văn Khúc 2 cung. Phong Cáo đứng sau Văn Khúc 2 cung.

6. Các Sao Cố Định và Dựa Vào Cung Mệnh/Thân

    Cố Định: Thiên La luôn ở Thìn, Địa Võng luôn ở Tuất.

    Theo Mệnh: Thiên Thương luôn ở Nô Bộc (Cách Mệnh 5 cung). Thiên Sứ luôn ở Tật Ách (Cách Mệnh 7 cung).

    Thiên Tài - Thiên Thọ: Thiên Tài khởi từ Mệnh đếm thuận đến chi Năm Sinh. Thiên Thọ khởi từ Thân đếm thuận đến chi Năm Sinh.

    Đẩu Quân: Từ cung Thái Tuế, đếm nghịch đến tháng sinh, rồi đếm thuận đến giờ sinh.

7. Hệ Thống Không Vong (Tuần - Triệt)

    Tuần Trung: Một vòng Hoa Giáp (10 Can) ghép với 12 Chi sẽ dư ra 2 Chi cuối. Hai cung chứa 2 Chi này sẽ bị Tuần Không.

    Triệt Lộ: An theo Thiên Can năm sinh, chặn đứng ở ranh giới giữa 2 cung (Giáp/Kỷ chặn Thân-Dậu; Ất/Canh chặn Ngọ-Mùi...).