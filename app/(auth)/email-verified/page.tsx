"use client";

export default function EmailVerifiedPage() {
  const confirmed =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("confirmed");

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 items-center px-6 py-10">
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center">
        <p className="text-sm text-zinc-400">SholaX</p>
        {confirmed === "1" ? (
          <>
            <h1 className="mt-4 text-2xl font-semibold text-white">Email verified</h1>
            <p className="mt-2 text-sm text-zinc-400">You can now close this tab and log in.</p>
          </>
        ) : (
          <>
            <h1 className="mt-4 text-2xl font-semibold text-white">Link expired</h1>
            <p className="mt-2 text-sm text-zinc-400">This link is invalid or has already been used. Please sign up again.</p>
          </>
        )}
      </div>
    </main>
  );
}
