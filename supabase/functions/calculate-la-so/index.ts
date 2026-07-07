import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import { calculateLaSo, validateInput } from './logic.ts'

// Thuật toán nằm trọn trong ./logic.ts (pure function, không phụ thuộc Deno API)
// để golden tests import được: xem tests/golden_test.ts

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body  = await req.json()
    const input = validateInput(body)
    const result = calculateLaSo(input)
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
