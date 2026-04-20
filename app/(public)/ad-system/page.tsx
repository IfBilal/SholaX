import Link from "next/link";
import { BarChart3, CircleGauge, Layers3, Radar, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";

const included = [
  {
    icon: Radar,
    title: "Strategy",
    desc: "Offer positioning, audience map, and funnel diagnosis before media spend is scaled.",
  },
  {
    icon: Sparkles,
    title: "Creative Iteration",
    desc: "Weekly hook testing with structured creative decision loops.",
  },
  {
    icon: CircleGauge,
    title: "Media Buying",
    desc: "Budget and bid control engineered around lead quality and cost targets.",
  },
  {
    icon: Layers3,
    title: "Attribution & Reporting",
    desc: "Clear reporting layer for spend, CPL, and conversion movement.",
  },
];

const metrics = [
  "Lead flow consistency",
  "Response speed coverage",
  "Cost efficiency direction",
  "Pipeline quality trend",
  "Creative testing momentum",
  "Weekly optimization cadence",
];

export default function AdSystemPage() {
  return (
    <main className="flex-1">
      <Section className="py-5 md:py-6">
        <Container size="2xl">
          <div className="rounded-3xl border border-(--border-subtle) bg-surface-1 p-8 md:p-12">
            <Eyebrow>AD SYSTEM</Eyebrow>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.03em] text-primary md:text-7xl">Ads, engineered.</h1>
            <p className="mt-4 max-w-3xl text-lg text-secondary">
              A closed-loop system from click to cash: enquiry generation, performance clarity, and
              optimization cycles that compound outcomes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/book-a-call">
                <Button size="lg">Book a Strategy Call →</Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary">See sample reports</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">What&apos;s Included</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6">
                  <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-medium text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-secondary">{item.desc}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="2xl">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">Optimization Ops View</h2>
          <Card className="mt-6 overflow-hidden p-0">
            <div className="border-b border-(--border-subtle) px-6 py-4 text-sm text-tertiary">
              Example monitoring board · structure shown for clarity
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-(--border-subtle) text-tertiary">
                  <tr>
                    {["Campaign Lane", "Primary Objective", "Optimisation Focus", "Direction"].map((head) => (
                      <th key={head} className="px-6 py-3 font-medium">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Meta Prospecting", "Generate qualified enquiries", "Hooks + audience matching", "Improving"],
                    ["Google Search", "Capture high-intent demand", "Query quality + landing fit", "Stable"],
                    ["Retargeting", "Recover warm prospects", "Frequency + offer sequencing", "Optimizing"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-(--border-subtle) last:border-b-0">
                      <td className="px-6 py-4 text-primary">{row[0]}</td>
                      <td className="px-6 py-4">
                        <p className="text-secondary">{row[1]}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-secondary">{row[2]}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge accent={row[3] === "Improving"}>{row[3]}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">Process Pipeline</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {["Audit", "Structure", "Launch", "Iterate", "Scale"].map((step, idx) => (
              <Card key={step} className="p-5">
                <p className="font-mono text-sm text-tertiary">0{idx + 1}</p>
                <h3 className="mt-2 text-lg font-medium text-primary">{step}</h3>
                <p className="mt-2 text-xs text-secondary">Weekly execution with measurable checkpoints and accountability.</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="2xl">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">Core Outcome Signals</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric} className="p-6">
                <BarChart3 className="h-5 w-5 text-accent" aria-hidden="true" />
                <p className="mt-3 text-xl font-medium text-primary">{metric}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="lg" className="text-center">
          <Eyebrow>Ready to scale properly?</Eyebrow>
          <h2 className="mt-3 text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
            Ready to have ads that pay you back?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            We&apos;ll review your current setup and show where immediate efficiency and lead quality gains are possible.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/book-a-call">
              <Button size="xl">Book a Strategy Call →</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
