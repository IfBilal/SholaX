import { DashboardData } from "@/lib/types";

interface AIOptimisationLogProps {
  data: DashboardData;
}

export default function AIOptimisationLog({ data }: AIOptimisationLogProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
      <h3 className="text-lg font-medium text-white">AI Optimisation Log</h3>
      <ul className="mt-2 space-y-2 text-sm text-zinc-300">
        {data.optimisation_log.length ? (
          data.optimisation_log.map((entry) => (
            <li key={entry.id} className="rounded-lg border border-white/5 bg-black/30 p-3">
              {entry.entry}
            </li>
          ))
        ) : (
          <li className="text-zinc-500">No optimisation entries yet.</li>
        )}
      </ul>
    </article>
  );
}
