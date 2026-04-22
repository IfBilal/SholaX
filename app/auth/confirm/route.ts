import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type");

  const nextPath = requestUrl.searchParams.get("next") || "/login";
  const safeNextPath = nextPath.startsWith("/") ? nextPath : "/login";
  const destination = new URL(safeNextPath, requestUrl.origin);

  if (!code && !(tokenHash && type)) {
    destination.searchParams.set("confirmed", "0");
    return NextResponse.redirect(destination);
  }

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      destination.searchParams.set("confirmed", "0");
      return NextResponse.redirect(destination);
    }

    await supabase.auth.signOut();
    destination.searchParams.set("confirmed", "1");
    return NextResponse.redirect(destination);
  }

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash!,
    type: type as
      | "signup"
      | "invite"
      | "magiclink"
      | "recovery"
      | "email_change"
      | "email",
  });

  if (error) {
    destination.searchParams.set("confirmed", "0");
    return NextResponse.redirect(destination);
  }

  await supabase.auth.signOut();
  destination.searchParams.set("confirmed", "1");
  return NextResponse.redirect(destination);
}
