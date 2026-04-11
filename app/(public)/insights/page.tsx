const posts = [
  "How to reduce CPL without dropping quality",
  "Why follow-up speed is crushing your booked calls",
  "Meta + Google split budgets for local services",
  "Creative hook frameworks for lead generation ads",
  "Weekly reporting that clients actually understand",
  "From enquiry to call: fixing pipeline leakage",
];

export default function InsightsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <section className="rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-6 md:p-8">
        <h1 className="text-4xl font-semibold text-white">Insights</h1>
        <p className="mt-4 text-zinc-300">Practical growth insights for service businesses.</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((title, index) => (
          <article
            key={title}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 transition hover:border-white/20"
          >
            <p className="text-xs text-zinc-500">Article {index + 1}</p>
            <h2 className="mt-2 text-lg font-medium text-white">{title}</h2>
            <p className="mt-2 text-sm text-zinc-400">
              A concise tactical breakdown for improving campaign outcomes.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
