import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY   = Deno.env.get('RESEND_API_KEY') ?? ''
// TODO: thay bằng email domain thật khi Resend verify domain (vd: noreply@daihongviet.com)
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') ?? 'Đại Hồng Việt Tử Vi <onboarding@resend.dev>'

// ─── TIỂU HẠN HELPERS ────────────────────────────────────────────────────────

const CHI_MAP: Record<string, number> = {
  'Tý':1,'Sửu':2,'Dần':3,'Mão':4,'Thìn':5,'Tỵ':6,
  'Ngọ':7,'Mùi':8,'Thân':9,'Dậu':10,'Tuất':11,'Hợi':12,
}

function chiNamSolar(y: number): number { return (y + 8) % 12 + 1 }

const TIEU_HAN_START: Record<number, number> = {
  3:5, 7:5, 11:5,
  9:11, 1:11, 5:11,
  6:8, 10:8, 2:8,
  12:2, 4:2, 8:2,
}

function dich(start: number, offset: number): number {
  let r = ((start + offset - 1) % 12) + 1
  if (r <= 0) r += 12
  return r
}

function calcTieuHanCung(chiNBirth: number, chiNView: number, gender: string): number {
  const startTH = TIEU_HAN_START[chiNBirth] ?? 5
  const dirTH   = gender === 'male' ? 1 : -1
  const iTH     = (chiNView - chiNBirth + 12) % 12
  // dich thuận/nghịch iTH bước từ startTH
  let pos = startTH
  for (let i = 0; i < iTH; i++) {
    pos = dich(pos, dirTH)
  }
  return pos
}

// ─── EMAIL TEMPLATE ──────────────────────────────────────────────────────────

function buildEmailHtml(fullName: string, dateStr: string, content: {
  title: string
  body: string
  signal_type: string
  action_tip?: string | null
  canh_bao?: string | null
}): string {
  const sigColor = content.signal_type === 'thuan_loi' ? '#2ECC71'
                 : content.signal_type === 'khang_luc' ? '#C0392B'
                 : '#C9A227'

  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:16px;background:#0a1420;">
<div style="font-family:'Be Vietnam Pro',Arial,sans-serif;max-width:520px;margin:0 auto;background:#0F1B2D;border-radius:8px;overflow:hidden;border:1px solid rgba(201,162,39,0.15);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#152237,#0F1B2D);padding:24px 32px;border-bottom:1px solid rgba(201,162,39,0.2);">
    <p style="margin:0;font-size:11px;color:#5A7A9A;letter-spacing:2px;text-transform:uppercase;">Đại Hồng Việt Tử Vi</p>
    <h1 style="margin:6px 0 0;font-size:17px;color:#C9A227;font-weight:600;">🔔 Nhật Vận ${dateStr}</h1>
  </div>

  <!-- Body -->
  <div style="padding:28px 32px;">
    <p style="margin:0 0 20px;color:#9AA5B1;font-size:14px;">Xin chào <strong style="color:#F4F1EC;">${fullName}</strong>,</p>

    <!-- Content card -->
    <div style="background:#152237;border:1px solid rgba(201,162,39,0.12);border-left:3px solid ${sigColor};border-radius:6px;padding:18px 20px;margin-bottom:20px;">
      <h2 style="margin:0 0 10px;font-size:15px;color:${sigColor};font-weight:600;">${content.title}</h2>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#D4D0C8;">${content.body}</p>
    </div>

    ${content.action_tip ? `
    <!-- Action tip -->
    <div style="background:#152237;border:1px solid rgba(201,162,39,0.1);border-radius:6px;padding:14px 18px;margin-bottom:16px;">
      <p style="margin:0;font-size:13px;color:#F4F1EC;">
        <span style="color:#C9A227;font-weight:600;">💡 Gợi ý hôm nay:</span><br>
        <span style="color:#D4D0C8;line-height:1.6;">${content.action_tip}</span>
      </p>
    </div>` : ''}

    ${content.canh_bao ? `
    <!-- Warning -->
    <div style="background:rgba(192,57,43,0.07);border:1px solid rgba(192,57,43,0.2);border-radius:6px;padding:14px 18px;margin-bottom:16px;">
      <p style="margin:0;font-size:13px;color:#E07B70;">
        <span style="font-weight:600;">⚠️ Lưu ý:</span> ${content.canh_bao}
      </p>
    </div>` : ''}
  </div>

  <!-- Footer -->
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

// ─── MAIN ────────────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {}

    // Allow manual trigger with specific date for backfill/testing
    const today        = new Date().toISOString().split('T')[0]
    const targetDate   = (body.date as string | undefined) ?? today
    const viewYear     = new Date(targetDate).getFullYear()
    const chiNView     = chiNamSolar(viewYear)

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    // 1. Create / resume dispatch log
    const { data: dispatch, error: dispatchErr } = await admin
      .from('notification_dispatch_log')
      .upsert(
        { dispatch_date: targetDate, prediction_type: 'daily', status: 'running', started_at: new Date().toISOString() },
        { onConflict: 'dispatch_date,prediction_type', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (dispatchErr) throw new Error('dispatch_log: ' + dispatchErr.message)
    const dispatchId = dispatch.id

    // 2. Eligible users: active subscription + email verified
    const { data: users, error: usersErr } = await admin
      .from('users')
      .select(`
        id, email, full_name,
        user_profiles ( gender ),
        user_charts ( chi_nam ),
        subscriptions ( status )
      `)
      .eq('email_verified', true)
      .eq('is_active', true)

    if (usersErr) throw new Error('users: ' + usersErr.message)

    const eligible = (users ?? []).filter((u: any) => {
      const sub = Array.isArray(u.subscriptions) ? u.subscriptions[0] : u.subscriptions
      return sub && ['trial', 'active'].includes(sub.status)
    })

    let totalSent   = 0
    let totalFailed = 0
    const errors: string[] = []

    // 3. Process each user
    for (const user of eligible) {
      try {
        const profile = Array.isArray(user.user_profiles) ? user.user_profiles[0] : user.user_profiles
        const chart   = Array.isArray(user.user_charts)   ? user.user_charts[0]   : user.user_charts

        if (!profile || !chart?.chi_nam) {
          errors.push(`user ${user.id}: thiếu profile/chart`)
          totalFailed++
          continue
        }

        const chiNBirth     = CHI_MAP[chart.chi_nam] ?? 1
        const tieuHanCung   = calcTieuHanCung(chiNBirth, chiNView, profile.gender ?? 'male')

        // 4. Match content: specific cung → generic fallback
        let content: any = null
        const { data: specific } = await admin
          .from('nhat_van_content')
          .select('id, title, body, signal_type, action_tip, canh_bao')
          .eq('ngay', targetDate)
          .eq('cung_chi', tieuHanCung)
          .limit(1)
          .maybeSingle()

        if (specific) {
          content = specific
        } else {
          const { data: generic } = await admin
            .from('nhat_van_content')
            .select('id, title, body, signal_type, action_tip, canh_bao')
            .eq('ngay', targetDate)
            .is('cung_chi', null)
            .limit(1)
            .maybeSingle()
          content = generic
        }

        if (!content) {
          const msg = `Không có nội dung ngày ${targetDate}, cung ${tieuHanCung}`
          await admin.from('notification_log').insert({
            user_id: user.id, channel: 'email', prediction_type: 'daily',
            dispatch_id: dispatchId, delivery_status: 'failed', error_message: msg,
          }).catch(() => {})
          errors.push(`user ${user.id}: ${msg}`)
          totalFailed++
          continue
        }

        // 5. Send via Resend
        if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY chưa được cấu hình')

        const d = new Date(targetDate)
        const dateStr = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`
        const html = buildEmailHtml(user.full_name ?? 'Bạn', dateStr, content)

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: EMAIL_FROM,
            to:   [user.email],
            subject: `[ĐHVTV] Nhật Vận ${dateStr}`,
            html,
          }),
        })

        if (!resendRes.ok) {
          const txt = await resendRes.text()
          throw new Error(`Resend ${resendRes.status}: ${txt}`)
        }

        await admin.from('notification_log').insert({
          user_id: user.id, channel: 'email', content_id: content.id,
          prediction_type: 'daily', dispatch_id: dispatchId, delivery_status: 'sent',
        }).catch(() => {})
        totalSent++

      } catch (userErr) {
        const msg = userErr instanceof Error ? userErr.message : String(userErr)
        console.error(`[send-nhat-van] user ${user.id}:`, msg)
        await admin.from('notification_log').insert({
          user_id: user.id, channel: 'email', prediction_type: 'daily',
          dispatch_id: dispatchId, delivery_status: 'failed', error_message: msg,
        }).catch(() => {})
        errors.push(`user ${user.id}: ${msg}`)
        totalFailed++
      }
    }

    // 6. Update dispatch log
    const finalStatus = totalFailed === 0 ? 'completed'
                      : totalSent   >  0  ? 'partial'
                      : 'failed'

    await admin.from('notification_dispatch_log').update({
      total_eligible: eligible.length,
      total_sent:     totalSent,
      total_failed:   totalFailed,
      status:         finalStatus,
      error_summary:  errors.length ? errors.slice(0,10).join(' | ') : null,
      completed_at:   new Date().toISOString(),
    }).eq('id', dispatchId)

    return new Response(JSON.stringify({
      success:         true,
      dispatch_date:   targetDate,
      total_eligible:  eligible.length,
      total_sent:      totalSent,
      total_failed:    totalFailed,
      status:          finalStatus,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[send-nhat-van] fatal:', msg)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
