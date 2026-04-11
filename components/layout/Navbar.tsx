"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/", label: "Home" },
  { href: "/ad-system", label: "Ad System" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/insights", label: "Insights" },
  { href: "/library", label: "Library" },
  { href: "/book-a-call", label: "Book a Call" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function syncSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserEmail(session?.user?.email ?? null);
    }

    void syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAuthPage = useMemo(() => {
    return (
      pathname?.startsWith("/login") ||
      pathname?.startsWith("/onboarding") ||
      pathname?.startsWith("/admin")
    );
  }, [pathname]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-white">
          SholaX
        </Link>

        <ul className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition ${
                  pathname === link.href ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {userEmail ? (
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-zinc-200 hover:border-white/30"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
