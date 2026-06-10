# 🚀 SholaX

> **Ads that convert. Systems that follow up. Revenue that compounds.**

SholaX is a comprehensive performance marketing and automation platform designed to bridge the gap between paid acquisition and predictable revenue. By integrating ad campaign management with robust follow-up systems (like AI receptionists, SMS sequences, and pipeline tracking), SholaX ensures every generated lead is properly nurtured and converted.

The platform is split into three core zones:
1. **Public Marketing Site:** High-converting landing pages detailing the services, systems, and case studies.
2. **Client Dashboard:** A portal for clients to track ad spend, lead quality, pipeline metrics, and system optimizations in real-time.
3. **Admin Panel:** An internal operations center for the SholaX team to manage clients, onboard new accounts, and update campaign data.

---

## ✨ Key Features

### 🏢 Agency & Client Operations
- **Full-Funnel Tracking:** Monitor ad spend, Cost Per Lead (CPL), and lead qualification rates across platforms like Meta and Google.
- **Automation Infrastructure:** 9 production-grade systems including AI receptionists, email nurture flows, appointment booking, and missed lead recovery.
- **Reporting & Insights:** Live KPI tracking, optimization logs, and pipeline visibility broken down by stage (New → Contacted → Qualified → Booked).
- **Client Management:** Role-based access control (RBAC) allowing admins to manage client profiles, view usage, and publish campaign updates.

### 🛠 Technical Highlights
- **Modern React Framework:** Built with Next.js 15 (App Router) and React 19 for lightning-fast performance and seamless server-side rendering.
- **Authentication & Database:** Powered by Supabase, offering secure JWT-based auth, Row Level Security (RLS), and a highly scalable PostgreSQL database.
- **Styling & UI:** Tailwind CSS v4 for utility-first styling, completely custom UI components (`/components/ui`), and dark mode optimizations.
- **Data Visualization:** Integrated with Recharts for clean, responsive, and insightful data dashboards.

---

## 🧱 Tech Stack

| Technology | Description |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Backend & Auth** | Supabase |
| **Icons** | Lucide React |
| **Charts** | Recharts |

---

## 📂 Project Structure

```text
SholaX/
├── app/
│   ├── (auth)/          # Login, Registration, and Auth Callbacks
│   ├── (public)/        # Marketing Pages (Home, Ad System, Automations, etc.)
│   ├── admin/           # Admin Operations Dashboard
│   ├── api/             # Next.js API Routes (Supabase endpoints, webhooks)
│   └── dashboard/       # Authenticated Client Portal
├── components/
│   ├── admin/           # Admin-specific UI (Client lists, data management)
│   ├── dashboard/       # Client Dashboard widgets (Charts, metrics)
│   ├── layout/          # Global layout elements (Navbar, Footer)
│   └── ui/              # Reusable design system components (Buttons, Cards, Badges)
├── lib/
│   └── supabase/        # Supabase client instances (Server & Browser)
└── public/              # Static assets and fonts
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v20 or higher)
- npm, yarn, pnpm, or bun

### 2. Clone & Install
```bash
git clone https://github.com/IfBilal/SholaX.git
cd SholaX
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root of the project and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

*Note: You will need a Supabase project set up with the appropriate tables (`profiles`, `dashboard_data`, etc.).*

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Authentication & Roles

SholaX relies on Supabase Auth. The system utilizes a `profiles` table to distinguish between standard users (clients) and admins.
- **`role: 'user'`**: Has access to their specific dashboard data.
- **`role: 'admin'`**: Redirected to the `/admin` portal to manage all clients and platform settings.

---

## 💻 Available Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement.
- `npm run build`: Compiles the application for production deployment.
- `npm run start`: Runs the compiled production build.
- `npm run lint`: Analyzes the codebase using ESLint to ensure code quality.

---

## ☁️ Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/). 
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel Environment Variables.
4. Deploy!

---

*Engineered with precision to turn clicks into pipeline.*