# Live Payments Design System — Complete Reference
**v1.1 Final · April 2026**

> All 46 files combined. Navigate using `<!-- FILE: path -->` markers.
> For Claude Code use: place the `docs/design-system/` folder in your repo.
> Claude Code reads `CLAUDE.md` automatically, then loads SKILL files per task.

---


---
<!-- FILE: CLAUDE.md -->

# Live Payments — Design System

This is the Live Payments design system documentation. All UI components must follow this system.

## What this project is
Live Payments is a fintech platform serving merchants, drivers, and business owners. Products include:
- **Portal** — merchant dashboard (desktop, 1200px–1536px)
- **DX** — driver experience app (mobile + desktop)
- **Live Tap** — mobile payment terminal app (iOS)
- **Live Bill Pay** — bill payment portal (mobile + desktop)

## Design system docs
All documentation lives in `/docs/design-system/` (or wherever this CLAUDE.md file is located).
Start with `llms.txt` for a full index of all files.
The master index is `00-INDEX.md`.

## CRITICAL rules — always follow these

1. **Never use raw hex values.** Use CSS custom properties from `core/TOKENS.md`.
   - ✓ `var(--semantic-primary-bold-fill)`
   - ✗ `#4f4ddb`

2. **Never build navigation ad-hoc.** Read `skills/SKILL-NAVIGATION.md` first.

3. **Never build tables ad-hoc.** Read `skills/SKILL-TABLE.md` first.

4. Check component status in `CLAUDE.md`. ❌ = not designed — flag to designer.

5. **Font is Poppins everywhere.** No other font families. No Inter. No system fonts.

6. **Error colours are split:**
   - `var(--semantic-error-stroke)` = `#ff513a` → borders/outlines only
   - `var(--semantic-error-fill)` = `#dc2626` → text and fills only
   Never swap them.

7. **Accessibility is non-negotiable.** Every component needs: focus ring, semantic HTML, correct ARIA, 44×44px touch targets.

## Essential tokens (most commonly needed)

```css
--semantic-primary-bold-fill:    var(--semantic-primary-bold-fill);   /* Primary button bg */
--semantic-primary-neutral-line: var(--semantic-primary-neutral-line);   /* Default borders */
--semantic-primary-neutral-fill: var(--semantic-primary-neutral-fill);   /* Default card bg */
--text-header:                   var(--semantic-primary-lite-primary);   /* All page/card headings */
--text-primary:                  var(--semantic-primary-neutral-primary);   /* All body text */
--focus-ring: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line);
```

Full token reference → `core/TOKENS.md`

## Figma source files (use Figma MCP to pull live data)
- Core Design System: `https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System`
- Screen examples: `https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD`

## For specific tasks

| Task | Read this first |
|---|---|
| Building any portal page | `skills/SKILL-NAVIGATION.md` |
| Building any data table | `skills/SKILL-TABLE.md` |
| Using buttons | `core/buttons/PRIMARY-BUTTON.md` + `skills/SKILL-BUTTONS.md` |
| Building a form | `core/forms/INPUTS.md` + `skills/SKILL-FORMS.md` |
| Using cards | `core/display/CARDS.md` + `skills/SKILL-CARDS.md` |
| Using status badges | `core/display/BADGES-STATUS.md` |
| Writing UI copy | `brand/07-VOICE-AND-COPY.md` |
| Accessibility questions | `brand/08-ACCESSIBILITY.md` |


---
<!-- FILE: llms.txt -->

# Live Payments Design System
> Design system documentation for Live Payments — a fintech platform for merchants, drivers, and business owners. Covers brand guidelines, all UI components, and AI implementation guides (SKILL files) for consistent development across portal, mobile, and onboarding flows.

## Start here
- [Master Index](./00-INDEX.md): Full directory, ground rules, Figma sources, changelog
- [CSS Tokens](./core/TOKENS.md): Complete CSS :root block — copy-paste into any project
- [CLAUDE.md](./CLAUDE.md): Critical rules for AI coding agents — read this first

## Brand guidelines
- [Philosophy](./brand/01-PHILOSOPHY.md): Four design principles — clarity, layered surfaces, purposeful colour, compact breathable
- [Colour System](./brand/02-COLOUR-SYSTEM.md): Brand palette, all semantic CSS tokens, usage rules, error colour split
- [Typography](./brand/03-TYPOGRAPHY.md): Poppins type scale, 14 tokens, hierarchy rules
- [Spacing & Elevation](./brand/04-SPACING-ELEVATION.md): 4px spacing scale, radius tokens, surface elevation model
- [Icons](./brand/05-ICONS.md): 5-tier icon scale (12–34px), weight tokens, usage rules
- [Motion](./brand/06-MOTION.md): Animation duration tokens, easing, focus ring spec
- [Voice & Copy](./brand/07-VOICE-AND-COPY.md): Brand voice, tone by context, copy patterns for every UI element type
- [Accessibility](./brand/08-ACCESSIBILITY.md): WCAG 2.1 AA requirements, ARIA code patterns per component

## Core components
- [Tokens Reference](./core/TOKENS.md): Full CSS :root — all colour, spacing, radius, icon, motion tokens
- [Layout](./core/LAYOUT.md): 6 breakpoints, desktop/mobile/onboarding page anatomy, grid rules
- [Primary Button](./core/buttons/PRIMARY-BUTTON.md): Highest-emphasis action — sizes, states, icon variants, dos/don'ts, accessibility
- [Secondary Button](./core/buttons/SECONDARY-BUTTON.md): Medium-emphasis action — always paired with primary
- [Link Button](./core/buttons/LINK-BUTTON.md): Ghost/link inline button
- [FAB Buttons](./core/buttons/FAB-BUTTONS.md): Floating action button variants
- [Inputs](./core/forms/INPUTS.md): Text input, floating label, validation states
- [Dropdown](./core/forms/DROPDOWN.md): Select dropdown with scroll
- [Search](./core/forms/SEARCH.md): Search input variant
- [Progress Bar](./core/forms/PROGRESS-BAR.md): Multi-step onboarding progress indicator
- [Keypad](./core/forms/KEYPAD.md): Numeric payment keypad
- [Cards](./core/display/CARDS.md): 3-level nesting system — the most distinctive visual pattern in the system
- [Status Badges](./core/display/BADGES-STATUS.md): 40+ indicator badge types with semantic colour sets
- [Product Badges](./core/display/BADGES-PRODUCT.md): Product type badges (Terminal, LiveTap, Ecommerce etc.)
- [Header Section](./core/display/HEADER-SECTION.md): Page/card header component — 13 variants
- [Avatar](./core/display/AVATAR.md): Avatar sizes, shape, border
- [Toasters](./core/feedback/TOASTERS.md): Toast notifications — 18 message types
- [Tooltips](./core/feedback/TOOLTIPS.md): Tooltip — 4 positions × 3 tag positions
- [Modals & Overlays](./core/feedback/MODALS-OVERLAYS.md): Modal, bottom sheet, confirmation pattern
- [Tables](./core/data/TABLES.md): 6 table types, all cell variants, expander rows, empty states
- [Pagination](./core/data/TABLES.md#pagination): Pagination buttons, active state, mobile variant
- [Side Navigation](./core/navigation/SIDE-NAV.md): Portal + bill payments nav variants
- [Mobile Navigation](./core/navigation/MOBILE-NAV.md): Bottom nav bar + slide-out drawer

## Product-specific guidelines
- [Portal Shell](./product/portal/PORTAL-SHELL.md): Full portal page layout, sidebar + topbar
- [Portal Dashboard](./product/portal/PORTAL-DASHBOARD.md): Dashboard card patterns, metric chips
- [Portal Onboarding](./product/portal/PORTAL-ONBOARDING.md): Bill Pay onboarding multi-step flow
- [DX Overview](./product/dx/DX-OVERVIEW.md): DX product patterns, mobile + desktop
- [Live Tap Overview](./product/live-tap/LIVETAP-OVERVIEW.md): Live Tap mobile driver app patterns
- [Screen Examples](./product/screens/SCREEN-EXAMPLES.md): All responsive screen references with node IDs

## AI implementation guides (SKILL files)
- [Navigation SKILL](./skills/SKILL-NAVIGATION.md): Step-by-step portal nav implementation with HTML, CSS, ARIA
- [Table SKILL](./skills/SKILL-TABLE.md): Step-by-step table implementation — all cell types, pagination, empty states
- [Buttons SKILL](./skills/SKILL-BUTTONS.md): Button system — primary, secondary, link, FAB with copy-paste CSS
- [Forms SKILL](./skills/SKILL-FORMS.md): Form implementation — inputs, dropdowns, validation, progress bar
- [Cards SKILL](./skills/SKILL-CARDS.md): Card nesting system implementation
- [Badges SKILL](./skills/SKILL-BADGES.md): Status and product badge implementation


---
<!-- FILE: 00-INDEX.md -->

# Live Payments — Design System
**Version 1.1** · April 2026 · Maintained by Design

---

## What this is

This library gives developers the design language to build any screen, feature, or component within Live Payments — with or without a Figma file in front of them. Each file covers one domain.

**If you're new:** Start with `brand/01-PHILOSOPHY.md` → `brand/02-COLOUR-SYSTEM.md` → `core/TOKENS.md` (bookmark this one).

**For AI agents:** See `CLAUDE.md` or `AGENTS.md` at the root of this folder.

---

## Figma source files

| File | Link |
|---|---|
| Core Design System | https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System |
| Design System MD (screens) | https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD |

---

## Ground rules

- **Use tokens, never raw hex.** Every colour and size has a CSS custom property in `core/TOKENS.md`.
- **Check component status** in `CLAUDE.md` (the status table). ❌ = not designed. Flag to designer.
- **For portal pages,** start with `skills/SKILL-NAVIGATION.md`.
- **For data tables,** start with `skills/SKILL-TABLE.md`.
- **Font is Poppins everywhere.** No exceptions.

---

## Brand guidelines

| File | What's inside |
|---|---|
| [01-PHILOSOPHY.md](./brand/01-PHILOSOPHY.md) | Four design principles guiding every decision |
| [02-COLOUR-SYSTEM.md](./brand/02-COLOUR-SYSTEM.md) | Brand palette, semantic tokens, colour usage rules |
| [03-TYPOGRAPHY.md](./brand/03-TYPOGRAPHY.md) | Poppins type scale, 14 tokens, hierarchy rules |
| [04-SPACING-ELEVATION.md](./brand/04-SPACING-ELEVATION.md) | 4px spacing scale, radius tokens, elevation model |
| [05-ICONS.md](./brand/05-ICONS.md) | Icon sizes (12–34px), weight tokens, usage rules |
| [06-MOTION.md](./brand/06-MOTION.md) | Animation tokens, easing, focus ring |
| [07-VOICE-AND-COPY.md](./brand/07-VOICE-AND-COPY.md) | Brand voice, tone, copy patterns for every UI element |
| [08-ACCESSIBILITY.md](./brand/08-ACCESSIBILITY.md) | WCAG 2.1 AA, ARIA code patterns per component |

---

## Core components

### Tokens & Layout
| File | What's inside |
|---|---|
| [core/TOKENS.md](./core/TOKENS.md) | Full CSS `:root` block — copy-paste ready |
| [core/LAYOUT.md](./core/LAYOUT.md) | Breakpoints, page anatomy, grid rules |

### Buttons
| File | What's inside |
|---|---|
| [core/buttons/PRIMARY-BUTTON.md](./core/buttons/PRIMARY-BUTTON.md) | Primary action — anatomy, sizes, states, dos/don'ts, a11y |
| [core/buttons/SECONDARY-BUTTON.md](./core/buttons/SECONDARY-BUTTON.md) | Secondary action — always paired with primary |
| [core/buttons/LINK-BUTTON.md](./core/buttons/LINK-BUTTON.md) | Ghost/link inline button |
| [core/buttons/FAB-BUTTONS.md](./core/buttons/FAB-BUTTONS.md) | Floating action button variants |

### Forms
| File | What's inside |
|---|---|
| [core/forms/INPUTS.md](./core/forms/INPUTS.md) | Text input, floating label, all validation states |
| [core/forms/DROPDOWN.md](./core/forms/DROPDOWN.md) | Select dropdown with scroll |
| [core/forms/SEARCH.md](./core/forms/SEARCH.md) | Search input variant |
| [core/forms/PROGRESS-BAR.md](./core/forms/PROGRESS-BAR.md) | Multi-step onboarding progress |
| [core/forms/KEYPAD.md](./core/forms/KEYPAD.md) | Numeric payment keypad |

### Display
| File | What's inside |
|---|---|
| [core/display/CARDS.md](./core/display/CARDS.md) | 3-level nesting system — most distinctive pattern in the system |
| [core/display/BADGES-STATUS.md](./core/display/BADGES-STATUS.md) | Status indicator badges — 40+ types |
| [core/display/BADGES-PRODUCT.md](./core/display/BADGES-PRODUCT.md) | Product type badges |
| [core/display/HEADER-SECTION.md](./core/display/HEADER-SECTION.md) | Page/card header — 13 variants |
| [core/display/AVATAR.md](./core/display/AVATAR.md) | Avatar sizes and shape |

### Feedback
| File | What's inside |
|---|---|
| [core/feedback/TOASTERS.md](./core/feedback/TOASTERS.md) | Toast notifications — 18 message types |
| [core/feedback/TOOLTIPS.md](./core/feedback/TOOLTIPS.md) | Tooltips — 4 positions × 3 tag positions |
| [core/feedback/MODALS-OVERLAYS.md](./core/feedback/MODALS-OVERLAYS.md) | Modal, bottom sheet, confirmation pattern |

### Data
| File | What's inside |
|---|---|
| [core/data/TABLES.md](./core/data/TABLES.md) | 6 table types, all cell types, pagination, empty states |

### Navigation
| File | What's inside |
|---|---|
| [core/navigation/SIDE-NAV.md](./core/navigation/SIDE-NAV.md) | Portal + bill payments sidebar variants |
| [core/navigation/MOBILE-NAV.md](./core/navigation/MOBILE-NAV.md) | Mobile bottom nav + slide-out drawer |

---

## Product-specific guidelines

| File | What's inside |
|---|---|
| [product/portal/PORTAL-SHELL.md](./product/portal/PORTAL-SHELL.md) | Full portal page layout |
| [product/portal/PORTAL-DASHBOARD.md](./product/portal/PORTAL-DASHBOARD.md) | Dashboard patterns |
| [product/portal/PORTAL-ONBOARDING.md](./product/portal/PORTAL-ONBOARDING.md) | Bill Pay onboarding flow |
| [product/dx/DX-OVERVIEW.md](./product/dx/DX-OVERVIEW.md) | DX product patterns |
| [product/live-tap/LIVETAP-OVERVIEW.md](./product/live-tap/LIVETAP-OVERVIEW.md) | Live Tap mobile patterns |
| [product/screens/SCREEN-EXAMPLES.md](./product/screens/SCREEN-EXAMPLES.md) | All screen references with Figma node IDs |

---

## AI implementation guides (SKILL files)

| File | Use when… |
|---|---|
| [skills/SKILL-NAVIGATION.md](./skills/SKILL-NAVIGATION.md) | Building any portal page |
| [skills/SKILL-TABLE.md](./skills/SKILL-TABLE.md) | Building any data table |
| [skills/SKILL-BUTTONS.md](./skills/SKILL-BUTTONS.md) | Implementing button components |
| [skills/SKILL-FORMS.md](./skills/SKILL-FORMS.md) | Building forms or onboarding flows |
| [skills/SKILL-CARDS.md](./skills/SKILL-CARDS.md) | Building card-based layouts |
| [skills/SKILL-BADGES.md](./skills/SKILL-BADGES.md) | Using status or product badges |

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| `v1.1` | March 2026 | Conflicts resolved: primary colour `#4f4ddb`, Inter deprecated (Poppins everywhere), neutral secondary `#303339`, icon small `14px`, `--radius-full` removed (use `50%`), error colours split (`#ff513a` stroke / `#dc2626` fill). Component status table added. Precise button padding tokens added. 320px breakpoint added. Full `:root` block added. |
| `v1.0` | Feb 2026 | Initial design language document. |


---
<!-- FILE: skills/SKILL-NAVIGATION.md -->

# SKILL — Navigation
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

**Live Payments Design System** · v1.1 · Load alongside CLAUDE.md for any portal page task.

Figma: [DX nav collapsed](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev) · [Bill history shell](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=115-20526&m=dev)

---

## Step 1 — Nav variant decision

| Context | Nav pattern |
|---|---|
| Portal (DX desktop, Settlements) | Sidebar (80px collapsed / 260px expanded) + topbar |
| Live Bill Pay onboarding | BP-Menu-Section (top on 660px+, bottom on 360px) |
| DX mobile / Live Tap | Bottom nav bar (`🟢-Menu-Bar-CP`) |

---

## Step 2 — Portal shell structure

```
┌─────────────────────────────────────────┐
│  Topbar 80px          [🔔] [avatar]    │  header
├──────┬──────────────────────────────────┤
│      │                                  │
│ Nav  │  Content area (padding: 24px)   │
│ 80px │  background: #f9f9f9            │
│  or  │                                  │
│ 260px│  Page title (Header Section L)  │
│      │  Level 1 section cards          │
│      │    Level 2 body cards           │
│      │      Level 3 metric chips       │
└──────┴──────────────────────────────────┘
```

---

## Step 3 — HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>/* paste portal CSS below */</style>
</head>
<body>

<!-- Skip link — must be first element -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<div class="portal-shell">

  <!-- Topbar -->
  <header class="portal-topbar">
    <!-- Left: org logo area (optional) -->
    <div class="portal-topbar__actions">
      <button type="button" class="portal-topbar__btn notification-btn" aria-label="Notifications (32 unread)">
        <span class="notification-badge" aria-hidden="true">32</span>
        <img src="[bell]" alt="" aria-hidden="true" width="24" height="24" />
      </button>
      <div class="avatar avatar--xl" role="img" aria-label="Matthew Chen">
        <img src="[user-photo]" alt="" class="avatar__img" />
      </div>
    </div>
  </header>

  <!-- Sidebar -->
  <nav class="portal-sidebar" aria-label="Main navigation" data-expanded="false">
    <div class="portal-sidebar__org">
      <button type="button" class="org-btn" aria-label="Organisation menu">
        <img src="[org-logo]" alt="" aria-hidden="true" width="40" height="40" />
      </button>
    </div>
    <div class="portal-sidebar__items">
      <a href="/home" class="sidebar-item sidebar-item--active" aria-current="page">
        <img src="[home]" alt="" aria-hidden="true" width="24" height="24" />
        <span class="sidebar-item__label">Home</span>
      </a>
      <a href="/pay-bill" class="sidebar-item">
        <img src="[bill]" alt="" aria-hidden="true" width="24" height="24" />
        <span class="sidebar-item__label">Pay Bill</span>
      </a>
      <a href="/transactions" class="sidebar-item">
        <img src="[tx]" alt="" aria-hidden="true" width="24" height="24" />
        <span class="sidebar-item__label">Transactions</span>
      </a>
      <a href="/wallet" class="sidebar-item">
        <img src="[wallet]" alt="" aria-hidden="true" width="24" height="24" />
        <span class="sidebar-item__label">Wallet</span>
      </a>
      <a href="/history" class="sidebar-item">
        <img src="[history]" alt="" aria-hidden="true" width="24" height="24" />
        <span class="sidebar-item__label">History</span>
      </a>
    </div>
  </nav>

  <!-- Content -->
  <main class="portal-content" id="main-content">
    <!-- Page title -->
    <div class="page-header">
      <h1 class="page-title">Bill history</h1>
    </div>
    <!-- Page content — cards, tables etc. -->
  </main>

</div>
</body>
</html>
```

---

## Step 4 — CSS

```css
/* Shell grid */
.portal-shell {
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 80px 1fr;
  grid-template-areas: "topbar topbar" "sidebar content";
  height: 100vh; overflow: hidden;
}

/* Skip link */
.skip-link {
  position: absolute; top: -100%; left: 16px; z-index: 10000;
  background: var(--semantic-primary-bold-fill); color: var(--semantic-primary-bold-primary); padding: 8px 16px;
  border-radius: 8px; font-family: 'Poppins', sans-serif; text-decoration: none;
}
.skip-link:focus { top: 16px; }

/* Topbar */
.portal-topbar {
  grid-area: topbar;
  display: flex; align-items: center; justify-content: flex-end;
  padding: 0 16px;
  background: var(--semantic-primary-neutral-fill); border-bottom: 1px solid var(--semantic-primary-neutral-line); z-index: 100;
}
.portal-topbar__actions { display: flex; align-items: center; gap: 8px; }

.notification-btn {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  width: 56px; height: 56px;
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: 50%; cursor: pointer;
}
.notification-btn:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }

.notification-badge {
  position: absolute; top: -1px; right: -1px;
  background: var(--main-error-bold-fill); color: #fff;
  border-radius: 100px; border: 2px solid #fff;
  font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 12px;
  min-width: 18px; height: 14px; padding: 0 4px;
  display: flex; align-items: center; justify-content: center;
}

.avatar--xl {
  width: 56px; height: 56px; border-radius: 50%;
  border: 1px solid var(--semantic-primary-neutral-line); overflow: hidden; flex-shrink: 0;
}
.avatar__img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Sidebar */
.portal-sidebar {
  grid-area: sidebar;
  display: flex; flex-direction: column;
  width: 80px; background: var(--semantic-primary-neutral-fill); border-right: 1px solid var(--semantic-primary-neutral-line);
  overflow: hidden;
  transition: width 200ms ease-out;
}
.portal-sidebar[data-expanded="true"] { width: 260px; }

.portal-sidebar__org {
  display: flex; align-items: center; justify-content: center;
  height: 80px; border-bottom: 1px solid var(--semantic-primary-neutral-line); flex-shrink: 0;
}
.org-btn { background: none; border: none; cursor: pointer; border-radius: 50%; }
.org-btn:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }

.portal-sidebar__items {
  display: flex; flex-direction: column; align-items: center;
  padding: 8px 0; gap: 0; flex: 1;
}

.sidebar-item {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; width: 64px; height: 64px; border-radius: 64px;
  text-decoration: none; color: var(--semantic-primary-neutral-primary);
  transition: background 100ms ease-out;
}
.sidebar-item:hover { background: var(--semantic-primary-bold-primary); }
.sidebar-item--active { background: var(--semantic-primary-bold-primary); color: var(--semantic-primary-bold-fill); }
.sidebar-item:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }

.sidebar-item__label {
  font-family: 'Poppins', sans-serif; font-size: 12px; line-height: 20px;
  white-space: nowrap; overflow: hidden;
  opacity: 0; transition: opacity 200ms ease-out;
}
.portal-sidebar[data-expanded="true"] .sidebar-item__label { opacity: 1; }

/* Content */
.portal-content {
  grid-area: content; padding: 24px;
  overflow-y: auto; background: var(--main-primary-neutral-fill-l2);
}

.page-header { margin-bottom: 24px; }
.page-title {
  font-family: 'Poppins', sans-serif; font-weight: 600;
  font-size: 28px; color: var(--semantic-primary-lite-primary); margin: 0;
}
```

---

## Mobile nav bar (DX + Live Tap)

```html
<nav class="mobile-nav" aria-label="Main navigation">
  <ul class="mobile-nav__list" role="list">
    <li class="mobile-nav__item">
      <a href="/home" class="mobile-nav__link mobile-nav__link--active" aria-current="page">
        <img src="[home]" alt="" aria-hidden="true" class="mobile-nav__icon" width="24" height="24" />
        <span class="mobile-nav__label">Home</span>
      </a>
    </li>
    <li class="mobile-nav__item">
      <a href="/wallet" class="mobile-nav__link">
        <img src="[wallet]" alt="" aria-hidden="true" class="mobile-nav__icon" width="24" height="24" />
        <span class="mobile-nav__label">Wallet</span>
      </a>
    </li>
  </ul>
</nav>
```

```css
.mobile-nav {
  position: fixed; bottom: 0; left: 0; right: 0; height: 72px;
  background: var(--semantic-primary-neutral-fill); border-top: 1px solid var(--semantic-primary-neutral-line); z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}
.mobile-nav__list { display: flex; height: 100%; margin: 0; padding: 0; list-style: none; }
.mobile-nav__item { flex: 1; }
.mobile-nav__link {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; height: 100%; text-decoration: none; color: var(--text-muted);
}
.mobile-nav__link--active { color: var(--semantic-primary-lite-primary); }
.mobile-nav__label { font-family: 'Poppins', sans-serif; font-size: 12px; }
.mobile-nav__link--active .mobile-nav__label { font-weight: 500; }
.mobile-nav__link:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); border-radius: 8px; }
```

---

## Bill Pay nav (BP-Menu-Section)

Live Bill Pay uses `BP-Menu-Section` — not the sidebar — during onboarding.

| Breakpoint | Position |
|---|---|
| 660px and above | Top of page |
| Below 660px | Bottom of page |

---

## Accessibility checklist

- [ ] `<a href="#main-content" class="skip-link">` is first element on page
- [ ] `<header>`, `<nav>`, `<main>` landmark elements used
- [ ] `<nav>` has `aria-label="Main navigation"`
- [ ] Active nav item has `aria-current="page"` on the `<a>` element
- [ ] Nav icons have `aria-hidden="true"` — label provides the name
- [ ] Notification badge count in `aria-label` on button: "Notifications (32 unread)"
- [ ] Avatar `role="img"` with `aria-label` of user's name
- [ ] Sidebar expand/collapse button has `aria-label` and `aria-expanded`
- [ ] `id="main-content"` on `<main>` — must match skip link href

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Missing skip link | Required — first focusable element on every page |
| `aria-current="page"` on parent `<li>` | Must be on the `<a>` element, not the list item |
| Nav icons with meaningful alt text | Icons are decorative alongside labels — use `alt=""` |
| Sidebar width hardcoded (not using transition) | Width must transition: `transition: width 200ms ease-out` |
| `outline: none` on focused nav item with no replacement | Always replace with focus ring |
| Page title colour using `--text-primary` | Page titles always use `#3a2db8` (`--text-header`) |
| No safe area inset on mobile nav | Always add `padding-bottom: env(safe-area-inset-bottom)` |


---
<!-- FILE: skills/SKILL-TABLE.md -->

# SKILL — Tables
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

**Live Payments Design System** · v1.1 · Load alongside CLAUDE.md for any data table task.

Figma: [Table components](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27998-184695&m=dev) · [Table cells](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27995-18448&m=dev) · [Empty states](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27995-22010&m=dev) · [Pagination](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27998-184694&m=dev) · [Bill History example](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=115-20526&m=dev)

---

## Step 1 — Table type

| Type | Figma component | Rows expand? | Use |
|---|---|---|---|
| Daily Settlements | `Daily-Settlements-Table` | ✅ | Daily settlement records |
| Monthly Settlements | `Monthly-Settlements-Table` | ✅ | Monthly summaries |
| Annual Settlements | `Annual-Settlements-Table` | ✅ | Annual summaries |
| Transaction | `Transaction-Table` | ❌ (date groups) | Transaction log |
| QBR | `QBR-Table` | ❌ | Quarterly business review |
| Generic | `Table` | Optional | Bill history, payees, custom |

---

## Step 2 — Cell types

| Cell type | Figma variant | Height | Use |
|---|---|---|---|
| Header | `Type=Header` | 32px | Column label |
| Cell | `Type=Cell` | 64px | Text / amount |
| Status | `Type=Status` | 64px | Status badge |
| Product | `Type=Product` | 64px | Product type badge |
| Scheme | `Type=Scheme` | 64px | Payment scheme card (Visa, MC) |
| View More | `Type=View More` | 64px | Secondary "View More →" button |
| More actions | `Type=More actions` | 64px | Secondary button (same visual) |
| View actions | `Type=View actions` | 64px | Single FAB icon button |
| Multi icon | `Type=Multi icon` | 64px | 2–3 FAB buttons (edit/delete/more) |
| More actions small | `Type=More actions small` | 64px | Single dots FAB — 78px wide only |
| Download | `Type=Download` | 64px | Secondary "Download ↓" button |

---

## Step 3 — HTML structure

```html
<div class="table-container">

  <!-- Controls -->
  <div class="table-controls">
    <div class="table-controls__actions">
      <button type="button" class="table-fab" aria-label="Filter">
        <img src="[filter]" alt="" aria-hidden="true" width="14" height="14" />
      </button>
      <button type="button" class="table-fab" aria-label="Calendar">
        <img src="[calendar]" alt="" aria-hidden="true" width="14" height="14" />
      </button>
      <button type="button" class="table-fab" aria-label="Download">
        <img src="[download]" alt="" aria-hidden="true" width="14" height="14" />
      </button>
    </div>
  </div>

  <!-- Table -->
  <div class="table-scroll-wrapper">
    <table class="data-table" aria-label="Transaction history">
      <thead>
        <tr class="table-header-row">
          <th class="table-cell table-cell--expander-spacer" scope="col" aria-hidden="true"></th>
          <th class="table-cell table-cell--header" scope="col">Biller name</th>
          <th class="table-cell table-cell--header" scope="col">Status</th>
          <th class="table-cell table-cell--header" scope="col">Amount</th>
          <th class="table-cell table-cell--header table-cell--actions" scope="col">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>

        <!-- Date group divider (Transaction table only) -->
        <tr class="table-date-divider">
          <td colspan="5" class="table-date-label">14 Nov 2023</td>
        </tr>

        <!-- Standard row -->
        <tr class="table-row">
          <td class="table-cell table-cell--expander">
            <button class="expander-btn" type="button"
              aria-expanded="false" aria-label="Expand row details">
              <img src="[chevron]" alt="" aria-hidden="true" />
            </button>
          </td>
          <td class="table-cell table-cell--text">ATO</td>
          <td class="table-cell table-cell--status">
            <div class="badge badge--green badge--l">
              <img src="[check]" alt="" aria-hidden="true" width="16" height="16" />
              Sent
            </div>
          </td>
          <td class="table-cell table-cell--amount">$100.00</td>
          <td class="table-cell table-cell--actions">
            <button type="button" class="table-btn-secondary">
              More details
              <img src="[arrow]" alt="" aria-hidden="true" width="16" height="16" />
            </button>
          </td>
        </tr>

        <!-- Skeleton loading row -->
        <tr class="table-row table-row--skeleton" aria-busy="true">
          <td class="table-cell table-cell--expander-spacer"></td>
          <td class="table-cell"><div class="skeleton-line"></div></td>
          <td class="table-cell"><div class="skeleton-line"></div></td>
          <td class="table-cell"><div class="skeleton-line"></div></td>
          <td class="table-cell"></td>
        </tr>

      </tbody>
    </table>
  </div>

  <!-- Empty state (when no data) -->
  <div class="table-empty-state" role="status" aria-live="polite">
    <!-- See empty state patterns below -->
  </div>

  <!-- Pagination -->
  <div class="table-pagination">
    <nav class="pagination" aria-label="Table pagination">
      <button type="button" class="pagination-btn" aria-label="Previous page">
        <img src="[chevron-left]" alt="" aria-hidden="true" width="24" height="24" />
      </button>
      <button type="button" class="pagination-btn pagination-btn--active"
        aria-current="page" aria-label="Page 1">1</button>
      <button type="button" class="pagination-btn" aria-label="Page 2">2</button>
      <button type="button" class="pagination-btn pagination-btn--ellipsis" disabled>...</button>
      <button type="button" class="pagination-btn" aria-label="Page 99">99</button>
      <button type="button" class="pagination-btn" aria-label="Next page">
        <img src="[chevron-right]" alt="" aria-hidden="true" width="24" height="24" />
      </button>
    </nav>
  </div>

</div>
```

---

## Step 4 — CSS

```css
/* Table container */
.table-container {
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: 32px; padding-top: 24px; padding-bottom: 16px; width: 100%;
}

/* Controls */
.table-controls {
  display: flex; justify-content: flex-end;
  padding: 8px 16px 16px;
}
.table-controls__actions { display: flex; gap: 8px; }
.table-fab {
  display: flex; align-items: center; justify-content: center;
  padding: 13px; background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: 10px; cursor: pointer;
}
.table-fab:hover { background: var(--semantic-primary-bold-primary); }
.table-fab:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }

/* Scroll wrapper */
.table-scroll-wrapper { width: 100%; overflow-x: auto; }

/* Table */
.data-table { width: 100%; border-collapse: collapse; table-layout: fixed; }

/* Header row */
.table-header-row { background: var(--main-primary-neutral-fill-l2); border: 1px solid var(--semantic-primary-neutral-line); }

/* Base cell */
.table-cell { font-family: 'Poppins', sans-serif; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Header cell */
.table-cell--header {
  height: 32px; min-width: 200px; max-width: 256px; padding: 0 16px;
  font-size: 14px; line-height: 22px; color: var(--text-label); text-align: left; font-weight: 400;
}

/* Data cells */
.table-cell--text, .table-cell--amount {
  height: 64px; min-height: 64px; min-width: 200px; max-width: 256px;
  padding: 16px; font-size: 14px; line-height: 14px; /* tight — intentional */
  color: var(--semantic-primary-neutral-primary); text-transform: uppercase; text-align: right;
}

/* Expander zone — always 56px wide */
.table-cell--expander, .table-cell--expander-spacer {
  width: 56px; min-width: 56px; max-width: 56px; padding: 0;
}

/* Actions cell */
.table-cell--actions {
  display: flex; align-items: center; justify-content: flex-end;
  padding: 0 16px; flex: 1;
}

/* Status cell */
.table-cell--status { height: 64px; min-height: 64px; min-width: 200px; max-width: 256px; padding: 16px; }

/* Data rows */
.table-row { border-bottom: 1px solid var(--semantic-primary-neutral-line); transition: background 100ms ease-out; }
.table-row:hover { background: var(--semantic-primary-bold-primary); }

/* Expander button */
.expander-btn {
  display: flex; align-items: center; justify-content: center;
  width: 56px; height: 56px; background: none; border: none; cursor: pointer;
}
.expander-btn:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); border-radius: 8px; }

/* Date divider row */
.table-date-divider { background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line); }
.table-date-label { height: 36px; padding: 0 16px; font-family: 'Poppins', sans-serif; font-size: 16px; color: var(--semantic-primary-neutral-primary); }

/* Action buttons in cells */
.table-btn-secondary {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 11px 9px 11px 13px;
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line); border-radius: 12px;
  font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 16px;
  color: var(--semantic-primary-neutral-primary); cursor: pointer; white-space: nowrap; text-transform: capitalize;
}
.table-btn-secondary:hover { border-color: var(--semantic-primary-lite-primary); }
.table-btn-secondary:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }

/* Skeleton */
.skeleton-line {
  height: 16px; border-radius: 4px; width: 80%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}
@keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Pagination */
.table-pagination { display: flex; justify-content: flex-end; padding: 16px; }
.pagination { display: flex; align-items: center; gap: 8px; }
.pagination-btn {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; padding: 8px;
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line); border-radius: 12px;
  font-family: 'Poppins', sans-serif; font-size: 16px; color: var(--semantic-primary-neutral-primary); cursor: pointer;
}
.pagination-btn--active {
  background: var(--semantic-primary-bold-primary); border-color: var(--semantic-primary-bold-fill); color: var(--semantic-primary-lite-primary);
  box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line);
}
.pagination-btn:hover:not(.pagination-btn--active):not(:disabled) { border-color: var(--semantic-primary-lite-primary); }
.pagination-btn:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }
.pagination-btn--ellipsis { cursor: default; pointer-events: none; }

/* Mobile — sticky first column */
@media (max-width: 659px) {
  .table-cell--expander, .table-cell--expander-spacer {
    position: sticky; left: 0; background: var(--semantic-primary-neutral-fill); z-index: 1;
  }
  .table-row:hover .table-cell--expander,
  .table-row:hover .table-cell--expander-spacer { background: var(--semantic-primary-bold-primary); }
}
```

---

## Empty state patterns

Show the correct type — never leave a blank table.

```html
<!-- First-time / no transactions ever -->
<div class="table-empty-state" role="status">
  <img src="[puzzle-illustration]" alt="" aria-hidden="true" style="width:293px;height:293px" />
  <div class="empty-state__text">
    <h3 style="font-family:'Poppins',sans-serif;font-weight:500;font-size:20px;color:#303339">Welcome!</h3>
    <p style="font-family:'Poppins',sans-serif;font-size:14px;color:#535863">It looks like you haven't made any transactions yet.</p>
  </div>
</div>

<!-- No results from search -->
<div class="table-empty-state" role="status">
  <h3>No results found</h3>
  <p>Try adjusting your search to find what you're looking for.</p>
</div>

<!-- No results from filter -->
<div class="table-empty-state" role="status">
  <h3>No transactions match your filters.</h3>
  <p>Try adjusting your filters to see more results.</p>
</div>
```

| Context | Type to use |
|---|---|
| No transactions ever | First-Time User |
| Has history but nothing recent | No Recent Transactions |
| Filter returned nothing | No Transactions on Filtering |
| Search returned nothing | No Transactions on Search |
| Both search + filter active, no results | No Transactions on Search and Filtering |
| Data loading | Loader |

---

## Accessibility checklist

- [ ] `<table>` has `aria-label` describing its purpose
- [ ] All `<th>` have `scope="col"` or `scope="row"`
- [ ] Actions-only column header: `<span class="sr-only">Actions</span>`
- [ ] Expander buttons: `aria-expanded="true/false"` updated on click; `aria-label="Expand row details"`
- [ ] Pagination `<nav>` has `aria-label="Table pagination"`
- [ ] Active page button has `aria-current="page"`
- [ ] Previous/Next: `aria-label="Previous page"` / `aria-label="Next page"`
- [ ] Empty state: `role="status"` + `aria-live="polite"`
- [ ] Skeleton rows: `aria-busy="true"`
- [ ] Mobile: horizontal scroll, never reflow to cards
- [ ] First column sticky on mobile

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Table container without 32px radius | Always `border-radius: 32px` |
| Missing 56px expander spacer on non-expandable rows | Always add spacer to maintain column alignment |
| Table reflowing to cards on mobile | Scroll horizontally — never reflow |
| Active pagination button missing box-shadow | Active button always has both border colour AND box-shadow |
| Leaving table empty (no data) | Always show the correct empty state — never blank |
| Status badge colour-only | Always text + colour + icon |


---
<!-- FILE: skills/SKILL-BUTTONS.md -->

# SKILL — Buttons
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

**Live Payments Design System** · v1.1 · Load alongside CLAUDE.md for any button task.

Figma: [Primary](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=17845-61780&m=dev) · [Secondary](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=17845-62166&m=dev) · [Link](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=17845-62937&m=dev)

---

## Step 1 — Pick the type

| I need to… | Type | Class |
|---|---|---|
| Main action (Confirm, Save, Submit, Done) | Primary | `.btn-primary` |
| Safe exit / alternative (Cancel, Back, Close) | Secondary | `.btn-secondary` |
| "View all" inline link, Edit | Link/ghost | `.btn-link` |
| Icon-only utility (filter, sort, more) | FAB | `.btn-fab` |

**One Primary per action area. Never two.**

---

## Step 2 — Pick the size

| Size | Height | H padding | V padding | Font | Gap | Context |
|---|---|---|---|---|---|---|
| S | 34px | 16px | 8px | 14px | 6px | Table rows, tight card layouts |
| M (default) | 46px | 20px | 12px | 14px | 8px | Forms, modals, standalone CTAs |
| L | 56px | 24px | 16px | 16px | 10px | Full-width mobile, hero |

**Primary + Secondary always use the same size when paired.**

---

## Step 3 — Layout pattern

**Desktop — horizontal pair:**
```
[Secondary — Cancel]  [Primary — Confirm]
gap: 12px, right-aligned
```

**Mobile — vertical stack:**
```
[Primary — Block Card]    ← top
[Secondary — Cancel]      ← below, gap: 16px
both full-width
```

---

## Complete CSS

```css
/* Base */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: 'Poppins', sans-serif; font-weight: 500;
  text-transform: capitalize; white-space: nowrap; cursor: pointer;
  border: 1px solid;
  transition: background 100ms ease-out, border-color 100ms ease-out, opacity 100ms ease-out;
}
.btn:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }
.btn[aria-disabled="true"] { opacity: 0.5; pointer-events: none; }
.btn--full { width: 100%; }

/* Primary */
.btn-primary {
  background: var(--semantic-primary-bold-fill); border-color: var(--semantic-primary-bold-fill); color: var(--semantic-primary-bold-primary);
}
.btn-primary:hover { opacity: 0.92; }

/* Secondary */
.btn-secondary {
  background: var(--semantic-primary-neutral-fill); border-color: var(--semantic-primary-neutral-line); color: var(--semantic-primary-neutral-primary);
}
.btn-secondary:hover { background: var(--semantic-primary-bold-primary); }

/* Link */
.btn-link {
  background: none; border: none; color: var(--semantic-primary-lite-primary);
  font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 14px;
  padding: 4px 0; cursor: pointer;
}
.btn-link:hover { text-decoration: underline; }
.btn-link:focus-visible { border-radius: 4px; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }

/* Sizes */
.btn--s { height: 34px; padding: 8px 16px;  font-size: 14px; gap: 6px;  border-radius: 8px; }
.btn--m { height: 46px; padding: 12px 20px; font-size: 14px; gap: 8px;  border-radius: 12px; }
.btn--l { height: 56px; padding: 16px 24px; font-size: 16px; gap: 10px; border-radius: 12px; }

/* FAB */
.btn-fab {
  display: flex; align-items: center; justify-content: center;
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line); border-radius: 10px;
  padding: 13px; cursor: pointer;
}
.btn-fab:hover { background: var(--semantic-primary-bold-primary); }
.btn-fab:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line); }

/* Action patterns */
.action-strip { display: flex; align-items: center; justify-content: flex-end; gap: 12px; }
.action-stack { display: flex; flex-direction: column; gap: 16px; width: 100%; }
```

---

## HTML patterns

```html
<!-- Primary -->
<button type="button" class="btn btn-primary btn--m">Confirm</button>

<!-- Primary full-width mobile -->
<button type="button" class="btn btn-primary btn--l btn--full">Save</button>

<!-- Secondary -->
<button type="button" class="btn btn-secondary btn--m">Cancel</button>

<!-- Disabled (stays keyboard-focusable) -->
<button type="button" class="btn btn-primary btn--m" aria-disabled="true">Submit</button>

<!-- Desktop action strip: Secondary left, Primary right -->
<div class="action-strip">
  <button type="button" class="btn btn-secondary btn--m">Back</button>
  <button type="button" class="btn btn-primary btn--m">Confirm</button>
</div>

<!-- Mobile action stack: Primary top, Secondary below -->
<div class="action-stack">
  <button type="button" class="btn btn-primary btn--l btn--full">Block Card</button>
  <button type="button" class="btn btn-secondary btn--l btn--full">Cancel</button>
</div>

<!-- FAB (icon-only — always needs aria-label) -->
<button type="button" class="btn-fab" aria-label="Filter results">
  <img src="[filter-icon]" alt="" aria-hidden="true" width="14" height="14" />
</button>

<!-- Link button -->
<button type="button" class="btn btn-link">View all</button>
```

---

## Real product examples

| Product | Screen | Pattern |
|---|---|---|
| Live Bill Pay | Review & Confirm | "Back" (secondary) + "Confirm" (primary) — desktop horizontal |
| Live Bill Pay | Verify popup | "Cancel" (secondary) + "Confirm" (primary) |
| DX | Receipt sheet | Primary "Print Customer Receipt" + 2 Secondaries — stacked |
| Live Tap | Block Card | Primary "Block Card" + Secondary "Cancel" — full-width stacked |
| Live Tap | Success state | Single Primary "Done" — full-width, no secondary needed |

---

## Accessibility checklist

- [ ] Native `<button type="button">` — not `<div>` or `<span>`
- [ ] Verb-first labels: "Confirm", "Block Card" — not "OK", "Submit"
- [ ] Icon-only buttons have `aria-label`
- [ ] Icons have `alt=""` and `aria-hidden="true"`
- [ ] Disabled: `aria-disabled="true"` not HTML `disabled` (stays focusable)
- [ ] Focus ring on `:focus-visible` — never `outline: none` without replacement
- [ ] Touch target ≥ 44×44px (S 34px needs transparent padding extension)
- [ ] One Primary per action area
- [ ] Secondary never alone

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Two Primary buttons in one view | One primary only — demote second to Secondary |
| Primary for "Learn More" or "View Details" | Those are Link buttons — Primary is for transactional commits |
| Secondary without a Primary | Secondary always needs a Primary pair |
| Different sizes on paired buttons | Both must be same size |
| `disabled` attribute on button | Use `aria-disabled="true"` so it stays focusable |
| Mobile Secondary above Primary | Primary always top in stacked layout |
| Raw hex in CSS | Use `var(--semantic-primary-bold-fill)` etc. |


---
<!-- FILE: skills/SKILL-FORMS.md -->

# SKILL — Forms
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

**Live Payments Design System** · v1.1 · Load alongside CLAUDE.md for any form task.

Figma: [Onboarding flow](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-28773&m=dev) · [Identity step](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-18831&m=dev)

---

## Form types

| Type | Pattern |
|---|---|
| Single-step | Input group(s) + action strip |
| Multi-step onboarding | Progress bar + Module container + action strip |
| Selection | Dropdown trigger + floating list |
| Search | Input with prepended search icon |
| Payment entry | Keypad (separate component — see core/forms/KEYPAD.md) |

---

## Complete CSS

```css
/* ── Input ── */
.form { display: flex; flex-direction: column; gap: 16px; }

.input-wrapper { position: relative; height: 56px; }

.input-label {
  position: absolute; top: -1px; left: 13px; z-index: 2;
  padding: 0 2px; background: var(--semantic-primary-neutral-fill);
  font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 400;
  color: var(--semantic-primary-neutral-primary); pointer-events: none;
}

.input-field {
  width: 100%; height: 100%; padding: 12px 13px;
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line); border-radius: 12px;
  font-family: 'Poppins', sans-serif; font-size: 14px; color: var(--semantic-primary-neutral-primary);
  outline: none;
  transition: border-color 100ms ease-out, box-shadow 100ms ease-out;
}
.input-field::placeholder { color: var(--text-muted); }
.input-field:focus {
  border-color: var(--semantic-primary-bold-fill);
  box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line);
}
.input-field.is-error  { border-color: var(--semantic-error-stroke); }   /* error-stroke — border ONLY */
.input-field.is-success { border-color: var(--semantic-success-lite-primary); }

/* Message zone — always reserve 20px even when empty */
.input-message {
  min-height: 20px; padding-top: 4px;
  display: flex; align-items: center; gap: 4px;
  font-family: 'Poppins', sans-serif; font-size: 12px;
}
.input-message--error   { color: var(--semantic-error-fill); }   /* error-fill — text ONLY */
.input-message--success { color: var(--semantic-success-lite-primary); }

/* ── Dropdown ── */
.dropdown { position: relative; }
.dropdown__trigger {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; cursor: pointer; text-align: left;
}
.dropdown__chevron {
  flex-shrink: 0;
  transition: transform 150ms ease-out;
}
.dropdown[data-open="true"] .dropdown__chevron { transform: rotate(180deg); }

.dropdown__list {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  max-height: 320px; overflow-y: auto;
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line); border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08); z-index: 50;
  animation: dropdown-open 150ms ease-out;
}
@keyframes dropdown-open {
  from { opacity: 0; transform: scaleY(0.95); transform-origin: top; }
  to   { opacity: 1; transform: scaleY(1); }
}
.dropdown__item {
  display: flex; align-items: center; padding: 0 16px; height: 44px;
  font-family: 'Poppins', sans-serif; font-size: 14px; color: var(--semantic-primary-neutral-primary);
  cursor: pointer; list-style: none;
}
.dropdown__item:hover { background: var(--semantic-primary-bold-primary); }
.dropdown__item[aria-selected="true"] { color: var(--semantic-primary-lite-primary); background: var(--semantic-primary-bold-primary); }

/* ── Module (onboarding container) ── */
.module {
  width: 100%; max-width: 760px; margin: 0 auto;
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: 32px; padding: 32px;
}

/* ── Progress bar ── */
.progress-bar__track {
  position: relative; height: 4px; background: var(--semantic-primary-lite-line);
  border-radius: 100px; margin-bottom: 12px;
}
.progress-bar__fill {
  height: 100%; background: var(--semantic-primary-lite-primary); border-radius: 100px;
  transition: width 200ms ease-out;
}
.progress-bar__steps { display: flex; justify-content: space-between; }
.progress-step { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.progress-step__icon {
  width: 32px; height: 32px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.progress-step--active .progress-step__icon   { background: var(--progress-active); }
.progress-step--completed .progress-step__icon { background: var(--semantic-primary-bold-fill); }
.progress-step--future .progress-step__icon    { background: var(--main-primary-neutral-fill-l2); border: 1px solid var(--color-scheme-border); }
.progress-step__label { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 12px; }
.progress-step--active .progress-step__label   { color: var(--semantic-primary-lite-primary); }
.progress-step--future .progress-step__label   { color: var(--text-label); }
```

---

## HTML patterns

```html
<!-- Standard input with floating label -->
<div class="input-group">
  <div class="input-wrapper">
    <label for="abn" class="input-label">ABN</label>
    <input id="abn" type="text" class="input-field"
      placeholder="Enter your 11-digit ABN"
      aria-required="true" aria-describedby="abn-msg" />
  </div>
  <div id="abn-msg" class="input-message" aria-live="polite"></div>
</div>

<!-- Error state -->
<div class="input-wrapper">
  <label for="abn" class="input-label">ABN</label>
  <input id="abn" type="text" class="input-field is-error"
    aria-required="true" aria-invalid="true" aria-describedby="abn-msg" />
</div>
<div id="abn-msg" class="input-message input-message--error" role="alert">
  Enter a valid ABN — it should be 11 digits
</div>

<!-- Dropdown -->
<div class="dropdown" data-open="false">
  <button type="button" class="dropdown__trigger input-field"
    aria-haspopup="listbox" aria-expanded="false">
    <span class="dropdown__value">Select industry</span>
    <img src="[chevron]" alt="" aria-hidden="true" width="16" height="16" class="dropdown__chevron" />
  </button>
  <ul class="dropdown__list" role="listbox" aria-label="Industry" hidden>
    <li role="option" class="dropdown__item" aria-selected="false">Hospitality</li>
    <li role="option" class="dropdown__item" aria-selected="false">Retail</li>
  </ul>
</div>

<!-- Multi-step form -->
<div class="module">
  <!-- Progress bar -->
  <div class="progress-bar" role="progressbar"
    aria-valuenow="2" aria-valuemin="1" aria-valuemax="3"
    aria-label="Step 2 of 3: Identity">
    <div class="progress-bar__track">
      <div class="progress-bar__fill" style="width: 66%"></div>
    </div>
    <div class="progress-bar__steps">
      <div class="progress-step progress-step--completed">
        <div class="progress-step__icon"><!-- check --></div>
        <span class="progress-step__label">Business</span>
      </div>
      <div class="progress-step progress-step--active">
        <div class="progress-step__icon"><!-- id --></div>
        <span class="progress-step__label">Identity</span>
      </div>
      <div class="progress-step progress-step--future">
        <div class="progress-step__icon"><!-- review --></div>
        <span class="progress-step__label">Review</span>
      </div>
    </div>
  </div>

  <!-- Form -->
  <form class="form" novalidate>
    <!-- inputs here -->
  </form>

  <!-- Action strip -->
  <div class="action-strip" style="margin-top: 24px">
    <button type="button" class="btn btn-secondary btn--m">Back</button>
    <button type="button" class="btn btn-primary btn--m">Next</button>
  </div>
</div>
```

---

## Accessibility checklist

- [ ] Every `<input>` has `<label>` via `for`/`id` — not placeholder as substitute
- [ ] `aria-required="true"` on required fields
- [ ] `aria-invalid="true"` only in error state
- [ ] `aria-describedby` links input to message element
- [ ] Error messages use `role="alert"` for immediate announcement
- [ ] `novalidate` on `<form>` — custom validation, not browser default
- [ ] Dropdown trigger: `aria-haspopup="listbox"`, `aria-expanded` toggled on open/close
- [ ] Dropdown list: `role="listbox"`, items: `role="option"` + `aria-selected`
- [ ] `Escape` closes dropdown, returns focus to trigger
- [ ] Progress bar: `role="progressbar"`, `aria-valuenow/min/max`, `aria-label`

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Placeholder as substitute for label | Always `<label>` — placeholder disappears on typing |
| `--semantic-error-stroke` on error text | Only borders. Error text = `#dc2626` (error-fill) |
| `--semantic-error-fill` on error border | Only text/fills. Error border = `#ff513a` (error-stroke) |
| No message zone reserved | Always `min-height: 20px` — prevents layout shift |
| `aria-invalid` always set | Only `true` when field actually has an error |
| Module max-width missing | Always `max-width: 760px` centred for onboarding |


---
<!-- FILE: skills/SKILL-CARDS.md -->

# SKILL — Cards
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

**Live Payments Design System** · v1.1 · Load alongside CLAUDE.md for any card/dashboard task.

Figma: [Dashboard](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-34584&m=dev) · [Wallet](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-36698&m=dev)

---

## The 3-level system — learn this first

Every dashboard, panel, and content screen uses this exact nesting. Never skip a level. Never add a 4th.

```
Level 1 — Section container (outermost)
  Tinted bg (#fafaff) + lite border (#d4d5f7), OR purple fill for hero sections
  Radius: 28px (hero/feature) or 16px (standard)

  Level 2 — Body card (middle)
    WHITE bg (#ffffff) + neutral border (#d1d2d5) — ALWAYS white, regardless of Level 1
    Radius matches Level 1
    Padding: 16px

    Level 3 — Chip / metric block (innermost)
      Semantic fill + matching border
      Radius: 16px (always)
      Contains: label + value
```

---

## Visual example

```
┌───────────────────────────────────┐  Level 1 (hero purple)
│  Today at a glance                │  bg: #4f4ddb, radius: 28px
│                                   │
│  ┌───────────────────────────┐    │  Level 2
│  │  ┌──────────┐ ┌────────┐  │    │  bg: white, radius: 28px
│  │  │ $12,450  │ │  48 tx │  │    │  Level 3 chips
│  │  │ Settled  │ │ Today  │  │    │  green / blue
│  │  └──────────┘ └────────┘  │    │
│  └───────────────────────────┘    │
└───────────────────────────────────┘
```

---

## Complete CSS

```css
/* Level 1 — standard section */
.card-section {
  background: var(--semantic-primary-bold-primary); border: 1px solid var(--semantic-primary-lite-line);
  border-radius: 16px; padding: 16px;
}

/* Level 1 — hero (purple) */
.card-section--hero {
  background: var(--semantic-primary-bold-fill); border-color: var(--semantic-primary-bold-fill);
  border-radius: 28px; color: var(--semantic-primary-bold-primary);
}

/* Level 2 — body card (always white) */
.card-body {
  background: var(--semantic-primary-neutral-fill); border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: 16px; padding: 16px;
}
/* When Level 1 is 28px, Level 2 must also be 28px */
.card-section--hero > .card-body { border-radius: 28px; }

/* Level 2 header */
.card-body__header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px;
}
.card-body__title {
  font-family: 'Poppins', sans-serif; font-weight: 500;
  font-size: 18px; line-height: 26px; color: var(--semantic-primary-lite-primary); margin: 0;
}

/* Level 3 — metric chips */
.chip {
  display: inline-flex; flex-direction: column;
  padding: 12px 16px; border-radius: 16px; border: 1px solid;
}
.chip__label {
  font-family: 'Poppins', sans-serif; font-size: 12px;
  font-weight: 400; line-height: 20px; opacity: 0.8;
}
.chip__value {
  font-family: 'Poppins', sans-serif; font-size: 20px;
  font-weight: 600; line-height: normal;
}

/* Chip colour variants */
.chip--success { background: var(--semantic-success-lite-fill); border-color: var(--semantic-success-lite-primary); color: var(--semantic-success-lite-primary); }
.chip--caution { background: var(--semantic-caution-lite-fill); border-color: var(--semantic-caution-bold-line); color: var(--semantic-caution-lite-primary); }
.chip--info    { background: var(--semantic-blue-bold-primary); border-color: var(--semantic-blue-lite-line); color: var(--semantic-blue-lite-primary); }
.chip--primary { background: var(--semantic-primary-bold-primary); border-color: var(--semantic-primary-lite-line); color: var(--semantic-primary-lite-primary); }
.chip--neutral { background: var(--semantic-primary-neutral-fill); border-color: var(--semantic-primary-neutral-line); color: var(--semantic-primary-neutral-primary); }

/* Chip grid */
.chip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

/* Skeleton loading */
.card-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: 12px; height: 80px;
}
@keyframes skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## HTML pattern

```html
<!-- 3-level structure -->
<div class="card-section">
  <div class="card-body">
    <div class="card-body__header">
      <h2 class="card-body__title">Today's Summary</h2>
      <button type="button" class="btn btn-link">View all</button>
    </div>
    <div class="chip-grid">
      <div class="chip chip--success">
        <span class="chip__label">Settled</span>
        <span class="chip__value">$12,450</span>
      </div>
      <div class="chip chip--caution">
        <span class="chip__label">Pending</span>
        <span class="chip__value">$3,200</span>
      </div>
      <div class="chip chip--info">
        <span class="chip__label">Transactions</span>
        <span class="chip__value">48</span>
      </div>
    </div>
  </div>
</div>

<!-- Hero section (purple Level 1) -->
<div class="card-section card-section--hero">
  <div class="card-body"><!-- white body inside purple hero --></div>
</div>

<!-- Loading skeleton -->
<div class="card-section">
  <div class="card-body">
    <div class="card-skeleton" aria-busy="true" aria-label="Loading..."></div>
  </div>
</div>
```

---

## Radius rules

```
Level 1: 28px (hero) → Level 2 must be 28px  ✓
Level 1: 16px (standard) → Level 2: 16px     ✓
Any Level 3 chip: always 16px                 ✓
Level 2 radius > Level 1 radius               ✗ Never
More than 3 levels                            ✗ Never
```

---

## Accessibility checklist

- [ ] Card headings use `<h2>` or `<h3>` — not styled `<div>`
- [ ] Heading levels follow document outline — don't skip
- [ ] Skeleton cards: `aria-busy="true"` + `aria-label="Loading..."`
- [ ] Chips include text label — never colour alone for status
- [ ] Max 2 chip colour families per card — more creates hierarchy confusion

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Single white card with no nesting | Always nest — flat single-layer looks out of character |
| Level 2 body card not white | Body card is ALWAYS white, regardless of Level 1 colour |
| Chip radius 8px inside 28px outer | Chip is always 16px radius — looks displaced otherwise |
| Green bg on Level 2 | Semantic colour belongs in Level 3 chips only |
| 4 levels of nesting | Stop at 3 — 4th level creates unreadably narrow content |


---
<!-- FILE: skills/SKILL-BADGES.md -->

# SKILL — Badges
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

**Live Payments Design System** · v1.1 · Load alongside CLAUDE.md for any badge task.

Figma: [Status Badges](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=28325-44521&m=dev) · [Product Badges](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=28045-15415&m=dev)

---

## Two badge types

| I need to show… | Type |
|---|---|
| Transaction status (Approved, Pending, Failed…) | Status / Indicator badge |
| Payment product type (Terminal, LiveTap…) | Product badge |

---

## Status badge — colour sets

**Never mix colours from different sets.** Use the complete set.

| State | Background | Border | Text | CSS class |
|---|---|---|---|---|
| Green — positive | `#f0fdf4` | `#166534` | `#166534` | `.badge--green` |
| Amber — in-progress | `#fffdf5` | `#f59e0b` | `#92400e` | `.badge--amber` |
| Red — error | `#fef9f9` | `#ff513a` | `#dc2626` | `.badge--red` |
| Blue — info | `#f0faff` | `#0ea0e9` | `#075b85` | `.badge--blue` |
| Grey — neutral | `#ffffff` | `#d1d2d5` | `#303339` | `.badge--grey` |

**Note on red badges:** border uses error-stroke (#ff513a), text uses error-fill (#dc2626). These are different values — do not swap.

---

## Sizes

| Size | Height | Padding | Font | Icon | Use |
|---|---|---|---|---|---|
| L | 22px | 0 8px | 14px | 16px | Table cells, card headers — default |
| M | 20px | 0 8px | 12px | 14px | Compact rows |
| S | 20×20px | 4px | none | 20px | Icon-only mobile |

---

## State → colour mapping

| State | Class | State | Class |
|---|---|---|---|
| Approved, Active, Transferred, Processed, Sent, Paid, Sale | `badge--green` | Pending, Processing, Remitting, Bounceback | `badge--amber` |
| Declined, Failed, Error, Void, Hold, Reverse, Cancelled | `badge--red` | Chargeback, Refund, Inactive, NA, Closed, Expired, Issued | `badge--grey` |
| New Feature, Bpay, Account transfer | `badge--blue` | | |

---

## CSS

```css
/* Base */
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid; border-radius: 4px;
  font-family: 'Poppins', sans-serif; font-weight: 400;
  text-transform: capitalize; white-space: nowrap; flex-shrink: 0;
}

/* Sizes */
.badge--l { height: 22px; padding: 0 8px; font-size: 14px; line-height: 22px; }
.badge--m { height: 20px; padding: 0 8px; font-size: 12px; line-height: 20px; }
.badge--s { height: 20px; width: 20px; padding: 4px; justify-content: center; font-size: 0; }

/* Colour variants */
.badge--green { background: var(--semantic-success-lite-fill); border-color: var(--semantic-success-lite-primary); color: var(--semantic-success-lite-primary); }
.badge--amber { background: var(--semantic-caution-lite-fill); border-color: var(--semantic-caution-bold-line); color: var(--semantic-caution-lite-primary); }
.badge--red   { background: var(--semantic-error-lite-fill); border-color: var(--semantic-error-stroke); color: var(--semantic-error-fill); }
.badge--blue  { background: var(--semantic-blue-bold-primary); border-color: var(--semantic-blue-lite-line); color: var(--semantic-blue-lite-primary); }
.badge--grey  { background: var(--semantic-primary-neutral-fill); border-color: var(--semantic-primary-neutral-line); color: var(--semantic-primary-neutral-primary); }

/* Product badge */
.badge-product {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--semantic-blue-bold-primary); border: 1px solid var(--semantic-blue-lite-line); color: var(--semantic-blue-lite-primary);
  border-radius: 4px;
  font-family: 'Poppins', sans-serif; font-weight: 400;
  white-space: nowrap; text-transform: capitalize;
}
.badge-product--desktop { height: 22px; padding: 0 8px; font-size: 14px; }
.badge-product--table   { height: 20px; padding: 0 8px; font-size: 12px; }
.badge-product--mobile  { height: 18px; width: 30px; padding: 2px; justify-content: center; font-size: 0; }
```

---

## HTML patterns

```html
<!-- L — Approved (green) -->
<div class="badge badge--green badge--l">
  <img src="[check-icon]" alt="" aria-hidden="true" width="16" height="16" />
  Approved
</div>

<!-- L — Pending (amber) -->
<div class="badge badge--amber badge--l">
  <img src="[clock-icon]" alt="" aria-hidden="true" width="16" height="16" />
  Pending
</div>

<!-- L — Failed (red) -->
<div class="badge badge--red badge--l">
  <img src="[x-icon]" alt="" aria-hidden="true" width="16" height="16" />
  Failed
</div>

<!-- S — icon only (always needs aria-label) -->
<div class="badge badge--green badge--s" aria-label="Approved">
  <img src="[check-icon]" alt="" aria-hidden="true" width="16" height="16" />
</div>

<!-- Product badge — desktop -->
<div class="badge-product badge-product--desktop">
  <img src="[terminal-icon]" alt="" aria-hidden="true" width="14" height="14" />
  Terminal
</div>

<!-- Product badge — mobile icon only -->
<div class="badge-product badge-product--mobile" aria-label="Terminal">
  <img src="[terminal-icon]" alt="" aria-hidden="true" width="16" height="16" />
</div>
```

---

## Accessibility checklist

- [ ] L and M: always include visible text label — colour alone is not enough
- [ ] S (icon-only): `aria-label` on container with status name
- [ ] Icons inside badge: `aria-hidden="true"`
- [ ] Max 2 badge colour families per card/table

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Red badge — border colour = `#dc2626` | Border must be `#ff513a` (error-stroke). Text is `#dc2626` (error-fill) |
| Red badge — text colour = `#ff513a` | Text must be `#dc2626` (error-fill). Border is `#ff513a` (error-stroke) |
| "Cancelled" shown as red | Use grey — cancelled is neutral, not an error |
| "Remitting" shown as green | Use amber — remitting is in-progress |
| S size missing aria-label | Icon-only always needs `aria-label` on container |
| Mixing colours (green bg + amber border) | Use the complete colour set for one family |


---
<!-- FILE: brand/01-PHILOSOPHY.md -->

# Brand — Design Philosophy
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> The four principles behind every design decision. Read this before any other file.

---

## Who uses Live Payments

Live Payments serves business owners, drivers, and merchants — people who need to act quickly and trust what they see. The design language reflects that: **clear, confident, and calm**. Nothing flashy. Nothing vague.

---

## Four principles

### 1. Clarity over cleverness
Every screen should communicate its purpose within two seconds. If a developer has to think about what something does, so will the user.

- Labels are literal, not clever. "Settled to Bank" not "On its way!"
- Actions are verb-first. "Confirm" not "OK". "Start Shift" not "Continue".
- Status is always text + colour + icon — never colour alone.

### 2. Layered surfaces, not flat sheets
The visual language uses nested cards. Outer containers set section context, inner cards hold content, chips carry individual data points. This creates depth and groups related information naturally.

Flat single-layer layouts feel out of character. See [Cards](../core/display/CARDS.md) for the full 3-level nesting system.

### 3. Purposeful colour
Colour carries meaning. It is never decorative. If you're reaching for a colour, it must communicate something specific:

| Colour | Meaning |
|---|---|
| Purple/indigo (`#4f4ddb`) | Primary brand actions, interactive elements |
| Green | Success, settled, completed states |
| Amber | Pending, caution, in-progress states |
| Blue | Volume, counts, informational |
| Red (`#ff513a` / `#dc2626`) | Errors, destructive actions |

See [Colour System](./02-COLOUR-SYSTEM.md) for all tokens and usage rules.

### 4. Compact but breathable
Information density is medium-high. Space is used to group and separate, not to decorate.

- Padding is generous **inside** components (16px standard)
- Gap is tighter **between** related components (8px between inline elements)
- Sections breathe with 24px gaps

See [Spacing & Elevation](./04-SPACING-ELEVATION.md) for the full spacing scale.

---

## What this means in practice

| Decision point | The principle it follows |
|---|---|
| Why buttons say "Confirm" not "Submit" | Clarity over cleverness |
| Why cards nest inside cards | Layered surfaces |
| Why green only appears in success chips | Purposeful colour |
| Why there's 8px between nav items but 16px inside them | Compact but breathable |
| Why table cell text is 14/14px (tight line height) | Compact but breathable |
| Why all status chips include a text label | Clarity over cleverness |

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System) — Primary Button documentation, Section-Overview (node `27516:2822`) contains the design intent for the system.


---
<!-- FILE: brand/02-COLOUR-SYSTEM.md -->

# Brand — Colour System
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> All colour tokens and rules. Use CSS custom properties — never raw hex values in components.

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System)

---

## Brand palette

| Name | Token | Hex | Use |
|---|---|---|---|
| Brand Primary | `--color-brand-primary` | `#4f4ddb` | Primary buttons, active nav, key UI chrome |
| Brand Secondary | `--color-brand-secondary` | `#15adce` | Secondary highlights — use sparingly |
| Brand Accent | `--color-brand-accent` | `#ff513a` | Error borders/strokes only |
| Brand Tertiary | `--color-brand-tertiary` | `#fe9a0b` | Warnings, pending states |

---

## Semantic tokens

These are the tokens to use in all components. Never raw hex.

### Surface tokens

```css
/* Primary bold — for primary buttons and active states */
--semantic-primary-bold-fill:         var(--semantic-primary-bold-fill);
--semantic-primary-bold-line:         var(--semantic-primary-bold-fill);
--semantic-primary-bold-primary:      var(--semantic-primary-bold-primary);   /* text ON bold bg */

/* Primary neutral — default card/surface */
--semantic-primary-neutral-fill:      var(--semantic-primary-neutral-fill);
--semantic-primary-neutral-line:      var(--semantic-primary-neutral-line);
--semantic-primary-neutral-primary:   var(--semantic-primary-neutral-primary);
--semantic-primary-neutral-secondary: var(--semantic-primary-neutral-primary);   /* same as primary — intentional */
--semantic-primary-neutral-tertiary:  var(--text-paragraph);   /* placeholder / muted */

/* Primary lite — highlighted surfaces, hover states */
--semantic-primary-lite-fill:         var(--semantic-primary-bold-primary);
--semantic-primary-lite-line:         var(--semantic-primary-lite-line);
--semantic-primary-lite-primary:      var(--semantic-primary-lite-primary);   /* accent text, links, active labels */

/* Primary highlight — translucent tint */
--semantic-primary-highlight-fill:    rgba(242,242,255,0.25);
--semantic-primary-highlight-primary: var(--semantic-primary-lite-primary);
```

### Status tokens

```css
/* Success / Settled */
--semantic-success-lite-fill:         var(--semantic-success-lite-fill);
--semantic-success-lite-primary:      var(--semantic-success-lite-primary);

/* Caution / Pending */
--semantic-caution-lite-fill:         var(--semantic-caution-lite-fill);
--semantic-caution-lite-primary:      var(--semantic-caution-lite-primary);
--semantic-caution-bold-line:         var(--semantic-caution-bold-line);

/* Info / Count */
--semantic-blue-bold-primary:         var(--semantic-blue-bold-primary);
--semantic-blue-lite-line:            var(--semantic-blue-lite-line);
--semantic-blue-lite-primary:         var(--semantic-blue-lite-primary);
```

### Error / Destructive tokens

```css
/* TWO SEPARATE VALUES — use the correct one for the correct property */
--semantic-error-stroke:              var(--semantic-error-stroke);   /* borders and outlines ONLY */
--semantic-error-fill:                var(--semantic-error-fill);   /* text and fills ONLY */
--semantic-error-lite-fill:           var(--semantic-error-lite-fill);   /* chip/tooltip backgrounds */
```

**Rule: never swap these.** `--semantic-error-stroke` on a text colour is wrong. `--semantic-error-fill` on a border is wrong.

### Text tokens

```css
--text-header:    var(--semantic-primary-lite-primary);   /* ALL page titles, card headings, section headers */
--text-primary:   var(--semantic-primary-neutral-primary);   /* body text, labels */
--text-label:     var(--text-label);   /* sub-labels, helper text */
--text-paragraph: var(--text-paragraph);   /* instructional / descriptive copy */
--text-muted:     var(--text-muted);   /* disabled, placeholder */
```

### Overlay tokens

```css
--overlay-bold: rgba(68,72,81,0.25);    /* drawer/modal backdrop */
--overlay-lite: rgba(181,184,189,0.25); /* lighter overlay — confirmation sheets */
```

### Progress tokens

```css
--progress-track:  var(--semantic-primary-lite-line);   /* progress bar background */
--progress-fill:   var(--semantic-primary-lite-primary);   /* progress bar fill */
--progress-active: var(--progress-active);   /* active step indicator bg */
```

### Utility tokens

```css
--color-scrollbar-track: rgba(107,114,128,0.25); /* scrollbar track */
--color-scheme-border:   var(--color-scheme-border);                /* payment scheme card borders (Visa, MC etc.) */
```

---

## Colour usage rules

1. **Headers and section titles** always use `--text-header` (#3a2db8) — never black.
2. **Body copy** uses `--text-primary` (#303339).
3. **Instructional text** uses `--text-paragraph` (#535863).
4. **Sub-labels** inside cards use `--text-label` (#606672).
5. **Never** use coloured text (green, amber, blue) outside a matching semantic chip. On white backgrounds, colour is reserved for headers and links only.
6. **Status chips** use their complete semantic set — never mix (e.g. green bg with amber text). Maximum 2 chip colours per card.
7. **White text** is only used on `--semantic-primary-bold-fill` (#4f4ddb) surfaces.
8. **Error states use two distinct values:** `--semantic-error-stroke` for borders; `--semantic-error-fill` for text/fills. Never swap.

---

## Pre-verified contrast ratios (WCAG 2.1 AA)

| Foreground | Background | Ratio | Status |
|---|---|---|---|
| `#303339` | `#ffffff` | ~13:1 | ✅ AAA |
| `#3a2db8` | `#ffffff` | ~9:1 | ✅ AAA |
| `#3a2db8` | `#fafaff` | ~9:1 | ✅ AAA |
| `#fafaff` | `#4f4ddb` | ~6:1 | ✅ AA |
| `#166534` | `#f0fdf4` | ~5:1 | ✅ AA |
| `#92400e` | `#fffdf5` | ~5.5:1 | ✅ AA |
| `#075b85` | `#f0faff` | ~5:1 | ✅ AA |
| `#535863` | `#ffffff` | ~7:1 | ✅ AAA |

For any new colour combination not listed above, verify before shipping.


---
<!-- FILE: brand/03-TYPOGRAPHY.md -->

# Brand — Typography
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> Poppins type scale, 14 tokens, and hierarchy rules.

---

## Font

**Poppins** is used for all text throughout Live Payments — headings, body copy, labels, buttons, and UI elements.

No second font family. The deprecated reference to Inter for chart tooltips in early Figma files has been removed — use Poppins everywhere.

| Weight name | Weight value | Use |
|---|---|---|
| Regular | 400 | Body copy, labels, captions |
| Medium | 500 | Buttons, nav items, UI emphasis |
| SemiBold | 600 | Page titles, price displays |

```css
font-family: 'Poppins', sans-serif;
```

---

## Type scale

14 named tokens. Use these names, not arbitrary sizes.

| Token | Weight | Size | Line height | Use |
|---|---|---|---|---|
| `Heading/H4` | SemiBold 600 | 28px | normal | Page-level titles (onboarding, form steps) |
| `Heading/H6-Bold` | SemiBold 600 | 20px | normal | Key values, price displays |
| `Heading/H6-Regular` | Regular 400 | 20px | 28px | Modal and drawer headings |
| `Label/L2-500` | Medium 500 | 24px | 32px | Large metric displays |
| `Label/L3-500` | Medium 500 | 18px | 26px | Card section titles |
| `Label/L4-500` | Medium 500 | 16px | 24px | Nav items, input labels, emphasis |
| `Label/L5-500` | Medium 500 | 14px | 22px | Toggle text, chips, badge labels |
| `Label/L6-500` | Medium 500 | 12px | 20px | Timestamps, meta, small badges |
| `Label/L5-400` | Regular 400 | 14px | 22px | Standard body copy |
| `Label/L6-400` | Regular 400 | 12px | 20px | Captions, helper text |
| `Subheader/SB5` | Regular 400 | 16px | 24px | Instructional / form body copy |
| `Button/M` | Medium 500 | 16px | 24px | All medium button labels |
| `Tag/T2` | Regular 400 | 14px | 14px | Table cells, key-value list items |
| `Tag/T1` | Regular 400 | 16px | 16px | Pagination numbers |

---

## Quick reference — what to use when

| Context | Token | Size / Weight |
|---|---|---|
| Page title (onboarding, form) | `Heading/H4` | 28px SemiBold |
| Modal heading | `Heading/H6-Regular` | 20px Regular |
| Key value / price | `Heading/H6-Bold` | 20px SemiBold |
| Large metric | `Label/L2-500` | 24px Medium |
| Card section heading | `Label/L3-500` | 18px Medium |
| Nav item / input label | `Label/L4-500` | 16px Medium |
| Button label | `Button/M` | 16px Medium |
| Form body copy | `Subheader/SB5` | 16px Regular |
| Standard body / chip label | `Label/L5-400` | 14px Regular |
| Table cell content | `Tag/T2` | 14px Regular / 14px lh |
| Timestamp / caption | `Label/L6-400` | 12px Regular |
| Pagination number | `Tag/T1` | 16px Regular / 16px lh |

---

## Typography rules

1. **Card section headings** (`Label/L3-500`, 18px) always use `--text-header` (#3a2db8).
2. **Page titles** (`Heading/H4`, 28px) use `--text-header`.
3. **Body copy** uses `--text-primary`; instructional copy uses `--text-paragraph`.
4. **Line height on display tokens is "normal"** — never force a fixed line-height on H4 or H6-Bold.
5. **All text inside buttons** uses Poppins Medium regardless of button size.
6. **Table cells** use `Tag/T2` (14/14px) — the tight line height is intentional, not an error.
7. **Colour on headings:** card headings are `--text-header`; page background headings may use `--text-primary` if they are section labels, not titles.


---
<!-- FILE: brand/04-SPACING-ELEVATION.md -->

# Brand — Spacing & Elevation
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> 4px spacing scale, radius scale, and the elevation model.

---

## Spacing scale

4px-based system. Use these tokens — never arbitrary values.

| Token | Value | Use |
|---|---|---|
| `--space-6xs` | 2px | Micro gaps — icon to label inside badges |
| `--space-5xs` | 4px | Tight gaps — inner badge padding |
| `--space-4xs` | 6px | Component gaps — inside buttons, chips |
| `--space-3xs` | 8px | Standard gap between inline elements |
| `--space-2xs` | 10px | Button vertical padding (small variant) |
| `--space-xs` | 12px | Chip padding, input vertical padding |
| `--space-m` | 16px | Standard padding — cards, inputs, nav |
| `--space-l` | 24px | Section padding, between major blocks |
| `--space-xl` | 32px | Modal padding, large section gaps |

### Quick spacing decisions

| Context | Token | Value |
|---|---|---|
| Icon to label in a badge | `--space-6xs` | 2px |
| Gap inside a button or chip | `--space-4xs` | 6px |
| Gap between inline elements | `--space-3xs` | 8px |
| Padding inside a card or input | `--space-m` | 16px |
| Gap between cards in a stack | `--space-m` | 16px |
| Section padding | `--space-l` | 24px |
| Modal/panel padding | `--space-xl` | 32px |

---

## Radius scale

| Token | Value | Use |
|---|---|---|
| `--radius-5xs` | 4px | Badge inner, small chips |
| `--radius-4xs` | 6px | Progress step indicators |
| `--radius-3xs` | 8px | Small buttons (S variant) |
| `--radius-xs` | 12px | Medium buttons, inputs, pagination buttons |
| `--radius-m` | 16px | Cards, modals, drawers |
| `--radius-2xl` | 32px | Table containers, wide rounded elements |

For **circles** (avatars, FABs): use `border-radius: 50%` — not a fixed px value.

### Card nesting radius rule

When cards nest inside other cards, both outer and inner use the **same radius**. This creates a continuous rounded appearance — the inner card looks "set into" the outer one.

```
Outer card  28px → Inner card 28px  ✓  continuous look
Outer card  16px → Inner card 16px  ✓  standard matching
Outer card  16px → Chip 16px        ✓  natural fit
Outer card  28px → Chip 8px         ✗  too abrupt — chip looks displaced
Inner card  > outer card radius     ✗  breaks visual containment
```

---

## Elevation model

The system uses **borders + nested surfaces** — not drop shadows — for elevation. This creates a clean, accessible appearance.

| Level | Description | Background | Border |
|---|---|---|---|
| 0 | Page background | Light grey or white | None |
| 1 — Standard section | Outer feature container | `--semantic-primary-lite-fill` `#fafaff` | `--semantic-primary-lite-line` `#d4d5f7` |
| 1 — Hero section | Priority/headline section | `--semantic-primary-bold-fill` `#4f4ddb` | same |
| 2 | Body card (content container) | `--semantic-primary-neutral-fill` `#ffffff` | `--semantic-primary-neutral-line` `#d1d2d5` |
| 3 | Chip / metric block | Semantic colour fill | Matching semantic border |

**Shadow** is used **only** for the interactive focus/active ring:

```css
box-shadow: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line);
/* CSS token: var(--focus-ring) */
```

**Background tints** for Level 1 section containers:
- Standard: `#fafaff` — near-white with a subtle purple tint
- Translucent: `rgba(242,242,255,0.25)` — floating/overlapping sections


---
<!-- FILE: brand/05-ICONS.md -->

# Brand — Icons
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> Icon sizing, weight system, and usage rules.

---

## Icon sizes

5-tier scale. Use the correct size for the context — never arbitrary sizes.

| Name | Token | Size | Use |
|---|---|---|---|
| Micro | `--icon-micro` | 12px | Badge labels, inline with very small text (10–12px) |
| Small | `--icon-small` | 14px | Inline labels, secondary indicators |
| Standard | `--icon-standard` | 16px | Nav items, row indicators, most UI contexts |
| Large | `--icon-large` | 24px | Buttons, card headers, list items |
| FAB | `--icon-fab` | 34px | Navigation FAB containers |

> **Note:** Small icons are 14px. An earlier version of this doc listed 16px — this was incorrect. 16px is the Standard size. 14px is Small.

---

## Icon weights

| Token | Value | Use |
|---|---|---|
| `--icon-weight-xs` | 0.75px | Delicate contexts — light UI, passive indicators |
| `--icon-weight-s` | 1px | Default — most contexts |
| `--icon-weight-m` | 1.25px | Prominent contexts — active states, hero elements |

---

## Common icon contexts

| Context | Size | Weight |
|---|---|---|
| Desktop sidebar nav (collapsed) | 24px | `--icon-weight-s` |
| Mobile bottom nav | 24px | `--icon-weight-s` |
| Card section header | 24px | `--icon-weight-s` |
| Button with icon (M size) | 20px | `--icon-weight-s` |
| Table row action (FAB) | 16px | `--icon-weight-s` |
| Status chip info icon | 12px | `--icon-weight-xs` |

---

## Icon usage rules

1. Icons within the same navigation component use the same weight.
2. Icons paired with text use `--icon-weight-s` (1px).
3. **Never** use an icon as the sole indicator of status — always pair with a label or colour.
4. Icon-only buttons **require** an `aria-label` attribute.
5. All decorative icons use `alt=""` and `aria-hidden="true"`.


---
<!-- FILE: brand/06-MOTION.md -->

# Brand — Motion & Interaction
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> Animation tokens, easing, focus ring, and what not to animate.

---

## Duration tokens

| Token | Value | Use |
|---|---|---|
| `--motion-hover` | 100ms | Button hover, subtle state changes |
| `--motion-default` | 150ms | Dropdowns, tooltips, small reveals |
| `--motion-medium` | 200ms | Sidebar expand/collapse |
| `--motion-modal` | 250ms | Modals, bottom sheets, drawers |

---

## Easing

| Direction | CSS value | Token |
|---|---|---|
| Entering (appearing, expanding) | `ease-out` | `--motion-easing-out` |
| Leaving (disappearing, collapsing) | `ease-in` | `--motion-easing-in` |

Elements that enter decelerate into position. Elements that leave accelerate away. This mirrors physical behaviour.

---

## Per-component motion

| Component | Duration | Easing | Behaviour |
|---|---|---|---|
| Button hover | 100ms | ease-out | Background colour shift only — no scale or translateY |
| Dropdown open | 150ms | ease-out | Scale + fade from top edge of trigger |
| Dropdown close | 150ms | ease-in | Reverse |
| Sidebar expand | 200ms | ease-out | Width 80px → 260px, labels fade in |
| Sidebar collapse | 200ms | ease-in | Width 260px → 80px, labels fade out |
| Modal open | 250ms | ease-out | Fade backdrop simultaneously with modal sliding in |
| Bottom sheet open | 250ms | ease-out | Slide up from bottom, backdrop fades in |
| Bottom sheet close | 200ms | ease-in | Slide down, backdrop fades out |
| Drawer open | 250ms | ease-out | Slide in from right, backdrop fades in |

---

## What not to animate

- Layout shifts (changing column count, reflowing content)
- Table row changes unless they are additions or removals
- Anything purely decorative with no communicative purpose
- Page transitions — this product does not use page-level animation

---

## Focus ring

The universal interactive focus state, applied to all focusable elements.

```css
box-shadow: var(--focus-ring);

/* Defined as: */
--focus-ring: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px var(--semantic-primary-lite-line);
```

| Layer | Value | Purpose |
|---|---|---|
| Inner ring | `0 0 0 1px #d4d5f7` | Sharp definition at element edge |
| Outer glow | `0 0 0 4px rgba(104,106,226,0.25)` | Soft brand-coloured halo |

**Apply to:**
- All buttons on `:focus-visible`
- All inputs on `:focus`
- All navigation items on `:focus-visible`
- Pagination buttons on `:focus-visible`
- Active/selected pagination button (persistent)

**Use `:focus-visible`** (not `:focus`) for buttons and links to avoid showing the ring on mouse click.
**Use `:focus`** for inputs where the ring should always appear.


---
<!-- FILE: brand/07-VOICE-AND-COPY.md -->

# Brand — Voice, Tone & Copy
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> How Live Payments sounds across all products and touchpoints — for developers writing UI copy, designers creating content, and anyone producing on-brand communications.

---

## Brand voice

Live Payments serves business owners and drivers who move fast and need to trust what they see. The brand voice is:

**Clear** — Say the thing directly. No jargon, no clever metaphors. If a user has to think about what a message means, the message is wrong.

**Confident** — Short sentences. Active verbs. Tell people what to do, not what might happen.

**Calm** — Especially in errors and warnings. Panic is not useful. Information is.

---

## Tone by context

| Context | Tone | Example |
|---|---|---|
| Success states | Warm, brief | "Payment sent." not "Your payment was processed successfully!" |
| Errors | Direct, blame-free | "We couldn't connect. Check your network and try again." |
| Empty states | Helpful, not apologetic | "No transactions yet. Once you make a payment, it'll appear here." |
| Warnings / pending | Matter-of-fact | "Settlement pending — usually clears by end of business." |
| Onboarding | Encouraging, step-by-step | "Let's verify your business. This takes about 2 minutes." |
| Confirmations | Action-specific | "Confirm your business details before continuing." |

---

## Copy patterns by element

### Headings
Sentence case. Describe the content, not the action.
- ✓ "Bill history" · "Business details" · "Today's summary"
- ✗ "View Your Bill History" · "Manage Your Business Details"

### Button labels
Verb-first. Specific. 1–3 words.
- ✓ "Confirm" · "Block Card" · "Start Shift" · "View all"
- ✗ "OK" · "Submit" · "Click here" · "Continue"

### Status labels
Noun or past-tense verb. Match the badge colour.
- ✓ "Approved" · "Pending" · "Sent" · "Settled" · "Declined"
- ✗ "Transaction Approved" · "Your payment is pending"

### Form labels
Noun only. No verbs or question marks.
- ✓ "ABN" · "Business name" · "Mobile number"
- ✗ "Enter your ABN" · "What is your business name?"

### Placeholders
Describe format, not the label (label already does that).
- ✓ "11 digits, no spaces" · "e.g. Jane Smith"
- ✗ "Enter your ABN" · "Type your name here"

### Validation and error messages
Say what's wrong, then what to do.
- ✓ "ABN must be 11 digits — remove spaces and try again."
- ✗ "Invalid ABN." · "Error: please check your input."

### Empty states
Tell users what the space is for. Offer a next step where relevant.
- ✓ "No transactions yet. Your history will appear here once you make a payment."
- ✗ "Nothing to show." · "No data available."

### Confirmation dialogs
Restate what's about to happen. Make the action button specific.
- ✓ Heading: "Block this card?" · Button: "Block Card"
- ✗ Heading: "Are you sure?" · Button: "Yes"

### Navigation labels
1–2 words. Noun. Match the destination, not the action.
- ✓ "Home" · "History" · "Wallet" · "Pay Bill" · "My Payees"
- ✗ "Go Home" · "View History" · "Click to Pay"

---

## Formatting rules

**Currency** — Symbol, amount, two decimal places, no space: `$1,200.00` · `$0.50`

**Dates** — `14 Nov 2023` (no ordinals, abbreviated month). In tables: date only on divider rows.

**Times** — `8:23 PM` (no leading zero, space before AM/PM)

**Capitalisation** — Sentence case everywhere. Proper nouns only for product names: Live Bill Pay, Live Tap, DX.

**Ampersand (&)** — Only in product names and UI where space is constrained. Not in body copy.

**Ellipsis (…)** — For truncated text only. Not as a loading indicator ("Loading…" → use a spinner instead).


---
<!-- FILE: brand/08-ACCESSIBILITY.md -->

# Brand — Accessibility
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> WCAG 2.1 AA is the minimum standard for all Live Payments products. These requirements are non-negotiable.

---

## Core requirements

| Requirement | Standard | Live Payments rule |
|---|---|---|
| Text contrast | AA: 4.5:1 | All text on all backgrounds — verified in `brand/02-COLOUR-SYSTEM.md` |
| UI component contrast | 3:1 | Borders, focus rings, icons against their background |
| Touch target size | 44×44px | All interactive elements — buttons, nav items, table actions |
| Focus indicator | Visible | `var(--focus-ring)` on all focusable elements — never `outline: none` without replacement |
| Keyboard navigation | Full | Every interactive element reachable and operable by keyboard |
| Screen reader | Semantic HTML | Native elements preferred over ARIA workarounds |

---

## Focus ring

Apply to every focusable element:
```css
:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  /* = 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px #d4d5f7 */
}
```

Use `:focus-visible` on buttons and links (hides ring on mouse click).
Use `:focus` on inputs (ring always shows when field is active).

---

## ARIA patterns by component

### Buttons
```html
<!-- Standard -->
<button type="button">Confirm</button>

<!-- Icon-only — always needs aria-label -->
<button type="button" aria-label="Filter results">
  <img src="[icon]" alt="" aria-hidden="true" />
</button>

<!-- Disabled — stays keyboard-focusable -->
<button type="button" aria-disabled="true">Submit</button>
```

### Forms
```html
<label for="abn">ABN</label>
<input id="abn" type="text"
  aria-required="true"
  aria-invalid="true"          <!-- only set when error exists -->
  aria-describedby="abn-error" />
<div id="abn-error" role="alert">
  ABN must be 11 digits
</div>
```

### Navigation
```html
<nav aria-label="Main navigation">
  <a href="/home" aria-current="page">Home</a>  <!-- active link -->
  <a href="/wallet">Wallet</a>
</nav>
```

### Modals
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Block this card?</h2>
  <!-- content -->
</div>
```

### Tables
```html
<table aria-label="Transaction history">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Amount</th>
      <th scope="col"><span class="sr-only">Actions</span></th>
    </tr>
  </thead>
</table>
```

### Status badges
Status is always communicated by text + colour + icon — never colour alone.
```html
<!-- Correct -->
<div class="badge badge--green" aria-label="Approved">
  <img src="[check]" alt="" aria-hidden="true" />
  Approved
</div>

<!-- Icon-only (S size) — needs aria-label -->
<div class="badge badge--green badge--s" aria-label="Approved"></div>
```

### Toasts / live regions
```html
<!-- Errors — immediate announcement -->
<div role="alert" aria-live="assertive" aria-atomic="true">
  We couldn't process that payment. Try again.
</div>

<!-- Success / info — polite announcement -->
<div role="status" aria-live="polite" aria-atomic="true">
  Payment sent successfully.
</div>
```

---

## Screen reader hidden class
```css
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
```

---

## Pre-verified contrast ratios

| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| `#303339` on `#ffffff` | Body text | ~13:1 | ✅ AAA |
| `#3a2db8` on `#ffffff` | Headers | ~9:1 | ✅ AAA |
| `#fafaff` on `#4f4ddb` | Primary button | ~6:1 | ✅ AA |
| `#166534` on `#f0fdf4` | Success badge | ~5:1 | ✅ AA |
| `#92400e` on `#fffdf5` | Caution badge | ~5.5:1 | ✅ AA |
| `#075b85` on `#f0faff` | Info badge | ~5:1 | ✅ AA |
| `#dc2626` on `#fef9f9` | Error text | ~5.5:1 | ✅ AA |


---
<!-- FILE: core/TOKENS.md -->

# Core — Tokens Reference
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> Complete CSS custom properties. Paste the `:root` block into your project stylesheet. All token names used throughout this documentation map to these variables.

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System)

---

## Quick reference

| I need… | Token | Value |
|---|---|---|
| Primary button bg | `--semantic-primary-bold-fill` | `#4f4ddb` |
| Page/card headings | `--text-header` | `#3a2db8` |
| Body text | `--text-primary` | `#303339` |
| Card background | `--semantic-primary-neutral-fill` | `#ffffff` |
| Card border | `--semantic-primary-neutral-line` | `#d1d2d5` |
| Hover surface | `--semantic-primary-lite-fill` | `#fafaff` |
| Error border | `--semantic-error-stroke` | `#ff513a` |
| Error text | `--semantic-error-fill` | `#dc2626` |
| Focus ring | `--focus-ring` | See below |

---

## Complete `:root` block

```css
:root {
  /* Brand palette */
  --color-brand-primary:   #4f4ddb;
  --color-brand-secondary: #15adce;
  --color-brand-accent:    #ff513a;
  --color-brand-tertiary:  #fe9a0b;

  /* Surfaces — bold (purple) */
  --semantic-primary-bold-fill:    #4f4ddb;
  --semantic-primary-bold-line:    #4f4ddb;
  --semantic-primary-bold-primary: #fafaff;

  /* Surfaces — neutral (white/default) */
  --semantic-primary-neutral-fill:      #ffffff;
  --semantic-primary-neutral-line:      #d1d2d5;
  --semantic-primary-neutral-primary:   #303339;
  --semantic-primary-neutral-secondary: #303339;
  --semantic-primary-neutral-tertiary:  #535863;

  /* Surfaces — lite (tinted) */
  --semantic-primary-lite-fill:    #fafaff;
  --semantic-primary-lite-line:    #d4d5f7;
  --semantic-primary-lite-primary: #3a2db8;

  /* Surfaces — highlight (translucent) */
  --semantic-primary-highlight-fill:    rgba(242,242,255,0.25);
  --semantic-primary-highlight-primary: #3a2db8;

  /* Status — success */
  --semantic-success-lite-fill:    #f0fdf4;
  --semantic-success-lite-primary: #166534;

  /* Status — caution */
  --semantic-caution-lite-fill:    #fffdf5;
  --semantic-caution-lite-primary: #92400e;
  --semantic-caution-bold-line:    #f59e0b;

  /* Status — info/blue */
  --semantic-blue-bold-primary: #f0faff;
  --semantic-blue-lite-line:    #0ea0e9;
  --semantic-blue-lite-primary: #075b85;

  /* Error — two separate tokens, different uses */
  --semantic-error-stroke:    #ff513a;   /* borders ONLY */
  --semantic-error-fill:      #dc2626;   /* text / fills ONLY */
  --semantic-error-lite-fill: #fef9f9;

  /* Text */
  --text-header:    #3a2db8;
  --text-primary:   #303339;
  --text-label:     #606672;
  --text-paragraph: #535863;
  --text-muted:     #9599a2;

  /* Overlays */
  --overlay-bold: rgba(68,72,81,0.25);
  --overlay-lite: rgba(181,184,189,0.25);

  /* Progress */
  --progress-track:  #d4d5f7;
  --progress-fill:   #3a2db8;
  --progress-active: #686ae2;

  /* Utility */
  --main-primary-neutral-fill-l1: #ffffff;
  --main-primary-neutral-fill-l2: #f9f9f9;
  --main-primary-neutral-line:    #d1d2d5;
  --main-utility-text-neutral-label: #606672;
  --main-error-bold-fill:         #ef4444;
  --color-scheme-border:          #e9eaeb;

  /* Spacing */
  --space-6xs: 2px;  --space-5xs: 4px;  --space-4xs: 6px;
  --space-3xs: 8px;  --space-2xs: 10px; --space-xs:  12px;
  --space-m:   16px; --space-l:   24px; --space-xl:  32px;

  /* Radius */
  --radius-5xs: 4px;  --radius-4xs: 6px;  --radius-3xs: 8px;
  --radius-xs:  12px; --radius-m:   16px; --radius-2xl: 32px;
  /* Circles: border-radius: 50% */

  /* Icons */
  --icon-micro:    12px;  --icon-small:    14px;
  --icon-standard: 16px;  --icon-large:    24px;

  /* Button padding */
  --btn-padding-s-v: 8px;   --btn-padding-s-h: 16px;
  --btn-padding-m-v: 12px;  --btn-padding-m-h: 20px;
  --btn-padding-l-v: 16px;  --btn-padding-l-h: 24px;
  --btn-gap-s: 6px;  --btn-gap-m: 8px;  --btn-gap-l: 10px;

  /* Table */
  --table-cell-min-width: 200px;
  --table-cell-max-width: 256px;

  /* Motion */
  --motion-hover:  100ms;  --motion-default: 150ms;
  --motion-medium: 200ms;  --motion-modal:   250ms;
  --motion-easing-out: ease-out;
  --motion-easing-in:  ease-in;

  /* Focus ring */
  --focus-ring: 0 0 0 4px rgba(104,106,226,0.25), 0 0 0 1px #d4d5f7;

  /* Aliases — legacy names from Figma raw output */
  --round-5xs: 4px;    --round-2xl: 32px;   --round-m: 16px;
  --main-round-default: 12px;
  --semantic-industry-primary-neutral-fill: #ffffff;
  --semantic-industry-primary-neutral-line: #d1d2d5;
}
```

---

## Component status

| Component | Status |
|---|---|
| All buttons (Primary, Secondary, Link, FAB) | ✅ |
| Inputs, Dropdown, Search, Progress Bar, Keypad | ✅ |
| Cards (3-level nesting) | ✅ |
| Status Badges (40+ types) + Product Badges | ✅ |
| Header Section (13 variants) | ✅ |
| Avatar | ✅ |
| Toasters (18 types) | ✅ |
| Tooltips (12 variants) | ✅ |
| Modal + Bottom sheet | ✅ |
| Tables (6 types) + Pagination + Empty states | ✅ |
| Side Navigation + Mobile Nav | ✅ |
| Toggle / Segmented control | ⚠️ In Figma, docs pending |
| Charts | ⚠️ In Figma, docs pending |
| Alert / Banner | ❌ Not designed |
| Date picker | ❌ Not designed |
| File upload | ❌ Not designed |
| Breadcrumb | ❌ Not designed |

See `CLAUDE.md` for the task-routing table.


---
<!-- FILE: core/LAYOUT.md -->

# Core — Layout System
**Live Payments Design System** · v1.1 · [← Index](../00-INDEX.md)

> Breakpoints, page anatomy, and grid rules for every viewport size.

---

## Breakpoints

| Name | Width | Page margins | Navigation |
|---|---|---|---|
| Mobile XS | 320px | 12px | Bottom nav, full-width content |
| Mobile S | 360px | 16px | Bottom nav |
| Mobile M | 393px | 26px | Bottom nav |
| Tablet | 660px | 24px | Top bar only, no sidebar |
| Desktop S | 1200px | 24px | 80px collapsed sidebar |
| Desktop L | 1536px | 24px | 80px collapsed or 260px expanded sidebar |

---

## Desktop page anatomy

```
┌────────────────────────────────────────────────────┐
│  Sidebar (80px collapsed / 260px expanded)         │
│  ┌──────────────────────────────────────────────┐  │
│  │  Logo zone (80×80px)                         │  │
│  │  Nav items (54px each)                       │  │
│  │  Dividers between groups (8px)               │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  Main area (fills remaining width)                 │
│  ┌──────────────────────────────────────────────┐  │
│  │  Top bar (80px, 1px bottom border)           │  │
│  │  Title line (72px, optional)                 │  │
│  │  ──────────────────────────────────────────  │  │
│  │  Content area                                │  │
│  │  Padding: 24px all sides                     │  │
│  │  Scrollable                                  │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

---

## Mobile page anatomy

```
┌───────────────────────┐
│  Status bar (36px)    │
│  App bar (56–64px)    │
│  ─────────────────    │
│  Content area         │
│  (scrollable)         │
│  Margins: 16–26px     │
│  ─────────────────    │
│  Bottom nav (92px)    │
│  fixed to bottom      │
└───────────────────────┘
```

---

## Onboarding / form flow anatomy

Used for multi-step flows (business setup, identity verification, bill payments). Different structure from the standard dashboard layout.

```
┌────────────────────────────────────────────────────┐
│  Brand nav bar (80px)                              │
│  Logo centred, close icon top-right                │
│  1px bottom border                                 │
│                                                    │
│  ┌──────────────────────────────────────────────┐  │
│  │  Centred module (max-width 760px, auto margin)│  │
│  │                                              │  │
│  │  Page header + progress bar  (130–154px)     │  │
│  │  ──────────────────────────────────────────  │  │
│  │  Card stack (gap: 16px)                      │  │
│  │    [Card]                                    │  │
│  │    [Card]                                    │  │
│  │  ──────────────────────────────────────────  │  │
│  │  Action strip (Back/Next or Cancel/OK)       │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

**Form flow specifics:**
- Module column: `max-width: 760px`, centred with `margin: auto`
- Bottom padding on module: 64px (`--space-xl` × 2) — keeps action strip clear of viewport edge
- Card stack gap: 16px (`--space-m`)
- Action strip always sits below the last card, not fixed to viewport

---

## Grid principles

**Desktop content grid:**
- Sidebar takes a fixed width (80px or 260px); main area fills the remainder with `flex: 1`
- Content area padding: 24px (`--space-l`) on all sides
- Cards inside content areas use `display: flex` or `display: grid` with `gap: 24px`
- Two-column layouts use equal halves: `grid-template-columns: 1fr 1fr`

**Multi-column rules:**
- Two columns: 24px gap, equal width
- Three columns or more: 16px gap, equal width
- Cards in a row should be equal height — use `align-items: stretch`

**Responsive collapse:**
- All multi-column layouts collapse to single column at Tablet (660px) and below
- Exception: the USP/feature card horizontal scroll — cards scroll horizontally on mobile rather than stacking
- Tables do not reflow — they become horizontally scrollable with a sticky first column

**Content max-widths:**
- Form/onboarding module: 760px
- Modal dialogs: 640px maximum, 498px typical
- Full-width content panels have no max-width constraint within the main area


---
<!-- FILE: core/buttons/PRIMARY-BUTTON.md -->

# Primary Button
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Buttons SKILL](../../skills/SKILL-BUTTONS.md)

> The highest-emphasis action element. Uses solid brand-purple fill to draw attention. Communicates the main action a user should take — "Confirm", "Save", "Done", "Submit".

---

## Figma source
[Core Design System — Primary Button](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=17845-61780&m=dev)

Component: `🟢-Primary-Button-CP` · Node: `17845:61780`

---

## Overview

The Primary Button is the highest-emphasis action element in the Live Payments design system. It uses a solid brand-purple fill to draw attention and communicates the main action a user should take. Available in 3 sizes: Small (34px), Medium (46px, default), and Large (56px).

**When to use:** The single most important action on a screen or within a card. Only one per distinct action area.

---

## Real product examples

| Product | Context | Pattern |
|---|---|---|
| Live Bill Pay | Review & Confirm flow | Primary "Confirm" at bottom of multi-step onboarding, paired with secondary "Back" |
| Portal | Business Verification Dialog | Primary "Confirm" in modal dialogs, paired with "Cancel" for safe dismissal |
| DX | Mobile Form Submission | Full-width "Save" pinned to bottom of mobile screen |
| Live Tap | Completion & Error States | Full-width "Done" or "Okay" at viewport bottom as single clear action |

---

## Anatomy

6 structural parts:

| # | Part | Description |
|---|---|---|
| 1 | Container | Solid purple fill (`--semantic-primary-bold-fill`) with 8px corner radius. Provides visual weight distinguishing primary from other button types. |
| 2 | Label | Action text in white (`--semantic-primary-bold-primary`), Poppins Medium. Verb-first: "Confirm", "Save", "Submit". |
| 3 | Leading icon | Optional — 20px at M size. Reinforces meaning: checkmark for "Confirm", plus for add actions. |
| 4 | Trailing icon | Optional — same size rules. Common for directional cues like arrows. |
| 5 | Stroke | 1px border in `--semantic-primary-bold-line`. Adds definition at small sizes and on coloured backgrounds. |
| 6 | State layer | Semi-transparent overlay: 8% on hover, 12% on focus, 16% on press. |

---

## Sizes

| Size | Height | Padding H | Padding V | Font size | Icon size | Gap | Context |
|---|---|---|---|---|---|---|---|
| Small (S) | 34px | 16px (`--btn-padding-s-h`) | 8px (`--btn-padding-s-v`) | 14px | 16px | 6px | Inside cards, list items, table rows, tight layouts |
| Medium (M) — default | 46px | 20px (`--btn-padding-m-h`) | 12px (`--btn-padding-m-v`) | 14px | 20px | 8px | Forms, modals, onboarding flows, standalone CTAs |
| Large (L) | 56px | 24px (`--btn-padding-l-h`) | 16px (`--btn-padding-l-v`) | 16px | 24px | 10px | Full-width mobile patterns, prominent hero actions |

**With right icon:** reduce horizontal padding to 12px (`--btn-padding-icon-h`) for visual balance.

---

## States

| State | Visual | CSS |
|---|---|---|
| Enabled | Full purple fill. Ready for interaction. | `background: var(--semantic-primary-bold-fill)` |
| Active / Hover | Subtle overlay provides feedback. | `+ state layer 8% opacity overlay` |
| Selected / Focused | Focus ring visible. | `box-shadow: var(--focus-ring)` |
| Disabled | 50% opacity, no pointer events. | `opacity: 0.5; pointer-events: none; aria-disabled: true` |

---

## Icon variants

| Variant | Use |
|---|---|
| No icon (default) | Straightforward actions: "Confirm", "Save" |
| Left icon | Actions with reinforcing icons: checkmark, plus, download |
| Right icon | Navigation direction: arrow right, external link |
| Both icons | Compound actions — use sparingly |

---

## Implementation

```html
<!-- Medium, no icon (default) -->
<button type="button" class="btn-primary btn-primary--m">
  Confirm
</button>

<!-- Large, full-width mobile -->
<button type="button" class="btn-primary btn-primary--l btn-primary--full">
  Save
</button>

<!-- Medium, left icon -->
<button type="button" class="btn-primary btn-primary--m btn-primary--icon-left">
  <img src="[check-icon]" alt="" aria-hidden="true" />
  Confirm
</button>

<!-- Disabled state -->
<button type="button" class="btn-primary btn-primary--m" aria-disabled="true">
  Submit
</button>
```

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  background: var(--semantic-primary-bold-fill);
  border: 1px solid var(--semantic-primary-bold-line);
  color: var(--semantic-primary-bold-primary);
  border-radius: var(--radius-3xs);   /* 8px */
  cursor: pointer;
  white-space: nowrap;
  text-transform: capitalize;
  transition: background var(--motion-hover) var(--motion-easing-out);
}

/* Sizes */
.btn-primary--s {
  height: 34px;
  padding: var(--btn-padding-s-v) var(--btn-padding-s-h);   /* 8px 16px */
  font-size: 14px;
  gap: var(--btn-gap-s);   /* 6px */
  border-radius: var(--radius-3xs);   /* 8px */
}
.btn-primary--m {
  height: 46px;
  padding: var(--btn-padding-m-v) var(--btn-padding-m-h);   /* 12px 20px */
  font-size: 14px;
  gap: var(--btn-gap-m);   /* 8px */
  border-radius: var(--radius-xs);   /* 12px */
}
.btn-primary--l {
  height: 56px;
  padding: var(--btn-padding-l-v) var(--btn-padding-l-h);   /* 16px 24px */
  font-size: 16px;
  gap: var(--btn-gap-l);   /* 10px */
  border-radius: var(--radius-xs);   /* 12px */
}

/* Full-width (mobile) */
.btn-primary--full { width: 100%; }

/* States */
.btn-primary:hover { opacity: 0.92; }
.btn-primary:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.btn-primary[aria-disabled="true"] { opacity: 0.5; pointer-events: none; }
```

---

## Action strip pattern

When two buttons appear together (Back/Next, Cancel/Confirm):
- **Secondary always left, Primary always right**
- Gap: `--space-xs` (12px) between buttons
- Desktop: left-aligned as a group within the container
- Mobile: Primary on top, Secondary below (full-width stacked)

---

## Dos and don'ts

| ✓ Do | ✗ Don't |
|---|---|
| Use verb-first labels: "Confirm", "Save", "Start Shift" | Use vague labels: "OK", "Submit", "Continue" |
| One primary per action area | Stack multiple primary buttons together |
| Pair with secondary for reversible flows | Use for purely informational actions ("Learn More") |
| Use full-width on mobile screens (DX, Live Tap pattern) | Use for critical destructive actions (use red/destructive variant) |
| Place rightmost in horizontal button groups | Place primary before secondary in reading order |

---

## Accessibility

**Keyboard:**
- `Tab` / `Shift+Tab`: moves focus to/from button in logical tab order
- `Enter` / `Space`: activates the button
- Focus ring visible on `:focus-visible` — never suppressed with `outline: none`

**Screen reader:**
- Use native `<button>` element or `role="button"` with `tabindex="0"`
- Label text serves as accessible name
- Icon-only buttons need `aria-label`
- Disabled state uses `aria-disabled="true"` (not `disabled` attribute) to remain focusable

**Colour & contrast:**
- White (`#fafaff`) on purple (`#4f4ddb`) = ~6:1 — exceeds WCAG AA (4.5:1)
- Button boundary against background exceeds 3:1 per WCAG 1.4.11

**Touch targets:**
- All sizes meet 44×44px minimum (WCAG 2.5.5)
- Small (34px height): hit area extends to 44px via transparent padding
- Full-width mobile buttons naturally exceed this


---
<!-- FILE: core/buttons/SECONDARY-BUTTON.md -->

# Secondary Button
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Buttons SKILL](../../skills/SKILL-BUTTONS.md)

> Medium-emphasis action. White fill with neutral border. Always appears alongside a Primary Button as an alternative path — "Cancel", "Back", "Close", "Print Merchant Receipt".

---

## Figma source
[Core Design System — Secondary Button](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=17845-62166&m=dev)

Component: `🟢-Secondary-Button-CP` · Node: `17845:62166`

---

## Overview

The Secondary Button provides a safe alternative path alongside the Primary action. It never appears alone — it always has a Primary Button to pair with. Sizes always match the paired Primary Button.

---

## Real product examples

| Product | Context | Pattern |
|---|---|---|
| Live Bill Pay | Business Confirmation Dialog | Secondary "Cancel" left of Primary "Confirm". Dismisses without locking details. |
| Live Bill Pay | Multi-step onboarding | Secondary "Back" left of Primary "Next". Returns to previous step. |
| DX | Receipt Options Bottom Sheet | Primary "Print Customer Receipt" + two Secondaries: "Print Merchant Receipt" + "Close" |
| Live Tap | Block/Unblock Card | Primary "Block Card" stacked above Secondary "Cancel" — full-width mobile |

---

## Anatomy

Same 6-part structure as Primary, with fill and border swapped:

| # | Part | Description |
|---|---|---|
| 1 | Container | White fill (`#ffffff`) with 8px corner radius. Visually recedes behind the purple Primary. |
| 2 | Label | Dark text (`--semantic-primary-neutral-primary`), Poppins Medium. "Cancel", "Back", "Close". |
| 3 | Leading icon | Optional — back arrow (←) for step navigation. |
| 4 | Trailing icon | Optional — expand/collapse, external link. |
| 5 | Stroke | 1px neutral gray border (`--semantic-primary-neutral-line`). Key differentiator from ghost button (no border). |
| 6 | State layer | 8% hover, 12% focus, 16% press — doesn't compete with Primary's purple. |

---

## Sizes

Sizes match Primary exactly. Always use the same size as the paired Primary Button.

| Size | Height | Padding H | Padding V | Font size | Icon size | Gap |
|---|---|---|---|---|---|---|
| Small (S) | 34px | 16px | 8px | 14px | 16px | 6px |
| Medium (M) — default | 46px | 20px | 12px | 14px | 20px | 8px |
| Large (L) | 56px | 24px | 16px | 16px | 24px | 10px |

---

## States

| State | Visual |
|---|---|
| Enabled | White fill, neutral border. Ready alongside its Primary pair. |
| Active / Hover | Subtle gray overlay — doesn't compete with Primary's purple. |
| Selected / Focused | Focus ring visible. |
| Disabled | 50% opacity — used when secondary path is unavailable (e.g. can't go "Back" on step 1). |

---

## Layout patterns

**Desktop (horizontal):** Secondary left, Primary right. Reading order guides the eye to the primary action.

**Mobile (vertical stack):** Primary on top, Secondary below. Both full-width.

| Pattern | Context | Example |
|---|---|---|
| Horizontal pair | Desktop dialogs, form steppers | `[Cancel]  [Confirm]` |
| Vertical stack (Primary top) | Mobile full-screen | `[Block Card]` ↑ `[Cancel]` |
| Multiple Secondaries | Option sets below one Primary | Print receipt options: Primary + 2 Secondaries |

---

## Implementation

```html
<!-- Medium, no icon (default) -->
<button type="button" class="btn-secondary btn-secondary--m">
  Cancel
</button>

<!-- Action strip — desktop horizontal pair -->
<div class="action-strip">
  <button type="button" class="btn-secondary btn-secondary--m">Back</button>
  <button type="button" class="btn-primary btn-primary--m">Confirm</button>
</div>

<!-- Mobile stacked pair -->
<div class="action-stack">
  <button type="button" class="btn-primary btn-primary--l btn-primary--full">Block Card</button>
  <button type="button" class="btn-secondary btn-secondary--l btn-secondary--full">Cancel</button>
</div>
```

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  background: var(--semantic-primary-neutral-fill);   /* white */
  border: 1px solid var(--semantic-primary-neutral-line);   /* var(--semantic-primary-neutral-line) */
  color: var(--semantic-primary-neutral-primary);   /* var(--semantic-primary-neutral-primary) */
  border-radius: var(--radius-3xs);   /* 8px */
  cursor: pointer;
  white-space: nowrap;
  text-transform: capitalize;
  transition: background var(--motion-hover) var(--motion-easing-out),
              border-color var(--motion-hover) var(--motion-easing-out);
}

/* Sizes — identical to primary */
.btn-secondary--s {
  height: 34px;
  padding: var(--btn-padding-s-v) var(--btn-padding-s-h);
  font-size: 14px;
  gap: var(--btn-gap-s);
  border-radius: var(--radius-3xs);
}
.btn-secondary--m {
  height: 46px;
  padding: var(--btn-padding-m-v) var(--btn-padding-m-h);
  font-size: 14px;
  gap: var(--btn-gap-m);
  border-radius: var(--radius-xs);
}
.btn-secondary--l {
  height: 56px;
  padding: var(--btn-padding-l-v) var(--btn-padding-l-h);
  font-size: 16px;
  gap: var(--btn-gap-l);
  border-radius: var(--radius-xs);
}

.btn-secondary--full { width: 100%; }
.btn-secondary:hover { background: var(--semantic-primary-lite-fill); }
.btn-secondary:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.btn-secondary[aria-disabled="true"] { opacity: 0.5; pointer-events: none; }

/* Action strip (desktop horizontal) */
.action-strip {
  display: flex;
  align-items: center;
  gap: var(--space-xs);   /* 12px */
}

/* Action stack (mobile vertical) */
.action-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);   /* 16px */
  width: 100%;
}
```

---

## Dos and don'ts

| ✓ Do | ✗ Don't |
|---|---|
| Always match size with paired Primary | Use a different size than the Primary it pairs with |
| Secondary left, Primary right on desktop | Place Secondary above Primary in vertical stacks |
| Multiple Secondaries valid for option sets | Use Secondary as the sole button — it needs a Primary |
| Use for dialog/sheet dismissal: "Cancel", "Close" | Use for primary actions like "Save" or "Confirm" |
| Horizontal pairs on desktop, stacked on mobile | Mix horizontal and stacked in the same button group |

---

## Accessibility

**Keyboard:** Same as Primary Button — `Tab`, `Enter`/`Space`, visible focus ring.

**Screen reader:**
- Native `<button>` element
- Label text is the accessible name — "Print Merchant Receipt" is fully descriptive
- `aria-disabled="true"` for disabled state (remains focusable)

**Colour & contrast:**
- Dark gray text (~#303339) on white = ~12.6:1 — exceeds AAA (7:1)
- Neutral border against page background exceeds 3:1 per WCAG 1.4.11

**Touch targets:** All sizes meet 44×44px minimum. Full-width mobile buttons exceed this by design.


---
<!-- FILE: core/buttons/LINK-BUTTON.md -->

# Link Button (Ghost)
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Buttons SKILL](../../skills/SKILL-BUTTONS.md)

> Lowest-emphasis button. No background, no border. Used inline for navigation actions and "View all" links within card headers.

---

## Figma source
[Core Design System — Link Button](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=17845-62937&m=dev)

Component: `🟢-Link-Button-CP` · Node: `17845:62937`

---

## Overview

The Link Button is the lowest visual weight in the button hierarchy. It appears inline within card headers for "View all" links, in navigation for less prominent actions, and where a full button would be visually too heavy.

**Key distinction:** Uses `--text-header` (#3a2db8) — the purple/accent colour signals interactivity on white backgrounds.

---

## Properties

| Property | Value |
|---|---|
| Background | None |
| Border | None |
| Text colour | `--text-header` `#3a2db8` |
| Font | Poppins Medium — same as button types |
| Hover | Subtle underline or background tint |
| Focus | `var(--focus-ring)` |

---

## When to use

- "View all" links in card headers
- "Edit" inline within review sections
- Navigation links that are less prominent than secondary actions
- Inline links within body copy

## When NOT to use

- As the primary CTA for a screen
- Paired directly with a Primary Button in an action strip (use Secondary instead)
- For destructive actions

---

## Implementation

```html
<button type="button" class="btn-link">View all</button>
<button type="button" class="btn-link">Edit</button>
```

```css
.btn-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-4xs);   /* 6px */
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--text-header);   /* var(--semantic-primary-lite-primary) */
  background: none;
  border: none;
  padding: 4px 0;
  cursor: pointer;
  text-decoration: none;
  transition: opacity var(--motion-hover) var(--motion-easing-out);
}

.btn-link:hover { text-decoration: underline; }
.btn-link:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: 4px; }
```

---

## Accessibility

- Use `<button>` for actions, `<a href>` for navigation
- Colour alone does not make it identifiable — the underline on hover provides a second signal
- Meets 44×44px touch target via padding on mobile contexts


---
<!-- FILE: core/buttons/FAB-BUTTONS.md -->

# FAB Buttons
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Buttons SKILL](../../skills/SKILL-BUTTONS.md)

> Floating action buttons — compact icon-only buttons used for table controls, navigation actions, and utility actions.

---

## Figma sources
- Pagination buttons: [Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=28045-17364&m=dev)
- FAB in table cells: [Core Design System — Table Cells](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27995-18448&m=dev)

---

## FAB variants

Three visual variants exist, each for different surface contexts:

| Variant | Component name | Background | Border | Use |
|---|---|---|---|---|
| Primary Neutral | `🟢-Fab-[Primary-Neutral]-CP` | White | 1px `--semantic-primary-neutral-line` | Table controls (filter, export, calendar) |
| Primary Lite | `🟢-Fab-[Primary-Lite]-CP` | `--semantic-primary-lite-fill` | 1px `--semantic-primary-lite-line` | Active/highlighted state |
| Industry Neutral | `🟢-Fab-[Industry-Neutral]-CP` | White | 1px `--semantic-industry-primary-neutral-line` | Table row actions (edit, delete, more) |

---

## Sizes

| Variant | Padding | Icon size | Border-radius | Total size |
|---|---|---|---|---|
| Standard (table controls) | 13px | 14px | 10px | ~40×40px |
| Row action (Industry) | 15px | 16px | 12px | ~46×46px |

---

## States (Pagination button variant)

| State | Background | Border | Shadow |
|---|---|---|---|
| Default | White | 1px `--semantic-primary-neutral-line` | None |
| Hover | `--semantic-primary-lite-fill` | `--semantic-primary-neutral-line` | None |
| Active/Selected | `--semantic-primary-lite-fill` | `#4f4ddb` | `var(--focus-ring)` |
| Focused | White | `--semantic-primary-neutral-line` | `var(--focus-ring)` |
| Disabled | White, 50% opacity | Same | None |

---

## Implementation

```html
<!-- Table control FAB (filter, calendar, download) -->
<button type="button" class="fab-neutral" aria-label="Filter">
  <img src="[filter-icon]" alt="" aria-hidden="true" width="14" height="14" />
</button>

<!-- Table row action FAB (dots/more) -->
<button type="button" class="fab-industry" aria-label="More actions">
  <img src="[dots-icon]" alt="" aria-hidden="true" width="16" height="16" />
</button>

<!-- Multi-icon cell (edit + delete + more) -->
<div class="fab-group">
  <button type="button" class="fab-industry" aria-label="Edit">
    <img src="[edit-icon]" alt="" aria-hidden="true" width="16" height="16" />
  </button>
  <button type="button" class="fab-industry" aria-label="Delete">
    <img src="[delete-icon]" alt="" aria-hidden="true" width="16" height="16" />
  </button>
  <button type="button" class="fab-industry" aria-label="More">
    <img src="[dots-icon]" alt="" aria-hidden="true" width="16" height="16" />
  </button>
</div>
```

```css
/* Table control FAB */
.fab-neutral {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;
  background: var(--semantic-primary-neutral-fill);
  border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: 10px;
  cursor: pointer;
  transition: background var(--motion-hover) var(--motion-easing-out);
}

/* Table row action FAB */
.fab-industry {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: var(--semantic-primary-neutral-fill);
  border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: var(--radius-xs);   /* 12px */
  cursor: pointer;
  transition: background var(--motion-hover) var(--motion-easing-out);
}

.fab-neutral:hover,
.fab-industry:hover {
  background: var(--semantic-primary-lite-fill);
}

.fab-neutral:focus-visible,
.fab-industry:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Multi-icon group */
.fab-group {
  display: flex;
  align-items: center;
  gap: var(--space-xs);   /* 12px */
}
```

---

## Accessibility
- All FABs are icon-only — **require `aria-label`** describing the action
- Add `aria-hidden="true"` to the icon image
- All meet 44×44px minimum touch target


---
<!-- FILE: core/forms/INPUTS.md -->

# Inputs
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Forms SKILL](../../skills/SKILL-FORMS.md)

> Text input, floating label technique, and all validation states.

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System)

---

## Standard text input

```
             ┌─ Label floats here ─────────┐
             │                             │
     ┌───────┴─────────────────────────────┴───────┐
     │  Placeholder or typed value                  │
     └──────────────────────────────────────────────┘
       Helper text or validation message (20px zone)
```

| Property | Value |
|---|---|
| Height | 56px |
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border | 1px `var(--semantic-primary-neutral-line)` #d1d2d5 |
| Border-radius | `var(--radius-xs)` 12px |
| Padding | `var(--space-xs)` vertical (12px) / 13px horizontal |
| Placeholder font | `Label/L5-400` — 14px Regular, `var(--text-muted)` #9599a2 |
| Below-field zone | 20px reserved — always present even when no message |

### Floating label

The label sits visually notched into the top border. A white background bar masks the border; the label text sits in the gap.

| Property | Value |
|---|---|
| Font | `Label/L5-400` — 14px Regular |
| Colour | `var(--text-primary)` #303339 |
| Position | `position: absolute; top: -1px; z-index: 2` |
| Padding | 2px horizontal to create the notch gap |

**Rule:** Never use placeholder as a substitute for the label. Once the user starts typing, the placeholder disappears and context is lost.

---

## States

| State | Border | Additional |
|---|---|---|
| Default | 1px `var(--semantic-primary-neutral-line)` #d1d2d5 | — |
| Focus | 1px `var(--semantic-primary-bold-line)` #4f4ddb | `box-shadow: var(--focus-ring)` |
| Error | 1px `var(--semantic-error-stroke)` #ff513a | Error message below in `var(--semantic-error-fill)` #dc2626 |
| Success | 1px `var(--semantic-success-lite-primary)` #166534 | Optional green check icon |
| Disabled | 1px `var(--semantic-primary-neutral-line)` | `opacity: 0.5`, `pointer-events: none` |

### Error message format
```html
<div class="input-error">
  <img src="[error-icon]" alt="" aria-hidden="true" width="16" height="16" />
  Enter a valid ABN — it should be 11 digits
</div>
```
Font: `Label/L6-400` (12px) · Colour: `var(--semantic-error-fill)` (#dc2626)

---

## Implementation

```html
<div class="input-group">
  <div class="input-wrapper">
    <label for="abn" class="input-label">ABN</label>
    <input
      id="abn"
      type="text"
      class="input-field"
      placeholder="Enter your 11-digit ABN"
      aria-required="true"
      aria-describedby="abn-error"
    />
  </div>
  <!-- Error message zone — always reserve 20px -->
  <div id="abn-error" class="input-message input-message--error" role="alert" hidden>
    <img src="[error-icon]" alt="" aria-hidden="true" width="16" height="16" />
    Enter a valid ABN — it should be 11 digits
  </div>
</div>
```

```css
.input-group { display: flex; flex-direction: column; gap: 0; }

.input-wrapper {
  position: relative;
  height: 56px;
}

.input-label {
  position: absolute;
  top: -1px;
  left: 13px;
  z-index: 2;
  padding: 0 2px;
  background: var(--semantic-primary-neutral-fill);
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary);
  pointer-events: none;
}

.input-field {
  width: 100%;
  height: 100%;
  padding: var(--space-xs) 13px;   /* 12px 13px */
  background: var(--semantic-primary-neutral-fill);
  border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: var(--radius-xs);   /* 12px */
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--motion-hover) var(--motion-easing-out);
}

.input-field::placeholder { color: var(--text-muted); }
.input-field:focus { border-color: var(--semantic-primary-bold-line); box-shadow: var(--focus-ring); }
.input-field.is-error { border-color: var(--semantic-error-stroke); }
.input-field.is-success { border-color: var(--semantic-success-lite-primary); }

.input-message {
  min-height: 20px;
  padding-top: 4px;
  display: flex;
  align-items: center;
  gap: var(--space-5xs);   /* 4px */
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
}

.input-message--error { color: var(--semantic-error-fill); }
.input-message--success { color: var(--semantic-success-lite-primary); }
```

---

## Accessibility
- Every input has an associated `<label>` — not just a placeholder
- `aria-required="true"` for required fields
- `aria-invalid="true"` only when in error state
- `aria-describedby` points to the error message element
- Error messages use `role="alert"` for immediate screen reader announcement
- See [Accessibility](../../brand/08-ACCESSIBILITY.md) for full ARIA patterns


---
<!-- FILE: core/forms/DROPDOWN.md -->

# Dropdown
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Forms SKILL](../../skills/SKILL-FORMS.md)

> Select dropdown built on top of the standard input. Same base, opens a floating list.

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System)

---

## Trigger

Identical appearance to a text input. Trailing chevron icon (16px) indicates it is a select.

## Floating list

| Property | Value |
|---|---|
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border | 1px `var(--semantic-primary-neutral-line)` #d1d2d5 |
| Border-radius | `var(--radius-3xs)` 8px |
| Shadow | `0 4px 16px rgba(0,0,0,0.08)` |
| Item height | 44px desktop / 56px mobile |
| Item style | Secondary-button style, fills dropdown width |
| Max height | 320px — scroll activates beyond this |
| Scrollbar width | 14px, right-aligned, `var(--color-scrollbar-track)` |
| Open animation | 150ms ease-out, scale + fade from top |
| Close animation | 150ms ease-in |

## Implementation

```html
<div class="dropdown" data-open="false">
  <button type="button" class="dropdown__trigger input-field" aria-haspopup="listbox" aria-expanded="false">
    <span class="dropdown__value">Select industry</span>
    <img src="[chevron-icon]" alt="" aria-hidden="true" width="16" height="16" class="dropdown__chevron" />
  </button>
  <ul class="dropdown__list" role="listbox" aria-label="Industry" hidden>
    <li role="option" class="dropdown__item" aria-selected="false">Hospitality</li>
    <li role="option" class="dropdown__item" aria-selected="false">Retail</li>
    <li role="option" class="dropdown__item" aria-selected="false">Transport</li>
  </ul>
</div>
```

```css
.dropdown { position: relative; }

.dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  text-align: left;
}

.dropdown__chevron {
  flex-shrink: 0;
  transition: transform var(--motion-default) var(--motion-easing-out);
}
.dropdown[data-open="true"] .dropdown__chevron { transform: rotate(180deg); }

.dropdown__list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 320px;
  overflow-y: auto;
  background: var(--semantic-primary-neutral-fill);
  border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: var(--radius-3xs);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  z-index: 50;
  animation: dropdown-open var(--motion-default) var(--motion-easing-out);
}

@keyframes dropdown-open {
  from { opacity: 0; transform: scaleY(0.95); transform-origin: top; }
  to   { opacity: 1; transform: scaleY(1); }
}

.dropdown__item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 44px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  list-style: none;
}
.dropdown__item:hover { background: var(--semantic-primary-lite-fill); }
.dropdown__item[aria-selected="true"] { color: var(--text-header); background: var(--semantic-primary-lite-fill); }
```

## Accessibility
- Trigger: `aria-haspopup="listbox"`, `aria-expanded` toggled on open/close
- List: `role="listbox"`, `aria-label`
- Items: `role="option"`, `aria-selected`
- `Escape` closes the dropdown, returns focus to trigger


---
<!-- FILE: core/forms/SEARCH.md -->

# Search Input
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Forms SKILL](../../skills/SKILL-FORMS.md)

> Search input variant — standard input with prepended search icon.

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System)

Used in: table controls bar (360px wide), global search contexts.

---

## Properties

Same as standard text input with one addition: a 12px search icon prepended inside the left of the field.

| Property | Value |
|---|---|
| Base | Identical to [INPUTS.md](./INPUTS.md) |
| Left icon | 12px search icon, inside field, 4px right margin to text |
| Placeholder | Describes what can be searched — "Enter ABN, ACN, or business name" |
| Width (table context) | 360px |

---

## Implementation

```html
<div class="input-wrapper input-wrapper--search">
  <img src="[search-icon]" alt="" aria-hidden="true" class="input-search-icon" width="12" height="12" />
  <input
    type="search"
    class="input-field input-field--search"
    placeholder="Search transactions..."
    aria-label="Search transactions"
  />
</div>
```

```css
.input-wrapper--search { position: relative; }

.input-search-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-muted);
}

.input-field--search {
  padding-left: calc(13px + 12px + 4px);   /* left-pad + icon + gap */
}
```


---
<!-- FILE: core/forms/PROGRESS-BAR.md -->

# Progress Bar (Multi-step)
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Forms SKILL](../../skills/SKILL-FORMS.md)

> Multi-step onboarding and form flow progress indicator.

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System)

Used in: Live Bill Pay onboarding (Business Details → Identity → Review & Confirm).

---

## Track and fill

| Property | Value |
|---|---|
| Track height | 4px |
| Track background | `var(--progress-track)` #d4d5f7 |
| Track border-radius | 100px (full pill) |
| Fill background | `var(--progress-fill)` #3a2db8 |
| Fill width | Percentage matching current step — e.g. 33% for step 1 of 3 |
| Current marker | 14px circle, white bg, 1px `#3a2db8` border, `border-radius: 50%` |

## Step icons

32×32px container, `border-radius: var(--radius-4xs)` (6px).

| State | Background | Border | Icon |
|---|---|---|---|
| Completed | `var(--semantic-primary-bold-fill)` #4f4ddb | Same | White checkmark |
| Active | `var(--progress-active)` #686ae2 | `#8387e8` | White context icon |
| Future | `#f9f9f9` | `#e9eaeb` | Muted icon |

## Step labels

| State | Font | Colour |
|---|---|---|
| Active | `Label/L6-500` — Medium 12px | `var(--text-header)` #3a2db8 |
| Future | `Label/L6-500` — Medium 12px | `var(--text-label)` #606672 |

## Implementation

```html
<div class="progress-bar" role="progressbar"
  aria-valuenow="1" aria-valuemin="1" aria-valuemax="3"
  aria-label="Step 1 of 3: Business Details">

  <div class="progress-bar__track">
    <div class="progress-bar__fill" style="width: 33%"></div>
    <div class="progress-bar__marker" style="left: 33%"></div>
  </div>

  <div class="progress-bar__steps">
    <div class="progress-step progress-step--active">
      <div class="progress-step__icon"><!-- checkmark --></div>
      <span class="progress-step__label">Business Details</span>
    </div>
    <div class="progress-step progress-step--future">
      <div class="progress-step__icon"><!-- id icon --></div>
      <span class="progress-step__label">Identity</span>
    </div>
    <div class="progress-step progress-step--future">
      <div class="progress-step__icon"><!-- review icon --></div>
      <span class="progress-step__label">Review</span>
    </div>
  </div>
</div>
```

```css
.progress-bar__track {
  position: relative;
  height: 4px;
  background: var(--progress-track);
  border-radius: 100px;
  margin-bottom: 12px;
}
.progress-bar__fill {
  height: 100%;
  background: var(--progress-fill);
  border-radius: 100px;
  transition: width var(--motion-medium) var(--motion-easing-out);
}
.progress-bar__marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: white;
  border: 1px solid var(--semantic-primary-lite-primary);
  border-radius: 50%;
}
.progress-bar__steps {
  display: flex;
  justify-content: space-between;
}
.progress-step { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.progress-step__icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-4xs);
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-step--active .progress-step__icon { background: var(--progress-active); }
.progress-step--future .progress-step__icon { background: var(--main-primary-neutral-fill-l2); border: 1px solid var(--color-scheme-border); }
.progress-step--completed .progress-step__icon { background: var(--semantic-primary-bold-fill); }

.progress-step__label {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
}
.progress-step--active .progress-step__label { color: var(--text-header); }
.progress-step--future .progress-step__label { color: var(--text-label); }
```

## Usage rules
- Only for **2–5 clearly sequential steps** — steps that must be completed in order
- Step labels: 1–3 words maximum
- Never show for a single-step process
- Update `aria-valuenow` and `aria-label` as user advances through steps


---
<!-- FILE: core/forms/KEYPAD.md -->

# Keypad
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Numeric keypad for payment amount entry. Used in DX payment flows.

---

## Figma source
[Core Design System — Keypad](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=19470-121243&m=dev)

Components: `🟢-Keypad-Button-CP`, `🟢-Amount-Input-Display-CP`, `🟢-Transaction-Input-CP`, `🟢-Payment-Digit-CP`

---

## Structure

4 rows × 3 columns = 12 keys layout.

```
┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
├───┼───┼───┤
│ . │ 0 │ ⌫ │
└───┴───┴───┘
```

The amount display sits above the keypad showing the entered value built from `🟢-Payment-Digit-CP` components.

## Sizes
| Component | Breakpoint variants |
|---|---|
| Keypad | 360px, 393px |

## Usage
- Hidden by default in Figma — toggled on when payment entry is needed
- Amount display updates as digits are pressed
- Backspace (⌫) removes the last digit
- Decimal point constrained to one per amount

## Tokens used
```css
--semantic-primary-neutral-fill    /* key background */
--semantic-primary-neutral-line    /* key border */
--semantic-primary-bold-fill       /* active/pressed key */
--text-primary                     /* digit text */
--radius-xs                        /* key border-radius */
--focus-ring                       /* focused key */
```


---
<!-- FILE: core/display/CARDS.md -->

# Cards
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Cards SKILL](../../skills/SKILL-CARDS.md)

> The 3-level nesting system. The most distinctive visual pattern in Live Payments. Every dashboard, review screen, and data panel uses it.

---

## Figma sources
- Dashboard screens: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-34584&m=dev)
- Wallet screen: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-36698&m=dev)
- Bill Pay Onboarding: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-28773&m=dev)

---

## Overview

Cards are the primary content container. They almost always nest. An outer container gives the section context, an inner card holds the content, and chips carry individual data points.

**Understanding the three levels is the single most important thing for building any new screen correctly.**

---

## The three levels

```
Level 1 — Section container (outermost)
  Sets the section apart from the page background.
  Tinted bg + lite border, OR bold primary fill for hero sections.
  Radius: 28px (feature/hero) or 16px (standard).

  Level 2 — Body card (middle)
    White bg + neutral border.
    Radius matches Level 1.
    Padding: 16px. This is where the actual content lives.

    Level 3 — Chip / metric block (innermost)
      Semantic colour fill + matching border.
      Radius: 16px (--radius-m).
      Contains: label + value + optional action.
```

---

## Level 1 — Section container

| Variant | Background | Border | Radius | Use |
|---|---|---|---|---|
| Standard feature | `var(--semantic-primary-lite-fill)` #fafaff | `var(--semantic-primary-lite-line)` #d4d5f7 | 28px or 16px | Most sections |
| Hero / headline | `var(--semantic-primary-bold-fill)` #4f4ddb | Same | 28px | Priority section (e.g. "Today at a glance") |

## Level 2 — Body card

| Property | Value |
|---|---|
| Background | `var(--semantic-primary-neutral-fill)` white — **always white**, regardless of Level 1 |
| Border | 1px `var(--semantic-primary-neutral-line)` #d1d2d5 |
| Radius | Matches Level 1 radius |
| Padding | 16px (`var(--space-m)`) all sides |

## Level 3 — Semantic chip

| Variant | Fill | Border | Text |
|---|---|---|---|
| Success / Settled | `#f0fdf4` | `#166534` | `#166534` |
| Caution / Pending | `#fffdf5` | `#f59e0b` | `#92400e` |
| Info / Count | `#f0faff` | `#0ea0e9` | `#075b85` |
| Primary / Highlight | `#fafaff` | `#3a2db8` | `#3a2db8` |
| Neutral | `#ffffff` | `#d1d2d5` | `#303339` |

All Level 3 chips use `border-radius: var(--radius-m)` (16px).

---

## Visual example — Today at a glance

```
┌──────────────────────────────────────────────┐  Level 1 (hero)
│  Today at a glance                            │  bg: #4f4ddb, radius: 28px
│  Last updated: 11 Jan 23 12:00PM             │
│                                               │
│  ┌──────────────────────────────────────┐   │  Level 2
│  │  ┌─────────────┐  ┌──────────────┐  │   │  bg: white, radius: 28px
│  │  │ Sales     ↗ │  │ Transactions │  │   │  Level 3 chips
│  │  │ $1,000,000  │  │ 500          │  │   │  Green: #f0fdf4 / #166534
│  │  └─────────────┘  └──────────────┘  │   │  Blue: #f0faff / #0ea0e9
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

---

## Radius rule

```
Outer 28px → Inner 28px   ✓  flush, continuous look
Outer 16px → Inner 16px   ✓  standard matching
Outer 28px → Chip 8px     ✗  too abrupt — chip looks displaced
Inner > outer             ✗  breaks visual containment
```

---

## When to nest vs not nest

- Section has a named heading wrapping multiple items → Level 1 + Level 2
- Metric value needs semantic colour → Level 3 chip inside Level 2
- Chart content → Level 2 card with title, no Level 3 (chart is the content)
- **Never exceed three levels**

---

## Common mistakes

| Mistake | Why it's wrong |
|---|---|
| Single white card, no nesting | Out of character — looks bare |
| Four levels of nesting | Content too narrow on mobile, hierarchy unreadable |
| Chip `border-radius: 8px` inside 28px outer | Chip looks displaced from a different component |
| Semantic green on Level 2 body card | Colour belongs in Level 3 chips — body card is always white |
| 2 chip colours in one card | Exceeds maximum of 2 — hierarchy becomes unclear |

---

## Implementation

```html
<!-- Level 1 (standard section) -->
<div class="card-section">
  <!-- Level 2 (body card) -->
  <div class="card-body">
    <h2 class="card-heading">Total Sales</h2>
    <!-- Level 3 chips -->
    <div class="chip chip--success">
      <span class="chip__label">Settled</span>
      <span class="chip__value">$1,200.00</span>
    </div>
    <div class="chip chip--caution">
      <span class="chip__label">Pending</span>
      <span class="chip__value">$300.00</span>
    </div>
  </div>
</div>
```

```css
/* Level 1 — standard */
.card-section {
  background: var(--semantic-primary-lite-fill);
  border: 1px solid var(--semantic-primary-lite-line);
  border-radius: 16px;
  padding: var(--space-m);
}

/* Level 1 — hero variant */
.card-section--hero {
  background: var(--semantic-primary-bold-fill);
  border-color: var(--semantic-primary-bold-line);
  border-radius: 28px;
}

/* Level 2 — body card (always white) */
.card-body {
  background: var(--semantic-primary-neutral-fill);
  border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: 16px;   /* matches Level 1 */
  padding: var(--space-m);
}

/* Level 3 — semantic chips */
.chip {
  display: inline-flex;
  flex-direction: column;
  padding: var(--space-xs) var(--space-m);
  border-radius: var(--radius-m);
  border: 1px solid;
}
.chip--success { background: var(--semantic-success-lite-fill); border-color: var(--semantic-success-lite-primary); color: var(--semantic-success-lite-primary); }
.chip--caution { background: var(--semantic-caution-lite-fill); border-color: var(--semantic-caution-bold-line); color: var(--semantic-caution-lite-primary); }
.chip--info    { background: var(--semantic-blue-bold-primary); border-color: var(--semantic-blue-lite-line); color: var(--semantic-blue-lite-primary); }
.chip--primary { background: var(--semantic-primary-bold-primary); border-color: var(--semantic-primary-lite-primary); color: var(--semantic-primary-lite-primary); }
.chip--neutral { background: var(--semantic-primary-neutral-fill); border-color: var(--semantic-primary-neutral-line); color: var(--semantic-primary-neutral-primary); }

.card-heading {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: var(--text-header);
  margin: 0 0 var(--space-m);
}
```

---

## Tokens used
```css
--semantic-primary-lite-fill       /* Level 1 bg */
--semantic-primary-lite-line       /* Level 1 border */
--semantic-primary-bold-fill       /* Level 1 hero bg */
--semantic-primary-neutral-fill    /* Level 2 bg (always white) */
--semantic-primary-neutral-line    /* Level 2 border */
--radius-m                         /* chip radius — 16px */
--space-m                          /* card padding — 16px */
--text-header                      /* card headings */
```


---
<!-- FILE: core/display/BADGES-STATUS.md -->

# Status / Indicator Badges
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Badges SKILL](../../skills/SKILL-BADGES.md)

> Status indicator badges used in tables, cards, and transaction views. 40+ indicator types across 3 sizes.

---

## Figma source
[Core Design System — Indicator Badges](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=28325-44521&m=dev)

Component: `🟢-indicator-Badges-CP` · Node: `28325:44521`

---

## Sizes

| Size | Height | Padding | Font size | Icon |
|---|---|---|---|---|
| L (Large) | 22px | 0 8px | 14px Regular | 16px |
| M (Medium) | 20px | 0 8px | 12px Regular | 14px (or none) |
| S (Small) | 20px | 4px | — | 20px (icon only) |

S size is icon-only — no text label.

---

## Structure

```
[icon 16px]  [label text]
```

Container: `border-radius: var(--radius-5xs)` (4px), inline-flex, `gap: 6px`.

---

## Complete indicator list

### Green — Positive / Success states

| Indicator | Token | Context |
|---|---|---|
| Active | green | Card/account active status |
| Approved | green | Transaction approved |
| Transferred | green | Funds transferred |
| Processed | green | Transaction processed |
| Sale | green | Sale completed |
| Sent | green | Payment sent |
| Paid | green | Invoice paid |
| Trending up | green | Positive trend indicator |

### Amber/Caution — In-progress / Warning states

| Indicator | Token | Context |
|---|---|---|
| Pending | amber | Awaiting clearance |
| Remitting | amber | Settlement in progress |
| Processing | amber | Being processed |
| Bounceback | amber | Returned transaction |

### Red — Error / Negative states

| Indicator | Token | Context |
|---|---|---|
| Error | red | System/transaction error |
| Declined | red | Transaction declined |
| Refund Declined | red | Refund not approved |
| Void | red | Transaction voided |
| Hold | red | Transaction on hold |
| Reverse | red | Transaction reversed |
| Failed | red | Transaction failed |
| Cancelled | red | Transaction cancelled |
| Trending down | red | Negative trend |
| Blocked | red | Card/account blocked |

### Grey / Neutral — Inactive / Informational states

| Indicator | Token | Context |
|---|---|---|
| Inactive | grey | Card/account inactive |
| Refund | grey | Refund processed |
| Partial Refund | grey | Partial refund |
| Chargeback | grey | Chargeback raised |
| NA | grey | Not applicable |
| Default card | grey | Default payment card |
| Closed | grey | Account/card closed |
| Expired | grey | Card expired |
| Issue | grey | Card issued |
| Issued | grey | Card issued (alt) |

### Blue / Info — Feature / Product states

| Indicator | Token | Context |
|---|---|---|
| New Feature | blue | New feature highlight |
| Bpay | blue | BPAY payment type |
| Account transfer | blue | Bank account transfer |

---

## Colour sets (use complete set — never mix)

| State family | Fill | Border | Text |
|---|---|---|---|
| Green (positive) | `var(--semantic-success-lite-fill)` #f0fdf4 | `var(--semantic-success-lite-primary)` #166534 | #166534 |
| Amber (caution) | `var(--semantic-caution-lite-fill)` #fffdf5 | `var(--semantic-caution-bold-line)` #f59e0b | `var(--semantic-caution-lite-primary)` #92400e |
| Red (error) | `var(--semantic-error-lite-fill)` #fef9f9 | `var(--semantic-error-stroke)` #ff513a | `var(--semantic-error-fill)` #dc2626 |
| Blue (info) | `var(--semantic-blue-bold-primary)` #f0faff | `var(--semantic-blue-lite-line)` #0ea0e9 | `var(--semantic-blue-lite-primary)` #075b85 |
| Grey (neutral) | `var(--semantic-primary-neutral-fill)` #ffffff | `var(--semantic-primary-neutral-line)` #d1d2d5 | `var(--text-primary)` #303339 |

---

## Implementation

```html
<!-- Large — Approved (green) -->
<div class="badge badge--green badge--l">
  <img src="[check-icon]" alt="" aria-hidden="true" class="badge__icon" />
  <span class="badge__label">Approved</span>
</div>

<!-- Large — Pending (amber) -->
<div class="badge badge--amber badge--l">
  <img src="[clock-icon]" alt="" aria-hidden="true" class="badge__icon" />
  <span class="badge__label">Pending</span>
</div>

<!-- Small — icon only -->
<div class="badge badge--green badge--s" aria-label="Approved">
  <img src="[check-icon]" alt="" aria-hidden="true" class="badge__icon" />
</div>
```

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--radius-5xs);   /* 4px */
  border: 1px solid;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  text-transform: capitalize;
  white-space: nowrap;
}

/* Sizes */
.badge--l { height: 22px; padding: 0 8px; font-size: 14px; }
.badge--m { height: 20px; padding: 0 8px; font-size: 12px; }
.badge--s { height: 20px; width: 20px; padding: 4px; justify-content: center; }

/* Colour variants */
.badge--green {
  background: var(--semantic-success-lite-fill);
  border-color: var(--semantic-success-lite-primary);
  color: var(--semantic-success-lite-primary);
}
.badge--amber {
  background: var(--semantic-caution-lite-fill);
  border-color: var(--semantic-caution-bold-line);
  color: var(--semantic-caution-lite-primary);
}
.badge--red {
  background: var(--semantic-error-lite-fill);
  border-color: var(--semantic-error-stroke);
  color: var(--semantic-error-fill);
}
.badge--blue {
  background: var(--semantic-blue-bold-primary);
  border-color: var(--semantic-blue-lite-line);
  color: var(--semantic-blue-lite-primary);
}
.badge--grey {
  background: var(--semantic-primary-neutral-fill);
  border-color: var(--semantic-primary-neutral-line);
  color: var(--text-primary);
}

.badge__icon { width: 16px; height: 16px; flex-shrink: 0; }
```

---

## Accessibility
- Always include text label for L and M sizes — colour alone is not sufficient
- S (icon-only) badges require `aria-label` on the container
- Never rely on colour alone to communicate status


---
<!-- FILE: core/display/BADGES-PRODUCT.md -->

# Product Type Badges
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Badges SKILL](../../skills/SKILL-BADGES.md)

> Product type badges used in table cells to identify the payment terminal or product type.

---

## Figma source
[Core Design System — Product Badges](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=28325-44521&m=dev)

Component: `🟢-ProductType-Badges-CP` · Node: `28045:15415`

---

## Products and sizes

| Product | Desktop size | Table size | Mobile size |
|---|---|---|---|
| Virtual | 85×22px | 78×20px | 30×18px |
| LiveTap | 127×22px | 114×20px | 30×18px |
| Ecommerce | 127×22px | 114×20px | 30×18px |
| Terminal | 101×22px | 92×20px | 30×18px |
| Instant Settlement | 169×22px | 150×20px | 30×18px |
| Live Capital | 121×22px | 109×20px | 30×18px |

Mobile size is icon-only (30×18px).

---

## Styling

Product badges use the `--semantic-blue-*` colour set (informational):

```css
.badge-product {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--semantic-blue-bold-primary);   /* var(--semantic-blue-bold-primary) */
  border: 1px solid var(--semantic-blue-lite-line); /* var(--semantic-blue-lite-line) */
  color: var(--semantic-blue-lite-primary);         /* var(--semantic-blue-lite-primary) */
  border-radius: var(--radius-5xs);                 /* 4px */
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  white-space: nowrap;
  text-transform: capitalize;
}
.badge-product--desktop { height: 22px; padding: 0 8px; font-size: 14px; }
.badge-product--table   { height: 20px; padding: 0 8px; font-size: 12px; }
.badge-product--mobile  { height: 18px; width: 30px; padding: 2px; justify-content: center; }
```

For mobile (icon only) add `aria-label="[Product name]"`.


---
<!-- FILE: core/display/HEADER-SECTION.md -->

# Header Section
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Page and card header component with title, optional subtitle, and optional actions.

---

## Figma source
[Core Design System — Header Section](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=17870-185902&m=dev)

Component: `🟢-Header-Section-CP` · Node: `17870:185902`

---

## 13 variants

Three dimensions — Size × Alignment × Padding:

| Size | Alignment | Padding | Node |
|---|---|---|---|
| S | Center | True | `17870:154719` |
| S | Center | True (alt) | `26563:109284` |
| S | Left | True | `17870:185923` |
| M | Center | True | `17870:185903` |
| M | Left | True | `17870:185927` |
| L | Center | True | `17870:185909` |
| L | Left | True | `17870:185931` |
| S | Center | False | `18486:1307` |
| S | Left | False | `18486:1310` |
| M | Center | False | `18486:1313` |
| M | Left | False | `18486:1316` |
| L | Center | False | `18486:1319` |
| L | Left | False | `18486:1322` |

---

## Size dimensions

| Size | Height (with padding) | Height (no padding) | Title font |
|---|---|---|---|
| S | 76px | 76px | `Label/L3-500` — Medium 18px |
| M | 108px (padded) / 84px (no pad) | 84px | `Label/L2-500` — Medium 24px |
| L | 112px (padded) / 88px (no pad) | 88px | `Heading/H4` — SemiBold 28px |

---

## Tokens used

```css
--text-header       /* title colour — always var(--semantic-primary-lite-primary) */
--text-primary      /* subtitle colour */
--space-m           /* internal padding when Padding=True */
--semantic-primary-neutral-fill   /* background */
```

---

## When to use each size

| Context | Size | Alignment |
|---|---|---|
| Portal page title ("Bill history") | L | Left |
| Card section heading | S | Left |
| Modal or drawer title | M | Center or Left |
| Onboarding step title | M | Center |
| Dashboard card heading | S | Left |

---

## Implementation

```html
<!-- S, Left, no extra padding — most common card usage -->
<div class="header-section header-section--s header-section--left">
  <h2 class="header-section__title">Bill History</h2>
  <p class="header-section__subtitle">Showing last 30 days</p>
</div>

<!-- L, Left — portal page title -->
<div class="header-section header-section--l header-section--left header-section--padded">
  <h1 class="header-section__title">Bill history</h1>
</div>
```

```css
.header-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.header-section--padded { padding: var(--space-m); }
.header-section--center { align-items: center; text-align: center; }
.header-section--left   { align-items: flex-start; text-align: left; }

.header-section--s { min-height: 76px; }
.header-section--m { min-height: 84px; }
.header-section--l { min-height: 88px; }

.header-section__title {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: var(--text-header);
  margin: 0;
}
.header-section--s .header-section__title { font-size: 18px; line-height: 26px; }
.header-section--m .header-section__title { font-size: 24px; line-height: 32px; }
.header-section--l .header-section__title { font-size: 28px; line-height: normal; font-weight: 600; }

.header-section__subtitle {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--text-paragraph);
  margin: 4px 0 0;
}
```

---

## Accessibility
- Page-level headers use `<h1>` — one per page
- Card and section headings use `<h2>` or `<h3>` following document hierarchy
- Never skip heading levels (h1 → h3)


---
<!-- FILE: core/display/AVATAR.md -->

# Avatar
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> User avatar component — profile image or initials fallback.

---

## Figma source
[Core Design System](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System)

---

## Sizes

| Size name | Diameter | Use |
|---|---|---|
| XS | 24px | Compact table row, inline list |
| S | 32px | Card list items |
| M | 40px | Topbar, notification area |
| L | 48px | Profile panel |
| XL | 56px | Portal topbar — primary usage in this system |

Default in portal topbar: **XL (56px)**.

---

## Properties

| Property | Value |
|---|---|
| Shape | Circle — `border-radius: 50%` |
| Border | 1px `var(--semantic-primary-neutral-line)` #d1d2d5 |
| Background | `var(--semantic-primary-neutral-fill)` white (for initials fallback) |
| Image fit | `object-fit: cover` |
| Overflow | `overflow: hidden` |

---

## Implementation

```html
<!-- Image avatar -->
<div class="avatar avatar--xl">
  <img src="[user-photo]" alt="Matthew Chen" class="avatar__img" />
</div>

<!-- Initials fallback -->
<div class="avatar avatar--xl avatar--initials" aria-label="Matthew Chen">
  <span class="avatar__initials">MC</span>
</div>
```

```css
.avatar {
  border-radius: 50%;
  border: 1px solid var(--semantic-primary-neutral-line);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--semantic-primary-neutral-fill);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar--xs { width: 24px;  height: 24px; }
.avatar--s  { width: 32px;  height: 32px; }
.avatar--m  { width: 40px;  height: 40px; }
.avatar--l  { width: 48px;  height: 48px; }
.avatar--xl { width: 56px;  height: 56px; }

.avatar__img { width: 100%; height: 100%; object-fit: cover; display: block; }

.avatar__initials {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--text-primary);
  text-transform: uppercase;
}

/* Focus ring for interactive avatars */
.avatar:focus-visible { outline: none; box-shadow: var(--focus-ring); }
```

---

## Accessibility
- Provide meaningful `alt` text for image avatars: user's name
- For initials avatars, use `aria-label` on the container with the user's full name
- For decorative/non-interactive avatars: `alt=""` on the image


---
<!-- FILE: core/feedback/TOASTERS.md -->

# Toasters (Toast Notifications)
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Toast notifications for system feedback. 18 message types, shown temporarily at the top-right of the viewport.

---

## Figma source
[Core Design System — Toasters](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=18944-120125&m=dev)

Component: `🟢-Toasters` · Node: `18944:111627`

---

## Dimensions

| Property | Value |
|---|---|
| Width | 329px |
| Standard height | 120px |
| Tall variant (Uploading) | 150px |
| Border-radius | `var(--radius-xs)` 12px |
| Position | Fixed, top-right (desktop) or top (mobile) |
| Z-index | 9000 |

---

## Structure

```
┌────────────────────────────────────┐  120px
│  [Icon 24px]   Title               │
│                Message body text   │
│                                    │
│  [Progress bar — Uploading only]   │
│                              [✕]   │
└────────────────────────────────────┘
```

| Part | Font | Colour |
|---|---|---|
| Title | `Label/L4-500` — Medium 16px | Matches semantic token set |
| Body | `Label/L5-400` — Regular 14px | Matches semantic token set |
| Close (✕) | 20px icon | `var(--text-muted)` |
| Progress bar | 4px track | Token-matched fill |

---

## 18 message types

| # | Type | Colour family | Icon context |
|---|---|---|---|
| 1 | Message Type 17 | Blue (info) | General info |
| 2 | Error | Red | System error |
| 3 | Message Type 16 | Blue | Alternate info |
| 4 | Decline | Red | Declined action |
| 5 | Failed | Red | Operation failed |
| 6 | Warning | Amber | Caution/warning |
| 7 | Security | Amber | Security alert |
| 8 | Caution | Amber | Soft caution |
| 9 | Downloading | Blue | Download progress |
| 10 | General | Neutral grey | General message |
| 11 | Eye | Neutral | Visibility/privacy |
| 12 | Message | Neutral | New message |
| 13 | Uploading | Blue + progress bar | Upload in progress |
| 14 | Settings | Neutral | Settings changed |
| 15 | Successful | Green | Success |
| 16 | Add | Green | Item added |
| 17 | Activated | Green | Feature activated |
| 18 | Question | Neutral | Confirmation needed |

---

## Colour sets per family

| Family | Background | Border | Title colour |
|---|---|---|---|
| Green (success) | `var(--semantic-success-lite-fill)` | `var(--semantic-success-lite-primary)` | `var(--semantic-success-lite-primary)` |
| Red (error) | `var(--semantic-error-lite-fill)` | `var(--semantic-error-stroke)` | `var(--semantic-error-fill)` |
| Amber (warning) | `var(--semantic-caution-lite-fill)` | `var(--semantic-caution-bold-line)` | `var(--semantic-caution-lite-primary)` |
| Blue (info) | `var(--semantic-blue-bold-primary)` | `var(--semantic-blue-lite-line)` | `var(--semantic-blue-lite-primary)` |
| Neutral | `var(--semantic-primary-neutral-fill)` | `var(--semantic-primary-neutral-line)` | `var(--text-primary)` |

---

## Timing

| Behaviour | Duration |
|---|---|
| Auto-dismiss (success, info) | 5000ms |
| Auto-dismiss (error) | 8000ms — longer for user to read |
| In-progress toasts (uploading, downloading) | Persist until action complete |
| Confirmation-needed | Persist until user action |
| Enter animation | 250ms ease-out — slide in from right |
| Exit animation | 200ms ease-in — slide out to right, fade |

---

## Implementation

```html
<div
  class="toast toast--success"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  <img src="[success-icon]" alt="" aria-hidden="true" class="toast__icon" width="24" height="24" />
  <div class="toast__content">
    <p class="toast__title">Card activated successfully</p>
    <p class="toast__body">Your new card is ready to use.</p>
  </div>
  <button type="button" class="toast__close" aria-label="Dismiss notification">
    <img src="[close-icon]" alt="" aria-hidden="true" width="20" height="20" />
  </button>
</div>
```

```css
.toast {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 329px;
  min-height: 120px;
  padding: 16px;
  border: 1px solid;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: flex-start;
  gap: var(--space-m);
  z-index: 9000;
  animation: toast-in var(--motion-modal) var(--motion-easing-out);
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(100%); }
  to   { opacity: 1; transform: translateX(0); }
}

.toast--success {
  background: var(--semantic-success-lite-fill);
  border-color: var(--semantic-success-lite-primary);
}
.toast--error {
  background: var(--semantic-error-lite-fill);
  border-color: var(--semantic-error-stroke);
}
.toast--warning {
  background: var(--semantic-caution-lite-fill);
  border-color: var(--semantic-caution-bold-line);
}
.toast--info {
  background: var(--semantic-blue-bold-primary);
  border-color: var(--semantic-blue-lite-line);
}
.toast--neutral {
  background: var(--semantic-primary-neutral-fill);
  border-color: var(--semantic-primary-neutral-line);
}

.toast__icon { flex-shrink: 0; }
.toast__content { flex: 1; min-width: 0; }
.toast__title {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 4px;
}
.toast__body {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: var(--text-paragraph);
  margin: 0;
}
.toast__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}
.toast__close:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: 4px; }
```

---

## Accessibility
- `role="alert"` + `aria-live="assertive"` for error toasts
- `role="status"` + `aria-live="polite"` for success/info toasts
- `aria-atomic="true"` so the full message is read when it appears
- Close button needs `aria-label="Dismiss notification"`
- Never auto-dismiss error toasts — user must acknowledge


---
<!-- FILE: core/feedback/TOOLTIPS.md -->

# Tooltips
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Contextual help text appearing on hover/focus. 12 position variants.

---

## Figma source
[Core Design System — Tooltips](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=19095-157975&m=dev)

Component: `🟢-Tooltips-CP` · Node: `19095:157975`

---

## 12 variants

4 positions × 3 tag positions (A, C, D) = 12 variants.

| Position | Tag Position A | Tag Position C | Tag Position D |
|---|---|---|---|
| Top | `19095:157983` | `19095:157990` | `19095:157976` |
| Bottom | `19095:158011` | `19095:158004` | `19095:157997` |
| Right | `19095:158025` | `19095:158053` | `19095:158039` |
| Left | `19095:158046` | `19095:158032` | `19095:158018` |

Tag position controls which side of the tooltip container the arrow appears on (start, centre, end of that edge).

---

## Dimensions

| Property | Value |
|---|---|
| Width | Up to 354px |
| Vertical height (Top/Bottom) | 112px |
| Horizontal height (Left/Right) | 100px |
| Background | `var(--semantic-primary-bold-fill)` #4f4ddb |
| Text colour | `var(--semantic-primary-bold-primary)` #fafaff |
| Border-radius | `var(--radius-xs)` 12px |
| Arrow | 8×8px rotated square, same bg |
| Padding | 12px 16px |
| Font | `Label/L5-400` — 14px Regular |
| Show delay | 300ms |
| Hide delay | 100ms |

---

## Implementation

```html
<!-- Trigger element -->
<button type="button" class="tooltip-trigger"
  aria-describedby="tooltip-abn-help">
  ABN
  <img src="[info-icon]" alt="" aria-hidden="true" width="14" height="14" />
</button>

<!-- Tooltip -->
<div id="tooltip-abn-help" role="tooltip" class="tooltip tooltip--bottom">
  Your Australian Business Number. Enter all 11 digits without spaces.
  <div class="tooltip__arrow"></div>
</div>
```

```css
.tooltip {
  position: absolute;
  max-width: 354px;
  padding: 12px 16px;
  background: var(--semantic-primary-bold-fill);
  color: var(--semantic-primary-bold-primary);
  border-radius: var(--radius-xs);
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 22px;
  z-index: 8000;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--motion-hover) var(--motion-easing-out);
}
.tooltip.is-visible { opacity: 1; }

/* Arrow */
.tooltip__arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--semantic-primary-bold-fill);
  transform: rotate(45deg);
}
.tooltip--top    .tooltip__arrow { bottom: -4px; left: 50%; transform: translateX(-50%) rotate(45deg); }
.tooltip--bottom .tooltip__arrow { top: -4px;    left: 50%; transform: translateX(-50%) rotate(45deg); }
.tooltip--right  .tooltip__arrow { left: -4px;   top: 50%;  transform: translateY(-50%) rotate(45deg); }
.tooltip--left   .tooltip__arrow { right: -4px;  top: 50%;  transform: translateY(-50%) rotate(45deg); }
```

---

## Accessibility
- `role="tooltip"` on the tooltip container
- `aria-describedby="[tooltip-id]"` on the trigger element
- Never put interactive content (links, buttons) inside a tooltip
- Tooltip content must also be available another way — never the only source of required information


---
<!-- FILE: core/feedback/MODALS-OVERLAYS.md -->

# Modals & Overlays
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Modal dialogs, confirmation patterns, and bottom sheets.

---

## Figma sources
- Business confirmation modal: [Core Design System — screens](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=28138-16505&m=dev) (node `5:18898`)
- Bottom sheet (wallet remove card): [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-36698&m=dev)

---

## Modal (Dialog)

Used for: ABN verification, account confirmations, warnings requiring acknowledgement.

| Property | Value |
|---|---|
| Max-width | 480px (desktop) / full-width–32px (mobile) |
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border | 1px `var(--semantic-primary-neutral-line)` |
| Border-radius | `var(--radius-2xl)` 32px |
| Padding | `var(--space-xl)` 32px |
| Backdrop | `var(--overlay-bold)` rgba(68,72,81,0.25) |
| Enter animation | 250ms ease-out — scale from 0.96 + fade |
| Exit animation | 200ms ease-in — reverse |

### Structure

```
┌──────────────────────────────┐
│  Modal Title                 │  h2, text-header, Label/L2-500 24px
│  Optional subtitle           │  text-paragraph, 14px
│                              │
│  Content body                │
│                              │
│  [Cancel]    [Confirm]       │  Action strip, right-aligned
└──────────────────────────────┘
```

### Implementation

```html
<div class="modal-backdrop" role="presentation"></div>

<div
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title" class="modal__title">Confirm your business details</h2>
  <p id="modal-desc" class="modal__subtitle">Please review before continuing.</p>

  <div class="modal__body">
    <!-- content -->
  </div>

  <div class="modal__actions">
    <button type="button" class="btn-secondary btn-secondary--m">Cancel</button>
    <button type="button" class="btn-primary btn-primary--m">Confirm</button>
  </div>
</div>
```

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--overlay-bold);
  z-index: 9100;
  animation: fade-in var(--motion-modal) var(--motion-easing-out);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 480px;
  background: var(--semantic-primary-neutral-fill);
  border: 1px solid var(--semantic-primary-neutral-line);
  border-radius: var(--radius-2xl);
  padding: var(--space-xl);
  z-index: 9200;
  animation: modal-in var(--motion-modal) var(--motion-easing-out);
}

@keyframes modal-in {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal__title {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: var(--text-header);
  margin: 0 0 var(--space-3xs);
}
.modal__subtitle {
  font-size: 14px;
  color: var(--text-paragraph);
  margin: 0 0 var(--space-l);
}
.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-xs);
  margin-top: var(--space-l);
}
```

---

## Bottom Sheet

Used for: Remove card confirmation, receipt options, card blocking.

| Property | Value |
|---|---|
| Position | Fixed bottom, full viewport width |
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border-radius | `var(--radius-2xl)` 32px on top corners only |
| Padding | `var(--space-xl)` 32px |
| Backdrop | `var(--overlay-lite)` rgba(181,184,189,0.25) |
| Enter | 250ms ease-out — slide up from bottom |
| Exit | 200ms ease-in — slide down |
| Max-width | 600px centred on desktop; full-width on mobile |

### Button layout in bottom sheet
- Single action: full-width Primary
- Two actions: Primary full-width on top, Secondary full-width below
- Three actions (DX receipt): Primary + 2 Secondaries, all full-width, stacked

```html
<div
  class="bottom-sheet"
  role="dialog"
  aria-modal="true"
  aria-labelledby="sheet-title"
>
  <h2 id="sheet-title" class="modal__title">Remove this card?</h2>
  <p class="modal__subtitle">This can't be undone.</p>

  <div class="sheet-actions">
    <button type="button" class="btn-primary btn-primary--l btn-primary--full">Remove Card</button>
    <button type="button" class="btn-secondary btn-secondary--l btn-secondary--full">Cancel</button>
  </div>
</div>
```

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  background: var(--semantic-primary-neutral-fill);
  border-top-left-radius: var(--radius-2xl);
  border-top-right-radius: var(--radius-2xl);
  padding: var(--space-xl);
  z-index: 9200;
  animation: sheet-in var(--motion-modal) var(--motion-easing-out);
}

@keyframes sheet-in {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

.sheet-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  margin-top: var(--space-l);
}
```

---

## Accessibility
- `role="dialog"` + `aria-modal="true"` on the modal/sheet container
- `aria-labelledby` pointing to the title element
- Focus trapped inside modal when open — first focusable element receives focus on open
- `Escape` key closes the modal and returns focus to the triggering element
- Backdrop click closes the modal
- Never remove the close/cancel option


---
<!-- FILE: core/data/TABLES.md -->

# Tables & Data Display
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Table SKILL](../../skills/SKILL-TABLE.md)

> Reference spec for all table types. For implementation (HTML + CSS + ARIA), use `skills/SKILL-TABLE.md`.

---

## Figma sources

| Component | Link |
|---|---|
| Table components | [Core DS — Tables](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27998-184695&m=dev) |
| Table cells (11 types) | [Core DS — Cells](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27995-18448&m=dev) |
| Empty states | [Core DS — EndList](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27995-22010&m=dev) |
| Pagination | [Core DS — Pagination](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=27998-184694&m=dev) |
| Bill History example | [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=115-20526&m=dev) |

---

## Table types

| Type | Rows expand? | Use |
|---|---|---|
| Daily Settlements | ✅ | Daily settlement records |
| Monthly Settlements | ✅ | Monthly summaries |
| Annual Settlements | ✅ | Annual summaries |
| Transaction | ❌ (date groups instead) | Transaction log |
| QBR | ❌ | Quarterly business review |
| Generic | Optional | Bill history, payees, custom data |

---

## Container

| Property | Value |
|---|---|
| Background | `var(--semantic-primary-neutral-fill)` |
| Border | 1px `var(--semantic-primary-neutral-line)` |
| Border-radius | `var(--radius-2xl)` 32px |
| Padding top | `var(--space-l)` 24px |
| Padding bottom | `var(--space-m)` 16px |

---

## Cell types (11 variants)

| Type | Height | Description |
|---|---|---|
| `Header` | 32px | Column label — grey text, no border |
| `Cell` | 64px | Text / amount — uppercase, tight line-height |
| `Status` | 64px | Status badge (Approved, Pending etc.) |
| `Product` | 64px | Product type badge (Terminal, LiveTap etc.) |
| `Scheme` | 64px | Payment scheme card (Visa, MC) — 58×40px card |
| `View More` | 64px | Secondary button → "View More →" |
| `More actions` | 64px | Secondary button (same visual, different context) |
| `View actions` | 64px | Single FAB icon button |
| `Multi icon` | 64px | 2–3 FAB buttons (edit / delete / more) |
| `More actions small` | 64px | Single dots FAB — 78px column width |
| `Download` | 64px | Secondary button → "Download ↓" |

**Cell dimensions:** min-width 200px · max-width 256px · padding 16px

---

## Empty states (7 types)

Always show the correct type — never leave a blank table.

| Type | When |
|---|---|
| Loader | Data is fetching |
| First-Time User | No transactions ever |
| No Recent Transactions | Has history, nothing recent |
| No Transactions on Filtering | Filter returned nothing |
| No Transactions on Search | Search returned nothing |
| No Transactions on Search and Filtering | Both active, no results |
| Types4 | End of list / no more results |

---

## Pagination

| State | Background | Border | Shadow |
|---|---|---|---|
| Default | `var(--semantic-primary-neutral-fill)` | `var(--semantic-primary-neutral-line)` | None |
| Active/current | `var(--semantic-primary-lite-fill)` | `var(--semantic-primary-bold-line)` | `var(--focus-ring)` |

Button size: 40×40px · Gap: 8px · Border-radius: `var(--radius-xs)` 12px

---

## Responsive behaviour

| Breakpoint | Layout |
|---|---|
| Desktop (1200px+) | Full column set |
| Tablet (660–1199px) | Reduced columns |
| Mobile (<660px) | Horizontal scroll — first column sticky. **Never reflow to cards.** |

---

## Expander pattern

- Expander column: always 56px wide
- Rows without expander use `Expander-Indicater-Spacer` (56×64px blank zone) to maintain alignment
- States: Closed (chevron right) / Open (chevron down) / Skeleton (loading)


---
<!-- FILE: core/navigation/SIDE-NAV.md -->

# Side Navigation
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Navigation SKILL](../../skills/SKILL-NAVIGATION.md)

> Reference spec for portal sidebar, topbar, and BP-Menu-Section. For implementation (HTML + CSS + ARIA), use `skills/SKILL-NAVIGATION.md`.

---

## Figma sources
- DX nav collapsed: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev) · node `23:69787`
- DX nav expanded: node `23:69815`
- Bill history shell: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=115-20526&m=dev)

---

## Navigation variants

| Context | Pattern |
|---|---|
| Portal / DX desktop | Sidebar (80px collapsed / 260px expanded) + topbar |
| Live Bill Pay onboarding | BP-Menu-Section (top on ≥660px, bottom on <660px) |
| DX mobile / Live Tap | Bottom nav bar — see `core/navigation/MOBILE-NAV.md` |

---

## Sidebar

### Collapsed (default — 80px)

| Property | Value |
|---|---|
| Width | 80px |
| Background | `var(--semantic-primary-neutral-fill)` |
| Border right | 1px `var(--semantic-primary-neutral-line)` |
| Top zone (org button) | 80px tall, border bottom |
| Nav item size | 64×64px, centred |
| Expand trigger | Click or hover |
| Transition | `width 200ms ease-out` |

### Expanded (260px)

| Property | Value |
|---|---|
| Width | 260px |
| Nav item | 64px tall, icon + label |
| Label font | 12px Regular — `var(--text-primary)` |
| Label appears | Fade in on expand |

### Nav item states

| State | Background | Colour |
|---|---|---|
| Default | None | `var(--semantic-primary-neutral-primary)` |
| Hover | `var(--semantic-primary-lite-fill)` | Same |
| Active | `var(--semantic-primary-lite-fill)` | `var(--semantic-primary-bold-fill)` |

---

## Topbar (Main-Menu-Section)

| Property | Value |
|---|---|
| Height | 80px |
| Background | `var(--semantic-primary-neutral-fill)` |
| Border bottom | 1px `var(--semantic-primary-neutral-line)` |
| Right: notification button | 56×56px circle |
| Right: avatar | 56×56px circle |
| Gap between right actions | 8px |

---

## Portal page shell

```
┌─────────────────────────────────────────┐
│  Topbar 80px               [🔔] [👤]   │
├──────┬──────────────────────────────────┤
│ Nav  │  Content area                   │
│ 80px │  padding: 24px                  │
│ or   │  background: #f9f9f9            │
│ 260px│  h1 colour: var(--text-header)  │
└──────┴──────────────────────────────────┘
```

Content max-width at 1536px with collapsed nav: 1456px.

---

## BP-Menu-Section (Bill Pay onboarding)

Onboarding uses a custom menu bar — not the sidebar.

| Breakpoint | Position |
|---|---|
| ≥660px | Top of page |
| <660px | Bottom of page |

---

## Accessibility requirements

- Skip link `<a href="#main-content">` as first element on page
- `<header>`, `<nav aria-label="Main navigation">`, `<main id="main-content">`
- Active item: `aria-current="page"` on the `<a>` element
- Icon-only nav items: `aria-label` on the link, icon `aria-hidden="true"`
- Sidebar toggle button: `aria-expanded="true/false"`, `aria-label`


---
<!-- FILE: core/navigation/MOBILE-NAV.md -->

# Mobile Navigation
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Navigation SKILL](../../skills/SKILL-NAVIGATION.md)

> Bottom navigation bar and slide-out drawer for mobile products (DX, Live Tap).

---

## Figma sources
- DX Home (Menu Bar): [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev)
- Live Tap navigation: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=30-13527&m=dev)

Component: `🟢-Menu-Bar-CP`

---

## Bottom navigation bar

Used in DX and Live Tap as the primary navigation on mobile.

| Property | Value |
|---|---|
| Height | 72px (content) + safe area inset |
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border top | 1px `var(--semantic-primary-neutral-line)` #d1d2d5 |
| Position | Fixed, bottom-0, full width |
| Icon size | 24px |
| Nav items | 4–5 items max |

### Nav item states

| State | Icon colour | Label colour | Indicator |
|---|---|---|---|
| Default | `var(--text-muted)` #9599a2 | `var(--text-muted)` | None |
| Active | `var(--semantic-primary-bold-fill)` #4f4ddb | `var(--text-header)` #3a2db8 | Purple underline dot or filled bg |

### Nav items (DX product)

Home · Pay Bill · My Payees · Wallet · History · Rewards

### Nav items (Live Tap product)

Home · Transactions · Profile

---

## Implementation

```html
<nav class="mobile-nav" aria-label="Main navigation">
  <ul class="mobile-nav__list" role="list">
    <li class="mobile-nav__item">
      <a href="/home" class="mobile-nav__link mobile-nav__link--active"
        aria-current="page">
        <img src="[home-icon]" alt="" aria-hidden="true"
          class="mobile-nav__icon" width="24" height="24" />
        <span class="mobile-nav__label">Home</span>
      </a>
    </li>
    <li class="mobile-nav__item">
      <a href="/wallet" class="mobile-nav__link">
        <img src="[wallet-icon]" alt="" aria-hidden="true"
          class="mobile-nav__icon" width="24" height="24" />
        <span class="mobile-nav__label">Wallet</span>
      </a>
    </li>
    <li class="mobile-nav__item">
      <a href="/history" class="mobile-nav__link">
        <img src="[history-icon]" alt="" aria-hidden="true"
          class="mobile-nav__icon" width="24" height="24" />
        <span class="mobile-nav__label">History</span>
      </a>
    </li>
  </ul>
</nav>
```

```css
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: var(--semantic-primary-neutral-fill);
  border-top: 1px solid var(--semantic-primary-neutral-line);
  z-index: 1000;
  /* Account for iOS safe area */
  padding-bottom: env(safe-area-inset-bottom);
}

.mobile-nav__list {
  display: flex;
  align-items: stretch;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-nav__item { flex: 1; }

.mobile-nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 100%;
  text-decoration: none;
  color: var(--text-muted);
  transition: color var(--motion-hover) var(--motion-easing-out);
}

.mobile-nav__link--active {
  color: var(--text-header);
}

.mobile-nav__icon { flex-shrink: 0; }

.mobile-nav__label {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.mobile-nav__link--active .mobile-nav__label {
  font-weight: 500;
  color: var(--text-header);
}

.mobile-nav__link:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-radius: 8px;
}
```

---

## Breakpoint — menu position

Live Bill Pay BP-Menu-Section moves based on viewport width:
- 660px and above: menu at top of screen
- Below 660px: menu anchored to bottom

---

## Accessibility
- Wrap in `<nav aria-label="Main navigation">`
- Active item: `aria-current="page"` on the active link
- Icons: `aria-hidden="true"` — label provides the accessible name
- Minimum 44×44px tap target per item (height 72px ÷ each item naturally meets this)


---
<!-- FILE: product/portal/PORTAL-SHELL.md -->

# Portal Shell
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md) · [← Navigation SKILL](../../skills/SKILL-NAVIGATION.md)

> Full portal page layout — sidebar + topbar + content area. The structural shell for all desktop portal screens.

---

## Figma sources
- DX navigation (collapsed): [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev) · node `23:69787`
- DX navigation (expanded): [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev) · node `23:69815`
- Bill history (full shell): [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=115-20526&m=dev)

---

## Shell anatomy

```
┌─────────────────────────────────────────────────────┐
│  Topbar (80px)                          [🔔] [👤]   │  Main-Menu-Section
├──────┬──────────────────────────────────────────────┤
│      │                                              │
│ Nav  │  Content area                               │
│      │  padding: 24px                              │
│ 80px │                                             │
│ or   │  Page title (Header Section, L)             │
│ 260px│                                             │
│      │  ┌────────────────────────────────────┐     │
│      │  │ Level 1 section card               │     │
│      │  │  ┌──────────────────────────────┐  │     │
│      │  │  │ Level 2 body card            │  │     │
│      │  │  └──────────────────────────────┘  │     │
│      │  └────────────────────────────────────┘     │
└──────┴──────────────────────────────────────────────┘
```

---

## Topbar (`Main-Menu-Section`)

[Full specification → core/navigation/SIDE-NAV.md](../navigation/SIDE-NAV.md)

| Property | Value |
|---|---|
| Height | 80px |
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border bottom | 1px `var(--semantic-primary-neutral-line)` #d1d2d5 |
| Right side | Notification bell (XL, 56px) + Avatar (XL, 56px) |
| Gap between actions | 8px |
| Right padding | 16px (`var(--space-m)`) |

---

## Sidebar

Two variants — collapsed and expanded.

### Collapsed (default)

| Property | Value |
|---|---|
| Width | 80px |
| Background | `var(--main-primary-neutral-fill-l1)` white |
| Border right | 1px `var(--semantic-primary-neutral-line)` |
| Top zone | 80px — org logo/button centred |
| Nav items | 64×64px each, icon-only |
| Expand trigger | Click or hover icon |

### Expanded

| Property | Value |
|---|---|
| Width | 260px |
| Transition | `width var(--motion-medium) var(--motion-easing-out)` |
| Nav items | 64px tall, icon + label |
| Label font | `Label/L6-400` — 12px Regular, `var(--text-primary)` |

### Nav item states (sidebar)

| State | Background | Icon colour |
|---|---|---|
| Default | None | `var(--text-primary)` |
| Hover | `var(--semantic-primary-lite-fill)` | `var(--text-primary)` |
| Active/current | `var(--semantic-primary-lite-fill)` 24px radius pill | `var(--semantic-primary-bold-fill)` |

---

## Content area

| Property | Value |
|---|---|
| Padding | 24px (`var(--space-l)`) all sides |
| Background | Page-level background (light grey or `#f9f9f9`) |
| Scroll | Vertical scroll within content area |
| Max content width | 1456px (at 1536px viewport with 80px nav) |

---

## Breakpoints

| Viewport | Nav width | Content width |
|---|---|---|
| 1536px | 80px collapsed / 260px expanded | 1456px / 1276px |
| 1200px | 80px collapsed / 260px expanded | 1120px / 940px |
| 660px | Mobile: nav hidden, bottom bar | Full width |
| 360px | Mobile: nav hidden, bottom bar | Full width |

---

## Implementation

```html
<div class="portal-shell">
  <!-- Topbar -->
  <header class="portal-topbar">
    <div class="portal-topbar__actions">
      <button type="button" class="portal-topbar__btn" aria-label="Notifications">
        <span class="notification-badge">32</span>
        <img src="[bell-icon]" alt="" aria-hidden="true" width="24" height="24" />
      </button>
      <div class="avatar avatar--xl">
        <img src="[user-photo]" alt="Matthew Chen" class="avatar__img" />
      </div>
    </div>
  </header>

  <!-- Sidebar -->
  <nav class="portal-sidebar" aria-label="Main navigation" data-expanded="false">
    <div class="portal-sidebar__org">
      <!-- org logo button -->
    </div>
    <div class="portal-sidebar__items">
      <a href="/home" class="sidebar-item sidebar-item--active" aria-current="page">
        <img src="[home-icon]" alt="" aria-hidden="true" width="24" height="24" />
        <span class="sidebar-item__label">Home</span>
      </a>
      <a href="/transactions" class="sidebar-item">
        <img src="[tx-icon]" alt="" aria-hidden="true" width="24" height="24" />
        <span class="sidebar-item__label">Transactions</span>
      </a>
    </div>
  </nav>

  <!-- Content -->
  <main class="portal-content" id="main-content">
    <!-- Page content here -->
  </main>
</div>
```

```css
.portal-shell {
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 80px 1fr;
  grid-template-areas:
    "topbar topbar"
    "sidebar content";
  height: 100vh;
  overflow: hidden;
}

.portal-topbar {
  grid-area: topbar;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 var(--space-m);
  background: var(--semantic-primary-neutral-fill);
  border-bottom: 1px solid var(--semantic-primary-neutral-line);
  z-index: 100;
}

.portal-topbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
}

.portal-sidebar {
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  width: 80px;
  background: var(--main-primary-neutral-fill-l1);
  border-right: 1px solid var(--semantic-primary-neutral-line);
  overflow: hidden;
  transition: width var(--motion-medium) var(--motion-easing-out);
}

.portal-sidebar[data-expanded="true"] { width: 260px; }

.portal-sidebar__org {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid var(--semantic-primary-neutral-line);
  flex-shrink: 0;
}

.portal-sidebar__items {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-3xs) 0;
  flex: 1;
}

.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  text-decoration: none;
  color: var(--text-primary);
  transition: background var(--motion-hover) var(--motion-easing-out);
}
.sidebar-item:hover { background: var(--semantic-primary-lite-fill); }
.sidebar-item--active {
  background: var(--semantic-primary-lite-fill);
  color: var(--semantic-primary-bold-fill);
}
.sidebar-item:focus-visible { outline: none; box-shadow: var(--focus-ring); }

.sidebar-item__label {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  transition: opacity var(--motion-medium) var(--motion-easing-out);
}
.portal-sidebar[data-expanded="true"] .sidebar-item__label { opacity: 1; }

.portal-content {
  grid-area: content;
  padding: var(--space-l);
  overflow-y: auto;
  background: var(--main-primary-neutral-fill-l2);
}
```

---

## Accessibility
- Topbar: `<header>` element
- Sidebar: `<nav aria-label="Main navigation">`
- Content: `<main id="main-content">`
- Skip link: Add `<a href="#main-content" class="skip-link">Skip to main content</a>` as first element
- Active nav item: `aria-current="page"` on the link


---
<!-- FILE: product/portal/PORTAL-DASHBOARD.md -->

# Portal Dashboard
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Dashboard layout patterns — card grid, metric chips, and the new feature popup pattern.

---

## Figma source
[Design System MD — Dashboard](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-34584&m=dev)

Screens: Dashboard with new feature popup (node `5:34585`), Complete Setup mobile (node `5:45476`)

---

## Dashboard structure

The portal dashboard always follows the 3-level card nesting system from [CARDS.md](../../core/display/CARDS.md).

```
Content area (padding 24px)
  ├── Header Section (L, Left) — page title
  └── Card grid
      ├── Level 1 section (feature card)
      │   ├── Section header + "View all" link
      │   └── Level 2 body cards (the data)
      │       └── Level 3 metric chips
      ├── Level 1 section (transactions)
      │   └── Level 2 body card (table or list)
      └── (additional sections...)
```

---

## Grid layout

| Viewport | Columns | Column width | Gap |
|---|---|---|---|
| 1536px | 2 cols or flexible | ~700px each | 24px |
| 1200px | 2 cols or flexible | ~560px each | 24px |
| 660px | 1 col | Full width | 16px |
| 360px | 1 col | Full width | 16px |

---

## Dashboard cards

### Today at a glance (hero)

Full-width Level 1 hero card (`--semantic-primary-bold-fill` purple) containing:
- Left: Level 2 white body card with metric chips
- Right: summary stats
- Primary chip for active counts
- Last updated timestamp: `Label/L6-400` 12px, `--text-label`

### Transaction summary cards

Compact Level 1 section cards containing a Level 2 card with:
- Card heading: `Label/L3-500` 18px, `--text-header`
- Metric value: `Heading/H6-Bold` 20px SemiBold
- "View all" link: `--btn-link` pattern from [LINK-BUTTON.md](../../core/buttons/LINK-BUTTON.md)
- Status chip: matches transaction state (Approved → green, Pending → amber)

### Refund cards

Right-aligned. Contains:
- Card title
- Refund amount in red (`--semantic-error-fill`)
- Status badge (Refund type)
- "View More" secondary button in table cell format

---

## New feature popup

A floating card that appears over the dashboard to announce new features.

| Property | Value |
|---|---|
| Position | Overlaid on dashboard (not a modal — no backdrop) |
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border | 1px `var(--semantic-primary-neutral-line)` |
| Border-radius | `var(--radius-2xl)` 32px |
| Padding | `var(--space-l)` 24px |
| Dismiss | Link button or X button — closes and stores dismissal |
| Label | "New Feature" badge using `badge--blue` from [BADGES-STATUS.md](../../core/display/BADGES-STATUS.md) |

---

## Complete setup state (mobile)

When a merchant hasn't finished onboarding:

- Banner card at top of dashboard (Level 1, amber/caution styling)
- Body text: explains what's remaining
- Primary CTA: "Complete setup"
- Transaction views show as skeleton/placeholder beneath
- FAB button for supplementary icon actions

```
Tokens:
--semantic-caution-lite-fill    banner background
--semantic-caution-bold-line    banner border
--semantic-caution-lite-primary banner text
```

---

## Dashboard-specific rules

1. Never show more than 6 metric chips in one Level 2 card — split into two cards if needed
2. "View all" links always appear in the top-right of the Level 2 card header
3. Transaction lists on dashboard show maximum 5 rows — full list lives on a dedicated table screen
4. Loading state: all Level 2 cards show skeleton rows (`background: linear-gradient...` shimmer)
5. The purple hero card always appears first if present — never mid-page


---
<!-- FILE: product/portal/PORTAL-ONBOARDING.md -->

# Portal Onboarding (Bill Pay)
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Live Bill Pay multi-step onboarding flow — Business Details → Identity → Review & Confirm.

---

## Figma source
[Design System MD — Bill Pay Onboarding](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=5-28773&m=dev)

Screens: Review & Confirm Desktop (`5:18704`), Review & Confirm Mobile (`5:18709`), Find Business Desktop (`23:70121`), Find Business Mobile (`23:70132`), Identity Step (`5:18831`), Industry Dropdown (`5:18873`), Business Verification Popup (`5:18898`)

---

## Flow overview

```
Step 1: Find Your Business    →  Step 2: Identity    →  Step 3: Review & Confirm
  ABN search                     Upload/select doc       Show all collected data
  BP-Menu-Section                Drivers licence          Back + Confirm actions
  Module (760px max)             Dropdown selector        Progress bar: step 3
```

---

## BP-Menu-Section (onboarding nav)

The Bill Pay onboarding uses a custom menu bar (`BP-Menu-Section`) instead of the portal sidebar.

| Viewport | Position |
|---|---|
| 1536px, 1200px | Top of page |
| 660px | Top of page |
| 360px | Bottom of page |

---

## Module (content container)

The `Module` component is the centred content container for onboarding steps.

| Property | Value |
|---|---|
| Max-width | 760px |
| Horizontal alignment | Centred in viewport |
| Background | `var(--semantic-primary-neutral-fill)` white |
| Border | 1px `var(--semantic-primary-neutral-line)` |
| Border-radius | `var(--radius-2xl)` 32px |
| Padding | `var(--space-xl)` 32px |

---

## Progress bar position

Always at the top of the Module, spanning its full width. Current step highlights in purple (`--progress-active`). See [PROGRESS-BAR.md](../../core/forms/PROGRESS-BAR.md) for full spec.

---

## Step 1 — Find Your Business

- ABN search input (full module width)
- Secondary "Search" button — triggers business lookup
- "Is This Your Business?" confirmation popup on match (modal pattern)

### Business confirmation popup

| Property | Value |
|---|---|
| Component | `Card-verify-popup` |
| Background | White |
| Border-radius | `var(--radius-2xl)` |
| Content | `🟢-Header-Section-CP` + `🟢-List-Content` rows |
| Actions | Action strip: Cancel + Confirm |

List-Content rows: Label/L5-400 left, value right, 1px bottom divider.

---

## Step 2 — Identity

- Dropdown: document type selector (Drivers Licence, Passport)
- Card-responsive: document details form
- Progress bar: step 2 active
- Action strip: Back + Next

---

## Step 3 — Review & Confirm

Three summary cards shown:
1. Business details card — with "Edit" link (Link Button)
2. Owner details card — with "Edit" link
3. Identity document card — with "Edit" link

Each card uses Level 2 styling. Edit link uses `btn-link` style.

Action strip: **Back** (secondary) left + **Confirm** (primary) right.

Mobile: Primary button full-width at bottom, secondary full-width above.

---

## Responsive behaviour

| Breakpoint | Module width | Changes |
|---|---|---|
| 1536px | 760px centred | Full layout |
| 1200px | 760px centred | Full layout |
| 660px | Full width – 32px | Cards stack |
| 360px | Full width – 32px | Primary button full-width, menu moves to bottom |

---

## Tokens used

```css
--semantic-primary-neutral-fill    /* module background */
--semantic-primary-neutral-line    /* module border */
--radius-2xl                       /* module radius — 32px */
--space-xl                         /* module padding — 32px */
--text-header                      /* step titles */
--progress-fill                    /* progress bar fill */
--progress-active                  /* active step indicator */
```


---
<!-- FILE: product/dx/DX-OVERVIEW.md -->

# DX Product Overview
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> DX driver experience — mobile-first payment terminal app with desktop portal view.

---

## Figma sources
- DX Home 360px: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev) · node `23:69829`
- DX Home 393px (iPhone): [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev) · node `23:69982`
- DX Nav Desktop Collapsed: node `23:69787`
- DX Nav Desktop Expanded: node `23:69815`
- DX Final Design 1536px: node `23:69707`
- DX Final Design 660px: node `23:69733`

---

## Products in scope

DX spans two distinct contexts that share the same component library:

| Context | Primary viewport | Navigation |
|---|---|---|
| Driver mobile app | 360px, 393px | Bottom nav bar (`🟢-Menu-Bar-CP`) |
| Merchant portal | 1536px, 1200px | Collapsed/expanded sidebar |

---

## Mobile home screen

The DX mobile home shows:
1. **Device chrome** — `🟢-Device-Top-Strip-CP` status bar at top
2. **Bonus Points card** — Level 1 hero card, Primary button CTA
3. **Driver card carousel** — `card-component` with horizontal scroll
4. **Bottom menu bar** — `🟢-Menu-Bar-CP` fixed bottom

### Bonus Points card

| Property | Value |
|---|---|
| Type | Level 1 hero (purple bg) or Level 1 standard |
| Contains | Points balance metric, Primary "View Points" button, Secondary chip |
| Secondary chip | `Secondary-Chip` — shows current tier/balance |
| CTA | Primary button (M size) — `var(--semantic-primary-bold-fill)` |

### Device top strip

| Property | Value |
|---|---|
| Component | `🟢-Device-Top-Strip-CP` |
| Height | ~44px (iPhone notch-safe area) |
| Background | Matches page/card below |
| Contains | Time, signal, battery icons |

---

## Keypad / Payment entry

The payment keypad overlays the home screen when a transaction is initiated.

- Hidden by default — toggled on
- 4×3 grid (12 keys)
- Amount display: `🟢-Amount-Input-Display-CP` with `🟢-Payment-Digit-CP` components
- `🟢-Transaction-Input-CP` shows payment total and type above the keypad
- See [KEYPAD.md](../../core/forms/KEYPAD.md) for full spec

---

## Desktop portal view

Two nav variants:

### Collapsed (80px)
- Icon rail on left
- `🟢-Titelline-CP` below topbar (page section label)
- Transaction table fills content area
- Info draw + options menu available as overlays

### Expanded (260px)
- Full navigation labels visible
- `Navigation-Draws-Desktop` component

---

## DX Final Design sections

The complete DX dashboard has:
1. Right panel (329px) — summary stats, quick actions
2. Header frame — `Frame 41124448`
3. 4 main content sections
4. USP sections in sub-columns
5. At 660px: USP sections overflow horizontally (5 items in a row)

---

## Breakpoints

| Viewport | Layout | Nav |
|---|---|---|
| 1536px | Desktop: sidebar + full content | Sidebar (collapsed/expanded) |
| 660px | Tablet: content stacked, horizontal USP scroll | None (mobile pattern) |
| 393px | iPhone 14 Pro full device chrome | Bottom bar |
| 360px | Android standard | Bottom bar |
| 320px | Small mobile | Bottom bar, compressed |

---

## Tokens and components

```css
/* All standard tokens apply — see core/TOKENS.md */
/* DX-specific additions: */
--semantic-primary-bold-fill     /* Bonus Points hero card bg */
--semantic-primary-lite-fill     /* Driver card card bg */
--text-header                    /* all card/section headings */
```

Components used: `🟢-Primary-Button-CP`, `🟢-Fab-[Link]-CP`, `🟢-Menu-Bar-CP`, `🟢-Device-Top-Strip-CP`, `Secondary-Chip`, `card-component`, `🟢-Transaction-Info-Draw-CP`


---
<!-- FILE: product/live-tap/LIVETAP-OVERVIEW.md -->

# Live Tap Product Overview
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> Live Tap — mobile payment terminal app for drivers. iOS-first, 393px primary viewport.

---

## Figma sources
- Live Tap Home 360px: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=23-48307&m=dev) · node `23:69922`
- Driver Card Details Flow: [Design System MD](https://www.figma.com/design/eLp0JJx162DAlCN62ky3ye/Design-system-MD?node-id=30-13527&m=dev) · node `30:14344`
- Block Card Flow: node `30:15858`
- Transactions: node `30:15000`
- Activate New Card: node `30:16391`

---

## Primary viewport

**393px** (iPhone 14 Pro) — the design reference. All flows are shown at this size.
Secondary: 360px (Android standard).

---

## Home screen

Uses `Master - Driver` component as full-page overlay with:
- Device frame (not just a viewport — shows phone chrome)
- `🟢-Device-Top-Strip-CP` at top
- Bonus points / summary section
- Driver card display
- `🟢-Menu-Bar-CP` bottom navigation
- `Secondary-Chip` for balance display

---

## Driver card

The core feature of Live Tap. Card shows:
- Card number (masked)
- Card holder name
- Card type and status badge
- Balance amount
- Quick actions: Block, Activate, View transactions

Uses `card-component` with Level 1 + Level 2 nesting.

---

## Key flows

### Block Card
1. Warning screen — explains what blocking does
2. `Primary "Block Card"` full-width (L size)
3. `Secondary "Cancel"` full-width (L size) below
4. Bottom sheet confirmation on tap (Sheet and overlay verify pattern)
5. Success state — "Card blocked" toast (green) + updated card status badge

### Activate New Card
1. Triggered after reporting lost card
2. Information card
3. Primary "Activate Card" full-width
4. Success confirmation screen — Primary "Done"

### Transactions
- Scrollable list using `List-Items` component
- Date grouped (date header dividers)
- Same `🟢-Menu-Bar-CP` bottom nav
- `🟢-Device-Top-Strip-CP` present

---

## Button patterns (Live Tap)

All primary user actions use full-width buttons (L size) at viewport bottom.

| Screen | Button(s) |
|---|---|
| Success states | Single Primary "Done" |
| Error states | Single Primary "Okay" |
| Destructive confirmation | Primary "Block Card" + Secondary "Cancel" — stacked |
| Card activation | Primary "Activate Card" |
| Home — points CTA | Primary "View Points" (standard width) |

---

## Tokens used

```css
--semantic-primary-bold-fill     /* primary buttons, active elements */
--semantic-primary-neutral-fill  /* card backgrounds */
--semantic-primary-neutral-line  /* card borders */
--semantic-error-fill            /* error state text */
--semantic-error-stroke          /* error state borders */
--semantic-success-lite-fill     /* success toasts/badges */
--btn-padding-l-v                /* 16px — L button vertical padding */
--btn-padding-l-h                /* 24px — L button horizontal padding */
--space-m                        /* 16px — gap between stacked buttons */
```

---

## Live Tap vs DX differences

| Aspect | Live Tap | DX |
|---|---|---|
| Primary viewport | 393px (iPhone) | 360px + desktop |
| Device frame | Always shown | Sometimes shown |
| Nav | Bottom bar — 3 items | Bottom bar — 5+ items |
| Core feature | Driver card management | Payment terminal + bonus points |
| Button size default | L (full-width) | L (full-width) mobile, M desktop |


---
<!-- FILE: product/screens/SCREEN-EXAMPLES.md -->

# Screen Examples
**Live Payments Design System** · v1.1 · [← Index](../../00-INDEX.md)

> All screen references with Figma node IDs, breakpoints, and component lists. Use these to find any live production screen.

---

## Core Design System screens

File: `sGXyZtRVxRrXf6Hcv8ASLZ`

[All screens — Section 7](https://www.figma.com/design/sGXyZtRVxRrXf6Hcv8ASLZ/Core-Design-System?node-id=28138-16506&m=dev)

---

## Design System MD screens

File: `eLp0JJx162DAlCN62ky3ye`

### Live Bill Pay — Onboarding

| Screen | Node | Breakpoints | Key components |
|---|---|---|---|
| Review & Confirm (Desktop) | `5:18704` | 1536px | Primary-Button, Secondary-Button, List-Content, ProgressBar, BpMenuSection, ActionStrip |
| Review & Confirm (Mobile) | `5:18709` | 360px | Primary-Button, Card-responsive, ProgressBar |
| Find Your Business (Desktop) | `23:70121` | 1536px, 1200px | Secondary-Button, BP-Menu-Section, Module |
| Find Your Business (Mobile) | `23:70132` | 660px, 360px | BP-Menu-Section, Module, Secondary-Button |
| Identity Step (Desktop) | `5:18831` | 1536px, 360px | Card-responsive, Secondary-Button, DropDown, ProgressBar, ActionStrip |
| Industry Selection (Dropdown) | `5:18873` | 1536px, 360px | Secondary-Button, DropDown, ProgressBar, ScrollBar |
| Business Verification Popup | `5:18898` | 1536px, 360px | Card-verify-popup, Header-Section, List-Content, ActionStrip |

### Live Bill Pay — Dashboard

| Screen | Node | Breakpoints | Key components |
|---|---|---|---|
| Complete Your Setup (Mobile) | `5:18745` | 360px | Primary-Button, Secondary-Button, Header-Section, Transaction-Views, Fab-Primary-Lite, Main-Menu-Section |
| Dashboard with Feature Popup | `5:34584` | 1536px, 1200px, 660px, 360px | Primary-Chip, Transaction-Views, Card-Refund, Link-Button, Button-CP, Main-Menu-Section, Bar-nav |

### Wallet

| Screen | Node | Breakpoints | Key components |
|---|---|---|---|
| Wallet Main | `5:36698` | 1536px, 1200px, 660px, 360px | wallet, Main-Menu-Section, Bar-nav |
| Wallet — Remove Card | `5:36704` | 1536px, 1200px, 660px, 375px | Sheet-overlay-verify, wallet, Primary-Button, Secondary-Button |

### Tables

| Screen | Node | Breakpoints | Key components |
|---|---|---|---|
| Transaction Table | `5:43979` | 1536px | Table-Cells, Column-01, Expander, Titelline, Pageration, Fab-Primary-Neutral, Main-Menu-Section |
| Transaction Table with Search | `5:44120` | 1536px | Search, Table-Cells, Column-02, Pageration, Titelline |
| Bill History (Responsive) | `23:69701` | 1536px, 1200px, 660px, 360px | Bill-history-responsive, Navigation |

### Bill History example (MD file)

| Screen | Node | Breakpoints |
|---|---|---|
| Bill History 1536px | `115:20531` | 1536px — full portal shell + table |
| Bill History 1200px | `115:20527` | 1200px |
| Bill History 660px | `115:20528` | 660px |
| Bill History 360px | `115:20529` | 360px |

---

### DX Screens

| Screen | Node | Breakpoints | Key components |
|---|---|---|---|
| DX Home (360px) | `23:69829` | 360px, 320px, 393px | Device-Top-Strip, Fab-Link, Primary-Button, Menu-Bar, card-component |
| DX Home (iPhone 393px) | `23:69982` | 393px | Device-Top-Strip, Fab-Link, Primary-Button, Menu-Bar, Secondary-Chip |
| DX Navigation — Collapsed | `23:69787` | 1536px | Navigation, Main-Menu-Section, Titelline, Transaction-Table, Info-Draw |
| DX Navigation — Expanded | `23:69815` | 1536px | Navigation-Draws-Desktop, Main-Menu-Section, Titelline |
| DX Final Design 1536px | `23:69707` | 1536px | Navigation, Main-Menu-Section, USP-section, right panel |
| DX Final Design 660px | `23:69733` | 660px | Main-Menu-Section, USP-section, Button-CP |
| DX Keypad | `23:69904` | 360px, 393px | Keypad-Button, Amount-Input-Display, Transaction-Input, Payment-Digit, Device-Top-Strip |

### Live Tap Screens

| Screen | Node | Breakpoints | Key components |
|---|---|---|---|
| Live Tap Home (360px) | `23:69922` | 360px | Master-Driver, Device-Top-Strip, Primary-Button, Menu-Bar, Secondary-Chip |
| Driver Card Details | `30:14344` | 393px | Primary-Button, Secondary-Button, Menu-Bar, card-component, List-Items |
| Block Card Flow | `30:15858` | 393px | Primary-Button, Secondary-Button, Sheet-overlay-verify |
| Transactions | `30:15000` | 393px | Menu-Bar, Primary-Button, List-Items, Device-Top-Strip |
| Activate New Card | `30:16391` | 393px | Primary-Button, Secondary-Button |

### Portal Navigation

| Screen | Node | Breakpoints |
|---|---|---|
| Portal Navigation | `23:70079` | 1536px, 1200px, 660px, 360px |
| Portal Login / Onboarding | `112:14812` | 1536px, 1200px, 660px, 360px |

---

## How to use this file

1. Find the screen you need in the table above
2. Copy the node ID
3. Open Figma: `https://www.figma.com/design/[fileKey]/...?node-id=[nodeId]`
4. Or use the Figma MCP to pull design context: `get_design_context(fileKey, nodeId)`

**Core Design System file key:** `sGXyZtRVxRrXf6Hcv8ASLZ`
**Design System MD file key:** `eLp0JJx162DAlCN62ky3ye`
