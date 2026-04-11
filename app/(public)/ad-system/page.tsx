import Link from "next/link";

export default function AdSystemPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <section className="rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-6 md:p-8">
        <h1 className="text-4xl font-semibold text-white">Client Acquisition & Ad System</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          We manage the entire growth loop: ad strategy, campaign execution,
          lead handling optimisation, and transparent dashboard reporting.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {["Meta Ads Engine", "Google Ads Engine"].map((title) => (
          <article
            key={title}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 transition hover:border-white/20"
          >
            <h2 className="text-xl font-medium text-white">{title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Audience and creative testing framework</li>
              <li>Weekly campaign tuning and CPL tracking</li>
              <li>Pipeline-focused lead quality monitoring</li>
            </ul>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <Link
          href="/book-a-call"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
        >
          Book Your Strategy Call
        </Link>
      </div>
    </main>
  );
}
