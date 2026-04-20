import { DashboardData } from "@/lib/types";

interface PipelineProps {
  data: DashboardData;
}

const cardClass = "rounded-2xl border border-(--border-subtle) bg-surface-2 p-5";

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
          <p className="text-xs text-tertiary">{label}</p>
          <p className="mt-1 text-xl font-semibold text-primary">{value}</p>
        </article>
      ))}
    </div>
  );
}
