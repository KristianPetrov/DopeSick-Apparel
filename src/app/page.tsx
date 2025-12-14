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
            alt="DopeSick Recovery"
            width={560}
            height={200}
            priority
            className="relative z-[1]"
          />
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-black">
          Recovery, Out Loud.
        </h1>

        {/* Hero Subheadline */}
        <p className="text-balance leading-relaxed text-lg md:text-xl lg:text-2xl max-w-4xl text-black/90">
          DopeSick Recovery connects people struggling with addiction to reputable detox, rehab, and sober living—while giving ethical providers a platform built on trust, transparency, and lived experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4">
          <Link
            href="/intake"
            className="inline-flex h-11 px-6 md:px-8 items-center justify-center bg-[var(--accent)] text-black font-semibold text-base md:text-lg tracking-wide whitespace-nowrap hover:opacity-90 transition-opacity border border-black"
          >
            Find Help Now
          </Link>
          <Link
            href="/get-listed"
            className="inline-flex h-11 px-6 md:px-8 items-center justify-center border border-black text-black bg-transparent hover:bg-black hover:text-white hover:border-[var(--accent)] shadow-none hover:shadow-[0_0_16px_2px_rgba(220,38,38,0.6)] transition-all duration-200 font-semibold text-base md:text-lg tracking-wide whitespace-nowrap"
          >
            List Your Program
          </Link>
        </div>
        <section
          aria-label="Recovery intake call to action"
          className="mt-6 w-full max-w-3xl border border-black/10 bg-black/5 backdrop-blur-sm px-6 py-6 md:px-8 md:py-7 text-left"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-semibold tracking-wide text-black">
                Looking for a recovery program?
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-black/75">
                If you or someone you love is ready for help, take our intake form and we’ll connect you with the best recovery center for your needs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/intake"
                className="inline-flex h-11 px-5 md:px-7 items-center justify-center bg-[var(--accent)] text-black font-semibold text-sm md:text-base tracking-normal md:tracking-wide whitespace-nowrap hover:opacity-90 transition-opacity border border-black"
              >
                Take the Intake Form
              </Link>
              <Link
                href="/get-listed"
                className="inline-flex h-11 px-5 md:px-7 items-center justify-center border border-[var(--accent)] text-[var(--accent)] font-semibold text-sm md:text-base tracking-normal md:tracking-wide whitespace-nowrap hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] transition-colors"
              >
                Get Listed
              </Link>
            </div>
          </div>
        </section>
      </section>
      <section id="contact" className="z-10 w-full mt-24 border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold tracking-wide text-black">Contact</h2>
            <p className="text-sm text-black/70 mt-1">Reach out for orders, collabs, or support.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="tel:+15623408000" className="inline-flex h-11 items-center justify-start border border-[var(--accent)] text-[var(--accent)] bg-white px-4 hover:bg-[#7f1d1d]/60 transition-colors">(562) 340-8000</Link>
            <Link href="mailto:sales@dopesickapparel.com" className="inline-flex h-11 items-center justify-start border border-[var(--accent)] text-[var(--accent)] bg-white px-4 hover:bg-[#7f1d1d]/60 transition-colors">sales@dopesickapparel.com</Link>
          </div>
        </div>
      </section>
      <section id="store" className="z-10 w-full mt-12 border-t border-black/10">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-wide text-black">Best Sellers</h2>
            <Link href="/store" className="inline-flex h-11 px-4 items-center justify-center border border-[var(--accent)] text-[var(--accent)] hover:bg-[#7f1d1d]/60 transition-colors">See Full Collection</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { id: 'look-dad-im-clean-hoodie-blk', name: "Look Dad I'm Clean DopeSick Hoodie Black", tag: 'Hoodie', image: '/look-dad-im-clean-hoodie-blk.png' },
              { id: 'look-dad-im-sober-hoodie-blk', name: "Look Dad I'm Sober DopeSick Hoodie Black", tag: 'Hoodie', image: '/look-dad-im-sober-hoodie-blk.png' },
              { id: 'look-mom-im-sober-hoodie-blk', name: "Look Mom I'm Sober DopeSick Hoodie Black", tag: 'Hoodie', image: '/look-mom-im-sober-hoodie-blk.png' },
            ].map((p) => (
              <Link key={p.id} href={`/store?featured=${encodeURIComponent(p.id)}`} className="group block">
                <div className="aspect-[3/4] border border-black/10 group-hover:border-[var(--accent)]/50 transition-colors relative overflow-hidden">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white/60 to-transparent">
                    <div className="text-sm text-black/90">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-black/70">{p.tag}</div>
                    </div>
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
    <footer className="w-full border-t border-black/10">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-8 flex items-center justify-center gap-3">
        <Link href="https://www.setfreedigitaldisciples.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors text-sm">
          <Image src="/set-free-digital-disciples-portal-jesus.png" alt="Set Free Digital Disciples" width={90} height={90} />
          <span>Website designed by Set Free Digital Disciples</span>
        </Link>
      </div>
    </footer>
  );
}
