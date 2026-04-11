import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const userId = new URL(request.url).searchParams.get("user_id");
  if (!userId) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  const admin = createAdminClient();

  const [{ data: rows, error: rowsError }, { data: profile, error: profileError }] =
    await Promise.all([
      admin.from("dashboard_data").select("*").eq("user_id", userId),
      admin
        .from("profiles")
        .select("id,email,business_name,is_onboarded,created_at")
        .eq("id", userId)
        .single(),
    ]);

  if (rowsError) {
    return NextResponse.json({ error: rowsError.message }, { status: 500 });
  }

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  const meta = rows?.find((row) => row.platform === "meta") ?? null;
  const google = rows?.find((row) => row.platform === "google") ?? null;

  return NextResponse.json({ meta, google, profile });
}
