"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/onboarding")
  ) {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-white/10 bg-black/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} SholaX. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/ad-system" className="hover:text-zinc-200">
            Ad System
          </Link>
          <Link href="/automations" className="hover:text-zinc-200">
            Automations
          </Link>
          <Link href="/dashboard" className="hover:text-zinc-200">
            Dashboard
          </Link>
          <Link href="/book-a-call" className="hover:text-zinc-200">
            Book a Call
          </Link>
        </div>
      </div>
    </footer>
  );
}
