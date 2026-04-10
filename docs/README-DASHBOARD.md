# SholaX — Dashboard System README

## Table of Contents
1. [The Core Concept](#the-core-concept)
2. [The 3 User States](#the-3-user-states)
3. [How the Dashboard Decides What to Show](#how-the-dashboard-decides-what-to-show)
4. [The Duplication — Meta and Google](#the-duplication--meta-and-google)
5. [Every Dashboard Section — Detailed](#every-dashboard-section--detailed)
6. [Special Sections](#special-sections)
7. [Dashboard UI Layout](#dashboard-ui-layout)
8. [API — How Frontend Requests Data](#api--how-frontend-requests-data)
9. [Component Architecture](#component-architecture)
10. [Demo Data Structure](#demo-data-structure)
11. [Empty/Preview State Structure](#emptypreview-state-structure)
12. [Design Notes](#design-notes)

---

## The Core Concept

There is **exactly one dashboard page** at the route `/dashboard`.

This is not three pages. This is not a page with redirects. It is one single page, one single component tree, that renders differently based on who is looking at it.

The page checks:
1. Is there a logged-in session?
2. If yes — is the user onboarded?

Based on those two checks, it decides which data to pass into the same dashboard layout.

The layout itself never changes. The components never change. Only the **data passed into them** changes.

---

## The 3 User States

### State 1: Visitor (No Session)

**Who:** Anyone browsing sholax.com without logging in.

**What they see:**
- The full dashboard layout with all sections visible
- Demo/placeholder data in every field
- Realistic-looking numbers (hardcoded in `lib/demo-data.ts`)
- The Top Message banner: "Want Your Own Client Acquisition Dashboard?"
- A "Book Your Call" button
- They do NOT see the Client Call Section (that's for onboarded clients only)

**Why:** This is a marketing tool. Visitors need to see how impressive the dashboard looks so they're motivated to become a client.

**Data source:** `lib/demo-data.ts` — hardcoded, no database query.

---

### State 2: Logged In, Not Onboarded (Preview Mode)

**Who:** A client who signed up and completed onboarding steps but hasn't been activated by admin yet.

**What they see:**
- The full dashboard layout
- Empty/zero values in all metric fields
- A "Preview Mode" label/badge at the top
- Placeholder text in text fields
- Empty tables and charts
- The Top Message banner still visible
- They do NOT see the Client Call Section

**Why:** They're a real user but their data isn't set up yet. Show them the structure so they know what's coming.

**Data source:** Hardcoded empty/zero object in the frontend — no database query for the data itself (profile is fetched to confirm is_onboarded = false).

---

### State 3: Logged In, Onboarded (Full Client)

**Who:** An active paying client whose admin has populated their dashboard.

**What they see:**
- The full dashboard with their real data
- All metrics, campaigns, summaries updated by SholaX admin
- The Client Call Section (visible only for them)
- The Top Message if admin has left it on, or no Top Message if admin removed it
- Their specific weekly summary, campaigns, actions

**Data source:** API call to `/api/dashboard` → Supabase query for their `user_id`.

---

## How the Dashboard Decides What to Show

This logic lives in the `DashboardShell` component (server component in Next.js App Router):

```
/dashboard page loads
    │
    ├── Check Supabase session (server-side)
    │
    ├── NO SESSION
    │   └── Pass DEMO_DATA into dashboard components
    │       └── Render with demo data, no Preview Mode label
    │
    └── SESSION EXISTS
        │
        ├── Fetch profile from Supabase (get is_onboarded)
        │
        ├── is_onboarded = FALSE
        │   └── Pass EMPTY_DATA into dashboard components
        │       └── Render with empty data + "Preview Mode" label
        │
        └── is_onboarded = TRUE
            └── Fetch dashboard_data for this user_id (both platforms)
                └── Pass real data into dashboard components
                    └── Render with real data + show Client Call Section
```

The `DashboardShell` is a server component that:
1. Gets the session from Supabase server client
2. Makes the appropriate data decision
3. Passes data down as props to all child dashboard components

No client-side state needed for this logic. It all happens server-side on page load.

---

## The Duplication — Meta and Google

The dashboard has **two complete, identical sections**:
1. **Meta Ads** (Facebook & Instagram)
2. **Google Ads**

These are not different pages. They are not tabs. They are two full sections rendered one after the other on the same page, with a clear visual separator and header between them.

Each section contains ALL the dashboard sections listed below (Top Strip, Core Metrics, Lead Quality, etc.).

**How data is kept separate:**
- In the database, the admin enters data for `platform = 'meta'` and `platform = 'google'` separately
- The API returns two objects: `metaData` and `googleData`
- The dashboard renders the Meta section using `metaData` and the Google section using `googleData`
- Changing one platform's data has zero effect on the other

**Component reuse:**
Every section component (e.g. `CoreMetrics`, `Pipeline`) is built to accept its data as props. The same component renders twice — once with `metaData` and once with `googleData`. No duplication of code, just duplication of rendering.

Example:
```tsx
<PlatformSection title="Meta Ads (Facebook & Instagram)" data={metaData} />
<PlatformSection title="Google Ads" data={googleData} />
```

Where `PlatformSection` internally renders all sub-sections using the data it receives.

---

## Every Dashboard Section — Detailed

### 1. Top Strip

**Purpose:** At-a-glance client overview shown at the very top of each platform section.

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| Client Name | Text | The client's business name |
| Status | Dropdown (display only) | e.g. "Active", "Paused", "Under Review" |
| Last Updated | Date/Time | When admin last updated this platform's data |
| Active Campaigns | Number | Count of currently running campaigns |

**UI:** A horizontal strip with 4 stat boxes. Dark background, subtle border. Status shown as a coloured badge (green = Active, yellow = Under Review, red = Paused).

**Data source:** `client_name`, `status`, `last_updated`, `active_campaigns` columns in `dashboard_data`.

---

### 2. Core Metrics

**Purpose:** The 6 most important performance numbers. These are the headline stats.

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| Ad Spend | Currency | Total amount spent on ads |
| Enquiries Generated | Number | Total leads that came in |
| Cost Per Enquiry | Currency | Ad Spend ÷ Enquiries |
| Qualified Enquiries | Number | Leads that passed qualification criteria |
| Calls Booked | Number | Leads that booked a discovery call |
| Cost Per Call | Currency | Ad Spend ÷ Calls Booked |

**UI:** 6 metric cards in a 2x3 or 3x2 grid. Each card has: metric label (small, muted), value (large, prominent), and optionally a trend indicator. Dark card style with subtle glow on key metrics.

**Data source:** `ad_spend`, `enquiries_generated`, `cost_per_enquiry`, `qualified_enquiries`, `calls_booked`, `cost_per_call` columns.

---

### 3. Lead Quality

**Purpose:** Shows the percentage-based quality metrics for leads coming in.

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| Contact Rate % | Percentage | % of leads that were successfully contacted |
| Qualification Rate % | Percentage | % of contacted leads that qualified |
| Follow-Up Coverage % | Percentage | % of leads that received proper follow-up |

**UI:** 3 circular progress rings or horizontal progress bars. Each shows the percentage visually. Color coded: green (>70%), yellow (40-70%), red (<40%).

**Data source:** `contact_rate`, `qualification_rate`, `follow_up_coverage` columns.

---

### 4. Pipeline

**Purpose:** Shows the sales funnel — where leads are at each stage.

**Fields (in order):**
| Stage | Description |
|-------|-------------|
| New Enquiries | Total new leads that came in |
| Contacted | Leads that have been reached out to |
| Qualified | Leads that passed qualification |
| Booked Calls | Leads that booked a call |

**UI:** A horizontal funnel visualization or 4 connected stat boxes with arrows between them, showing the progression. Numbers decrease from left to right naturally (funnel shape). Each stage has a distinct color.

**Data source:** `pipeline_new_enquiries`, `pipeline_contacted`, `pipeline_qualified`, `pipeline_booked_calls` columns.

---

### 5. Campaign Table

**Purpose:** A detailed table showing every active campaign and its performance.

**Columns:**
| Column | Type | Description |
|--------|------|-------------|
| Campaign Name | Text | Name of the ad campaign |
| Spend | Currency | Amount spent on this campaign |
| Leads | Number | Leads generated by this campaign |
| CPL | Currency | Cost per lead for this campaign |
| Status | Badge | "Active", "Paused", "Complete" |

**UI:** A data table with dark styling. Rows are the campaigns. Status column shows coloured badges. Table has subtle row hover effect. If no campaigns exist, shows an empty state message.

**Data source:** `campaigns` JSONB array column. Each element is an object with `{ id, name, spend, leads, cpl, status }`.

**Note:** In the admin panel, the admin can add, edit, and delete rows in this table. The client dashboard shows this table read-only.

---

### 6. Top Performing Ad

**Purpose:** Highlights the single best-performing ad this period.

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| Ad Name | Text | Name of the ad |
| Hook / Angle | Text | The creative hook or message angle used |
| Leads | Number | How many leads this ad generated |
| CPL | Currency | Cost per lead for this ad |

**UI:** A highlighted card, visually distinct from other sections. Could have a star icon or "Top Performer" badge. Dark card with a subtle accent border.

**Data source:** `top_ad_name`, `top_ad_hook`, `top_ad_leads`, `top_ad_cpl` columns.

---

### 7. Performance Trends (Charts)

**Purpose:** Visual charts showing how performance has changed over time.

**Charts:**
| Chart | What It Shows |
|-------|--------------|
| Leads Over Time | Line chart — leads per day/week |
| Cost Trend | Line chart — CPL or spend over time |
| Spend vs Results | Bar chart — spend alongside leads generated |

**UI:** Built with Recharts. Dark background charts with colored lines/bars. Responsive. Axes show dates/values.

**Important:** These charts are **UI only** for now. The data shown in them is **hardcoded placeholder data** for all user states (visitor, preview, and real client). The admin does not enter chart data. This is a known limitation and is intentional per the requirements.

**Future:** When SholaX is ready, this section can be connected to real historical data stored in a separate time-series table.

---

### 8. AI Optimisation Log

**Purpose:** A log of actions and optimisations SholaX has made to the campaigns. Written by the admin.

**Structure:** A list of text entries, each with a timestamp. New entries appear at the top.

**UI:** Scrollable log/feed style. Each entry is a card with: entry text and the date it was added. Styled like a changelog or activity feed.

**Data source:** `optimisation_log` JSONB array. Each element: `{ id, entry, created_at }`.

**Note:** Admin can add new entries, edit existing ones, or delete entries. Client sees this read-only.

---

### 9. System Status

**Purpose:** Traffic-light style indicators showing the health of the 3 core systems SholaX manages.

**Fields:**
| System | Possible Values |
|--------|----------------|
| Lead Generation | Active / Issue / Paused |
| Lead Handling | Active / Issue / Paused |
| Optimisation | Active / Issue / Paused |

**UI:** 3 rows with a colored dot/badge next to each system name. Green = Active, Red = Issue, Yellow = Paused. Clean and minimal.

**Data source:** `status_lead_generation`, `status_lead_handling`, `status_optimisation` columns.

---

### 10. Current Actions

**Purpose:** A list of things SholaX is actively doing right now for this client.

**Structure:** A simple bullet-point style list of text strings.

**UI:** Clean list with subtle bullet points or checkmark icons. Dark card style.

**Data source:** `current_actions` JSONB array of strings.

**Note:** Admin can add, edit, delete individual action items.

---

### 11. Weekly Summary

**Purpose:** A freeform message written by SholaX to the client each week, explaining what happened, what's working, and what's being done.

**Structure:** A single large text block.

**UI:** Full-width card with a text block. Larger font than other sections. Feels like a personal message from the SholaX team.

**Data source:** `weekly_summary` TEXT column.

---

## Special Sections

### Top Message Banner

**What it is:** A banner at the very top of the dashboard page (above the Meta and Google sections) with a message and a "Book Your Call" button.

**Default message:** "Want Your Own Client Acquisition Dashboard?"

**Rules:**
- Shown to ALL users by default (visitor, preview, onboarded)
- Admin can change the message text per client
- Admin can remove it per client (set `top_message_visible = false`)
- The "Book Your Call" button is always present when the banner is visible
- "Book Your Call" links to the `/book-a-call` page

**UI:** Full-width dark banner with a gradient accent. Message text on the left. Button on the right. Subtle animation on load.

**Data source:**
- For visitors: hardcoded default message
- For logged-in users: `top_message` and `top_message_visible` from `dashboard_data` (uses default message if `top_message` is null)

---

### Client Call Section

**What it is:** A section that only appears for onboarded clients. Encourages them to book a review call with SholaX.

**Content:**
- A message like: "Want to review your performance with the SholaX team?"
- Button: "Book a Client Call" → links to Calendly
- Small text: "For existing clients only"

**Rules:**
- ONLY visible when `is_onboarded = true`
- Never shown to visitors
- Never shown to preview mode users
- Positioned below the main dashboard sections

**UI:** A distinct card or section with a subtle background color to make it stand out. Professional, inviting tone.

---

## Dashboard UI Layout

Full page layout from top to bottom:

```
┌─────────────────────────────────────────┐
│ Navbar                                  │
├─────────────────────────────────────────┤
│ TOP MESSAGE BANNER (if visible)         │
│ "Want Your Own Dashboard?" [Book Call]  │
├─────────────────────────────────────────┤
│ [Preview Mode Badge - if applicable]   │
├─────────────────────────────────────────┤
│ ═══════════════════════════════════     │
│  META ADS (Facebook & Instagram)        │
│ ═══════════════════════════════════     │
│ Top Strip                               │
│ Core Metrics (6 cards)                  │
│ Lead Quality (3 indicators)             │
│ Pipeline (4-stage funnel)               │
│ Campaign Table                          │
│ Top Performing Ad                       │
│ Performance Trends (3 charts)           │
│ AI Optimisation Log                     │
│ System Status                           │
│ Current Actions                         │
│ Weekly Summary                          │
├─────────────────────────────────────────┤
│ ═══════════════════════════════════     │
│  GOOGLE ADS                             │
│ ═══════════════════════════════════     │
│ [Same sections as above, Google data]   │
├─────────────────────────────────────────┤
│ CLIENT CALL SECTION (onboarded only)    │
│ "Review your performance?" [Book Call]  │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

---

## API — How Frontend Requests Data

### GET `/api/dashboard`

**Who calls it:** The `DashboardShell` server component, when a user is logged in AND onboarded.

**How it works:**
1. Next.js server component calls the route handler
2. Route handler creates a Supabase server client (reads session from cookies)
3. Verifies the session is valid — gets `user_id`
4. Queries `dashboard_data` WHERE `user_id = X` — returns 2 rows (meta + google)
5. Also queries `profiles` to get `client_name` and `is_onboarded`
6. Returns JSON response

**Request:** No body needed. Session cookie is read server-side automatically.

**Response:**
```json
{
  "meta": {
    "platform": "meta",
    "client_name": "ABC Dental",
    "status": "Active",
    "last_updated": "2024-01-20T10:00:00Z",
    "active_campaigns": 3,
    "ad_spend": 3500.00,
    "enquiries_generated": 87,
    "cost_per_enquiry": 40.23,
    "qualified_enquiries": 52,
    "calls_booked": 24,
    "cost_per_call": 145.83,
    "contact_rate": 82.5,
    "qualification_rate": 59.8,
    "follow_up_coverage": 91.2,
    "pipeline_new_enquiries": 87,
    "pipeline_contacted": 72,
    "pipeline_qualified": 52,
    "pipeline_booked_calls": 24,
    "campaigns": [...],
    "top_ad_name": "Free Consultation Hook",
    "top_ad_hook": "Are You Embarrassed By Your Smile?",
    "top_ad_leads": 34,
    "top_ad_cpl": 28.50,
    "optimisation_log": [...],
    "status_lead_generation": "Active",
    "status_lead_handling": "Active",
    "status_optimisation": "Active",
    "current_actions": [...],
    "weekly_summary": "This week we saw a 12% improvement in...",
    "top_message": null,
    "top_message_visible": true
  },
  "google": {
    "platform": "google",
    ...same structure...
  },
  "profile": {
    "is_onboarded": true,
    "business_name": "ABC Dental"
  }
}
```

**Error cases:**
- No session → return 401 (frontend should not call this without a session)
- User not found → return 404
- Database error → return 500

---

## Component Architecture

```
DashboardShell (server component)
    │ Decides state, fetches data
    │ Passes data as props
    ▼
DashboardPage (client component — handles layout)
    │
    ├── TopMessageBanner (props: message, visible, isOnboarded)
    │
    ├── PreviewModeBadge (props: show — only if is_onboarded = false)
    │
    ├── PlatformSection (props: title="Meta Ads", data=metaData)
    │   ├── TopStrip
    │   ├── CoreMetrics
    │   ├── LeadQuality
    │   ├── Pipeline
    │   ├── CampaignTable
    │   ├── TopPerformingAd
    │   ├── PerformanceTrends
    │   ├── AIOptimisationLog
    │   ├── SystemStatus
    │   ├── CurrentActions
    │   └── WeeklySummary
    │
    ├── PlatformSection (props: title="Google Ads", data=googleData)
    │   └── [same children as above]
    │
    └── ClientCallSection (props: visible=isOnboarded)
```

Each section component receives only the data it needs:
- `CoreMetrics` receives: `{ ad_spend, enquiries_generated, cost_per_enquiry, qualified_enquiries, calls_booked, cost_per_call }`
- `Pipeline` receives: `{ pipeline_new_enquiries, pipeline_contacted, pipeline_qualified, pipeline_booked_calls }`
- etc.

---

## Demo Data Structure

Defined in `lib/demo-data.ts`. Exported as `DEMO_META_DATA` and `DEMO_GOOGLE_DATA`. Both match the shape of a real `dashboard_data` row.

Values are realistic-looking but clearly placeholder — designed to make the dashboard look impressive for visitors.

---

## Empty/Preview State Structure

Defined in `lib/empty-data.ts`. Exported as `EMPTY_META_DATA` and `EMPTY_GOOGLE_DATA`.

All numeric fields = 0. All text fields = empty string or null. All arrays = empty arrays. This is what preview mode users see.

---

## Design Notes

- **Color scheme:** Near-black background (#0a0a0a or similar), dark card surfaces (#111 / #141414), white/light gray text, accent color (bright blue or green — decide at implementation)
- **Cards:** Subtle border (1px, very dark), slight border-radius (8-12px), no heavy shadows — let contrast do the work
- **Charts (Recharts):** Dark background, colored lines, minimal gridlines, custom tooltips
- **Status badges:** Pill-shaped, color-coded
- **Typography:** Clean sans-serif. Large numbers for metrics. Small muted labels.
- **Spacing:** Generous padding inside cards. Consistent gap between sections.
- **Animations:** Subtle fade-in on page load for sections. Number counters animate up on first load (optional).
- **Mobile:** All sections stack vertically. Metric cards go from 3-col to 2-col to 1-col. Tables become scrollable horizontally.
