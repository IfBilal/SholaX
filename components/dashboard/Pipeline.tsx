import { DashboardData } from "@/lib/types";

interface PipelineProps {
  data: DashboardData;
}

const cardClass = "rounded-xl border border-white/10 bg-zinc-900/60 p-5";

export default function Pipeline({ data }: PipelineProps) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {[
        ["New Enquiries", data.pipeline_new_enquiries],
        ["Contacted", data.pipeline_contacted],
        ["Qualified", data.pipeline_qualified],
        ["Booked Calls", data.pipeline_booked_calls],
      ].map(([label, value]) => (
        <article key={String(label)} className={cardClass}>
          <p className="text-xs text-zinc-400">{label}</p>
          <p className="mt-1 text-xl font-semibold text-white">{value}</p>
        </article>
      ))}
    </div>
  );
}
