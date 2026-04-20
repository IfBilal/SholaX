"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, LineChart, Target, Workflow } from "lucide-react";
import Accordion from "@/components/ui/Accordion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Marquee from "@/components/ui/Marquee";
import Section from "@/components/ui/Section";

const proofLogos = ["Nova Health", "Apex Legal", "Orbit Labs", "Markon", "Stackline", "SalesMint"];

const pillars = [
  {
    icon: Target,
    title: "Paid Acquisition",
    body: "We run Meta, Google, and LinkedIn with creative iteration, audience modeling, and weekly optimization.",
    href: "/ad-system",
    cta: "Explore Ad System",
  },
  {
    icon: Workflow,
    title: "Automation Infrastructure",
    body: "Nine production-grade systems—from AI receptionist to pipeline tracking—wired into your CRM.",
    href: "/automations",
    cta: "Explore Automations",
  },
  {
    icon: LineChart,
    title: "Reporting & Insights",
    body: "A live dashboard with spend, CPL, lead quality, and weekly operator notes your team can act on.",
    href: "/dashboard",
    cta: "See Dashboard",
  },
];

const steps = [
  {
    number: "01",
    title: "Audit",
    body: "We review your funnel, spend profile, and CRM setup then deliver a written diagnostic.",
  },
  {
    number: "02",
    title: "Install",
    body: "Ad account structure, tracking integrity, and automations are implemented into your stack.",
  },
  {
    number: "03",
    title: "Launch",
    body: "Campaigns go live with creative testing cadence and follow-up systems fully active.",
  },
  {
    number: "04",
    title: "Compound",
    body: "Weekly iteration plus monthly strategy reviews focused on CAC, conversion, and pipeline quality.",
  },
];

const automationPreview = [
  {
    id: "ai-receptionist",
    title: "AI Receptionist",
    description: "Instant voice response for inbound enquiries.",
    preview: "Voice greeting preview with transcript and qualification prompts.",
  },
  {
    id: "follow-up",
    title: "Lead Follow-Up",
    description: "SMS and WhatsApp follow-ups in sequence.",
    preview: "Message thread showing auto follow-up and booking prompt.",
  },
  {
    id: "email-nurture",
    title: "Email Nurture",
    description: "Guided nurture emails to move leads forward.",
    preview: "Email snippet card with subject line and CTA flow.",
  },
  {
    id: "pipeline",
    title: "Pipeline Tracking",
    description: "Live lead stage visibility by source and status.",
    preview: "Stage rail: New → Contacted → Qualified → Booked.",
  },
  {
    id: "booking",
    title: "Appointment Booking",
    description: "Automatic booking prompts and confirmations.",
    preview: "Booking confirmation panel with date/time lock-in.",
  },
  {
    id: "recovery",
    title: "Missed Lead Recovery",
    description: "Recover and re-engage unresponsive leads.",
    preview: "Reactivation message flow with timed retries.",
  },
];

const testimonials = [
  {
    quote: "We stopped guessing. CAC dropped and booked calls became predictable.",
    author: "Amir K.",
    role: "Founder, Nova Health",
  },
  {
    quote: "Their automations picked up leads our team kept missing after hours.",
    author: "Selena M.",
    role: "Growth Lead, Apex Legal",
  },
  {
    quote: "Dashboard clarity changed our weekly planning completely.",
    author: "Marcus L.",
    role: "COO, Orbit Labs",
  },
];

const faqs = [
  {
    id: "launch-speed",
    title: "How quickly can we launch?",
    content: "Typical implementation window is 7–14 business days depending on account complexity.",
  },
  {
    id: "platforms",
    title: "Which ad platforms do you manage?",
    content: "Primary channels are Meta and Google, with optional LinkedIn/TikTok in selected cases.",
  },
  {
    id: "automation-ownership",
    title: "Do we own the automations?",
    content: "Yes. Your systems and integrations are deployed to your accounts and remain portable.",
  },
  {
    id: "fit",
    title: "What if we are not a fit?",
    content: "You still leave with specific tactical recommendations from the call—no pressure follow-up.",
  },
];

export default function HomePage() {
  const [activeSystemId, setActiveSystemId] = useState(automationPreview[0].id);
  const activeSystem = useMemo(
    () => automationPreview.find((item) => item.id === activeSystemId) ?? automationPreview[0],
    [activeSystemId],
  );

  return (
    <main className="flex-1">
      <Section className="relative overflow-hidden pb-24 pt-20 md:pt-24 lg:pt-32">
        <Container size="full" className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,242,78,0.14),transparent_45%)]" />
          <div className="relative rounded-[24px] border border-(--border-subtle) bg-canvas/90 p-8 md:p-12 lg:p-16">
            <Eyebrow>SHOLAX · PERFORMANCE MARKETING SYSTEMS</Eyebrow>
            <h1 className="mt-4 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.03em] text-primary md:text-7xl lg:text-[88px]">
              Ads that convert. Systems that follow up. Revenue that compounds.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-secondary">
              We run paid acquisition and install automation infrastructure that turns every enquiry into a
              tracked, nurtured, and closable opportunity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book-a-call">
                <Button size="xl">Book a Call →</Button>
              </Link>
              <Link href="/ad-system">
                <Button size="xl" variant="secondary">See how it works</Button>
              </Link>
            </div>
            <div className="mt-8 border-t border-(--border-subtle) pt-5 text-sm text-tertiary">
              Trusted by operators across SaaS, local services, and agency-led growth teams.
            </div>
          </div>
        </Container>
      </Section>

      <section className="border-y border-(--border-subtle) bg-subtle/40 py-8">
        <Container size="2xl">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-tertiary">
            Operators we ship for
          </div>
          <Marquee>
            {proofLogos.map((logo) => (
              <span key={logo} className="text-sm text-secondary">{logo}</span>
            ))}
          </Marquee>
        </Container>
      </section>

      <Section>
        <Container size="2xl">
          <div className="text-center">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
              Three systems. One outcome.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-secondary">
              Every engagement includes acquisition, automation, and reporting because performance compounds
              only when the full loop is engineered.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="rounded-[24px] p-8">
                  <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-medium text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">{item.body}</p>
                  <Link href={item.href} className="mt-6 inline-flex items-center text-sm font-medium text-primary">
                    {item.cta}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
            A 30-day path from audit to compounding returns.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.number} className="p-6">
                <p className="font-mono text-3xl text-tertiary">{step.number}</p>
                <h3 className="mt-3 text-xl font-medium text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{step.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <Eyebrow>Automations · Preview</Eyebrow>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
            Nine systems. Plug them in or we build to spec.
          </h2>
          <p className="mt-3 max-w-2xl text-secondary">Tap any system to preview behavior, then move to full implementation.</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-2 rounded-[24px] border border-(--border-subtle) bg-surface-1 p-4">
              {automationPreview.map((system) => (
                <button
                  key={system.id}
                  type="button"
                  onClick={() => setActiveSystemId(system.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    activeSystemId === system.id
                      ? "border-(--border-accent) bg-accent-muted"
                      : "border-(--border-subtle) bg-surface-1 hover:bg-(--overlay-hover)"
                  }`}
                >
                  <p className="text-sm font-medium text-primary">{system.title}</p>
                  <p className="mt-1 text-xs text-secondary">{system.description}</p>
                </button>
              ))}
            </div>

            <Card className="rounded-[24px] border-(--border-default) p-8">
              <Badge accent>Preview</Badge>
              <h3 className="mt-4 text-2xl font-medium text-primary">{activeSystem.title}</h3>
              <p className="mt-3 text-sm text-secondary">{activeSystem.preview}</p>
              <div className="mt-6 rounded-xl border border-(--border-subtle) bg-surface-2 p-4">
                <div className="flex items-center justify-between text-xs text-tertiary">
                  <span>Demo interface</span>
                  <span className="font-mono">SYS-LIVE</span>
                </div>
                <div className="mt-3 h-30 rounded-lg border border-(--border-subtle) bg-canvas/70" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/automations">
                  <Button variant="secondary">See all 9 systems</Button>
                </Link>
                <Link href="/book-a-call">
                  <Button>Implement For Your Business →</Button>
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="2xl">
          <Eyebrow>Case Studies</Eyebrow>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
            Real operating patterns.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                tag: "Dental",
                metric: "Lower acquisition-cost volatility",
                line: "after tightening audience structure and creative feedback loops",
              },
              {
                tag: "Legal",
                metric: "More consistent booked-call flow",
                line: "using automated follow-up and faster lead response pathways",
              },
              {
                tag: "SaaS",
                metric: "Higher lead-intent quality",
                line: "after qualification logic and routing rules were introduced",
              },
            ].map((caseItem) => (
              <Card key={caseItem.tag} className="p-7">
                <Badge>{caseItem.tag}</Badge>
                <p className="mt-5 text-2xl font-medium text-accent">{caseItem.metric}</p>
                <p className="mt-2 text-sm text-secondary">{caseItem.line}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <Eyebrow>Words From Operators</Eyebrow>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
            What people say after 6 months.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.author} className="p-7">
                <p className="text-base leading-relaxed text-primary">{item.quote}</p>
                <div className="mt-6 border-t border-(--border-subtle) pt-4">
                  <p className="text-sm font-medium text-primary">{item.author}</p>
                  <p className="text-xs text-tertiary">{item.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="xl">
          <Eyebrow>Frequently Asked</Eyebrow>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">Still have questions?</h2>
          <p className="mt-3 max-w-xl text-secondary">Book a quick intro and we’ll map what to fix first.</p>
          <Accordion items={faqs} className="mt-8" />
        </Container>
      </Section>

      <Section className="bg-subtle/60">
        <Container size="md" className="text-center">
          <Eyebrow>Let&apos;s Build</Eyebrow>
          <h2 className="mt-3 text-5xl font-medium tracking-[-0.03em] text-primary md:text-6xl">
            Your pipeline doesn&apos;t fix itself.
          </h2>
          <p className="mt-4 text-lg text-secondary">
            A 20-minute call. We review your current setup and show exactly what we’d change.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/book-a-call">
              <Button size="xl">Book a Call →</Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-tertiary">No pitch deck. No follow-up spam. Just answers.</p>
        </Container>
      </Section>

      <div className="sticky bottom-0 z-40 border-t border-(--border-subtle) bg-surface-2/95 p-3 md:hidden">
        <Link href="/book-a-call" className="block">
          <Button className="w-full" size="lg">Book a Call →</Button>
        </Link>
      </div>
    </main>
  );
}
