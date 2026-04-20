"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ClientEditor from "@/components/admin/ClientEditor";
import ClientList from "@/components/admin/ClientList";
import { createClient } from "@/lib/supabase/client";
import { ClientListItem } from "@/lib/types";

export default function AdminDashboard() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientListItem | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadClients() {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/admin/clients");
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error || "Failed to load clients");
      setLoading(false);
      return;
    }

    const nextClients = payload.clients || [];
    setClients(nextClients);

    if (selectedClient) {
      const stillExists = nextClients.find((c: ClientListItem) => c.id === selectedClient.id);
      setSelectedClient(stillExists || null);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredClients = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return clients;
    }

    return clients.filter((client) => {
      return (
        client.email.toLowerCase().includes(q) ||
        (client.business_name || "").toLowerCase().includes(q)
      );
    });
  }, [clients, query]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">SholaX Admin</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-zinc-100 hover:border-white/40"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by email or business"
            className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200"
          />
          {loading ? (
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 text-zinc-300">
              Loading clients...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          ) : (
            <ClientList
              clients={filteredClients}
              selectedClientId={selectedClient?.id ?? null}
              onSelectClient={setSelectedClient}
            />
          )}
        </aside>

        <section>
          {selectedClient ? (
            <ClientEditor userId={selectedClient.id} onRefreshClients={loadClients} />
          ) : (
            <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 text-zinc-300">
              Select a client from the left panel to begin editing.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
