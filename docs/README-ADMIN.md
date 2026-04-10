# SholaX — Admin Panel README

## Table of Contents
1. [Overview](#overview)
2. [Who Uses the Admin Panel](#who-uses-the-admin-panel)
3. [How Admin Logs In](#how-admin-logs-in)
4. [Route Protection](#route-protection)
5. [Admin Panel Layout](#admin-panel-layout)
6. [Client List](#client-list)
7. [Client Editor — Every Control](#client-editor--every-control)
8. [How Changes Reflect on the Dashboard](#how-changes-reflect-on-the-dashboard)
9. [Onboarding Flag Control](#onboarding-flag-control)
10. [API Routes — Admin Operations](#api-routes--admin-operations)
11. [Security Rules](#security-rules)

---

## Overview

The admin panel is a **private, password-protected page** at `/admin`. It is the control room for the entire SholaX dashboard system.

From the admin panel, the SholaX staff member can:
- See every client that has signed up
- Select any client
- Edit every single field on their Meta and Google dashboard sections
- Write weekly summaries
- Update campaign tables
- Toggle whether a client is onboarded or not

There is **one admin account**. There is no admin management UI — the admin's credentials are set up directly in Supabase Auth and the admin email is stored in the environment variables.

Everything the admin enters here is what clients see on their dashboard. There is no automation, no data syncing, no API connections. Pure manual entry.

---

## Who Uses the Admin Panel

Only SholaX staff. There is one admin account. No client ever accesses this page.

The admin's email is stored in `.env.local` as `ADMIN_EMAIL`. The admin's password is set directly in Supabase Auth (not stored in environment variables).

---

## How Admin Logs In

The admin logs in through the same `/login` page as regular clients. After logging in, Supabase Auth creates a session.

The difference between admin and client is checked by comparing the logged-in user's email against the `ADMIN_EMAIL` environment variable — **server-side only**.

Flow:
```
Admin goes to /admin
→ Middleware checks session
→ No session → redirect to /login
→ Has session → check if email matches ADMIN_EMAIL (server-side)
→ Email does NOT match → redirect to /dashboard (they're a regular client)
→ Email MATCHES → render admin panel
```

This check happens in `middleware.ts` and is double-checked in the API routes.

---

## Route Protection

`middleware.ts` handles route protection for `/admin`:

```
Request to /admin
    │
    ├── Check Supabase session (from cookies)
    │
    ├── No session → redirect to /login?redirect=/admin
    │
    └── Session exists
        │
        ├── Get user email from session
        │
        ├── Email !== ADMIN_EMAIL → redirect to /dashboard
        │
        └── Email === ADMIN_EMAIL → allow request through
```

This means:
- A regular client who somehow navigates to `/admin` gets redirected to their dashboard
- An unauthenticated visitor gets redirected to login
- Only the admin email passes through

Additionally, every `/api/admin/*` route performs the same email check server-side before executing any database operation.

---

## Admin Panel Layout

The admin panel is a two-panel layout:

```
┌──────────────────────────────────────────────────────┐
│ ADMIN PANEL — SholaX                        [Logout] │
├──────────────────────┬───────────────────────────────┤
│                      │                               │
│  CLIENT LIST         │  CLIENT EDITOR                │
│  ─────────────       │  ──────────────               │
│  🔍 Search           │  [Client Name] — [Platform]   │
│                      │                               │
│  > ABC Dental        │  ┌─ Top Strip ─────────────┐  │
│    Jane's Gym        │  │ Client Name: [input]    │  │
│    Smith Legal       │  │ Status: [dropdown]      │  │
│    ...               │  │ Active Campaigns: [num] │  │
│                      │  └─────────────────────────┘  │
│  [+ Add Client]      │  ┌─ Core Metrics ──────────┐  │
│                      │  │ Ad Spend: [input]       │  │
│                      │  │ Enquiries: [input]      │  │
│                      │  │ ...                     │  │
│                      │  └─────────────────────────┘  │
│                      │                               │
│                      │  [META] [GOOGLE] — tab toggle │
│                      │                               │
│                      │  [Save Changes]               │
│                      │                               │
│                      │  ── Onboarding ──             │
│                      │  Status: Not Onboarded        │
│                      │  [Mark as Onboarded]          │
│                      │                               │
└──────────────────────┴───────────────────────────────┘
```

**Left panel:** Scrollable list of all clients. Searchable. Clicking a client loads them into the right panel.

**Right panel:** Full editor for the selected client. Has a toggle between Meta and Google sections. Save button at the bottom of each section.

---

## Client List

### What it shows
For each client in the list:
- Business name (or email if no business name yet)
- Onboarding status badge (Not Onboarded / Onboarded)
- Date they signed up

### Search
A text input that filters clients by business name or email in real time (client-side filter, no new API call needed).

### How it loads
On admin panel load, a single API call fetches all clients:

```
GET /api/admin/clients
→ Returns array of { id, email, business_name, is_onboarded, created_at }
→ Rendered as a scrollable list
```

### Selecting a client
Clicking a client in the list:
1. Sets selected client in local state
2. Fetches that client's dashboard data for both platforms
3. Loads the data into the Client Editor form

---

## Client Editor — Every Control

When a client is selected, the right panel shows a tabbed editor with a **Meta** tab and a **Google** tab. Each tab contains the full set of editable fields for that platform.

All fields described below exist for BOTH Meta and Google tabs independently.

---

### Top Strip Fields

| Field | Input Type | Notes |
|-------|-----------|-------|
| Client Name | Text input | Display name on dashboard |
| Status | Dropdown | Options: "Active", "Paused", "Under Review" |
| Active Campaigns | Number input | Integer only |
| Last Updated | Auto-set on save | Set to current timestamp when admin saves |

---

### Core Metrics Fields

| Field | Input Type | Notes |
|-------|-----------|-------|
| Ad Spend | Number input (decimal) | Currency value, 2 decimal places |
| Enquiries Generated | Number input | Integer |
| Cost Per Enquiry | Number input (decimal) | Can be manually entered or auto-calculated |
| Qualified Enquiries | Number input | Integer |
| Calls Booked | Number input | Integer |
| Cost Per Call | Number input (decimal) | Can be manually entered or auto-calculated |

---

### Lead Quality Fields

| Field | Input Type | Notes |
|-------|-----------|-------|
| Contact Rate % | Number input (0-100) | Percentage value |
| Qualification Rate % | Number input (0-100) | Percentage value |
| Follow-Up Coverage % | Number input (0-100) | Percentage value |

---

### Pipeline Fields

| Field | Input Type | Notes |
|-------|-----------|-------|
| New Enquiries | Number input | Integer |
| Contacted | Number input | Integer |
| Qualified | Number input | Integer |
| Booked Calls | Number input | Integer |

---

### Campaign Table

The admin can add, edit, and delete campaigns for each platform.

**Add Campaign:**
A form row at the bottom of the table with inputs for:
- Campaign Name (text)
- Spend (number)
- Leads (number)
- CPL (number)
- Status (dropdown: Active / Paused / Complete)

Clicking "Add" appends the new campaign to the `campaigns` JSONB array.

**Edit Campaign:**
Each row in the table has an Edit button. Clicking it turns that row into an editable inline form. Admin edits the values and clicks Save Row.

**Delete Campaign:**
Each row has a Delete button with a confirmation. Removes that campaign from the array.

**Important:** Changes to the campaign table are saved as part of the overall "Save Changes" action for that platform — or optionally saved immediately per row (implementation decision).

---

### Top Performing Ad Fields

| Field | Input Type | Notes |
|-------|-----------|-------|
| Ad Name | Text input | Name of the ad |
| Hook / Angle | Text input or textarea | The creative hook |
| Leads | Number input | Integer |
| CPL | Number input (decimal) | Cost per lead |

---

### AI Optimisation Log

**Add Entry:**
A textarea where admin types a new log entry. Clicking "Add Entry" prepends it to the log array with the current timestamp.

**Edit Entry:**
Each log entry has an edit button. Admin can edit the text of existing entries.

**Delete Entry:**
Each log entry has a delete button with confirmation.

---

### System Status Fields

| Field | Input Type | Options |
|-------|-----------|---------|
| Lead Generation | Dropdown | Active / Issue / Paused |
| Lead Handling | Dropdown | Active / Issue / Paused |
| Optimisation | Dropdown | Active / Issue / Paused |

---

### Current Actions

A dynamic list of text items.

**Add:** Text input + "Add Action" button → appends to array.

**Edit:** Click pencil icon on any item → inline text edit.

**Delete:** Click trash icon on any item → removes from array (with confirmation).

---

### Weekly Summary

**Input type:** Large textarea (minimum 8 rows tall, resizable).

**Notes:** Free text. Admin writes this each week. No character limit enforced. Shows a character count below the textarea.

---

### Top Message Controls

| Control | Input Type | Notes |
|---------|-----------|-------|
| Top Message Text | Text input | Overrides the default "Want Your Own Dashboard?" message. Leave blank for default. |
| Show/Hide Top Message | Toggle/checkbox | Controls `top_message_visible`. When off, banner is hidden entirely. |

---

## How Changes Reflect on the Dashboard

When admin clicks "Save Changes":

```
Admin fills in fields → clicks "Save Changes"
    │
    ▼
POST /api/admin/update
    Body: { user_id: "client-uuid", platform: "meta", ...all field values }
    │
    ▼
Server validates:
    - Checks admin session
    - Confirms email === ADMIN_EMAIL
    - Validates data types
    │
    ▼
Supabase UPDATE:
    UPDATE dashboard_data
    SET field1 = value1, field2 = value2, ..., updated_at = now()
    WHERE user_id = 'client-uuid' AND platform = 'meta'
    │
    ▼
Returns: { success: true }
    │
    ▼
Admin sees: Success toast notification
```

**When does the client see it?**
The client sees the updated data the next time they load or refresh their dashboard page. There is no real-time pushing — it's a simple "on page load, fetch latest data" model.

This is intentional. Real-time updates would add complexity with no meaningful benefit — the admin updates data once a week or so.

---

## Onboarding Flag Control

Each client in the editor has an "Onboarding Status" section separate from the dashboard data fields.

**What it shows:**
- Current status: "Not Onboarded" or "Onboarded" (with colored badge)
- A button to toggle the status

**Behavior:**
- If currently Not Onboarded → button says "Mark as Onboarded" (green)
- If currently Onboarded → button says "Mark as Not Onboarded" (red/warning)

**What happens on toggle:**
```
Admin clicks "Mark as Onboarded"
    │
    ▼
POST /api/admin/toggle-onboarding
    Body: { user_id: "client-uuid", is_onboarded: true }
    │
    ▼
Server validates admin session
    │
    ▼
UPDATE profiles SET is_onboarded = true WHERE id = 'client-uuid'
    │
    ▼
Client list refreshes, badge updates
```

**Effect on dashboard:**
The next time the client loads their dashboard, the server checks their `is_onboarded` flag. If now true, they see their real data and the Client Call Section appears.

---

## API Routes — Admin Operations

All admin API routes are in `app/api/admin/`. Every route checks admin authentication before executing.

---

### GET `/api/admin/clients`

**Purpose:** Fetch all clients for the client list.

**Auth check:** Verify session email === `ADMIN_EMAIL`

**Database query:**
```sql
SELECT id, email, business_name, is_onboarded, created_at
FROM profiles
ORDER BY created_at DESC
```

**Response:**
```json
{
  "clients": [
    {
      "id": "uuid",
      "email": "client@business.com",
      "business_name": "ABC Dental",
      "is_onboarded": true,
      "created_at": "2024-01-10T09:00:00Z"
    }
  ]
}
```

---

### GET `/api/admin/client-data?user_id=X`

**Purpose:** Fetch a specific client's full dashboard data for both platforms.

**Auth check:** Verify session email === `ADMIN_EMAIL`

**Database query:**
```sql
SELECT * FROM dashboard_data WHERE user_id = 'X'
SELECT * FROM profiles WHERE id = 'X'
```

**Response:**
```json
{
  "meta": { ...all dashboard_data fields for platform='meta'... },
  "google": { ...all dashboard_data fields for platform='google'... },
  "profile": { "business_name": "...", "is_onboarded": true, ... }
}
```

---

### POST `/api/admin/update`

**Purpose:** Save updated dashboard data for a client + platform.

**Auth check:** Verify session email === `ADMIN_EMAIL`

**Request body:**
```json
{
  "user_id": "client-uuid",
  "platform": "meta",
  "client_name": "ABC Dental",
  "status": "Active",
  "ad_spend": 3500.00,
  "enquiries_generated": 87,
  ...all other fields...
}
```

**Database query:**
```sql
UPDATE dashboard_data
SET client_name = $1, status = $2, ad_spend = $3, ..., updated_at = now()
WHERE user_id = $user_id AND platform = $platform
```

**Response:**
```json
{ "success": true }
```

---

### POST `/api/admin/toggle-onboarding`

**Purpose:** Toggle a client's `is_onboarded` flag.

**Auth check:** Verify session email === `ADMIN_EMAIL`

**Request body:**
```json
{
  "user_id": "client-uuid",
  "is_onboarded": true
}
```

**Database query:**
```sql
UPDATE profiles SET is_onboarded = $1 WHERE id = $user_id
```

**Response:**
```json
{ "success": true, "is_onboarded": true }
```

---

## Security Rules

1. **Admin route is server-protected.** `middleware.ts` blocks non-admin users before the page even loads.

2. **Every admin API route double-checks admin identity.** Even if someone crafts a direct API request, the server verifies the session email matches `ADMIN_EMAIL` before touching the database.

3. **Admin uses service role key.** The `SUPABASE_SERVICE_ROLE_KEY` is only used in server-side API routes. It is never sent to the browser. It bypasses RLS so admin can read/write any client's data.

4. **`ADMIN_EMAIL` is an environment variable.** It is never hardcoded in source code. Changing the admin email requires only an environment variable update, no code change.

5. **No client can access admin API routes.** Even if a logged-in client knew the API route URL, the server rejects their request because their email doesn't match `ADMIN_EMAIL`.

6. **All inputs are validated server-side.** Numbers must be numbers, required fields must be present, platform must be 'meta' or 'google'. Invalid requests return 400.
