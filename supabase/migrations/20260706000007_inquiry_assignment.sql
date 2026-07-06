-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 007: Gán tư vấn viên có kiểm soát quyền + workload
-- Chỉ tư vấn viên được gán (hoặc admin/van_hanh) mới xem/trả lời được
-- ticket. Tư vấn viên có thể từ chối (bắt buộc lý do) → về hàng chờ.
-- ═══════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════
-- 1. BẢNG inquiry_assignments (lịch sử gán / từ chối)
-- ══════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.inquiry_assignments (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id  UUID        NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  action      TEXT        NOT NULL CHECK (action IN ('assigned', 'declined')),
  from_user   UUID        REFERENCES public.users(id),   -- người đang giữ trước đó (NULL nếu gán lần đầu)
  to_user     UUID        REFERENCES public.users(id),   -- người được gán (NULL nếu từ chối → về hàng chờ)
  reason      TEXT,                                       -- bắt buộc ở tầng ứng dụng khi action = 'declined'
  actor_id    UUID        NOT NULL REFERENCES public.users(id), -- ai thực hiện hành động
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inq_assign_inquiry ON public.inquiry_assignments(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_inq_assign_created  ON public.inquiry_assignments(created_at DESC);

ALTER TABLE public.inquiry_assignments ENABLE ROW LEVEL SECURITY;

-- Admin + Vận Hành: full access (admin team)
CREATE POLICY "inquiry_assignments: admin_vanhanh all"
  ON public.inquiry_assignments FOR ALL
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '')
      IN ('admin', 'van_hanh')
  );

-- Tư vấn viên: chỉ xem lịch sử liên quan tới chính mình
CREATE POLICY "inquiry_assignments: tu_van_vien select own"
  ON public.inquiry_assignments FOR SELECT
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND (to_user = auth.uid() OR from_user = auth.uid())
  );

-- Tư vấn viên: chỉ tự ghi log "từ chối" cho chính mình
CREATE POLICY "inquiry_assignments: tu_van_vien insert decline"
  ON public.inquiry_assignments FOR INSERT
  WITH CHECK (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND action    = 'declined'
    AND actor_id  = auth.uid()
    AND from_user = auth.uid()
  );

-- ══════════════════════════════════════
-- 2. SIẾT LẠI RLS: inquiries — tư vấn viên chỉ thấy ticket được gán
-- ══════════════════════════════════════

DROP POLICY IF EXISTS "inquiries: staff all" ON public.inquiries;

CREATE POLICY "inquiries: admin_vanhanh all"
  ON public.inquiries FOR ALL
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '')
      IN ('admin', 'van_hanh')
  );

CREATE POLICY "inquiries: tu_van_vien select assigned"
  ON public.inquiries FOR SELECT
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND assigned_to = auth.uid()
  );

-- Tư vấn viên được sửa ticket đang gán cho mình (vd. đổi status),
-- nhưng nếu đổi assigned_to thì chỉ được đặt về NULL (từ chối) —
-- không được tự gán/chuyển cho người khác.
CREATE POLICY "inquiries: tu_van_vien update own"
  ON public.inquiries FOR UPDATE
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND assigned_to = auth.uid()
  )
  WITH CHECK (
    assigned_to = auth.uid() OR assigned_to IS NULL
  );

-- ══════════════════════════════════════
-- 3. SIẾT LẠI RLS: inquiry_messages — tương ứng với quyền ticket
-- ══════════════════════════════════════

DROP POLICY IF EXISTS "inquiry_messages: staff all" ON public.inquiry_messages;

CREATE POLICY "inquiry_messages: admin_vanhanh all"
  ON public.inquiry_messages FOR ALL
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '')
      IN ('admin', 'van_hanh')
  );

CREATE POLICY "inquiry_messages: tu_van_vien select assigned"
  ON public.inquiry_messages FOR SELECT
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND EXISTS (
      SELECT 1 FROM public.inquiries i
      WHERE i.id = inquiry_id AND i.assigned_to = auth.uid()
    )
  );

CREATE POLICY "inquiry_messages: tu_van_vien insert assigned"
  ON public.inquiry_messages FOR INSERT
  WITH CHECK (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'tu_van_vien'
    AND sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.inquiries i
      WHERE i.id = inquiry_id AND i.assigned_to = auth.uid()
    )
  );

-- ══════════════════════════════════════
-- 4. VIEW consultant_workload — theo dõi tải việc
-- Chỉ tính ticket đang active (open/in_progress)
-- ══════════════════════════════════════

CREATE OR REPLACE VIEW public.consultant_workload AS
SELECT
  u.id                                                                        AS consultant_id,
  u.full_name,
  COUNT(DISTINCT i.customer_id) FILTER (WHERE i.status IN ('open', 'in_progress')) AS active_customers,
  COUNT(i.id)                   FILTER (WHERE i.status IN ('open', 'in_progress')) AS active_tickets
FROM public.users u
LEFT JOIN public.inquiries i ON i.assigned_to = u.id
WHERE u.role = 'tu_van_vien' AND u.is_active = TRUE
GROUP BY u.id, u.full_name
ORDER BY u.full_name;

ALTER VIEW public.consultant_workload SET (security_invoker = true);
