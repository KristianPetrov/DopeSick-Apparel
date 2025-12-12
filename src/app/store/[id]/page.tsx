"use client";

import Image from "next/image";
import Link from "next/link";
import { formatMoney, getProductById } from "@/lib/products";
import ProductPurchase from "@/components/cart/ProductPurchase";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams<{ id?: string | string[] }>();
  const idRaw = params?.id;
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;
  const product = getProductById(String(id ?? ""));

  return (
    <main className="mx-auto max-w-5xl px-6 md:px-10 py-10 grid gap-8 md:grid-cols-2">
      <div className="aspect-square rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent relative overflow-hidden">
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div>
        <Link href="/store" className="inline-flex h-9 px-3 items-center justify-center rounded-md border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors mb-4">Back to Store</Link>
        <h1 className="text-2xl font-semibold tracking-wide">{product.name}</h1>
        <div className="mt-1 text-sm text-white/60">{product.tag}</div>
        <div className="mt-3 text-base text-white/85 font-medium">{formatMoney(product.priceCents)}</div>
        <p className="mt-6 text-white/80 leading-relaxed">
          {product.name}.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="w-full sm:max-w-xs">
            <ProductPurchase
              productId={String(id ?? "")}
              buttonClassName="inline-flex h-11 w-full px-6 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium tracking-wide hover:opacity-90 transition-opacity"
            />
          </div>

        </div>
      </div>
    </main>
  );
}


