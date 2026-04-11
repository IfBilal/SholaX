import { DashboardData } from "@/lib/types";

interface TopStripProps {
  data: DashboardData;
}

const cardClass = "rounded-xl border border-white/10 bg-zinc-900/60 p-5";

export default function TopStrip({ data }: TopStripProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <article className={cardClass}>
        <p className="text-xs text-zinc-400">Client Name</p>
        <p className="mt-1 text-lg font-medium text-white">{data.client_name || "—"}</p>
      </article>
      <article className={cardClass}>
        <p className="text-xs text-zinc-400">Status</p>
        <p className="mt-1 text-lg font-medium text-white">{data.status}</p>
      </article>
      <article className={cardClass}>
        <p className="text-xs text-zinc-400">Last Updated</p>
        <p className="mt-1 text-lg font-medium text-white">
          {new Date(data.last_updated).toLocaleDateString()}
        </p>
      </article>
      <article className={cardClass}>
        <p className="text-xs text-zinc-400">Active Campaigns</p>
        <p className="mt-1 text-lg font-medium text-white">{data.active_campaigns}</p>
      </article>
    </div>
  );
}
