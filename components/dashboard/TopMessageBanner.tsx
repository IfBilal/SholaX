import Link from "next/link";

interface TopMessageBannerProps {
  visible: boolean;
  message: string;
}

export default function TopMessageBanner({
  visible,
  message,
}: TopMessageBannerProps) {
  if (!visible) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-(--border-accent) bg-accent-muted p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-lg font-medium text-primary">{message}</p>
        <Link
          href="/book-a-call"
          className="inline-flex w-fit rounded-lg border border-(--border-default) bg-surface-1 px-4 py-2 text-sm font-medium text-primary transition hover:border-(--border-accent) hover:text-accent"
        >
          Book Your Call
        </Link>
      </div>
    </section>
  );
}
