import { DashboardData } from "@/lib/types";

interface CurrentActionsProps {
  data: DashboardData;
}

export default function CurrentActions({ data }: CurrentActionsProps) {
  return (
    <article className="rounded-2xl border border-(--border-subtle) bg-surface-2 p-5">
      <h3 className="text-lg font-medium text-primary">Current Actions</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-secondary">
        {data.current_actions.length ? (
          data.current_actions.map((action) => <li key={action}>{action}</li>)
        ) : (
          <li className="text-tertiary">No current actions yet.</li>
        )}
      </ul>
    </article>
  );
}
