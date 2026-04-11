import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DashboardData } from "@/lib/types";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [{ data: profile, error: profileError }, { data: rows, error: rowsError }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id,email,business_name,is_onboarded")
        .eq("id", user.id)
        .single(),
      supabase.from("dashboard_data").select("*").eq("user_id", user.id),
    ]);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  if (rowsError) {
    return NextResponse.json({ error: rowsError.message }, { status: 500 });
  }

  const dashboardRows = (rows as DashboardData[] | null) ?? [];
  const meta = dashboardRows.find((row) => row.platform === "meta") ?? null;
  const google = dashboardRows.find((row) => row.platform === "google") ?? null;

  return NextResponse.json({ meta, google, profile });
}
