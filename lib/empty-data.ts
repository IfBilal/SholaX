import { DashboardData, Platform } from "@/lib/types";

function createEmptyData(platform: Platform): DashboardData {
	return {
		id: `empty-${platform}`,
		user_id: "empty-user",
		platform,
		client_name: "",
		status: "Preview Mode",
		last_updated: new Date().toISOString(),
		active_campaigns: 0,
		ad_spend: 0,
		enquiries_generated: 0,
		cost_per_enquiry: 0,
		qualified_enquiries: 0,
		calls_booked: 0,
		cost_per_call: 0,
		contact_rate: 0,
		qualification_rate: 0,
		follow_up_coverage: 0,
		pipeline_new_enquiries: 0,
		pipeline_contacted: 0,
		pipeline_qualified: 0,
		pipeline_booked_calls: 0,
		campaigns: [],
		top_ad_name: "",
		top_ad_hook: "",
		top_ad_leads: 0,
		top_ad_cpl: 0,
		optimisation_log: [],
		status_lead_generation: "Paused",
		status_lead_handling: "Paused",
		status_optimisation: "Paused",
		current_actions: [],
		weekly_summary: "",
		top_message: null,
		top_message_visible: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};
}

export const EMPTY_META_DATA = createEmptyData("meta");
export const EMPTY_GOOGLE_DATA = createEmptyData("google");
