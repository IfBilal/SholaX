import Link from "next/link";

export default function ClientCallSection() {
  return (
    <section className="rounded-2xl border border-(--border-subtle) bg-surface-1 p-6">
      <h3 className="text-xl font-medium text-primary">
        Want to review performance with the SholaX team?
      </h3>
      <p className="mt-2 text-secondary">
        Book your client review call and we&apos;ll walk through spend, lead quality,
        and next-week actions.
      </p>
      <Link
        href="https://calendly.com/contact-sholax/30min"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex rounded-lg border border-(--border-accent) bg-accent px-4 py-2 font-medium text-black transition hover:bg-(--accent-hover)"
      >
        Book a Client Call
      </Link>
      <p className="mt-2 text-xs text-tertiary">For existing clients only</p>
    </section>
  );
}
