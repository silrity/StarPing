// Thuật toán an sao Tử Vi (Bước nhảy vòng lặp)
function timTuVi(cuc, ngay) {
    let cungDan = 3, c = cuc;
    while (c < ngay) { c += cuc; cungDan++; }
    let diff = c - ngay;
    if (diff % 2 !== 0) diff = -diff; 
    return dich(cungDan, diff);
}

const tvP = timTuVi(cucSo, nn);
const tpP = _KT(18 - tvP); // Thiên Phủ đối xứng Tử Vi

const CHINH_TINH = [
    [tvP, 'Tử Vi'], [dich(tvP, 4), 'Liêm Trinh'], [dich(tvP, 7), 'Thiên Đồng'], 
    [dich(tvP, 8), 'Vũ Khúc'], [dich(tvP, 9), 'Thái Dương'], [dich(tvP, 11), 'Thiên Cơ'],
    [tpP, 'Thiên Phủ'], [dich(tpP, 1), 'Thái Âm'], [dich(tpP, 2), 'Tham Lang'], 
    [dich(tpP, 3), 'Cự Môn'], [dich(tpP, 4), 'Thiên Tướng'], [dich(tpP, 5), 'Thiên Lương'], 
    [dich(tpP, 6), 'Thất Sát'], [dich(tpP, 10), 'Phá Quân']
];
for(const [pos, name] of CHINH_TINH) add(pos, name, 'chinh');

// Tứ Hóa (Dựa vào tọa độ của 14 chính tinh vừa an)
const mapHoa = {
    1: [dich(tvP,4), dich(tpP,10), dich(tvP,8), dich(tvP,9)],    // Giáp: Liêm, Phá, Vũ, Nhật
    2: [dich(tvP,11), dich(tpP,5), tvP, dich(tpP,1)],            // Ất: Cơ, Lương, Vi, Âm
    3: [dich(tvP,7), dich(tvP,11), dich(2, 2 - dich(5, gs-1)), dich(tvP,4)], // Bính: Đồng, Cơ, Xương, Liêm
    4: [dich(tpP,1), dich(tvP,7), dich(tvP,11), dich(tpP,3)],    // Đinh: Âm, Đồng, Cơ, Cự
    5: [dich(tpP,2), dich(tpP,1), dich(2, 2 - dich(5, tt-1)), dich(tvP,11)], // Mậu: Tham, Âm, Bật, Cơ
    6: [dich(tvP,8), dich(tpP,2), dich(tpP,5), dich(5, gs-1)],   // Kỷ: Vũ, Tham, Lương, Khúc
    7: [dich(tvP,9), dich(tvP,8), dich(tpP,1), dich(tvP,7)],     // Canh: Nhật, Vũ, Âm, Đồng
    8: [dich(tpP,3), dich(tvP,9), dich(5, gs-1), dich(2, 2 - dich(5, gs-1))], // Tân: Cự, Nhật, Khúc, Xương
    9: [dich(tpP,5), tvP, tpP, dich(tvP,8)],                     // Nhâm: Lương, Vi, Phủ, Vũ
    10: [dich(tpP,10), dich(tpP,3), dich(tpP,1), dich(tpP,2)]    // Quý: Phá, Cự, Âm, Tham
};
mapHoa[cn].forEach((p, i) => add(p, ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'][i], ['s-loc','s-quyen','s-khoa','s-ky'][i]));