import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const email: string | undefined      = body.email?.trim().toLowerCase()
    const phone_zalo: string | undefined = body.phone_zalo?.trim()

    if (!email && !phone_zalo) {
      throw new Error('Cần cung cấp email hoặc phone_zalo')
    }

    // Dùng service role để bypass RLS — whitelist không được đọc bởi anon
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    )

    // 1. Kiểm tra flag WHITELIST_ENABLED
    const { data: cfg } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', 'WHITELIST_ENABLED')
      .single()

    if (cfg?.value !== 'true') {
      return ok({ allowed: true, whitelist_enabled: false })
    }

    // 2. Tra whitelist — khớp email HOẶC phone_zalo
    let query = supabase.from('whitelist').select('id', { count: 'exact', head: true })

    if (email && phone_zalo) {
      query = query.or(`email.eq.${email},phone_zalo.eq.${phone_zalo}`)
    } else if (email) {
      query = query.eq('email', email)
    } else {
      query = query.eq('phone_zalo', phone_zalo!)
    }

    const { count, error } = await query
    if (error) throw error

    return ok({ allowed: (count ?? 0) > 0, whitelist_enabled: true })

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

function ok(data: object) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
