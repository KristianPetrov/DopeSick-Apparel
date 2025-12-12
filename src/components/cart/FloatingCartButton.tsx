"use client";

import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { useCart } from "./CartProvider";

export default function FloatingCartButton() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-[70] bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-black font-semibold shadow-lg px-4 h-12 hover:opacity-90 transition-opacity"
        aria-label="Open cart"
      >
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-black/10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M7.5 6a4.5 4.5 0 0 1 9 0v.75h1.125a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75H6.375a.75.75 0 0 1-.75-.75v-12a.75.75 0 0 1 .75-.75H7.5V6Zm1.5.75h6V6a3 3 0 0 0-6 0v.75Z" />
          </svg>
        </span>
        <span>Cart</span>
        <span className="inline-flex min-w-[2rem] h-8 px-2 items-center justify-center rounded-full bg-black text-white text-sm">
          {itemCount}
        </span>
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

