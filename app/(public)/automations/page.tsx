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
  AUTOMATIONS_INTRO,
  AUTOMATIONS_ITEMS,
  type AutomationPreviewType,
} from "@/lib/automations-data";

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

const sectionClass =
  "rounded-2xl border border-white/10 bg-zinc-900/60 p-6 md:p-8";

const cardClass =
  "group flex h-full flex-col rounded-xl border border-white/10 bg-linear-to-b from-zinc-900/70 to-zinc-950/80 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400/40";

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
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-zinc-500">{heading}</p>
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-2">
          <button
            type="button"
            onClick={handleVoiceSampleToggle}
            disabled={!supportsSpeechSynthesis}
            className="inline-flex h-7 items-center gap-1 rounded-full border border-blue-400/40 bg-blue-500/20 px-2 text-[10px] font-medium text-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Play className="h-3 w-3" aria-hidden="true" />
            {isSpeaking ? "Stop" : "Play"}
          </button>
          <div className="h-1 flex-1 rounded-full bg-zinc-700">
            <div className={`h-1 rounded-full bg-blue-400 ${isSpeaking ? "w-full" : "w-1/3"}`} />
          </div>
          <span className="text-[10px] text-zinc-400">Voice</span>
        </div>
        {lines[0] ? <p className="mt-2 text-zinc-300">{lines[0]}</p> : null}
        {!supportsSpeechSynthesis ? (
          <p className="mt-2 text-[10px] text-zinc-500">
            Voice preview requires browser speech support.
          </p>
        ) : null}
      </div>
    );
  }

  if (previewType === "email") {
    return (
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-zinc-500">{heading}</p>
        <div className="rounded-md border border-indigo-400/30 bg-indigo-500/10 p-3">
          {lines.slice(0, 2).map((line) => (
            <p key={line} className="leading-relaxed text-zinc-200">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (previewType === "message") {
    return (
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-zinc-500">{heading}</p>
        <div className="space-y-2 rounded-md border border-emerald-400/20 bg-zinc-900/80 p-2">
          {lines.slice(0, 2).map((line, index) => (
            <div
              key={`${line}-${index}`}
              className={`max-w-[85%] rounded-md px-2 py-1 text-xs ${
                index % 2 === 0
                  ? "bg-zinc-800 text-zinc-200"
                  : "ml-auto bg-emerald-500/20 text-emerald-200"
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
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-zinc-500">{heading}</p>
        <div className="grid grid-cols-2 gap-2">
          {stages.slice(0, 4).map((stage, index) => (
            <span
              key={stage}
              className={`rounded-md border px-2 py-1 text-center ${
                index === stages.length - 1
                  ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-200"
                  : "border-white/10 bg-zinc-900/80 text-zinc-300"
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
      <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
        <p className="mb-2 text-[10px] uppercase tracking-wide text-zinc-500">{heading}</p>
        <div className="rounded-md border border-cyan-400/30 bg-cyan-500/10 p-3">
          {lines.slice(0, 3).map((line) => (
            <p key={line} className="leading-relaxed text-zinc-100">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return previewContent ? (
    <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
      <p className="mb-1 text-[10px] uppercase tracking-wide text-zinc-500">Preview</p>
      <p>{previewContent}</p>
    </div>
  ) : null;
}

export default function AutomationsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-12">
      <section className="rounded-2xl border border-white/10 bg-linear-to-b from-zinc-900 to-black p-6 md:p-8">
        <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
          Automation Suite
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold text-white md:text-5xl">
          {AUTOMATIONS_HERO.title}
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-300">{AUTOMATIONS_HERO.description}</p>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold text-white">Why this matters</h2>
        <div className="mt-4 space-y-3 text-zinc-300">
          {AUTOMATIONS_INTRO.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-white">Automation Systems</h2>
          <p className="text-xs text-zinc-400">9 Active Modules</p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AUTOMATIONS_ITEMS.map((item) => {
            const Icon = ICONS[item.iconName];
            const sectionId = `automation-${item.id}`;
            return (
              <section key={item.id} aria-labelledby={sectionId} className={cardClass}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      System Module
                    </p>
                    <h3 id={sectionId} className="mt-1 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className="rounded-lg border border-white/10 bg-black/30 p-2 text-zinc-200 transition group-hover:border-blue-400/40 group-hover:text-blue-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-300">{item.description}</p>
                {item.previewType !== "none" ? (
                  <PreviewBlock
                    previewType={item.previewType}
                    previewContent={item.previewContent}
                    previewMeta={item.previewMeta}
                  />
                ) : null}
                <Link
                  href={item.ctaHref}
                  className="mt-4 inline-flex text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  {item.ctaLabel}
                </Link>
              </section>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-blue-500/20 bg-linear-to-r from-blue-950/30 to-zinc-900/60 p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white">{AUTOMATIONS_CTA.title}</h2>
        <p className="mt-3 max-w-3xl text-zinc-300">{AUTOMATIONS_CTA.description}</p>
        <Link
          href={AUTOMATIONS_CTA.buttonHref}
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          {AUTOMATIONS_CTA.buttonLabel}
        </Link>
      </section>

      <p className="max-w-4xl text-sm text-zinc-300">{AUTOMATIONS_CLOSING_LINE}</p>
    </main>
  );
}
