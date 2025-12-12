"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || "Unable to create account.");
        return;
      }

      await signIn("credentials", { email, password, redirect: false });
      router.push("/");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 md:px-10 py-12">
      <h1 className="text-2xl font-semibold tracking-wide">Create Account</h1>
      <p className="mt-2 text-sm text-white/70">
        Already have an account?{" "}
        <Link className="text-[var(--accent)] hover:underline" href="/login">
          Login
        </Link>
        .
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="name">
            Name (optional)
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
          />
        </div>
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
          />
        </div>

        {error && <div className="text-sm text-red-300">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create account"}
        </button>
      </form>
    </main>
  );
}


