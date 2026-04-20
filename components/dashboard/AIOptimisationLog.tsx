import { DashboardData } from "@/lib/types";

interface AIOptimisationLogProps {
  data: DashboardData;
}

export default function AIOptimisationLog({ data }: AIOptimisationLogProps) {
  return (
    <article className="rounded-2xl border border-(--border-subtle) bg-surface-2 p-5">
      <h3 className="text-lg font-medium text-primary">AI Optimisation Log</h3>
      <ul className="mt-2 space-y-2 text-sm text-secondary">
        {data.optimisation_log.length ? (
          data.optimisation_log.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-(--border-subtle) bg-canvas/70 p-3"
            >
              {entry.entry}
            </li>
          ))
        ) : (
          <li className="text-tertiary">No optimisation entries yet.</li>
        )}
      </ul>
    </article>
  );
}
