import { DashboardData } from "@/lib/types";

interface CampaignTableProps {
  data: DashboardData;
}

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export default function CampaignTable({ data }: CampaignTableProps) {
  return (
    <article className="rounded-2xl border border-(--border-subtle) bg-surface-2 p-5">
      <h3 className="text-lg font-medium text-primary">Campaign Table</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-140 text-left text-sm">
          <thead className="text-tertiary">
            <tr>
              <th className="pb-2">Campaign</th>
              <th className="pb-2">Spend</th>
              <th className="pb-2">Leads</th>
              <th className="pb-2">CPL</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-secondary">
            {data.campaigns.length ? (
              data.campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-t border-(--border-subtle)">
                  <td className="py-2">{campaign.name}</td>
                  <td className="py-2">{currency(campaign.spend)}</td>
                  <td className="py-2">{campaign.leads}</td>
                  <td className="py-2">{currency(campaign.cpl)}</td>
                  <td className="py-2">{campaign.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 text-tertiary" colSpan={5}>
                  No campaigns yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
