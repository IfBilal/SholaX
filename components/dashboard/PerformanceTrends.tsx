"use client";

import { DashboardData } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PerformanceTrendsProps {
  data: DashboardData;
}

export default function PerformanceTrends({ data }: PerformanceTrendsProps) {
  const trendData = [
    {
      period: "W1",
      leads: Math.max(0, Math.round(data.enquiries_generated * 0.18)),
      cost: Number((data.cost_per_enquiry * 1.1).toFixed(2)),
      spend: Math.max(0, Math.round(data.ad_spend * 0.18)),
    },
    {
      period: "W2",
      leads: Math.max(0, Math.round(data.enquiries_generated * 0.24)),
      cost: Number((data.cost_per_enquiry * 1.02).toFixed(2)),
      spend: Math.max(0, Math.round(data.ad_spend * 0.24)),
    },
    {
      period: "W3",
      leads: Math.max(0, Math.round(data.enquiries_generated * 0.28)),
      cost: Number((data.cost_per_enquiry * 0.96).toFixed(2)),
      spend: Math.max(0, Math.round(data.ad_spend * 0.28)),
    },
    {
      period: "W4",
      leads: Math.max(0, Math.round(data.enquiries_generated * 0.3)),
      cost: Number((data.cost_per_enquiry * 0.91).toFixed(2)),
      spend: Math.max(0, Math.round(data.ad_spend * 0.3)),
    },
  ];

  return (
    <article className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
      <h3 className="text-lg font-medium text-white">Performance Trends</h3>
      <p className="mt-1 text-xs text-zinc-400">UI-only trend visualisations</p>
      <div className="mt-3 grid gap-4 lg:grid-cols-3">
        <div className="h-52 rounded-lg border border-white/5 bg-black/30 p-2">
          <p className="mb-1 text-xs text-zinc-400">Leads Over Time</p>
          <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={160}>
            <LineChart data={trendData}>
              <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-52 rounded-lg border border-white/5 bg-black/30 p-2">
          <p className="mb-1 text-xs text-zinc-400">Cost Trend</p>
          <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={160}>
            <LineChart data={trendData}>
              <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-52 rounded-lg border border-white/5 bg-black/30 p-2">
          <p className="mb-1 text-xs text-zinc-400">Spend vs Results</p>
          <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={160}>
            <BarChart data={trendData}>
              <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
              <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="spend" fill="#6366f1" />
              <Bar dataKey="leads" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}
