"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { getProductById } from "@/lib/products";
import ProductPurchase from "@/components/cart/ProductPurchase";

export default function ProductOverlay() {
  const router = useRouter();
  const params = useParams<{ id?: string | string[] }>();
  const idRaw = params?.id;
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
  const product = getProductById(String(id ?? ""));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm p-2 md:p-6" onClick={() => router.back()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
        className="relative w-full max-w-4xl rounded-t-2xl md:rounded-xl border border-[var(--accent)]/30 bg-black p-4 md:p-6 shadow-xl max-h-[90vh] md:max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 rounded-t-2xl md:rounded-xl pointer-events-none" style={{ boxShadow: "0 0 120px 30px rgba(220,38,38,0.08) inset" }} />
        <div className="flex items-center justify-between mb-4">
          <h2 id="product-title" className="text-lg font-semibold tracking-wide">{product.name}</h2>
          <button className="h-9 px-3 rounded-md border border-[var(--accent)] text-[var(--accent)] bg-black hover:bg-[#7f1d1d]/60 transition-colors" onClick={() => router.back()}>Close</button>
        </div>
        <div className="min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="aspect-square rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent relative overflow-hidden">
              <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-white/60">{product.tag}</div>
              <p className="mt-4 text-white/80 leading-relaxed">
                Quick view for {product.name}.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-full max-w-xs">
                  <ProductPurchase
                    productId={String(id ?? "")}
                    buttonClassName="inline-flex h-10 w-full px-4 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


