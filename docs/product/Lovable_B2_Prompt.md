# Lovable B2 Prompt — Lá Số Thật từ Edge Function

> Copy toàn bộ nội dung trong box dưới đây, paste vào Lovable.
> Gửi SAU KHI đã nhận được xác nhận từ B1 (Supabase đã kết nối).

---

```
## Xóa ZuviChart demo, thay bằng lá số thật từ Edge Function

### 1. XÓA hoàn toàn
- Component ZuviChart và mọi demo / hardcoded chart data
- Mọi logic tính toán Tử Vi phía frontend

---

### 2. THÊM Form nhập Bát Tự

Đặt trên landing page, thay vào chỗ ZuviChart cũ.

Fields:
- Ngày sinh: number input, 1–31
- Tháng sinh: number input, 1–12
- Năm sinh: number input, placeholder "1990", range 1900–2100
- Giờ sinh: <select> với 12 options:
    value=1  label="Tý   (23:00 – 01:00)"
    value=2  label="Sửu  (01:00 – 03:00)"
    value=3  label="Dần  (03:00 – 05:00)"
    value=4  label="Mão  (05:00 – 07:00)"
    value=5  label="Thìn (07:00 – 09:00)"
    value=6  label="Tỵ   (09:00 – 11:00)"
    value=7  label="Ngọ  (11:00 – 13:00)"
    value=8  label="Mùi  (13:00 – 15:00)"
    value=9  label="Thân (15:00 – 17:00)"
    value=10 label="Dậu  (17:00 – 19:00)"
    value=11 label="Tuất (19:00 – 21:00)"
    value=12 label="Hợi  (21:00 – 23:00)"
- Giới tính: radio "Nam" (male) / "Nữ" (female), default Nam
- Nút submit: "Xem Lá Số" — style accent gold #C9A227

---

### 3. Gọi Edge Function khi submit (dùng fetch trực tiếp, KHÔNG dùng supabase.functions.invoke)

const [lasoData, setLasoData] = useState(null)
const [loading, setLoading]   = useState(false)
const [error, setError]       = useState('')

async function handleSubmit(e) {
  e.preventDefault()
  setLoading(true)
  setError('')
  try {
    const res = await fetch(
      'https://gqmjuzpwfpnvlpodqckt.supabase.co/functions/v1/calculate-la-so',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birth_day:      Number(birthDay),
          birth_month:    Number(birthMonth),
          birth_year:     Number(birthYear),
          birth_hour_chi: Number(birthHourChi),
          gender:         gender,           // 'male' | 'female'
          view_year:      new Date().getFullYear(),
        })
      }
    )
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Lỗi không xác định')
    setLasoData(json)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

---

### 4. Mapping tên Chi (dùng trong render)

const CHI_NAME = ['','Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']

---

### 5. Render Lá Số — lưới 4×4

Hiển thị bên dưới form khi lasoData !== null.

LAYOUT GRID (CSS grid 4 cột × 4 hàng):

  [chi=6][chi=7][chi=8][chi=9]
  [chi=5][  CENTER 2×2  ][chi=10]
  [chi=4][  CENTER 2×2  ][chi=11]
  [chi=3][chi=2][chi=1][chi=12]

Vị trí từng ô (gridRow / gridColumn, 1-indexed):
  chi=1  → row=4 col=3
  chi=2  → row=4 col=2
  chi=3  → row=4 col=1 (hoặc row=3 col=1 nếu đếm từ dưới)
  chi=4  → row=3 col=1
  chi=5  → row=2 col=1
  chi=6  → row=1 col=1
  chi=7  → row=1 col=2
  chi=8  → row=1 col=3
  chi=9  → row=1 col=4
  chi=10 → row=2 col=4
  chi=11 → row=3 col=4
  chi=12 → row=4 col=4
  CENTER → row=2~3 col=2~3 (gridRow: 2/4, gridColumn: 2/4)

Render các cung: lasoData.palaces là array 12 phần tử, mỗi phần tử có field `chi` (1–12).

---

### 6. Nội dung ô CENTER (2×2)

Hiển thị thông tin tổng quan:

  ── TỨ TRỤ ──
  Giờ:   {tu_tru.can_gio} {tu_tru.chi_gio}
  Ngày:  {tu_tru.can_ngay} {tu_tru.chi_ngay}
  Tháng: {tu_tru.can_thang} {tu_tru.chi_thang}
  Năm:   {tu_tru.can_nam} {tu_tru.chi_nam}
  ──────────────
  Cục:   {cuc_name}
  Mệnh:  {CHI_NAME[cung_menh]}
  Thân:  {CHI_NAME[cung_than]}

Style: background #0F1B2D, text #F4F1EC, font-size 12px

---

### 7. Nội dung mỗi ô cung

Dữ liệu: palace = lasoData.palaces.find(p => p.chi === chi)

HEADER (font-size 11px, color #C9A227, margin-bottom 4px):
  {palace.can} {CHI_NAME[palace.chi]}

BADGES (nếu có):
  - palace.is_menh === true  → badge "MỆNH" nền #C9A227, chữ #0F1B2D
  - palace.is_than === true  → badge "THÂN" nền #4A9EBF, chữ #0F1B2D
  - palace.tieu_han_year !== null → badge nhỏ "TH {palace.tieu_han_year}" nền #2ECC71, chữ #0F1B2D
  - palace.khong_vong === true → badge nhỏ "⊘" màu đỏ nhạt + viền đỏ nhạt trên ô

DANH SÁCH SAO (font-size 10–11px, line-height 1.4):
  Mỗi sao: palette theo palace.stars[i].cat
    'chinh'     → color: #C9A227, font-weight: 600
    'phu'       → color: #F4F1EC
    'sat'       → color: #C0392B
    'luu'       → color: #2EAAA8, font-style: italic
    'luu_thang' → color: #2EAAA8, font-style: italic, font-size: 9px

  Sau tên sao:
    - Nếu star.vuong_miet → thêm "(M)" / "(V)" / "(Đ)" / "(B)" / "(H)" màu muted
    - Nếu star.hoa = 'loc'   → badge xanh lá   [Lộc]
    - Nếu star.hoa = 'quyen' → badge vàng       [Q]
    - Nếu star.hoa = 'khoa'  → badge xanh dương [K]
    - Nếu star.hoa = 'ky'    → badge đỏ         [Kỵ]

FOOTER ô (font-size 9px, color: muted, margin-top: auto):
  Trái:  {palace.truong_sinh}   (ví dụ "Đế Vượng")
  Phải:  ĐH {palace.dai_han_age_start}–{palace.dai_han_age_end}

---

### 8. Style ô cung

background:    #1E3A5F
border:        1px solid rgba(201, 162, 39, 0.3)
border-radius: 4px
padding:       6px 8px
overflow:      hidden
display:       flex
flex-direction: column
min-height:    120px

Khi palace.khong_vong === true:
  border-color: rgba(192, 57, 43, 0.5)

---

### 9. States

LOADING (khi đang gọi API):
  Hiển thị skeleton grid 4×4 với pulse animation, màu #1E3A5F

ERROR:
  Alert đỏ nền rgba(192,57,43,0.1) border #C0392B
  Text: "Không thể tính lá số: {error}"

CHƯA NHẬP:
  Placeholder text căn giữa:
  "Nhập thông tin bên trên để xem Lá Số Tử Vi của bạn"
  font-size 14px, color muted

---

### 10. Disclaimer (bắt buộc, ngay dưới lá số)

Text:
"Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống
phân tích chu kỳ cổ học. Không thay thế tư vấn chuyên môn về pháp lý, y tế,
hoặc tài chính."

Style: font-size 11px, color muted, text-align center, margin-top 16px, padding 8px,
border-top 1px solid rgba(244,241,236,0.1)

---

### 11. Design System

CSS Variables:
  --bg-primary:   #0F1B2D
  --bg-card:      #1E3A5F
  --accent:       #C9A227
  --text:         #F4F1EC
  --red:          #C0392B
  --green:        #2ECC71
  --teal:         #2EAAA8

Font: 'Be Vietnam Pro', sans-serif (đã có trong project)

---

### 12. Test case để verify sau khi build

Nhập: Ngày 22 / Tháng 4 / Năm 1985 / Giờ Thìn (value=5) / Nam
Kết quả đúng:
  - Ô Hợi (chi=12, góc phải dưới): có sao "Tử Vi" màu vàng
  - Ô Thân (chi=9, cột phải hàng 2): có "Văn Khúc" màu trắng
  - Ô Ngọ (chi=7, hàng trên thứ 2): có "Văn Xương" màu trắng
  - CENTER: Cục "Hỏa lục Cục", Mệnh "Tý", Thân "Thân"
  - Badge "MỆNH" xuất hiện ở ô chi=1 (Tý)
  - Badge "THÂN" xuất hiện ở ô chi=9 (Thân)
```

---

## Ghi chú triển khai

- Prompt này dùng `fetch()` trực tiếp đến `gqmjuzpwfpnvlpodqckt.supabase.co` — KHÔNG dùng `supabase.functions.invoke()` vì Lovable dùng Supabase Cloud instance riêng
- Edge Function đã deploy và test pass toàn bộ test case
- Không cần auth header khi gọi function (đã deploy `--no-verify-jwt`)
