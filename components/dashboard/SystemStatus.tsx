import { DashboardData } from "@/lib/types";

interface SystemStatusProps {
  data: DashboardData;
}

export default function SystemStatus({ data }: SystemStatusProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
      <h3 className="text-lg font-medium text-white">System Status</h3>
      <ul className="mt-2 space-y-2 text-sm text-zinc-300">
        <li>Lead Generation: {data.status_lead_generation}</li>
        <li>Lead Handling: {data.status_lead_handling}</li>
        <li>Optimisation: {data.status_optimisation}</li>
      </ul>
    </article>
  );
}
