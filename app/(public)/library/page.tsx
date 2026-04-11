const resources = [
  "Ad Creative Brief Template",
  "Weekly Performance Review Sheet",
  "Lead Follow-Up SOP",
  "Offer Positioning Worksheet",
  "Campaign QA Checklist",
  "Qualification Script Template",
];

export default function LibraryPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <section className="rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-6 md:p-8">
        <h1 className="text-4xl font-semibold text-white">Library</h1>
        <p className="mt-4 text-zinc-300">Resource hub (UI only for now).</p>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          disabled
          placeholder="Search resources (coming soon)"
          className="w-full max-w-sm rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-zinc-300"
        />
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-400">
          Templates
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-400">
          SOPs
        </span>
        <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-400">
          Scripts
        </span>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((title) => (
          <article
            key={title}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 transition hover:border-white/20"
          >
            <p className="text-xs text-blue-400">Coming soon</p>
            <h2 className="mt-2 text-lg font-medium text-white">{title}</h2>
            <p className="mt-2 text-sm text-zinc-400">Placeholder resource card for phase rollout.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
