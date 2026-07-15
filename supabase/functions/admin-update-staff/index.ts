import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Chỉ admin được gọi function này — sửa role/email/password của nhân viên
// khác cần Supabase Admin API (service role), không thể gọi thẳng từ frontend.
// Admin KHÔNG được tự sửa chính mình qua đây (tự khóa/tự hạ quyền) — dùng
// Supabase Dashboard nếu cần sửa tài khoản của chính mình.

const SUPABASE_URL     = Deno.env.get('SUPABASE_URL')!
const ANON_KEY         = Deno.env.get('SUPABASE_ANON_KEY')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const VALID_ROLES = ['admin', 'van_hanh', 'tu_van_vien']

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
    if (callerRole !== 'admin') throw new Error('Chỉ admin mới có quyền thực hiện thao tác này')

    const { target_user_id, action, full_name, role, email, password } = await req.json()
    if (!target_user_id || !action) throw new Error('Thiếu target_user_id hoặc action')

    if (target_user_id === caller.id) {
      throw new Error('Không thể tự sửa tài khoản của chính mình qua đây — dùng Supabase Dashboard.')
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })

    if (action === 'update_profile') {
      if (!full_name?.trim()) throw new Error('Tên không được để trống')
      const { error } = await admin.from('users').update({ full_name: full_name.trim() }).eq('id', target_user_id)
      if (error) throw new Error(error.message)

    } else if (action === 'update_role') {
      if (!VALID_ROLES.includes(role)) throw new Error('Role không hợp lệ')
      const { error: authUpdErr } = await admin.auth.admin.updateUserById(target_user_id, {
        app_metadata: { role },
      })
      if (authUpdErr) throw new Error(authUpdErr.message)
      const { error: dbErr } = await admin.from('users').update({ role }).eq('id', target_user_id)
      if (dbErr) throw new Error(dbErr.message)

    } else if (action === 'update_email') {
      const newEmail = email?.trim().toLowerCase()
      if (!newEmail) throw new Error('Email không được để trống')
      const { error: authUpdErr } = await admin.auth.admin.updateUserById(target_user_id, { email: newEmail })
      if (authUpdErr) throw new Error(authUpdErr.message)
      const { error: dbErr } = await admin.from('users').update({ email: newEmail }).eq('id', target_user_id)
      if (dbErr) throw new Error(dbErr.message)

    } else if (action === 'reset_password') {
      if (!password || password.length < 6) throw new Error('Password phải có ít nhất 6 ký tự')
      const { error: authUpdErr } = await admin.auth.admin.updateUserById(target_user_id, { password })
      if (authUpdErr) throw new Error(authUpdErr.message)

    } else {
      throw new Error('Action không hợp lệ')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[admin-update-staff]', msg)
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
