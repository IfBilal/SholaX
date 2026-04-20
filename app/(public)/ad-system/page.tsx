import Link from "next/link";

export default function AdSystemPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <section className="rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-6 md:p-8">
        <h1 className="text-4xl font-semibold text-white">Ad System</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          Our ad system is built around three outcomes: generating enquiries,
          tracking ad performance clearly, and optimising campaigns continuously
          to improve cost efficiency.
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Generating Enquiries",
            description:
              "We design and launch campaigns focused on qualified enquiry volume, not vanity metrics.",
          },
          {
            title: "Ad Performance",
            description:
              "Spend, CPL, lead flow, and conversion indicators are tracked consistently for decision clarity.",
          },
          {
            title: "Optimisation",
            description:
              "Creative, audience, and budget decisions are refined weekly based on actual performance data.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-5"
          >
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {["Meta Ads Execution", "Google Ads Execution"].map((title) => (
          <article
            key={title}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 transition hover:border-white/20"
          >
            <h2 className="text-xl font-medium text-white">{title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Structured campaign setup for predictable enquiry flow</li>
              <li>Performance monitoring across spend, leads, and CPL</li>
              <li>Weekly optimisation cycles to improve efficiency</li>
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
