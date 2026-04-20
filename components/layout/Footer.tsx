"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Mail, MessageSquare } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const productLinks = [
  { href: "/ad-system", label: "Ad System" },
  { href: "/automations", label: "Automations" },
  { href: "/insights", label: "Insights" },
  { href: "/dashboard", label: "Dashboard" },
];

const companyLinks = [
  { href: "/insights", label: "About" },
  { href: "/insights", label: "Case Studies" },
  { href: "/book-a-call", label: "Contact" },
  { href: "/book-a-call", label: "Book a Call" },
];

const resourceLinks = [
  { href: "/automations", label: "Library" },
  { href: "/insights", label: "Changelog" },
  { href: "/insights", label: "Privacy" },
  { href: "/insights", label: "Terms" },
];

const socialLinks = [
  { href: "mailto:contact@sholax.com", label: "Email", icon: Mail },
  { href: "https://x.com", label: "X", icon: MessageSquare },
];

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
    <footer className="mt-auto border-t border-(--border-subtle) bg-canvas">
      <Container size="2xl" className="py-16 md:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FooterColumn title="Product" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-(--border-subtle) pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-primary">SholaX</span>
            <span className="text-xs text-tertiary">© {new Date().getFullYear()}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-(--border-subtle) bg-surface-1 px-3 py-1.5 text-xs text-secondary">
            <span className="inline-flex h-2 w-2 rounded-full bg-(--success) animate-pulse" />
            All systems operational
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-(--border-subtle) text-tertiary transition hover:border-(--border-default) hover:bg-(--overlay-hover) hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-tertiary">{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link
              href={item.href}
              className={cn(
                "text-sm text-secondary transition",
                "hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
