"use client";

import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import FeaturedProductOpener from "./FeaturedProductOpener";
export default function StorePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <FeaturedProductOpener />
      <h1 className="text-2xl font-semibold tracking-wide mb-6">Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <Link key={p.id} href={`/store/${p.id}`} className="group block">
            <div className="aspect-[3/4] rounded-xl border border-white/10 group-hover:border-[var(--accent)]/50 transition-colors relative overflow-hidden">
              <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-white/60">{p.tag}</div>
              </div>
              <span className="text-xs text-[var(--accent)] border border-[var(--accent)] rounded-full px-2 py-0.5">View</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}


