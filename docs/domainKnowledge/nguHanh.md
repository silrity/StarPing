# ĐẶC TẢ TỔNG HỢP V2: ÂM DƯƠNG NGŨ HÀNH, TIỂU HẠN & UI CHIẾN LƯỢC

Gửi Developer (Claude), vui lòng cập nhật 3 module cốt lõi dưới đây vào hệ thống Javascript và CSS để nâng cấp lá số thành nền tảng hỗ trợ quyết định (Decision-Support Platform).

## PHẦN 1: MODULE CẤU TRÚC DỮ LIỆU (DATA STRUCTURE)

### 1.1. Cập nhật Âm Dương Ngũ Hành Tinh Đẩu
Khai báo hằng số `NGU_HANH_SAO` ở đầu file JS. Dữ liệu này chứa hành chính và hành đới (pha trộn) để tính toán sinh khắc sâu.

```javascript
const NGU_HANH_SAO = {
    // 14 Chính Tinh
    'Tử Vi':'Âm Thổ', 'Thiên Cơ':'Âm Mộc', 'Thái Dương':'Dương Hỏa', 'Vũ Khúc':'Âm Kim', 'Thiên Đồng':'Dương Thủy', 
    'Liêm Trinh':'Âm Hỏa (đới Mộc)', 'Thiên Phủ':'Dương Thổ', 'Thái Âm':'Âm Thủy', 'Tham Lang':'Âm Thủy (đới Mộc)', 
    'Cự Môn':'Âm Thủy (đới Kim)', 'Thiên Tướng':'Dương Thủy', 'Thiên Lương':'Dương Mộc (đới Thổ)', 
    'Thất Sát':'Dương Kim (đới Hỏa)', 'Phá Quân':'Âm Thủy (đới Kim)',
    
    // Tứ Hóa
    'Hóa Lộc':'Âm Mộc (đới Thổ)', 'Hóa Quyền':'Dương Mộc (đới Thủy)', 'Hóa Khoa':'Dương Thủy (đới Mộc)', 'Hóa Kỵ':'Âm Thủy (đới Kim)',
    
    // Không Vong
    'Tuần':'Âm Hỏa (đới Thủy)', 'Triệt':'Dương Kim (đới Thủy)',
    'L.Tuần':'Âm Hỏa (đới Thủy)', 'L.Triệt':'Dương Kim (đới Thủy)',
    
    // Lục Cát & Lục Sát
    'Văn Xương':'Âm Kim (đới Thổ)', 'Văn Khúc':'Âm Thủy (đới Hỏa)', 'Tả Phù':'Dương Thổ (đới Kim)', 'Hữu Bật':'Âm Thổ (đới Thủy)', 
    'Thiên Khôi':'Dương Hỏa (đới Kim)', 'Thiên Việt':'Âm Hỏa (đới Mộc)',
    'Kình Dương':'Dương Kim (đới Hỏa)', 'Đà La':'Âm Kim (đới Hỏa)', 'Hỏa Tinh':'Dương Hỏa', 'Linh Tinh':'Âm Hỏa', 
    'Địa Không':'Âm Hỏa', 'Địa Kiếp':'Dương Hỏa',
    
    // Phụ tinh trọng yếu
    'Lộc Tồn':'Âm Thổ', 'Thiên Mã':'Dương Hỏa', 'Đào Hoa':'Dương Mộc', 'Hồng Loan':'Âm Thủy', 
    'Thiên Khốc':'Dương Kim', 'Thiên Hư':'Âm Thủy', 'Cô Thần':'Dương Thổ', 'Quả Tú':'Âm Thổ',
    'Thiên Hình':'Dương Kim (đới Hỏa)', 'Thiên Y':'Âm Thủy', 'Thiên Riêu':'Âm Thủy (đới Mộc)'

    // ── VÒNG THÁI TUẾ (12 Sao) ──
    'Thái Tuế': 'Dương Hỏa', 
    'Thiếu Dương': 'Dương Hỏa', 
    'Tang Môn': 'Âm Mộc', 
    'Thiếu Âm': 'Âm Thủy', 
    'Quan Phù': 'Dương Hỏa', 
    'Tử Phù': 'Âm Kim', 
    'Tuế Phá': 'Âm Hỏa', 
    'Long Đức': 'Dương Thủy', 
    'Bạch Hổ': 'Dương Kim', 
    'Phúc Đức': 'Dương Thổ', 
    'Điếu Khách': 'Âm Hỏa', 
    'Trực Phù': 'Âm Kim (đới Thủy)',

    // ── VÒNG BÁC SĨ (12 Sao) ──
    'Bác Sĩ': 'Âm Thủy', 
    'Lực Sĩ': 'Dương Hỏa', 
    'Thanh Long': 'Dương Thủy', 
    'Tiểu Hao': 'Dương Hỏa', 
    'Tướng Quân': 'Dương Mộc', 
    'Tấu Thư': 'Âm Kim', 
    'Phi Liêm': 'Dương Hỏa', 
    'Hỉ Thần': 'Dương Hỏa', 
    'Bệnh Phù': 'Âm Thổ', 
    'Đại Hao': 'Âm Hỏa', 
    'Phục Binh': 'Dương Hỏa', 
    'Quan Phủ': 'Dương Hỏa',

    // ── CÁC SÁT TINH ĐẶC BIỆT ──
    'Thiên Không': 'Dương Hỏa', 
    'Kiếp Sát': 'Âm Hỏa', 
    
    // ── HỆ THỐNG PHỤ TINH KHÁC ──
    'Thiên Tài': 'Âm Thổ', 
    'Thiên Thọ': 'Dương Thổ', 
    'Thiên Quan': 'Dương Hỏa', 
    'Thiên Phúc': 'Dương Thổ', 
    'Thiên Hỉ': 'Dương Thủy', 
    'Thiên Thương': 'Dương Thổ', 
    'Thiên Sứ': 'Âm Thủy', 
    'Phá Toái': 'Âm Kim', 
    'Long Trì': 'Dương Thủy', 
    'Phượng Các': 'Dương Thổ (đới Mộc)', 
    'Đường Phù': 'Âm Mộc', 
    'Tam Thai': 'Dương Thủy (đới Thổ)', 
    'Bát Tọa': 'Âm Thổ', 
    'Thai Phụ': 'Dương Kim', 
    'Phong Cáo': 'Âm Thổ', 
    'Đẩu Quân': 'Âm Hỏa'
};