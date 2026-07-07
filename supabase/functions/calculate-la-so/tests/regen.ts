// ─── SINH LẠI GOLDEN FILES ──────────────────────────────────────────────────
// Chạy:  deno run --allow-read --allow-write tests/regen.ts
// (từ thư mục supabase/functions/calculate-la-so/)
//
// Chỉ chạy khi thuật toán thay đổi CÓ CHỦ ĐÍCH. Sau khi chạy, xem git diff
// của tests/golden/ và đưa Master/PM duyệt trước khi commit.

import { calculateLaSo } from '../logic.ts'
import { CASES } from './cases.ts'

const goldenDir = new URL('./golden/', import.meta.url)
await Deno.mkdir(goldenDir, { recursive: true })

let changed = 0
for (const c of CASES) {
  const result = calculateLaSo(c.input)
  const json = JSON.stringify(result, null, 2) + '\n'
  const path = new URL(`${c.name}.json`, goldenDir)

  let old = ''
  try { old = await Deno.readTextFile(path) } catch { /* file mới */ }

  if (old !== json) {
    await Deno.writeTextFile(path, json)
    changed++
    console.log(`✏️  ${c.name}.json ${old ? '(cập nhật)' : '(mới)'}`)
  } else {
    console.log(`✓  ${c.name}.json (không đổi)`)
  }
}

console.log(`\nXong: ${CASES.length} case, ${changed} file thay đổi.`)
if (changed > 0) {
  console.log('→ Xem git diff tests/golden/ và đưa Master duyệt trước khi commit.')
}
