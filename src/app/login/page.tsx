"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setError("Invalid email or password.");
        return;
      }

      const session = await getSession();
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 md:px-10 py-12">
      <h1 className="text-2xl font-semibold tracking-wide">Login</h1>
      <p className="mt-2 text-sm text-white/70">
        Don&apos;t have an account?{" "}
        <Link className="text-[var(--accent)] hover:underline" href="/register">
          Create one
        </Link>
        .
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
          />
        </div>

        {error && <div className="text-sm text-red-300">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}


