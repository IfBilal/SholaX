import { DashboardData } from "@/lib/types";

interface LeadQualityProps {
  data: DashboardData;
}

const cardClass = "rounded-xl border border-white/10 bg-zinc-900/60 p-5";

function percent(value: number) {
  return `${Number(value || 0).toFixed(0)}%`;
}

export default function LeadQuality({ data }: LeadQualityProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[
        ["Contact Rate", percent(data.contact_rate)],
        ["Qualification Rate", percent(data.qualification_rate)],
        ["Follow-Up Coverage", percent(data.follow_up_coverage)],
      ].map(([label, value]) => (
        <article key={String(label)} className={cardClass}>
          <p className="text-xs text-zinc-400">{label}</p>
          <p className="mt-1 text-xl font-semibold text-white">{value}</p>
        </article>
      ))}
    </div>
  );
}
