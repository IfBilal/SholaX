"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login?redirect=/onboarding");
        return;
      }

      setEmail(user.email ?? "your email");
    }

    void loadUser();
  }, [router]);

  const progressPercent = useMemo(() => {
    return Math.round((step / TOTAL_STEPS) * 100);
  }, [step]);

  async function handleBusinessInfoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_name: businessName,
        industry,
        goals,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error || "Failed to save business info");
      setLoading(false);
      return;
    }

    setStep(3);
    setLoading(false);
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 px-6 py-12">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-6 md:p-8">
        <p className="text-sm text-zinc-400">SholaX Onboarding</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Setup in 4 steps</h1>
        <div className="mt-4 h-2 w-full rounded bg-zinc-800">
          <div
            className="h-2 rounded bg-blue-600 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          Step {step} of {TOTAL_STEPS}
        </p>

        {step === 1 ? (
          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-medium text-white">Welcome to SholaX</h2>
            <p className="text-zinc-300">
              Your account is created. We&apos;ll collect your business details and
              get your dashboard ready.
            </p>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
            >
              Continue
            </button>
          </section>
        ) : null}

        {step === 2 ? (
          <form className="mt-8 space-y-4" onSubmit={handleBusinessInfoSubmit}>
            <h2 className="text-xl font-medium text-white">Business information</h2>

            <div>
              <label className="mb-1 block text-sm text-zinc-300" htmlFor="business">
                Business name
              </label>
              <input
                id="business"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white"
                placeholder="Acme Dental"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-300" htmlFor="industry">
                Industry
              </label>
              <input
                id="industry"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white"
                placeholder="Dental, Legal, Fitness..."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-zinc-300" htmlFor="goals">
                Advertising goals (optional)
              </label>
              <textarea
                id="goals"
                value={goals}
                onChange={(event) => setGoals(event.target.value)}
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white"
                placeholder="More qualified leads, lower cost per lead..."
              />
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          </form>
        ) : null}

        {step === 3 ? (
          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-medium text-white">Grant account access</h2>
            <ol className="list-decimal space-y-2 pl-5 text-zinc-300">
              <li>Add SholaX as a partner in Meta Business Manager.</li>
              <li>Share Google Ads account access for campaign management.</li>
              <li>Ensure billing access is active so campaigns can run.</li>
            </ol>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
            >
              I&apos;ve read this, continue
            </button>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="mt-8 space-y-4">
            <h2 className="text-xl font-medium text-white">Complete your setup</h2>
            <p className="text-zinc-300">
              Your invoice has been sent to <span className="font-medium">{email}</span>.
              Once confirmed, your dashboard will be activated within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
            >
              Finish
            </button>
          </section>
        ) : null}
      </div>
    </main>
  );
}
