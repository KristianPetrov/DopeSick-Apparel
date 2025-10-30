import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
      </div>
      <section className="z-10 px-6 md:px-10 w-full max-w-6xl flex flex-col items-center text-center gap-8 pt-14">
        <div className="relative flex items-center justify-center">
          <div className="candle-glow" aria-hidden />
          <Image
            src="/dopesick-graffiti-logo.png"
            alt="Dopesick Apparel"
            width={560}
            height={200}
            priority
            className="relative z-[1]"
          />
        </div>
        <p className="text-balance leading-relaxed text-lg md:text-xl lg:text-2xl max-w-3xl">
          To redefine streetwear through the lens of recovery — bold, unapologetic, and born from the struggle. Dopesick Apparel stands for the ones who turned their pain into purpose.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link href="/store" className="inline-flex h-10 md:h-11 px-4 md:px-6 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium text-sm md:text-base tracking-normal md:tracking-wide whitespace-nowrap hover:opacity-90 transition-opacity">
            Shop the Collection
          </Link>
          <Link href="#story" className="inline-flex h-10 md:h-11 px-4 md:px-6 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] font-medium text-sm md:text-base tracking-normal md:tracking-wide whitespace-nowrap hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] transition-colors">
            Our Story
          </Link>
        </div>
      </section>
      <section id="contact" className="z-10 w-full mt-24 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold tracking-wide text-white">Contact</h2>
            <p className="text-sm text-white/70 mt-1">Reach out for orders, collabs, or support.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="tel:+15623408000" className="inline-flex h-10 items-center justify-start rounded-md border border-[var(--accent)] text-[var(--accent)] bg-black px-4 hover:bg-[#7f1d1d]/60 transition-colors">(562) 340-8000</Link>
            <Link href="mailto:smartaxweb@gmail.com" className="inline-flex h-10 items-center justify-start rounded-md border border-[var(--accent)] text-[var(--accent)] bg-black px-4 hover:bg-[#7f1d1d]/60 transition-colors">smartaxweb@gmail.com</Link>
          </div>
        </div>
      </section>
      <section id="store" className="z-10 w-full mt-12 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-wide text-white">Store</h2>
            <Link href="/store" className="inline-flex h-10 px-4 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors">Open Store</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { id: 'tee-hero', name: 'Signature Tee', tag: 'T-Shirt' },
              { id: 'hoodie-hero', name: 'Recovery Hoodie', tag: 'Hoodie' },
              { id: 'tank-hero', name: 'Grit Tank', tag: 'Tank Top' },
              { id: 'tee-alt', name: 'Unapologetic Tee', tag: 'T-Shirt' },
              { id: 'hoodie-alt', name: 'Rise Hoodie', tag: 'Hoodie' },
              { id: 'tank-alt', name: 'Purpose Tank', tag: 'Tank Top' },
            ].map((p) => (
              <Link key={p.id} href="/store" className="group block">
                <div className="aspect-[3/4] rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent group-hover:border-[var(--accent)]/50 transition-colors flex items-end p-3">
                  <div className="text-sm text-white/80">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-white/60">{p.tag}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FooterCredit />
    </main>
  );
}

function FooterCredit() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-8 flex items-center justify-center gap-3">
        <Link href="https://www.setfreedigitaldisciples.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          <Image src="/set-free-digital-disciples-portal-jesus.png" alt="Set Free Digital Disciples" width={90} height={90} />
          <span>Website designed by Set Free Digital Disciples</span>
        </Link>
      </div>
    </footer>
  );
}
