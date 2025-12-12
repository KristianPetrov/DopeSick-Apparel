"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutClient() {
  const sp = useSearchParams();
  const product = sp.get("product");

  const initialItems = useMemo(() => {
    if (!product) return [];
    return [{ productId: product, quantity: 1 }];
  }, [product]);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [itemsText, setItemsText] = useState(JSON.stringify(initialItems, null, 2));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      let items: unknown = null;
      try {
        items = JSON.parse(itemsText);
      } catch {
        setError("Items must be valid JSON.");
        return;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, email, items }),
      });

      if (!res.ok) {
        setError(await res.text());
        return;
      }

      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-6 md:px-10 py-12">
        <h1 className="text-2xl font-semibold tracking-wide">Order received</h1>
        <p className="mt-2 text-sm text-white/70">
          Thanks — your order was submitted. We&apos;ll reach out via email.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/store"
            className="inline-flex h-11 px-6 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors"
          >
            Back to store
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 px-6 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity"
          >
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 md:px-10 py-12">
      <h1 className="text-2xl font-semibold tracking-wide">Checkout</h1>
      <p className="mt-2 text-sm text-white/70">
        This is a lightweight order form so the admin dashboard can track orders.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="customerName">
            Name (optional)
          </label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
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
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="items">
            Items (JSON)
          </label>
          <textarea
            id="items"
            rows={8}
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
            className="w-full rounded-md bg-black border border-white/20 px-3 py-2 outline-none focus:border-[var(--accent)] font-mono text-xs"
          />
        </div>

        {error && <div className="text-sm text-red-300">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit order"}
        </button>
      </form>
    </main>
  );
}

