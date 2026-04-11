import { DashboardData } from "@/lib/types";

interface WeeklySummaryProps {
  data: DashboardData;
}

export default function WeeklySummary({ data }: WeeklySummaryProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
      <h3 className="text-lg font-medium text-white">Weekly Summary</h3>
      <p className="mt-2 text-sm text-zinc-300">{data.weekly_summary || "No summary yet."}</p>
    </article>
  );
}
