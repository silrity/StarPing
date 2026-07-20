# MASTER BLUEPRINT: TỔNG HỢP TOÀN BỘ LOGIC AN SAO TỬ VI ỨNG DỤNG
*(Bản chuẩn hóa bao gồm 111 tinh đẩu, Âm Dương Ngũ Hành, Lưu Phi Tinh & Vòng Tiểu Hạn)*

---

## PHẦN 1: CẤU TRÚC DỮ LIỆU CƠ SỞ (DATA STRUCTURES)

```javascript
const CAN = ['','Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const CHI = ['','Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

// 1. Hệ thống Âm Dương Ngũ Hành (Chính & Đới)
const NGU_HANH_SAO = {
    // 14 Chính Tinh
    'Tử Vi':'Âm Thổ', 'Thiên Cơ':'Âm Mộc', 'Thái Dương':'Dương Hỏa', 'Vũ Khúc':'Âm Kim', 'Thiên Đồng':'Dương Thủy', 
    'Liêm Trinh':'Âm Hỏa (đới Mộc)', 'Thiên Phủ':'Dương Thổ', 'Thái Âm':'Âm Thủy', 'Tham Lang':'Âm Thủy (đới Mộc)', 
    'Cự Môn':'Âm Thủy (đới Kim)', 'Thiên Tướng':'Dương Thủy', 'Thiên Lương':'Âm Mộc (đới Thổ)', 
    'Thất Sát':'Dương Kim (đới Hỏa)', 'Phá Quân':'Âm Thủy (đới Kim)',
    
    // Tứ Hóa & Không Vong
    'Hóa Lộc':'Âm Mộc (đới Thổ)', 'Hóa Quyền':'Dương Mộc (đới Thủy)', 'Hóa Khoa':'Dương Thủy (đới Mộc)', 'Hóa Kỵ':'Âm Thủy (đới Kim)',
    'Tuần':'Âm Hỏa (đới Thủy)', 'Triệt':'Dương Kim (đới Thủy)',
    'L.Tuần':'Âm Hỏa (đới Thủy)', 'L.Triệt':'Dương Kim (đới Thủy)',
    
    // Lục Cát & Lục Sát
    'Văn Xương':'Âm Kim (đới Thổ)', 'Văn Khúc':'Âm Thủy', 'Tả Phù':'Dương Thổ', 'Hữu Bật':'Âm Thổ', 
    'Thiên Khôi':'Dương Hỏa (đới Kim)', 'Thiên Việt':'Âm Hỏa (đới Mộc)',
    'Kình Dương':'Dương Kim (đới Hỏa)', 'Đà La':'Âm Kim (đới Hỏa)', 'Hỏa Tinh':'Dương Hỏa', 'Linh Tinh':'Âm Hỏa', 
    'Địa Không':'Âm Hỏa', 'Địa Kiếp':'Dương Hỏa',
    
    // Phụ tinh trọng yếu
    'Lộc Tồn':'Âm Thổ', 'Thiên Mã':'Dương Hỏa', 'Đào Hoa':'Dương Mộc', 'Hồng Loan':'Âm Thủy', 
    'Thiên Khốc':'Dương Kim', 'Thiên Hư':'Âm Thủy', 'Cô Thần':'Dương Thổ', 'Quả Tú':'Âm Thổ',
    'Thiên Hình':'Dương Kim (đới Hỏa)', 'Thiên Y':'Âm Thủy', 'Thiên Riêu':'Âm Thủy (đới Mộc)',
    
    // Vòng Thái Tuế
    'Thái Tuế':'Dương Hỏa', 'Thiếu Dương':'Dương Hỏa', 'Tang Môn':'Âm Mộc', 'Thiếu Âm':'Âm Thủy', 'Quan Phù':'Dương Hỏa', 
    'Tử Phù':'Âm Kim', 'Tuế Phá':'Âm Hỏa', 'Long Đức':'Dương Thủy', 'Bạch Hổ':'Dương Kim', 'Phúc Đức':'Dương Thổ', 
    'Điếu Khách':'Âm Hỏa', 'Trực Phù':'Âm Kim (đới Thủy)',

    // Vòng Bác Sĩ
    'Bác Sĩ':'Âm Thủy', 'Lực Sĩ':'Dương Hỏa', 'Thanh Long':'Dương Thủy', 'Tiểu Hao':'Dương Hỏa', 'Tướng Quân':'Dương Mộc', 
    'Tấu Thư':'Âm Kim', 'Phi Liêm':'Dương Hỏa', 'Hỉ Thần':'Dương Hỏa', 'Bệnh Phù':'Âm Thổ', 'Đại Hao':'Âm Hỏa', 
    'Phục Binh':'Dương Hỏa', 'Quan Phủ':'Dương Hỏa',

    // Các Bàng Tinh khác
    'Thiên Không':'Dương Hỏa', 'Kiếp Sát':'Âm Hỏa', 'Thiên Tài':'Âm Thổ', 'Thiên Thọ':'Dương Thổ', 'Thiên Quan':'Dương Hỏa', 
    'Thiên Phúc':'Dương Thổ', 'Thiên Hỉ':'Dương Thủy', 'Thiên Thương':'Dương Thổ', 'Thiên Sứ':'Âm Thủy', 'Phá Toái':'Âm Kim', 
    'Long Trì':'Dương Thủy', 'Phượng Các':'Dương Thổ (đới Mộc)', 'Đường Phù':'Âm Mộc', 'Tam Thai':'Dương Thủy (đới Thổ)', 
    'Bát Tọa':'Âm Thổ', 'Thai Phụ':'Dương Kim', 'Phong Cáo':'Âm Thổ', 'Đẩu Quân':'Âm Hỏa', 'Hoa Cái':'Dương Kim'
};

// 2. Các hàm Toán học (Helpers)
function _KT(t) { while(t > 12) t -= 12; while(t <= 0) t += 12; return t; }
function dich(s, ...a) { let r = Math.round(s); for(let v of a) r += Math.round(v); return _KT(r); }