export default function StorePage() {
  const products = [
    { id: "tee-1", name: "Signature Tee", tag: "T-Shirt" },
    { id: "hoodie-1", name: "Recovery Hoodie", tag: "Hoodie" },
    { id: "tank-1", name: "Grit Tank", tag: "Tank Top" },
    { id: "tee-2", name: "Unapologetic Tee", tag: "T-Shirt" },
    { id: "hoodie-2", name: "Rise Hoodie", tag: "Hoodie" },
    { id: "tank-2", name: "Purpose Tank", tag: "Tank Top" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="text-2xl font-semibold tracking-wide mb-6">Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.id} href="#" className="group block">
            <div className="aspect-[3/4] rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent group-hover:border-[var(--accent)]/50 transition-colors" />
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


