import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email?.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase() ?? "";

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id,email,business_name,is_onboarded,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const clients = (data ?? []).filter((profile) => {
    return profile.email?.toLowerCase() !== adminEmail;
  });

  return NextResponse.json({ clients });
}
