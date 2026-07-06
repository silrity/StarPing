-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 008: Realtime cho bảng inquiries
-- Để IOT thấy ticket mới / vừa được gán ngay mà không cần refresh trang
-- ═══════════════════════════════════════════════════════════════════

ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
