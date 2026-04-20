export type AutomationPreviewType =
  | "audio"
  | "message"
  | "email"
  | "pipeline"
  | "booking"
  | "none";

export interface AutomationItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | "bot"
    | "messages"
    | "mail"
    | "filter"
    | "calendar"
    | "refresh"
    | "workflow"
    | "zap"
    | "shield";
  previewType: AutomationPreviewType;
  previewContent?: string;
  previewMeta?: {
    heading?: string;
    lines?: string[];
  };
  ctaLabel: string;
  ctaHref: string;
}

export const AUTOMATIONS_HERO = {
  title: "Automations That Turn Enquiries Into Paying Clients",
  description:
    "We implement backend systems that handle, follow up, and convert your leads — so nothing gets missed and every opportunity is maximised.",
};

export const AUTOMATIONS_INTRO = [
  "Generating enquiries is only half the process.",
  "Without the right systems in place, leads go cold, follow-ups get missed, and potential clients are lost.",
  "These automations are designed to handle your lead flow properly and move every enquiry toward a decision.",
];

export const AUTOMATIONS_ITEMS: AutomationItem[] = [
  {
    id: "ai-receptionist",
    title: "AI Receptionist System",
    description:
      "Handles incoming enquiries instantly and responds in real time.",
    iconName: "bot",
    previewType: "audio",
    previewContent: "Small voice/audio preview element",
    previewMeta: {
      heading: "Sample Call Greeting",
      lines: ["Hi, thanks for contacting us — we’ll help you in under 60 seconds."],
    },
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "lead-follow-up",
    title: "Lead Follow-Up System",
    description:
      "Automatically follows up with leads to keep them engaged and moving forward.",
    iconName: "messages",
    previewType: "message",
    previewContent: "Short message preview — SMS/WhatsApp style",
    previewMeta: {
      heading: "Follow-Up Message",
      lines: [
        "Hey Sarah — quick follow-up on your enquiry.",
        "Would 3:30 PM or 4:00 PM work for a quick call?",
      ],
    },
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "email-nurture",
    title: "Email Nurture System",
    description:
      "Sends structured emails to build trust and guide leads toward a decision.",
    iconName: "mail",
    previewType: "email",
    previewContent: "Example email snippet preview",
    previewMeta: {
      heading: "Subject: Your next step",
      lines: [
        "Thanks for your enquiry — here’s the quickest way to get started.",
        "Reply with your preferred time and we’ll confirm immediately.",
      ],
    },
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "lead-qualification",
    title: "Lead Qualification System",
    description:
      "Filters and identifies high-quality enquiries so you focus on the right prospects.",
    iconName: "filter",
    previewType: "none",
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "appointment-booking",
    title: "Appointment Booking System",
    description:
      "Moves leads directly into booked calls with a clear and efficient process.",
    iconName: "calendar",
    previewType: "booking",
    previewContent: "Simple booking confirmation-style preview",
    previewMeta: {
      heading: "Booking Confirmed",
      lines: ["Consultation Call", "Tue, 11:30 AM", "Status: Confirmed"],
    },
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "re-engagement",
    title: "Re-Engagement System",
    description:
      "Reconnects with cold leads and brings them back into the pipeline.",
    iconName: "refresh",
    previewType: "none",
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "pipeline-tracking",
    title: "Pipeline Tracking System",
    description:
      "Keeps visibility on where every lead is in the process.",
    iconName: "workflow",
    previewType: "pipeline",
    previewContent: "New → Contacted → Qualified → Booked",
    previewMeta: {
      heading: "Pipeline Flow",
      lines: ["New", "Contacted", "Qualified", "Booked"],
    },
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "instant-response",
    title: "Instant Lead Response System",
    description:
      "Responds to new enquiries within seconds to maximise conversion chances.",
    iconName: "zap",
    previewType: "none",
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
  {
    id: "missed-lead-recovery",
    title: "Missed Lead Recovery System",
    description:
      "Captures and follows up with leads that didn’t respond the first time.",
    iconName: "shield",
    previewType: "none",
    ctaLabel: "Implement For Your Business →",
    ctaHref: "/book-a-call",
  },
];

export const AUTOMATIONS_CTA = {
  title: "Implement These Systems In Your Business",
  description:
    "We don’t just show you these — we set them up and manage them as part of your acquisition system.",
  buttonLabel: "Implement For Your Business →",
  buttonHref: "/book-a-call",
};

export const AUTOMATIONS_CLOSING_LINE =
  "When your ads generate enquiries, these systems ensure they don’t get wasted — turning more leads into paying clients consistently.";
