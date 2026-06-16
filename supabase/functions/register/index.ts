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

    // ── Gửi email xác nhận qua Resend ──
    // generateLink trả về URL xác nhận, sau đó gửi qua Resend API.
    // Supabase built-in mailer bị rate-limit 2 email/giờ (free tier) → không dùng.
    // ⚠️ Resend sandbox (onboarding@resend.dev) chỉ deliver đến email chủ tài khoản Resend.
    //    Khi có domain verify → đổi EMAIL_FROM env var là xong, không cần sửa code.
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
    const EMAIL_FROM     = Deno.env.get('EMAIL_FROM') ?? 'Đại Hồng Việt Tử Vi <onboarding@resend.dev>'

    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: 'signup',
      email,
      options: { redirectTo: 'https://tuvidaihongviet.lovable.app/dang-nhap' },
    })

    if (linkErr) {
      console.warn('[register] generateLink failed:', linkErr.message)
    } else if (!RESEND_API_KEY) {
      console.warn('[register] RESEND_API_KEY not set — confirmation email NOT sent for', email)
    } else {
      const confirmUrl = linkData.properties.action_link
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from:    EMAIL_FROM,
          to:      [email],
          subject: '[Đại Hồng Việt Tử Vi] Xác nhận tài khoản của bạn',
          html: `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:24px 16px;background:#0a1420;font-family:Arial,sans-serif;">
<div style="max-width:520px;margin:0 auto;background:#0F1B2D;border-radius:8px;border:1px solid rgba(201,162,39,0.15);overflow:hidden;">
  <div style="padding:28px 32px 20px;border-bottom:1px solid rgba(201,162,39,0.15);">
    <p style="margin:0 0 4px;font-size:11px;color:#5A7A9A;letter-spacing:2px;text-transform:uppercase;">Đại Hồng Việt Tử Vi</p>
    <h1 style="margin:0;font-size:20px;font-weight:700;color:#C9A227;">Xác nhận tài khoản</h1>
  </div>
  <div style="padding:28px 32px;">
    <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:#D4D0C8;">
      Cảm ơn <strong style="color:#F4F1EC;">${full_name}</strong> đã đăng ký <strong style="color:#F4F1EC;">Đại Hồng Việt Tử Vi</strong>.
    </p>
    <p style="margin:0 0 28px;font-size:14px;line-height:1.8;color:#D4D0C8;">
      Để kích hoạt tài khoản và bắt đầu nhận phân tích chu kỳ vận trình hàng ngày, vui lòng xác nhận địa chỉ email của bạn:
    </p>
    <div style="text-align:center;margin:0 0 28px;">
      <a href="${confirmUrl}" style="display:inline-block;background:#C9A227;color:#0F1B2D;padding:14px 40px;border-radius:6px;font-size:15px;font-weight:700;text-decoration:none;">
        Xác Nhận Email
      </a>
    </div>
    <p style="margin:0 0 16px;font-size:13px;line-height:1.7;color:#7A8FA5;">
      Link có hiệu lực trong <strong style="color:#9AA8B5;">24 giờ</strong>.<br>
      Sau khi xác nhận, bạn sẽ nhận bản luận đoán Nhật Vận đầu tiên vào <strong style="color:#9AA8B5;">07:00 sáng ngày mai</strong>.
    </p>
    <p style="margin:0;font-size:12px;line-height:1.7;color:#5A7A9A;">
      Nếu bạn không thực hiện đăng ký này, hãy bỏ qua email. Tài khoản sẽ không được kích hoạt.
    </p>
  </div>
  <div style="padding:16px 32px 24px;border-top:1px solid rgba(244,241,236,0.07);">
    <p style="margin:0;font-size:11px;line-height:1.8;color:#5A7A9A;">
      Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học.
      Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính.<br>
      <strong style="color:#C9A227;">Đại Hồng Việt Tử Vi</strong>
    </p>
  </div>
</div>
</body>
</html>`,
        }),
      }).catch((e: Error) => {
        console.error('[register] Resend fetch error:', e.message)
        return null
      })

      if (resendRes && !resendRes.ok) {
        const txt = await resendRes.text().catch(() => '')
        console.warn('[register] Resend send failed:', resendRes.status, txt)
      }
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
