import { DashboardData } from "@/lib/types";

interface TopStripProps {
  data: DashboardData;
}

const cardClass = "rounded-2xl border border-(--border-subtle) bg-surface-2 p-5";

export default function TopStrip({ data }: TopStripProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <article className={cardClass}>
        <p className="text-xs text-tertiary">Client Name</p>
        <p className="mt-1 text-lg font-medium text-primary">{data.client_name || "—"}</p>
      </article>
      <article className={cardClass}>
        <p className="text-xs text-tertiary">Status</p>
        <p className="mt-1 text-lg font-medium text-primary">{data.status}</p>
      </article>
      <article className={cardClass}>
        <p className="text-xs text-tertiary">Last Updated</p>
        <p className="mt-1 text-lg font-medium text-primary">
          {new Date(data.last_updated).toLocaleDateString()}
        </p>
      </article>
      <article className={cardClass}>
        <p className="text-xs text-tertiary">Active Campaigns</p>
        <p className="mt-1 text-lg font-medium text-primary">{data.active_campaigns}</p>
      </article>
    </div>
  );
}
