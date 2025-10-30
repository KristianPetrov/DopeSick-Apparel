import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: PageProps) {
  const { id } = params;
  const product = getMockProduct(id);

  return (
    <main className="mx-auto max-w-5xl px-6 md:px-10 py-10 grid gap-8 md:grid-cols-2">
      <div className="aspect-square rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent flex items-center justify-center">
        <Image src={product.image} alt={product.name} width={600} height={600} className="rounded-lg object-cover" />
      </div>
      <div>
        <Link href="/store" className="inline-flex h-9 px-3 items-center justify-center rounded-md border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors mb-4">Back to Store</Link>
        <h1 className="text-2xl font-semibold tracking-wide">{product.name}</h1>
        <div className="mt-1 text-sm text-white/60">{product.tag}</div>
        <p className="mt-6 text-white/80 leading-relaxed">
          This is a placeholder product description for {product.name}. Showcase features, materials, sizing, and your brand story.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button className="inline-flex h-11 px-6 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium tracking-wide hover:opacity-90 transition-opacity">Add to Cart</button>
          <Link href="/store" className="inline-flex h-11 px-6 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors">Keep Shopping</Link>
        </div>
      </div>
    </main>
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


