"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const redirectPath =
    typeof window === "undefined"
      ? "/dashboard"
      : new URLSearchParams(window.location.search).get("redirect") ||
        "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    if (isSignUpMode) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (!data.session) {
        setMessage(
          "Account created. Please verify your email, then log in to continue onboarding.",
        );
        setIsLoading(false);
        return;
      }

      router.push("/onboarding");
      router.refresh();
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.push(redirectPath);
    router.refresh();
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-6 py-20">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-6">
        <p className="text-sm text-zinc-400">SholaX</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">
          {isSignUpMode ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {isSignUpMode
            ? "Start onboarding to get your dashboard ready."
            : "Log in to access your dashboard or admin area."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-zinc-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none ring-blue-500/50 placeholder:text-zinc-500 focus:ring"
              placeholder="you@business.com"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-zinc-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-white outline-none ring-blue-500/50 placeholder:text-zinc-500 focus:ring"
              placeholder="••••••••"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {message ? <p className="text-sm text-green-400">{message}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? "Please wait..."
              : isSignUpMode
                ? "Create account"
                : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setIsSignUpMode((current) => !current);
            setError(null);
            setMessage(null);
          }}
          className="mt-4 text-sm text-zinc-300 underline-offset-4 hover:underline"
        >
          {isSignUpMode
            ? "Already have an account? Log in"
            : "Need an account? Create one"}
        </button>

        <p className="mt-6 text-xs text-zinc-500">
          By continuing, you agree to start the SholaX onboarding flow.
        </p>
        <Link href="/" className="mt-2 block text-xs text-zinc-500 underline">
          Back to home
        </Link>
      </div>
    </main>
  );
}
