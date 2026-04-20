# SholaX — Master Project README

## Table of Contents
1. [What Is SholaX](#what-is-sholax)
2. [What We Are Building](#what-we-are-building)
3. [Who Are the Users](#who-are-the-users)
4. [User Flows](#user-flows)
5. [Tech Stack](#tech-stack)
6. [Project Structure](#project-structure)
7. [How All Parts Connect](#how-all-parts-connect)
8. [Pages Overview](#pages-overview)
9. [Environment Variables](#environment-variables)
10. [Running the Project Locally](#running-the-project-locally)
11. [Deployment](#deployment)
12. [Related READMEs](#related-readmes)

---

## What Is SholaX

SholaX is a **digital marketing agency** that runs paid advertising campaigns on behalf of businesses. Specifically they manage:
- **Meta Ads** (Facebook and Instagram)
- **Google Ads**

When a business hires SholaX, they pay SholaX to manage their ad budget, create campaigns, generate leads, and book sales calls for them.

The problem SholaX solves for their clients: instead of sending a weekly PDF report via email, SholaX gives each client a **beautiful, personalised dashboard** they can log into any time and see exactly how their ads are performing — how much was spent, how many leads came in, which campaigns are working, and what SholaX is doing about it.

---

## What We Are Building

A **full-stack web application** that serves two purposes:

### Purpose 1 — Marketing Website
A public-facing 6-page website that:
- Explains what SholaX does
- Shows potential clients the dashboard in demo mode
- Gets people to book a discovery call

### Purpose 2 — Client Portal + Admin System
A private system where:
- Existing clients log in to see their ad performance data
- SholaX staff (admin) manually enter and update all client data
- The dashboard shows different content based on who is logged in

### What This Is NOT
- NOT a SaaS platform
- NOT connected to Meta or Google APIs
- NOT processing real payments
- NOT automating anything

Everything is intentionally manual. SholaX staff manually enter all data. The dashboard is a beautifully designed reporting tool.

---

## Who Are the Users

There are exactly **3 types of users** and **1 admin**:

---

### 1. Visitor (Not Logged In)
A business owner or potential client browsing the SholaX website.

**Goal:** Understand what SholaX offers and decide if they want to book a call.

**Access:**
- All 6 public marketing pages
- Dashboard page — but sees hardcoded demo/placeholder data only
- No access to any real client data

---

### 2. New Client (Logged In, Not Onboarded)
A business owner who signed up but whose account has not been activated by the SholaX admin yet.

**Goal:** Signed up, completed onboarding steps, now waiting for SholaX to start running ads and enter their data.

**Access:**
- Dashboard page — but sees empty placeholder data
- Dashboard shows a "Preview Mode" label
- No real data shown

---

### 3. Active Client (Logged In, Onboarded)
A business owner who is actively paying SholaX and whose dashboard has been populated with real data by the admin.

**Goal:** Log in to review ad performance, read weekly summaries, and optionally book a review call with SholaX.

**Access:**
- Full dashboard with their own real data
- Can see the Client Call section (book a review call)
- Cannot see any other client's data

---

### 4. Admin (SholaX Staff)
A SholaX employee who manages all client data. There is only one admin account.

**Goal:** Log in to the admin panel and manually update each client's dashboard data — metrics, campaigns, summaries, statuses, etc.

**Access:**
- Admin panel only (protected route, not visible to regular users)
- Full control over every field for every client
- Can mark clients as onboarded or not onboarded

---

## User Flows

### Visitor Flow
```
Lands on Home Page
  → Reads about SholaX service
  → Navigates to any marketing page
  → Visits Dashboard page (sees demo data with placeholder numbers)
  → Clicks "Book Your Call" button (anywhere on site)
  → Redirected to Book a Call page
  → Books via embedded Calendly widget
```

### New Client Flow
```
Discovers SholaX → Books a call → Decides to hire SholaX
  → Goes to /onboarding
  → Step 1: Creates account (email + password via Supabase Auth)
  → Step 2: Enters business information (business name, industry, goals)
  → Step 3: Reads instructions (how to grant SholaX access to their Meta/Google accounts)
  → Step 4: Sees payment placeholder screen ("Your invoice has been sent to your email")
  → Account created, is_onboarded = false in database
  → Logs into dashboard
  → Sees empty dashboard with "Preview Mode" label
  → Waits for SholaX admin to populate their data and flip is_onboarded = true
```

### Active Client Flow
```
Opens browser → Goes to sholax.com
  → Clicks Login
  → Enters email + password
  → Redirected to /dashboard
  → Sees their own real data (pulled from Supabase based on their user ID)
  → Reviews Core Metrics, Pipeline, Campaigns
  → Reads Weekly Summary written by SholaX
  → Optionally clicks "Book a Client Call" to schedule a review call
  → Logs out
```

### Admin Flow
```
Goes to /admin (protected route)
  → Enters admin email + password
  → Sees list of all clients
  → Clicks on a client
  → Sees that client's full dashboard data in editable form
  → Updates any field (metrics, campaigns, summary, status, etc.)
  → Saves changes
  → Client sees updated data on their next page load
  → Can also toggle is_onboarded flag for any client
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend + Backend | Next.js 14 (App Router) | Single codebase, API routes replace Express, perfect Vercel deployment, SEO for marketing pages |
| Database | Supabase (PostgreSQL) | Free tier, relational DB perfect for per-client data isolation, row-level security |
| Authentication | Supabase Auth | Free, built into Supabase, handles sessions and JWTs, no extra service needed |
| Styling | Tailwind CSS | Utility-first, perfect for dark custom UI |
| UI Components | Shadcn/ui | Pre-built accessible components, dark theme ready, free |
| Charts | Recharts | Works seamlessly with React/Next.js, customisable dark theme, free |
| Hosting — Frontend | Vercel | Free tier, native Next.js support, zero config deployment |
| Hosting — Database | Supabase | Free tier included with Supabase |
| Booking | Calendly Embed | No building needed, just embed `https://calendly.com/contact-sholax/30min` |

**Total infrastructure cost: $0**

---

## Project Structure

```
sholax/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public marketing pages (no auth required)
│   │   ├── page.tsx              # Home page
│   │   ├── ad-system/
│   │   │   └── page.tsx          # Ad System page
│   │   ├── automations/
│   │   │   └── page.tsx          # Automations page (9 system cards + demo previews)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # THE dashboard (one page, 3 states)
│   │   ├── insights/
│   │   │   └── page.tsx          # Insights page
│   │   ├── library/
│   │   │   └── page.tsx          # Compatibility redirect → /automations
│   │   └── book-a-call/
│   │       └── page.tsx          # Book a Call page with Calendly
│   ├── (auth)/                   # Auth pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── onboarding/
│   │       └── page.tsx          # 4-step onboarding flow
│   ├── admin/                    # Admin panel (protected)
│   │   └── page.tsx
│   └── api/                      # API routes (Next.js route handlers)
│       ├── dashboard/
│       │   └── route.ts          # GET dashboard data for logged-in client
│       ├── admin/
│       │   ├── clients/
│       │   │   └── route.ts      # GET all clients list
│       │   └── update/
│       │       └── route.ts      # POST update client dashboard data
│       └── onboarding/
│           └── route.ts          # POST save onboarding business info
├── components/                   # Reusable React components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── dashboard/
│   │   ├── DashboardShell.tsx    # Wrapper that decides which state to show
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
│   │   ├── TopMessage.tsx
│   │   └── ClientCallSection.tsx
│   ├── admin/
│   │   ├── ClientList.tsx
│   │   └── ClientEditor.tsx
│   └── ui/                       # Shadcn components live here
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser-side Supabase client
│   │   └── server.ts             # Server-side Supabase client
│   ├── demo-data.ts              # Hardcoded demo data for visitors
│   └── types.ts                  # TypeScript types for all data shapes
├── middleware.ts                  # Auth protection for /admin route
├── .env.local                    # Environment variables (never committed)
├── .env.example                  # Example env file (committed, no real values)
└── README.md                     # This file
```

---

## How All Parts Connect

```
Browser (User)
     │
     ▼
Next.js (Vercel)
     │
     ├── Public pages → Static/SSR content, no auth needed
     │
     ├── /dashboard → DashboardShell component
     │       │
     │       ├── No session → render with DEMO_DATA (hardcoded in lib/demo-data.ts)
     │       │
     │       ├── Session + is_onboarded = false → render with empty placeholder data
     │       │
     │       └── Session + is_onboarded = true → fetch from /api/dashboard
     │               │
     │               └── Supabase: SELECT * FROM dashboard_data WHERE user_id = X
     │
     ├── /admin → Protected by middleware.ts
     │       │
     │       ├── Not admin → redirect to /login
     │       │
     │       └── Is admin → Admin panel
     │               │
     │               ├── GET /api/admin/clients → Supabase: SELECT all clients
     │               │
     │               └── POST /api/admin/update → Supabase: UPDATE dashboard_data
     │
     └── Supabase
             ├── Auth (sessions, JWT)
             └── PostgreSQL (all client data)
```

---

## Pages Overview

| Page | Route | Auth Required | Description |
|------|-------|---------------|-------------|
| Home | `/` | No | Landing page with Automations preview + `View Automations →` CTA |
| Ad System | `/ad-system` | No | Focused on enquiries, ad performance, and optimisation |
| Automations | `/automations` | No | 9 automation systems with lightweight demo previews and `Implement For Your Business →` CTAs |
| Dashboard | `/dashboard` | No (but changes by state) | The main client portal |
| Insights | `/insights` | No | Tips, case studies, content |
| Library | `/library` | No | Compatibility route that redirects to `/automations` |
| Book a Call | `/book-a-call` | No | Video placeholder + Calendly embed |
| Login | `/login` | No | Email/password login |
| Onboarding | `/onboarding` | Yes (new users) | 4-step onboarding flow |
| Admin | `/admin` | Yes (admin only) | Admin control panel |

---

## Environment Variables

Create a `.env.local` file in the root of the project. Never commit this file.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin credentials (used to identify the single admin account)
ADMIN_EMAIL=admin@sholax.com
```

A `.env.example` file is committed to the repo with these keys but no values, so any developer knows what variables are needed.

**Rules:**
- `NEXT_PUBLIC_` prefix = safe to expose to the browser
- `SUPABASE_SERVICE_ROLE_KEY` = server-side only, never expose to browser
- `ADMIN_EMAIL` = server-side only

---

## Running the Project Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-repo/sholax.git
cd sholax

# 2. Install dependencies
npm install

# 3. Copy env example and fill in your values
cp .env.example .env.local
# Then open .env.local and add your Supabase credentials

# 4. Run the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

---

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repo to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

### Database (Supabase)
1. Create a Supabase project at supabase.com
2. Run the SQL schema from `README-DATABASE.md`
3. Copy the project URL and keys to your `.env.local` and Vercel environment variables

---

## Related READMEs

| File | What It Covers |
|------|---------------|
| `README-DATABASE.md` | Full database schema, tables, columns, relationships, RLS policies |
| `README-DASHBOARD.md` | Dashboard system, 3 user states, all sections, data flow |
| `README-ADMIN.md` | Admin panel, all controls, how changes reflect on dashboard |
| `README-DEVELOPMENT.md` | Phase-by-phase build guide for developers |
