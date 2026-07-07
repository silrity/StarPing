// ─── GOLDEN TESTS CHO THUẬT TOÁN AN SAO ─────────────────────────────────────
// Chạy:  deno test --allow-read tests/
// (từ thư mục supabase/functions/calculate-la-so/)
//
// So sánh output calculateLaSo() hiện tại với golden files đã được duyệt.
// Lệch → báo lỗi theo ngôn ngữ Tử Vi (cung nào, sao nào) chứ không dump JSON.

import { calculateLaSo, type Palace, type Star } from '../logic.ts'
import { CASES } from './cases.ts'

const CHI_NAME = ['', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']

function starKey(s: Star): string {
  return `${s.name} [${s.cat}${s.hoa ? '/' + s.hoa : ''}${s.vuong_miet ? '/' + s.vuong_miet : ''}]`
}

// So 2 kết quả lá số, trả về danh sách khác biệt dạng dễ đọc (rỗng = giống nhau)
function diffLaSo(actual: any, golden: any): string[] {
  const diffs: string[] = []

  // ── Thông tin tổng ──
  for (const k of ['cuc_so', 'cuc_name', 'cung_menh', 'cung_than'] as const) {
    if (actual[k] !== golden[k]) diffs.push(`${k}: kết quả "${actual[k]}" ≠ chuẩn "${golden[k]}"`)
  }
  for (const k of Object.keys(golden.tu_tru ?? {})) {
    if (actual.tu_tru?.[k] !== golden.tu_tru[k]) {
      diffs.push(`tu_tru.${k}: kết quả "${actual.tu_tru?.[k]}" ≠ chuẩn "${golden.tu_tru[k]}"`)
    }
  }
  if (JSON.stringify(actual._lunar) !== JSON.stringify(golden._lunar)) {
    diffs.push(`_lunar: kết quả ${JSON.stringify(actual._lunar)} ≠ chuẩn ${JSON.stringify(golden._lunar)}`)
  }

  // ── Từng cung ──
  const goldenByChi = new Map<number, Palace>((golden.palaces as Palace[]).map((p) => [p.chi, p]))
  for (const ap of actual.palaces as Palace[]) {
    const gp = goldenByChi.get(ap.chi)
    const label = `cung ${CHI_NAME[ap.chi]} (${gp?.cung_name ?? '?'})`
    if (!gp) { diffs.push(`${label}: không có trong golden`); continue }

    for (const k of ['cung_name', 'can', 'dai_han_age_start', 'dai_han_age_end',
                     'tieu_han_year', 'truong_sinh', 'khong_vong', 'is_menh', 'is_than'] as const) {
      if (ap[k] !== gp[k]) diffs.push(`${label} — ${k}: "${ap[k]}" ≠ chuẩn "${gp[k]}"`)
    }

    const aStars = new Set(ap.stars.map(starKey))
    const gStars = new Set(gp.stars.map(starKey))
    for (const s of gStars) if (!aStars.has(s)) diffs.push(`${label} — THIẾU sao: ${s}`)
    for (const s of aStars) if (!gStars.has(s)) diffs.push(`${label} — THỪA sao: ${s}`)
  }

  return diffs
}

for (const c of CASES) {
  Deno.test(`la-so ${c.name}${c.verified ? ' ✓Master' : ''} — ${c.note}`, async () => {
    const goldenPath = new URL(`./golden/${c.name}.json`, import.meta.url)
    let golden: unknown
    try {
      golden = JSON.parse(await Deno.readTextFile(goldenPath))
    } catch {
      throw new Error(
        `Chưa có golden file: tests/golden/${c.name}.json\n` +
        `→ Chạy: deno run --allow-read --allow-write tests/regen.ts`,
      )
    }

    const actual = calculateLaSo(c.input)
    const diffs = diffLaSo(actual, golden)

    if (diffs.length > 0) {
      throw new Error(
        `Lá số lệch so với golden (${diffs.length} khác biệt):\n` +
        diffs.map((d) => `  ✗ ${d}`).join('\n') +
        `\n\nNếu thay đổi thuật toán là CÓ CHỦ ĐÍCH: chạy regen.ts, xem diff, đưa Master duyệt.`,
      )
    }
  })
}
