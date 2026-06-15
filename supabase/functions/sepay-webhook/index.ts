import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// SePay calls this via POST with header: Authorization: Apikey <SEPAY_WEBHOOK_SECRET>
// Docs: https://sepay.vn/tai-lieu-ket-noi-api.html

const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY      = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const SEPAY_WEBHOOK_SECRET  = Deno.env.get('SEPAY_WEBHOOK_SECRET') ?? ''

// Reference code pattern: DVTT-XXXXXX-YYYYMMDD
const DVTT_REF_PATTERN = /DVTT[-\s]?([A-Z0-9]{4,8})[-\s]?(\d{8})/i

serve(async (req) => {
  // SePay only calls via POST
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    // ── Verify SePay API key ──────────────────────────────────────────────────
    const authHeader = req.headers.get('Authorization') ?? ''
    const incomingKey = authHeader.replace(/^Apikey\s+/i, '').trim()
    if (SEPAY_WEBHOOK_SECRET && incomingKey !== SEPAY_WEBHOOK_SECRET) {
      console.warn('[sepay-webhook] Invalid API key:', incomingKey.slice(0, 8) + '...')
      return new Response(JSON.stringify({ success: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const payload = await req.json()
    // SePay webhook payload:
    // { id, gateway, transactionDate, accountNumber, subAccount,
    //   code, content, transferType, transferAmount, referenceCode,
    //   description, accumulated }

    const content: string = (payload.content ?? payload.description ?? '').toString()
    const amount:  number = Number(payload.transferAmount ?? 0)

    // ── Tìm reference code DVTT trong nội dung chuyển khoản ──────────────────
    const refMatch = content.match(DVTT_REF_PATTERN)
    if (!refMatch) {
      // Không phải giao dịch của ĐVTT — bỏ qua, trả 200 để SePay không retry
      return new Response(JSON.stringify({ success: true, message: 'not_dvtt' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Chuẩn hóa về format DVTT-XXXXXX-YYYYMMDD
    const referenceCode = `DVTT-${refMatch[1].toUpperCase()}-${refMatch[2]}`

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    // ── Tìm payment record ────────────────────────────────────────────────────
    const { data: payment, error: pmErr } = await admin
      .from('payments')
      .select('id, user_id, amount, status, subscription_id, expires_at')
      .eq('reference_code', referenceCode)
      .single()

    if (pmErr || !payment) {
      console.warn('[sepay-webhook] Payment not found for ref:', referenceCode)
      return new Response(JSON.stringify({ success: true, message: 'payment_not_found' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // ── Kiểm tra trạng thái ───────────────────────────────────────────────────
    if (payment.status === 'completed') {
      return new Response(JSON.stringify({ success: true, message: 'already_confirmed' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (payment.expires_at && new Date(payment.expires_at) < new Date()) {
      await admin.from('payments').update({ status: 'expired' }).eq('id', payment.id)
      return new Response(JSON.stringify({ success: true, message: 'payment_expired' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // ── Log nếu số tiền lệch (vẫn confirm nhưng ghi cảnh báo) ───────────────
    if (Math.abs(amount - payment.amount) > 1000) {
      console.warn(`[sepay-webhook] Amount mismatch — expected ${payment.amount}, received ${amount}, ref: ${referenceCode}`)
    }

    // ── Xác nhận payment ──────────────────────────────────────────────────────
    const { error: updateErr } = await admin
      .from('payments')
      .update({
        status:          'completed',
        confirmed_at:    new Date().toISOString(),
        bank_reference:  payload.referenceCode ?? String(payload.id),
      })
      .eq('id', payment.id)

    if (updateErr) throw new Error('update payment: ' + updateErr.message)

    // ── Kích hoạt subscription ────────────────────────────────────────────────
    const { error: subErr } = await admin
      .from('subscriptions')
      .update({
        status:     'active',
        paid_start: new Date().toISOString().split('T')[0],
      })
      .eq('id', payment.subscription_id)

    if (subErr) throw new Error('activate subscription: ' + subErr.message)

    // ── Audit log ─────────────────────────────────────────────────────────────
    await admin.from('audit_log').insert({
      actor_id:    payment.user_id,
      action:      'sepay_auto_confirm',
      target_type: 'payment',
      target_id:   payment.id,
      details: {
        reference_code: referenceCode,
        amount_received: amount,
        amount_expected: payment.amount,
        gateway:         payload.gateway,
        transaction_date: payload.transactionDate,
      },
    }).catch((e: Error) => console.error('[sepay-webhook] audit_log failed:', e.message))

    console.log(`[sepay-webhook] ✓ Confirmed ${referenceCode} — ${amount.toLocaleString('vi-VN')}đ`)

    return new Response(JSON.stringify({ success: true, message: 'confirmed', reference_code: referenceCode }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[sepay-webhook] Error:', msg)
    // Trả 500 để SePay retry (theo cấu hình retry của SePay)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
