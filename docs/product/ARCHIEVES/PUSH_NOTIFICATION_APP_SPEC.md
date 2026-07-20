# Push Notification App — Product Specification
**Live Payments — Bill Notification Service**
**Version:** 1.0 (Draft for Review)
**Author:** Product Management
**Status:** 🟡 Awaiting Dev Review
**Last Updated:** May 2026

---

## Table of Contents

1. [Overview](#1-overview)
2. [Goals & Non-Goals](#2-goals--non-goals)
3. [User Personas](#3-user-personas)
4. [High-Level Architecture](#4-high-level-architecture)
5. [Feature Specifications](#5-feature-specifications)
   - 5.1 [Customer Registration](#51-customer-registration)
   - 5.2 [Notification Preference Management](#52-notification-preference-management)
   - 5.3 [Notification Events & Automated Triggers](#53-notification-events--automated-triggers)
   - 5.4 [Push Delivery via FCM](#54-push-delivery-via-fcm)
   - 5.5 [Ops / Admin Controls](#55-ops--admin-controls)
6. [Data Models](#6-data-models)
7. [API Contracts (Outline)](#7-api-contracts-outline)
8. [UI/UX Specifications](#8-uiux-specifications)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Milestones & Phasing](#10-milestones--phasing)
11. [Open Questions & TBDs](#11-open-questions--tbds)
12. [Glossary](#12-glossary)

---

## 1. Overview

### 1.1 Problem Statement

Live Bill Pay customers currently have no proactive way of knowing when a new bill is available or when a payment is due. This leads to missed payments, late fees, and reactive support load. Customers must log in manually to discover bill status.

### 1.2 Solution

A standalone **Bill Notification Service** — a separate web app and supporting backend — that allows customers to self-register for push notifications and receive automated alerts at key billing lifecycle events, delivered via **web browser push** and **mobile push (iOS/Android)** using **Firebase Cloud Messaging (FCM)**.

Customers are **never auto-enrolled**. Registration is fully opt-in and self-service.

### 1.3 Scope

| In Scope | Out of Scope |
|---|---|
| Web push (browser) | Email notifications |
| Mobile push via FCM (iOS/Android) | SMS / WhatsApp |
| Standalone registration web app | Integration into bill.livepayments.com portal UI |
| Self-service registration with email + password | SSO or social login |
| 4 automated notification event types | Manual one-off campaigns / marketing blasts |
| Customer-configurable reminder timing | Biller-side notification controls |
| Ops/admin dashboard for override & monitoring | Full CRM or customer management tool |

---

## 2. Goals & Non-Goals

### 2.1 Goals

- **G1** — Reduce missed payments by proactively notifying customers before and on due dates.
- **G2** — Increase customer awareness of new bill availability without requiring portal login.
- **G3** — Give customers full control over their notification preferences (opt-in, opt-out, timing).
- **G4** — Provide ops team visibility and override capability over notification delivery.
- **G5** — Launch with zero manual ops dependency — all notifications triggered automatically by system events.

### 2.2 Non-Goals

- This is **not** a marketing or promotional notification platform.
- This does **not** replace the bill.livepayments.com portal — it complements it.
- We are **not** building a mobile native app — mobile push is delivered via FCM to browser/PWA.
- We will **not** support notification history / inbox in v1.

---

## 3. User Personas

### 3.1 Customer (End User)

**Who:** A Live Bill Pay registered payer — individual or business — who has one or more bills managed through the platform.

**Goals:**
- Know immediately when a new bill is ready.
- Get reminded before a bill is due so they don't forget to pay.
- Know if a payment went through successfully.
- Not be spammed — control what they receive and when.

**Pain Points:**
- Currently must log in to check bill status.
- Has missed payment deadlines due to no reminders.

### 3.2 Ops / Admin User

**Who:** A Live Payments internal team member (MST / Operations).

**Goals:**
- Monitor notification delivery health.
- Pause or override notifications in exceptional cases (e.g. biller data issues, system maintenance).
- View which customers are registered and their preferences.

---

## 4. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                    Bill Notification Service                         │
│                                                                      │
│  ┌─────────────────────┐       ┌──────────────────────────────────┐  │
│  │  Registration Web   │       │       Notification API           │  │
│  │  App (Standalone)   │──────▶│  (Event Listener + Dispatcher)   │  │
│  │  React / Next.js    │       │       Node.js / Express          │  │
│  └─────────────────────┘       └──────────────┬───────────────────┘  │
│                                               │                      │
│  ┌─────────────────────┐                      │                      │
│  │  Ops Admin Panel    │──────────────────────┤                      │
│  │  (Internal)         │                      │                      │
│  └─────────────────────┘       ┌──────────────▼───────────────────┐  │
│                                │   Firebase Cloud Messaging (FCM)  │  │
│  ┌─────────────────────┐       │   Web Push + APNs (iOS)          │  │
│  │   Bill Pay Backend  │──────▶│   FCM (Android)                  │  │
│  │   (Event Source)    │       └──────────────┬───────────────────┘  │
│  │   Webhooks / Queue  │                      │                      │
│  └─────────────────────┘                      ▼                      │
│                                ┌──────────────────────────────────┐  │
│  ┌─────────────────────┐       │         Customer Devices         │  │
│  │   Database          │       │   Browser (Chrome/Firefox/Edge)  │  │
│  │   PostgreSQL        │       │   iOS Safari PWA                 │  │
│  │   (customers,       │       │   Android Chrome                 │  │
│  │    preferences,     │       └──────────────────────────────────┘  │
│  │    subscriptions,   │                                             │
│  │    event_log)       │                                             │
│  └─────────────────────┘                                             │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.1 Key Integration Points

| Integration | Direction | Protocol | Notes |
|---|---|---|---|
| Bill Pay Backend → Notification API | Inbound events | Webhook (HTTPS POST) or message queue | Triggers notification sends |
| Notification API → FCM | Outbound push | FCM REST API (HTTP v1) | All push delivery |
| FCM → Customer Device | Push delivery | Web Push Protocol / APNs / FCM | Final delivery |
| Registration App → Notification API | Registration, preferences | REST API | Customer-facing |
| Ops Panel → Notification API | Admin overrides | REST API (authenticated) | Internal only |

---

## 5. Feature Specifications

---

### 5.1 Customer Registration

#### 5.1.1 Overview

A standalone web application where new customers create an account to subscribe to push notifications. This is entirely separate from bill.livepayments.com.

#### 5.1.2 Registration Flow

**Happy Path:**

1. Customer navigates to the standalone app (e.g. `notifications.livepayments.com`).
2. Customer clicks **"Register for Notifications"**.
3. Customer enters:
   - Full name
   - Email address
   - Password (min 8 chars, at least 1 number, 1 special character)
   - Password confirmation
4. Customer submits the form.
5. System sends a **verification email** with a confirmation link.
6. Customer clicks the verification link.
7. Browser prompts customer to **allow push notifications** (browser native permission dialog).
8. If customer allows:
   - FCM token is captured and stored against their account.
   - Customer is redirected to the **Preferences screen** (see 5.2).
9. If customer denies:
   - Account is created, but marked as `push_permission: denied`.
   - Customer sees a notice explaining they won't receive notifications until they allow permissions in their browser settings, with a guide link.

**Error Paths:**

| Scenario | System Behaviour |
|---|---|
| Email already registered | Show inline error: "This email is already registered. Log in instead." |
| Weak password | Inline validation as they type; block submission |
| Verification link expired (>24h) | Show error page with "Resend verification email" CTA |
| Push permission denied | Account created, preferences accessible; no FCM token stored; banner shown |
| Network failure during registration | Friendly error: "Something went wrong. Please try again." with retry |

#### 5.1.3 Login Flow

1. Customer enters registered email + password.
2. On success, redirect to **Preferences screen**.
3. On failure (wrong credentials): show "Incorrect email or password." — max 5 failed attempts, then 15-min lockout.
4. "Forgot password" → email reset link (expires in 1 hour).

#### 5.1.4 Account Linking to Bill Pay

> **TBD — Open Question #1:** How does the system associate a registered notification account with their bill(s) in the Bill Pay backend? Options:
> - Customer enters their Bill Pay Customer ID during registration.
> - System matches by email address (requires same email used in Bill Pay).
> - Admin manually links accounts.

For the spec, we will assume **email-based matching** as the default approach pending confirmation.

---

### 5.2 Notification Preference Management

#### 5.2.1 Overview

After registering (and on every subsequent login), the customer lands on a **Preferences screen** where they can configure exactly what they want to receive.

#### 5.2.2 Configurable Preferences

| Preference | Type | Default | Customer Can Change? |
|---|---|---|---|
| New bill available | Toggle (on/off) | ON | Yes |
| Payment due reminder | Toggle (on/off) | ON | Yes |
| Reminder timing — days before due | Dropdown (1, 3, 7 days, or custom) | 3 days | Yes |
| Payment overdue | Toggle (on/off) | ON | Yes |
| Payment confirmed | Toggle (on/off) | ON | Yes |
| Notification channel — Web push | Toggle (on/off) | ON | Yes (if browser supported) |
| Notification channel — Mobile push | Toggle (on/off) | ON | Yes (if FCM token present) |

#### 5.2.3 Custom Reminder Timing

If a customer selects "Custom" for reminder timing:
- A numeric input field appears: "Remind me __ days before due date"
- Min: 1 day, Max: 30 days
- Ops/admin can also override this at a global level (see 5.5).

#### 5.2.4 Opt-Out / Unsubscribe

- Customer can toggle off **all** notification types via a master "Pause all notifications" toggle.
- Customer can fully delete their account via "Remove my account" — this deletes their FCM token, preferences, and account record. Cannot be undone.
- An unsubscribe link is included in any future email communications.

---

### 5.3 Notification Events & Automated Triggers

#### 5.3.1 Overview

All notifications are triggered automatically when billing lifecycle events occur in the Bill Pay backend. No manual send is required under normal operation.

#### 5.3.2 Event Types

---

**Event 1: New Bill Available**

| Field | Detail |
|---|---|
| Trigger | Bill Pay backend emits `bill.created` event |
| Timing | Immediately upon event receipt |
| Condition | Customer has this notification type enabled |
| Title | "New Bill Available" |
| Body | "Your [Biller Name] bill for [Amount] is ready to view." |
| CTA (tap action) | Deep link to bill in bill.livepayments.com |
| Channels | Web push + Mobile push |

---

**Event 2: Payment Due Reminder**

| Field | Detail |
|---|---|
| Trigger | Scheduled job runs daily; checks bills with `due_date` matching `today + customer_reminder_days` |
| Timing | Customer-configurable (1, 3, 7 days before due, or custom); fallback to ops global default if not set |
| Condition | Customer has this type enabled AND bill is not yet paid |
| Title | "Payment Due in [X] Day(s)" |
| Body | "Your [Biller Name] payment of [Amount] is due on [Date]." |
| CTA (tap action) | Deep link to pay bill in bill.livepayments.com |
| Channels | Web push + Mobile push |
| Deduplication | Do not send if a reminder was already sent for this bill on the same day |

---

**Event 3: Payment Overdue**

| Field | Detail |
|---|---|
| Trigger | Scheduled job runs daily; checks bills where `due_date < today` and `status = unpaid` |
| Timing | Day after due date (due_date + 1) |
| Condition | Customer has this type enabled |
| Title | "⚠ Payment Overdue" |
| Body | "Your [Biller Name] payment of [Amount] was due on [Date] and hasn't been received." |
| CTA (tap action) | Deep link to pay bill in bill.livepayments.com |
| Channels | Web push + Mobile push |
| Repeat | Send once only per bill unless ops configures repeat cadence |

---

**Event 4: Payment Confirmed**

| Field | Detail |
|---|---|
| Trigger | Bill Pay backend emits `payment.confirmed` event |
| Timing | Immediately upon event receipt |
| Condition | Customer has this type enabled |
| Title | "Payment Confirmed ✓" |
| Body | "Your [Biller Name] payment of [Amount] has been received. Reference: [Ref No]." |
| CTA (tap action) | Deep link to payment receipt in bill.livepayments.com |
| Channels | Web push + Mobile push |

---

#### 5.3.3 Event Payload (from Bill Pay Backend)

The Bill Pay backend must emit webhook events with at minimum the following payload:

```json
{
  "event_type": "bill.created | payment.confirmed | bill.due | bill.overdue",
  "customer_email": "customer@example.com",
  "biller_name": "AGL Energy",
  "amount": 142.50,
  "currency": "AUD",
  "due_date": "2026-06-15",
  "bill_id": "BILL-000123",
  "payment_ref": "PAY-000456",
  "deep_link": "https://bill.livepayments.com/bills/BILL-000123",
  "timestamp": "2026-05-18T09:00:00Z"
}
```

> **TBD — Open Question #2:** Does the Bill Pay backend currently support outbound webhooks or does the Notification Service need to poll an API? This affects the architecture of the event listener significantly.

---

### 5.4 Push Delivery via FCM

#### 5.4.1 Token Management

- On registration approval, the browser/device FCM token is captured and stored in the `device_subscriptions` table linked to the customer.
- A customer may have **multiple tokens** (e.g. home browser + work browser + phone).
- Tokens are refreshed automatically by the FCM SDK; the app must handle `onTokenRefresh` callbacks and update the stored token.
- Stale tokens (FCM returns `registration-token-not-registered`) are automatically removed from the database.

#### 5.4.2 Web Push Setup

- Service Worker must be registered at the root of the app to handle background push events.
- Requires HTTPS (mandatory for Web Push API).
- Supports: Chrome 50+, Firefox 44+, Edge 17+, Safari 16+ (macOS/iOS with PWA install).

#### 5.4.3 Mobile Push Setup

- **Android:** FCM native push via Chrome or installed PWA.
- **iOS:** Requires iOS 16.4+ and the PWA installed to Home Screen (Safari Web Push). Customer must be guided through the "Add to Home Screen" flow during onboarding.
- **APNs Key** required in Firebase console for iOS delivery.

#### 5.4.4 Delivery & Retry

| Scenario | Behaviour |
|---|---|
| Device online | Delivered immediately |
| Device offline | FCM holds message for up to **4 weeks**; delivered when online |
| Token invalid / expired | Remove token from DB; log event |
| FCM rate limit hit | Retry with exponential backoff (max 3 retries) |
| Delivery failed after retries | Log to `notification_event_log` with status `failed`; alert ops dashboard |

#### 5.4.5 Notification Payload (FCM)

```json
{
  "message": {
    "token": "<customer_fcm_token>",
    "notification": {
      "title": "New Bill Available",
      "body": "Your AGL Energy bill for $142.50 is ready to view."
    },
    "webpush": {
      "fcm_options": {
        "link": "https://bill.livepayments.com/bills/BILL-000123"
      },
      "notification": {
        "icon": "/icons/livepayments-192.png",
        "badge": "/icons/badge-72.png",
        "requireInteraction": true
      }
    },
    "apns": {
      "payload": {
        "aps": {
          "alert": {
            "title": "New Bill Available",
            "body": "Your AGL Energy bill for $142.50 is ready to view."
          },
          "sound": "default"
        }
      }
    },
    "data": {
      "bill_id": "BILL-000123",
      "event_type": "bill.created",
      "deep_link": "https://bill.livepayments.com/bills/BILL-000123"
    }
  }
}
```

---

### 5.5 Ops / Admin Controls

#### 5.5.1 Admin Panel Features

The ops admin panel is an **internal-only** web interface (not customer-facing).

| Feature | Description |
|---|---|
| Customer list | View all registered customers, their status, and subscription counts |
| Notification log | View all sent/failed/pending notifications with timestamps and delivery status |
| Global default reminder timing | Set the default "days before due" reminder for customers who haven't customised |
| Pause notifications | Global kill-switch — pauses ALL outbound notifications (for maintenance windows) |
| Per-customer pause | Pause notifications for a specific customer (e.g. during dispute) |
| Retry failed notifications | Manually trigger retry for failed deliveries |
| Token status | View and remove stale FCM tokens |

#### 5.5.2 Global Reminder Default

- Admin can set a **global default** reminder timing (default: 3 days before due).
- This applies to all customers who have not set their own preference.
- Customer-set preferences always override the global default.

#### 5.5.3 Admin Authentication

- Admin panel is behind a separate login (internal credentials, not customer-facing).
- Role-based: `super_admin` (full access) and `ops_viewer` (read-only log access).
- All admin actions are logged to an audit trail.

---

## 6. Data Models

### 6.1 `customers`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `email` | VARCHAR(255) | Unique, used for account matching |
| `full_name` | VARCHAR(255) | |
| `password_hash` | VARCHAR | bcrypt |
| `email_verified` | BOOLEAN | Default false |
| `email_verified_at` | TIMESTAMP | |
| `account_status` | ENUM | `active`, `suspended`, `deleted` |
| `bill_pay_customer_id` | VARCHAR | FK reference to Bill Pay backend (TBD) |
| `created_at` | TIMESTAMP | |
| `updated_at` | TIMESTAMP | |

### 6.2 `notification_preferences`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `customer_id` | UUID | FK → customers |
| `new_bill_enabled` | BOOLEAN | Default true |
| `due_reminder_enabled` | BOOLEAN | Default true |
| `due_reminder_days` | INT | Customer override; null = use global default |
| `overdue_enabled` | BOOLEAN | Default true |
| `payment_confirmed_enabled` | BOOLEAN | Default true |
| `web_push_enabled` | BOOLEAN | Default true |
| `mobile_push_enabled` | BOOLEAN | Default true |
| `all_paused` | BOOLEAN | Master pause toggle |
| `updated_at` | TIMESTAMP | |

### 6.3 `device_subscriptions`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `customer_id` | UUID | FK → customers |
| `fcm_token` | TEXT | FCM registration token |
| `device_type` | ENUM | `web`, `android`, `ios` |
| `user_agent` | TEXT | For debugging |
| `token_status` | ENUM | `active`, `stale`, `removed` |
| `created_at` | TIMESTAMP | |
| `last_used_at` | TIMESTAMP | |

### 6.4 `notification_event_log`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `customer_id` | UUID | FK → customers |
| `event_type` | ENUM | `bill.created`, `payment.confirmed`, `bill.due`, `bill.overdue` |
| `bill_id` | VARCHAR | From Bill Pay backend |
| `fcm_token` | TEXT | Token used for this send |
| `status` | ENUM | `pending`, `sent`, `delivered`, `failed` |
| `fcm_response` | JSONB | Raw FCM API response |
| `retry_count` | INT | Default 0 |
| `sent_at` | TIMESTAMP | |
| `created_at` | TIMESTAMP | |

### 6.5 `global_settings`

| Column | Type | Notes |
|---|---|---|
| `key` | VARCHAR | e.g. `default_reminder_days`, `notifications_paused` |
| `value` | TEXT | |
| `updated_by` | UUID | Admin user ID |
| `updated_at` | TIMESTAMP | |

---

## 7. API Contracts (Outline)

> Full OpenAPI spec to be written by dev team against these outlines.

### 7.1 Customer Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create account; triggers verification email |
| `POST` | `/auth/verify-email` | Confirm email via token |
| `POST` | `/auth/login` | Authenticate; returns JWT |
| `POST` | `/auth/forgot-password` | Sends reset link |
| `POST` | `/auth/reset-password` | Resets password via token |

### 7.2 FCM Token

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/subscriptions/token` | Register or refresh an FCM token |
| `DELETE` | `/subscriptions/token` | Remove a token (on unsubscribe/logout) |

### 7.3 Preferences

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/preferences` | Retrieve current customer preferences |
| `PATCH` | `/preferences` | Update one or more preferences |

### 7.4 Inbound Event Webhook (from Bill Pay Backend)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/events/bill` | Receives billing lifecycle events; authenticated via HMAC signature |

### 7.5 Admin

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/customers` | List all registered customers |
| `GET` | `/admin/logs` | View notification event log (filterable) |
| `PATCH` | `/admin/settings` | Update global settings |
| `POST` | `/admin/customers/:id/pause` | Pause notifications for a customer |
| `POST` | `/admin/notifications/:id/retry` | Retry a failed notification |

---

## 8. UI/UX Specifications

### 8.1 Registration App — Screens

#### Screen 1: Landing / Register

- **Purpose:** Entry point; explains value and prompts sign-up.
- **Components:**
  - Hero: "Never miss a bill again" headline + short value prop copy
  - Primary CTA: "Register for Notifications"
  - Secondary: "Already registered? Log in"
- **State:** Unauthenticated only

#### Screen 2: Registration Form

- **Fields:** Full name, Email, Password, Confirm Password
- **Validation:** Inline real-time validation (not on-submit only)
- **Password strength indicator**
- **Submit CTA:** "Create Account"
- **Footer link:** "By registering, you agree to our Privacy Policy"

#### Screen 3: Verify Your Email

- **Content:** "We've sent a verification link to [email]. Check your inbox."
- **CTA:** "Resend email" (disabled for 60s after send)
- **Note:** Inform user the link expires in 24 hours

#### Screen 4: Allow Notifications (Post-Verification)

- **Purpose:** Prompt the browser permission request
- **Content:** Explain what notifications the customer will receive before triggering the browser dialog
- **CTA:** "Enable Notifications" → triggers `Notification.requestPermission()`
- **Fallback state:** If denied, show instructions for enabling in browser settings + "Continue to preferences anyway"

#### Screen 5: Preferences

- **Layout:** Card-based list of toggleable notification types
- **Each notification card shows:** Name, description, enabled/disabled toggle
- **Reminder timing:** Shown as a sub-option under "Payment Due Reminder" only when that toggle is on
- **Master toggle:** "Pause all notifications" at top of page
- **Save behaviour:** Auto-save on toggle change (no manual "Save" button)
- **Account actions:** "Remove my account" link at bottom (destructive — confirm modal required)

#### Screen 6: Login

- **Fields:** Email, Password
- **Links:** "Forgot password", "Register instead"

#### Screen 7: Password Reset

- **Step 1:** Enter email → receive reset link
- **Step 2:** New password form (from reset link)

### 8.2 Push Notification Appearance

| Element | Spec |
|---|---|
| Icon | Live Payments logo, 192×192px |
| Badge | Monochrome icon, 72×72px (Android status bar) |
| Title | Max 50 characters |
| Body | Max 120 characters |
| Action | Single tap → open deep link in browser |
| `requireInteraction` | `true` for overdue notifications; `false` for others |

### 8.3 iOS PWA Onboarding

For iOS users, an interstitial screen must guide them through:
1. Open site in Safari
2. Tap Share → "Add to Home Screen"
3. Open the installed PWA
4. Allow notifications when prompted

---

## 9. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Availability** | Notification API: 99.5% uptime SLA |
| **Latency** | Event-triggered notifications dispatched within 30 seconds of event receipt |
| **Scalability** | Must handle up to 50,000 registered customers at launch; horizontally scalable |
| **Security** | All endpoints HTTPS only; JWT auth for customer APIs; HMAC verification on inbound webhooks; passwords hashed with bcrypt (cost factor ≥ 12) |
| **Data Privacy** | FCM tokens treated as PII; not logged in plaintext; encrypted at rest |
| **GDPR / Privacy** | Account deletion removes all PII and FCM tokens within 30 days |
| **Browser Support** | Chrome 80+, Firefox 78+, Edge 80+, Safari 16.4+ (with PWA install) |
| **Mobile OS Support** | Android 8+, iOS 16.4+ (PWA) |
| **Audit Logging** | All admin actions logged with actor ID, action, timestamp |
| **Rate Limiting** | Auth endpoints: max 10 requests/min per IP; notification dispatch: per FCM quota |

---

## 10. Milestones & Phasing

### Milestone 1 — Core Registration & Preferences
**Goal:** A customer can register, verify their email, grant push permission, and set preferences.

**Deliverables:**
- Registration web app (Screens 1–5 + 6–7)
- Auth API (register, verify, login, password reset)
- FCM token capture and storage
- Preferences API + UI
- Service Worker setup for web push
- Database schema (all tables)

**Done when:** A registered customer with push permission granted can be found in the DB with a valid FCM token.

---

### Milestone 2 — Automated Notification Dispatch
**Goal:** All 4 notification event types fire correctly on real events.

**Deliverables:**
- Inbound webhook endpoint (`/events/bill`)
- Event dispatcher → FCM send logic
- Scheduled jobs for due reminder + overdue
- FCM token refresh + stale token handling
- `notification_event_log` writes
- Full end-to-end test: event in → push notification on device

**Done when:** All 4 event types deliver a push notification to a test device within 30 seconds of trigger.

---

### Milestone 3 — Ops Admin Panel
**Goal:** Ops team can monitor delivery health and override as needed.

**Deliverables:**
- Admin panel UI (customer list, notification log, settings)
- Global settings API (default reminder days, global pause)
- Per-customer pause capability
- Failed notification retry
- Admin auth + role-based access
- Audit log

**Done when:** Ops user can log in, view notification history, and pause/resume notifications globally.

---

### Milestone 4 — iOS PWA Support & Hardening
**Goal:** Fully functional on iOS 16.4+ PWA.

**Deliverables:**
- iOS PWA onboarding interstitial
- APNs key configuration in Firebase
- iOS-specific notification testing
- Delivery retry + exponential backoff
- Load and stress testing (50K customer scale)
- Security review

**Done when:** End-to-end push delivery confirmed on iOS PWA; load test passed at target scale.

---

## 11. Open Questions & TBDs

| # | Question | Owner | Priority |
|---|---|---|---|
| OQ-1 | How does a notification account link to a Bill Pay customer? Email match or customer ID entry during registration? | Product + Backend | 🔴 High — blocks data model finalisation |
| OQ-2 | Does the Bill Pay backend support outbound webhooks today, or does the Notification Service need to poll? | Backend / Tin / Huy | 🔴 High — blocks architecture |
| OQ-3 | What is the agreed subdomain for the standalone app? (`notifications.livepayments.com`?) | Product + Ops | 🟡 Medium |
| OQ-4 | Should repeat overdue reminders be sent (e.g. daily until paid)? If so, max how many times? | Product | 🟡 Medium |
| OQ-5 | Who is responsible for the Firebase project setup — Dev or Ops? | TBD | 🟡 Medium |
| OQ-6 | Is there a privacy policy / terms update needed before launch? (Push notification consent must be documented) | Legal / Compliance | 🟡 Medium |
| OQ-7 | Should the Ops admin panel be hosted separately or bundled with the notification service? | Dev | 🟢 Low |
| OQ-8 | Notification localisation — English only for v1? | Product | 🟢 Low |

---

## 12. Glossary

| Term | Definition |
|---|---|
| FCM | Firebase Cloud Messaging — Google's cross-platform push notification service |
| APNs | Apple Push Notification service — Apple's delivery layer for iOS/macOS push |
| FCM Token | A unique identifier for a specific browser/device subscription generated by FCM |
| Service Worker | A background browser script that handles push events when the app is not in focus |
| PWA | Progressive Web App — a web app installable on a device's home screen |
| Web Push API | Browser standard API for receiving push messages from a server |
| HMAC | Hash-based Message Authentication Code — used to verify webhook authenticity |
| Deep Link | A URL that opens directly to a specific page within the Bill Pay portal |
| Opt-in | Customer actively choosing to receive notifications (our model — never auto-enrolled) |

---

*End of Specification — v1.0 Draft*
*Next step: Dev team review of Open Questions (OQ-1, OQ-2) before milestone planning.*
