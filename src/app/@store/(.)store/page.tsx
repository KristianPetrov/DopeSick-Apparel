"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StoreOverlay() {
  const router = useRouter();

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
        aria-labelledby="store-title"
        className="relative w-full max-w-4xl rounded-t-2xl md:rounded-xl border border-[var(--accent)]/30 bg-black p-4 md:p-6 shadow-xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-px rounded-t-2xl md:rounded-xl pointer-events-none" style={{ boxShadow: "0 0 120px 30px rgba(220,38,38,0.08) inset" }} />
        <div className="flex items-center justify-between mb-4">
          <h2 id="store-title" className="text-lg font-semibold tracking-wide">Store</h2>
          <button className="h-9 px-3 rounded-md border border-[var(--accent)] text-[var(--accent)] bg-black hover:bg-[#7f1d1d]/60 transition-colors" onClick={() => router.back()}>Close</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent flex items-end p-3">
              <div className="text-sm text-white/80">Product {i + 1}</div>
            </div>
          ))}
        </div>
        <a href="/store" className="mt-6 inline-flex h-10 px-4 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors">Open full store</a>
      </div>
    </div>
  );
}


