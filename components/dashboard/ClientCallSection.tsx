import Link from "next/link";

export default function ClientCallSection() {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-900/60 p-6">
      <h3 className="text-xl font-semibold text-white">
        Want to review performance with the SholaX team?
      </h3>
      <p className="mt-2 text-zinc-300">
        Book your client review call and we&apos;ll walk through spend, lead quality,
        and next-week actions.
      </p>
      <Link
        href="https://calendly.com/contact-sholax/30min"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
      >
        Book a Client Call
      </Link>
      <p className="mt-2 text-xs text-zinc-500">For existing clients only</p>
    </section>
  );
}
