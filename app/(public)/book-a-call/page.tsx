export default function BookACallPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <section className="rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-6 md:p-8">
        <h1 className="text-4xl font-semibold text-white">Book a Call</h1>
        <p className="mt-4 text-zinc-300">
          Let&apos;s review your growth goals and acquisition roadmap.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-white/10 bg-zinc-900/60 p-4">
        <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/20 bg-black text-zinc-400">
          Video Placeholder (16:9)
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60 p-3">
        <iframe
          title="Calendly Booking"
          src="https://calendly.com/contact-sholax/30min"
          className="h-190 w-full rounded-lg bg-white"
        />
      </section>
    </main>
  );
}
