import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { calculateLaSo, validateInput } from '../calculate-la-so/logic.ts'

// Admin sửa ngày/tháng/năm/giờ sinh + giới tính của khách hàng (khách nhập
// sai, hoặc dùng dịch vụ luận đoán giờ sinh). Vì user_charts là lá số ĐÃ
// TÍNH SẴN (cache), đổi bát tự mà không tính lại chart sẽ để lại lá số CŨ SAI
// — nên function này luôn tính lại chart ngay sau khi lưu thông tin mới.
// Cả user_profiles và user_charts đều không có RLS UPDATE cho admin
// (chỉ chủ sở hữu ghi được / staff chỉ đọc) → bắt buộc qua service role.

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!
const ANON_KEY         = Deno.env.get('SUPABASE_ANON_KEY')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    const callerClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    })
    const { data: { user: caller }, error: authErr } = await callerClient.auth.getUser()
    if (authErr || !caller) throw new Error('Chưa đăng nhập')

    const callerRole = (caller.app_metadata as Record<string, unknown> | undefined)?.role
    if (callerRole !== 'admin') throw new Error('Chỉ admin mới có quyền sửa ngày giờ sinh')

    const body = await req.json()
    const user_id: string = body.user_id
    const birth_day: number = Number(body.birth_day)
    const birth_month: number = Number(body.birth_month)
    const birth_year: number = Number(body.birth_year)
    const birth_hour_chi: number = Number(body.birth_hour_chi)
    const gender: string = body.gender

    if (!user_id) throw new Error('Thiếu user_id')
    if (!Number.isFinite(birth_day) || birth_day < 1 || birth_day > 31)
      throw new Error('Ngày sinh không hợp lệ')
    if (!Number.isFinite(birth_month) || birth_month < 1 || birth_month > 12)
      throw new Error('Tháng sinh không hợp lệ')
    const thisYear = new Date().getFullYear()
    if (!Number.isFinite(birth_year) || birth_year < 1900 || birth_year > thisYear)
      throw new Error('Năm sinh không hợp lệ')
    if (!Number.isFinite(birth_hour_chi) || birth_hour_chi < 1 || birth_hour_chi > 12)
      throw new Error('Giờ sinh không hợp lệ')
    if (gender !== 'male' && gender !== 'female')
      throw new Error("Giới tính phải là 'male' hoặc 'female'")

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    // ── Lưu ngày giờ sinh + giới tính mới ──
    // upsert (không phải update) vì một số khách hàng cũ có thể thiếu hẳn
    // row user_profiles (VD: bước tạo profile lúc đăng ký từng lỗi) — update
    // trên 0 row KHÔNG báo lỗi (đúng ngữ nghĩa SQL) nên sẽ âm thầm không lưu
    // gì cả nếu dùng update.
    const { error: profileErr } = await admin
      .from('user_profiles')
      .upsert({ user_id, birth_day, birth_month, birth_year, birth_hour_chi, gender }, { onConflict: 'user_id' })
    if (profileErr) throw new Error('Lỗi lưu thông tin sinh: ' + profileErr.message)

    // ── Tính lại lá số gốc từ ngày sinh mới (bỏ lưu tinh, giống lúc đăng ký) ──
    const laso = calculateLaSo(validateInput({
      birth_day, birth_month, birth_year, birth_hour_chi, gender,
      view_year: birth_year,
    }))

    const palaces = (laso.palaces as any[]).map((p) => ({
      chi:               p.chi,
      cung_name:         p.cung_name,
      can:               p.can,
      stars:             (p.stars as any[]).filter(
                           (s) => s.cat !== 'luu' && s.cat !== 'luu_thang'
                         ),
      dai_han_age_start: p.dai_han_age_start,
      dai_han_age_end:   p.dai_han_age_end,
      truong_sinh:       p.truong_sinh,
      khong_vong:        p.khong_vong,
      is_menh:           p.is_menh,
      is_than:           p.is_than,
    }))

    const { error: chartErr } = await admin.from('user_charts').upsert({
      user_id,
      can_nam:   laso.tu_tru.can_nam,
      chi_nam:   laso.tu_tru.chi_nam,
      can_thang: laso.tu_tru.can_thang,
      chi_thang: laso.tu_tru.chi_thang,
      can_ngay:  laso.tu_tru.can_ngay,
      chi_ngay:  laso.tu_tru.chi_ngay,
      can_gio:   laso.tu_tru.can_gio,
      chi_gio:   laso.tu_tru.chi_gio,
      cung_menh: laso.cung_menh,
      cung_than: laso.cung_than,
      cuc_so:    laso.cuc_so,
      cuc_name:  laso.cuc_name,
      palaces,
      computed_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    if (chartErr) throw new Error('Lỗi tính lại lá số: ' + chartErr.message)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[admin-update-birth-data]', msg)
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
