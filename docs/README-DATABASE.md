# SholaX — Database README

## Table of Contents
1. [Overview](#overview)
2. [Database Platform](#database-platform)
3. [Core Design Principles](#core-design-principles)
4. [Tables](#tables)
5. [Full SQL Schema](#full-sql-schema)
6. [Row Level Security](#row-level-security)
7. [Data Relationships](#data-relationships)
8. [How Per-Client Isolation Works](#how-per-client-isolation-works)
9. [How the Onboarding Flag Works](#how-the-onboarding-flag-works)
10. [How Demo Data Works](#how-demo-data-works)
11. [Admin Data Access](#admin-data-access)

---

## Overview

The database stores everything that the admin enters for each client. There are no API integrations — all data is manually written into the database by the SholaX admin through the admin panel.

The database must:
- Store one record of dashboard data per client
- Keep each client's data completely isolated from other clients
- Track whether a client is onboarded or not
- Support every field shown on the dashboard
- Allow the admin to update any field at any time

---

## Database Platform

**Supabase** — hosted PostgreSQL with a generous free tier.

Supabase provides:
- PostgreSQL database
- Authentication (users, sessions, JWTs)
- Row Level Security (data access rules at the database level)
- Auto-generated REST API (not used directly — we use our own Next.js API routes)
- Dashboard for manual inspection

---

## Core Design Principles

### 1. One Row Per Client Per Ad Platform
Each client has exactly two rows in `dashboard_data`:
- One row for their Meta Ads data
- One row for their Google Ads data

This is how the dashboard duplication works — same layout, two independent data rows.

### 2. No Shared Data
No field is shared between clients. Every single piece of data is scoped to a `user_id`.

### 3. Flat Over Nested (Where Possible)
Most metrics are stored as flat columns rather than nested JSON for easier querying and editing. Campaign rows and log entries (which are truly lists) are stored as JSONB arrays.

### 4. Admin Uses Service Role
The admin bypasses Row Level Security using the Supabase service role key (server-side only). This allows the admin to read and write any client's data.

### 5. Clients Use RLS
Regular client users can only read their own rows through Row Level Security policies enforced at the database level.

---

## Tables

### Table 1: `profiles`
Stores additional user information beyond what Supabase Auth provides.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Same as `auth.users.id` — links to Supabase Auth |
| `email` | TEXT | Client's email address |
| `business_name` | TEXT | Their business name (from onboarding step 2) |
| `industry` | TEXT | Their industry (from onboarding step 2) |
| `goals` | TEXT | Their stated advertising goals (from onboarding step 2) |
| `is_onboarded` | BOOLEAN | false = preview mode, true = full dashboard |
| `created_at` | TIMESTAMPTZ | When they signed up |
| `updated_at` | TIMESTAMPTZ | Last time profile was updated |

**Notes:**
- `id` is a foreign key referencing `auth.users(id)` — Supabase Auth creates the auth record, we create the profile record
- `is_onboarded` defaults to `false` on creation
- Only the admin can set `is_onboarded = true`

---

### Table 2: `dashboard_data`
The main table. Stores all dashboard content for each client, for each ad platform.

One client will have exactly **2 rows** in this table:
- `platform = 'meta'`
- `platform = 'google'`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated |
| `user_id` | UUID (FK) | References `profiles.id` |
| `platform` | TEXT | Either `'meta'` or `'google'` |
| **Top Strip** | | |
| `client_name` | TEXT | Display name shown at top of dashboard |
| `status` | TEXT | e.g. "Active", "Paused", "Under Review" |
| `last_updated` | TIMESTAMPTZ | When admin last updated this data |
| `active_campaigns` | INTEGER | Number of currently active campaigns |
| **Core Metrics** | | |
| `ad_spend` | NUMERIC | Total ad spend (currency value) |
| `enquiries_generated` | INTEGER | Total leads/enquiries generated |
| `cost_per_enquiry` | NUMERIC | Calculated or manually entered CPE |
| `qualified_enquiries` | INTEGER | Enquiries that passed qualification |
| `calls_booked` | INTEGER | Number of calls booked |
| `cost_per_call` | NUMERIC | Calculated or manually entered CPC |
| **Lead Quality** | | |
| `contact_rate` | NUMERIC | Percentage — contact rate |
| `qualification_rate` | NUMERIC | Percentage — qualification rate |
| `follow_up_coverage` | NUMERIC | Percentage — follow-up coverage |
| **Pipeline** | | |
| `pipeline_new_enquiries` | INTEGER | Stage 1 of pipeline |
| `pipeline_contacted` | INTEGER | Stage 2 of pipeline |
| `pipeline_qualified` | INTEGER | Stage 3 of pipeline |
| `pipeline_booked_calls` | INTEGER | Stage 4 of pipeline |
| **Campaign Table** | | |
| `campaigns` | JSONB | Array of campaign objects (see structure below) |
| **Top Performing Ad** | | |
| `top_ad_name` | TEXT | Name of the top performing ad |
| `top_ad_hook` | TEXT | Hook or angle of the ad |
| `top_ad_leads` | INTEGER | Leads generated by this ad |
| `top_ad_cpl` | NUMERIC | Cost per lead for this ad |
| **AI Optimisation Log** | | |
| `optimisation_log` | JSONB | Array of log entry objects (see structure below) |
| **System Status** | | |
| `status_lead_generation` | TEXT | "Active", "Issue", "Paused" |
| `status_lead_handling` | TEXT | "Active", "Issue", "Paused" |
| `status_optimisation` | TEXT | "Active", "Issue", "Paused" |
| **Current Actions** | | |
| `current_actions` | JSONB | Array of action strings |
| **Weekly Summary** | | |
| `weekly_summary` | TEXT | Large text block written by admin |
| **Top Message** | | |
| `top_message` | TEXT | Overrides default message if set |
| `top_message_visible` | BOOLEAN | Whether to show the top message banner |
| **Timestamps** | | |
| `created_at` | TIMESTAMPTZ | When row was created |
| `updated_at` | TIMESTAMPTZ | When row was last updated (auto-updated by trigger) |

---

### JSONB Column Structures

#### `campaigns` array
Each element in the campaigns array is an object:
```json
[
  {
    "id": "uuid-string",
    "name": "Campaign Name",
    "spend": 1250.00,
    "leads": 47,
    "cpl": 26.60,
    "status": "Active"
  }
]
```

#### `optimisation_log` array
Each element in the log array is an object:
```json
[
  {
    "id": "uuid-string",
    "entry": "Adjusted audience targeting to exclude under 25s based on low qualification rate.",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

#### `current_actions` array
Simple array of strings:
```json
[
  "Testing 3 new ad creatives this week",
  "Expanding lookalike audience to 3%",
  "Following up on 12 stale leads"
]
```

---

## Full SQL Schema

Run this SQL in your Supabase SQL editor to set up the full database:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  business_name text,
  industry text,
  goals text,
  is_onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- DASHBOARD DATA TABLE
create table dashboard_data (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  platform text not null check (platform in ('meta', 'google')),

  -- Top Strip
  client_name text,
  status text default 'Active',
  last_updated timestamptz default now(),
  active_campaigns integer default 0,

  -- Core Metrics
  ad_spend numeric(10,2) default 0,
  enquiries_generated integer default 0,
  cost_per_enquiry numeric(10,2) default 0,
  qualified_enquiries integer default 0,
  calls_booked integer default 0,
  cost_per_call numeric(10,2) default 0,

  -- Lead Quality
  contact_rate numeric(5,2) default 0,
  qualification_rate numeric(5,2) default 0,
  follow_up_coverage numeric(5,2) default 0,

  -- Pipeline
  pipeline_new_enquiries integer default 0,
  pipeline_contacted integer default 0,
  pipeline_qualified integer default 0,
  pipeline_booked_calls integer default 0,

  -- Campaign Table
  campaigns jsonb default '[]'::jsonb,

  -- Top Performing Ad
  top_ad_name text,
  top_ad_hook text,
  top_ad_leads integer default 0,
  top_ad_cpl numeric(10,2) default 0,

  -- AI Optimisation Log
  optimisation_log jsonb default '[]'::jsonb,

  -- System Status
  status_lead_generation text default 'Active',
  status_lead_handling text default 'Active',
  status_optimisation text default 'Active',

  -- Current Actions
  current_actions jsonb default '[]'::jsonb,

  -- Weekly Summary
  weekly_summary text,

  -- Top Message
  top_message text,
  top_message_visible boolean default true,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Enforce one row per client per platform
  unique(user_id, platform)
);

-- AUTO-UPDATE updated_at TRIGGER
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_dashboard_data_updated_at
  before update on dashboard_data
  for each row execute function update_updated_at_column();

create trigger update_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at_column();

-- AUTO-CREATE PROFILE ON SIGNUP TRIGGER
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- AUTO-CREATE DASHBOARD ROWS ON PROFILE CREATION
create or replace function handle_new_profile()
returns trigger as $$
begin
  insert into dashboard_data (user_id, platform)
  values (new.id, 'meta');

  insert into dashboard_data (user_id, platform)
  values (new.id, 'google');

  return new;
end;
$$ language plpgsql security definer;

create trigger on_profile_created
  after insert on profiles
  for each row execute function handle_new_profile();
```

---

## Row Level Security

Row Level Security (RLS) ensures clients can only access their own data. The admin bypasses RLS using the service role key.

```sql
-- Enable RLS on both tables
alter table profiles enable row level security;
alter table dashboard_data enable row level security;

-- PROFILES policies
-- Users can read their own profile
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

-- Users can update their own profile (for onboarding)
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- DASHBOARD DATA policies
-- Users can only read their own dashboard data
create policy "Users can read own dashboard data"
  on dashboard_data for select
  using (auth.uid() = user_id);

-- Users cannot write dashboard data (only admin can via service role)
-- No insert/update/delete policies for users = blocked by default
```

**How admin bypasses RLS:**
The admin uses `SUPABASE_SERVICE_ROLE_KEY` in server-side API routes. The service role key bypasses all RLS policies. This key is NEVER exposed to the browser — it only lives in server-side Next.js route handlers and environment variables.

---

## Data Relationships

```
auth.users (Supabase Auth)
    │
    │ (1-to-1, auto-created by trigger)
    ▼
profiles
    │
    │ (1-to-2, auto-created by trigger)
    ▼
dashboard_data
    ├── row where platform = 'meta'
    └── row where platform = 'google'
```

When a new user signs up:
1. Supabase Auth creates a record in `auth.users`
2. Trigger `on_auth_user_created` fires → creates a row in `profiles`
3. Trigger `on_profile_created` fires → creates 2 rows in `dashboard_data` (one for meta, one for google)
4. All three happen automatically — no manual insertion needed

---

## How Per-Client Isolation Works

Every row in `dashboard_data` has a `user_id` column.

When a client logs in and their dashboard loads:
```
Client logs in → Supabase Auth returns session with user's UUID
→ Next.js API route receives request with session cookie
→ Server verifies session → gets user UUID
→ SELECT * FROM dashboard_data WHERE user_id = 'that-uuid' AND platform = 'meta'
→ Returns only their data
→ Same query for platform = 'google'
→ Client never sees any other user's data
```

RLS enforces this at the database level too — even if the query was wrong, Supabase would block it.

---

## How the Onboarding Flag Works

The `is_onboarded` column in `profiles` is the single flag that controls what a logged-in user sees.

| `is_onboarded` | What client sees |
|----------------|-----------------|
| `false` | Empty dashboard with "Preview Mode" label |
| `true` | Their real data from `dashboard_data` |

**Who sets it:**
Only the admin sets `is_onboarded = true`. They do this through the admin panel after confirming the client has paid and their account is ready.

**How the dashboard reads it:**
```
Client loads /dashboard
→ Server checks session
→ Session exists → fetch profile → check is_onboarded
→ is_onboarded = false → render with empty placeholder data
→ is_onboarded = true → fetch dashboard_data → render with real data
```

---

## How Demo Data Works

Visitors (not logged in) see the dashboard with demo data. This data is **hardcoded** in `lib/demo-data.ts` — it is not stored in the database.

Why hardcoded and not in the database?
- Demo data never changes
- No need for a DB round-trip for visitors
- Simpler — no "demo user" or "demo client" to manage
- Faster page load

The `lib/demo-data.ts` file exports two objects — one for Meta demo data and one for Google demo data — with the same shape as a real `dashboard_data` row. The dashboard component simply receives this data as props when no session is detected.

---

## Admin Data Access

The admin uses the Supabase service role key which bypasses all RLS policies.

Admin operations:
```sql
-- Get all clients
SELECT p.id, p.email, p.business_name, p.is_onboarded, p.created_at
FROM profiles p
ORDER BY p.created_at DESC;

-- Get a specific client's dashboard data
SELECT * FROM dashboard_data
WHERE user_id = 'client-uuid';

-- Update a specific field
UPDATE dashboard_data
SET ad_spend = 3500.00, updated_at = now()
WHERE user_id = 'client-uuid' AND platform = 'meta';

-- Toggle onboarded status
UPDATE profiles
SET is_onboarded = true
WHERE id = 'client-uuid';
```

All of these are called via server-side Next.js API routes using the service role key — never directly from the browser.
