-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 010: Trạng thái tư vấn viên (Hoạt động/Tạm nghỉ/Nghỉ dài hạn)
-- Phục vụ tab "Ban Tư Vấn" trong IOT — quản lý đội ngũ tư vấn viên
-- ═══════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════
-- 1. CỘT consultant_status trên users
-- ══════════════════════════════════════

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS consultant_status TEXT NOT NULL DEFAULT 'hoat_dong'
    CHECK (consultant_status IN ('hoat_dong', 'tam_nghi', 'nghi_dai_han'));

-- ══════════════════════════════════════
-- 2. RLS: van_hanh được sửa consultant_status (admin đã có qua p_admin_write)
-- Giới hạn: chỉ sửa row role = 'tu_van_vien', không mở rộng quyền ghi
-- sang tài khoản khác của bảng users.
-- ══════════════════════════════════════

CREATE POLICY "users: admin_vanhanh update consultant_status"
  ON public.users FOR UPDATE
  USING (
    role = 'tu_van_vien'
    AND COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') IN ('admin', 'van_hanh')
  )
  WITH CHECK (role = 'tu_van_vien');

-- ══════════════════════════════════════
-- 3. VIEW consultant_workload — thêm consultant_status + last_assigned_at
-- ══════════════════════════════════════

-- Postgres không cho CREATE OR REPLACE VIEW đổi thứ tự cột đã tồn tại,
-- nên 2 cột mới phải thêm vào CUỐI, giữ nguyên vị trí 4 cột cũ.
CREATE OR REPLACE VIEW public.consultant_workload AS
SELECT
  u.id                                                                              AS consultant_id,
  u.full_name,
  COUNT(DISTINCT i.customer_id) FILTER (WHERE i.status IN ('open', 'in_progress'))  AS active_customers,
  COUNT(i.id)                   FILTER (WHERE i.status IN ('open', 'in_progress'))  AS active_tickets,
  u.consultant_status,
  (SELECT MAX(a.created_at) FROM public.inquiry_assignments a
     WHERE a.to_user = u.id AND a.action = 'assigned')                              AS last_assigned_at
FROM public.users u
LEFT JOIN public.inquiries i ON i.assigned_to = u.id
WHERE u.role = 'tu_van_vien' AND u.is_active = TRUE
GROUP BY u.id, u.full_name, u.consultant_status
ORDER BY u.full_name;

ALTER VIEW public.consultant_workload SET (security_invoker = true);
