import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 md:px-10 py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-black">About DopeSick Recovery</h1>
          <p className="text-lg text-black/80 leading-relaxed">
            We are the sober people who refuse to remain anonymous—transforming recovery into visibility, access, and action.
          </p>
        </div>

        {/* Mission Statement - Public */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-wide text-black">Our Mission</h2>
          <div className="border border-black/10 bg-black/5 p-6 space-y-4">
            <p className="text-base leading-relaxed text-black/90">
              DopeSick Recovery connects people suffering from addiction with reputable detox, treatment, and sober living resources, while providing ethical recovery providers a transparent platform to reach those seeking help. As an affiliate of DopeSick Apparel, we are the sober people who refuse to remain anonymous—transforming recovery into visibility, access, and action.
            </p>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-wide text-black">Our Vision</h2>
          <div className="border border-black/10 bg-black/5 p-6">
            <p className="text-base leading-relaxed text-black/90">
              Our vision is a recovery ecosystem where seeking help is normalized, reputable care is easy to access, and lived experience replaces stigma. We envision a world where recovery is visible, ethical treatment is rewarded, and no one seeking sobriety is left navigating the system alone.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-wide text-black">Core Values</h2>
          <div className="space-y-4">
            <div className="border border-black/10 bg-black/5 p-6">
              <h3 className="text-lg font-semibold text-black mb-2">1. Radical Transparency</h3>
              <p className="text-base leading-relaxed text-black/90">
                We believe trust saves lives. We promote honest representation, clear information, and accountability across all recovery services on our platform.
              </p>
            </div>

            <div className="border border-black/10 bg-black/5 p-6">
              <h3 className="text-lg font-semibold text-black mb-2">2. Lived Experience First</h3>
              <p className="text-base leading-relaxed text-black/90">
                DopeSick Recovery is built by people who have been there. We value firsthand recovery experience as essential to credibility, compassion, and impact.
              </p>
            </div>

            <div className="border border-black/10 bg-black/5 p-6">
              <h3 className="text-lg font-semibold text-black mb-2">3. Ethical Growth</h3>
              <p className="text-base leading-relaxed text-black/90">
                We support treatment providers who prioritize patient care over profit and believe long-term success is built through integrity, not exploitation.
              </p>
            </div>

            <div className="border border-black/10 bg-black/5 p-6">
              <h3 className="text-lg font-semibold text-black mb-2">4. Access Over Stigma</h3>
              <p className="text-base leading-relaxed text-black/90">
                We work to remove shame, secrecy, and barriers to care by making recovery visible, approachable, and human.
              </p>
            </div>

            <div className="border border-black/10 bg-black/5 p-6">
              <h3 className="text-lg font-semibold text-black mb-2">5. Community Before Commerce</h3>
              <p className="text-base leading-relaxed text-black/90">
                While we operate as a business, our mission is service-driven. Profit is a tool to scale impact—not the purpose.
              </p>
            </div>

            <div className="border border-black/10 bg-black/5 p-6">
              <h3 className="text-lg font-semibold text-black mb-2">6. Refusal to Remain Anonymous</h3>
              <p className="text-base leading-relaxed text-black/90">
                We stand publicly in recovery to challenge outdated narratives and prove that sobriety is powerful, bold, and worth being seen.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="border-t border-black/10 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/intake"
              className="inline-flex h-11 px-6 items-center justify-center bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition-opacity border border-black"
            >
              Get Help Now
            </Link>
            <Link
              href="/get-listed"
              className="inline-flex h-11 px-6 items-center justify-center border border-[var(--accent)] text-[var(--accent)] font-semibold hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] transition-colors"
            >
              Get Listed
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
