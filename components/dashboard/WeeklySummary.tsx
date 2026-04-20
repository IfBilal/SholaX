import { DashboardData } from "@/lib/types";

interface WeeklySummaryProps {
  data: DashboardData;
}

export default function WeeklySummary({ data }: WeeklySummaryProps) {
  return (
    <article className="rounded-2xl border border-(--border-subtle) bg-surface-2 p-5">
      <h3 className="text-lg font-medium text-primary">Weekly Summary</h3>
      <p className="mt-2 text-sm text-secondary">{data.weekly_summary || "No summary yet."}</p>
    </article>
  );
}
