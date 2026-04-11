import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import { Platform } from "@/lib/types";

const ALLOWED_FIELDS = [
  "last_updated",
  "client_name",
  "status",
  "active_campaigns",
  "ad_spend",
  "enquiries_generated",
  "cost_per_enquiry",
  "qualified_enquiries",
  "calls_booked",
  "cost_per_call",
  "contact_rate",
  "qualification_rate",
  "follow_up_coverage",
  "pipeline_new_enquiries",
  "pipeline_contacted",
  "pipeline_qualified",
  "pipeline_booked_calls",
  "campaigns",
  "top_ad_name",
  "top_ad_hook",
  "top_ad_leads",
  "top_ad_cpl",
  "optimisation_log",
  "status_lead_generation",
  "status_lead_handling",
  "status_optimisation",
  "current_actions",
  "weekly_summary",
  "top_message",
  "top_message_visible",
] as const;

const NUMERIC_FIELDS = new Set<string>([
  "active_campaigns",
  "ad_spend",
  "enquiries_generated",
  "cost_per_enquiry",
  "qualified_enquiries",
  "calls_booked",
  "cost_per_call",
  "contact_rate",
  "qualification_rate",
  "follow_up_coverage",
  "pipeline_new_enquiries",
  "pipeline_contacted",
  "pipeline_qualified",
  "pipeline_booked_calls",
  "top_ad_leads",
  "top_ad_cpl",
]);

const PERCENT_FIELDS = new Set<string>([
  "contact_rate",
  "qualification_rate",
  "follow_up_coverage",
]);

function normalizeNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const userId = String(body.user_id || "").trim();
  const platform = body.platform as Platform;
  const data = body.data;

  if (!userId || !platform || !["meta", "google"].includes(platform)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Missing data object" }, { status: 400 });
  }

  const updatePayload: Record<string, unknown> = {};
  for (const field of ALLOWED_FIELDS) {
    if (field in data) {
      const value = data[field];

      if (NUMERIC_FIELDS.has(field)) {
        const normalized = normalizeNumber(value);
        updatePayload[field] = PERCENT_FIELDS.has(field)
          ? Math.max(0, Math.min(100, normalized))
          : normalized;
        continue;
      }

      if (field === "campaigns") {
        updatePayload[field] = Array.isArray(value) ? value : [];
        continue;
      }

      if (field === "optimisation_log") {
        updatePayload[field] = Array.isArray(value) ? value : [];
        continue;
      }

      if (field === "current_actions") {
        updatePayload[field] = Array.isArray(value) ? value : [];
        continue;
      }

      if (field === "top_message_visible") {
        updatePayload[field] = Boolean(value);
        continue;
      }

      updatePayload[field] = value;
    }
  }
  if (!updatePayload.last_updated) {
    updatePayload.last_updated = new Date().toISOString();
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("dashboard_data")
    .update(updatePayload)
    .eq("user_id", userId)
    .eq("platform", platform);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
