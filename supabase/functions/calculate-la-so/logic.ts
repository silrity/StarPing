// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const PI = Math.PI
const CAN  = ['','Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý']
const CHI  = ['','Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']
const CUNG = ['','Mệnh','Phụ Mẫu','Phúc Đức','Điền Trạch','Quan Lộc','Nô Bộc',
              'Thiên Di','Tật Ách','Tài Bạch','Tử Tức','Phu Thê','Huynh Đệ']

// ─── HELPERS ────────────────────────────────────────────────────────────────

// Vòng tròn 1–12; offset dương = đi thuận theo chiều tăng số chi
function dich(start: number, ...offsets: number[]): number {
  let r = Math.round(start)
  for (const v of offsets) r += Math.round(v)
  r = r % 12
  return r <= 0 ? r + 12 : r
}

function _KT(t: number): number {
  while (t > 12) t -= 12
  while (t <= 0) t += 12
  return t
}

const fl = Math.floor

function amDuongCan(can: number): 1 | -1 { return can % 2 === 1 ? 1 : -1 }

// ─── SOL2LUN  (GMT+7 — CRITICAL) ────────────────────────────────────────────

function jdn(d: number, m: number, y: number): number {
  let i, l, o, r
  i = y + 4800 - (l = fl((14 - m) / 12))
  r = d + fl((153 * (o = m + 12 * l - 3) + 2) / 5)
      + 365 * i + fl(i / 4) - fl(i / 100) + fl(i / 400) - 32045
  if (r < 2299161) r = d + fl((153 * o + 2) / 5) + 365 * i + fl(i / 4) - 32083
  return r
}

function sunLong(jd: number, tz: number): number {
  const e = (jd - 0.5 - tz / 24 - 2451545) / 36525
  const l = e * e, i = PI / 180
  const o = 357.5291 + 35999.0503 * e - 1559e-7 * l - 4.8e-7 * e * l
  let r = 280.46645 + 36000.76983 * e + 3032e-7 * l
      + ((1.9146 - 0.004817 * e - 14e-6 * l) * Math.sin(i * o)
      + (0.019993 - 101e-6 * e) * Math.sin(2 * i * o)
      + 29e-5 * Math.sin(3 * i * o))
  r *= i
  r -= 2 * PI * fl(r / (2 * PI))
  return fl(r / (PI / 6))
}

function newMoon(k: number): number {
  const n = k / 1236.85, e = n * n, l = e * n, i = PI / 180
  let o = 2415020.75933 + 29.53058868 * k + 1178e-7 * e - 1.55e-7 * l
  o += 33e-5 * Math.sin((166.56 + 132.87 * n - 0.009173 * e) * i)
  const r = 359.2242 + 29.10535608 * k - 333e-7 * e - 347e-8 * l
  const a = 306.0253 + 385.81691806 * k + 0.0107306 * e + 1236e-8 * l
  const u = 21.2964 + 390.67050646 * k - 0.0016528 * e - 239e-8 * l
  const s = (0.1734 - 393e-6 * n) * Math.sin(r * i)
      + 0.0021 * Math.sin(2 * i * r)
      - 0.4068 * Math.sin(a * i) + 0.0161 * Math.sin(2 * i * a) - 4e-4 * Math.sin(3 * i * a)
      + 0.0104 * Math.sin(2 * i * u) - 0.0051 * Math.sin(i * (r + a)) - 0.0074 * Math.sin(i * (r - a))
      + 4e-4 * Math.sin(i * (2 * u + r)) - 4e-4 * Math.sin(i * (2 * u - r))
      - 6e-4 * Math.sin(i * (2 * u + a)) + 0.001 * Math.sin(i * (2 * u - a))
      + 5e-4 * Math.sin(i * (2 * a + r))
  const dt = n < -11
      ? 0.001 + 839e-6 * n + 2261e-7 * e - 845e-8 * l - 8.1e-8 * n * l
      : 265e-6 * n - 278e-6 + 262e-6 * e
  return o + s - dt
}

function adjNM(k: number, tz: number): number { return fl(newMoon(k) + 0.5 + tz / 24) }

function getLM11(yy: number, tz: number): number {
  const k = fl((jdn(31, 12, yy) - 2415021) / 29.530588853)
  let nm = adjNM(k, tz)
  if (sunLong(nm, tz) >= 9) nm = adjNM(k - 1, tz)
  return nm
}

function getLeapOffset(a11: number, tz: number): number {
  const k = fl((a11 - 2415021.076998695) / 29.530588853 + 0.5)
  let last = 0, i = 1
  let arc = sunLong(adjNM(k + i, tz), tz)
  do { last = arc; i++; arc = sunLong(adjNM(k + i, tz), tz) } while (arc !== last && i < 14)
  return i - 1
}

function sol2lun(dd: number, mm: number, yy: number) {
  const tz = 7
  const o = jdn(dd, mm, yy)
  const idx = fl((o - 2415021.076998695) / 29.530588853)
  let r = adjNM(idx + 1, tz)
  if (r > o) r = adjNM(idx, tz)

  let a11 = getLM11(yy, tz), b11 = a11, ly: number
  if (a11 >= r) { ly = yy; a11 = getLM11(yy - 1, tz) }
  else          { ly = yy + 1; b11 = getLM11(yy + 1, tz) }

  const ld   = o - r + 1
  const diff = fl((r - a11) / 29)
  let lm = diff + 11, ll = 0

  if (b11 - a11 > 365) {
    const lo = getLeapOffset(a11, tz)
    if (diff >= lo) { lm = diff + 10; if (diff === lo) ll = 1 }
  }
  if (lm > 12) lm -= 12
  if (lm >= 11 && diff < 4) ly--

  return { d: ld, m: lm, y: ly, leap: ll }
}

// ─── CAN / CHI FUNCTIONS ────────────────────────────────────────────────────

function canNam(y: number):  number { return (y + 6) % 10 + 1 }
function chiNam(y: number):  number { return (y + 8) % 12 + 1 }

const START_CAN_THANG = [0, 3, 5, 7, 9, 1, 3, 5, 7, 9, 1]
function canThang(cnv: number, thangAm: number): number {
  const c = (START_CAN_THANG[cnv] + thangAm - 1) % 10
  return c === 0 ? 10 : c
}
function chiThang(thangAm: number): number {
  const c = (thangAm + 2) % 12
  return c === 0 ? 12 : c
}
function canCung(cnv: number, chiCung: number): number {
  const t = ((chiCung - 2 + 12) % 12) || 12
  return canThang(cnv, t)
}

function canNgayFn(d: number, m: number, y: number): number {
  const j = jdn(d, m, y); return j % 10 || 10
}
function chiNgayFn(d: number, m: number, y: number): number {
  const j = jdn(d, m, y); return (j + 2) % 12 || 12
}
function canGioFn(cnNgay: number, chiGio: number): number {
  return (cnNgay * 2 + chiGio - 2) % 10 || 10
}

// ─── NGŨ HÀNH CỤC ───────────────────────────────────────────────────────────

const CUC_MATRIX = [
  ['Thủy','Hỏa','Mộc','Thổ','Kim'],
  ['Hỏa','Thổ','Kim','Mộc','Thủy'],
  ['Thổ','Mộc','Thủy','Kim','Hỏa'],
  ['Mộc','Kim','Hỏa','Thủy','Thổ'],
  ['Kim','Thủy','Thổ','Hỏa','Mộc'],
]
const HANH_TO_CUC: Record<string,number> = { Thủy:2, Mộc:3, Kim:4, Thổ:5, Hỏa:6 }
const CUC_NAME: Record<number,string>    = { 2:'Thủy nhị Cục',3:'Mộc tam Cục',4:'Kim tứ Cục',5:'Thổ ngũ Cục',6:'Hỏa lục Cục' }

function tinhCuc(cnv: number, chiMenh: number): number {
  const row = (cnv - 1) % 5
  const col = (chiMenh === 11 || chiMenh === 12) ? 1 : fl((chiMenh - 1) / 2)
  return HANH_TO_CUC[CUC_MATRIX[row][col]] ?? 2
}

// ─── TỬ VI POSITION ─────────────────────────────────────────────────────────

function timTuVi(cucSo: number, ngayAm: number): number {
  if (ngayAm % cucSo === 0) return dich(3, ngayAm / cucSo - 1)
  const soMuon  = cucSo - (ngayAm % cucSo)
  const thuong  = (ngayAm + soMuon) / cucSo
  const cungTam = dich(3, thuong - 1)
  return soMuon % 2 === 1 ? dich(cungTam, -soMuon) : dich(cungTam, soMuon)
}

// ─── SAT TINH LOOKUP TABLES ─────────────────────────────────────────────────

const LOC_TON_POS = [0, 3, 4, 6, 7, 6, 7, 9, 10, 12, 1]

function hoaLinhPos(chiN: number, gs: number, gt: number, adNam: number): [number,number] {
  const grp = [3,7,11].includes(chiN) ? [2,4]
            : [1,5,9].includes(chiN)  ? [3,11]
            : [6,10,2].includes(chiN) ? [4,11]
            : [10,11]
  const dir = gt * adNam
  return dir === -1
    ? [dich(grp[0]+1,-gs), dich(grp[1]-1, gs)]
    : [dich(grp[0]-1, gs), dich(grp[1]+1,-gs)]
}

const KIEP_SAT_MAP: Record<number,number> = {1:6,2:3,3:12,4:9,5:6,6:3,7:12,8:9,9:6,10:3,11:12,12:9}

// ─── TRỢ TINH LOOKUP TABLES ─────────────────────────────────────────────────

const MAP_KHOI  = [0,2,1,12,10,8,1,8,7,6,4]
const MAP_VIET  = [0,8,9,10,12,2,9,2,3,4,6]
const T_QUAN_MAP = [0,8,5,6,3,4,10,12,10,11,7]
const T_PHUC_MAP = [0,10,9,1,12,4,3,7,6,7,6]
const T_TRUU_MAP = [0,6,7,1,6,7,9,3,7,10,11]

// ─── PHI TINH LOOKUP TABLES ─────────────────────────────────────────────────

const DAO_HOA_MAP: Record<number,number> = {
  1:10,5:10,9:10, 3:4,7:4,11:4, 6:7,10:7,2:7, 12:1,4:1,8:1
}
const THIEN_MA_MAP: Record<number,number> = {
  3:9,7:9,11:9, 9:3,1:3,5:3, 6:12,10:12,2:12, 12:6,4:6,8:6
}
const HOA_CAI_MAP: Record<number,number> = {
  1:5,5:5,9:5, 3:11,7:11,11:11, 6:2,10:2,2:2, 12:8,4:8,8:8
}
const PHA_TOAI_MAP: Record<number,number> = {
  1:6,7:6,4:6,10:6, 3:10,9:10,6:10,12:10, 5:2,11:2,2:2,8:2
}
const LUU_HA_MAP = [0,10,11,8,9,6,7,4,5,12,1]
const TRIET_MAP: Record<number,[number,number]> = {
  1:[9,10],6:[9,10], 2:[7,8],7:[7,8], 3:[5,6],8:[5,6], 4:[3,4],9:[3,4], 5:[1,2],10:[1,2]
}

function coThanPos(chiN: number): number {
  if ([12,1,2].includes(chiN)) return 3
  if ([3,4,5].includes(chiN))  return 6
  if ([6,7,8].includes(chiN))  return 9
  return 12
}

// ─── VÒNG TRÀNG SINH ────────────────────────────────────────────────────────

const TRANG_SINH_NAMES = [
  'Tràng Sinh','Mộc Dục','Quan Đới','Lâm Quan','Đế Vượng',
  'Suy','Bệnh','Tử','Mộ','Tuyệt','Thai','Dưỡng'
]
const TS_START: Record<number,number> = { 2:9, 3:12, 4:6, 5:9, 6:3 }

// ─── VÒNG BÁC SĨ ────────────────────────────────────────────────────────────

const BAC_SI_NAMES = [
  'Bác Sĩ','Lực Sĩ','Thanh Long','Tiểu Hao','Tướng Quân','Tấu Thư',
  'Phi Liêm','Hỉ Thần','Bệnh Phù','Đại Hao','Phục Binh','Quan Phủ'
]

// ─── VÒNG THÁI TUẾ ──────────────────────────────────────────────────────────

const THAI_TUE_NAMES = [
  'Thái Tuế','Thiếu Dương','Tang Môn','Thiếu Âm',
  'Quan Phù','Tử Phù','Tuế Phá','Long Đức',
  'Bạch Hổ','Phúc Đức','Điếu Khách','Trực Phù'
]

// ─── TIỂU HẠN START ─────────────────────────────────────────────────────────

const TIEU_HAN_START: Record<number,number> = {
  3:5,7:5,11:5, 9:11,1:11,5:11, 6:8,10:8,2:8, 12:2,4:2,8:2
}

// ─── TRẠNG THÁI CHÍNH TINH ──────────────────────────────────────────────────

const TRANG_THAI: Record<string,string[]> = {
  'Tử Vi':       ['','B','Đ','M','B','V','M','M','Đ','M','B','V','B'],
  'Thiên Cơ':    ['','Đ','Đ','H','M','M','V','Đ','Đ','V','M','M','H'],
  'Thái Dương':  ['','H','Đ','V','V','V','M','M','Đ','H','H','H','H'],
  'Vũ Khúc':     ['','V','M','V','Đ','M','H','V','M','V','Đ','M','H'],
  'Thiên Đồng':  ['','V','H','M','Đ','H','Đ','H','H','M','H','H','Đ'],
  'Liêm Trinh':  ['','V','Đ','V','H','M','H','V','Đ','V','H','M','H'],
  'Thái Âm':     ['','V','Đ','H','H','H','H','H','Đ','V','M','M','M'],
  'Tham Lang':   ['','H','M','Đ','H','V','H','H','M','Đ','H','V','H'],
  'Cự Môn':      ['','V','H','V','M','H','H','V','H','Đ','M','H','Đ'],
  'Thiên Tướng': ['','V','Đ','M','H','V','Đ','V','Đ','M','H','V','Đ'],
  'Thiên Lương': ['','V','Đ','V','V','M','H','M','Đ','V','H','M','H'],
  'Thất Sát':    ['','M','Đ','M','H','H','V','M','Đ','M','H','H','V'],
  'Phá Quân':    ['','M','V','H','H','Đ','H','M','V','H','H','Đ','H'],
}
const VUONG_MIET_FULL: Record<string,string> = { M:'Miếu', V:'Vượng', Đ:'Đắc', B:'Bình', H:'Hãm' }

// Sát tinh — dùng để phân cat='sat'
const SAT_SET = new Set([
  'Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Kiếp','Địa Không',
  'Kiếp Sát','Thiên Thương','Thiên Sứ','Thiên Hình','Thiên Riêu',
  'Cô Thần','Quả Tú','Tang Môn','Bạch Hổ','Điếu Khách','Bệnh Phù',
  'Đại Hao','Phi Liêm','Phục Binh','Tuế Phá','Tử Phù','Phá Toái',
  'Thiên Khốc','Thiên Hư',
])

const CHINH_TINH_SET = new Set([
  'Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh',
  'Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'
])

// ─── INTERFACES ─────────────────────────────────────────────────────────────

export interface Star {
  name: string
  cat: 'chinh' | 'phu' | 'luu' | 'luu_thang' | 'sat' | 'khong_vong'
  vuong_miet: string | null
  hoa: 'loc' | 'quyen' | 'khoa' | 'ky' | null
}

export interface Palace {
  chi: number
  cung_name: string
  can: string
  stars: Star[]
  dai_han_age_start: number
  dai_han_age_end: number
  tieu_han_year: number | null
  truong_sinh: string
  khong_vong: boolean
  is_menh: boolean
  is_than: boolean
}

export interface LasoInput {
  birth_day: number
  birth_month: number
  birth_year: number
  birth_hour_chi: number
  gender: 'male' | 'female'
  view_year: number
  view_month?: number
}

// ─── MAIN ALGORITHM ─────────────────────────────────────────────────────────

export function calculateLaSo(input: LasoInput) {
  const {
    birth_day: dd, birth_month: mm, birth_year: yy,
    birth_hour_chi: gs, gender,
    view_year: namXem, view_month: thangXem = 0
  } = input

  const gt = gender === 'male' ? 1 : -1

  // 1. Solar → Lunar (GMT+7)
  const lun = sol2lun(dd, mm, yy)
  const nn   = lun.d   // ngày âm lịch
  const tt   = lun.m   // tháng âm lịch

  // 2. Can Chi năm sinh (dùng năm âm lịch)
  const cn    = canNam(lun.y)
  const chiN  = chiNam(lun.y)
  const adNam = amDuongCan(cn)
  const adChiN = chiN % 2 === 1 ? 1 : -1

  // 3. Cung Mệnh & Thân
  const cMenh = _KT(tt - gs + 3)
  const cThan  = _KT(tt + gs + 1)

  // 4. Cục số
  const cucSo   = tinhCuc(cn, cMenh)
  const cucName = CUC_NAME[cucSo] ?? 'Hỏa lục Cục'

  // 5. Khởi tạo 12 cung (index 1–12)
  const P: Palace[] = new Array(13)
  for (let i = 1; i <= 12; i++) {
    P[i] = {
      chi: i, cung_name: '', can: '', stars: [],
      dai_han_age_start: 0, dai_han_age_end: 0,
      tieu_han_year: null, truong_sinh: '',
      khong_vong: false, is_menh: false, is_than: false,
    }
  }

  function addS(pos: number, name: string, cat: Star['cat'], hoa: Star['hoa'] = null) {
    if (pos < 1 || pos > 12) return
    let vuong_miet: string | null = null
    if (cat === 'chinh' && TRANG_THAI[name]) {
      const code = TRANG_THAI[name][pos]
      vuong_miet = VUONG_MIET_FULL[code] ?? null
    }
    P[pos].stars.push({ name, cat, vuong_miet, hoa })
  }

  // 6. Tên 12 cung + can cung
  for (let id = 1; id <= 12; id++) {
    const pos = dich(cMenh, id - 1)
    P[pos].cung_name = CUNG[id]
    P[pos].can       = CAN[canCung(cn, pos)]
    P[pos].is_menh   = pos === cMenh
    P[pos].is_than   = pos === cThan
  }

  // 7. Vị trí 14 chính tinh
  const tvP    = timTuVi(cucSo, nn)
  const tkP    = dich(tvP, 11)
  const tduP   = dich(tvP,  9)
  const vkP    = dich(tvP,  8)
  const tdP    = dich(tvP,  7)
  const ltP    = dich(tvP,  4)
  const tpP    = _KT(18 - tvP)
  const taP    = dich(tpP,  1)
  const tlangP = dich(tpP,  2)
  const cmP    = dich(tpP,  3)
  const ttuP   = dich(tpP,  4)
  const tluP   = dich(tpP,  5)
  const tsatP  = dich(tpP,  6)
  const pqP    = dich(tpP, 10)

  // 8. An 14 chính tinh
  addS(tvP,    'Tử Vi',        'chinh')
  addS(tkP,    'Thiên Cơ',     'chinh')
  addS(tduP,   'Thái Dương',   'chinh')
  addS(vkP,    'Vũ Khúc',      'chinh')
  addS(tdP,    'Thiên Đồng',   'chinh')
  addS(ltP,    'Liêm Trinh',   'chinh')
  addS(tpP,    'Thiên Phủ',    'chinh')
  addS(taP,    'Thái Âm',      'chinh')
  addS(tlangP, 'Tham Lang',    'chinh')
  addS(cmP,    'Cự Môn',       'chinh')
  addS(ttuP,   'Thiên Tướng',  'chinh')
  addS(tluP,   'Thiên Lương',  'chinh')
  addS(tsatP,  'Thất Sát',     'chinh')
  addS(pqP,    'Phá Quân',     'chinh')

  // 9. Trợ tinh (Lục Cát + Lộc Tồn)
  const vanKhucP  = dich(5,  gs - 1)
  const vanXuongP = dich(11, -(gs - 1))
  const taPhuP    = dich(5,  tt - 1)
  const huuBatP   = dich(11, -(tt - 1))
  const khoiP     = MAP_KHOI[cn]
  const vietP     = MAP_VIET[cn]
  const locTonP   = LOC_TON_POS[cn]

  addS(vanKhucP,   'Văn Khúc',   'phu')
  addS(vanXuongP,  'Văn Xương',  'phu')
  addS(taPhuP,     'Tả Phù',     'phu')
  addS(huuBatP,    'Hữu Bật',    'phu')
  addS(khoiP,      'Thiên Khôi', 'phu')
  addS(vietP,      'Thiên Việt', 'phu')
  addS(locTonP,         'Lộc Tồn',    'phu')
  addS(dich(locTonP,8), 'Quốc Ấn',   'phu')
  addS(T_QUAN_MAP[cn],  'Thiên Quan', 'phu')
  addS(T_PHUC_MAP[cn],  'Thiên Phúc', 'phu')
  addS(T_TRUU_MAP[cn],  'Thiên Trù',  'phu')

  // 10. Tứ Hóa (theo can năm sinh)
  const TU_HOA: Record<number,[number,number,number,number]> = {
    1: [ltP,    pqP,      vkP,       tduP],
    2: [tkP,    tluP,     tvP,       taP],
    3: [tdP,    tkP,      vanXuongP, ltP],
    4: [taP,    tdP,      tkP,       cmP],
    5: [tlangP, taP,      huuBatP,   tkP],
    6: [vkP,    tlangP,   tluP,      vanKhucP],
    7: [tduP,   vkP,      taP,       tdP],
    8: [cmP,    tduP,     vanKhucP,  vanXuongP],
    9: [tluP,   tvP,      tpP,       vkP],
   10: [pqP,    cmP,      taP,       tlangP],
  }
  const hoaArr = TU_HOA[cn]
  if (hoaArr) {
    addS(hoaArr[0], 'Hóa Lộc',   'phu', 'loc')
    addS(hoaArr[1], 'Hóa Quyền', 'phu', 'quyen')
    addS(hoaArr[2], 'Hóa Khoa',  'phu', 'khoa')
    addS(hoaArr[3], 'Hóa Kỵ',    'sat', 'ky')
  }

  // 11. Sát tinh
  const dalaP        = dich(locTonP, -1)
  const kinhP        = dich(locTonP,  1)
  const [hoaTinhP, linhTinhP] = hoaLinhPos(chiN, gs, gt, adNam)
  const dKiepP       = dich(12,  gs - 1)
  const dKhongP      = dich(12, -(gs - 1))
  const kiepSatP     = KIEP_SAT_MAP[chiN]
  const thienThuongP = dich(cMenh, 5)
  const thienSuP     = dich(cMenh, 7)
  const thienHinhP   = dich(10, tt - 1)
  const thienRieuP   = dich(2,  tt - 1)

  addS(dalaP,        'Đà La',        'sat')
  addS(kinhP,        'Kình Dương',   'sat')
  addS(hoaTinhP,     'Hỏa Tinh',     'sat')
  addS(linhTinhP,    'Linh Tinh',    'sat')
  addS(dKiepP,       'Địa Kiếp',     'sat')
  addS(dKhongP,      'Địa Không',    'sat')
  addS(kiepSatP,     'Kiếp Sát',     'sat')
  addS(thienThuongP, 'Thiên Thương', 'sat')
  addS(thienSuP,     'Thiên Sứ',     'sat')
  addS(thienHinhP,   'Thiên Hình',   'sat')
  addS(thienRieuP,   'Thiên Riêu',   'sat')

  // 12. Phi tinh theo Chi Năm
  for (let i = 0; i < 12; i++) {
    const name = THAI_TUE_NAMES[i]
    addS(dich(chiN, i), name, SAT_SET.has(name) ? 'sat' : 'phu')
  }
  const hongLoanP  = dich(4, -(chiN - 1))
  const thienHiP   = dich(hongLoanP, 6)
  const daoPhoaP   = DAO_HOA_MAP[chiN]
  const thienMaP   = THIEN_MA_MAP[chiN]
  const thienKhocP = dich(7, -(chiN - 1))
  const thienHuP   = dich(7,   chiN - 1)
  const coThanP    = coThanPos(chiN)
  const quaTuP     = dich(coThanP, -4)
  const longTriP   = dich(5,  chiN - 1)
  const phuongCacP = dich(11, -(chiN - 1))
  const duongPhuP  = dich(8,  chiN - 1)
  const hoaCaiP    = HOA_CAI_MAP[chiN]
  const phaToaiP   = PHA_TOAI_MAP[chiN]
  const thienDucP  = dich(10, chiN - 1)
  const nguyetDucP = dich(6,  chiN - 1)
  const thienKhongP = dich(chiN, 1)

  addS(hongLoanP,   'Hồng Loan',   'phu')
  addS(thienHiP,    'Thiên Hỉ',    'phu')
  addS(daoPhoaP,    'Đào Hoa',     'phu')
  addS(thienMaP,    'Thiên Mã',    'phu')
  addS(thienKhocP,  'Thiên Khốc',  'sat')
  addS(thienHuP,    'Thiên Hư',    'sat')
  addS(coThanP,     'Cô Thần',     'sat')
  addS(quaTuP,      'Quả Tú',      'sat')
  addS(longTriP,    'Long Trì',    'phu')
  addS(phuongCacP,  'Phượng Các',  'phu')
  addS(phuongCacP,  'Giải Thần',   'phu')   // đồng cung Phượng Các
  addS(duongPhuP,   'Đường Phù',   'phu')
  addS(hoaCaiP,     'Hoa Cái',     'phu')
  addS(phaToaiP,    'Phá Toái',    'sat')
  addS(thienDucP,   'Thiên Đức',   'phu')
  addS(nguyetDucP,  'Nguyệt Đức',  'phu')
  addS(thienKhongP, 'Thiên Không', 'sat')

  // 13. Phi tinh theo Can Năm
  addS(LUU_HA_MAP[cn], 'Lưu Hà', 'phu')

  // 14. Phi tinh theo Tháng
  const thienYP    = dich(2, tt - 1)
  const thienGiaiP = dich(9, tt - 1)
  const diaGiaiP   = dich(8, tt - 1)
  addS(thienYP,    'Thiên Y',    'phu')
  addS(thienGiaiP, 'Thiên Giải', 'phu')
  addS(diaGiaiP,   'Địa Giải',   'phu')

  // 15. Phi tinh theo Ngày
  addS(dich(5,    tt + nn - 2),    'Tam Thai',  'phu')
  addS(dich(11, -(tt + nn - 2)),   'Bát Tọa',   'phu')
  addS(dich(vanXuongP,   nn - 2),  'Ân Quang',  'phu')
  addS(dich(vanKhucP,  -(nn - 2)), 'Thiên Quý', 'phu')

  // 16. Phi tinh theo Giờ
  addS(dich(vanKhucP,  2), 'Thai Phụ',  'phu')
  addS(dich(vanKhucP, -2), 'Phong Cáo', 'phu')

  // 17. Phi tinh từ Mệnh/Thân
  addS(dich(cMenh, chiN - 1), 'Thiên Tài', 'phu')
  addS(dich(cThan, chiN - 1), 'Thiên Thọ', 'phu')

  // 18. Đẩu Quân
  addS(dich(chiN, -(tt - 1), gs - 1), 'Đẩu Quân', 'phu')

  // 19. Vòng Bác Sĩ
  const dirBS = gt * adNam
  for (let i = 0; i < 12; i++) {
    const name = BAC_SI_NAMES[i]
    addS(dich(locTonP, i * dirBS), name, SAT_SET.has(name) ? 'sat' : 'phu')
  }

  // 20. Vòng Tràng Sinh
  const tsStart = TS_START[cucSo] ?? 3
  const dirTS   = gt * adNam
  for (let i = 0; i < 12; i++) {
    P[dich(tsStart, i * dirTS)].truong_sinh = TRANG_SINH_NAMES[i]
  }

  // 21. Đại Hạn
  const amNU = gt * adChiN
  for (let i = 1; i <= 12; i++) {
    const kc = amNU === 1 ? (i - cMenh + 12) % 12 : (cMenh - i + 12) % 12
    P[i].dai_han_age_start = cucSo + kc * 10
    P[i].dai_han_age_end   = cucSo + kc * 10 + 9
  }

  // 22. Tiểu Hạn — đánh dấu cung có tiểu hạn năm xem
  const chiNamXem     = chiNam(namXem)
  const startTH       = TIEU_HAN_START[chiN] ?? 5
  const dirTH         = gt === 1 ? 1 : -1
  const iTH           = (chiNamXem - chiN + 12) % 12
  P[dich(startTH, iTH * dirTH)].tieu_han_year = namXem

  // 23. Tuần Trung (Tuần Không / Khong Vong)
  const tuan1 = dich(chiN, 11 - cn)
  const tuan2 = dich(tuan1, 1)
  P[tuan1].khong_vong = true
  P[tuan2].khong_vong = true

  // 24. Triệt Lộ (thêm vào stars để frontend hiển thị)
  const trietChi = TRIET_MAP[cn]
  if (trietChi) {
    addS(trietChi[0], 'Triệt Lộ', 'sat')
    addS(trietChi[1], 'Triệt Lộ', 'sat')
  }

  // 25. Thiên La / Địa Võng (thêm vào stars để frontend hiển thị)
  addS(5,  'Thiên La', 'sat')
  addS(11, 'Địa Võng', 'sat')

  // 26. Lưu Phi Tinh (Năm + tùy chọn Tháng)
  const canNamXem = canNam(namXem)
  const birthPos  = { ltP, pqP, vkP, tduP, tkP, tluP, tvP, taP, tdP, cmP, tlangP, huuBatP, vanKhucP, vanXuongP, tpP }

  function anLuuTinh(can: number, chi: number, isNam: boolean) {
    const cat: Star['cat'] = isNam ? 'luu' : 'luu_thang'
    const pre = isNam ? 'L.Năm ' : 'L.Tháng '

    function addL(pos: number, name: string) {
      if (pos < 1 || pos > 12) return
      P[pos].stars.push({ name: pre + name, cat, vuong_miet: null, hoa: null })
    }

    // Theo can lưu
    const llt = LOC_TON_POS[can]
    addL(llt,           'Lộc Tồn')
    addL(dich(llt,  1), 'Kình Dương')
    addL(dich(llt, -1), 'Đà La')

    const dL = gt * (can % 2 === 1 ? 1 : -1)
    for (let i = 0; i < 12; i++) addL(dich(llt, i * dL), BAC_SI_NAMES[i])

    addL(MAP_KHOI[can], 'Thiên Khôi')
    addL(MAP_VIET[can], 'Thiên Việt')

    if (isNam) {
      const THL: Record<number,[number,number,number,number]> = {
        1: [birthPos.ltP,    birthPos.pqP,      birthPos.vkP,       birthPos.tduP],
        2: [birthPos.tkP,    birthPos.tluP,     birthPos.tvP,       birthPos.taP],
        3: [birthPos.tdP,    birthPos.tkP,      birthPos.vanXuongP, birthPos.ltP],
        4: [birthPos.taP,    birthPos.tdP,      birthPos.tkP,       birthPos.cmP],
        5: [birthPos.tlangP, birthPos.taP,      birthPos.huuBatP,   birthPos.tkP],
        6: [birthPos.vkP,    birthPos.tlangP,   birthPos.tluP,      birthPos.vanKhucP],
        7: [birthPos.tduP,   birthPos.vkP,      birthPos.taP,       birthPos.tdP],
        8: [birthPos.cmP,    birthPos.tduP,     birthPos.vanKhucP,  birthPos.vanXuongP],
        9: [birthPos.tluP,   birthPos.tvP,      birthPos.tpP,       birthPos.vkP],
       10: [birthPos.pqP,    birthPos.cmP,      birthPos.taP,       birthPos.tlangP],
      }
      const h = THL[can]
      if (h) {
        ;['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'].forEach((nm, idx) => {
          if (h[idx]) addL(h[idx], nm)
        })
      }
    }

    addL(LUU_HA_MAP[can], 'Lưu Hà')

    // Theo chi lưu
    for (let i = 0; i < 12; i++) addL(dich(chi, i), THAI_TUE_NAMES[i])

    const lHL = dich(4, -(chi - 1))
    addL(lHL,          'Hồng Loan')
    addL(dich(lHL, 6), 'Thiên Hỉ')
    addL(DAO_HOA_MAP[chi],  'Đào Hoa')
    addL(THIEN_MA_MAP[chi], 'Thiên Mã')
    addL(dich(7, -(chi-1)), 'Thiên Khốc')
    addL(dich(7,   chi-1),  'Thiên Hư')
    addL(dich(5,   chi-1),  'Long Trì')
    addL(dich(11,-(chi-1)), 'Phượng Các')
    addL(dich(8,   chi-1),  'Đường Phù')
    const lCT = coThanPos(chi)
    addL(lCT,           'Cô Thần')
    addL(dich(lCT, -4), 'Quả Tú')
    addL(PHA_TOAI_MAP[chi], 'Phá Toái')

    // Lưu Tuần Không
    const qCL = dich(chi, 10 - can)
    addL(dich(qCL, 1), 'Tuần Không')
    addL(dich(qCL, 2), 'Tuần Không')

    // Lưu Triệt Lộ
    const lt = TRIET_MAP[can]
    if (lt) { addL(lt[0], 'Triệt Lộ'); addL(lt[1], 'Triệt Lộ') }
  }

  anLuuTinh(canNamXem, chiNamXem, true)

  if (thangXem >= 1 && thangXem <= 12) {
    anLuuTinh(canThang(canNamXem, thangXem), chiThang(thangXem), false)
  }

  // 27. Tứ Trụ
  const cnNgay  = canNgayFn(dd, mm, yy)
  const chiNgayV = chiNgayFn(dd, mm, yy)
  const cnGio   = canGioFn(cnNgay, gs)
  const tu_tru = {
    can_nam:   CAN[cn],       chi_nam:   CHI[chiN],
    can_thang: CAN[canThang(cn, tt)], chi_thang: CHI[chiThang(tt)],
    can_ngay:  CAN[cnNgay],   chi_ngay:  CHI[chiNgayV],
    can_gio:   CAN[cnGio],    chi_gio:   CHI[gs],
  }

  return {
    tu_tru,
    cuc_so:    cucSo,
    cuc_name:  cucName,
    cung_menh: cMenh,
    cung_than: cThan,
    _lunar:    lun,   // debug — có thể xóa khi production
    palaces:   P.slice(1),
  }
}

// ─── INPUT VALIDATION ───────────────────────────────────────────────────────

export function validateInput(b: unknown): LasoInput {
  if (!b || typeof b !== 'object') throw new Error('Body phải là JSON object')
  const o = b as Record<string, unknown>
  const n = (k: string, min: number, max: number) => {
    const v = Number(o[k])
    if (!Number.isFinite(v) || v < min || v > max)
      throw new Error(`${k} phải là số từ ${min} đến ${max}`)
    return v
  }
  const g = o['gender']
  if (g !== 'male' && g !== 'female') throw new Error("gender phải là 'male' hoặc 'female'")
  return {
    birth_day:       n('birth_day',       1,  31),
    birth_month:     n('birth_month',     1,  12),
    birth_year:      n('birth_year',   1900, 2100),
    birth_hour_chi:  n('birth_hour_chi',  1,  12),
    gender:          g as 'male' | 'female',
    view_year:       n('view_year',    1900, 2200),
    view_month:      o['view_month'] != null ? n('view_month', 0, 12) : 0,
  }
}
