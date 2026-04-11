import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const businessName = String(body.business_name || "").trim();
  const industry = String(body.industry || "").trim();
  const goals = typeof body.goals === "string" ? body.goals.trim() : "";

  if (!businessName) {
    return NextResponse.json(
      { error: "Business name is required" },
      { status: 400 },
    );
  }

  if (!industry) {
    return NextResponse.json({ error: "Industry is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      business_name: businessName,
      industry,
      goals: goals || null,
    })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
