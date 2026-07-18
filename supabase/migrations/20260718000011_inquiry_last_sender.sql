-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 011: Thêm last_sender_role vào view inquiry_list
-- Để IOT biết ticket nào đang chờ staff trả lời (tin nhắn cuối là của
-- khách hàng, không phải của staff) → hiển thị badge "có chat mới".
-- ═══════════════════════════════════════════════════════════════════

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
  last_msg.last_sender_role
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
