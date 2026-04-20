import { DashboardData } from "@/lib/types";
import AIOptimisationLog from "@/components/dashboard/AIOptimisationLog";
import CampaignTable from "@/components/dashboard/CampaignTable";
import CoreMetrics from "@/components/dashboard/CoreMetrics";
import CurrentActions from "@/components/dashboard/CurrentActions";
import LeadQuality from "@/components/dashboard/LeadQuality";
import PerformanceTrends from "@/components/dashboard/PerformanceTrends";
import Pipeline from "@/components/dashboard/Pipeline";
import SystemStatus from "@/components/dashboard/SystemStatus";
import TopPerformingAd from "@/components/dashboard/TopPerformingAd";
import TopStrip from "@/components/dashboard/TopStrip";
import WeeklySummary from "@/components/dashboard/WeeklySummary";

interface PlatformSectionProps {
  title: string;
  data: DashboardData;
}

export default function PlatformSection({ title, data }: PlatformSectionProps) {
  return (
    <section className="space-y-5 rounded-3xl border border-(--border-subtle) bg-surface-1 p-4 md:p-6">
      <h2 className="text-2xl font-medium tracking-[-0.01em] text-primary">{title}</h2>

      <TopStrip data={data} />
      <CoreMetrics data={data} />
      <LeadQuality data={data} />
      <Pipeline data={data} />
      <CampaignTable data={data} />
      <PerformanceTrends data={data} />

      <div className="grid gap-3 md:grid-cols-2">
        <TopPerformingAd data={data} />
        <SystemStatus data={data} />
      </div>

      <AIOptimisationLog data={data} />
      <CurrentActions data={data} />
      <WeeklySummary data={data} />
    </section>
  );
}
