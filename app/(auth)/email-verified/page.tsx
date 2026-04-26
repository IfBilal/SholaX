"use client";

import Link from "next/link";

export default function EmailVerifiedPage() {
  const confirmed =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("confirmed");

  const success = confirmed === "1";

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-6 py-10">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center">
        <p className="text-sm text-zinc-400">SholaX</p>

        {success ? (
          <>
            <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-white">Email verified</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Your email has been confirmed. You can now log in to your account.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-500"
            >
              Go to login
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-white">Link expired</h1>
            <p className="mt-2 text-sm text-zinc-400">
              This verification link is invalid or has already been used. Please sign up again to get a new one.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-lg bg-zinc-700 px-6 py-2 font-medium text-white transition hover:bg-zinc-600"
            >
              Back to login
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
