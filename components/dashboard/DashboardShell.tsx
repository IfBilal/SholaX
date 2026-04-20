import ClientCallSection from "@/components/dashboard/ClientCallSection";
import PlatformSection from "@/components/dashboard/PlatformSection";
import TopMessageBanner from "@/components/dashboard/TopMessageBanner";
import { DEMO_GOOGLE_DATA, DEMO_META_DATA } from "@/lib/demo-data";
import { EMPTY_GOOGLE_DATA, EMPTY_META_DATA } from "@/lib/empty-data";
import { createClient } from "@/lib/supabase/server";
import { DashboardData } from "@/lib/types";

const DEFAULT_MESSAGE = "Want Your Own Client Acquisition Dashboard?";

export default async function DashboardShell() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-375 flex-1 space-y-6 px-4 py-10 md:px-6 lg:px-8">
        <TopMessageBanner visible message={DEFAULT_MESSAGE} />
        <PlatformSection
          title="Meta Ads (Facebook & Instagram)"
          data={DEMO_META_DATA}
        />
        <PlatformSection title="Google Ads" data={DEMO_GOOGLE_DATA} />
      </main>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_onboarded")
    .eq("id", user.id)
    .single();

  if (!profile?.is_onboarded) {
    return (
      <main className="mx-auto w-full max-w-375 flex-1 space-y-6 px-4 py-10 md:px-6 lg:px-8">
        <TopMessageBanner visible message={DEFAULT_MESSAGE} />
        <div className="inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
          Preview Mode
        </div>
        <PlatformSection
          title="Meta Ads (Facebook & Instagram)"
          data={EMPTY_META_DATA}
        />
        <PlatformSection title="Google Ads" data={EMPTY_GOOGLE_DATA} />
      </main>
    );
  }

  const { data: rows } = await supabase
    .from("dashboard_data")
    .select("*")
    .eq("user_id", user.id);

  const dashboardRows = (rows as DashboardData[] | null) ?? [];
  const metaData =
    dashboardRows.find((row) => row.platform === "meta") ?? EMPTY_META_DATA;
  const googleData =
    dashboardRows.find((row) => row.platform === "google") ?? EMPTY_GOOGLE_DATA;

  const topMessageVisible = metaData.top_message_visible ?? true;
  const topMessage = metaData.top_message || DEFAULT_MESSAGE;

  return (
    <main className="mx-auto w-full max-w-375 flex-1 space-y-6 px-4 py-10 md:px-6 lg:px-8">
      <TopMessageBanner visible={topMessageVisible} message={topMessage} />
      <PlatformSection title="Meta Ads (Facebook & Instagram)" data={metaData} />
      <PlatformSection title="Google Ads" data={googleData} />
      <ClientCallSection />
    </main>
  );
}
