import { DashboardData } from "@/lib/types";

interface SystemStatusProps {
  data: DashboardData;
}

export default function SystemStatus({ data }: SystemStatusProps) {
  return (
    <article className="rounded-2xl border border-(--border-subtle) bg-surface-2 p-5">
      <h3 className="text-lg font-medium text-primary">System Status</h3>
      <ul className="mt-2 space-y-2 text-sm text-secondary">
        <li>Lead Generation: {data.status_lead_generation}</li>
        <li>Lead Handling: {data.status_lead_handling}</li>
        <li>Optimisation: {data.status_optimisation}</li>
      </ul>
    </article>
  );
}
