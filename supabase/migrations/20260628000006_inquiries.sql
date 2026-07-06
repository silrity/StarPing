-- ═══════════════════════════════════════════════════════════════════
-- ĐVTT — Migration 006: Support Ticket System
-- Bảng inquiries + inquiry_messages + view + RLS
-- ═══════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════
-- 1. BẢNG inquiries (ticket hỗ trợ)
-- ══════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.inquiries (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_code   TEXT        UNIQUE,                          -- DVTT-INQ-000001 (auto)
  customer_id    UUID        NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject        TEXT        NOT NULL,
  status         TEXT        NOT NULL DEFAULT 'open'
                             CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority       TEXT        NOT NULL DEFAULT 'normal'
                             CHECK (priority IN ('high', 'normal')),
  assigned_to    UUID        REFERENCES public.users(id),     -- UUID của staff được gán
  channel        TEXT        NOT NULL DEFAULT 'web_form'
                             CHECK (channel IN ('web_form', 'email')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-generate inquiry_code: DVTT-INQ-000001, DVTT-INQ-000002, ...
CREATE SEQUENCE IF NOT EXISTS inquiry_code_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_inquiry_code()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.inquiry_code IS NULL THEN
    NEW.inquiry_code := 'DVTT-INQ-' || LPAD(nextval('inquiry_code_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_inquiry_code
  BEFORE INSERT ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.generate_inquiry_code();

CREATE TRIGGER trg_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_inquiries_customer    ON public.inquiries(customer_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status      ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_assigned    ON public.inquiries(assigned_to);
CREATE INDEX IF NOT EXISTS idx_inquiries_created     ON public.inquiries(created_at DESC);

-- ══════════════════════════════════════
-- 2. BẢNG inquiry_messages (thread)
-- ══════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.inquiry_messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id  UUID        NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  sender_id   UUID        NOT NULL REFERENCES public.users(id),
  body        TEXT        NOT NULL,
  is_internal BOOLEAN     NOT NULL DEFAULT FALSE,  -- TRUE = staff-only note, không gửi email
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inq_msg_inquiry  ON public.inquiry_messages(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_inq_msg_created  ON public.inquiry_messages(created_at ASC);

-- ══════════════════════════════════════
-- 3. VIEW: inquiry_list (IOT list view)
-- Gộp stats + joins để frontend query đơn giản
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
  COALESCE(msg_stats.last_message_at, i.created_at) AS last_message_at
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

-- RLS chạy theo user đang query (không bypass security)
ALTER VIEW public.inquiry_list SET (security_invoker = true);

-- ══════════════════════════════════════
-- 4. RLS
-- ══════════════════════════════════════

ALTER TABLE public.inquiries         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_messages  ENABLE ROW LEVEL SECURITY;

-- Helpers: kiểm tra role từ JWT app_metadata (tránh recursive query vào users)
-- Được set bởi custom_access_token_hook trong Supabase Auth

-- ── inquiries ────────────────────────────────────────────────

-- Customers chỉ xem ticket của mình
CREATE POLICY "inquiries: customer select own"
  ON public.inquiries FOR SELECT
  USING (auth.uid() = customer_id);

-- Customers tạo ticket (từ web form)
CREATE POLICY "inquiries: customer insert own"
  ON public.inquiries FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Staff (all roles) full access
CREATE POLICY "inquiries: staff all"
  ON public.inquiries FOR ALL
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '')
      IN ('admin', 'van_hanh', 'tu_van_vien')
  );

-- ── inquiry_messages ─────────────────────────────────────────

-- Customers xem tin nhắn public (không internal) trong ticket của mình
CREATE POLICY "inquiry_messages: customer select"
  ON public.inquiry_messages FOR SELECT
  USING (
    is_internal = FALSE
    AND EXISTS (
      SELECT 1 FROM public.inquiries i
      WHERE i.id = inquiry_id AND i.customer_id = auth.uid()
    )
  );

-- Customers gửi tin nhắn (không thể gửi internal note)
CREATE POLICY "inquiry_messages: customer insert"
  ON public.inquiry_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND is_internal = FALSE
    AND EXISTS (
      SELECT 1 FROM public.inquiries i
      WHERE i.id = inquiry_id AND i.customer_id = auth.uid()
    )
  );

-- Staff full access (bao gồm internal notes)
CREATE POLICY "inquiry_messages: staff all"
  ON public.inquiry_messages FOR ALL
  USING (
    COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '')
      IN ('admin', 'van_hanh', 'tu_van_vien')
  );

-- ══════════════════════════════════════
-- 5. REALTIME — cho phép chat 2 chiều live
-- Customer Portal + IOT subscribe postgres_changes trên inquiry_messages
-- ══════════════════════════════════════

ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiry_messages;
