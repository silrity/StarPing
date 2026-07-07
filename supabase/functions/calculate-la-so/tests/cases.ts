// ─── GOLDEN TEST CASES ──────────────────────────────────────────────────────
// Mỗi case nhắm 1 nhánh logic dễ sai của thuật toán an sao.
// Golden file tương ứng: tests/golden/<name>.json (sinh bằng `deno run -A tests/regen.ts`)
//
// ⚠️ QUY TRÌNH KHI THUẬT TOÁN THAY ĐỔI CÓ CHỦ ĐÍCH:
//   1. Chạy lại: deno run --allow-read --allow-write tests/regen.ts
//   2. Xem git diff của tests/golden/ — diff chính là changelog thuật toán
//   3. Master/PM duyệt diff → commit
// KHÔNG BAO GIỜ regen chỉ để "cho test xanh" mà không hiểu vì sao lệch.

import type { LasoInput } from '../logic.ts'

export interface GoldenCase {
  name: string
  note: string
  verified: boolean // true = Master đã xác nhận tay lá số này
  input: LasoInput
}

export const CASES: GoldenCase[] = [
  // ── Cung Thân trùng Mệnh (giờ Tý / Ngọ) ──
  {
    name: '001-gio-ty-than-trung-menh',
    note: 'Giờ Tý → Thân trùng Mệnh (dễ tưởng nhầm là bug)',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/03)
    input: { birth_day: 22, birth_month: 4, birth_year: 1990, birth_hour_chi: 1, gender: 'male', view_year: 2026 },
  },
  {
    name: '002-gio-ngo-than-trung-menh',
    note: 'Giờ Ngọ → Thân trùng Mệnh (trường hợp thứ 2)',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/002)
    input: { birth_day: 22, birth_month: 4, birth_year: 1990, birth_hour_chi: 7, gender: 'male', view_year: 2026 },
  },

  // ── Âm dương nam nữ: cùng ngày giờ, đại hạn/tiểu hạn/vòng sao đảo chiều ──
  {
    name: '003-nam-menh',
    note: 'Nam — so cặp với 004 (đại hạn thuận/nghịch, Hỏa Linh, Bác Sĩ, Tràng Sinh)',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/003)
    input: { birth_day: 15, birth_month: 8, birth_year: 1988, birth_hour_chi: 5, gender: 'male', view_year: 2026 },
  },
  {
    name: '004-nu-menh',
    note: 'Nữ — cùng ngày giờ với 003, mọi vòng nghịch phải đảo',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/02)
    input: { birth_day: 15, birth_month: 8, birth_year: 1988, birth_hour_chi: 5, gender: 'female', view_year: 2026 },
  },

  // ── Cách cục đặc biệt ──
  {
    name: '005-vo-chinh-dieu-menh',
    note: 'Mệnh Vô Chính Diệu (lá đã dùng test ngày 07/07/2026, Mậu Tý VCD)',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/04)
    input: { birth_day: 22, birth_month: 4, birth_year: 1985, birth_hour_chi: 5, gender: 'male', view_year: 2026 },
  },

  // ── Ranh giới Tết âm lịch: năm âm ≠ năm dương ──
  {
    name: '006-truoc-tet',
    note: '28/01/2006 = 29 tháng Chạp Ất Dậu — năm âm phải là 2005',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/05)
    input: { birth_day: 28, birth_month: 1, birth_year: 2006, birth_hour_chi: 3, gender: 'female', view_year: 2026 },
  },
  {
    name: '007-mung-1-tet',
    note: '29/01/2006 = mùng 1 Tết Bính Tuất — năm âm 2006',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/06)
    input: { birth_day: 29, birth_month: 1, birth_year: 2006, birth_hour_chi: 3, gender: 'female', view_year: 2026 },
  },

  // ── Tháng nhuận âm lịch ──
  {
    name: '008-thang-nhuan',
    note: '01/04/2004 rơi vào tháng 2 nhuận Giáp Thân (kiểm tra _lunar.leap = 1)',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/07)
    input: { birth_day: 1, birth_month: 4, birth_year: 2004, birth_hour_chi: 4, gender: 'male', view_year: 2026 },
  },

  // ── Cuối năm dương lịch (vẫn giữa tháng 11 âm) ──
  {
    name: '009-cuoi-nam-duong-lich',
    note: '31/12/1999 — tháng 11 âm Kỷ Mão, sinh giờ Tý',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/009)
    input: { birth_day: 31, birth_month: 12, birth_year: 1999, birth_hour_chi: 1, gender: 'male', view_year: 2026 },
  },

  // ── Phủ 10 can năm sinh (Tứ Hóa mỗi can 1 case; ngày giữa năm để năm âm = năm dương) ──
  {
    name: '010-can-giap-tu-hoa',
    note: 'Giáp Tý 1984 — Liêm/Phá/Vũ/Dương',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/010)
    input: { birth_day: 10, birth_month: 6, birth_year: 1984, birth_hour_chi: 2, gender: 'male', view_year: 2026 },
  },
  {
    name: '011-can-at-tu-hoa',
    note: 'Ất Sửu 1985 — Cơ/Lương/Tử/Âm',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/011)
    input: { birth_day: 5, birth_month: 12, birth_year: 1985, birth_hour_chi: 8, gender: 'female', view_year: 2026 },
  },
  {
    name: '012-can-binh-tu-hoa',
    note: 'Bính Dần 1986 — Đồng/Cơ/Xương/Liêm',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/012)
    input: { birth_day: 17, birth_month: 7, birth_year: 1986, birth_hour_chi: 6, gender: 'male', view_year: 2026 },
  },
  {
    name: '013-can-dinh-tu-hoa',
    note: 'Đinh Mão 1987 — Âm/Đồng/Cơ/Cự',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/013)
    input: { birth_day: 23, birth_month: 9, birth_year: 1987, birth_hour_chi: 10, gender: 'female', view_year: 2026 },
  },
  {
    name: '014-can-mau-tu-hoa',
    note: 'Mậu Thìn 1988 — Tham/Âm/Bật/Cơ',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/014)
    input: { birth_day: 8, birth_month: 5, birth_year: 1988, birth_hour_chi: 12, gender: 'male', view_year: 2026 },
  },
  {
    name: '015-can-ky-tu-hoa',
    note: 'Kỷ Tỵ 1989 — Vũ/Tham/Lương/Khúc',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/015)
    input: { birth_day: 19, birth_month: 6, birth_year: 1989, birth_hour_chi: 5, gender: 'female', view_year: 2026 },
  },
  {
    name: '016-can-canh-tu-hoa',
    note: 'Canh Ngọ 1990 — bảng Tứ Hóa can Canh có tranh cãi giữa các phái, cần Master chốt',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/08) — vẫn nên có Master chốt thêm vì có tranh cãi giữa các phái
    input: { birth_day: 30, birth_month: 8, birth_year: 1990, birth_hour_chi: 7, gender: 'male', view_year: 2026 },
  },
  {
    name: '017-can-tan-tu-hoa',
    note: 'Tân Mùi 1991 — Cự/Dương/Khúc/Xương',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/017)
    input: { birth_day: 11, birth_month: 10, birth_year: 1991, birth_hour_chi: 9, gender: 'female', view_year: 2026 },
  },
  {
    name: '018-can-nham-tu-hoa',
    note: 'Nhâm Thân 1992 — Lương/Tử/Phủ/Vũ',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/018)
    input: { birth_day: 25, birth_month: 5, birth_year: 1992, birth_hour_chi: 11, gender: 'male', view_year: 2026 },
  },
  {
    name: '019-can-quy-tu-hoa',
    note: 'Quý Dậu 1993 — Phá/Cự/Âm/Tham',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/019)
    input: { birth_day: 14, birth_month: 7, birth_year: 1993, birth_hour_chi: 3, gender: 'female', view_year: 2026 },
  },

  // ── Biên thời gian: công thức thiên văn xa hiện tại ──
  {
    name: '020-sinh-1925',
    note: 'Sinh 1925 — kiểm sol2lun ở quá khứ xa',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/09)
    input: { birth_day: 5, birth_month: 3, birth_year: 1925, birth_hour_chi: 5, gender: 'male', view_year: 2026 },
  },
  {
    name: '021-sinh-2008',
    note: 'Sinh 2008 — thế hệ khách trẻ nhất',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/021)
    input: { birth_day: 20, birth_month: 11, birth_year: 2008, birth_hour_chi: 6, gender: 'female', view_year: 2026 },
  },

  // ── Lưu tinh: cùng 1 người, đổi năm xem / tháng xem ──
  {
    name: '022-luu-thang-7',
    note: 'Cùng người với 001 nhưng thêm view_month=7 — phải có sao L.Tháng',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/10)
    input: { birth_day: 22, birth_month: 4, birth_year: 1990, birth_hour_chi: 1, gender: 'male', view_year: 2026, view_month: 7 },
  },
  {
    name: '023-view-year-2024',
    note: 'Cùng người với 001 nhưng xem năm 2024 — L.Năm + Tiểu Hạn phải dời cung',
    verified: true, // Bang xác nhận đúng 07/07/2026 (qua LASO/023)
    input: { birth_day: 22, birth_month: 4, birth_year: 1990, birth_hour_chi: 1, gender: 'male', view_year: 2024 },
  },
]
