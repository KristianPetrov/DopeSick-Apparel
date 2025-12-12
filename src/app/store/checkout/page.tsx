import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-xl px-6 md:px-10 py-12">
          <h1 className="text-2xl font-semibold tracking-wide">Checkout</h1>
          <p className="mt-2 text-sm text-white/70">Loading…</p>
        </main>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}


