"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { useCart } from "@/components/cart/CartProvider";
import { formatMoney, getProductById } from "@/lib/products";
import type { CartSize } from "@/components/cart/CartProvider";

export default function CheckoutClient() {
  const sp = useSearchParams();
  const { data: session, status } = useSession();
  const { lines, setQty, removeItem, clear, addItem } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shipAddress1, setShipAddress1] = useState("");
  const [shipAddress2, setShipAddress2] = useState("");
  const [shipCity, setShipCity] = useState("");
  const [shipState, setShipState] = useState("");
  const [shipZip, setShipZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Back-compat: if coming from an old ?product= flow, add that item to cart once.
  const product = sp.get("product");
  useEffect(() => {
    if (!product) return;
    addItem(product, "M", 1);
  }, [addItem, product]);

  useEffect(() => {
    if (status !== "authenticated") return;
    setEmail((prev) => prev || session?.user?.email || "");
    setCustomerName((prev) => prev || session?.user?.name || "");
  }, [session?.user?.email, session?.user?.name, status]);

  const subtotalCents = useMemo(() => {
    return lines.reduce((sum, l) => sum + getProductById(l.productId).priceCents * l.quantity, 0);
  }, [lines]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (lines.length === 0) {
        setError("Your cart is empty.");
        return;
      }
      if (!phone.trim()) {
        setError("Please enter a phone number.");
        return;
      }
      if (!shipAddress1.trim() || !shipCity.trim() || !shipState.trim() || !shipZip.trim()) {
        setError("Please enter your shipping address (address, city, state, zip).");
        return;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          shipping: {
            address1: shipAddress1,
            address2: shipAddress2,
            city: shipCity,
            state: shipState,
            zip: shipZip,
          },
          items: lines,
        }),
      });

      if (!res.ok) {
        setError(await res.text());
        return;
      }

      clear();
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-6 md:px-10 py-12">
        <h1 className="text-2xl font-semibold tracking-wide">Order received</h1>
        <p className="mt-2 text-sm text-black/70">
          Thanks — your order was submitted. We&apos;ll reach out via email.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/store"
            className="inline-flex h-11 px-6 items-center justify-center border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors"
          >
            Back to store
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 px-6 items-center justify-center bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity border border-black"
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
      {status !== "authenticated" ? (
        <div className="mt-3 border border-black/10 bg-black/5 px-5 py-4">
          <div className="text-sm text-black/80 font-medium">Checkout options</div>
          <p className="mt-1 text-sm text-black/70">
            You can check out as a guest, or sign in / create an account to auto-fill your saved details.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/login?next=/store/checkout"
              className="inline-flex h-11 px-4 items-center justify-center border border-black/20 text-black/80 hover:text-black hover:bg-black/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register?next=/store/checkout"
              className="inline-flex h-11 px-4 items-center justify-center border border-black/20 text-black/80 hover:text-black hover:bg-black/10 transition-colors"
            >
              Create account
            </Link>
            <span className="inline-flex h-11 items-center text-sm text-black/60">
              or continue as guest below
            </span>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-sm text-black/70">
          Checking out as <span className="text-black/85">{session?.user?.email}</span>
        </p>
      )}

      <div className="mt-8 border border-black/10 bg-black/5 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium text-black">Your cart</div>
            <div className="text-xs text-black/60">Review items and adjust quantities</div>
          </div>
          <div className="text-sm text-black/80">
            Subtotal: <span className="text-black/95 font-medium">{formatMoney(subtotalCents)}</span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {lines.length === 0 ? (
            <div className="text-sm text-black/70">
              Your cart is empty. <Link href="/store" className="text-[var(--accent)] hover:underline">Go back to store</Link>
            </div>
          ) : (
            lines.map((l) => {
              const p = getProductById(l.productId);
              return (
                <div key={`${l.productId}:${l.size}`} className="flex items-center justify-between gap-3 border border-black/10 bg-white/20 px-4 py-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate text-black">{p.name}</div>
                    <div className="text-xs text-black/60">
                      {p.tag} • Size {(l.size as CartSize) ?? "M"} • {formatMoney(p.priceCents)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border border-black/15 bg-white/20">
                      <button type="button" className="h-9 w-10 text-black/80 hover:text-black" onClick={() => setQty(l.productId, l.size, Math.max(1, l.quantity - 1))}>−</button>
                      <div className="px-2 text-sm text-black/90 min-w-[2.25rem] text-center">{l.quantity}</div>
                      <button type="button" className="h-9 w-10 text-black/80 hover:text-black" onClick={() => setQty(l.productId, l.size, l.quantity + 1)}>+</button>
                    </div>
                    <button type="button" className="text-xs text-black/60 hover:text-black underline underline-offset-4" onClick={() => removeItem(l.productId, l.size)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-black/80" htmlFor="customerName">
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
          <label className="text-sm text-black/80" htmlFor="email">
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
          <label className="text-sm text-black/80" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="border border-black/10 bg-black/5 p-5">
          <div className="font-medium text-black">Shipping address</div>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-black/80" htmlFor="shipAddress1">
                Address line 1
              </label>
              <input
                id="shipAddress1"
                type="text"
                required
                value={shipAddress1}
                onChange={(e) => setShipAddress1(e.target.value)}
                className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-black/80" htmlFor="shipAddress2">
                Address line 2 (optional)
              </label>
              <input
                id="shipAddress2"
                type="text"
                value={shipAddress2}
                onChange={(e) => setShipAddress2(e.target.value)}
                className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-1">
                <label className="text-sm text-black/80" htmlFor="shipCity">
                  City
                </label>
                <input
                  id="shipCity"
                  type="text"
                  required
                  value={shipCity}
                  onChange={(e) => setShipCity(e.target.value)}
                  className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <label className="text-sm text-black/80" htmlFor="shipState">
                  State
                </label>
                <input
                  id="shipState"
                  type="text"
                  required
                  value={shipState}
                  onChange={(e) => setShipState(e.target.value)}
                  className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <label className="text-sm text-black/80" htmlFor="shipZip">
                  Zip
                </label>
                <input
                  id="shipZip"
                  type="text"
                  required
                  value={shipZip}
                  onChange={(e) => setShipZip(e.target.value)}
                  className="h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>
          </div>
        </div>

        {error && <div className="text-sm text-red-300">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 w-full items-center justify-center bg-[var(--accent)] text-black font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60 border border-black"
        >
          {submitting ? "Submitting..." : "Submit order"}
        </button>
      </form>
    </main>
  );
}

