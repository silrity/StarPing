-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 013: Read-tracking riêng từng nhân viên trên ticket
-- Để IOT biết ticket nào NHÂN VIÊN ĐANG XEM chưa mở qua → highlight
-- "MỚI" trong danh sách, tự tắt khi người đó bấm mở ticket. Riêng từng
-- người (per staff_id) — 1 người bấm xem không tắt highlight cho người
-- khác (vd admin lướt qua không được làm tư vấn viên được gán bỏ sót).
-- Tách biệt với last_sender_role/needs_customer_view (đo "đã trả lời
-- chưa", dùng cho bubble số lượng) — 2 khái niệm khác nhau.
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.inquiry_staff_reads (
  inquiry_id   UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  staff_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (inquiry_id, staff_id)
);

ALTER TABLE public.inquiry_staff_reads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "inquiry_staff_reads: own rows only"
ON public.inquiry_staff_reads
FOR SELECT
USING (staff_id = auth.uid());

-- Không có policy INSERT/UPDATE trực tiếp — bắt buộc qua RPC bên dưới
-- (SECURITY DEFINER) để đảm bảo staff_id luôn = chính người gọi.

-- ══════════════════════════════════════
-- RPC: nhân viên tự đánh dấu đã xem ticket (upsert)
-- ══════════════════════════════════════
CREATE OR REPLACE FUNCTION public.mark_inquiry_read_staff(p_inquiry_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.inquiry_staff_reads (inquiry_id, staff_id, last_read_at)
  VALUES (p_inquiry_id, auth.uid(), NOW())
  ON CONFLICT (inquiry_id, staff_id)
  DO UPDATE SET last_read_at = NOW();
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_inquiry_read_staff(UUID) TO authenticated;

-- ══════════════════════════════════════
-- View inquiry_list — thêm cờ needs_staff_view (tính theo auth.uid()
-- hiện tại, security_invoker nên mỗi người xem thấy giá trị riêng của
-- mình; với khách hàng thì cột này luôn true nhưng không được dùng đến).
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
  i.category,
  last_msg.last_sender_role,
  i.customer_last_read_at,
  (
    last_msg.last_sender_role IS NOT NULL
    AND last_msg.last_sender_role <> 'customer'
    AND COALESCE(msg_stats.last_message_at, i.created_at)
        > COALESCE(i.customer_last_read_at, '-infinity'::timestamptz)
  ) AS needs_customer_view,
  (
    COALESCE(msg_stats.last_message_at, i.created_at)
    > COALESCE(staff_read.last_read_at, '-infinity'::timestamptz)
  ) AS needs_staff_view
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
) msg_stats ON TRUE
LEFT JOIN LATERAL (
  -- Bỏ qua ghi chú nội bộ (is_internal) — khách không thấy, không tính là "đã trả lời"
  SELECT su.role AS last_sender_role
  FROM public.inquiry_messages im
  JOIN public.users su ON su.id = im.sender_id
  WHERE im.inquiry_id = i.id AND im.is_internal = false
  ORDER BY im.created_at DESC
  LIMIT 1
) last_msg ON TRUE
LEFT JOIN LATERAL (
  SELECT last_read_at
  FROM public.inquiry_staff_reads
  WHERE inquiry_id = i.id AND staff_id = auth.uid()
) staff_read ON TRUE;

ALTER VIEW public.inquiry_list SET (security_invoker = true);
