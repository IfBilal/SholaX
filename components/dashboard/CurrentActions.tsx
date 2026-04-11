import { DashboardData } from "@/lib/types";

interface CurrentActionsProps {
  data: DashboardData;
}

export default function CurrentActions({ data }: CurrentActionsProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
      <h3 className="text-lg font-medium text-white">Current Actions</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
        {data.current_actions.length ? (
          data.current_actions.map((action) => <li key={action}>{action}</li>)
        ) : (
          <li className="text-zinc-500">No current actions yet.</li>
        )}
      </ul>
    </article>
  );
}
