import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fetch user profile to check role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const removeId = String(body.user_id || "").trim();
  if (!removeId) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  if (removeId === user.id) {
    return NextResponse.json({ error: "You cannot remove yourself as admin." }, { status: 400 });
  }

  // Fully delete the user from Supabase Auth (cascades to profile row too)
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(removeId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
