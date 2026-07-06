-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 009: Phân loại inquiries — Tư Vấn vs Hỗ Trợ Tài Khoản
-- Tách "Hỗ Trợ" (tài khoản/giao dịch/thanh toán, admin/van_hanh xử lý)
-- ra khỏi "Tư Vấn" (hỏi đáp Tử Vi với tư vấn viên được gán).
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'tu_van'
  CHECK (category IN ('tu_van', 'tai_khoan_thanh_toan'));

CREATE INDEX IF NOT EXISTS idx_inquiries_category ON public.inquiries(category);

-- ══════════════════════════════════════
-- Cập nhật view inquiry_list — thêm category
-- ══════════════════════════════════════

CREATE OR REPLACE VIEW public.inquiry_list AS
SELECT
  i.id,
  i.inquiry_code,
  i.subject,
  i.status,
  i.priority,
  i.channel,
  i.created_at,
  i.updated_at,
  i.customer_id,
  i.assigned_to,
  u.full_name                                       AS user_name,
  u.email                                           AS user_email,
  COALESCE(latest_sub.plan_type, 'free')            AS plan,
  au.full_name                                      AS assigned_to_name,
  COALESCE(msg_stats.message_count, 0)              AS message_count,
  COALESCE(msg_stats.last_message_at, i.created_at) AS last_message_at,
  i.category
FROM public.inquiries i
JOIN public.users u ON u.id = i.customer_id
LEFT JOIN public.users au ON au.id = i.assigned_to
LEFT JOIN LATERAL (
  SELECT plan_type
  FROM public.subscriptions
  WHERE user_id = i.customer_id
  ORDER BY created_at DESC
  LIMIT 1
) latest_sub ON TRUE
LEFT JOIN LATERAL (
  SELECT
    COUNT(*)        AS message_count,
    MAX(created_at) AS last_message_at
  FROM public.inquiry_messages
  WHERE inquiry_id = i.id
) msg_stats ON TRUE;

ALTER VIEW public.inquiry_list SET (security_invoker = true);

-- ══════════════════════════════════════
-- Siết RLS: tư vấn viên chỉ thấy ticket category = 'tu_van'
-- (ticket 'tai_khoan_thanh_toan' chỉ admin/van_hanh xử lý)
-- ══════════════════════════════════════

DROP POLICY IF EXISTS "inquiries: tu_van_vien select assigned" ON public.inquiries;
CREATE POLICY "inquiries: tu_van_vien select assigned"
  ON public.inquiries FOR SELECT
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND assigned_to = auth.uid()
    AND category = 'tu_van'
  );

DROP POLICY IF EXISTS "inquiries: tu_van_vien update own" ON public.inquiries;
CREATE POLICY "inquiries: tu_van_vien update own"
  ON public.inquiries FOR UPDATE
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND assigned_to = auth.uid()
    AND category = 'tu_van'
  )
  WITH CHECK (
    assigned_to = auth.uid() OR assigned_to IS NULL
  );

DROP POLICY IF EXISTS "inquiry_messages: tu_van_vien select assigned" ON public.inquiry_messages;
CREATE POLICY "inquiry_messages: tu_van_vien select assigned"
  ON public.inquiry_messages FOR SELECT
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND EXISTS (
      SELECT 1 FROM public.inquiries i
      WHERE i.id = inquiry_id AND i.assigned_to = auth.uid() AND i.category = 'tu_van'
    )
  );

DROP POLICY IF EXISTS "inquiry_messages: tu_van_vien insert assigned" ON public.inquiry_messages;
CREATE POLICY "inquiry_messages: tu_van_vien insert assigned"
  ON public.inquiry_messages FOR INSERT
  WITH CHECK (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.inquiries i
      WHERE i.id = inquiry_id AND i.assigned_to = auth.uid() AND i.category = 'tu_van'
    )
  );
