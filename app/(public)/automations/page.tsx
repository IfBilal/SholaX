"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bot,
  CalendarCheck,
  Filter,
  Mail,
  MessagesSquare,
  Play,
  RefreshCw,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import {
  AUTOMATIONS_CLOSING_LINE,
  AUTOMATIONS_CTA,
  AUTOMATIONS_HERO,
  AUTOMATIONS_ITEMS,
  type AutomationPreviewType,
} from "@/lib/automations-data";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";

const ICONS = {
  bot: Bot,
  messages: MessagesSquare,
  mail: Mail,
  filter: Filter,
  calendar: CalendarCheck,
  refresh: RefreshCw,
  workflow: Workflow,
  zap: Zap,
  shield: ShieldCheck,
} as const;

const cardClass =
  "group rounded-2xl border border-(--border-subtle) bg-surface-1 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-(--border-default) hover:bg-surface-2";

const DEFAULT_VOICE_SAMPLE =
  "Hi, thanks for contacting us. We will help you in under sixty seconds.";

function PreviewBlock({
  previewType,
  previewContent,
  previewMeta,
}: {
  previewType: AutomationPreviewType;
  previewContent?: string;
  previewMeta?: { heading?: string; lines?: string[] };
}) {
  const heading = previewMeta?.heading ?? "Preview";
  const lines = previewMeta?.lines ?? [];
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function handleVoiceSampleToggle() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(lines[0] ?? DEFAULT_VOICE_SAMPLE);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  if (previewType === "audio") {
    const supportsSpeechSynthesis =
      typeof window !== "undefined" && "speechSynthesis" in window;

    return (
      <div className="rounded-lg border border-(--border-subtle) bg-surface-2 p-3 text-xs text-secondary">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-tertiary">{heading}</p>
        <div className="flex items-center gap-3 rounded-lg border border-(--border-subtle) bg-canvas/70 px-3 py-2">
          <button
            type="button"
            onClick={handleVoiceSampleToggle}
            disabled={!supportsSpeechSynthesis}
            className="inline-flex h-7 items-center gap-1 rounded-full border border-(--border-accent) bg-accent-muted px-2 text-[10px] font-medium text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Play className="h-3 w-3" aria-hidden="true" />
            {isSpeaking ? "Stop" : "Play"}
          </button>
          <div className="h-1 flex-1 rounded-full bg-surface-3">
            <div className={`h-1 rounded-full bg-accent ${isSpeaking ? "w-full" : "w-1/3"}`} />
          </div>
          <span className="text-[10px] text-tertiary">Voice</span>
        </div>
        {lines[0] ? <p className="mt-2 text-secondary">{lines[0]}</p> : null}
      </div>
    );
  }

  if (previewType === "email") {
    return (
      <div className="rounded-lg border border-(--border-subtle) bg-surface-2 p-3 text-xs text-secondary">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-tertiary">{heading}</p>
        <div className="rounded-md border border-(--border-subtle) bg-canvas/70 p-3 space-y-2">
          {lines.slice(0, 2).map((line) => (
            <p key={line} className="leading-relaxed text-secondary">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (previewType === "message") {
    return (
      <div className="rounded-lg border border-(--border-subtle) bg-surface-2 p-3 text-xs text-secondary">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-tertiary">{heading}</p>
        <div className="space-y-2 rounded-md border border-(--border-subtle) bg-canvas/70 p-2">
          {lines.slice(0, 2).map((line, index) => (
            <div
              key={`${line}-${index}`}
              className={`max-w-[85%] rounded-md px-2 py-1 text-xs ${
                index % 2 === 0
                  ? "bg-surface-3 text-secondary"
                  : "ml-auto bg-accent-muted text-primary"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (previewType === "pipeline") {
    const stages = lines.length ? lines : ["New", "Contacted", "Qualified", "Booked"];
    return (
      <div className="rounded-lg border border-(--border-subtle) bg-surface-2 p-3 text-xs text-secondary">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-tertiary">{heading}</p>
        <div className="grid grid-cols-2 gap-2">
          {stages.slice(0, 4).map((stage, index) => (
            <span
              key={stage}
              className={`rounded-md border px-2 py-1 text-center ${
                index === stages.length - 1
                  ? "border-(--border-accent) bg-accent-muted text-primary"
                  : "border-(--border-subtle) bg-canvas/70 text-secondary"
              }`}
            >
              {stage}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (previewType === "booking") {
    return (
      <div className="rounded-lg border border-(--border-subtle) bg-surface-2 p-3 text-xs text-secondary">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-tertiary">{heading}</p>
        <div className="rounded-md border border-(--border-subtle) bg-canvas/70 p-3">
          {lines.slice(0, 3).map((line) => (
            <p key={line} className="leading-relaxed text-secondary">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return previewContent ? (
    <div className="rounded-lg border border-(--border-subtle) bg-surface-2 p-3 text-xs text-secondary">
      <p className="mb-1 text-[10px] uppercase tracking-wide text-tertiary">Preview</p>
      <p>{previewContent}</p>
    </div>
  ) : null;
}

export default function AutomationsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(AUTOMATIONS_ITEMS[0]?.id ?? null);

  return (
    <main className="flex-1">
      <Section className="pt-18 md:pt-24">
        <Container size="2xl">
          <div className="rounded-3xl border border-(--border-subtle) bg-surface-1 p-8 md:p-12">
            <Eyebrow>AUTOMATIONS</Eyebrow>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.03em] text-primary md:text-7xl">
              Nine systems. One unfair advantage.
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-secondary">{AUTOMATIONS_HERO.description}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">Automation Systems</h2>
          <p className="mt-3 max-w-3xl text-secondary">
            Every module includes conversion logic, state visibility, and implementation-ready pathways.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {AUTOMATIONS_ITEMS.map((item, index) => {
              const Icon = ICONS[item.iconName];
              const sectionId = `automation-${item.id}`;
              const expanded = expandedId === item.id;

              return (
                <section key={item.id} aria-labelledby={sectionId} className={cardClass}>
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span className="font-mono text-xs text-tertiary">
                      SYS-{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 id={sectionId} className="mt-4 text-xl font-medium text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["HubSpot", "Zapier", "Twilio"].map((tool) => (
                      <Badge key={`${item.id}-${tool}`}>{tool}</Badge>
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setExpandedId(expanded ? null : item.id)}
                    className="mt-5 inline-flex text-sm font-medium text-primary hover:text-accent"
                  >
                    Preview →
                  </button>

                  {expanded ? (
                    <div className="mt-4">
                      <PreviewBlock
                        previewType={item.previewType}
                        previewContent={item.previewContent}
                        previewMeta={item.previewMeta}
                      />
                    </div>
                  ) : null}

                  <Link
                    href={item.ctaHref}
                    className="mt-4 inline-flex text-sm font-medium text-accent hover:text-accent"
                  >
                    {item.ctaLabel}
                  </Link>
                </section>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/35">
        <Container size="2xl">
          <h2 className="text-3xl font-medium text-primary md:text-4xl">Integration Coverage</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {[
              "HubSpot",
              "Salesforce",
              "Pipedrive",
              "Zapier",
              "Make",
              "Twilio",
              "SendGrid",
              "Calendly",
            ].map((tool) => (
              <Card key={tool} className="p-4 text-center">
                <p className="text-sm text-secondary">{tool}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="2xl">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-7">
              <h3 className="text-2xl font-medium text-primary">Need custom logic?</h3>
              <p className="mt-3 text-sm text-secondary">
                We map your trigger-action flows and deploy custom paths around your existing CRM operations.
              </p>
            </Card>
            <Card className="p-7">
              <h3 className="text-2xl font-medium text-primary">Implementation Timeline</h3>
              <p className="mt-3 text-sm text-secondary">Kickoff → Scope → Build → Test → Ship</p>
              <p className="mt-2 font-mono text-xs text-tertiary">Typical cycle: 7–14 business days</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-subtle/60">
        <Container size="lg" className="text-center">
          <h2 className="text-4xl font-medium tracking-[-0.02em] text-primary md:text-5xl">
            {AUTOMATIONS_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-secondary">{AUTOMATIONS_CTA.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={AUTOMATIONS_CTA.buttonHref}>
              <Button size="xl">{AUTOMATIONS_CTA.buttonLabel}</Button>
            </Link>
            <Button size="xl" variant="secondary">
              Download automation catalog
            </Button>
          </div>
          <p className="mt-5 text-sm text-tertiary">{AUTOMATIONS_CLOSING_LINE}</p>
        </Container>
      </Section>
    </main>
  );
}
