# SUPABASE BACKEND SETUP — Đại Hồng Việt Tử Vi (ĐVTT)
*Tài liệu kỹ thuật để build toàn bộ Backend & Database trên Supabase*
*Project ID: `gqmjuzpwfpnvlpodqckt` | Cập nhật: 06/2026*

---

## CHECKLIST TỔNG QUAN

### Phase 1 — Database & Auth (làm trước)
- [ ] **1.1** Tạo bảng `profiles` (extend Supabase Auth)
- [ ] **1.2** Tạo bảng `user_profiles` (Bát Tự)
- [ ] **1.3** Tạo bảng `subscriptions`
- [ ] **1.4** Tạo bảng `payments`
- [ ] **1.5** Tạo bảng `nhat_van_content`
- [ ] **1.6** Tạo bảng `notification_log`
- [ ] **1.7** Tạo bảng `whitelist`
- [ ] **1.8** Tạo bảng `audit_log`
- [ ] **1.9** Tạo trigger `updated_at` cho tất cả bảng liên quan
- [ ] **1.10** Bật RLS + viết policies cho từng bảng
- [ ] **1.11** Cấu hình Supabase Auth (email template, rate limit)
- [ ] **1.12** Tạo custom claim `role` trong JWT

### Phase 2 — Edge Functions (core algorithm)
- [ ] **2.1** `calculate-la-so` — thuật toán an sao chính (migrate từ demo_laso_tuvi.html)
- [ ] **2.2** `check-whitelist` — kiểm tra closed beta
- [ ] **2.3** `get-user-la-so` — lấy lá số đã lưu theo user_id

### Phase 3 — Edge Functions (payment)
- [ ] **3.1** `payment-create` — tạo payment record
- [ ] **3.2** `payment-momo-webhook` — nhận & xử lý webhook MoMo
- [ ] **3.3** `payment-bank-confirm` — admin xác nhận chuyển khoản

### Phase 4 — Cron & Notification
- [ ] **4.1** `nhat-van-engine` — Edge Function tính và queue Nhật Vận
- [ ] **4.2** pg_cron job chạy `nhat-van-engine` lúc 06:00 sáng GMT+7
- [ ] **4.3** `send-notification` — gửi qua Email / Zalo OA

### Phase 5 — Frontend Connection
- [ ] **5.1** Cấu hình `anon key` và `service_role key` cho Lovable
- [ ] **5.2** Test API `calculate-la-so` từ Lovable
- [ ] **5.3** Test Auth flow (signup → verify email → trial activate)

---

## 1. KIẾN TRÚC AUTH VỚI SUPABASE

> **Quan trọng:** Supabase Auth có bảng `auth.users` riêng (quản lý email + password hash). KHÔNG tạo lại bảng `users` thủ công.  
> Thay vào đó, dùng bảng `public.profiles` để lưu thêm dữ liệu mở rộng. Một trigger tự động tạo `profiles` khi có user mới đăng ký.

```
auth.users (Supabase quản lý)
    │  id, email, email_confirmed_at, ...
    │
    ▼  (trigger: on_auth_user_created)
public.profiles
    │  id = auth.users.id, full_name, phone_zalo, role, is_active
    │
    ├──▶ public.user_profiles   (Bát Tự)
    ├──▶ public.subscriptions   (gói dịch vụ)
    ├──▶ public.payments        (giao dịch)
    └──▶ public.notification_log
```

---

## 2. DATABASE MIGRATIONS (SQL)

Chạy tuần tự theo thứ tự dưới đây trong **Supabase SQL Editor**.

---

### Migration 001 — Helper Function `updated_at`

```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $func$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;
```

---

### Migration 002 — Bảng `profiles` (extend auth.users)

> ⚠️ Tách thành 4 sub-block riêng để tránh lỗi copy-paste với ký tự `$func$`.  
> Chạy tuần tự: **2a → 2b → 2c → 2d**.

#### 002a — Tạo bảng `profiles`

```sql
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  phone_zalo    TEXT,
  role          TEXT NOT NULL DEFAULT 'customer'
                CHECK (role IN ('customer', 'tu_van_vien', 'van_hanh', 'admin')),
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  customer_code TEXT UNIQUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### 002b — Trigger `updated_at` cho `profiles`

```sql
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

#### 002c — Auto-tạo profile khi user đăng ký

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $func$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone_zalo)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone_zalo'
  );
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### 002d — Auto-generate `customer_code` (DVTT00101, DVTT00102, ...)

```sql
CREATE SEQUENCE IF NOT EXISTS customer_code_seq START 101;

CREATE OR REPLACE FUNCTION public.assign_customer_code()
RETURNS TRIGGER AS $func$
BEGIN
  IF NEW.customer_code IS NULL AND NEW.role = 'customer' THEN
    NEW.customer_code := 'DVTT' || LPAD(nextval('customer_code_seq')::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

CREATE TRIGGER trg_assign_customer_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.assign_customer_code();
```

---

### Migration 003 — Bảng `user_profiles` (Bát Tự)

```sql
CREATE TABLE public.user_profiles (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- ── DƯƠNG LỊCH (input từ user) ───────────────────────────────
  birth_day        INTEGER NOT NULL CHECK (birth_day BETWEEN 1 AND 31),
  birth_month      INTEGER NOT NULL CHECK (birth_month BETWEEN 1 AND 12),
  birth_year       INTEGER NOT NULL CHECK (birth_year BETWEEN 1900 AND 2100),

  -- Giờ sinh: lưu cả giờ thô (0–23) lẫn địa chi đã map (1–12)
  -- birth_hour_input: giờ user nhập thực tế, vd 7 = "7 giờ sáng"
  -- birth_hour_chi:   backend tự map từ birth_hour_input
  --   Mapping: 23,0→Tý(1) | 1,2→Sửu(2) | 3,4→Dần(3) | 5,6→Mão(4)
  --            7,8→Thìn(5) | 9,10→Tỵ(6) | 11,12→Ngọ(7) | 13,14→Mùi(8)
  --            15,16→Thân(9) | 17,18→Dậu(10) | 19,20→Tuất(11) | 21,22→Hợi(12)
  -- Lưu ý: lunar_hour KHÔNG cần field riêng — trong Tử Vi, giờ âm lịch = birth_hour_chi
  --        Can giờ (Thiên Can) được tính động từ can ngày, không cần cache.
  birth_hour_input INTEGER CHECK (birth_hour_input BETWEEN 0 AND 23),
  birth_hour_chi   INTEGER NOT NULL CHECK (birth_hour_chi BETWEEN 1 AND 12),

  gender           TEXT NOT NULL CHECK (gender IN ('male', 'female')),

  -- ── ÂM LỊCH (backend tính và cache lại khi user lưu Bát Tự) ──
  -- ⚠️ Hàm solar→lunar có bổ chính GMT+7 (zT = NewMoon + 0.5 + tz/24)
  --    Khi chạy trên Deno Edge Function (UTC mặc định) BẮT BUỘC giữ nguyên
  --    đoạn bù múi giờ này, nếu không sẽ tính sai ngày âm lịch.
  lunar_day        INTEGER,
  lunar_month      INTEGER,
  lunar_year       INTEGER,
  -- is_leap_month: TRUE khi sinh vào tháng nhuận âm lịch (vd "tháng 3 nhuận")
  -- Hàm solar→lunar trong demo_laso_tuvi.html đã xử lý, trả về field `leap`.
  is_leap_month    BOOLEAN DEFAULT FALSE,

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)  -- mỗi user chỉ có 1 bộ Bát Tự
);

CREATE TRIGGER trg_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

---

### Migration 004 — Bảng `subscriptions`

```sql
CREATE TABLE public.subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_type       TEXT NOT NULL DEFAULT 'trial'
                  CHECK (plan_type IN ('free', 'trial', 'co_ban', 'chuyen_sau', 'chien_luoc')),
  billing_cycle   TEXT CHECK (billing_cycle IN ('monthly', 'yearly')),
  status          TEXT NOT NULL DEFAULT 'trial'
                  CHECK (status IN ('trial', 'active', 'paused', 'expired', 'cancelled', 'suspended')),
  trial_start     DATE,
  trial_end       DATE,
  paid_start      DATE,
  paid_until      DATE,
  paused_at       TIMESTAMPTZ,        -- thời điểm pause
  paused_days     INTEGER DEFAULT 0,  -- tổng số ngày đã pause
  notes           TEXT,               -- ghi chú nội bộ (admin only)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Index để query nhanh users active mỗi ngày (cron job)
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
```

---

### Migration 005 — Bảng `payments`

```sql
CREATE TABLE public.payments (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES public.profiles(id),
  subscription_id       UUID REFERENCES public.subscriptions(id),
  amount                INTEGER NOT NULL CHECK (amount > 0),  -- VNĐ
  payment_method        TEXT NOT NULL CHECK (payment_method IN ('momo', 'bank_transfer')),
  status                TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'expired')),
  plan_type             TEXT NOT NULL,   -- snapshot gói tại thời điểm thanh toán
  billing_cycle         TEXT NOT NULL,   -- snapshot chu kỳ
  reference_code        TEXT UNIQUE NOT NULL,  -- DVTT-XXXXXX-YYYYMMDD
  momo_transaction_id   TEXT UNIQUE,
  bank_reference        TEXT,            -- nội dung CK do user điền
  confirmed_by          UUID REFERENCES public.profiles(id),
  confirmed_at          TIMESTAMPTZ,
  expires_at            TIMESTAMPTZ,     -- 24h sau khi tạo (bank_transfer)
  refund_amount         INTEGER,
  refund_reason         TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_reference_code ON public.payments(reference_code);
```

---

### Migration 006 — Bảng `nhat_van_content`

```sql
CREATE TABLE public.nhat_van_content (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngay         DATE NOT NULL,
  cung_chi     INTEGER CHECK (cung_chi BETWEEN 1 AND 12),  -- NULL = áp dụng mọi cung
  signal_type  TEXT NOT NULL
               CHECK (signal_type IN ('thuan_loi', 'khang_luc', 'trung_tinh')),
  linh_vuc     TEXT NOT NULL
               CHECK (linh_vuc IN ('su_nghiep', 'tai_chinh', 'tinh_cam', 'suc_khoe', 'chung')),
  title        TEXT NOT NULL CHECK (char_length(title) <= 100),
  body         TEXT NOT NULL CHECK (char_length(body) <= 500),
  action_tip   TEXT,
  canh_bao     TEXT,
  created_by   UUID REFERENCES public.profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_nhat_van_updated_at
  BEFORE UPDATE ON public.nhat_van_content
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Index để query nhanh theo ngày (cron job)
CREATE INDEX idx_nhat_van_ngay ON public.nhat_van_content(ngay);
CREATE INDEX idx_nhat_van_ngay_cung ON public.nhat_van_content(ngay, cung_chi);
```

---

### Migration 007 — Bảng `notification_log`

```sql
CREATE TABLE public.notification_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles(id),
  sent_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  channel         TEXT NOT NULL CHECK (channel IN ('zalo', 'email')),
  content_id      UUID REFERENCES public.nhat_van_content(id),
  delivery_status TEXT NOT NULL DEFAULT 'sent'
                  CHECK (delivery_status IN ('sent', 'delivered', 'failed', 'bounced')),
  error_message   TEXT
);

CREATE INDEX idx_notif_log_user_id ON public.notification_log(user_id);
CREATE INDEX idx_notif_log_sent_at ON public.notification_log(sent_at);
```

---

### Migration 008 — Bảng `whitelist`

```sql
CREATE TABLE public.whitelist (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT,
  phone_zalo  TEXT,
  notes       TEXT,
  added_by    UUID REFERENCES public.profiles(id),
  added_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (email IS NOT NULL OR phone_zalo IS NOT NULL)
);

CREATE INDEX idx_whitelist_email ON public.whitelist(email);
CREATE INDEX idx_whitelist_phone ON public.whitelist(phone_zalo);
```

---

### Migration 009 — Bảng `audit_log`

```sql
CREATE TABLE public.audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID NOT NULL REFERENCES public.profiles(id),
  action      TEXT NOT NULL,
  -- Ví dụ action: 'pause_subscription', 'resume_subscription', 'confirm_payment',
  --   'extend_subscription', 'block_user', 'unblock_user', 'create_coupon', 'refund_payment'
  target_type TEXT,   -- 'subscription', 'user', 'payment', 'coupon'
  target_id   UUID,
  details     JSONB,  -- snapshot: { before: {...}, after: {...}, reason: "..." }
  ip_address  INET,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_log_actor ON public.audit_log(actor_id);
CREATE INDEX idx_audit_log_created_at ON public.audit_log(created_at DESC);
```

---

### Migration 010 — System Config (Whitelist Flag)

```sql
CREATE TABLE public.system_config (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_by  UUID REFERENCES public.profiles(id),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed giá trị mặc định
INSERT INTO public.system_config (key, value) VALUES
  ('WHITELIST_ENABLED', 'true'),   -- true = closed beta, false = open registration
  ('TRIAL_DAYS', '3'),
  ('BANK_ACCOUNT_NAME', ''),        -- điền sau khi có tài khoản ngân hàng
  ('BANK_ACCOUNT_NUMBER', ''),
  ('BANK_NAME', '');
```

---

## 3. ROW LEVEL SECURITY (RLS)

Bật RLS trên tất cả bảng. Chạy toàn bộ block SQL dưới đây.

```sql
-- Bật RLS
ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nhat_van_content   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_log   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whitelist          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config      ENABLE ROW LEVEL SECURITY;

-- ── profiles ──────────────────────────────────
-- Customer chỉ xem profile của mình
CREATE POLICY "profiles: customer xem chính mình"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Admin/van_hanh xem tất cả
CREATE POLICY "profiles: staff xem tất cả"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'van_hanh', 'tu_van_vien')
    )
  );

-- Customer update profile của mình
CREATE POLICY "profiles: customer update chính mình"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ── user_profiles (Bát Tự) ────────────────────
CREATE POLICY "user_profiles: owner only"
  ON public.user_profiles FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "user_profiles: staff đọc"
  ON public.user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'van_hanh', 'tu_van_vien')
    )
  );

-- ── subscriptions ─────────────────────────────
CREATE POLICY "subscriptions: customer xem của mình"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "subscriptions: staff full access"
  ON public.subscriptions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'van_hanh')
    )
  );

-- ── payments ──────────────────────────────────
CREATE POLICY "payments: customer xem của mình"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "payments: admin/van_hanh full access"
  ON public.payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'van_hanh')
    )
  );

-- ── nhat_van_content ──────────────────────────
-- Customer đọc content của ngày hôm nay (sau khi đã match ở backend)
CREATE POLICY "nhat_van: authenticated đọc"
  ON public.nhat_van_content FOR SELECT
  TO authenticated USING (true);

-- Chỉ staff mới write
CREATE POLICY "nhat_van: staff write"
  ON public.nhat_van_content FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'van_hanh')
    )
  );

-- ── system_config ─────────────────────────────
-- Tất cả đọc được (FE cần check WHITELIST_ENABLED)
CREATE POLICY "system_config: read all"
  ON public.system_config FOR SELECT TO authenticated USING (true);

-- Chỉ admin update
CREATE POLICY "system_config: admin write"
  ON public.system_config FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ── notification_log ─────────────────────────
CREATE POLICY "notification_log: customer xem của mình"
  ON public.notification_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "notification_log: staff xem tất cả"
  ON public.notification_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role IN ('admin', 'van_hanh')
    )
  );

-- ── whitelist ─────────────────────────────────
-- Chỉ admin quản lý whitelist
CREATE POLICY "whitelist: admin full access"
  ON public.whitelist FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ── audit_log ─────────────────────────────────
CREATE POLICY "audit_log: admin only"
  ON public.audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
```

---

## 4. SUPABASE AUTH CONFIGURATION

### 4.1 Cài đặt trong Dashboard → Authentication → Settings

| Setting | Giá trị |
|---|---|
| Site URL | `https://daiviettinh.tu` (hoặc Vercel URL khi deploy) |
| JWT Expiry | `604800` (7 ngày) |
| Enable email confirmations | ✅ Bật |
| Secure email change | ✅ Bật |
| Enable sign up | ✅ Bật (FE sẽ check whitelist trước khi gọi signUp) |
| Minimum password length | `8` |

### 4.2 Custom JWT Claims (Role)

Để FE và Edge Functions biết `role` của user mà không cần query DB, thêm custom claim vào JWT:

```sql
-- Chạy trong SQL Editor — tạo hook để thêm role vào JWT
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event JSONB)
RETURNS JSONB AS $func$
DECLARE
  claims    JSONB;
  user_role TEXT;
BEGIN
  claims := event->'claims';

  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = (event->>'user_id')::UUID;

  claims := jsonb_set(claims, '{user_role}',
              to_jsonb(COALESCE(user_role, 'customer')));

  RETURN jsonb_set(event, '{claims}', claims);
END;
$func$ LANGUAGE plpgsql STABLE;

GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
```

Sau đó vào **Dashboard → Authentication → Hooks** → bật `custom_access_token_hook`.

### 4.3 Email Templates (tiếng Việt)

Vào **Dashboard → Authentication → Email Templates** và cập nhật:

**Confirm signup:**
```html
<h2>Xác minh địa chỉ email của bạn</h2>
<p>Nhấn vào nút bên dưới để xác minh email và kích hoạt tài khoản Đại Hồng Việt Tử Vi.</p>
<p><a href="{{ .ConfirmationURL }}">Xác Minh Email →</a></p>
<p><small>Link có hiệu lực trong 24 giờ. Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.</small></p>
```

**Reset password:**
```html
<h2>Đặt lại mật khẩu</h2>
<p><a href="{{ .ConfirmationURL }}">Đặt Lại Mật Khẩu →</a></p>
<p><small>Link có hiệu lực trong 1 giờ.</small></p>
```

---

## 5. EDGE FUNCTIONS

### 5.1 Cấu trúc thư mục

```
supabase/functions/
├── calculate-la-so/
│   └── index.ts         ← Thuật toán an sao chính (migrate từ demo_laso_tuvi.html)
├── check-whitelist/
│   └── index.ts
├── get-user-la-so/
│   └── index.ts
├── payment-create/
│   └── index.ts
├── payment-momo-webhook/
│   └── index.ts
└── nhat-van-engine/
    └── index.ts
```

---

### 5.2 `calculate-la-so` — Edge Function quan trọng nhất

**Mô tả:** Nhận Bát Tự → chạy toàn bộ thuật toán → trả JSON 12 cung.  
Đây là việc migrate code từ `docs/demo_laso_tuvi.html` (phần `<script>`) sang TypeScript/Deno.

**Input:**
```typescript
interface LasoInput {
  birth_day: number;       // 1–31
  birth_month: number;     // 1–12
  birth_year: number;      // YYYY (dương lịch)
  birth_hour_chi: number;  // 1=Tý ... 12=Hợi
  gender: 'male' | 'female';
  view_year: number;       // năm xem lưu tinh
  view_month?: number;     // tháng xem lưu tháng (0 = không hiện)
}
```

**Output:**
```typescript
interface LasoOutput {
  tu_tru: {
    can_nam: string;    // "Bính"
    chi_nam: string;    // "Ngọ"
    can_thang: string;
    chi_thang: string;
    can_ngay: string;
    chi_ngay: string;
    can_gio: string;
    chi_gio: string;
  };
  cuc_so: number;         // 2, 3, 4, 5, hoặc 6
  cuc_name: string;       // "Hỏa lục Cục"
  cung_menh: number;      // 1–12 (địa chi)
  cung_than: number;      // 1–12
  palaces: Palace[];
}

interface Palace {
  chi: number;            // 1–12 (địa chi vị trí)
  cung_name: string;      // "Mệnh", "Phụ Mẫu", ...
  can: string;            // can của cung theo ngũ hổ độn
  stars: Star[];
  dai_han_age_start: number;
  dai_han_age_end: number;
  tieu_han_year: number | null;  // năm tiểu hạn nếu trùng view_year
  truong_sinh: string;    // "Trường Sinh", "Mộc Dục", ...
  khong_vong: boolean;
  is_menh: boolean;
  is_than: boolean;
}

interface Star {
  name: string;           // "Tử Vi", "L.Thái Tuế", ...
  cat: 'chinh' | 'phu' | 'luu' | 'luu_thang' | 'sat' | 'khong_vong';
  vuong_miet: string | null;  // "Miếu", "Vượng", "Đắc", "Bình", "Hãm" (chỉ chính tinh)
  hoa: 'loc' | 'quyen' | 'khoa' | 'ky' | null;
}
```

**Template khởi đầu** (`supabase/functions/calculate-la-so/index.ts`):
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const input = await req.json()
    // TODO: validate input
    // TODO: chạy thuật toán (migrate từ demo_laso_tuvi.html)
    const result = calculateLaSo(input)
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
```

---

### 5.3 `check-whitelist` — Kiểm tra Closed Beta

```typescript
// Input: { email?: string, phone_zalo?: string }
// Output: { allowed: boolean, whitelist_enabled: boolean }

// Logic:
// 1. Đọc system_config WHERE key = 'WHITELIST_ENABLED'
// 2. Nếu = 'false' → return { allowed: true, whitelist_enabled: false }
// 3. Nếu = 'true' → query whitelist table, check email OR phone_zalo
// 4. Return { allowed: found, whitelist_enabled: true }
```

---

### 5.4 `payment-create` — Tạo Payment Record

```typescript
// Input: { user_id, plan_type, billing_cycle, payment_method }
// Output: {
//   payment_id,
//   reference_code,       // nếu bank_transfer
//   momo_pay_url,         // nếu momo
//   expires_at,
//   amount
// }

// Logic:
// 1. Tính amount dựa trên plan_type + billing_cycle (bảng giá)
// 2. Tạo reference_code = "DVTT-" + random(6) + "-" + YYYYMMDD
// 3. INSERT vào payments
// 4. Nếu momo: gọi MoMo Partner API → trả về payUrl
// 5. Nếu bank_transfer: set expires_at = NOW() + 24h
```

---

### 5.5 `payment-momo-webhook` — Nhận Callback MoMo

```typescript
// POST từ MoMo server
// Logic:
// 1. Verify MoMo signature (HMAC SHA-256 với secret key)
// 2. Nếu signature invalid → return 400
// 3. Check idempotency: payments WHERE momo_transaction_id = ?
//    Nếu đã xử lý → return 200 (không làm gì)
// 4. Cập nhật payments.status = 'completed'
// 5. Kích hoạt subscription: INSERT hoặc UPDATE subscriptions
// 6. Ghi audit_log
// 7. Gửi email xác nhận (gọi send-notification)
// 8. Return 200 cho MoMo
```

---

### 5.6 `nhat-van-engine` — Nhật Vận Cron

```typescript
// Chạy 06:00 GMT+7 mỗi ngày
// Logic:
// 1. Lấy ngày hôm nay (UTC+7)
// 2. Query tất cả users có subscription status IN ('trial', 'active')
//    VÀ email_verified = true (qua auth.users)
// 3. Với mỗi user:
//    a. Lấy user_profiles (Bát Tự)
//    b. Gọi calculate-la-so với view_year = năm hiện tại
//    c. Xác định cung Tiểu Hạn của năm → cung_chi
//    d. Xác định signal_type dựa trên sao lưu tại cung Tiểu Hạn
//    e. Query nhat_van_content theo ưu tiên 1→4
//    f. Nếu có content → thêm vào queue gửi lúc 07:00
//    g. Nếu không có → ghi log, alert admin
// 4. Queue gửi lúc 07:00 sáng
```

---

## 6. PG_CRON SETUP (Nhật Vận Engine)

Chạy trong SQL Editor sau khi enable `pg_cron` extension:

```sql
-- Bật extension (nếu chưa có)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Cron job chạy 23:00 UTC mỗi ngày = 06:00 GMT+7
SELECT cron.schedule(
  'nhat-van-daily',           -- tên job
  '0 23 * * *',               -- 23:00 UTC = 06:00 GMT+7
  $$
  SELECT net.http_post(
    url := 'https://gqmjuzpwfpnvlpodqckt.supabase.co/functions/v1/nhat-van-engine',
    headers := '{"Authorization": "Bearer <SERVICE_ROLE_KEY>", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);

-- Kiểm tra job đã được tạo
SELECT * FROM cron.job;
```

> **Lưu ý:** Thay `<SERVICE_ROLE_KEY>` bằng key thật — lưu trong Supabase Vault, không hardcode.

---

## 7. ENVIRONMENT VARIABLES

### 7.1 Supabase Project Secrets (Dashboard → Settings → Edge Functions → Secrets)

| Key | Giá trị | Dùng ở |
|---|---|---|
| `SUPABASE_URL` | `https://gqmjuzpwfpnvlpodqckt.supabase.co` | Tất cả Edge Functions |
| `SUPABASE_SERVICE_ROLE_KEY` | Lấy từ Dashboard → Settings → API | Nhat-van-engine, payment |
| `MOMO_PARTNER_CODE` | Từ MoMo Business Portal | payment-create, webhook |
| `MOMO_ACCESS_KEY` | Từ MoMo Business Portal | payment-create |
| `MOMO_SECRET_KEY` | Từ MoMo Business Portal | payment-momo-webhook (verify sig) |
| `MOMO_WEBHOOK_URL` | `https://.../functions/v1/payment-momo-webhook` | Config trên MoMo |
| `RESEND_API_KEY` | Từ resend.com | send-notification |
| `ZALO_OA_ACCESS_TOKEN` | Từ Zalo OA Dashboard | send-notification |
| `EMAIL_FROM` | `noreply@daiviettinh.tu` | send-notification |

### 7.2 Frontend (Lovable) cần 2 keys này

```env
VITE_SUPABASE_URL=https://gqmjuzpwfpnvlpodqckt.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key từ Dashboard → Settings → API>
```

> ⚠️ `anon key` là public (dùng được trên FE). `service_role key` là secret — KHÔNG bao giờ đưa lên FE.

---

## 8. FRONTEND CONNECTION GUIDE (dành cho Lovable)

### 8.1 Cài Supabase Client

Khi setup project Lovable, thêm vào prompt:

```
Dùng Supabase JS client:
- VITE_SUPABASE_URL = https://gqmjuzpwfpnvlpodqckt.supabase.co
- VITE_SUPABASE_ANON_KEY = <anon_key>

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
```

### 8.2 Các API Call FE cần gọi

| Tính năng | Cách gọi |
|---|---|
| Tính lá số (guest) | `supabase.functions.invoke('calculate-la-so', { body: input })` |
| Kiểm tra whitelist | `supabase.functions.invoke('check-whitelist', { body: { email, phone_zalo } })` |
| Đăng ký | `supabase.auth.signUp({ email, password, options: { data: { full_name, phone_zalo } } })` |
| Đăng nhập | `supabase.auth.signInWithPassword({ email, password })` |
| Lấy session | `supabase.auth.getSession()` |
| Lấy lá số user | `supabase.functions.invoke('get-user-la-so', { body: { view_year, view_month } })` |
| Tạo payment | `supabase.functions.invoke('payment-create', { body: { plan_type, billing_cycle, payment_method } })` |
| Lấy subscription | `supabase.from('subscriptions').select('*').eq('user_id', user.id).single()` |

### 8.3 Luồng Auth mà Lovable cần implement

```
1. signUp()
   → Supabase gửi email verify tự động
   → trigger on_auth_user_created tạo profiles record
   → FE redirect đến trang "Kiểm tra email của bạn"

2. User click link verify
   → supabase.auth.verifyOtp() hoặc redirect URL tự xử lý
   → FE detect session → tạo subscriptions record (trial_start = today)
   → Hiện popup "Bạn sẽ nhận luận đoán đầu tiên vào 07:00 sáng [ngày mai]"

3. Đăng nhập bình thường
   → signInWithPassword()
   → getSession() → đọc user_role từ JWT claims
   → Route theo role: customer → dashboard, admin/van_hanh → IOT portal
```

---

## 9. TESTING CHECKLIST

Sau khi setup xong, verify theo thứ tự:

### Database
- [ ] Query `SELECT * FROM public.profiles LIMIT 5` — bảng tồn tại
- [ ] Tạo test user qua Auth → kiểm tra `profiles` record được tạo tự động
- [ ] Customer code được gán đúng format `DVTT00101`

### Edge Functions
- [ ] Test `calculate-la-so` với input mẫu:
  ```json
  {"birth_day":22,"birth_month":4,"birth_year":1985,"birth_hour_chi":5,"gender":"male","view_year":2026}
  ```
  Expected: `cung_menh` và 12 cung có sao đúng
- [ ] Test `check-whitelist` với email chưa có trong whitelist → `allowed: false`

### Auth Flow
- [ ] Signup với email mới → nhận email verify
- [ ] Click verify link → `email_confirmed_at` được set trong `auth.users`
- [ ] Đăng nhập → JWT có `user_role: "customer"`

### RLS
- [ ] User A không đọc được `user_profiles` của User B
- [ ] Anon (chưa login) không đọc được `subscriptions`

---

## 10. THỨ TỰ BUILD KHUYẾN NGHỊ

```
Tuần 1:
  ✅ Migrations 001–010 (Database)
  ✅ RLS policies
  ✅ Auth config + email templates
  ✅ Edge Function: calculate-la-so (migrate thuật toán)

Tuần 2:
  ✅ Edge Function: check-whitelist
  ✅ Edge Function: get-user-la-so
  ✅ Test calculate-la-so khớp với demo_laso_tuvi.html
  ✅ Kết nối Lovable → calculate-la-so (landing page hiển thị lá số thật)

Tuần 3:
  ✅ Edge Function: payment-create + momo-webhook
  ✅ Edge Function: nhat-van-engine
  ✅ pg_cron setup
  ✅ send-notification (Email trước, Zalo sau)
```

---

*File này là nguồn thật duy nhất (single source of truth) cho backend setup.*
*Mọi thay đổi schema/API cần cập nhật file này trước khi implement.*
*Liên kết: `CLAUDE.md` (project rules) · `docs/product/Product.md` (PRD đầy đủ) · `docs/demo_laso_tuvi.html` (thuật toán gốc)*
