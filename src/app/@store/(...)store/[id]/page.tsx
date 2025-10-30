"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

type PageProps = {
  params: { id: string };
};

export default function ProductOverlay({ params }: PageProps) {
  const router = useRouter();
  const product = getMockProduct(params.id);

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
        <div className="min-h-0 overflow-y-auto">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="aspect-square rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent flex items-center justify-center">
              <Image src={product.image} alt={product.name} width={600} height={600} className="rounded-lg object-cover" />
            </div>
            <div>
              <div className="text-sm text-white/60">{product.tag}</div>
              <p className="mt-4 text-white/80 leading-relaxed">
                Quick view for {product.name}. For full details and checkout, open the product page.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button className="inline-flex h-10 px-4 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity">Add to Cart</button>
                <button className="inline-flex h-10 px-4 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors" onClick={() => router.push(`/store/${params.id}`)}>Open Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMockProduct(id: string) {
  const map: Record<string, { name: string; tag: string; image: string }> = {
    "look-dad-im-clean-hoodie-blk": { name: "Look Dad I'm Clean DopeSick Hoodie Black", tag: "Hoodie", image: "/look-dad-im-clean-hoodie-blk.png" },
    "look-dad-im-sober-hoodie-blk": { name: "Look Dad I'm Sober DopeSick Hoodie Black", tag: "Hoodie", image: "/look-dad-im-sober-hoodie-blk.png" },
    "look-mom-im-sober-hoodie-blk": { name: "Look Mom I'm Sober DopeSick Hoodie Black", tag: "Hoodie", image: "/look-mom-im-sober-hoodie-blk.png" },
    "tee-1": { name: "Signature Tee", tag: "T-Shirt", image: "/og.png" },
    "hoodie-1": { name: "Recovery Hoodie", tag: "Hoodie", image: "/og.png" },
    "tank-1": { name: "Grit Tank", tag: "Tank Top", image: "/og.png" },
    "tee-2": { name: "Unapologetic Tee", tag: "T-Shirt", image: "/og.png" },
    "hoodie-2": { name: "Rise Hoodie", tag: "Hoodie", image: "/og.png" },
    "tank-2": { name: "Purpose Tank", tag: "Tank Top", image: "/og.png" },
    "tee-hero": { name: "Signature Tee", tag: "T-Shirt", image: "/og.png" },
    "hoodie-hero": { name: "Recovery Hoodie", tag: "Hoodie", image: "/og.png" },
    "tank-hero": { name: "Grit Tank", tag: "Tank Top", image: "/og.png" },
  };
  return map[id] ?? { name: `Product ${id}`, tag: "Apparel", image: "/og.png" };
}


