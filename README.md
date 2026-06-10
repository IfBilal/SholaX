# 🚀 SholaX

> **A Next.js Marketing Site and Mock Client Dashboard**

SholaX is a Next.js application MVP that provides a marketing site, client dashboard, and admin portal with UI mockups and basic user management.

The platform is split into three core zones:
1. **Public Marketing Site:** Landing pages showcasing services and systems. Note: The "9 production systems" and "AI Receptionist" features advertised on the site are UI mockups using hardcoded data and do not contain actual automated API calls.
2. **Client Dashboard:** A dashboard portal visualizing ad metrics (Meta and Google Ads) using Recharts. If a user is not fully onboarded, it displays demo data.
3. **Admin Panel:** An internal operations center for admins to manage users, onboard clients, and update their dashboard data via Supabase.

---

## ✨ Implemented Features

### 🏢 Agency & Client Operations
- **Mock Automation Previews:** UI demonstrations of various systems (audio receptionists, email nurture flows, pipelines) built for marketing purposes.
- **Client Dashboard MVP:** Displays tracking metrics (like Cost Per Lead and ad spend) using Recharts, powered by Supabase.
- **Admin Management:** Role-based access control (RBAC). Admins can view client lists, manually update dashboard stats, and manage admin roles.

### 🛠 Technical Highlights
- **Modern React Framework:** Built with Next.js 15 (App Router) and React 19 for fast performance and server-side rendering.
- **Authentication & Database:** Powered by Supabase, offering secure JWT-based auth, Row Level Security (RLS), and a PostgreSQL database.
- **Styling & UI:** Tailwind CSS v4 for utility-first styling, completely custom UI components (`/components/ui`), and dark mode support.
- **Data Visualization:** Integrated with Recharts for responsive data dashboards.

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
│   ├── (public)/        # Marketing Pages (Home, Ad System, Automations, Dashboard mockups)
│   ├── admin/           # Admin Operations Dashboard
│   └── api/             # Next.js API Routes (Supabase endpoints, client data management)
├── components/
│   ├── admin/           # Admin-specific UI (Client lists, data editor)
│   ├── dashboard/       # Client Dashboard widgets (Charts, metrics)
│   ├── layout/          # Global layout elements (Navbar, Footer)
│   └── ui/              # Reusable design system components
├── lib/                 # Demo data, Supabase clients, and shared types
└── public/              # Static assets, fonts, and hardcoded media
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

*Note: You will need a Supabase project set up with the appropriate tables (`profiles`, `dashboard_data`).*

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Authentication & Roles

SholaX relies on Supabase Auth. The system utilizes a `profiles` table to distinguish between standard users (clients) and admins.
- **`role: 'user'`**: Has access to their specific dashboard data once onboarded.
- **`role: 'admin'`**: Can access the `/admin` portal to manage clients and platform settings.

---

## 💻 Available Scripts

- `npm run dev`: Starts the development server.
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
