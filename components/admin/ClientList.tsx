"use client";

import { ClientListItem } from "@/lib/types";

interface ClientListProps {
  clients: ClientListItem[];
  selectedClientId: string | null;
  onSelectClient: (client: ClientListItem) => void;
}

export default function ClientList({
  clients,
  selectedClientId,
  onSelectClient,
}: ClientListProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
      <h2 className="text-lg font-semibold text-white">Clients</h2>
      <p className="mt-1 text-xs text-zinc-400">Select a client to edit dashboard data.</p>

      <div className="mt-3 space-y-2">
        {clients.length === 0 ? (
          <p className="text-sm text-zinc-500">No clients found.</p>
        ) : (
          clients.map((client) => (
            <button
              type="button"
              key={client.id}
              onClick={() => onSelectClient(client)}
              className={`w-full rounded-lg border px-3 py-3 text-left transition ${
                selectedClientId === client.id
                  ? "border-blue-500/60 bg-blue-500/10"
                  : "border-white/10 bg-black/20 hover:border-white/30"
              }`}
            >
              <p className="font-medium text-white">
                {client.business_name || client.email}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{client.email}</p>
              <span className={`mt-2 mr-2 inline-flex rounded-full px-2 py-0.5 text-xs ${client.role === 'admin' ? 'bg-blue-500/15 text-blue-300' : 'bg-zinc-700/40 text-zinc-300'}`}>
                {client.role === 'admin' ? 'Admin' : 'User'}
              </span>
              {client.role !== 'admin' && (
                <span
                  className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs ${
                    client.is_onboarded
                      ? "bg-green-500/15 text-green-300"
                      : "bg-yellow-500/15 text-yellow-300"
                  }`}
                >
                  {client.is_onboarded ? "Onboarded" : "Not Onboarded"}
                </span>
              )}
            </button>
          ))
        )}
      </div>
    </section>
  );
}
