import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";

const callAgenda = [
  "Audit your current lead flow and bottlenecks",
  "Review ad performance and CPL efficiency",
  "Map a 30-day automation + follow-up plan",
];

export default function BookACallPage() {
  return (
    <main className="flex-1">
      <Section className="pt-18 md:pt-24">
        <Container size="2xl">
          <div className="rounded-3xl border border-(--border-subtle) bg-surface-1 p-8 md:p-12">
            <Eyebrow>BOOK A CALL</Eyebrow>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.03em] text-primary md:text-7xl">
              Build your next growth sprint.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-secondary">
              A focused strategy call to diagnose leaks, improve conversion rate, and define
              concrete next actions.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <div className="grid gap-4 md:grid-cols-3">
            {callAgenda.map((item, index) => (
              <Card key={item} className="p-6">
                <p className="font-mono text-xs text-tertiary">0{index + 1}</p>
                <p className="mt-3 text-sm text-secondary">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="2xl">
          <div className="overflow-hidden rounded-3xl border border-(--border-subtle) bg-surface-1 p-3">
            <iframe
              title="Calendly Booking"
              src="https://calendly.com/contact-sholax/30min"
              className="h-190 w-full rounded-2xl bg-white"
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="lg" className="text-center">
          <h2 className="text-3xl font-medium tracking-[-0.02em] text-primary md:text-4xl">
            Already a client and need a performance review?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            Use the client dashboard for weekly updates and schedule a dedicated deep-dive call.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard">
              <Button size="xl" variant="secondary">
                Open Dashboard
              </Button>
            </Link>
            <Link href="/insights">
              <Button size="xl">Read Latest Insights</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
