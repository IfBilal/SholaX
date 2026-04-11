import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-14">
      <section className="rounded-3xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-8 md:p-14">
        <p className="text-sm text-blue-400">Client Acquisition + Reporting</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Your ad results, crystal clear.
        </h1>
        <p className="mt-5 max-w-2xl text-zinc-300">
          SholaX runs Meta and Google ads for service businesses and gives every
          client a dark, modern dashboard to track spend, leads, pipeline, and
          weekly actions.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
          >
            See Dashboard
          </Link>
          <Link
            href="/book-a-call"
            className="rounded-lg border border-white/20 px-4 py-2 font-medium text-zinc-100 transition hover:border-white/40"
          >
            Book a Call
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          "Meta + Google campaign management",
          "Full weekly summaries and optimisation logs",
          "One dashboard, dynamic by user state",
        ].map((item) => (
          <article
            key={item}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 transition hover:border-white/20"
          >
            <h2 className="text-lg font-medium text-white">{item}</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Built for high-trust reporting without API complexity.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
