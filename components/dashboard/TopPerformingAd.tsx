import { DashboardData } from "@/lib/types";

interface TopPerformingAdProps {
  data: DashboardData;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export default function TopPerformingAd({ data }: TopPerformingAdProps) {
  return (
    <article className="rounded-2xl border border-(--border-subtle) bg-surface-2 p-5">
      <h3 className="text-lg font-medium text-primary">Top Performing Ad</h3>
      <p className="mt-2 text-secondary">{data.top_ad_name || "—"}</p>
      <p className="mt-1 text-sm text-tertiary">{data.top_ad_hook || "—"}</p>
      <p className="mt-2 text-sm text-secondary">
        Leads: {data.top_ad_leads} · CPL: {currency(data.top_ad_cpl)}
      </p>
    </article>
  );
}
