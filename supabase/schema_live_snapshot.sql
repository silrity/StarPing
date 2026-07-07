-- ═══════════════════════════════════════════════════════════════════
-- SNAPSHOT SCHEMA LIVE DB — chụp ngày 07/07/2026
-- Nguồn: supabase db dump --schema public (project gqmjuzpwfpnvlpodqckt)
-- ⚠️ FILE THAM KHẢO — KHÔNG PHẢI MIGRATION, KHÔNG CHẠY FILE NÀY
-- Mục đích: ghi lại trạng thái THẬT của live DB vì nhiều thay đổi
-- (RLS overhaul 01/07, customer_code, hook...) làm qua SQL Editor
-- không có trong migration files. Chi tiết drift: Enhancement.md mục 15.
-- Sinh lại: supabase db dump -f supabase/schema_live_snapshot.sql --schema public
-- ═══════════════════════════════════════════════════════════════════




SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."assign_customer_code"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.customer_code IS NULL AND NEW.role = 'customer' THEN
    NEW.customer_code := 'DVTT' || LPAD(nextval('customer_code_seq')::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."assign_customer_code"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."custom_access_token_hook"("event" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    AS $$
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
$$;


ALTER FUNCTION "public"."custom_access_token_hook"("event" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_inquiry_code"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.inquiry_code IS NULL THEN
    NEW.inquiry_code := 'DVTT-INQ-' || LPAD(nextval('inquiry_code_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."generate_inquiry_code"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_my_role"() RETURNS "text"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;


ALTER FUNCTION "public"."get_my_role"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin new.updated_at = now(); return new; end; $$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."sync_email_verified"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND (OLD.email_confirmed_at IS NULL) THEN
    UPDATE public.users
    SET
      email_verified    = true,
      email_verified_at = NEW.email_confirmed_at
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."sync_email_verified"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."audit_log" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "actor_id" "uuid" NOT NULL,
    "action" "text" NOT NULL,
    "target_type" "text",
    "target_id" "uuid",
    "details" "jsonb",
    "ip_address" "inet",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."audit_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."inquiries" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "inquiry_code" "text",
    "customer_id" "uuid" NOT NULL,
    "subject" "text" NOT NULL,
    "status" "text" DEFAULT 'open'::"text" NOT NULL,
    "priority" "text" DEFAULT 'normal'::"text" NOT NULL,
    "assigned_to" "uuid",
    "channel" "text" DEFAULT 'web_form'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "category" "text" DEFAULT 'tu_van'::"text" NOT NULL,
    CONSTRAINT "inquiries_category_check" CHECK (("category" = ANY (ARRAY['tu_van'::"text", 'tai_khoan_thanh_toan'::"text"]))),
    CONSTRAINT "inquiries_channel_check" CHECK (("channel" = ANY (ARRAY['web_form'::"text", 'email'::"text"]))),
    CONSTRAINT "inquiries_priority_check" CHECK (("priority" = ANY (ARRAY['high'::"text", 'normal'::"text"]))),
    CONSTRAINT "inquiries_status_check" CHECK (("status" = ANY (ARRAY['open'::"text", 'in_progress'::"text", 'resolved'::"text", 'closed'::"text"])))
);


ALTER TABLE "public"."inquiries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "phone_zalo" "text",
    "full_name" "text" NOT NULL,
    "password_hash" "text",
    "email_verified" boolean DEFAULT false NOT NULL,
    "email_verified_at" timestamp with time zone,
    "role" "text" DEFAULT 'customer'::"text" NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "users_role_check" CHECK (("role" = ANY (ARRAY['customer'::"text", 'tu_van_vien'::"text", 'van_hanh'::"text", 'admin'::"text"])))
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."consultant_workload" WITH ("security_invoker"='true') AS
 SELECT "u"."id" AS "consultant_id",
    "u"."full_name",
    "count"(DISTINCT "i"."customer_id") FILTER (WHERE ("i"."status" = ANY (ARRAY['open'::"text", 'in_progress'::"text"]))) AS "active_customers",
    "count"("i"."id") FILTER (WHERE ("i"."status" = ANY (ARRAY['open'::"text", 'in_progress'::"text"]))) AS "active_tickets"
   FROM ("public"."users" "u"
     LEFT JOIN "public"."inquiries" "i" ON (("i"."assigned_to" = "u"."id")))
  WHERE (("u"."role" = 'tu_van_vien'::"text") AND ("u"."is_active" = true))
  GROUP BY "u"."id", "u"."full_name"
  ORDER BY "u"."full_name";


ALTER VIEW "public"."consultant_workload" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."customer_code_seq"
    START WITH 101
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."customer_code_seq" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."inquiry_assignments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "inquiry_id" "uuid" NOT NULL,
    "action" "text" NOT NULL,
    "from_user" "uuid",
    "to_user" "uuid",
    "reason" "text",
    "actor_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "inquiry_assignments_action_check" CHECK (("action" = ANY (ARRAY['assigned'::"text", 'declined'::"text"])))
);


ALTER TABLE "public"."inquiry_assignments" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."inquiry_code_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."inquiry_code_seq" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."inquiry_messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "inquiry_id" "uuid" NOT NULL,
    "sender_id" "uuid" NOT NULL,
    "body" "text" NOT NULL,
    "is_internal" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."inquiry_messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "plan_type" "text" DEFAULT 'trial'::"text" NOT NULL,
    "billing_cycle" "text",
    "status" "text" DEFAULT 'trial'::"text" NOT NULL,
    "trial_start" "date",
    "trial_end" "date",
    "paid_start" "date",
    "paid_until" "date",
    "paused_at" timestamp with time zone,
    "paused_days" integer DEFAULT 0,
    "notes" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "subscriptions_billing_cycle_check" CHECK (("billing_cycle" = ANY (ARRAY['monthly'::"text", 'yearly'::"text"]))),
    CONSTRAINT "subscriptions_plan_type_check" CHECK (("plan_type" = ANY (ARRAY['free'::"text", 'trial'::"text", 'co_ban'::"text", 'chuyen_sau'::"text", 'chien_luoc'::"text"]))),
    CONSTRAINT "subscriptions_status_check" CHECK (("status" = ANY (ARRAY['trial'::"text", 'active'::"text", 'paused'::"text", 'expired'::"text", 'cancelled'::"text", 'suspended'::"text"])))
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."inquiry_list" WITH ("security_invoker"='true') AS
 SELECT "i"."id",
    "i"."inquiry_code",
    "i"."subject",
    "i"."status",
    "i"."priority",
    "i"."channel",
    "i"."created_at",
    "i"."updated_at",
    "i"."customer_id",
    "i"."assigned_to",
    "u"."full_name" AS "user_name",
    "u"."email" AS "user_email",
    COALESCE("latest_sub"."plan_type", 'free'::"text") AS "plan",
    "au"."full_name" AS "assigned_to_name",
    COALESCE("msg_stats"."message_count", (0)::bigint) AS "message_count",
    COALESCE("msg_stats"."last_message_at", "i"."created_at") AS "last_message_at",
    "i"."category"
   FROM (((("public"."inquiries" "i"
     JOIN "public"."users" "u" ON (("u"."id" = "i"."customer_id")))
     LEFT JOIN "public"."users" "au" ON (("au"."id" = "i"."assigned_to")))
     LEFT JOIN LATERAL ( SELECT "subscriptions"."plan_type"
           FROM "public"."subscriptions"
          WHERE ("subscriptions"."user_id" = "i"."customer_id")
          ORDER BY "subscriptions"."created_at" DESC
         LIMIT 1) "latest_sub" ON (true))
     LEFT JOIN LATERAL ( SELECT "count"(*) AS "message_count",
            "max"("inquiry_messages"."created_at") AS "last_message_at"
           FROM "public"."inquiry_messages"
          WHERE ("inquiry_messages"."inquiry_id" = "i"."id")) "msg_stats" ON (true));


ALTER VIEW "public"."inquiry_list" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."nguyet_van_content" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "thang" "date" NOT NULL,
    "cung_chi" integer,
    "signal_type" "text" NOT NULL,
    "title" "text" NOT NULL,
    "tong_quan" "text" NOT NULL,
    "su_nghiep" "text",
    "tai_chinh" "text",
    "tinh_cam" "text",
    "suc_khoe" "text",
    "action_tips" "text",
    "canh_bao" "text",
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "nguyet_van_content_action_tips_check" CHECK (("char_length"("action_tips") <= 400)),
    CONSTRAINT "nguyet_van_content_canh_bao_check" CHECK (("char_length"("canh_bao") <= 300)),
    CONSTRAINT "nguyet_van_content_cung_chi_check" CHECK ((("cung_chi" >= 1) AND ("cung_chi" <= 12))),
    CONSTRAINT "nguyet_van_content_signal_type_check" CHECK (("signal_type" = ANY (ARRAY['thuan_loi'::"text", 'khang_luc'::"text", 'trung_tinh'::"text"]))),
    CONSTRAINT "nguyet_van_content_su_nghiep_check" CHECK (("char_length"("su_nghiep") <= 300)),
    CONSTRAINT "nguyet_van_content_suc_khoe_check" CHECK (("char_length"("suc_khoe") <= 300)),
    CONSTRAINT "nguyet_van_content_tai_chinh_check" CHECK (("char_length"("tai_chinh") <= 300)),
    CONSTRAINT "nguyet_van_content_tinh_cam_check" CHECK (("char_length"("tinh_cam") <= 300)),
    CONSTRAINT "nguyet_van_content_title_check" CHECK (("char_length"("title") <= 120)),
    CONSTRAINT "nguyet_van_content_tong_quan_check" CHECK (("char_length"("tong_quan") <= 800))
);


ALTER TABLE "public"."nguyet_van_content" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."nhat_van_content" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "ngay" "date" NOT NULL,
    "cung_chi" integer,
    "signal_type" "text" NOT NULL,
    "linh_vuc" "text" NOT NULL,
    "title" "text" NOT NULL,
    "body" "text" NOT NULL,
    "action_tip" "text",
    "canh_bao" "text",
    "created_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "nhat_van_content_body_check" CHECK (("char_length"("body") <= 500)),
    CONSTRAINT "nhat_van_content_cung_chi_check" CHECK ((("cung_chi" >= 1) AND ("cung_chi" <= 12))),
    CONSTRAINT "nhat_van_content_linh_vuc_check" CHECK (("linh_vuc" = ANY (ARRAY['su_nghiep'::"text", 'tai_chinh'::"text", 'tinh_cam'::"text", 'suc_khoe'::"text", 'chung'::"text"]))),
    CONSTRAINT "nhat_van_content_signal_type_check" CHECK (("signal_type" = ANY (ARRAY['thuan_loi'::"text", 'khang_luc'::"text", 'trung_tinh'::"text"]))),
    CONSTRAINT "nhat_van_content_title_check" CHECK (("char_length"("title") <= 100))
);


ALTER TABLE "public"."nhat_van_content" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notification_dispatch_log" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "dispatch_date" "date" NOT NULL,
    "prediction_type" "text" NOT NULL,
    "total_eligible" integer DEFAULT 0 NOT NULL,
    "total_sent" integer DEFAULT 0 NOT NULL,
    "total_failed" integer DEFAULT 0 NOT NULL,
    "status" "text" DEFAULT 'running'::"text" NOT NULL,
    "error_summary" "text",
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "completed_at" timestamp with time zone,
    CONSTRAINT "notification_dispatch_log_prediction_type_check" CHECK (("prediction_type" = ANY (ARRAY['daily'::"text", 'monthly'::"text"]))),
    CONSTRAINT "notification_dispatch_log_status_check" CHECK (("status" = ANY (ARRAY['running'::"text", 'completed'::"text", 'partial'::"text", 'failed'::"text"])))
);


ALTER TABLE "public"."notification_dispatch_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notification_log" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "sent_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "channel" "text" NOT NULL,
    "content_id" "uuid",
    "delivery_status" "text" DEFAULT 'sent'::"text" NOT NULL,
    "error_message" "text",
    "prediction_type" "text" DEFAULT 'daily'::"text" NOT NULL,
    "dispatch_id" "uuid",
    CONSTRAINT "notification_log_channel_check" CHECK (("channel" = ANY (ARRAY['zalo'::"text", 'email'::"text"]))),
    CONSTRAINT "notification_log_delivery_status_check" CHECK (("delivery_status" = ANY (ARRAY['sent'::"text", 'delivered'::"text", 'failed'::"text", 'bounced'::"text"]))),
    CONSTRAINT "notification_log_prediction_type_check" CHECK (("prediction_type" = ANY (ARRAY['daily'::"text", 'monthly'::"text"])))
);


ALTER TABLE "public"."notification_log" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "subscription_id" "uuid",
    "amount" integer NOT NULL,
    "payment_method" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "plan_type" "text" NOT NULL,
    "billing_cycle" "text" NOT NULL,
    "reference_code" "text" NOT NULL,
    "momo_transaction_id" "text",
    "bank_reference" "text",
    "confirmed_by" "uuid",
    "confirmed_at" timestamp with time zone,
    "expires_at" timestamp with time zone,
    "refund_amount" integer,
    "refund_reason" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "payments_amount_check" CHECK (("amount" > 0)),
    CONSTRAINT "payments_payment_method_check" CHECK (("payment_method" = ANY (ARRAY['momo'::"text", 'bank_transfer'::"text"]))),
    CONSTRAINT "payments_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'completed'::"text", 'failed'::"text", 'refunded'::"text", 'expired'::"text"])))
);


ALTER TABLE "public"."payments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "full_name" "text" NOT NULL,
    "phone_zalo" "text",
    "role" "text" DEFAULT 'customer'::"text" NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "customer_code" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "profiles_role_check" CHECK (("role" = ANY (ARRAY['customer'::"text", 'tu_van_vien'::"text", 'van_hanh'::"text", 'admin'::"text"])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."system_config" (
    "key" "text" NOT NULL,
    "value" "text" NOT NULL,
    "updated_by" "uuid",
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."system_config" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_charts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "can_nam" "text" NOT NULL,
    "chi_nam" "text" NOT NULL,
    "can_thang" "text" NOT NULL,
    "chi_thang" "text" NOT NULL,
    "can_ngay" "text" NOT NULL,
    "chi_ngay" "text" NOT NULL,
    "can_gio" "text" NOT NULL,
    "chi_gio" "text" NOT NULL,
    "cung_menh" integer NOT NULL,
    "cung_than" integer NOT NULL,
    "cuc_so" integer NOT NULL,
    "cuc_name" "text" NOT NULL,
    "palaces" "jsonb" NOT NULL,
    "computed_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "user_charts_cuc_so_check" CHECK (("cuc_so" = ANY (ARRAY[2, 3, 4, 5, 6]))),
    CONSTRAINT "user_charts_cung_menh_check" CHECK ((("cung_menh" >= 1) AND ("cung_menh" <= 12))),
    CONSTRAINT "user_charts_cung_than_check" CHECK ((("cung_than" >= 1) AND ("cung_than" <= 12)))
);


ALTER TABLE "public"."user_charts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "birth_day" integer NOT NULL,
    "birth_month" integer NOT NULL,
    "birth_year" integer NOT NULL,
    "birth_hour_input" integer,
    "birth_hour_chi" integer NOT NULL,
    "gender" "text" NOT NULL,
    "lunar_day" integer,
    "lunar_month" integer,
    "lunar_year" integer,
    "is_leap_month" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "user_profiles_birth_day_check" CHECK ((("birth_day" >= 1) AND ("birth_day" <= 31))),
    CONSTRAINT "user_profiles_birth_hour_chi_check" CHECK ((("birth_hour_chi" >= 1) AND ("birth_hour_chi" <= 12))),
    CONSTRAINT "user_profiles_birth_hour_input_check" CHECK ((("birth_hour_input" >= 0) AND ("birth_hour_input" <= 23))),
    CONSTRAINT "user_profiles_birth_month_check" CHECK ((("birth_month" >= 1) AND ("birth_month" <= 12))),
    CONSTRAINT "user_profiles_birth_year_check" CHECK ((("birth_year" >= 1900) AND ("birth_year" <= 2100))),
    CONSTRAINT "user_profiles_gender_check" CHECK (("gender" = ANY (ARRAY['male'::"text", 'female'::"text"])))
);


ALTER TABLE "public"."user_profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."whitelist" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text",
    "phone_zalo" "text",
    "notes" "text",
    "added_by" "uuid",
    "added_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "whitelist_check" CHECK ((("email" IS NOT NULL) OR ("phone_zalo" IS NOT NULL)))
);


ALTER TABLE "public"."whitelist" OWNER TO "postgres";


ALTER TABLE ONLY "public"."audit_log"
    ADD CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."inquiries"
    ADD CONSTRAINT "inquiries_inquiry_code_key" UNIQUE ("inquiry_code");



ALTER TABLE ONLY "public"."inquiries"
    ADD CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."inquiry_assignments"
    ADD CONSTRAINT "inquiry_assignments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."inquiry_messages"
    ADD CONSTRAINT "inquiry_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."nguyet_van_content"
    ADD CONSTRAINT "nguyet_van_content_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."nhat_van_content"
    ADD CONSTRAINT "nhat_van_content_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notification_dispatch_log"
    ADD CONSTRAINT "notification_dispatch_log_dispatch_date_prediction_type_key" UNIQUE ("dispatch_date", "prediction_type");



ALTER TABLE ONLY "public"."notification_dispatch_log"
    ADD CONSTRAINT "notification_dispatch_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notification_log"
    ADD CONSTRAINT "notification_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_momo_transaction_id_key" UNIQUE ("momo_transaction_id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_reference_code_key" UNIQUE ("reference_code");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_customer_code_key" UNIQUE ("customer_code");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."system_config"
    ADD CONSTRAINT "system_config_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."user_charts"
    ADD CONSTRAINT "user_charts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_charts"
    ADD CONSTRAINT "user_charts_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."whitelist"
    ADD CONSTRAINT "whitelist_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_audit_log_actor" ON "public"."audit_log" USING "btree" ("actor_id");



CREATE INDEX "idx_audit_log_created_at" ON "public"."audit_log" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_dispatch_date" ON "public"."notification_dispatch_log" USING "btree" ("dispatch_date" DESC);



CREATE INDEX "idx_dispatch_status" ON "public"."notification_dispatch_log" USING "btree" ("status");



CREATE INDEX "idx_inq_assign_created" ON "public"."inquiry_assignments" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_inq_assign_inquiry" ON "public"."inquiry_assignments" USING "btree" ("inquiry_id");



CREATE INDEX "idx_inq_msg_created" ON "public"."inquiry_messages" USING "btree" ("created_at");



CREATE INDEX "idx_inq_msg_inquiry" ON "public"."inquiry_messages" USING "btree" ("inquiry_id");



CREATE INDEX "idx_inquiries_assigned" ON "public"."inquiries" USING "btree" ("assigned_to");



CREATE INDEX "idx_inquiries_category" ON "public"."inquiries" USING "btree" ("category");



CREATE INDEX "idx_inquiries_created" ON "public"."inquiries" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_inquiries_customer" ON "public"."inquiries" USING "btree" ("customer_id");



CREATE INDEX "idx_inquiries_status" ON "public"."inquiries" USING "btree" ("status");



CREATE INDEX "idx_nguyet_van_thang" ON "public"."nguyet_van_content" USING "btree" ("thang");



CREATE INDEX "idx_nguyet_van_thang_cung" ON "public"."nguyet_van_content" USING "btree" ("thang", "cung_chi");



CREATE INDEX "idx_nhat_van_ngay" ON "public"."nhat_van_content" USING "btree" ("ngay");



CREATE INDEX "idx_nhat_van_ngay_cung" ON "public"."nhat_van_content" USING "btree" ("ngay", "cung_chi");



CREATE INDEX "idx_notif_log_dispatch" ON "public"."notification_log" USING "btree" ("dispatch_id");



CREATE INDEX "idx_notif_log_sent_at" ON "public"."notification_log" USING "btree" ("sent_at");



CREATE INDEX "idx_notif_log_type" ON "public"."notification_log" USING "btree" ("prediction_type");



CREATE INDEX "idx_notif_log_user_id" ON "public"."notification_log" USING "btree" ("user_id");



CREATE INDEX "idx_payments_reference_code" ON "public"."payments" USING "btree" ("reference_code");



CREATE INDEX "idx_payments_status" ON "public"."payments" USING "btree" ("status");



CREATE INDEX "idx_payments_user_id" ON "public"."payments" USING "btree" ("user_id");



CREATE INDEX "idx_subscriptions_status" ON "public"."subscriptions" USING "btree" ("status");



CREATE INDEX "idx_subscriptions_user_id" ON "public"."subscriptions" USING "btree" ("user_id");



CREATE INDEX "idx_whitelist_email" ON "public"."whitelist" USING "btree" ("email");



CREATE INDEX "idx_whitelist_phone" ON "public"."whitelist" USING "btree" ("phone_zalo");



CREATE INDEX "whitelist_email_idx" ON "public"."whitelist" USING "btree" ("email");



CREATE INDEX "whitelist_phone_zalo_idx" ON "public"."whitelist" USING "btree" ("phone_zalo");



CREATE OR REPLACE TRIGGER "nguyet_van_content_updated_at" BEFORE UPDATE ON "public"."nguyet_van_content" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "nhat_van_content_updated_at" BEFORE UPDATE ON "public"."nhat_van_content" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "payments_updated_at" BEFORE UPDATE ON "public"."payments" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "subscriptions_updated_at" BEFORE UPDATE ON "public"."subscriptions" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_assign_customer_code" BEFORE INSERT ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."assign_customer_code"();



CREATE OR REPLACE TRIGGER "trg_inquiries_updated_at" BEFORE UPDATE ON "public"."inquiries" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_inquiry_code" BEFORE INSERT ON "public"."inquiries" FOR EACH ROW EXECUTE FUNCTION "public"."generate_inquiry_code"();



CREATE OR REPLACE TRIGGER "trg_nhat_van_updated_at" BEFORE UPDATE ON "public"."nhat_van_content" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "trg_profiles_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "trg_subscriptions_updated_at" BEFORE UPDATE ON "public"."subscriptions" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "trg_user_profiles_updated_at" BEFORE UPDATE ON "public"."user_profiles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "user_profiles_updated_at" BEFORE UPDATE ON "public"."user_profiles" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "users_updated_at" BEFORE UPDATE ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



ALTER TABLE ONLY "public"."audit_log"
    ADD CONSTRAINT "audit_log_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."inquiries"
    ADD CONSTRAINT "inquiries_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."inquiries"
    ADD CONSTRAINT "inquiries_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."inquiry_assignments"
    ADD CONSTRAINT "inquiry_assignments_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."inquiry_assignments"
    ADD CONSTRAINT "inquiry_assignments_from_user_fkey" FOREIGN KEY ("from_user") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."inquiry_assignments"
    ADD CONSTRAINT "inquiry_assignments_inquiry_id_fkey" FOREIGN KEY ("inquiry_id") REFERENCES "public"."inquiries"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."inquiry_assignments"
    ADD CONSTRAINT "inquiry_assignments_to_user_fkey" FOREIGN KEY ("to_user") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."inquiry_messages"
    ADD CONSTRAINT "inquiry_messages_inquiry_id_fkey" FOREIGN KEY ("inquiry_id") REFERENCES "public"."inquiries"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."inquiry_messages"
    ADD CONSTRAINT "inquiry_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."nguyet_van_content"
    ADD CONSTRAINT "nguyet_van_content_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."nhat_van_content"
    ADD CONSTRAINT "nhat_van_content_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."notification_log"
    ADD CONSTRAINT "notification_log_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "public"."nhat_van_content"("id");



ALTER TABLE ONLY "public"."notification_log"
    ADD CONSTRAINT "notification_log_dispatch_id_fkey" FOREIGN KEY ("dispatch_id") REFERENCES "public"."notification_dispatch_log"("id");



ALTER TABLE ONLY "public"."notification_log"
    ADD CONSTRAINT "notification_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_confirmed_by_fkey" FOREIGN KEY ("confirmed_by") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."system_config"
    ADD CONSTRAINT "system_config_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."user_charts"
    ADD CONSTRAINT "user_charts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."whitelist"
    ADD CONSTRAINT "whitelist_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id");



CREATE POLICY "audit: admin read" ON "public"."audit_log" FOR SELECT USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'admin'::"text"));



CREATE POLICY "audit: admin write" ON "public"."audit_log" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "audit: staff read" ON "public"."audit_log" FOR SELECT USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



ALTER TABLE "public"."audit_log" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "config: admin all" ON "public"."system_config" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'admin'::"text"));



CREATE POLICY "dispatch: admin write" ON "public"."notification_dispatch_log" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'admin'::"text"));



CREATE POLICY "dispatch: staff read" ON "public"."notification_dispatch_log" FOR SELECT USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



ALTER TABLE "public"."inquiries" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "inquiries: admin_vanhanh all" ON "public"."inquiries" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



CREATE POLICY "inquiries: customer insert own" ON "public"."inquiries" FOR INSERT WITH CHECK (("auth"."uid"() = "customer_id"));



CREATE POLICY "inquiries: customer select own" ON "public"."inquiries" FOR SELECT USING (("auth"."uid"() = "customer_id"));



CREATE POLICY "inquiries: tu_van_vien select assigned" ON "public"."inquiries" FOR SELECT USING (((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'tu_van_vien'::"text") AND ("assigned_to" = "auth"."uid"()) AND ("category" = 'tu_van'::"text")));



CREATE POLICY "inquiries: tu_van_vien update own" ON "public"."inquiries" FOR UPDATE USING (((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'tu_van_vien'::"text") AND ("assigned_to" = "auth"."uid"()) AND ("category" = 'tu_van'::"text"))) WITH CHECK ((("assigned_to" = "auth"."uid"()) OR ("assigned_to" IS NULL)));



ALTER TABLE "public"."inquiry_assignments" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "inquiry_assignments: admin_vanhanh all" ON "public"."inquiry_assignments" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



CREATE POLICY "inquiry_assignments: tu_van_vien insert decline" ON "public"."inquiry_assignments" FOR INSERT WITH CHECK (((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'tu_van_vien'::"text") AND ("action" = 'declined'::"text") AND ("actor_id" = "auth"."uid"()) AND ("from_user" = "auth"."uid"())));



CREATE POLICY "inquiry_assignments: tu_van_vien select own" ON "public"."inquiry_assignments" FOR SELECT USING (((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'tu_van_vien'::"text") AND (("to_user" = "auth"."uid"()) OR ("from_user" = "auth"."uid"()))));



ALTER TABLE "public"."inquiry_messages" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "inquiry_messages: admin_vanhanh all" ON "public"."inquiry_messages" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



CREATE POLICY "inquiry_messages: customer insert" ON "public"."inquiry_messages" FOR INSERT WITH CHECK ((("auth"."uid"() = "sender_id") AND ("is_internal" = false) AND (EXISTS ( SELECT 1
   FROM "public"."inquiries" "i"
  WHERE (("i"."id" = "inquiry_messages"."inquiry_id") AND ("i"."customer_id" = "auth"."uid"()))))));



CREATE POLICY "inquiry_messages: customer select" ON "public"."inquiry_messages" FOR SELECT USING ((("is_internal" = false) AND (EXISTS ( SELECT 1
   FROM "public"."inquiries" "i"
  WHERE (("i"."id" = "inquiry_messages"."inquiry_id") AND ("i"."customer_id" = "auth"."uid"()))))));



CREATE POLICY "inquiry_messages: tu_van_vien insert assigned" ON "public"."inquiry_messages" FOR INSERT WITH CHECK (((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'tu_van_vien'::"text") AND ("sender_id" = "auth"."uid"()) AND (EXISTS ( SELECT 1
   FROM "public"."inquiries" "i"
  WHERE (("i"."id" = "inquiry_messages"."inquiry_id") AND ("i"."assigned_to" = "auth"."uid"()) AND ("i"."category" = 'tu_van'::"text"))))));



CREATE POLICY "inquiry_messages: tu_van_vien select assigned" ON "public"."inquiry_messages" FOR SELECT USING (((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'tu_van_vien'::"text") AND (EXISTS ( SELECT 1
   FROM "public"."inquiries" "i"
  WHERE (("i"."id" = "inquiry_messages"."inquiry_id") AND ("i"."assigned_to" = "auth"."uid"()) AND ("i"."category" = 'tu_van'::"text"))))));



CREATE POLICY "nguyet_van: auth read" ON "public"."nguyet_van_content" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



ALTER TABLE "public"."nguyet_van_content" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "nhat_van: authenticated doc" ON "public"."nhat_van_content" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "nhat_van: staff write" ON "public"."nhat_van_content" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



ALTER TABLE "public"."nhat_van_content" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "notif: admin all" ON "public"."notification_log" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



CREATE POLICY "notif: self read" ON "public"."notification_log" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."notification_dispatch_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notification_log" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "notification_log: customer xem cua minh" ON "public"."notification_log" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "nvc: auth read" ON "public"."nhat_van_content" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "nvc: van_hanh write" ON "public"."nhat_van_content" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



CREATE POLICY "p_admin_write" ON "public"."users" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = 'admin'::"text"));



CREATE POLICY "p_self_read" ON "public"."users" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "p_self_update" ON "public"."users" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "p_staff_read" ON "public"."users" FOR SELECT USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text", 'tu_van_vien'::"text"])));



ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "payments: admin write" ON "public"."payments" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



CREATE POLICY "payments: self read" ON "public"."payments" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "payments: staff read" ON "public"."payments" FOR SELECT USING ((("auth"."uid"() = "user_id") OR (COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"]))));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "profiles: customer update chinh minh" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "profiles: customer xem chinh minh" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "profiles: self all" ON "public"."user_profiles" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "profiles: staff read" ON "public"."user_profiles" FOR SELECT USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text", 'tu_van_vien'::"text"])));



CREATE POLICY "profiles: staff read all" ON "public"."profiles" FOR SELECT USING ((("auth"."uid"() = "id") OR (COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text", 'tu_van_vien'::"text"]))));



CREATE POLICY "subs: admin write" ON "public"."subscriptions" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



CREATE POLICY "subs: self read" ON "public"."subscriptions" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "subs: staff read" ON "public"."subscriptions" FOR SELECT USING ((("auth"."uid"() = "user_id") OR (COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"]))));



ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."system_config" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "system_config: read all" ON "public"."system_config" FOR SELECT TO "authenticated" USING (true);



ALTER TABLE "public"."user_charts" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "user_charts: owner read" ON "public"."user_charts" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "user_charts: staff read" ON "public"."user_charts" FOR SELECT USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text", 'tu_van_vien'::"text"])));



ALTER TABLE "public"."user_profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."whitelist" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "whitelist: admin all" ON "public"."whitelist" USING ((COALESCE((("auth"."jwt"() -> 'app_metadata'::"text") ->> 'role'::"text"), ''::"text") = ANY (ARRAY['admin'::"text", 'van_hanh'::"text"])));



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."assign_customer_code"() TO "anon";
GRANT ALL ON FUNCTION "public"."assign_customer_code"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."assign_customer_code"() TO "service_role";



GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "service_role";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "supabase_auth_admin";



GRANT ALL ON FUNCTION "public"."generate_inquiry_code"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_inquiry_code"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_inquiry_code"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_my_role"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_my_role"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_my_role"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."sync_email_verified"() TO "anon";
GRANT ALL ON FUNCTION "public"."sync_email_verified"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."sync_email_verified"() TO "service_role";



GRANT ALL ON TABLE "public"."audit_log" TO "anon";
GRANT ALL ON TABLE "public"."audit_log" TO "authenticated";
GRANT ALL ON TABLE "public"."audit_log" TO "service_role";



GRANT ALL ON TABLE "public"."inquiries" TO "anon";
GRANT ALL ON TABLE "public"."inquiries" TO "authenticated";
GRANT ALL ON TABLE "public"."inquiries" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



GRANT ALL ON TABLE "public"."consultant_workload" TO "anon";
GRANT ALL ON TABLE "public"."consultant_workload" TO "authenticated";
GRANT ALL ON TABLE "public"."consultant_workload" TO "service_role";



GRANT ALL ON SEQUENCE "public"."customer_code_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."customer_code_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."customer_code_seq" TO "service_role";



GRANT ALL ON TABLE "public"."inquiry_assignments" TO "anon";
GRANT ALL ON TABLE "public"."inquiry_assignments" TO "authenticated";
GRANT ALL ON TABLE "public"."inquiry_assignments" TO "service_role";



GRANT ALL ON SEQUENCE "public"."inquiry_code_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."inquiry_code_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."inquiry_code_seq" TO "service_role";



GRANT ALL ON TABLE "public"."inquiry_messages" TO "anon";
GRANT ALL ON TABLE "public"."inquiry_messages" TO "authenticated";
GRANT ALL ON TABLE "public"."inquiry_messages" TO "service_role";



GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."inquiry_list" TO "anon";
GRANT ALL ON TABLE "public"."inquiry_list" TO "authenticated";
GRANT ALL ON TABLE "public"."inquiry_list" TO "service_role";



GRANT ALL ON TABLE "public"."nguyet_van_content" TO "anon";
GRANT ALL ON TABLE "public"."nguyet_van_content" TO "authenticated";
GRANT ALL ON TABLE "public"."nguyet_van_content" TO "service_role";



GRANT ALL ON TABLE "public"."nhat_van_content" TO "anon";
GRANT ALL ON TABLE "public"."nhat_van_content" TO "authenticated";
GRANT ALL ON TABLE "public"."nhat_van_content" TO "service_role";



GRANT ALL ON TABLE "public"."notification_dispatch_log" TO "anon";
GRANT ALL ON TABLE "public"."notification_dispatch_log" TO "authenticated";
GRANT ALL ON TABLE "public"."notification_dispatch_log" TO "service_role";



GRANT ALL ON TABLE "public"."notification_log" TO "anon";
GRANT ALL ON TABLE "public"."notification_log" TO "authenticated";
GRANT ALL ON TABLE "public"."notification_log" TO "service_role";



GRANT ALL ON TABLE "public"."payments" TO "anon";
GRANT ALL ON TABLE "public"."payments" TO "authenticated";
GRANT ALL ON TABLE "public"."payments" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."system_config" TO "anon";
GRANT ALL ON TABLE "public"."system_config" TO "authenticated";
GRANT ALL ON TABLE "public"."system_config" TO "service_role";



GRANT ALL ON TABLE "public"."user_charts" TO "anon";
GRANT ALL ON TABLE "public"."user_charts" TO "authenticated";
GRANT ALL ON TABLE "public"."user_charts" TO "service_role";



GRANT ALL ON TABLE "public"."user_profiles" TO "anon";
GRANT ALL ON TABLE "public"."user_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."whitelist" TO "anon";
GRANT ALL ON TABLE "public"."whitelist" TO "authenticated";
GRANT ALL ON TABLE "public"."whitelist" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







