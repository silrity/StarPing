-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 012: Read-tracking cho khách hàng trên ticket
-- Để Customer Portal biết ticket nào vừa được staff trả lời mà khách
-- chưa xem → bubble + highlight, tự tắt khi khách bấm mở ticket đó.
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS customer_last_read_at TIMESTAMPTZ;

-- Backfill: coi như khách đã đọc hết ticket hiện có tại thời điểm deploy,
-- tránh highlight ồ ạt các ticket cũ đã trả lời từ trước.
UPDATE public.inquiries
SET customer_last_read_at = NOW()
WHERE customer_last_read_at IS NULL;

-- ══════════════════════════════════════
-- RPC: khách tự đánh dấu đã đọc ticket của mình (SECURITY DEFINER để
-- không cần mở policy UPDATE rộng cho customer trên bảng inquiries)
-- ══════════════════════════════════════
CREATE OR REPLACE FUNCTION public.mark_inquiry_read(p_inquiry_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.inquiries
  SET customer_last_read_at = NOW()
  WHERE id = p_inquiry_id AND customer_id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_inquiry_read(UUID) TO authenticated;

-- ══════════════════════════════════════
-- View inquiry_list — thêm customer_last_read_at + cờ needs_customer_view
-- (tính sẵn trong SQL để frontend chỉ cần .eq("needs_customer_view", true),
-- tránh so sánh 2 cột ngay trên PostgREST client — không hỗ trợ được).
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
  ) AS needs_customer_view
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
) last_msg ON TRUE;

ALTER VIEW public.inquiry_list SET (security_invoker = true);
