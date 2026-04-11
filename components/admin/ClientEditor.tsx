"use client";

import { useEffect, useMemo, useState } from "react";
import { Campaign, DashboardData, OptimisationEntry } from "@/lib/types";

interface ProfileData {
  id: string;
  email: string;
  business_name: string | null;
  is_onboarded: boolean;
}

interface ClientEditorProps {
  userId: string;
  onRefreshClients: () => Promise<void>;
}

type PlatformTab = "meta" | "google";

function toDateTimeLocalValue(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (num: number) => String(num).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const PERCENT_FIELDS: Array<keyof DashboardData> = [
  "contact_rate",
  "qualification_rate",
  "follow_up_coverage",
];

const NON_NEGATIVE_FIELDS: Array<keyof DashboardData> = [
  "active_campaigns",
  "ad_spend",
  "enquiries_generated",
  "cost_per_enquiry",
  "qualified_enquiries",
  "calls_booked",
  "cost_per_call",
  "pipeline_new_enquiries",
  "pipeline_contacted",
  "pipeline_qualified",
  "pipeline_booked_calls",
  "top_ad_leads",
  "top_ad_cpl",
];

export default function ClientEditor({ userId, onRefreshClients }: ClientEditorProps) {
  const [activeTab, setActiveTab] = useState<PlatformTab>("meta");
  const [metaData, setMetaData] = useState<DashboardData | null>(null);
  const [googleData, setGoogleData] = useState<DashboardData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [newAction, setNewAction] = useState("");
  const [newCampaign, setNewCampaign] = useState<Campaign>({
    id: "",
    name: "",
    spend: 0,
    leads: 0,
    cpl: 0,
    status: "Active",
  });
  const [newLogEntry, setNewLogEntry] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeData = useMemo(() => {
    return activeTab === "meta" ? metaData : googleData;
  }, [activeTab, googleData, metaData]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      setMessage(null);

      const response = await fetch(`/api/admin/client-data?user_id=${userId}`);
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Failed to load client data");
        setLoading(false);
        return;
      }

      setMetaData(payload.meta);
      setGoogleData(payload.google);
      setProfile(payload.profile);
      setLoading(false);
    }

    void loadData();
  }, [userId]);

  function setActiveData(update: (current: DashboardData) => DashboardData) {
    if (activeTab === "meta") {
      setMetaData((current) => (current ? update(current) : current));
      return;
    }

    setGoogleData((current) => (current ? update(current) : current));
  }

  function updateStringField(field: keyof DashboardData, value: string) {
    setActiveData((current) => ({ ...current, [field]: value }));
  }

  function updateNumberField(field: keyof DashboardData, value: string) {
    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue)) {
      setActiveData((current) => ({
        ...current,
        [field]: 0,
      }));
      return;
    }

    const shouldClampPercent = PERCENT_FIELDS.includes(field);
    const shouldClampNonNegative = NON_NEGATIVE_FIELDS.includes(field);

    let nextValue = parsedValue;
    if (shouldClampPercent) {
      nextValue = Math.max(0, Math.min(100, parsedValue));
    } else if (shouldClampNonNegative) {
      nextValue = Math.max(0, parsedValue);
    }

    setActiveData((current) => ({
      ...current,
      [field]: nextValue,
    }));
  }

  function updateBooleanField(field: keyof DashboardData, value: boolean) {
    setActiveData((current) => ({ ...current, [field]: value }));
  }

  function updateLastUpdatedField(value: string) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return;
    }

    updateStringField("last_updated", parsed.toISOString());
  }

  async function refreshSelectedClientData() {
    const response = await fetch(`/api/admin/client-data?user_id=${userId}`);
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error || "Failed to refresh client data");
      return;
    }

    setMetaData(payload.meta);
    setGoogleData(payload.google);
    setProfile(payload.profile);
  }

  async function saveCurrentPlatform() {
    if (!activeData) {
      return;
    }

    setSaving(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/admin/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        platform: activeTab,
        data: activeData,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Save failed");
      setSaving(false);
      return;
    }

    await refreshSelectedClientData();

    setMessage(`${activeTab.toUpperCase()} data saved successfully.`);
    setSaving(false);
  }

  async function toggleOnboarding() {
    if (!profile) {
      return;
    }

    setSaving(true);
    setError(null);
    setMessage(null);

    const nextValue = !profile.is_onboarded;
    const response = await fetch("/api/admin/toggle-onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: profile.id,
        is_onboarded: nextValue,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error || "Failed to toggle onboarding status");
      setSaving(false);
      return;
    }

    setProfile({ ...profile, is_onboarded: nextValue });
    await onRefreshClients();
    setMessage(`Client marked as ${nextValue ? "Onboarded" : "Not Onboarded"}.`);
    setSaving(false);
  }

  if (loading) {
    return (
      <section className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
        <p className="text-zinc-300">Loading client data...</p>
      </section>
    );
  }

  if (!activeData) {
    return (
      <section className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
        <p className="text-zinc-300">No data available for this client.</p>
      </section>
    );
  }

  function addCampaign() {
    if (!newCampaign.name.trim()) {
      return;
    }

    const campaignToAdd: Campaign = {
      ...newCampaign,
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
    };

    setActiveData((current) => ({
      ...current,
      campaigns: [...current.campaigns, campaignToAdd],
    }));

    setNewCampaign({
      id: "",
      name: "",
      spend: 0,
      leads: 0,
      cpl: 0,
      status: "Active",
    });
  }

  function addOptimisationEntry() {
    const entryText = newLogEntry.trim();
    if (!entryText) {
      return;
    }

    const entry: OptimisationEntry = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      entry: entryText,
      created_at: new Date().toISOString(),
    };

    setActiveData((current) => ({
      ...current,
      optimisation_log: [entry, ...current.optimisation_log],
    }));

    setNewLogEntry("");
  }

  function addAction() {
    const action = newAction.trim();
    if (!action) {
      return;
    }

    setActiveData((current) => ({
      ...current,
      current_actions: [...current.current_actions, action],
    }));

    setNewAction("");
  }

  return (
    <section className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {profile?.business_name || profile?.email || "Client"}
          </h2>
          <p className="text-xs text-zinc-400">{profile?.email}</p>
        </div>
        <button
          type="button"
          onClick={toggleOnboarding}
          disabled={saving}
          className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-zinc-100 hover:border-white/40 disabled:opacity-60"
        >
          {profile?.is_onboarded ? "Mark as Not Onboarded" : "Mark as Onboarded"}
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("meta")}
          className={`rounded-lg px-3 py-1.5 text-sm ${
            activeTab === "meta"
              ? "bg-blue-600 text-white"
              : "border border-white/15 text-zinc-300"
          }`}
        >
          Meta
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("google")}
          className={`rounded-lg px-3 py-1.5 text-sm ${
            activeTab === "google"
              ? "bg-blue-600 text-white"
              : "border border-white/15 text-zinc-300"
          }`}
        >
          Google
        </button>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Top Strip</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              value={activeData.client_name ?? ""}
              onChange={(event) => updateStringField("client_name", event.target.value)}
              placeholder="Client Name"
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <select
              value={activeData.status}
              onChange={(event) => updateStringField("status", event.target.value)}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            >
              <option>Active</option>
              <option>Paused</option>
              <option>Under Review</option>
              <option>Preview Mode</option>
            </select>
            <input
              type="number"
              value={activeData.active_campaigns}
              onChange={(event) => updateNumberField("active_campaigns", event.target.value)}
              placeholder="Active Campaigns"
              min={0}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <input
              type="datetime-local"
              value={toDateTimeLocalValue(activeData.last_updated)}
              onChange={(event) => updateLastUpdatedField(event.target.value)}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Core Metrics</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              ["ad_spend", "Ad Spend"],
              ["enquiries_generated", "Enquiries Generated"],
              ["cost_per_enquiry", "Cost Per Enquiry"],
              ["qualified_enquiries", "Qualified Enquiries"],
              ["calls_booked", "Calls Booked"],
              ["cost_per_call", "Cost Per Call"],
            ].map(([field, label]) => (
              <input
                key={field}
                type="number"
                value={String(activeData[field as keyof DashboardData] ?? 0)}
                onChange={(event) =>
                  updateNumberField(field as keyof DashboardData, event.target.value)
                }
                placeholder={label}
                min={0}
                className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Lead Quality + Pipeline</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              ["contact_rate", "Contact Rate %"],
              ["qualification_rate", "Qualification Rate %"],
              ["follow_up_coverage", "Follow-Up Coverage %"],
              ["pipeline_new_enquiries", "Pipeline New Enquiries"],
              ["pipeline_contacted", "Pipeline Contacted"],
              ["pipeline_qualified", "Pipeline Qualified"],
              ["pipeline_booked_calls", "Pipeline Booked Calls"],
            ].map(([field, label]) => (
              <input
                key={field}
                type="number"
                value={String(activeData[field as keyof DashboardData] ?? 0)}
                onChange={(event) =>
                  updateNumberField(field as keyof DashboardData, event.target.value)
                }
                placeholder={label}
                min={label.includes("%") ? 0 : undefined}
                max={label.includes("%") ? 100 : undefined}
                className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Campaign Table</h3>
          <div className="mt-3 space-y-2">
            {activeData.campaigns.map((campaign, index) => (
              <div key={campaign.id} className="grid gap-2 md:grid-cols-6">
                <input
                  value={campaign.name}
                  onChange={(event) =>
                    setActiveData((current) => {
                      const next = [...current.campaigns];
                      next[index] = { ...next[index], name: event.target.value };
                      return { ...current, campaigns: next };
                    })
                  }
                  placeholder="Campaign Name"
                  className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
                />
                <input
                  type="number"
                  value={campaign.spend}
                  onChange={(event) =>
                    setActiveData((current) => {
                      const next = [...current.campaigns];
                      next[index] = {
                        ...next[index],
                        spend: Math.max(0, Number(event.target.value) || 0),
                      };
                      return { ...current, campaigns: next };
                    })
                  }
                  placeholder="Spend"
                  min={0}
                  className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
                />
                <input
                  type="number"
                  value={campaign.leads}
                  onChange={(event) =>
                    setActiveData((current) => {
                      const next = [...current.campaigns];
                      next[index] = {
                        ...next[index],
                        leads: Math.max(0, Number(event.target.value) || 0),
                      };
                      return { ...current, campaigns: next };
                    })
                  }
                  placeholder="Leads"
                  min={0}
                  className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
                />
                <input
                  type="number"
                  value={campaign.cpl}
                  onChange={(event) =>
                    setActiveData((current) => {
                      const next = [...current.campaigns];
                      next[index] = {
                        ...next[index],
                        cpl: Math.max(0, Number(event.target.value) || 0),
                      };
                      return { ...current, campaigns: next };
                    })
                  }
                  placeholder="CPL"
                  min={0}
                  className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
                />
                <select
                  value={campaign.status}
                  onChange={(event) =>
                    setActiveData((current) => {
                      const next = [...current.campaigns];
                      next[index] = {
                        ...next[index],
                        status: event.target.value as Campaign["status"],
                      };
                      return { ...current, campaigns: next };
                    })
                  }
                  className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
                >
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Complete</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    setActiveData((current) => ({
                      ...current,
                      campaigns: current.campaigns.filter((_, i) => i !== index),
                    }))
                  }
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-2 py-2 text-xs text-red-300"
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="grid gap-2 md:grid-cols-6">
              <input
                value={newCampaign.name}
                onChange={(event) =>
                  setNewCampaign((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="New Campaign Name"
                className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
              />
              <input
                type="number"
                value={newCampaign.spend}
                onChange={(event) =>
                  setNewCampaign((current) => ({
                    ...current,
                    spend: Math.max(0, Number(event.target.value) || 0),
                  }))
                }
                placeholder="Spend"
                min={0}
                className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
              />
              <input
                type="number"
                value={newCampaign.leads}
                onChange={(event) =>
                  setNewCampaign((current) => ({
                    ...current,
                    leads: Math.max(0, Number(event.target.value) || 0),
                  }))
                }
                placeholder="Leads"
                min={0}
                className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
              />
              <input
                type="number"
                value={newCampaign.cpl}
                onChange={(event) =>
                  setNewCampaign((current) => ({
                    ...current,
                    cpl: Math.max(0, Number(event.target.value) || 0),
                  }))
                }
                placeholder="CPL"
                min={0}
                className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
              />
              <select
                value={newCampaign.status}
                onChange={(event) =>
                  setNewCampaign((current) => ({
                    ...current,
                    status: event.target.value as Campaign["status"],
                  }))
                }
                className="rounded-lg border border-white/10 bg-zinc-950 px-2 py-2 text-xs text-zinc-100"
              >
                <option>Active</option>
                <option>Paused</option>
                <option>Complete</option>
              </select>
              <button
                type="button"
                onClick={addCampaign}
                className="rounded-lg border border-blue-400/40 bg-blue-500/10 px-2 py-2 text-xs text-blue-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Top Ad + System Status</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              value={activeData.top_ad_name ?? ""}
              onChange={(event) => updateStringField("top_ad_name", event.target.value)}
              placeholder="Top Ad Name"
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <input
              value={activeData.top_ad_hook ?? ""}
              onChange={(event) => updateStringField("top_ad_hook", event.target.value)}
              placeholder="Top Ad Hook"
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <input
              type="number"
              value={activeData.top_ad_leads}
              onChange={(event) => updateNumberField("top_ad_leads", event.target.value)}
              placeholder="Top Ad Leads"
              min={0}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <input
              type="number"
              value={activeData.top_ad_cpl}
              onChange={(event) => updateNumberField("top_ad_cpl", event.target.value)}
              placeholder="Top Ad CPL"
              min={0}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <select
              value={activeData.status_lead_generation}
              onChange={(event) => updateStringField("status_lead_generation", event.target.value)}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            >
              <option>Active</option>
              <option>Issue</option>
              <option>Paused</option>
            </select>
            <select
              value={activeData.status_lead_handling}
              onChange={(event) => updateStringField("status_lead_handling", event.target.value)}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            >
              <option>Active</option>
              <option>Issue</option>
              <option>Paused</option>
            </select>
            <select
              value={activeData.status_optimisation}
              onChange={(event) => updateStringField("status_optimisation", event.target.value)}
              className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            >
              <option>Active</option>
              <option>Issue</option>
              <option>Paused</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">AI Optimisation Log</h3>
          <div className="mt-3 space-y-2">
            {activeData.optimisation_log.map((entry, index) => (
              <div key={entry.id} className="grid gap-2 md:grid-cols-[1fr_auto]">
                <input
                  value={entry.entry}
                  onChange={(event) =>
                    setActiveData((current) => {
                      const next = [...current.optimisation_log];
                      next[index] = { ...next[index], entry: event.target.value };
                      return { ...current, optimisation_log: next };
                    })
                  }
                  className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                />
                <button
                  type="button"
                  onClick={() =>
                    setActiveData((current) => ({
                      ...current,
                      optimisation_log: current.optimisation_log.filter((_, i) => i !== index),
                    }))
                  }
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="grid gap-2 md:grid-cols-[1fr_auto]">
              <input
                value={newLogEntry}
                onChange={(event) => setNewLogEntry(event.target.value)}
                placeholder="New optimisation entry"
                className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              />
              <button
                type="button"
                onClick={addOptimisationEntry}
                className="rounded-lg border border-blue-400/40 bg-blue-500/10 px-3 py-2 text-xs text-blue-300"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Current Actions</h3>
          <div className="mt-3 space-y-2">
            {activeData.current_actions.map((action, index) => (
              <div key={`${action}-${index}`} className="grid gap-2 md:grid-cols-[1fr_auto]">
                <input
                  value={action}
                  onChange={(event) =>
                    setActiveData((current) => {
                      const next = [...current.current_actions];
                      next[index] = event.target.value;
                      return { ...current, current_actions: next };
                    })
                  }
                  className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                />
                <button
                  type="button"
                  onClick={() =>
                    setActiveData((current) => ({
                      ...current,
                      current_actions: current.current_actions.filter((_, i) => i !== index),
                    }))
                  }
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="grid gap-2 md:grid-cols-[1fr_auto]">
              <input
                value={newAction}
                onChange={(event) => setNewAction(event.target.value)}
                placeholder="New action"
                className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
              />
              <button
                type="button"
                onClick={addAction}
                className="rounded-lg border border-blue-400/40 bg-blue-500/10 px-3 py-2 text-xs text-blue-300"
              >
                Add Action
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <h3 className="text-sm font-semibold text-white">Weekly Summary + Top Message</h3>
          <div className="mt-3 space-y-3">
            <textarea
              value={activeData.weekly_summary ?? ""}
              onChange={(event) => updateStringField("weekly_summary", event.target.value)}
              rows={5}
              placeholder="Weekly summary"
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <input
              value={activeData.top_message ?? ""}
              onChange={(event) => updateStringField("top_message", event.target.value)}
              placeholder="Top message text"
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
            <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={activeData.top_message_visible}
                onChange={(event) =>
                  updateBooleanField("top_message_visible", event.target.checked)
                }
              />
              Show top message banner
            </label>
          </div>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
      {message ? <p className="mt-3 text-sm text-green-400">{message}</p> : null}

      <button
        type="button"
        onClick={saveCurrentPlatform}
        disabled={saving}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
      >
        {saving ? "Saving..." : `Save ${activeTab.toUpperCase()} Changes`}
      </button>
    </section>
  );
}
