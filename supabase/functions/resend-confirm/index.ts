import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY   = Deno.env.get('RESEND_API_KEY') ?? ''
const EMAIL_FROM       = Deno.env.get('EMAIL_FROM') ?? 'Đại Hồng Việt Tử Vi <onboarding@resend.dev>'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email } = await req.json()
    if (!email) throw new Error('Email là bắt buộc')

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    // Lấy tên user để cá nhân hóa email
    const { data: userRow } = await admin
      .from('users')
      .select('full_name, email_verified')
      .eq('email', email.toLowerCase())
      .single()

    if (userRow?.email_verified) {
      return new Response(
        JSON.stringify({ error: 'Email này đã được xác nhận rồi. Vui lòng đăng nhập.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const fullName = userRow?.full_name ?? 'Bạn'

    // Tạo lại confirmation link
    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: 'signup',
      email,
      options: { redirectTo: 'https://tuvidaihongviet.lovable.app/dang-nhap' },
    })

    if (linkErr) throw new Error('Không thể tạo link xác nhận: ' + linkErr.message)
    if (!RESEND_API_KEY) throw new Error('Email chưa được cấu hình, vui lòng liên hệ hỗ trợ.')

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
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:24px 16px;background:#0a1420;font-family:Arial,sans-serif;">
<div style="max-width:520px;margin:0 auto;background:#0F1B2D;border-radius:8px;border:1px solid rgba(201,162,39,0.15);overflow:hidden;">
  <div style="padding:28px 32px 20px;border-bottom:1px solid rgba(201,162,39,0.15);">
    <p style="margin:0 0 4px;font-size:11px;color:#5A7A9A;letter-spacing:2px;text-transform:uppercase;">Đại Hồng Việt Tử Vi</p>
    <h1 style="margin:0;font-size:20px;font-weight:700;color:#C9A227;">Xác nhận tài khoản</h1>
  </div>
  <div style="padding:28px 32px;">
    <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:#D4D0C8;">
      Xin chào <strong style="color:#F4F1EC;">${fullName}</strong>,
    </p>
    <p style="margin:0 0 28px;font-size:14px;line-height:1.8;color:#D4D0C8;">
      Vui lòng nhấn nút bên dưới để xác nhận email và kích hoạt tài khoản <strong style="color:#F4F1EC;">Đại Hồng Việt Tử Vi</strong>:
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
      Nếu bạn không thực hiện đăng ký này, hãy bỏ qua email này.
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
    })

    if (!resendRes.ok) {
      const txt = await resendRes.text()
      throw new Error(`Resend error ${resendRes.status}: ${txt}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[resend-confirm]', msg)
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
