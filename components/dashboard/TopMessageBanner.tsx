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
    <section className="rounded-xl border border-blue-500/30 bg-linear-to-r from-blue-950/40 to-zinc-900 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-lg font-medium text-white">{message}</p>
        <Link
          href="/book-a-call"
          className="inline-flex w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Book Your Call
        </Link>
      </div>
    </section>
  );
}
