"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const links = [
  { href: "/ad-system", label: "Ad System" },
  { href: "/automations", label: "Automations" },
  { href: "/insights", label: "Insights" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  }

  const navLinks = userEmail
    ? [...links, { href: "/dashboard", label: "Dashboard" }]
    : [...links, { href: "/dashboard", label: "Guest Dashboard" }, { href: "/login", label: "Login" }];

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-(--border-subtle) bg-[rgba(10,11,13,0.72)] backdrop-blur-lg">
      <nav className="mx-auto flex h-18 w-full max-w-360 items-center justify-between px-5 md:px-8 lg:px-12">
        <Link href="/" className="text-lg font-semibold text-primary">
          SholaX
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition",
                  pathname === link.href
                    ? "text-primary"
                    : "text-secondary hover:bg-(--overlay-hover) hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/book-a-call"
            className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-sm font-medium text-(--text-inverse) transition hover:bg-(--accent-hover)"
          >
            Book a Call →
          </Link>

          {userEmail ? (
            <Button variant="secondary" size="md" onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-(--border-default) text-primary lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-(--border-subtle) bg-surface-1 px-5 py-4 lg:hidden">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-3 text-base",
                    pathname === link.href
                      ? "bg-accent-muted text-primary"
                      : "text-secondary hover:bg-(--overlay-hover) hover:text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <Link
              href="/book-a-call"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-(--text-inverse)"
            >
              Book a Call →
            </Link>
            {userEmail ? (
              <Button variant="secondary" size="md" className="h-11" onClick={handleLogout}>
                Logout
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
