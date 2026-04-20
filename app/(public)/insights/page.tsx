import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";

const featured = {
  title: "How to Cut CPL by 28% Without Starving Volume",
  description:
    "A practical model for balancing bid strategy, audience narrowing, and creative refresh cadence so your lead cost drops while call bookings remain stable.",
  readTime: "8 min read",
  category: "Performance",
};

const posts = [
  {
    title: "Follow-up speed and why your CRM is leaking booked calls",
    category: "Sales Ops",
    readTime: "6 min read",
  },
  {
    title: "Meta + Google split budgets for local service offers",
    category: "Paid Media",
    readTime: "5 min read",
  },
  {
    title: "Creative hook structures that actually pull intent",
    category: "Creative",
    readTime: "7 min read",
  },
  {
    title: "Weekly reporting templates clients understand in 90 seconds",
    category: "Reporting",
    readTime: "4 min read",
  },
  {
    title: "From enquiry to call: repairing pipeline bottlenecks",
    category: "Pipeline",
    readTime: "6 min read",
  },
  {
    title: "When to automate nurture flows vs. human follow-up",
    category: "Automations",
    readTime: "5 min read",
  },
];

export default function InsightsPage() {
  return (
    <main className="flex-1">
      <Section className="py-5 md:py-6">
        <Container size="2xl">
          <div className="rounded-3xl border border-(--border-subtle) bg-surface-1 p-8 md:p-12">
            <Eyebrow>INSIGHTS</Eyebrow>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.03em] text-primary md:text-7xl">
              Learn what moves revenue.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-secondary">
              Tactical breakdowns from real campaign data, client pipelines, and weekly
              optimisation patterns.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <article className="rounded-3xl border border-(--border-subtle) bg-surface-1 p-7 md:p-9">
            <p className="font-mono text-xs text-tertiary">{featured.category}</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-primary md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-3xl text-secondary">{featured.description}</p>
            <div className="mt-6 flex items-center gap-4 text-sm text-tertiary">
              <span>{featured.readTime}</span>
              <span>•</span>
              <span>Published this week</span>
            </div>
          </article>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="2xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-2xl border border-(--border-subtle) bg-surface-1 p-5 transition hover:-translate-y-0.5 hover:border-(--border-default)"
              >
                <p className="font-mono text-xs text-tertiary">{post.category}</p>
                <h3 className="mt-3 text-xl font-medium text-primary">{post.title}</h3>
                <p className="mt-4 text-sm text-tertiary">{post.readTime}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="lg" className="text-center">
          <h2 className="text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
            Want these insights applied to your account?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-secondary">
            We can walk your current ads, lead quality, and follow-up stack in one strategy call.
          </p>
          <div className="mt-8">
            <Link href="/book-a-call">
              <Button size="xl">Book Your Growth Call</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
