# ĐVTT — Tử Vi Algorithm Specification

> **Đây là nguồn sự thật duy nhất (single source of truth) cho thuật toán.**
> Trích xuất trực tiếp từ `docs/demo_laso_tuvi.html` (code đã chạy đúng, đã verify).
> Mọi implementation (Supabase Edge Function, backend API) phải tuân theo đặc tả này.
> Cập nhật: 06/2026

---

## MỤC LỤC

1. [Quy ước & Hàm tiện ích](#1-quy-ước--hàm-tiện-ích)
2. [Bảng tra Can / Chi](#2-bảng-tra-can--chi)
3. [Đổi lịch Dương → Âm (sol2lun)](#3-đổi-lịch-dương--âm-sol2lun)
4. [Can Chi năm sinh](#4-can-chi-năm-sinh)
5. [Ngũ Hổ Độn — Can cung & Can tháng](#5-ngũ-hổ-độn--can-cung--can-tháng)
6. [Cung Mệnh & Cung Thân](#6-cung-mệnh--cung-thân)
7. [Ngũ Hành Cục (Cục Số)](#7-ngũ-hành-cục-cục-số)
8. [14 Chính Tinh](#8-14-chính-tinh)
9. [Tứ Hóa](#9-tứ-hóa)
10. [Sát Tinh](#10-sát-tinh)
11. [Trợ Tinh (Lục Cát + Lộc Tồn)](#11-trợ-tinh-lục-cát--lộc-tồn)
12. [Phi Tinh theo Chi Năm](#12-phi-tinh-theo-chi-năm)
13. [Phi Tinh theo Can Năm](#13-phi-tinh-theo-can-năm)
14. [Phi Tinh theo Tháng Sinh](#14-phi-tinh-theo-tháng-sinh)
15. [Phi Tinh theo Ngày Sinh](#15-phi-tinh-theo-ngày-sinh)
16. [Phi Tinh theo Giờ Sinh](#16-phi-tinh-theo-giờ-sinh)
17. [Phi Tinh từ Mệnh / Thân / Cố Định](#17-phi-tinh-từ-mệnh--thân--cố-định)
18. [Phi Tinh Phức Hợp](#18-phi-tinh-phức-hợp)
19. [Vòng Bác Sĩ](#19-vòng-bác-sĩ)
20. [Vòng Tràng Sinh](#20-vòng-tràng-sinh)
21. [Tuần Trung (Tuần Không)](#21-tuần-trung-tuần-không)
22. [Triệt Lộ](#22-triệt-lộ)
23. [Thiên La / Địa Võng](#23-thiên-la--địa-võng)
24. [Đại Hạn](#24-đại-hạn)
25. [Tiểu Hạn](#25-tiểu-hạn)
26. [Lưu Phi Tinh (Lưu Năm / Lưu Tháng)](#26-lưu-phi-tinh-lưu-năm--lưu-tháng)
27. [Tứ Trụ (Can Chi 4 cột)](#27-tứ-trụ-can-chi-4-cột)
28. [Trạng Thái Chính Tinh (Miếu/Vượng/Đắc/Bình/Hãm)](#28-trạng-thái-chính-tinh-miếuvượngđắcbìnhhãm)
29. [Ngũ Hành & Âm Dương của từng Sao](#29-ngũ-hành--âm-dương-của-từng-sao)
30. [Bố Cục Lưới 4×4 (Grid Positions)](#30-bố-cục-lưới-44-grid-positions)
31. [Test Case Chuẩn](#31-test-case-chuẩn)

---

## 1. Quy ước & Hàm tiện ích

### 1.1 Địa chi — đánh số 1–12

| Số | Chi | Giờ |
|---|---|---|
| 1 | Tý | 23:00–01:00 |
| 2 | Sửu | 01:00–03:00 |
| 3 | Dần | 03:00–05:00 |
| 4 | Mão | 05:00–07:00 |
| 5 | Thìn | 07:00–09:00 |
| 6 | Tỵ | 09:00–11:00 |
| 7 | Ngọ | 11:00–13:00 |
| 8 | Mùi | 13:00–15:00 |
| 9 | Thân | 15:00–17:00 |
| 10 | Dậu | 17:00–19:00 |
| 11 | Tuất | 19:00–21:00 |
| 12 | Hợi | 21:00–23:00 |

> **Input `birth_hour_chi`** nhận giá trị 1–12 theo bảng trên.
> Mapping từ giờ người dùng nhập (0–23) sang chi:
> `23,0→1 | 1,2→2 | 3,4→3 | 5,6→4 | 7,8→5 | 9,10→6 | 11,12→7 | 13,14→8 | 15,16→9 | 17,18→10 | 19,20→11 | 21,22→12`

### 1.2 Hàm `dich` — phép tịnh tiến trên vòng 12 cung

```typescript
// Vòng tròn 1–12 (không phải 0–11)
function dich(start: number, ...offsets: number[]): number {
  let r = Math.round(start);
  for (const v of offsets) r += Math.round(v);
  r = r % 12;
  return r <= 0 ? r + 12 : r;
}
```

Ví dụ: `dich(1, -2) = 11`, `dich(12, 1) = 1`, `dich(5, 7) = 12`

### 1.3 Hàm `_KT` — modulo 1–12 (không dùng offsets)

```typescript
function _KT(t: number): number {
  while (t > 12) t -= 12;
  while (t <= 0) t += 12;
  return t;
}
```

Tương đương `dich(t)` với không có offset. Dùng cho Cung Mệnh/Thân và Thiên Phủ.

### 1.4 Âm Dương Can

```typescript
const amDuongCan = (can: number): 1 | -1 => can % 2 === 1 ? 1 : -1;
// Can lẻ (Giáp, Bính, Mậu, Canh, Nhâm) = Dương = 1
// Can chẵn (Ất, Đinh, Kỷ, Tân, Quý)  = Âm = -1
```

---

## 2. Bảng tra Can / Chi

```typescript
const CAN = ['','Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
// index 1–10

const CHI = ['','Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
// index 1–12

const CUNG = ['','Mệnh','Phụ Mẫu','Phúc Đức','Điền Trạch','Quan Lộc',
              'Nô Bộc','Thiên Di','Tật Ách','Tài Bạch','Tử Tức','Phu Thê','Huynh Đệ'];
// index 1–12: từ Mệnh, đếm NGHỊCH (Mệnh→Huynh Đệ→Phu Thê→... theo chiều thuận chi)
```

**Thứ tự 12 cung từ Mệnh (nghịch chiều):**
Mệnh → Phụ Mẫu → Phúc Đức → Điền Trạch → Quan Lộc → Nô Bộc → Thiên Di → Tật Ách → Tài Bạch → Tử Tức → Phu Thê → Huynh Đệ

---

## 3. Đổi lịch Dương → Âm (sol2lun)

> ⚠️ **CRITICAL**: Hàm này phải giữ nguyên `tz = 7` (GMT+7). Môi trường Deno/Node chạy UTC — nếu không bù múi giờ, ngày sóc (New Moon) sẽ lệch và TOÀN BỘ lá số sai.

```typescript
// ═══════════════════════════════════════════════════════
// Nguồn: thuật toán Tử Vi Huỳnh Bá Duy, bù GMT+7
// Xác nhận: 22/04/1985 DL = 03/03/1985 ÂL (không nhuận) ✓
// ═══════════════════════════════════════════════════════

const PI = Math.PI;

function floor(t: number): number { return Math.floor(t); }

// Julian Day Number từ ngày Dương lịch
function jdn(d: number, m: number, y: number): number {
  let i, l, o, r;
  i = y + 4800 - (l = floor((14 - m) / 12));
  r = d + floor((153 * (o = m + 12 * l - 3) + 2) / 5)
      + 365 * i + floor(i / 4) - floor(i / 100) + floor(i / 400) - 32045;
  if (r < 2299161)
    r = d + floor((153 * o + 2) / 5) + 365 * i + floor(i / 4) - 32083;
  return r;
}

// Kinh độ mặt trời (tính sector 0–11, chia 30° mỗi sector)
function sunLong(jd: number, tz: number): number {
  const e = (jd - 0.5 - tz / 24 - 2451545) / 36525;
  const l = e * e;
  const i = PI / 180;
  const o = 357.5291 + 35999.0503 * e - 1559e-7 * l - 4.8e-7 * e * l;
  let r = 280.46645 + 36000.76983 * e + 3032e-7 * l
      + ((1.9146 - 0.004817 * e - 14e-6 * l) * Math.sin(i * o)
      + (0.019993 - 101e-6 * e) * Math.sin(2 * i * o)
      + 29e-5 * Math.sin(3 * i * o));
  r *= i;
  r -= 2 * PI * floor(r / (2 * PI));
  return floor(r / PI);   // 0 = Xuân Phân sector, hoặc ≥ 9 = tháng 11 (Đại Tuyết sector)
}

// Julian Day của điểm Sóc thứ k (tính từ J2000)
function newMoon(k: number): number {
  const n = k / 1236.85, e = n * n, l = e * n;
  const i = PI / 180;
  let o = 2415020.75933 + 29.53058868 * k + 1178e-7 * e - 1.55e-7 * l;
  o += 33e-5 * Math.sin((166.56 + 132.87 * n - 0.009173 * e) * i);
  const r = 359.2242 + 29.10535608 * k - 333e-7 * e - 347e-8 * l;
  const a = 306.0253 + 385.81691806 * k + 0.0107306 * e + 1236e-8 * l;
  const u = 21.2964 + 390.67050646 * k - 0.0016528 * e - 239e-8 * l;
  const s = (0.1734 - 393e-6 * n) * Math.sin(r * i)
      + 0.0021 * Math.sin(2 * i * r)
      - 0.4068 * Math.sin(a * i) + 0.0161 * Math.sin(2 * i * a) - 4e-4 * Math.sin(3 * i * a)
      + 0.0104 * Math.sin(2 * i * u) - 0.0051 * Math.sin(i * (r + a)) - 0.0074 * Math.sin(i * (r - a))
      + 4e-4 * Math.sin(i * (2 * u + r)) - 4e-4 * Math.sin(i * (2 * u - r))
      - 6e-4 * Math.sin(i * (2 * u + a)) + 0.001 * Math.sin(i * (2 * u - a))
      + 5e-4 * Math.sin(i * (2 * a + r));
  const dt = n < -11
      ? 0.001 + 839e-6 * n + 2261e-7 * e - 845e-8 * l - 8.1e-8 * n * l
      : 265e-6 * n - 278e-6 + 262e-6 * e;
  return o + s - dt;
}

// Julian Day của Sóc k, bù múi giờ (tz=7 cho Việt Nam)
function adjustedNewMoon(k: number, tz: number): number {
  return floor(newMoon(k) + 0.5 + tz / 24);  // ← BÙ GMT+7 TẠI ĐÂY
}

// Tìm ngày Sóc tháng 11 Âm lịch của năm yy
function getLM11(yy: number, tz: number): number {
  const k = floor((jdn(31, 12, yy) - 2415021) / 29.530588853);
  let nm = adjustedNewMoon(k, tz);
  if (sunLong(nm, tz) >= 9) nm = adjustedNewMoon(k - 1, tz);
  return nm;
}

// Tìm offset tháng nhuận trong chu kỳ từ tháng 11
function getLeapOffset(a11: number, tz: number): number {
  const k = floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0, i = 1;
  let arc = sunLong(adjustedNewMoon(k + i, tz), tz);
  do {
    last = arc; i++;
    arc = sunLong(adjustedNewMoon(k + i, tz), tz);
  } while (arc !== last && i < 14);
  return i - 1;
}

// MAIN: đổi ngày Dương lịch → Âm lịch
function sol2lun(dd: number, mm: number, yy: number): { d: number; m: number; y: number; leap: number } {
  const tz = 7;
  const o = jdn(dd, mm, yy);
  const i = floor((o - 2415021.076998695) / 29.530588853);
  let r = adjustedNewMoon(i + 1, tz);
  if (r > o) r = adjustedNewMoon(i, tz);

  let a11 = getLM11(yy, tz), b11 = a11, ly: number;
  if (a11 >= r) {
    ly = yy;
    a11 = getLM11(yy - 1, tz);
  } else {
    ly = yy + 1;
    b11 = getLM11(yy + 1, tz);
  }

  const ld = o - r + 1;              // ngày âm lịch
  const diff = floor((r - a11) / 29);
  let lm = diff + 11;                // tháng âm lịch (thô)
  let ll = 0;                        // 0 = bình, 1 = nhuận

  if (b11 - a11 > 365) {
    const lo = getLeapOffset(a11, tz);
    if (diff >= lo) {
      lm = diff + 10;
      if (diff === lo) ll = 1;        // đây là tháng nhuận
    }
  }

  if (lm > 12) lm -= 12;
  if (lm >= 11 && diff < 4) ly--;

  return { d: ld, m: lm, y: ly, leap: ll };
}
```

**Output:** `{ d: ngày âm, m: tháng âm, y: năm âm, leap: 0|1 }`

---

## 4. Can Chi năm sinh

Dùng năm Âm lịch (`lun.y`) từ `sol2lun`:

```typescript
function canNam(y: number): number { return (y + 6) % 10 + 1; }  // 1–10
function chiNam(y: number): number { return (y + 8) % 12 + 1; }  // 1–12
```

Ví dụ kiểm tra:
- 1985 → canNam(1985) = (1991)%10+1 = 1+1 = 2 → **Ất** ✓ (năm Ất Sửu 1985)
  
  Wait: (1985+6)%10+1 = 1991%10+1 = 1+1 = 2 ✓ Ất

- 1985 → chiNam(1985) = (1985+8)%12+1 = 1993%12+1 = 1+1 = 2 → **Sửu** ✓

**Âm Dương Can năm:**
```typescript
const adNam = canNam(y) % 2 === 1 ? 1 : -1;  // 1=Dương, -1=Âm
```

---

## 5. Ngũ Hổ Độn — Can cung & Can tháng

### 5.1 Can tháng âm lịch (Ngũ Hổ Độn)

```typescript
// Tháng 1 Âm lịch (Dần) có can khởi theo can năm:
// Giáp/Kỷ → Bính(3) | Ất/Canh → Mậu(5) | Bính/Tân → Canh(7)
// Đinh/Nhâm → Nhâm(9) | Mậu/Quý → Giáp(1)

const START_CAN_THANG = [0, 3, 5, 7, 9, 1, 3, 5, 7, 9, 1];
// index = canNam (1–10)

function canThang(canNam: number, thangAm: number): number {
  const can = (START_CAN_THANG[canNam] + thangAm - 1) % 10;
  return can === 0 ? 10 : can;
}
```

Ví dụ: canNam=1(Giáp), tháng 3 → (3+2)%10 = 5 → **Mậu** (tháng 3 năm Giáp là Mậu Thìn) ✓

### 5.2 Chi tháng âm lịch

```typescript
function chiThang(thangAm: number): number {
  const chi = (thangAm + 2) % 12;
  return chi === 0 ? 12 : chi;
  // Tháng 1 → Dần(3), Tháng 2 → Mão(4), ..., Tháng 11 → Tý(1), Tháng 12 → Sửu(2)
}
```

### 5.3 Can của cung (Ngũ Hổ Độn Niên)

Mỗi cung có Địa Chi (1–12). Can của cung được tính bằng cách quy cung về số tháng âm lịch tương ứng:

```typescript
function canCung(canNamSinh: number, chiCung: number): number {
  // Chi 3(Dần)=tháng 1, chi 4(Mão)=tháng 2, ..., chi 2(Sửu)=tháng 12
  const thang = ((chiCung - 2 + 12) % 12) || 12;
  return canThang(canNamSinh, thang);
}
```

---

## 6. Cung Mệnh & Cung Thân

```typescript
// tt = tháng âm lịch (lun.m), gs = birth_hour_chi (1–12)
const cMenh = _KT(tt - gs + 3);   // Khởi Dần(3), đếm thuận tháng, nghịch giờ
const cThan  = _KT(tt + gs + 1);   // Khởi Dần(3), đếm thuận tháng, thuận giờ
```

**Bảng Thân cư cố định theo giờ sinh:**

| Giờ sinh | Cung Thân | Ý nghĩa |
|---|---|---|
| Tý(1), Ngọ(7) | Cùng Mệnh | Độc lập, tự lực |
| Sửu(2), Mùi(8) | Phúc Đức | Ảnh hưởng tổ tiên |
| Dần(3), Thân(9) | Quan Lộc | Đặt sự nghiệp lên đầu |
| Mão(4), Dậu(10) | Thiên Di | Hướng ngoại, hay dịch chuyển |
| Thìn(5), Tuất(11) | Tài Bạch | Thực tế, coi trọng tài chính |
| Tỵ(6), Hợi(12) | Phu Thê | Nặng tình, phụ thuộc bạn đời |

**Xác nhận:** tt=3(tháng 3 ÂL), gs=5(giờ Thìn) → cMenh=_KT(3-5+3)=_KT(1)=1(Tý) ✓, cThan=_KT(3+5+1)=_KT(9)=9(Thân) ✓

---

## 7. Ngũ Hành Cục (Cục Số)

**Bài thơ Ngũ Hành — ma trận tra cứu:**

```typescript
// Mỗi hàng = 1 nhóm Can (theo rowIdx = (canNam-1) % 5)
// Mỗi cột = nhóm 2 chi (wordIdx = floor((chiMenh-1)/2), ngoại trừ Tuất/Hợi=1)
const CUC_MATRIX = [
  ['Thủy','Hỏa','Mộc','Thổ','Kim'],  // row 0: Giáp(1)/Kỷ(6)
  ['Hỏa','Thổ','Kim','Mộc','Thủy'],  // row 1: Ất(2)/Canh(7)
  ['Thổ','Mộc','Thủy','Kim','Hỏa'],  // row 2: Bính(3)/Tân(8)
  ['Mộc','Kim','Hỏa','Thủy','Thổ'],  // row 3: Đinh(4)/Nhâm(9)
  ['Kim','Thủy','Thổ','Hỏa','Mộc'],  // row 4: Mậu(5)/Quý(10)
];

const HANH_TO_CUC: Record<string, number> = {
  'Thủy': 2, 'Mộc': 3, 'Kim': 4, 'Thổ': 5, 'Hỏa': 6
};

const CUC_NAME: Record<number, string> = {
  2: 'Thủy nhị Cục', 3: 'Mộc tam Cục', 4: 'Kim tứ Cục',
  5: 'Thổ ngũ Cục',  6: 'Hỏa lục Cục'
};

function tinhCuc(canNam: number, chiMenh: number): number {
  const rowIdx  = (canNam - 1) % 5;
  // Tuất(11) và Hợi(12) → dùng wordIdx của Dần(3) = 1
  const wordIdx = (chiMenh === 11 || chiMenh === 12)
      ? 1
      : Math.floor((chiMenh - 1) / 2);
  return HANH_TO_CUC[CUC_MATRIX[rowIdx][wordIdx]] ?? 2;
}
```

**Bảng tra wordIdx theo Chi Mệnh:**

| Chi Mệnh | wordIdx |
|---|---|
| Tý(1), Sửu(2) | 0 |
| Dần(3), Mão(4) | 1 |
| Thìn(5), Tỵ(6) | 2 |
| Ngọ(7), Mùi(8) | 3 |
| Thân(9), Dậu(10) | 4 |
| **Tuất(11), Hợi(12)** | **1** ← ngoại lệ |

**Xác nhận:** Quý(10)+Ngọ(7) → rowIdx=4, wordIdx=3 → `CUC_MATRIX[4][3]`=Hỏa → **Hỏa lục Cục(6)** ✓

---

## 8. 14 Chính Tinh

### 8.1 Tìm vị trí Tử Vi (thuật toán chia/mượn)

```typescript
// cucSo: cục số (2–6); ngayAm: ngày sinh âm lịch (1–30)
// Xác nhận: cucSo=6, ngayAm=3 → mượn 3(lẻ), thương=1, cungTam=Dần, lùi 3 → Hợi(12) ✓
function timTuVi(cucSo: number, ngayAm: number): number {
  if (ngayAm % cucSo === 0) {
    // Chia hết: từ Dần(3), đếm thuận thương bước
    return dich(3, ngayAm / cucSo - 1);
  }
  const soMuon  = cucSo - (ngayAm % cucSo);
  const thuong  = (ngayAm + soMuon) / cucSo;
  const cungTam = dich(3, thuong - 1);
  // Số mượn lẻ → lùi; chẵn → tiến
  return soMuon % 2 === 1
      ? dich(cungTam, -soMuon)
      : dich(cungTam,  soMuon);
}
```

### 8.2 Vòng Tử Vi (nghịch từ tvP)

```typescript
const tvP    = timTuVi(cucSo, nn);   // Tử Vi
const ltP    = dich(tvP, 4);          // Liêm Trinh  (tvP +4 nghịch)
const tdP    = dich(tvP, 7);          // Thiên Đồng  (tvP +7 nghịch)
const vkP    = dich(tvP, 8);          // Vũ Khúc     (tvP +8 nghịch)
const tduP   = dich(tvP, 9);          // Thái Dương   (tvP +9 nghịch)
const tkP    = dich(tvP, 11);         // Thiên Cơ    (tvP +11 nghịch)
```

> Quy tắc: Tử Vi → Thiên Cơ → (bỏ 1) → Thái Dương → Vũ Khúc → Thiên Đồng → (bỏ 2) → Liêm Trinh.
> Các sao đếm NGHỊCH nên tương đương `dich(tvP, offset)` với offset dương = đi ngược.

**Bảng offset vòng Tử Vi:**

| Sao | Offset từ tvP |
|---|---|
| Tử Vi | 0 |
| Thiên Cơ | +11 (hoặc -1) |
| (bỏ trống) | — |
| Thái Dương | +9 (hoặc -3) |
| Vũ Khúc | +8 (hoặc -4) |
| Thiên Đồng | +7 (hoặc -5) |
| (bỏ 2 cung) | — |
| Liêm Trinh | +4 (hoặc -8) |

### 8.3 Thiên Phủ và Vòng Thiên Phủ (thuận từ tpP)

```typescript
// Thiên Phủ đối xứng với Tử Vi qua trục Dần(3)–Thân(9): tvP + tpP = 18
const tpP    = _KT(18 - tvP);         // Thiên Phủ
const taP    = dich(tpP, 1);           // Thái Âm
const tlangP = dich(tpP, 2);           // Tham Lang
const cmP    = dich(tpP, 3);           // Cự Môn
const ttuP   = dich(tpP, 4);           // Thiên Tướng
const tluP   = dich(tpP, 5);           // Thiên Lương
const tsatP  = dich(tpP, 6);           // Thất Sát
// (bỏ 3 cung: +7, +8, +9)
const pqP    = dich(tpP, 10);          // Phá Quân
```

**Bảng offset vòng Thiên Phủ:**

| Sao | Offset từ tpP |
|---|---|
| Thiên Phủ | 0 |
| Thái Âm | +1 |
| Tham Lang | +2 |
| Cự Môn | +3 |
| Thiên Tướng | +4 |
| Thiên Lương | +5 |
| Thất Sát | +6 |
| (bỏ 3 cung) | — |
| Phá Quân | +10 |

**Xác nhận:** tvP=12(Hợi) → tpP=_KT(18-12)=6(Tỵ). Và 12+6=18 ✓.

---

## 9. Tứ Hóa

Tứ Hóa gắn vào **vị trí của chính tinh** tương ứng theo Can năm sinh (cn):

```typescript
// Thứ tự: [Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ]
// Giá trị = vị trí chi của chính tinh đó

const TU_HOA: Record<number, [number, number, number, number]> = {
  1:  [ltP,     pqP,      vkP,       tduP],     // Giáp:  Liêm·Phá·Vũ·Nhật
  2:  [tkP,     tluP,     tvP,       taP],      // Ất:    Cơ·Lương·Tử·Âm
  3:  [tdP,     tkP,      vanXuongP, ltP],      // Bính:  Đồng·Cơ·Xương·Liêm
  4:  [taP,     tdP,      tkP,       cmP],      // Đinh:  Âm·Đồng·Cơ·Cự
  5:  [tlangP,  taP,      huuBatP,   tkP],      // Mậu:   Lang·Âm·Bật·Cơ
  6:  [vkP,     tlangP,   tluP,      vanKhucP], // Kỷ:    Vũ·Lang·Lương·Khúc
  7:  [tduP,    vkP,      taP,       tdP],      // Canh:  Nhật·Vũ·Âm·Đồng
  8:  [cmP,     tduP,     vanKhucP,  vanXuongP],// Tân:   Cự·Nhật·Khúc·Xương
  9:  [tluP,    tvP,      tpP,       vkP],      // Nhâm:  Lương·Tử·Phủ·Vũ
  10: [pqP,     cmP,      taP,       tlangP],   // Quý:   Phá·Cự·Âm·Lang
};
```

Gắn Tứ Hóa vào cung: mỗi vị trí trong mảng trên là chi của cung chứa chính tinh đó.

---

## 10. Sát Tinh

### 10.1 Kình Dương & Đà La

```typescript
// locTonPos: vị trí Lộc Tồn theo can năm sinh
const LOC_TON_POS = [0, 3, 4, 6, 7, 6, 7, 9, 10, 12, 1];
// index 1–10 (Giáp→Dần, Ất→Mão, Bính/Mậu→Tỵ, Đinh/Kỷ→Ngọ, Canh→Thân, Tân→Dậu, Nhâm→Hợi, Quý→Tý)

const ltPos   = LOC_TON_POS[cn];
const dalaP   = dich(ltPos, -1);   // Đà La  = Lộc Tồn - 1
const kinhP   = dich(ltPos,  1);   // Kình Dương = Lộc Tồn + 1
```

### 10.2 Hỏa Tinh & Linh Tinh

```typescript
// adNam = amDuongCan(canNamSinh)  → 1(Dương) hoặc -1(Âm)
// gt = 1(Nam) hoặc -1(Nữ)
// Chiều: dir = gt * adNam

function hoaLinhPos(
  chiNamSinh: number,
  gioSinh: number,
  gt: number,
  adNam: number
): [number, number] {
  // Nhóm chi năm → cặp [khởi Hỏa, khởi Linh]
  const grp = [3, 7, 11].includes(chiNamSinh) ? [2, 4]
            : [1, 5, 9].includes(chiNamSinh)  ? [3, 11]
            : [6, 10, 2].includes(chiNamSinh) ? [4, 11]
            : [10, 11];  // 12,4,8 (Hợi/Mão/Mùi)

  const dir = gt * adNam;
  if (dir === -1) {
    // Nam+Can Âm / Nữ+Can Dương
    return [dich(grp[0] + 1, -gioSinh), dich(grp[1] - 1, gioSinh)];
  } else {
    // Nam+Can Dương / Nữ+Can Âm
    return [dich(grp[0] - 1, gioSinh), dich(grp[1] + 1, -gioSinh)];
  }
}

const [hoaTinhP, linhTinhP] = hoaLinhPos(chiN, gs, gt, adNam);
```

**Bảng khởi điểm theo chi năm:**

| Nhóm chi năm | grp[0] | grp[1] |
|---|---|---|
| Dần(3)/Ngọ(7)/Tuất(11) | 2(Sửu) | 4(Mão) |
| Thân(9)/Tý(1)/Thìn(5) | 3(Dần) | 11(Tuất) |
| Tỵ(6)/Dậu(10)/Sửu(2) | 4(Mão) | 11(Tuất) |
| Hợi(12)/Mão(4)/Mùi(8) | 10(Dậu) | 11(Tuất) |

### 10.3 Địa Kiếp & Địa Không

```typescript
const dKiepP  = dich(12, gs - 1);   // Khởi Hợi(12), đi THUẬN theo giờ
const dKhongP = dich(12, -(gs - 1)); // Khởi Hợi(12), đi NGHỊCH theo giờ
```

### 10.4 Kiếp Sát

```typescript
const KIEP_SAT_MAP: Record<number, number> = {
  1: 6, 2: 3, 3: 12, 4: 9, 5: 6, 6: 3, 7: 12, 8: 9, 9: 6, 10: 3, 11: 12, 12: 9
};
const kiepSatP = KIEP_SAT_MAP[chiN];
```

### 10.5 Thiên Thương & Thiên Sứ

```typescript
const thienThuongP = dich(cMenh, 5);  // Nô Bộc = Mệnh + 5 cung nghịch
const thienSuP     = dich(cMenh, 7);  // Tật Ách = Mệnh + 7 cung nghịch
```

### 10.6 Thiên Hình

```typescript
const thienHinhP = dich(10, tt - 1);  // Khởi Dậu(10), thuận theo tháng âm
```

### 10.7 Thiên Riêu

```typescript
// Đồng cung Thiên Y (xem mục 14)
const thienRieuP = dich(2, tt - 1);   // Khởi Sửu(2), thuận tháng âm
```

---

## 11. Trợ Tinh (Lục Cát + Lộc Tồn)

### 11.1 Lộc Tồn

```typescript
const locTonP = LOC_TON_POS[cn];   // Tra bảng theo can năm sinh (xem mục 10.1)
```

### 11.2 Văn Khúc & Văn Xương

```typescript
// gs = birth_hour_chi (1–12)
const vanKhucP  = dich(5, gs - 1);         // Khởi Thìn(5), THUẬN theo giờ
const vanXuongP = dich(11, -(gs - 1));     // Khởi Tuất(11), NGHỊCH theo giờ
```

> Công thức tương đương trong code: `vanXuongP = dich(2, 2 - vanKhucP)`
> Xác nhận: gs=5(Thìn) → vanKhucP=dich(5,4)=9(Thân) ✓, vanXuongP=dich(11,-4)=7(Ngọ) ✓

### 11.3 Tả Phù & Hữu Bật

```typescript
// tt = tháng âm lịch (1–12)
const taPhuP  = dich(5, tt - 1);           // Khởi Thìn(5), thuận tháng
const huuBatP = dich(11, -(tt - 1));       // Khởi Tuất(11), nghịch tháng
```

### 11.4 Thiên Khôi & Thiên Việt

```typescript
const MAP_KHOI = [0, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
// index 1–10 (Giáp→Sửu, Ất→Tý, Bính/Kỷ→Hợi, Đinh→Dậu, Mậu→Mùi, Canh→Mùi, Tân→Ngọ, Nhâm→Tỵ, Quý→Mão)

const MAP_VIET = [0, 8, 9, 10, 12, 2, 9, 2, 3, 4, 6];
// index 1–10 (Giáp→Mùi, Ất→Thân, Bính→Dậu, Đinh→Hợi, Mậu→Sửu, Kỷ→Thân, Canh→Sửu, Tân→Dần, Nhâm→Mão, Quý→Tỵ)

const khoiP = MAP_KHOI[cn];
const vietP = MAP_VIET[cn];   // = dich(5, 5 - khoiP)
```

### 11.5 Thiên Quan & Thiên Phúc

```typescript
const T_QUAN_MAP = [0, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
// Giáp→Mùi(8), Ất→Thìn(5), Bính→Tỵ(6), Đinh→Dần(3), Mậu→Mão(4), Kỷ→Dậu(10), Canh→Hợi(12), Tân→Dậu(10), Nhâm→Tuất(11), Quý→Ngọ(7)

const T_PHUC_MAP = [0, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
// Giáp→Dậu(10), Ất→Thân(9)... (index = cn)

const thienQuanP = T_QUAN_MAP[cn];
const thienPhucP = T_PHUC_MAP[cn];
```

---

## 12. Phi Tinh theo Chi Năm

### 12.1 Vòng Thái Tuế (12 sao, thuận từ chi năm sinh)

```typescript
const THAI_TUE_NAMES = [
  'Thái Tuế','Thiếu Dương','Tang Môn','Thiếu Âm',
  'Quan Phù','Tử Phù','Tuế Phá','Long Đức',
  'Bạch Hổ','Phúc Đức','Điếu Khách','Trực Phù'
];

// Sao i an tại: dich(chiN, i)
for (let i = 0; i < 12; i++) {
  palace[dich(chiN, i)].stars.push(THAI_TUE_NAMES[i]);
}
```

### 12.2 Hồng Loan & Thiên Hỉ

```typescript
const hongLoanP = dich(4, -(chiN - 1));   // Khởi Mão(4), NGHỊCH theo chi năm
const thienHiP  = dich(hongLoanP, 6);     // Luôn xung chiếu Hồng Loan
```

### 12.3 Đào Hoa

```typescript
const DAO_HOA_MAP: Record<number, number> = {
  1: 10, 5: 10, 9: 10,   // Tý/Thìn/Thân (Tam hợp Thủy) → Dậu(10)
  3:  4, 7:  4, 11: 4,   // Dần/Ngọ/Tuất (Tam hợp Hỏa) → Mão(4)
  6:  7, 10: 7,  2: 7,   // Tỵ/Dậu/Sửu  (Tam hợp Kim) → Ngọ(7)
  12: 1,  4: 1,  8: 1,   // Hợi/Mão/Mùi (Tam hợp Mộc) → Tý(1)
};
const daoPhoaP = DAO_HOA_MAP[chiN];
```

### 12.4 Thiên Mã

```typescript
const THIEN_MA_MAP: Record<number, number> = {
  3: 9, 7: 9, 11: 9,    // Dần/Ngọ/Tuất → Thân(9)
  9: 3, 1: 3,  5: 3,    // Thân/Tý/Thìn → Dần(3)
  6: 12, 10: 12, 2: 12, // Tỵ/Dậu/Sửu  → Hợi(12)
  12: 6,  4: 6,  8: 6,  // Hợi/Mão/Mùi → Tỵ(6)
};
const thienMaP = THIEN_MA_MAP[chiN];
```

### 12.5 Thiên Khốc & Thiên Hư

```typescript
// Cùng khởi Ngọ(7) khi chiN=1(Tý); Khốc nghịch, Hư thuận
const thienKhocP = dich(7, -(chiN - 1));  // Ngọ(7), NGHỊCH theo chi năm
const thienHuP   = dich(7,   chiN - 1);   // Ngọ(7), THUẬN theo chi năm

// Xác nhận năm Bính Ngọ 2026 (chiN=7): Khốc=dich(7,-6)=1(Tý), Hư=dich(7,6)=1(Tý) ✓ (đồng cung)
```

### 12.6 Cô Thần & Quả Tú

```typescript
function coThanPos(chiN: number): number {
  if ([12, 1, 2].includes(chiN)) return 3;   // Hợi/Tý/Sửu → Dần(3)
  if ([3, 4, 5].includes(chiN))  return 6;   // Dần/Mão/Thìn → Tỵ(6)
  if ([6, 7, 8].includes(chiN))  return 9;   // Tỵ/Ngọ/Mùi → Thân(9)
  return 12;                                  // Thân/Dậu/Tuất → Hợi(12)
}

const coThanP = coThanPos(chiN);
const quaTuP  = dich(coThanP, -4);   // Quả Tú luôn lùi 4 cung so với Cô Thần
```

**Bảng Cô Thần/Quả Tú:**

| Mùa năm | Chi năm | Cô Thần | Quả Tú |
|---|---|---|---|
| Đông | Hợi(12)/Tý(1)/Sửu(2) | Dần(3) | Tuất(11) |
| Xuân | Dần(3)/Mão(4)/Thìn(5) | Tỵ(6) | Sửu(2) |
| Hạ | Tỵ(6)/Ngọ(7)/Mùi(8) | Thân(9) | Thìn(5) |
| Thu | Thân(9)/Dậu(10)/Tuất(11) | Hợi(12) | Mùi(8) |

### 12.7 Long Trì & Phượng Các & Giải Thần

```typescript
const longTriP    = dich(5,  chiN - 1);   // Khởi Thìn(5), thuận
const phuongCacP  = dich(11, -(chiN - 1)); // Khởi Tuất(11), nghịch
const giaiThanP   = phuongCacP;            // Đồng cung Phượng Các
```

### 12.8 Đường Phù

```typescript
const duongPhuP = dich(8, chiN - 1);   // Khởi Mùi(8), thuận theo chi năm
// Tý(1)→Mùi(8), Sửu(2)→Thân(9), Dần(3)→Dậu(10), ..., Hợi(12)→Ngọ(7)
```

### 12.9 Hoa Cái

```typescript
const HOA_CAI_MAP: Record<number, number> = {
  1: 5, 5: 5, 9: 5,    // Tý/Thìn/Thân → Thìn(5)
  3: 11, 7: 11, 11: 11, // Dần/Ngọ/Tuất → Tuất(11)
  6: 2, 10: 2, 2: 2,   // Tỵ/Dậu/Sửu  → Sửu(2)
  12: 8, 4: 8, 8: 8,   // Hợi/Mão/Mùi → Mùi(8)
};
const hoaCaiP = HOA_CAI_MAP[chiN];
```

### 12.10 Phá Toái

```typescript
const PHA_TOAI_MAP: Record<number, number> = {
  1: 6, 7: 6, 4: 6, 10: 6,  // Tý/Ngọ/Mão/Dậu → Tỵ(6)
  3: 10, 9: 10, 6: 10, 12: 10, // Dần/Thân/Tỵ/Hợi → Dậu(10)
  5: 2, 11: 2, 2: 2, 8: 2,   // Thìn/Tuất/Sửu/Mùi → Sửu(2)
};
const phaToaiP = PHA_TOAI_MAP[chiN];
```

### 12.11 Thiên Đức & Nguyệt Đức

```typescript
const thienDucP   = dich(10, chiN - 1);  // Khởi Dậu(10), thuận theo chi năm
const nguyetDucP  = dich(6,  chiN - 1);  // Khởi Tỵ(6), thuận theo chi năm
```

### 12.12 Thiên Không

```typescript
// Vị trí = Thiếu Dương = chiN + 1
const thienKhongP = dich(chiN, 1);
```

---

## 13. Phi Tinh theo Can Năm

### 13.1 Lộc Tồn — xem mục 11.1

### 13.2 Lưu Hà

```typescript
const LUU_HA_MAP = [0, 10, 11, 8, 9, 6, 7, 4, 5, 12, 1];
// Giáp→Dậu(10), Ất→Tuất(11), Bính→Mùi(8), Đinh→Thân(9), Mậu→Tỵ(6),
// Kỷ→Ngọ(7), Canh→Mão(4), Tân→Thìn(5), Nhâm→Hợi(12), Quý→Tý(1)

const luuHaP = LUU_HA_MAP[cn];
```

---

## 14. Phi Tinh theo Tháng Sinh

```typescript
// tt = tháng âm lịch sinh (1–12)

const taPhuP    = dich(5,  tt - 1);   // Tả Phù: Thìn(5), thuận tháng
const huuBatP   = dich(11, -(tt - 1)); // Hữu Bật: Tuất(11), nghịch tháng
const thienYP   = dich(2,  tt - 1);   // Thiên Y: Sửu(2), thuận tháng
const thienRieuP = thienYP;           // Thiên Riêu: đồng cung Thiên Y
const thienGiaiP = dich(9,  tt - 1);  // Thiên Giải: Thân(9), thuận tháng
const diaGiaiP   = dich(8,  tt - 1);  // Địa Giải: Mùi(8), thuận tháng
// Thiên Hình đã ở mục 10.6: dich(10, tt-1)
```

---

## 15. Phi Tinh theo Ngày Sinh

```typescript
// nn = ngày âm lịch sinh (1–30)

const tamThaiP = dich(5,    tt + nn - 2);   // Khởi Thìn(5), thuận theo tháng+ngày
const batToaP  = dich(11, -(tt + nn - 2));  // Khởi Tuất(11), nghịch

const anQuangP  = dich(vanXuongP,   nn - 2);  // Từ vị trí Văn Xương, thuận ngày
const thienQuyP = dich(vanKhucP,  -(nn - 2)); // Từ vị trí Văn Khúc, nghịch ngày
```

---

## 16. Phi Tinh theo Giờ Sinh

```typescript
// gs = birth_hour_chi (1–12)

// Văn Khúc/Văn Xương — đã ở mục 11.2
const vanKhucP  = dich(5,  gs - 1);   // Thìn(5), thuận giờ
const vanXuongP = dich(11, -(gs - 1));// Tuất(11), nghịch giờ

// Địa Kiếp / Địa Không — đã ở mục 10.3
const dKiepP  = dich(12,   gs - 1);  // Hợi(12), thuận giờ
const dKhongP = dich(12, -(gs - 1)); // Hợi(12), nghịch giờ

// Thai Phụ & Phong Cáo (từ Văn Khúc ±2)
const thaiPhuP  = dich(vanKhucP,  2);  // Văn Khúc + 2
const phongCaoP = dich(vanKhucP, -2);  // Văn Khúc - 2

// Hỏa Tinh / Linh Tinh — xem mục 10.2
```

---

## 17. Phi Tinh từ Mệnh / Thân / Cố Định

```typescript
// Từ Mệnh
const thienTaiP   = dich(cMenh, chiN - 1); // Thiên Tài: Khởi Mệnh, thuận chi năm
const thienThuongP = dich(cMenh, 5);       // Thiên Thương: Nô Bộc (cách 5)
const thienSuP     = dich(cMenh, 7);       // Thiên Sứ: Tật Ách (cách 7)

// Từ Thân
const thienThoP = dich(cThan, chiN - 1);   // Thiên Thọ: Khởi Thân, thuận chi năm

// Cố định
// Thiên La: luôn tại Thìn(5)  — không thêm vào danh sách sao, hiển thị badge riêng
// Địa Võng: luôn tại Tuất(11) — idem
```

---

## 18. Phi Tinh Phức Hợp

### 18.1 Đẩu Quân

```typescript
// Từ chi năm, nghịch tháng âm, thuận giờ sinh
const dauQuanP = dich(chiN, -(tt - 1), gs - 1);
```

### 18.2 Thai Phụ & Phong Cáo — đã ở mục 16

---

## 19. Vòng Bác Sĩ

```typescript
const BAC_SI_NAMES = [
  'Bác Sĩ','Lực Sĩ','Thanh Long','Tiểu Hao','Tướng Quân','Tấu Thư',
  'Phi Liêm','Hỉ Thần','Bệnh Phù','Đại Hao','Phục Binh','Quan Phủ'
];

// Bác Sĩ an tại Lộc Tồn
// Chiều: gt (1=Nam, -1=Nữ) × adNam (âm dương can năm)
const dirBS = gt * adNam;

for (let i = 0; i < 12; i++) {
  palace[dich(locTonP, i * dirBS)].stars.push(BAC_SI_NAMES[i]);
}
```

---

## 20. Vòng Tràng Sinh

```typescript
const TRANG_SINH_NAMES = [
  'Tràng Sinh','Mộc Dục','Quan Đới','Lâm Quan','Đế Vượng',
  'Suy','Bệnh','Tử','Mộ','Tuyệt','Thai','Dưỡng'
];

// Khởi điểm theo cục số
const TS_START: Record<number, number> = {
  2: 9,   // Thủy nhị Cục → Thân(9)
  3: 12,  // Mộc tam Cục  → Hợi(12)
  4: 6,   // Kim tứ Cục   → Tỵ(6)
  5: 9,   // Thổ ngũ Cục  → Thân(9)
  6: 3,   // Hỏa lục Cục  → Dần(3)
};
const tsStart = TS_START[cucSo];

// Chiều: gt × adNam (giống Bác Sĩ)
const dirTS = gt * adNam;

// Vòng Tràng Sinh không gắn vào danh sách sao — lưu riêng vào P[chi].tsName
for (let i = 0; i < 12; i++) {
  const pos = dich(tsStart, i * dirTS);
  palace[pos].tsName = TRANG_SINH_NAMES[i];
}
```

**Phân loại Tốt/Xấu để hiển thị:**
- Tốt (gold): Tràng Sinh, Quan Đới, Lâm Quan, Đế Vượng, Thai, Dưỡng
- Xấu (red): Mộc Dục, Suy, Bệnh, Tử, Mộ, Tuyệt

---

## 21. Tuần Trung (Tuần Không)

```typescript
// Tìm 2 chi bị bỏ trong chu kỳ Hoa Giáp bắt đầu từ năm sinh
// Quý đứng tại dich(chiN, 10-cn), 2 chi TIẾP THEO là Tuần Không
const tuan1 = dich(chiN, 11 - cn);   // chi thứ nhất bị Tuần
const tuan2 = dich(tuan1, 1);         // chi thứ hai bị Tuần

// Xác nhận Giáp Tý (cn=1, chiN=1): dich(1,10)=11(Tuất) → Tuất+Hợi bị Tuần ✓
// Xác nhận Ất Sửu (cn=2, chiN=2): dich(2,9)=11(Tuất) → Tuất+Hợi ✓
// Xác nhận Bính Dần (cn=3, chiN=3): dich(3,8)=11(Tuất) → Tuất+Hợi ✓... 
// Wait: Bính Dần là năm thứ 3 của chu kỳ, Tuần = Tuất+Hợi vì chu kỳ Giáp Tý vẫn đang dùng

palace[tuan1].tuanTrung = true;
palace[tuan2].tuanTrung = true;
```

---

## 22. Triệt Lộ

```typescript
// 2 chi bị chặn theo can năm sinh
const TRIET_MAP: Record<number, [number, number]> = {
  1: [9, 10],   // Giáp → Thân/Dậu
  6: [9, 10],   // Kỷ  → Thân/Dậu
  2: [7, 8],    // Ất  → Ngọ/Mùi
  7: [7, 8],    // Canh → Ngọ/Mùi
  3: [5, 6],    // Bính → Thìn/Tỵ
  8: [5, 6],    // Tân → Thìn/Tỵ
  4: [3, 4],    // Đinh → Dần/Mão
  9: [3, 4],    // Nhâm → Dần/Mão
  5: [1, 2],    // Mậu → Tý/Sửu
  10: [1, 2],   // Quý → Tý/Sửu
};
const trietChi = TRIET_MAP[cn];

if (trietChi) {
  palace[trietChi[0]].trietLo = true;
  palace[trietChi[1]].trietLo = true;
}
```

---

## 23. Thiên La / Địa Võng

```typescript
// Cố định — không thêm vào danh sách sao, hiển thị badge riêng
palace[5].thienLa  = true;   // Thiên La luôn ở Thìn(5)
palace[11].diaVong = true;   // Địa Võng luôn ở Tuất(11)
```

---

## 24. Đại Hạn

```typescript
// amNU = gt * adChiN (gt=1 Nam/-1 Nữ; adChiN = chiN%2===1 ? 1 : -1)
const adChiN = chiN % 2 === 1 ? 1 : -1;
const amNU   = gt * adChiN;

// Với mỗi cung i (1–12):
for (let i = 1; i <= 12; i++) {
  const kc = amNU === 1
      ? (i - cMenh + 12) % 12   // Nam Dương / Nữ Âm: đếm thuận từ Mệnh
      : (cMenh - i + 12) % 12;  // Nam Âm / Nữ Dương: đếm nghịch từ Mệnh
  palace[i].daiHan = cucSo + kc * 10;
}

// Ví dụ: cucSo=6, cMenh ở cung i=cMenh → kc=0 → Đại Hạn bắt đầu năm 6 tuổi
// Cung tiếp theo kc=1 → 16 tuổi, kc=2 → 26 tuổi, ...
```

---

## 25. Tiểu Hạn

```typescript
// Xác định cung khởi tiểu hạn theo chi năm sinh
const TIEU_HAN_START: Record<number, number> = {
  3: 5, 7: 5, 11: 5,   // Dần/Ngọ/Tuất → khởi Thìn(5)
  9: 11, 1: 11, 5: 11, // Thân/Tý/Thìn → khởi Tuất(11)
  6: 8, 10: 8, 2: 8,   // Tỵ/Dậu/Sửu  → khởi Mùi(8)
  12: 2, 4: 2, 8: 2,   // Hợi/Mão/Mùi → khởi Sửu(2)
};

const startPalace = TIEU_HAN_START[chiN];
const dirTH = gt === 1 ? 1 : -1;  // Nam thuận, Nữ nghịch

// Map: cung → tên chi của tiểu hạn năm đó
const tieuHanMap: Record<number, string> = {};
for (let i = 0; i < 12; i++) {
  const chiHienTai = (chiN - 1 + i) % 12 + 1;    // chi năm tiểu hạn (1,2,...12)
  const cungPos    = dich(startPalace, i * dirTH); // cung mà năm đó tiểu hạn qua
  tieuHanMap[cungPos] = CHI[chiHienTai];           // gán tên chi
}
// palace[i].tieuHan = tieuHanMap[i]
```

---

## 26. Lưu Phi Tinh (Lưu Năm / Lưu Tháng)

Lưu Phi Tinh an theo **năm xem** (namXem) hoặc **tháng xem** — không phải năm sinh.

```typescript
const canNamXem = canNam(namXem);  // can năm lưu
const chiNamXem = chiNam(namXem);  // chi năm lưu
```

### 26.1 Hàm an lưu tinh

```typescript
function anLuuTinh(
  palaces: PalaceMap,
  can: number,          // can năm lưu (hoặc can tháng lưu)
  chi: number,          // chi năm lưu (hoặc chi tháng lưu)
  prefix: string,       // 'L.Năm ' hoặc 'L.Tháng '
  gt: number,           // giới tính người sinh
  birthPos?: BirthPos   // vị trí chính tinh bản mệnh (dùng cho Lưu Tứ Hóa)
): void {

  // ── THEO CAN LƯU ──

  // Lưu Lộc Tồn, Kình Dương, Đà La
  const posLocTon = LOC_TON_POS[can];
  add(posLocTon,           prefix + 'Lộc Tồn');
  add(dich(posLocTon,  1), prefix + 'Kình Dương');
  add(dich(posLocTon, -1), prefix + 'Đà La');

  // Lưu Bác Sĩ (12 sao từ Lộc Tồn, hướng gt × âmDương can lưu)
  const dirBS = gt * (can % 2 === 1 ? 1 : -1);
  const BAC_SI = ['Bác Sĩ','Lực Sĩ','Thanh Long','Tiểu Hao','Tướng Quân','Tấu Thư',
                  'Phi Liêm','Hỉ Thần','Bệnh Phù','Đại Hao','Phục Binh','Quan Phủ'];
  for (let i = 0; i < 12; i++) add(dich(posLocTon, i * dirBS), prefix + BAC_SI[i]);

  // Lưu Thiên Khôi, Thiên Việt
  add(MAP_KHOI[can], prefix + 'Thiên Khôi');
  add(MAP_VIET[can], prefix + 'Thiên Việt');

  // Lưu Tứ Hóa (chỉ áp dụng khi có birthPos — tức Lưu Năm, không phải Lưu Tháng)
  if (birthPos) {
    const TU_HOA_LUU: Record<number, [number,number,number,number]> = {
      1:  [birthPos.ltP,     birthPos.pqP,      birthPos.vkP,       birthPos.tduP],
      2:  [birthPos.tkP,     birthPos.tluP,     birthPos.tvP,       birthPos.taP],
      3:  [birthPos.tdP,     birthPos.tkP,      birthPos.vanXuongP, birthPos.ltP],
      4:  [birthPos.taP,     birthPos.tdP,      birthPos.tkP,       birthPos.cmP],
      5:  [birthPos.tlangP,  birthPos.taP,      birthPos.huuBatP,   birthPos.tkP],
      6:  [birthPos.vkP,     birthPos.tlangP,   birthPos.tluP,      birthPos.vanKhucP],
      7:  [birthPos.tduP,    birthPos.vkP,      birthPos.taP,       birthPos.tdP],
      8:  [birthPos.cmP,     birthPos.tduP,     birthPos.vanKhucP,  birthPos.vanXuongP],
      9:  [birthPos.tluP,    birthPos.tvP,       birthPos.tpP,      birthPos.vkP],
      10: [birthPos.pqP,     birthPos.cmP,      birthPos.taP,       birthPos.tlangP],
    };
    const hoa = TU_HOA_LUU[can];
    if (hoa) {
      ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'].forEach((nm, i) => {
        if (hoa[i]) add(hoa[i], prefix + nm);
      });
    }
  }

  // Lưu Hà
  add(LUU_HA_MAP[can], prefix + 'Lưu Hà');

  // ── THEO CHI LƯU ──

  // Lưu Thái Tuế (12 sao từ chi lưu)
  const TT = ['Thái Tuế','Thiếu Dương','Tang Môn','Thiếu Âm','Quan Phù','Tử Phù',
              'Tuế Phá','Long Đức','Bạch Hổ','Phúc Đức','Điếu Khách','Trực Phù'];
  for (let i = 0; i < 12; i++) add(dich(chi, i), prefix + TT[i]);

  // Lưu Hồng Loan, Thiên Hỉ
  const lHL = dich(4, -(chi - 1));
  add(lHL,          prefix + 'Hồng Loan');
  add(dich(lHL, 6), prefix + 'Thiên Hỉ');

  // Lưu Đào Hoa
  add(DAO_HOA_MAP[chi], prefix + 'Đào Hoa');

  // Lưu Thiên Mã
  add(THIEN_MA_MAP[chi], prefix + 'Thiên Mã');

  // Lưu Thiên Khốc / Lưu Thiên Hư
  add(dich(7, -(chi - 1)), prefix + 'Thiên Khốc');
  add(dich(7,   chi - 1),  prefix + 'Thiên Hư');

  // Lưu Long Trì, Phượng Các
  add(dich(5,  chi - 1),   prefix + 'Long Trì');
  add(dich(11, -(chi - 1)), prefix + 'Phượng Các');

  // Lưu Đường Phù
  add(dich(8, chi - 1), prefix + 'Đường Phù');

  // Lưu Cô Thần, Quả Tú
  const lCT = coThanPos(chi);
  add(lCT,             prefix + 'Cô Thần');
  add(dich(lCT, -4),   prefix + 'Quả Tú');

  // Lưu Phá Toái
  add(PHA_TOAI_MAP[chi], prefix + 'Phá Toái');

  // ── LƯU TUẦN KHÔNG (theo can-chi năm lưu) ──
  const quyChiLuu = dich(chi, 10 - can);
  add(dich(quyChiLuu, 1), prefix + 'Tuần');
  add(dich(quyChiLuu, 2), prefix + 'Tuần');

  // ── LƯU TRIỆT LỘ ──
  const lTriet = TRIET_MAP[can];
  if (lTriet) {
    add(lTriet[0], prefix + 'Triệt');
    add(lTriet[1], prefix + 'Triệt');
  }
}
```

### 26.2 Gọi hàm

```typescript
// Lưu Năm (có Tứ Hóa)
anLuuTinh(palaces, canNamXem, chiNamXem, 'L.Năm ', gt, birthPos);

// Lưu Tháng (không có Tứ Hóa)
if (thangXem >= 1 && thangXem <= 12) {
  const canThangXem = canThang(canNamXem, thangXem);
  const chiThangXem = chiThang(thangXem);
  anLuuTinh(palaces, canThangXem, chiThangXem, 'L.Tháng ', gt, undefined);
}
```

### 26.3 Tên tháng âm lịch → chi tháng

| Tháng ÂL | Chi |
|---|---|
| 1 (Dần) | 3 |
| 2 (Mão) | 4 |
| 3 (Thìn) | 5 |
| 4 (Tỵ) | 6 |
| 5 (Ngọ) | 7 |
| 6 (Mùi) | 8 |
| 7 (Thân) | 9 |
| 8 (Dậu) | 10 |
| 9 (Tuất) | 11 |
| 10 (Hợi) | 12 |
| 11 (Tý) | 1 |
| 12 (Sửu) | 2 |

---

## 27. Tứ Trụ (Can Chi 4 cột)

```typescript
// Can Ngày, Chi Ngày (dùng JDN — Julian Day Number)
function canNgay(d: number, m: number, y: number): number {
  const j = jdn(d, m, y);
  return j % 10 || 10;
}
function chiNgay(d: number, m: number, y: number): number {
  const j = jdn(d, m, y);
  return (j + 2) % 12 || 12;
}

// Xác nhận: jdn(22,4,1985)=2446178 → 2446178%10=8(Tân), (2446178+2)%12=0→12 wait...
// 2446178 % 10 = 8 (Tân ✓ — Tân Mão ngày 22/04/1985)
// (2446178+2) % 12 = 2446180 % 12 = 4 (Mão ✓)

// Ngũ Thử Độn — Can Giờ
function canGio(canNgayVal: number, chiGio: number): number {
  return (canNgayVal * 2 + chiGio - 2) % 10 || 10;
}

// Ngũ Hổ Độn — Can Tháng (đã ở mục 5)
// canThang(canNam, thangAm)
// chiThang(thangAm)

// Tứ Trụ hiển thị:
// | Giờ | Ngày | Tháng | Năm |
// | canGio/gs | canNgay/chiNgay | canThang/chiThang | cn/chiN |
```

---

## 28. Trạng Thái Chính Tinh (Miếu/Vượng/Đắc/Bình/Hãm)

Tra cứu theo tên sao + vị trí chi của cung (1–12). Ký hiệu: M=Miếu, V=Vượng, Đ=Đắc, B=Bình, H=Hãm.

```typescript
// [unused, chi1, chi2, ..., chi12]  (index 0 không dùng)
const TRANG_THAI: Record<string, string[]> = {
  'Tử Vi':      ['','B','Đ','M','B','V','M','M','Đ','M','B','V','B'],
  'Thiên Cơ':   ['','Đ','Đ','H','M','M','V','Đ','Đ','V','M','M','H'],
  'Thái Dương': ['','H','Đ','V','V','V','M','M','Đ','H','H','H','H'],
  'Vũ Khúc':    ['','V','M','V','Đ','M','H','V','M','V','Đ','M','H'],
  'Thiên Đồng': ['','V','H','M','Đ','H','Đ','H','H','M','H','H','Đ'],
  'Liêm Trinh': ['','V','Đ','V','H','M','H','V','Đ','V','H','M','H'],
  'Thái Âm':    ['','V','Đ','H','H','H','H','H','Đ','V','M','M','M'],
  'Tham Lang':  ['','H','M','Đ','H','V','H','H','M','Đ','H','V','H'],
  'Cự Môn':     ['','V','H','V','M','H','H','V','H','Đ','M','H','Đ'],
  'Thiên Tướng':['','V','Đ','M','H','V','Đ','V','Đ','M','H','V','Đ'],
  'Thiên Lương':['','V','Đ','V','V','M','H','M','Đ','V','H','M','H'],
  'Thất Sát':   ['','M','Đ','M','H','H','V','M','Đ','M','H','H','V'],
  'Phá Quân':   ['','M','V','H','H','Đ','H','M','V','H','H','Đ','H'],
  // Thiên Phủ không có bảng trạng thái
};
```

---

## 29. Ngũ Hành & Âm Dương của từng Sao

```typescript
// Format: 'Âm/Dương HànhChính (đới HànhPhụ)'
const NGU_HANH_SAO: Record<string, string> = {
  // 14 Chính Tinh
  'Tử Vi':       'Âm Thổ',
  'Thiên Cơ':    'Âm Mộc',
  'Thái Dương':  'Dương Hỏa',
  'Vũ Khúc':     'Âm Kim',
  'Thiên Đồng':  'Dương Thủy',
  'Liêm Trinh':  'Âm Hỏa (đới Mộc)',
  'Thiên Phủ':   'Dương Thổ',
  'Thái Âm':     'Âm Thủy',
  'Tham Lang':   'Âm Thủy (đới Mộc)',
  'Cự Môn':      'Âm Thủy (đới Kim)',
  'Thiên Tướng': 'Dương Thủy',
  'Thiên Lương': 'Âm Mộc (đới Thổ)',
  'Thất Sát':    'Dương Kim (đới Hỏa)',
  'Phá Quân':    'Âm Thủy (đới Kim)',
  // Tứ Hóa
  'Hóa Lộc':    'Âm Mộc (đới Thổ)',
  'Hóa Quyền':  'Dương Mộc (đới Thủy)',
  'Hóa Khoa':   'Dương Thủy (đới Mộc)',
  'Hóa Kỵ':     'Âm Thủy (đới Kim)',
  // Tuần/Triệt
  'Tuần':        'Âm Hỏa (đới Thủy)',
  'Triệt':       'Dương Kim (đới Thủy)',
  // Lục Cát
  'Văn Xương':   'Âm Kim (đới Thổ)',
  'Văn Khúc':    'Âm Thủy',
  'Tả Phù':      'Dương Thổ',
  'Hữu Bật':     'Âm Thổ',
  'Thiên Khôi':  'Dương Hỏa (đới Kim)',
  'Thiên Việt':  'Âm Hỏa (đới Mộc)',
  // Lục Sát
  'Kình Dương':  'Dương Kim (đới Hỏa)',
  'Đà La':       'Âm Kim (đới Hỏa)',
  'Hỏa Tinh':    'Dương Hỏa',
  'Linh Tinh':   'Âm Hỏa',
  'Địa Không':   'Âm Hỏa',
  'Địa Kiếp':    'Dương Hỏa',
  // Phụ tinh trọng yếu
  'Lộc Tồn':    'Âm Thổ',
  'Thiên Mã':    'Dương Hỏa',
  'Đào Hoa':     'Dương Mộc',
  'Hồng Loan':   'Âm Thủy',
  'Thiên Hỉ':    'Dương Thủy',
  'Thiên Khốc':  'Dương Kim',
  'Thiên Hư':    'Âm Thủy',
  'Cô Thần':     'Dương Thổ',
  'Quả Tú':      'Âm Thổ',
  'Thiên Hình':  'Dương Kim (đới Hỏa)',
  'Thiên Y':     'Âm Thủy',
  'Thiên Riêu':  'Âm Thủy (đới Mộc)',
  'Lưu Hà':      'Âm Thủy',
  // Vòng Thái Tuế
  'Thái Tuế':    'Dương Hỏa',
  'Thiếu Dương': 'Dương Hỏa',
  'Tang Môn':    'Âm Mộc',
  'Thiếu Âm':    'Âm Thủy',
  'Quan Phù':    'Dương Hỏa',
  'Tử Phù':      'Âm Kim',
  'Tuế Phá':     'Âm Hỏa',
  'Long Đức':    'Dương Thủy',
  'Bạch Hổ':     'Dương Kim',
  'Phúc Đức':    'Dương Thổ',
  'Điếu Khách':  'Âm Hỏa',
  'Trực Phù':    'Âm Kim (đới Thủy)',
  // Vòng Bác Sĩ
  'Bác Sĩ':      'Âm Thủy',
  'Lực Sĩ':      'Dương Hỏa',
  'Thanh Long':  'Dương Thủy',
  'Tiểu Hao':    'Dương Hỏa',
  'Tướng Quân':  'Dương Mộc',
  'Tấu Thư':     'Âm Kim',
  'Phi Liêm':    'Dương Hỏa',
  'Hỉ Thần':     'Dương Hỏa',
  'Bệnh Phù':    'Âm Thổ',
  'Đại Hao':     'Âm Hỏa',
  'Phục Binh':   'Dương Hỏa',
  'Quan Phủ':    'Dương Hỏa',
  // Phi tinh khác
  'Thiên Không':  'Dương Hỏa',
  'Kiếp Sát':     'Âm Hỏa',
  'Thiên Tài':    'Âm Thổ',
  'Thiên Thọ':    'Dương Thổ',
  'Thiên Quan':   'Dương Hỏa',
  'Thiên Phúc':   'Dương Thổ',
  'Thiên Thương': 'Dương Thổ',
  'Thiên Sứ':     'Âm Thủy',
  'Phá Toái':     'Âm Hỏa',
  'Long Trì':     'Dương Thủy',
  'Phượng Các':   'Dương Thổ (đới Mộc)',
  'Đường Phù':    'Âm Mộc',
  'Tam Thai':     'Dương Thủy (đới Thổ)',
  'Bát Tọa':      'Âm Thổ',
  'Thai Phụ':     'Dương Kim',
  'Phong Cáo':    'Âm Thổ',
  'Đẩu Quân':     'Âm Hỏa',
  'Hoa Cái':      'Dương Kim',
  'Ân Quang':     'Dương Hỏa',
  'Thiên Quý':    'Âm Thổ',
  'Giải Thần':    'Dương Mộc',
  'Thiên Giải':   'Dương Hỏa',
  'Địa Giải':     'Âm Thổ',
  'Thiên Đức':    'Dương Hỏa',
  'Nguyệt Đức':   'Âm Hỏa',
};
```

---

## 30. Bố Cục Lưới 4×4 (Grid Positions)

Lá số hiển thị dạng lưới 4×4, center (2×2) là bảng thông tin:

```typescript
// GPOS[chi] = [row, col]  (row 0=trên, col 0=trái)
const GPOS: Record<number, [number, number]> = {
  6:  [0, 0], 7:  [0, 1], 8:  [0, 2], 9:  [0, 3],
  5:  [1, 0], /* CENTER */              10: [1, 3],
  4:  [2, 0], /* CENTER */              11: [2, 3],
  3:  [3, 0], 2:  [3, 1], 1:  [3, 2], 12: [3, 3],
};
```

**Sơ đồ trực quan:**

```
┌──────┬──────┬──────┬──────┐
│ Tỵ6  │ Ngọ7 │ Mùi8 │ Thân9│
├──────┼──────┴──────┼──────┤
│Thìn5 │   CENTER    │Dậu10 │
├──────┤   (2×2)     ├──────┤
│ Mão4 │             │Tuất11│
├──────┼──────┬──────┼──────┤
│ Dần3 │ Sửu2 │ Tý1  │Hợi12 │
└──────┴──────┴──────┴──────┘
```

**Tên cung theo vị trí** (từ Cung Mệnh = chi cMenh, trải nghịch):
```typescript
for (let id = 1; id <= 12; id++) {
  const pos = dich(cMenh, id - 1);  // đếm thuận chi (= nghịch cung)
  palace[pos].name = CUNG[id];
}
// CUNG[1]=Mệnh tại cMenh; CUNG[2]=Phụ Mẫu tại dich(cMenh,1); ...
```

---

## 31. Test Case Chuẩn

### Test 1 — Xác nhận lịch âm (CRITICAL)
```
Input:  22/04/1985 DL
Output: 03/03/1985 ÂL, không nhuận
Xác nhận: ✓ (tháng 3 âm, ngày 3)
```

### Test 2 — Xác nhận lá số chính
```
Input:
  birth_day:       22
  birth_month:     4
  birth_year:      1985
  birth_hour_chi:  5   (Thìn — 07:00–09:00)
  gender:          'male'

Tính trung gian:
  Âm lịch:    03/03/1985 ÂL
  canNam:     2 (Ất)           canNam(1985)=(1985+6)%10+1=2 ✓
  chiNam:     2 (Sửu)          chiNam(1985)=(1985+8)%12+1=2 ✓
  adNam:      -1               Ất là Can Âm ✓
  cMenh:      _KT(3-5+3)=1    (Tý) ✓
  cThan:      _KT(3+5+1)=9    (Thân) ✓
  cucSo:      tinhCuc(2,1)     rowIdx=(2-1)%5=1, wordIdx=floor((1-1)/2)=0
              CUC_MATRIX[1][0]='Hỏa' → 6 → Hỏa lục Cục ✓
  tvP:        timTuVi(6,3)     3%6≠0, soMuon=3, thuong=1, cungTam=dich(3,0)=3, lẻ→dich(3,-3)=12(Hợi) ✓
  tpP:        _KT(18-12)=6    (Tỵ) ✓

Vị trí 14 chính tinh:
  Tử Vi:      Hợi(12)
  Liêm Trinh: dich(12,4)  = 4(Mão)
  Thiên Đồng: dich(12,7)  = 7(Ngọ)
  Vũ Khúc:    dich(12,8)  = 8(Mùi)
  Thái Dương: dich(12,9)  = 9(Thân)
  Thiên Cơ:   dich(12,11) = 11(Tuất)
  Thiên Phủ:  Tỵ(6)
  Thái Âm:    dich(6,1)   = 7(Ngọ)  ← đồng cung Thiên Đồng
  Tham Lang:  dich(6,2)   = 8(Mùi)  ← đồng cung Vũ Khúc
  Cự Môn:     dich(6,3)   = 9(Thân) ← đồng cung Thái Dương
  Thiên Tướng:dich(6,4)   = 10(Dậu)
  Thiên Lương:dich(6,5)   = 11(Tuất) ← đồng cung Thiên Cơ
  Thất Sát:   dich(6,6)   = 12(Hợi)  ← đồng cung Tử Vi
  Phá Quân:   dich(6,10)  = 4(Mão)   ← đồng cung Liêm Trinh

Văn Xương/Khúc:
  vanKhucP:  dich(5,4)=9(Thân) ✓
  vanXuongP: dich(11,-4)=7(Ngọ) ✓

Âm Dương chỉ đạo Vòng:
  adNam=-1, gt=1 → dirBS = 1×(-1) = -1 (Bác Sĩ đi NGHỊCH)
  dirTS = -1 (Tràng Sinh đi NGHỊCH)
```

### Test 3 — Kiểm tra năm Bính Ngọ 2026
```
canNam(2026) = (2026+6)%10+1 = 2032%10+1 = 2+1 = 3 (Bính) ✓
chiNam(2026) = (2026+8)%12+1 = 2034%12+1 = 6+1 = 7 (Ngọ) ✓

Lưu Thiên Khốc 2026: dich(7,-(7-1)) = dich(7,-6) = 1(Tý) ✓
Lưu Thiên Hư 2026:   dich(7,   6)   = dich(7, 6) = 1(Tý) ✓ (đồng cung)
```

---

## Phụ lục — Thứ tự an sao hoàn chỉnh

Khi build Edge Function, an theo thứ tự sau để tránh dependency:

1. `sol2lun` → `{nn, tt, nnnn}` (ngày, tháng, năm âm lịch)
2. `canNam`, `chiNam` → `cn`, `chiN`, `adNam`, `adChiN`
3. `cMenh`, `cThan`
4. `cucSo`, `cucName`
5. Khởi tạo 12 cung trống
6. Gán tên 12 cung từ `cMenh`
7. Tính `tvP`, `ltP`, `tdP`, `vkP`, `tduP`, `tkP`, `tpP`, `taP`, `tlangP`, `cmP`, `ttuP`, `tluP`, `tsatP`, `pqP`
8. An 14 chính tinh
9. Tính `vanKhucP`, `vanXuongP`, `taPhuP`, `huuBatP`
10. An Tứ Hóa (cần vị trí chính tinh)
11. An Sát tinh (`locTonP`, `dalaP`, `kinhP`, `hoaTinhP`, `linhTinhP`, `dKiepP`, `dKhongP`, `kiepSatP`, `thienKhongP`, `thienThuongP`, `thienSuP`, `thienHinhP`, `thienRieuP`)
12. An Trợ tinh (`locTonP`, `vanKhucP`, `vanXuongP`, `taPhuP`, `huuBatP`, `khoiP`, `vietP`, `thienQuanP`, `thienPhucP`)
13. An Phi tinh theo chi năm (Thái Tuế, Hồng Loan, Thiên Hỉ, Đào Hoa, Thiên Mã, Thiên Khốc, Thiên Hư, Cô Thần, Quả Tú, Long Trì, Phượng Các, Giải Thần, Đường Phù, Hoa Cái, Phá Toái, Thiên Đức, Nguyệt Đức, Kiếp Sát)
14. An Phi tinh theo can năm (Lưu Hà)
15. An Phi tinh theo tháng (Tả Phù đã ở bước 9, Thiên Y, Thiên Giải, Địa Giải)
16. An Phi tinh theo ngày (Tam Thai, Bát Tọa, Ân Quang, Thiên Quý)
17. An Phi tinh theo giờ (Địa Kiếp đã bước 11, Thai Phụ, Phong Cáo)
18. An Phi tinh từ Mệnh/Thân (Thiên Tài, Thiên Thọ)
19. An Đẩu Quân
20. Vòng Bác Sĩ
21. Vòng Tràng Sinh
22. Đại Hạn
23. Tiểu Hạn
24. Thiên La / Địa Võng (flag)
25. Tuần Trung (flag)
26. Triệt Lộ (flag)
27. Lưu Phi Tinh Năm (`anLuuTinh` với `birthPos`)
28. Lưu Phi Tinh Tháng (`anLuuTinh` không có `birthPos`)
29. Tứ Trụ (can chi ngày/giờ/tháng/năm)
