Hey, sharing final consolidated requirements for the SholaX website build. Please read fully before starting.

---

## 🔧 OVERVIEW

We are building a **6-page marketing site + dynamic dashboard system + admin panel**.

IMPORTANT:

* This is NOT a SaaS platform (no API integrations)
* All dashboard data is **manually controlled via admin panel**
* Focus on **clean UI, dark modern design (like dark.design/osmo)**

---

## 🌐 PAGES

1. Home
2. Client Acquisition & Ad System
3. Dashboard
4. Insights
5. Library *(UI only, no backend needed now)*
6. Book a Call

---

## ⚠️ CORE CONCEPT (VERY IMPORTANT)

There is **ONLY ONE dashboard page**.

DO NOT create multiple dashboards.

Same layout → different data based on user state.

### User States:

1. Not logged in
   → Show FULL dashboard with **demo/placeholder data**

2. Logged in (not onboarded)
   → Show **empty / placeholder data**
   → Status: “Preview Mode”

3. Logged in (client / onboarded)
   → Show **real client-specific data**

---

## 📊 DASHBOARD STRUCTURE

### 🔁 DUPLICATION (CRITICAL)

Dashboard must have **2 identical sections**:

1. Meta Ads (Facebook & Instagram)
2. Google Ads

* Same layout
* Same fields
* Controlled independently from admin

---

### 🧱 SECTIONS

#### Top Strip

* Client Name
* Status (dropdown)
* Last Updated
* Active Campaigns

#### Core Metrics

* Ad Spend
* Enquiries Generated
* Cost Per Enquiry
* Qualified Enquiries
* Calls Booked
* Cost Per Call

#### Lead Quality

* Contact Rate %
* Qualification Rate %
* Follow-Up Coverage %

#### Pipeline

* New Enquiries
* Contacted
* Qualified
* Booked Calls

#### Campaign Table

(Add/Edit/Delete rows)

* Campaign Name
* Spend
* Leads
* CPL
* Status

#### Top Performing Ad

* Ad Name
* Hook/Angle
* Leads
* CPL

#### Performance Trends (UI only charts)

* Leads over time
* Cost trend
* Spend vs results

#### AI Optimisation Log

* Text entries (CRUD)

#### System Status

* Lead Generation
* Lead Handling
* Optimisation

#### Current Actions

* Editable list

#### Weekly Summary

* Large text box

---

## 📢 DASHBOARD SPECIAL SECTIONS

### 1. TOP MESSAGE (IMPORTANT)

Default:
"Want Your Own Client Acquisition Dashboard?"

* Editable per client from admin
* Can be removed after onboarding
* Button always visible: **Book Your Call**

---

### 2. CLIENT CALL SECTION

Visible ONLY if user is onboarded

Content:

* Message about reviewing performance
* Button: Book a Client Call
* Small text: "For existing clients only"

---

## ⚙️ ADMIN PANEL (CRITICAL)

### Must Have:

* Client list
* Select client
* Edit ALL dashboard fields

### Rules:

* Every field = editable
* Data saved per client
* No shared data
* Changes reflect instantly

### Actions:

* Update metrics
* Add/edit campaigns
* Write weekly summaries
* Update statuses
* Control onboarding flag (onboarded / not onboarded)

---

## 🧠 DATA LOGIC

* No API integrations
* No Meta/Google syncing
* Everything manual

---

## 🔐 ONBOARDING FLOW

Simple:

* Account creation
* Business info
* Instructions (Meta access)
* Payment (can be placeholder)

---

## 📞 BOOK A CALL PAGE

* Calendly embed:
  https://calendly.com/contact-sholax/30min
* Add video placeholder at top

---

## 🎨 DESIGN

* Dark, modern, minimal
* Smooth animations
* Clean dashboard UI (SaaS feel)
* Same layout consistency everywhere

---

## 🚫 IMPORTANT DON'TS

* Do NOT create multiple dashboards
* Do NOT overcomplicate backend
* Do NOT add APIs
* Do NOT hardcode data

---

## ✅ FINAL SUMMARY

One dashboard layout.
Dynamic data based on user state.
Everything editable from admin panel.
Duplicate sections for Meta + Google.

---