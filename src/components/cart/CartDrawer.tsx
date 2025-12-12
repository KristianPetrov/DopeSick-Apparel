"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "./CartProvider";
import { formatMoney, getProductById } from "@/lib/products";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, itemCount, setQty, removeItem, clear } = useCart();

  const subtotalCents = useMemo(() => {
    return lines.reduce((sum, l) => sum + getProductById(l.productId).priceCents * l.quantity, 0);
  }, [lines]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/60" onClick={onClose} aria-hidden />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className="fixed right-0 top-0 z-[90] h-full w-full max-w-md border-l border-white/10 bg-[#0a0a0a] shadow-2xl"
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold tracking-wide">Your Cart</div>
              <div className="text-xs text-white/60">{itemCount} item{itemCount === 1 ? "" : "s"}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 px-3 items-center justify-center rounded-md border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {lines.length === 0 ? (
              <div className="text-sm text-white/70">
                Your cart is empty. Add a few items from the store.
              </div>
            ) : (
              <div className="space-y-4">
                {lines.map((l) => {
                  const p = getProductById(l.productId);
                  return (
                    <div
                      key={`${l.productId}:${l.size}`}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-3"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden border border-white/10 bg-black/30 shrink-0">
                        <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-medium truncate">{p.name}</div>
                            <div className="text-xs text-white/60">
                              {p.tag} • Size {l.size}
                            </div>
                          </div>
                          <div className="text-sm text-white/80 whitespace-nowrap">
                            {formatMoney(p.priceCents)}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-full border border-white/15 bg-black/20">
                            <button
                              type="button"
                              className="h-9 w-10 text-white/80 hover:text-white"
                              onClick={() => setQty(l.productId, l.size, Math.max(1, l.quantity - 1))}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <div className="px-2 text-sm text-white/90 min-w-[2.25rem] text-center">
                              {l.quantity}
                            </div>
                            <button
                              type="button"
                              className="h-9 w-10 text-white/80 hover:text-white"
                              onClick={() => setQty(l.productId, l.size, l.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-xs text-white/60 hover:text-white underline underline-offset-4"
                            onClick={() => removeItem(l.productId, l.size)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="px-5 py-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div className="text-white/70">Subtotal</div>
              <div className="text-white/90 font-medium">{formatMoney(subtotalCents)}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                disabled={lines.length === 0}
                onClick={clear}
              >
                Clear
              </button>
              <a
                href="/store/checkout"
                onClick={onClose}
                className={`inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity ${
                  lines.length === 0 ? "pointer-events-none opacity-60" : ""
                }`}
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

