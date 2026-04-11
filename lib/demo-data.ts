import { DashboardData, Platform } from "@/lib/types";

function createDemoData(platform: Platform): DashboardData {
	return {
		id: `demo-${platform}`,
		user_id: "demo-user",
		platform,
		client_name: "Demo Growth Co.",
		status: "Active",
		last_updated: new Date().toISOString(),
		active_campaigns: platform === "meta" ? 4 : 3,
		ad_spend: platform === "meta" ? 5400 : 3900,
		enquiries_generated: platform === "meta" ? 126 : 72,
		cost_per_enquiry: platform === "meta" ? 42.86 : 54.17,
		qualified_enquiries: platform === "meta" ? 76 : 39,
		calls_booked: platform === "meta" ? 31 : 17,
		cost_per_call: platform === "meta" ? 174.19 : 229.41,
		contact_rate: 82,
		qualification_rate: 60,
		follow_up_coverage: 91,
		pipeline_new_enquiries: platform === "meta" ? 126 : 72,
		pipeline_contacted: platform === "meta" ? 103 : 56,
		pipeline_qualified: platform === "meta" ? 76 : 39,
		pipeline_booked_calls: platform === "meta" ? 31 : 17,
		campaigns: [
			{
				id: `${platform}-c1`,
				name: `${platform.toUpperCase()} Local Leads - Core Offer`,
				spend: platform === "meta" ? 2800 : 2100,
				leads: platform === "meta" ? 71 : 34,
				cpl: platform === "meta" ? 39.44 : 61.76,
				status: "Active",
			},
			{
				id: `${platform}-c2`,
				name: `${platform.toUpperCase()} Retargeting - Offer Push`,
				spend: platform === "meta" ? 1600 : 900,
				leads: platform === "meta" ? 38 : 16,
				cpl: platform === "meta" ? 42.11 : 56.25,
				status: "Active",
			},
		],
		top_ad_name: "Free Consultation Hook",
		top_ad_hook: "Book a strategy call in 2 minutes",
		top_ad_leads: platform === "meta" ? 44 : 19,
		top_ad_cpl: platform === "meta" ? 30.12 : 47.25,
		optimisation_log: [
			{
				id: `${platform}-o1`,
				entry: "Expanded high-performing audience segment and reduced overlap.",
				created_at: new Date().toISOString(),
			},
			{
				id: `${platform}-o2`,
				entry: "Refined headline hooks to improve qualified lead intent.",
				created_at: new Date().toISOString(),
			},
		],
		status_lead_generation: "Active",
		status_lead_handling: "Active",
		status_optimisation: "Active",
		current_actions: [
			"Launching two new creatives this week",
			"Cleaning stale lead follow-up list",
			"Testing call-booking landing copy v2",
		],
		weekly_summary:
			"Strong week overall. Lead quality improved with tighter audience targeting. Next week we are focused on call booking conversion uplift.",
		top_message: null,
		top_message_visible: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export const DEMO_META_DATA = createDemoData("meta");
export const DEMO_GOOGLE_DATA = createDemoData("google");
