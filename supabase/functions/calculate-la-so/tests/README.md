# Golden Tests — Thuật toán an sao `calculate-la-so`

Bộ test "đóng băng" 23 lá số chuẩn thành JSON (golden files). Mỗi lần chạy test,
code hiện tại tính lại các lá số đó và so từng cung, từng sao với bản chuẩn —
lệch 1 sao là test đỏ và chỉ rõ lệch ở đâu.

## Chạy test

```bash
cd supabase/functions/calculate-la-so
deno test --allow-read tests/
```

**Bắt buộc chạy trước mỗi lần `supabase functions deploy calculate-la-so`.**

## Cấu trúc

```
calculate-la-so/
├── index.ts          ← chỉ serve HTTP (không đụng khi sửa thuật toán)
├── logic.ts          ← ⭐ toàn bộ thuật toán (calculateLaSo, validateInput)
└── tests/
    ├── cases.ts      ← 23 case input + ghi chú mục đích từng case
    ├── golden_test.ts← test runner (so sánh + báo diff theo ngôn ngữ Tử Vi)
    ├── regen.ts      ← sinh lại golden files
    └── golden/       ← 23 file JSON chuẩn (được commit vào git)
```

## Khi sửa thuật toán CÓ CHỦ ĐÍCH (Master ra quyết định mới)

1. Sửa `logic.ts`
2. Chạy test → thấy đỏ ở những cung/sao bị ảnh hưởng → **kiểm tra đúng ý định chưa**
3. Sinh lại golden: `deno run --allow-read --allow-write tests/regen.ts`
4. Xem `git diff tests/golden/` — diff chính là changelog thuật toán
5. Đưa Master/PM duyệt diff → commit

⚠️ **KHÔNG BAO GIỜ** regen chỉ để "cho test xanh" mà không hiểu vì sao lệch.

## Trạng thái xác nhận (`verified` trong cases.ts)

- `verified: false` — golden sinh từ code hiện tại (regression baseline: bảo đảm
  không đổi ngoài ý muốn, chưa bảo đảm đúng tuyệt đối)
- `verified: true` — Master đã xác nhận tay lá số này là đúng

**Việc còn lại:** in PNG từng lá (nút "In lá số" trên web) gửi Master duyệt,
duyệt lá nào thì đổi `verified: true` lá đó. Ưu tiên duyệt trước:
`016-can-canh-tu-hoa` (bảng Tứ Hóa can Canh có tranh cãi giữa các phái),
`008-thang-nhuan`, `006`/`007` (ranh giới Tết), `001` (giờ Tý).

## Thêm case mới

Thêm object vào `CASES` trong `cases.ts` → chạy `regen.ts` → commit cả 2 file.
