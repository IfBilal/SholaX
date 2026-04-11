import { DashboardData } from "@/lib/types";

interface CoreMetricsProps {
  data: DashboardData;
}

const cardClass = "rounded-xl border border-white/10 bg-zinc-900/60 p-5";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export default function CoreMetrics({ data }: CoreMetricsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[
        ["Ad Spend", currency(data.ad_spend)],
        ["Enquiries Generated", data.enquiries_generated],
        ["Cost Per Enquiry", currency(data.cost_per_enquiry)],
        ["Qualified Enquiries", data.qualified_enquiries],
        ["Calls Booked", data.calls_booked],
        ["Cost Per Call", currency(data.cost_per_call)],
      ].map(([label, value]) => (
        <article key={String(label)} className={cardClass}>
          <p className="text-xs text-zinc-400">{label}</p>
          <p className="mt-1 text-xl font-semibold text-white">{value}</p>
        </article>
      ))}
    </div>
  );
}
