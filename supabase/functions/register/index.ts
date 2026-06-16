import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL      = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!
const SERVICE_ROLE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()

    // ── Validate input ──
    const full_name:   string = (body.full_name   ?? '').trim()
    const email:       string = (body.email        ?? '').trim().toLowerCase()
    const phone_zalo:  string = (body.phone_zalo   ?? '').trim()
    const password:    string = (body.password      ?? '')
    const birth_day:   number = Number(body.birth_day)
    const birth_month: number = Number(body.birth_month)
    const birth_year:  number = Number(body.birth_year)
    const birth_hour_chi: number = Number(body.birth_hour_chi)
    const gender: string = body.gender

    if (!full_name)  throw new Error('Vui lòng nhập họ tên')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error('Email không hợp lệ')
    if (!phone_zalo) throw new Error('Vui lòng nhập số điện thoại Zalo')
    if (!password || password.length < 8)
      throw new Error('Mật khẩu tối thiểu 8 ký tự')
    if (!Number.isFinite(birth_day)   || birth_day   < 1  || birth_day   > 31)
      throw new Error('Ngày sinh không hợp lệ')
    if (!Number.isFinite(birth_month) || birth_month < 1  || birth_month > 12)
      throw new Error('Tháng sinh không hợp lệ')
    if (!Number.isFinite(birth_year)  || birth_year  < 1900 || birth_year > 2010)
      throw new Error('Năm sinh không hợp lệ')
    if (!Number.isFinite(birth_hour_chi) || birth_hour_chi < 1 || birth_hour_chi > 12)
      throw new Error('Giờ sinh không hợp lệ')
    if (gender !== 'male' && gender !== 'female')
      throw new Error("Giới tính phải là 'male' hoặc 'female'")

    // ── Admin client (bypass RLS) ──
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })

    // ── Kiểm tra whitelist (nếu WHITELIST_ENABLED=true) ──
    const { data: cfg } = await admin
      .from('system_config')
      .select('value')
      .eq('key', 'WHITELIST_ENABLED')
      .single()

    if (cfg?.value === 'true') {
      let wq = admin
        .from('whitelist')
        .select('id', { count: 'exact', head: true })

      if (email && phone_zalo) {
        wq = wq.or(`email.eq.${email},phone_zalo.eq.${phone_zalo}`)
      } else if (email) {
        wq = wq.eq('email', email)
      } else {
        wq = wq.eq('phone_zalo', phone_zalo)
      }

      const { count } = await wq
      if ((count ?? 0) === 0) {
        throw new Error('Tài khoản của bạn chưa được mời tham gia. Vui lòng liên hệ để được cấp quyền truy cập.')
      }
    }

    // ── Tạo Auth user ──
    // admin.createUser không tự gửi confirmation email → phải gọi generateLink sau
    const { data: authData, error: authErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: { full_name, phone_zalo },
    })

    if (authErr) {
      if (authErr.message.includes('already registered') || authErr.message.includes('already exists')) {
        throw new Error('Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.')
      }
      throw new Error(authErr.message)
    }

    const userId = authData.user!.id

    // ── Tạo bản ghi trong bảng users ──
    const { error: userErr } = await admin.from('users').insert({
      id:            userId,
      email,
      phone_zalo,
      full_name,
      role:          'customer',
      is_active:     true,
      email_verified: false,
    })
    if (userErr) throw new Error('Lỗi tạo hồ sơ người dùng: ' + userErr.message)

    // ── Tạo user_profile (bát tự) ──
    const { error: profileErr } = await admin.from('user_profiles').insert({
      user_id:        userId,
      birth_day,
      birth_month,
      birth_year,
      birth_hour_chi,
      gender,
    })
    if (profileErr) throw new Error('Lỗi lưu thông tin sinh: ' + profileErr.message)

    // ── Tạo trial subscription (3 ngày) ──
    const trialStart = new Date()
    const trialEnd   = new Date(trialStart)
    trialEnd.setDate(trialEnd.getDate() + 3)

    const { error: subErr } = await admin.from('subscriptions').insert({
      user_id:      userId,
      plan_type:    'trial',
      billing_cycle: 'monthly',
      status:       'trial',
      trial_start:  trialStart.toISOString().split('T')[0],
      trial_end:    trialEnd.toISOString().split('T')[0],
    })
    if (subErr) throw new Error('Lỗi tạo gói dùng thử: ' + subErr.message)

    // ── Tính và lưu lá số gốc ──
    // Gọi calculate-la-so nội bộ, lọc bỏ lưu tinh, lưu vào user_charts.
    // Dùng view_year=birth_year (không ảnh hưởng sao cố định).
    // Lỗi ở đây KHÔNG block registration — chart có thể tính lại từ IOT.
    try {
      const lasoRes = await fetch(`${SUPABASE_URL}/functions/v1/calculate-la-so`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birth_day, birth_month, birth_year, birth_hour_chi, gender,
          view_year: birth_year,
        }),
      })

      if (lasoRes.ok) {
        const laso = await lasoRes.json()

        // Lọc bỏ sao lưu động (lưu năm + lưu tháng) — chỉ giữ sao cố định
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
          // tieu_han_year bỏ — năm-cụ thể, tính on-the-fly khi cần
        }))

        const { error: chartErr } = await admin.from('user_charts').insert({
          user_id:   userId,
          can_nam:   laso.tu_tru.can_nam,
          chi_nam:   laso.tu_tru.chi_nam,
          can_thang: laso.tu_tru.can_thang,
          chi_thang: laso.tu_tru.chi_thang,
          can_ngay:  laso.tu_tru.can_ngay,
          chi_ngay:  laso.tu_tru.chi_ngay,
          can_gio:   laso.tu_tru.can_gio,
          chi_gio:   laso.tu_tru.chi_gio,
          cung_menh: laso.cung_menh,
          cung_than:  laso.cung_than,
          cuc_so:    laso.cuc_so,
          cuc_name:  laso.cuc_name,
          palaces,
        })
        if (chartErr) console.error('[register] insert user_charts failed:', chartErr.message)
      } else {
        const errText = await lasoRes.text()
        console.error('[register] calculate-la-so HTTP error for', userId, ':', errText)
      }
    } catch (lasoErr) {
      console.error('[register] Failed to compute chart for', userId, lasoErr)
    }

    // ── Gửi email xác nhận qua Supabase Auth mailer ──
    // Dùng /auth/v1/resend thay vì Resend — gửi được cho bất kỳ email nào
    // mà không cần verified domain. Template tuỳ chỉnh trong:
    // Supabase Dashboard → Authentication → Email Templates → "Confirm signup"
    const confirmRes = await fetch(`${SUPABASE_URL}/auth/v1/resend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ type: 'signup', email }),
    }).catch((e: Error) => {
      console.error('[register] resend confirm fetch error:', e.message)
      return null
    })

    if (confirmRes && !confirmRes.ok) {
      const txt = await confirmRes.text().catch(() => '')
      console.warn('[register] resend confirm failed:', confirmRes.status, txt)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.',
        user_id: userId,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(
      JSON.stringify({ error: msg }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
