import Link from "next/link";
import Image from "next/image";
export default function StorePage() {
  const products = [
    { id: "look-dad-im-clean-hoodie-blk", name: "Look Dad I'm Clean DopeSick Hoodie Black", tag: "Hoodie", image: "/look-dad-im-clean-hoodie-blk.png" },
    { id: "look-dad-im-sober-hoodie-blk", name: "Look Dad I'm Sober DopeSick Hoodie Black", tag: "Hoodie", image: "/look-dad-im-sober-hoodie-blk.png" },
    { id: "look-mom-im-sober-hoodie-blk", name: "Look Mom I'm Sober DopeSick Hoodie Black", tag: "Hoodie", image: "/look-mom-im-sober-hoodie-blk.png" },
    { id: "tee-1", name: "Signature Tee", tag: "T-Shirt", image: "/og.png" },
    { id: "hoodie-1", name: "Recovery Hoodie", tag: "Hoodie", image: "/og.png" },
    { id: "tank-1", name: "Grit Tank", tag: "Tank Top", image: "/og.png" },
    { id: "tee-2", name: "Unapologetic Tee", tag: "T-Shirt", image: "/og.png" },
    { id: "hoodie-2", name: "Rise Hoodie", tag: "Hoodie", image: "/og.png" },
    { id: "tank-2", name: "Purpose Tank", tag: "Tank Top", image: "/og.png" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <h1 className="text-2xl font-semibold tracking-wide mb-6">Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
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


