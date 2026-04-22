export type Platform = "meta" | "google";

export interface Campaign {
	id: string;
	name: string;
	spend: number;
	leads: number;
	cpl: number;
	status: "Active" | "Paused" | "Complete";
}

export interface OptimisationEntry {
	id: string;
	entry: string;
	created_at: string;
}

export interface DashboardData {
	id: string;
	user_id: string;
	platform: Platform;
	client_name: string | null;
	status: string;
	last_updated: string;
	active_campaigns: number;
	ad_spend: number;
	enquiries_generated: number;
	cost_per_enquiry: number;
	qualified_enquiries: number;
	calls_booked: number;
	cost_per_call: number;
	contact_rate: number;
	qualification_rate: number;
	follow_up_coverage: number;
	pipeline_new_enquiries: number;
	pipeline_contacted: number;
	pipeline_qualified: number;
	pipeline_booked_calls: number;
	campaigns: Campaign[];
	top_ad_name: string | null;
	top_ad_hook: string | null;
	top_ad_leads: number;
	top_ad_cpl: number;
	optimisation_log: OptimisationEntry[];
	status_lead_generation: string;
	status_lead_handling: string;
	status_optimisation: string;
	current_actions: string[];
	weekly_summary: string | null;
	top_message: string | null;
	top_message_visible: boolean;
	created_at: string;
	updated_at: string;
}


export interface Profile {
	id: string;
	email: string;
	business_name: string | null;
	industry: string | null;
	goals: string | null;
	is_onboarded: boolean;
	created_at: string;
	updated_at: string;
	role: 'user' | 'admin';
}

export interface ClientListItem {
	id: string;
	email: string;
	business_name: string | null;
	is_onboarded: boolean;
	created_at: string;
	role: 'user' | 'admin';
}
