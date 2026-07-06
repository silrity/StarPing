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
    const { inquiry_id, message_id } = await req.json()
    if (!inquiry_id || !message_id) throw new Error('Thiếu inquiry_id hoặc message_id')

    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY chưa được cấu hình')

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    // Lấy thông tin message + inquiry + customer song song
    const [msgRes, inquiryRes] = await Promise.all([
      admin
        .from('inquiry_messages')
        .select('body, sender:users!sender_id(full_name)')
        .eq('id', message_id)
        .single(),
      admin
        .from('inquiries')
        .select('inquiry_code, subject, customer:users!customer_id(full_name, email)')
        .eq('id', inquiry_id)
        .single(),
    ])

    if (msgRes.error)     throw new Error('message: '  + msgRes.error.message)
    if (inquiryRes.error) throw new Error('inquiry: '  + inquiryRes.error.message)

    const message       = msgRes.data
    const inquiry       = inquiryRes.data
    const customer      = inquiry.customer as { full_name: string; email: string }
    const senderName    = (message.sender as { full_name: string }).full_name

    const html = buildReplyHtml(customer.full_name, senderName, inquiry.inquiry_code, inquiry.subject, message.body)

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    EMAIL_FROM,
        to:      [customer.email],
        subject: `Re: ${inquiry.subject} [${inquiry.inquiry_code}]`,
        html,
      }),
    })

    if (!resendRes.ok) {
      const txt = await resendRes.text()
      throw new Error(`Resend ${resendRes.status}: ${txt}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[send-inquiry-reply]', msg)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

function buildReplyHtml(
  customerName: string,
  senderName: string,
  inquiryCode: string,
  subject: string,
  body: string,
): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:16px;background:#0a1420;">
<div style="font-family:'Be Vietnam Pro',Arial,sans-serif;max-width:520px;margin:0 auto;background:#0F1B2D;border-radius:8px;overflow:hidden;border:1px solid rgba(201,162,39,0.15);">

  <div style="background:linear-gradient(135deg,#152237,#0F1B2D);padding:24px 32px;border-bottom:1px solid rgba(201,162,39,0.2);">
    <p style="margin:0;font-size:11px;color:#5A7A9A;letter-spacing:2px;text-transform:uppercase;">Đại Hồng Việt Tử Vi</p>
    <h1 style="margin:6px 0 0;font-size:17px;color:#C9A227;font-weight:600;">💬 Phản hồi từ ban tư vấn</h1>
  </div>

  <div style="padding:28px 32px;">
    <p style="margin:0 0 20px;color:#9AA5B1;font-size:14px;">
      Xin chào <strong style="color:#F4F1EC;">${customerName}</strong>,
    </p>
    <p style="margin:0 0 16px;font-size:13px;color:#5A7A9A;">
      Ban tư vấn đã trả lời câu hỏi của bạn:<br>
      <strong style="color:#C9A227;">${inquiryCode}</strong>
      <span style="color:rgba(244,241,236,0.5)"> — ${subject}</span>
    </p>

    <div style="background:#152237;border:1px solid rgba(201,162,39,0.12);border-left:3px solid #C9A227;border-radius:6px;padding:18px 20px;margin-bottom:20px;">
      <p style="margin:0 0 8px;font-size:12px;color:#5A7A9A;">${senderName} trả lời:</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#D4D0C8;white-space:pre-wrap;">${body}</p>
    </div>
  </div>

  <div style="padding:16px 32px 24px;border-top:1px solid rgba(244,241,236,0.06);">
    <p style="margin:0;font-size:11px;color:#5A7A9A;line-height:1.7;">
      Nội dung mang tính tham khảo, hỗ trợ định hướng quyết định dựa trên hệ thống phân tích chu kỳ cổ học.
      Không thay thế tư vấn chuyên môn về pháp lý, y tế, hoặc tài chính.<br>
      <strong style="color:#C9A227;">Đại Hồng Việt Tử Vi</strong>
    </p>
  </div>

</div>
</body>
</html>`
}
