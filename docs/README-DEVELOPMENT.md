# SholaX — Development README
## Phase-by-Phase Build Guide

**For:** GitHub Copilot (GPT-based) + Developer  
**Stack:** Next.js 14 (App Router), Supabase, Tailwind CSS, Shadcn/ui, Recharts  
**Hosting:** Vercel (frontend) + Supabase (database + auth)  
**Total Phases:** 15

---

## CRITICAL RULES FOR THE AI ASSISTANT

Before starting any phase, the AI must:
1. **Ask the developer clarifying questions** before writing code — do not assume
2. **Never hardcode secrets** — always use environment variables
3. **Never skip the `.env.example` update** when adding new env vars
4. **Read the relevant README** before implementing any feature
5. **Ask about design preferences** before building UI components
6. **Confirm understanding of the task** before proceeding
7. **Never build more than what the phase asks for** — no over-engineering
8. **Always ask** if something is unclear rather than guessing

The AI should treat the developer as the decision-maker. When in doubt, ask. Short, focused questions are better than making assumptions.

---

## SECURITY RULES (APPLY TO EVERY PHASE)

These rules apply to ALL code written in ALL phases. No exceptions.

1. **Environment Variables Only** — No secret, URL, key, or credential is ever written directly in source code. Everything goes in `.env.local`.

2. **`.env.local` is never committed** — `.gitignore` must include `.env.local` from Phase 1.

3. **`.env.example` is always committed** — It contains all variable names with empty values so other developers know what's needed.

4. **`SUPABASE_SERVICE_ROLE_KEY` is server-side only** — Never use it in any file that runs in the browser. Only use it in `app/api/` route handlers and server components.

5. **`NEXT_PUBLIC_` prefix means browser-safe** — Only variables that are safe to expose to the browser get this prefix.

6. **Admin identity check in every admin API route** — Every route in `app/api/admin/` must verify the session email matches `process.env.ADMIN_EMAIL` before doing anything.

7. **No sensitive data in client components** — Service role keys, admin emails, and other secrets must never reach client components.

8. **Input validation on all API routes** — Every POST route validates its input before touching the database.

---

## ASKING QUESTIONS — GUIDE FOR AI

Before starting each phase, the AI should ask the developer relevant questions such as:

- "Should I use a specific color for the accent/brand color, or should I pick one that fits the dark modern design?"
- "Do you want the admin panel at `/admin` or a different path?"
- "Should the login page redirect to `/dashboard` after login, or somewhere else?"
- "Do you want the campaign table changes to auto-save or require a 'Save' button?"
- "Should error messages be shown inline or as toast notifications?"

The more specific the question, the better the output. The AI should never proceed on a design or UX decision without checking first.

---

## TECH STACK REFERENCE

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14 (App Router) | Full-stack framework |
| React | 18 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Styling |
| Shadcn/ui | Latest | Pre-built components |
| Recharts | 2 | Charts |
| Supabase JS | 2 | Database + Auth client |
| Supabase SSR | Latest | Server-side Supabase in Next.js |

---

# PHASE 1 — Project Setup & Folder Structure

## Goal
Create the Next.js project from scratch with the correct folder structure, TypeScript config, and Tailwind CSS. Nothing functional yet — just the skeleton.

## AI: Ask These Questions First
- "What do you want to name the project folder? (default: sholax)"
- "Do you want to use the `src/` directory structure or keep files at root level?"
- "Are you using npm, yarn, or pnpm?"

## Steps

### 1.1 Create Next.js App
```bash
npx create-next-app@latest sholax \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

### 1.2 Install All Dependencies
```bash
cd sholax

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Shadcn/ui (init)
npx shadcn-ui@latest init

# Recharts
npm install recharts

# Utility
npm install clsx tailwind-merge lucide-react
```

When running `shadcn-ui init`, select:
- Style: Default
- Base color: Zinc (dark-friendly)
- CSS variables: Yes

### 1.3 Create Folder Structure
Create all folders (empty for now):

```
sholax/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              ← Home (empty placeholder)
│   │   ├── ad-system/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── insights/
│   │   │   └── page.tsx
│   │   ├── library/
│   │   │   └── page.tsx
│   │   └── book-a-call/
│   │       └── page.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── onboarding/
│   │       └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   └── api/
│       ├── dashboard/
│       │   └── route.ts
│       ├── admin/
│       │   ├── clients/
│       │   │   └── route.ts
│       │   ├── client-data/
│       │   │   └── route.ts
│       │   ├── update/
│       │   │   └── route.ts
│       │   └── toggle-onboarding/
│       │       └── route.ts
│       └── onboarding/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── dashboard/
│   │   ├── DashboardShell.tsx
│   │   ├── PlatformSection.tsx
│   │   ├── TopStrip.tsx
│   │   ├── CoreMetrics.tsx
│   │   ├── LeadQuality.tsx
│   │   ├── Pipeline.tsx
│   │   ├── CampaignTable.tsx
│   │   ├── TopPerformingAd.tsx
│   │   ├── PerformanceTrends.tsx
│   │   ├── AIOptimisationLog.tsx
│   │   ├── SystemStatus.tsx
│   │   ├── CurrentActions.tsx
│   │   ├── WeeklySummary.tsx
│   │   ├── TopMessageBanner.tsx
│   │   └── ClientCallSection.tsx
│   ├── admin/
│   │   ├── ClientList.tsx
│   │   └── ClientEditor.tsx
│   └── ui/                       ← Shadcn components go here (auto-generated)
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── demo-data.ts
│   ├── empty-data.ts
│   └── types.ts
├── middleware.ts
├── .env.local                    ← NOT committed
├── .env.example                  ← Committed
└── .gitignore
```

Each `.tsx` file should export a minimal placeholder component at this stage:
```tsx
export default function PageName() {
  return <div>PageName placeholder</div>
}
```

### 1.4 Create `.gitignore`
Ensure `.env.local` is in `.gitignore`. The default Next.js `.gitignore` includes this, but verify.

### 1.5 Configure Tailwind for Dark Theme
In `tailwind.config.ts`:
```ts
darkMode: 'class',
```

In `app/layout.tsx`, add `dark` class to the `<html>` tag:
```tsx
<html lang="en" className="dark">
```

## Deliverable
- Project runs with `npm run dev`
- All folders and placeholder files exist
- No errors
- Dark mode configured

---

# PHASE 2 — Environment Variables & Security Setup

## Goal
Set up all environment variables. Configure Supabase client (browser + server). Create `.env.example`. Nothing works yet — just the infrastructure.

## AI: Ask These Questions First
- "Do you have a Supabase project already created, or should I guide you through creating one?"
- "What email do you want to use for the admin account?"

## Steps

### 2.1 Create `.env.local`
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Admin
ADMIN_EMAIL=admin@sholax.com
```

**Where to find Supabase values:**
1. Go to supabase.com → your project → Settings → API
2. `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2.2 Create `.env.example`
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Admin
ADMIN_EMAIL=
```

### 2.3 Create Browser Supabase Client (`lib/supabase/client.ts`)
Used in client components (browser-side). Uses anon key only.
```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 2.4 Create Server Supabase Client (`lib/supabase/server.ts`)
Used in server components and API routes. Can use service role key for admin operations.
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// For regular authenticated queries (respects RLS)
export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options) { cookieStore.set({ name, value, ...options }) },
        remove(name: string, options) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )
}

// For admin operations (bypasses RLS — server-side only)
export function createAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: { get: () => undefined, set: () => {}, remove: () => {} },
      auth: { persistSession: false }
    }
  )
}
```

### 2.5 Define TypeScript Types (`lib/types.ts`)
Define all TypeScript interfaces matching the database schema:

```ts
export type Platform = 'meta' | 'google'

export interface Campaign {
  id: string
  name: string
  spend: number
  leads: number
  cpl: number
  status: 'Active' | 'Paused' | 'Complete'
}

export interface OptimisationEntry {
  id: string
  entry: string
  created_at: string
}

export interface DashboardData {
  id: string
  user_id: string
  platform: Platform
  // Top Strip
  client_name: string | null
  status: string
  last_updated: string
  active_campaigns: number
  // Core Metrics
  ad_spend: number
  enquiries_generated: number
  cost_per_enquiry: number
  qualified_enquiries: number
  calls_booked: number
  cost_per_call: number
  // Lead Quality
  contact_rate: number
  qualification_rate: number
  follow_up_coverage: number
  // Pipeline
  pipeline_new_enquiries: number
  pipeline_contacted: number
  pipeline_qualified: number
  pipeline_booked_calls: number
  // Campaign Table
  campaigns: Campaign[]
  // Top Performing Ad
  top_ad_name: string | null
  top_ad_hook: string | null
  top_ad_leads: number
  top_ad_cpl: number
  // AI Optimisation Log
  optimisation_log: OptimisationEntry[]
  // System Status
  status_lead_generation: string
  status_lead_handling: string
  status_optimisation: string
  // Current Actions
  current_actions: string[]
  // Weekly Summary
  weekly_summary: string | null
  // Top Message
  top_message: string | null
  top_message_visible: boolean
  // Timestamps
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  business_name: string | null
  industry: string | null
  goals: string | null
  is_onboarded: boolean
  created_at: string
  updated_at: string
}

export interface ClientListItem {
  id: string
  email: string
  business_name: string | null
  is_onboarded: boolean
  created_at: string
}
```

## Deliverable
- `.env.local` created with real values
- `.env.example` committed with empty values
- Supabase clients created (browser + server + admin)
- All TypeScript types defined
- No compilation errors

---

# PHASE 3 — Database Setup (Supabase)

## Goal
Create all tables, triggers, and RLS policies in Supabase. Verify the schema is correct.

## AI: Ask These Questions First
- "Do you want me to provide the SQL to run in Supabase dashboard, or should I set up a migration file system?"
- "Do you have access to the Supabase SQL editor?"

## Steps

### 3.1 Run the SQL Schema
Copy the **full SQL schema** from `README-DATABASE.md` and run it in the Supabase SQL editor.

The schema creates:
- `profiles` table
- `dashboard_data` table
- Auto-update triggers for `updated_at`
- Auto-create profile trigger on new user signup
- Auto-create dashboard_data rows (meta + google) trigger on new profile
- Row Level Security policies

### 3.2 Verify Tables Were Created
In Supabase → Table Editor, confirm:
- `profiles` table exists with all columns
- `dashboard_data` table exists with all columns
- Unique constraint `(user_id, platform)` exists on `dashboard_data`

### 3.3 Create Admin Account in Supabase Auth
1. Go to Supabase → Authentication → Users
2. Click "Add User" → "Create New User"
3. Enter the admin email (matching `ADMIN_EMAIL` in `.env.local`)
4. Set a strong password
5. This creates the admin in `auth.users`
6. The trigger will also create a row in `profiles` automatically

### 3.4 Verify Triggers Work
In Supabase SQL editor, check if the profile was auto-created:
```sql
SELECT * FROM profiles;
```
Should show one row for the admin.

```sql
SELECT * FROM dashboard_data WHERE user_id = (SELECT id FROM profiles LIMIT 1);
```
Should show 2 rows (meta + google).

## Deliverable
- All tables created in Supabase
- RLS enabled and policies set
- Triggers working
- Admin account created in Supabase Auth
- Verified with SQL queries

---

# PHASE 4 — Authentication System

## Goal
Build the login page and middleware. Users can log in. Admin gets redirected to `/admin`. Regular users get redirected to `/dashboard`. Route protection works.

## AI: Ask These Questions First
- "Should the login page have a 'Forgot Password' link? (simple implementation or skip for now)"
- "After a regular client logs in, should they go to `/dashboard` or `/onboarding` if they haven't completed onboarding?"
- "Should there be a visible 'Admin Login' option or just one login form for everyone?"

## Steps

### 4.1 Build Login Page (`app/(auth)/login/page.tsx`)

The login page is a simple, clean form:
- SholaX logo/name at top
- Email input
- Password input
- "Login" button
- Error message display (invalid credentials, etc.)
- Dark design, centered card layout

**Login logic:**
1. User submits email + password
2. Call `supabase.auth.signInWithPassword({ email, password })`
3. On success: check if email === the admin (compare against `NEXT_PUBLIC_ADMIN_EMAIL` — wait, the admin email must NOT be exposed to the browser)

**Important: Admin redirect must happen server-side.**
After login, redirect to `/dashboard`. The middleware will handle routing the admin to `/admin`.

Actually flow:
1. User logs in → redirect to `/dashboard`
2. Middleware on `/dashboard` checks if user is admin → if yes, redirect to `/admin`
3. Middleware on `/admin` checks if user is admin → if not, redirect to `/dashboard`

### 4.2 Build Middleware (`middleware.ts`)

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // ... create supabase client with cookies
  // ... get session
  
  const { pathname } = request.nextUrl

  // Protect /admin route
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Check if admin email
    if (session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Protect /onboarding route — must be logged in
  if (pathname.startsWith('/onboarding')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/onboarding/:path*']
}
```

**Note:** `ADMIN_EMAIL` is available in middleware because middleware runs on the server (Edge Runtime). It does NOT need to be a `NEXT_PUBLIC_` variable.

### 4.3 Build Logout Functionality
A logout button (in navbar for logged-in users):
```ts
await supabase.auth.signOut()
// redirect to /
```

### 4.4 Session Handling
The Supabase session is stored in cookies automatically by the `@supabase/ssr` package. Server components read the session from cookies.

### 4.5 Verify Auth Works
Test:
- Regular user can log in → goes to `/dashboard`
- Admin can log in → middleware routes them to `/admin`
- Non-admin trying to access `/admin` → redirected to `/dashboard`
- Unauthenticated user trying to access `/admin` → redirected to `/login`
- Logout works → session cleared → redirected to home

## Deliverable
- Login page built and styled
- Middleware protecting `/admin` and `/onboarding`
- Admin routing works
- Logout works
- Sessions persist on page refresh

---

# PHASE 5 — Global Layout, Navbar & Footer

## Goal
Build the Navbar and Footer that appear on all public pages. Set up the root layout. Configure global styles for the dark theme.

## AI: Ask These Questions First
- "What navigation links should appear in the Navbar? (Home, Dashboard, Insights, Library, Book a Call, Login)"
- "Should the Navbar be transparent on the home page and solid on other pages, or always solid dark?"
- "Do you have a logo file, or should I use a text logo 'SholaX' for now?"
- "Should the Navbar collapse to a hamburger menu on mobile?"
- "What should the Footer contain? (links, copyright, social icons?)"

## Steps

### 5.1 Global Styles (`app/globals.css`)
Set up CSS variables for the dark theme:
```css
:root {
  --background: #0a0a0a;
  --surface: #111111;
  --surface-elevated: #1a1a1a;
  --border: #222222;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #52525b;
  --accent: #3b82f6;        /* Blue accent — confirm with developer */
  --accent-green: #22c55e;
  --accent-yellow: #eab308;
  --accent-red: #ef4444;
}
```

### 5.2 Root Layout (`app/layout.tsx`)
- Sets dark background color
- Includes Navbar and Footer
- Sets font (Inter or similar clean sans-serif via `next/font`)
- Sets metadata (title: "SholaX", description)

### 5.3 Navbar (`components/layout/Navbar.tsx`)
**Contents:**
- Left: SholaX logo/wordmark
- Center: Navigation links (Home, Dashboard, Insights, Library, Book a Call)
- Right: Login button (if not logged in) or client name + Logout (if logged in)

**Behavior:**
- Sticky at top of page
- Subtle border-bottom
- Dark background with slight transparency/blur
- Active link is highlighted
- Mobile: hamburger menu collapses nav links

**Session awareness:**
Navbar is a server component that checks if a session exists and renders Login or Logout accordingly.

### 5.4 Footer (`components/layout/Footer.tsx`)
Simple dark footer with:
- SholaX name + copyright
- Key page links
- (Optional social links if developer wants them)

## Deliverable
- Navbar renders on all pages
- Footer renders on all pages
- Dark theme is consistent globally
- Navbar is responsive (hamburger on mobile)
- Login/Logout button shows correctly based on session

---

# PHASE 6 — Home Page

## Goal
Build the Home page. This is a marketing page that introduces SholaX and pushes visitors toward booking a call.

## AI: Ask These Questions First
- "What is SholaX's core value proposition? (e.g. 'We run high-converting ads for service businesses')"
- "Should there be a hero video or just a hero image/animation?"
- "What sections do you want on the home page? Suggest: Hero, How It Works, Why SholaX, Dashboard Preview, CTA"
- "Do you have any testimonials or case study numbers to show?"
- "Should there be a 'How It Works' step-by-step section?"

## Steps

### 6.1 Page Sections (discuss with developer, then build)
Suggested sections for the home page:

**Hero Section:**
- Headline (e.g. "Your Ad Results. Crystal Clear.")
- Subheadline (brief description of SholaX)
- Two CTA buttons: "See Your Dashboard" (→ `/dashboard`) and "Book a Call" (→ `/book-a-call`)
- Background: dark with subtle gradient or animated grid

**How It Works Section:**
- 3-4 step process (SholaX runs your ads → We track everything → You see results in your dashboard)
- Icon for each step
- Dark card style

**Dashboard Preview Section:**
- A screenshot or mockup of the dashboard
- Text: "Your performance. At a glance."
- CTA: "See Live Demo" (→ `/dashboard`)

**Why SholaX Section:**
- 3-4 key differentiators
- Icon + short text format

**Final CTA Section:**
- Large heading + Book a Call button

### 6.2 Animations
- Sections fade in on scroll (use Intersection Observer or a lightweight animation library)
- Smooth transitions

### 6.3 SEO
- Set page `<title>` and `<meta description>` via Next.js metadata API
- All images have `alt` text

## Deliverable
- Home page fully built and styled
- Dark design matching the SaaS aesthetic
- All CTAs link to correct pages
- Responsive on mobile and desktop

---

# PHASE 7 — Client Acquisition & Ad System Page

## Goal
Build the "Client Acquisition & Ad System" marketing page. Explains SholaX's service in detail.

## AI: Ask These Questions First
- "What specific services does SholaX offer? (Meta Ads, Google Ads, lead qualification, etc.)"
- "Do you want a pricing section on this page, or no pricing?"
- "Should this page have a 'Book a Call' CTA at the bottom?"
- "Do you have any specific process steps or methodology SholaX uses that should be highlighted?"

## Steps

### 7.1 Page Sections (build based on developer answers)
Suggested sections:

**Page Hero:**
- Headline about the ad system
- Brief description
- CTA button

**The System Section:**
- Explains the Meta + Google ads approach
- Could be a two-column layout (Meta | Google)
- What SholaX handles: campaign creation, targeting, optimisation, reporting

**The Dashboard Advantage:**
- How the live dashboard sets SholaX apart
- Screenshot/mockup

**Who This Is For:**
- Target client description (service businesses, etc.)

**CTA:**
- Book a call

## Deliverable
- Page fully built
- Dark design consistent with rest of site
- Responsive

---

# PHASE 8 — Insights Page

## Goal
Build the Insights page. Based on the requirements, this is a content page (blog/tips/case studies). Build it as a clean UI with placeholder content.

## AI: Ask These Questions First
- "What type of content goes here? Blog posts? Case studies? Quick tips?"
- "Should there be a sidebar or is it a simple grid of cards?"
- "Should the content be hardcoded for now, or should there be a simple CMS system (like markdown files)?"
- "How many placeholder articles/posts should I create for the initial build?"

## Steps

### 8.1 Build Based on Developer Answers
Likely structure:
- Page header with title "Insights"
- Grid of content cards (image, title, excerpt, date)
- Each card links to a detail page (or placeholder)
- Dark card design

If using hardcoded data: create a `lib/insights-data.ts` with 4-6 placeholder posts.

## Deliverable
- Insights page built
- Placeholder content shown in card grid
- Responsive

---

# PHASE 9 — Library Page

## Goal
Build the Library page. Requirements say: "UI only, no backend needed now." This is a placeholder page with clean UI.

## AI: Ask These Questions First
- "What kind of content will eventually live in the Library? Resources? Templates? Videos?"
- "Should it look like a resource hub with categories, or a simple list?"
- "How many placeholder items should I create?"

## Steps

### 9.1 Build UI Only
Create a clean library-style page with:
- Page header
- Search bar (UI only, not functional yet)
- Category filter pills (UI only)
- Grid of resource cards (placeholder content)
- Each card: icon, title, description, "Coming Soon" or placeholder badge

No backend. No API. Just static UI with hardcoded placeholder items.

## Deliverable
- Library page built
- Clean UI with placeholder content
- Responsive

---

# PHASE 10 — Book a Call Page

## Goal
Build the Book a Call page with a video placeholder at the top and the Calendly embed below.

## AI: Ask These Questions First
- "Should the video placeholder be a styled empty box with a play icon, or a placeholder image?"
- "Do you want any text/copy between the video and the Calendly embed?"
- "Should the Calendly embed be inline (full page) or a popup when clicking a button?"

## Steps

### 10.1 Page Layout
```
[Video Placeholder]
  - Dark box with a play button icon
  - Text: "Watch how SholaX transforms your ad results" (or similar)
  - Aspect ratio 16:9

[Short text section]
  - Heading: "Ready to grow your business?"
  - 1-2 sentences encouraging them to book

[Calendly Embed]
  - Full inline embed
  - URL: https://calendly.com/contact-sholax/30min
```

### 10.2 Calendly Embed Implementation
Calendly provides a script-based embed. In Next.js, load the Calendly widget script in a client component:

```tsx
'use client'
import { useEffect } from 'react'

export function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/contact-sholax/30min"
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}
```

Style the Calendly container to match the dark theme as much as possible (Calendly's dark mode option can be passed in the data-url).

## Deliverable
- Book a Call page built
- Video placeholder styled
- Calendly embed working
- Responsive

---

# PHASE 11 — Dashboard UI (All Sections, Static)

## Goal
Build the complete dashboard UI with ALL sections, styled with hardcoded static data. No dynamic data yet — just make it look perfect. This is the most visually complex phase.

## AI: Ask These Questions First
- "What accent color should I use for the dashboard? (e.g. blue #3b82f6, green #22c55e, or something else?)"
- "Should the Meta and Google sections be visually separated by a divider, a colored header band, or something else?"
- "For the Performance Trends charts, should they be line charts, bar charts, or area charts?"
- "Should the Pipeline section look like a horizontal funnel with arrows, or 4 separate stat boxes?"
- "Should the Lead Quality section use circular progress rings or horizontal progress bars?"
- "Should sections have a card/box style with borders, or flow more openly?"
- "What currency symbol should be used? £, $, or should it be configurable?"

## Steps

### 11.1 Build Each Section Component
Build each component in `components/dashboard/` with hardcoded static props (all data comes from props, not fetched inside the component):

**Order to build in:**
1. `TopMessageBanner.tsx` — full width banner
2. `TopStrip.tsx` — 4 stat boxes in a row
3. `CoreMetrics.tsx` — 6 metric cards grid
4. `LeadQuality.tsx` — 3 progress indicators
5. `Pipeline.tsx` — 4-stage funnel
6. `CampaignTable.tsx` — data table
7. `TopPerformingAd.tsx` — highlighted card
8. `PerformanceTrends.tsx` — 3 Recharts charts (with hardcoded data)
9. `AIOptimisationLog.tsx` — scrollable log entries
10. `SystemStatus.tsx` — 3 status rows
11. `CurrentActions.tsx` — bullet list
12. `WeeklySummary.tsx` — text block card
13. `ClientCallSection.tsx` — CTA card

### 11.2 Build `PlatformSection.tsx`
A wrapper that renders all section components for one platform:
```tsx
interface PlatformSectionProps {
  title: string  // "Meta Ads (Facebook & Instagram)" or "Google Ads"
  data: DashboardData
}
```

### 11.3 Build `DashboardShell.tsx` (static version)
For now, just render both `PlatformSection` components with hardcoded static data.
Dynamic logic comes in Phase 12.

### 11.4 Build the Dashboard Page
`app/(public)/dashboard/page.tsx` renders `DashboardShell`.

### 11.5 Performance Trends Charts
Use Recharts with hardcoded data arrays. Charts should be:
- Responsive (use `<ResponsiveContainer>`)
- Dark themed (custom colors matching site palette)
- Minimal gridlines
- Custom tooltip

Example chart data structure:
```ts
const leadsData = [
  { week: 'Week 1', leads: 12 },
  { week: 'Week 2', leads: 18 },
  { week: 'Week 3', leads: 22 },
  { week: 'Week 4', leads: 19 },
]
```

## Deliverable
- All dashboard sections built and styled
- Both Meta and Google sections render (identical layout, same hardcoded data)
- Dashboard page looks polished and professional
- Responsive on mobile and desktop
- Charts render correctly

---

# PHASE 12 — Dashboard 3 User States (Dynamic Logic)

## Goal
Make the dashboard dynamic. Connect the 3 user states. Visitor sees demo data, preview user sees empty data, onboarded client sees real data from the database.

## AI: Ask These Questions First
- "Should the 'Preview Mode' indicator be a banner at the top, a badge in the top strip, or both?"
- "For the empty/preview state, should fields show '—' or '0' or be completely blank?"
- "Should the dashboard show a loading skeleton while data is being fetched, or a loading spinner?"

## Steps

### 12.1 Create Demo Data (`lib/demo-data.ts`)
Export `DEMO_META_DATA` and `DEMO_GOOGLE_DATA` — two objects of type `DashboardData` with realistic-looking placeholder values.

These should look like a real client's data — actual dollar amounts, realistic percentages, real-looking campaign names, a properly written weekly summary.

### 12.2 Create Empty Data (`lib/empty-data.ts`)
Export `EMPTY_META_DATA` and `EMPTY_GOOGLE_DATA` — two objects of type `DashboardData` with all fields set to zero/null/empty.

### 12.3 Build Dynamic `DashboardShell.tsx` (Server Component)

```tsx
// app/(public)/dashboard/page.tsx or DashboardShell component
import { createClient } from '@/lib/supabase/server'
import { DEMO_META_DATA, DEMO_GOOGLE_DATA } from '@/lib/demo-data'
import { EMPTY_META_DATA, EMPTY_GOOGLE_DATA } from '@/lib/empty-data'

export default async function DashboardShell() {
  const supabase = createClient()
  
  // Check for session
  const { data: { session } } = await supabase.auth.getSession()

  // STATE 1: No session → demo data
  if (!session) {
    return (
      <DashboardPage
        metaData={DEMO_META_DATA}
        googleData={DEMO_GOOGLE_DATA}
        isOnboarded={false}
        isLoggedIn={false}
      />
    )
  }

  // Get profile to check is_onboarded
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_onboarded, business_name')
    .eq('id', session.user.id)
    .single()

  // STATE 2: Logged in, not onboarded → empty data
  if (!profile?.is_onboarded) {
    return (
      <DashboardPage
        metaData={EMPTY_META_DATA}
        googleData={EMPTY_GOOGLE_DATA}
        isOnboarded={false}
        isLoggedIn={true}
      />
    )
  }

  // STATE 3: Logged in, onboarded → real data
  const { data: dashboardRows } = await supabase
    .from('dashboard_data')
    .select('*')
    .eq('user_id', session.user.id)

  const metaData = dashboardRows?.find(r => r.platform === 'meta')
  const googleData = dashboardRows?.find(r => r.platform === 'google')

  return (
    <DashboardPage
      metaData={metaData || EMPTY_META_DATA}
      googleData={googleData || EMPTY_GOOGLE_DATA}
      isOnboarded={true}
      isLoggedIn={true}
    />
  )
}
```

### 12.4 Update `DashboardPage` Component
Accept `isOnboarded` and `isLoggedIn` props:
- Show "Preview Mode" badge when `isLoggedIn && !isOnboarded`
- Show `ClientCallSection` only when `isOnboarded === true`
- Pass correct data to each `PlatformSection`

### 12.5 Update `TopMessageBanner`
- For visitor (`!isLoggedIn`): show default "Want Your Own Client Acquisition Dashboard?"
- For logged-in user: show `data.top_message` if set, else show default
- Hide entirely if `top_message_visible === false` (only for onboarded users)

## Deliverable
- Visitor sees demo data
- Logged-in non-onboarded user sees empty data + "Preview Mode"
- Logged-in onboarded user sees their real data
- Client Call Section only shows for onboarded users
- All 3 states tested manually

---

# PHASE 13 — Onboarding Flow

## Goal
Build the 4-step onboarding flow for new clients who just signed up.

## AI: Ask These Questions First
- "Should the onboarding be a single page with step indicators, or separate pages for each step?"
- "What business info fields do you want in Step 2? (business name, industry, goals, phone number?)"
- "For Step 3 (Meta access instructions), what exactly should the instructions say?"
- "For Step 4 (payment placeholder), what message should be shown? What email does the invoice come from?"
- "After completing Step 4, where should the user be redirected? (→ /dashboard)"

## Steps

### 13.1 Build Onboarding Page (`app/(auth)/onboarding/page.tsx`)

A single page with a step indicator at the top (1 → 2 → 3 → 4) and content that changes per step. Use React state to track current step.

**Step 1: Account Created Confirmation**
- "Welcome to SholaX! Your account has been created."
- Brief what-to-expect message
- "Continue" button → go to Step 2

**Step 2: Business Information**
- Form with inputs:
  - Business Name (text, required)
  - Industry (text or dropdown, required)
  - Advertising Goals (textarea, optional)
- "Save & Continue" button
- On submit: POST to `/api/onboarding` → save to `profiles` table
- On success: go to Step 3

**Step 3: Instructions**
- Heading: "Grant SholaX Access to Your Ad Accounts"
- Numbered instructions for how to add SholaX as a partner on Meta Business Manager
- (Placeholder instructions for Google Ads as well)
- "I've Read This, Continue" button → go to Step 4

**Step 4: Payment**
- Heading: "Complete Your Setup"
- Text: "Your invoice has been sent to [user's email]. Once your payment is confirmed, your dashboard will be activated within 24 hours."
- A styled info box (not a payment form)
- "Finish" button → redirect to `/dashboard`

### 13.2 API Route (`app/api/onboarding/route.ts`)

```ts
// POST /api/onboarding
// Saves business info to profiles table
// Auth required

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const body = await request.json()
  const { business_name, industry, goals } = body
  
  // Validate inputs
  if (!business_name) return Response.json({ error: 'Business name required' }, { status: 400 })
  
  const { error } = await supabase
    .from('profiles')
    .update({ business_name, industry, goals })
    .eq('id', session.user.id)
  
  if (error) return Response.json({ error: error.message }, { status: 500 })
  
  return Response.json({ success: true })
}
```

### 13.3 Redirect New Users to Onboarding
When a new user signs up (via the login page with "Create Account" flow), after account creation check if they have `business_name`. If not → redirect to `/onboarding`.

**Note:** The signup flow uses Supabase Auth's `signUp` method. The trigger automatically creates their `profiles` row and `dashboard_data` rows.

## Deliverable
- 4-step onboarding flow works end to end
- Business info saved to database on step 2
- New users are routed to onboarding after signup
- After completing onboarding, user lands on dashboard (in preview mode)

---

# PHASE 14 — Admin Panel

## Goal
Build the complete admin panel. Client list, client editor with all fields editable, save functionality, and onboarding toggle.

## AI: Ask These Questions First
- "Should the admin panel have its own layout (no public Navbar/Footer), or use the same layout?"
- "Should changes auto-save as the admin types, or only save when they click 'Save Changes'?"
- "Should the campaign table in the admin have inline editing or a modal/drawer for editing a campaign?"
- "Should there be a confirmation dialog before toggling a client's onboarding status?"
- "Should the admin see a preview of what the client's dashboard looks like?"

## Steps

### 14.1 Admin Layout
The admin panel should have its own minimal layout — no public Navbar. Just:
- A top bar with "SholaX Admin" and a Logout button
- The two-panel layout (client list left, editor right)

### 14.2 Client List Component (`components/admin/ClientList.tsx`)

Client component that:
- On mount: fetches `GET /api/admin/clients`
- Displays each client as a clickable list item
- Shows: business name (or email), onboarding badge, signup date
- Has a search input that filters the list client-side
- On client click: calls `onSelectClient(client)` prop

### 14.3 Client Editor Component (`components/admin/ClientEditor.tsx`)

The largest component in the project. A client component that:
- Receives selected client as prop
- On mount: fetches `GET /api/admin/client-data?user_id=X`
- Has a Meta/Google tab toggle
- Shows all editable fields for the selected platform
- Has a "Save Changes" button that calls `POST /api/admin/update`
- Has a separate "Onboarding Status" section with toggle button

**Build the editor in sections matching the dashboard:**
1. Top Strip fields (client_name, status dropdown, active_campaigns number)
2. Core Metrics fields (6 number inputs)
3. Lead Quality fields (3 percentage inputs)
4. Pipeline fields (4 number inputs)
5. Campaign Table (add/edit/delete rows)
6. Top Performing Ad fields (4 inputs)
7. AI Optimisation Log (add/edit/delete entries)
8. System Status (3 dropdowns)
9. Current Actions (add/edit/delete items)
10. Weekly Summary (large textarea)
11. Top Message controls (text input + toggle)

**Campaign Table in Admin:**
- Display existing campaigns in a table
- Each row: inputs for name, spend, leads, cpl, status + Save Row + Delete Row buttons
- An "Add Campaign" button that adds a new empty row

**AI Optimisation Log in Admin:**
- A textarea + "Add Entry" button
- Existing entries listed below with Edit + Delete buttons

**Current Actions in Admin:**
- A text input + "Add Action" button
- Existing actions listed with Edit + Delete buttons

### 14.4 API Routes (implement all)

**`GET /api/admin/clients`**
- Auth check: session email === `process.env.ADMIN_EMAIL`
- Use `createAdminClient()` (service role, bypasses RLS)
- Query: `SELECT id, email, business_name, is_onboarded, created_at FROM profiles ORDER BY created_at DESC`
- Return JSON array

**`GET /api/admin/client-data`**
- Auth check: session email === `process.env.ADMIN_EMAIL`
- Query string param: `user_id`
- Query: `SELECT * FROM dashboard_data WHERE user_id = $1` + `SELECT * FROM profiles WHERE id = $1`
- Return: `{ meta: {...}, google: {...}, profile: {...} }`

**`POST /api/admin/update`**
- Auth check: session email === `process.env.ADMIN_EMAIL`
- Body: `{ user_id, platform, ...all fields }`
- Validate: platform must be 'meta' or 'google', user_id must be present
- Query: `UPDATE dashboard_data SET ... WHERE user_id = $1 AND platform = $2`
- Also update `last_updated = now()` on the row
- Return: `{ success: true }`

**`POST /api/admin/toggle-onboarding`**
- Auth check: session email === `process.env.ADMIN_EMAIL`
- Body: `{ user_id, is_onboarded }`
- Query: `UPDATE profiles SET is_onboarded = $1 WHERE id = $2`
- Return: `{ success: true, is_onboarded: boolean }`

### 14.5 Admin Page (`app/admin/page.tsx`)
Server component that:
- Verifies admin session (middleware already checked, but double check)
- Renders the two-panel layout
- Passes initial client list to `ClientList`
- `ClientEditor` starts empty until a client is selected

## Deliverable
- Admin can log in and see client list
- Admin can select a client and see all their data in editable form
- Admin can update every field and save
- Changes save to database correctly
- Admin can toggle onboarding status
- All API routes protected with admin check

---

# PHASE 15 — Final Polish, Testing & Deployment

## Goal
Polish the UI, fix any inconsistencies, test all user flows end to end, and deploy to Vercel.

## AI: Ask These Questions First
- "Are there any sections that feel incomplete or need more visual polish?"
- "Should I add loading skeletons to the dashboard while data fetches?"
- "Should there be error pages (404, 500) with custom dark styling?"
- "Are there any animations or transitions you want added?"
- "Do you want a favicon? (I can create a simple text-based one if no logo is available)"

## Steps

### 15.1 UI Polish Checklist
- All pages are responsive (mobile, tablet, desktop)
- No layout breaks at any screen width
- All interactive elements have hover states
- All buttons have loading states (spinner while API calls are in progress)
- Error states are handled (failed API calls show user-friendly messages)
- Toast notifications for save success/failure in admin panel
- Consistent spacing throughout

### 15.2 Loading States
- Dashboard: show skeleton cards while data loads (if using client-side fetching)
- Admin client list: loading spinner on initial load
- Admin save button: shows "Saving..." with spinner during API call

### 15.3 Error Handling
- Login page: show "Invalid email or password" on failed login
- Admin: show toast on save failure
- Dashboard: show generic error if data fetch fails

### 15.4 Custom 404 Page (`app/not-found.tsx`)
Dark styled 404 page with a link back to home.

### 15.5 SEO Metadata
Add proper metadata to every page:
```tsx
export const metadata = {
  title: 'SholaX | [Page Name]',
  description: '[Page description]',
}
```

### 15.6 Test All User Flows End to End
- [ ] Visitor can see demo dashboard
- [ ] New user can sign up
- [ ] New user is routed to onboarding
- [ ] Onboarding flow completes and saves data
- [ ] New user dashboard shows "Preview Mode"
- [ ] Admin can log in
- [ ] Admin can see client list
- [ ] Admin can update a client's data
- [ ] Admin can toggle onboarding status
- [ ] After toggle, client dashboard shows real data
- [ ] Client Call Section shows only for onboarded users
- [ ] Book a Call page loads with Calendly embed
- [ ] Logout works for both admin and client
- [ ] All 6 public pages accessible
- [ ] Navbar links work correctly
- [ ] Mobile layout works on all pages

### 15.7 Deploy to Vercel

1. Push all code to GitHub
2. Go to vercel.com → "New Project" → import GitHub repo
3. Vercel auto-detects Next.js — no config needed
4. Add all environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
5. Deploy
6. Test the live deployment with all user flows

### 15.8 Supabase Production Settings
In Supabase → Authentication → URL Configuration:
- Add your Vercel domain to "Site URL"
- Add your Vercel domain to "Redirect URLs"

This ensures auth redirects work correctly on the live domain.

## Deliverable
- All flows tested and working
- Live deployment on Vercel
- Database connected and working in production
- Admin panel working on live site
- All environment variables set in Vercel

---

## PHASE SUMMARY

| Phase | What Gets Built | Estimated Time |
|-------|----------------|---------------|
| 1 | Project setup, folder structure | 1-2 hours |
| 2 | Environment variables, Supabase clients, TypeScript types | 1-2 hours |
| 3 | Database schema, tables, triggers, RLS, admin account | 1-2 hours |
| 4 | Login page, middleware, auth flow | 2-4 hours |
| 5 | Navbar, Footer, global layout | 2-3 hours |
| 6 | Home page | 3-5 hours |
| 7 | Ad System page | 2-3 hours |
| 8 | Insights page | 1-2 hours |
| 9 | Library page | 1-2 hours |
| 10 | Book a Call page | 1-2 hours |
| 11 | Dashboard UI (all sections, static) | 6-10 hours |
| 12 | Dashboard 3 user states (dynamic) | 2-4 hours |
| 13 | Onboarding flow | 2-3 hours |
| 14 | Admin panel | 6-10 hours |
| 15 | Polish, testing, deployment | 3-5 hours |

**Total estimate:** 35-59 hours of development time
