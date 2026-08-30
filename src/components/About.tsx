import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'

interface AboutProps {
  onScrollTo: (id: string) => void
}

const services = [
  {
    letter: 'A',
    title: 'AI Products',
    description:
      'Tools we build and ship ourselves. Content automation, learning aids, and event discovery — each with real users, not pitch decks.',
  },
  {
    letter: 'B',
    title: 'Tech Training',
    description:
      'Cohort-based programs in AI/ML, DSA, and full-stack shipping. We train engineers to build and deploy, not just pass interviews.',
  },
  {
    letter: 'C',
    title: 'Software Services',
    description:
      'Software built with a focus on clean execution, useful systems, and products that actually ship.',
  },
]

/**
 * About section — two-column layout.
 * Left: big headline block, right: service list A/B/C
 * Stacks vertically on mobile.
 */
export function About({ onScrollTo }: AboutProps) {
  return (
    <section
      id="about"
      className="min-h-screen bg-c1 py-24 md:py-36"
      aria-labelledby="about-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <ScrollReveal delay={0}>
          <SectionEyebrow index="02" label="ABOUT" className="mb-8" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT: headline + body */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2
                id="about-headline"
                className="text-about-h font-display font-bold text-c2 mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Build. /<br />
                Learn. /<br />
                Automate with AI.
              </h2>
            </ScrollReveal>

            {/* Hairline */}
            <ScrollReveal delay={0.2}>
              <div className="hairline mb-8 max-w-[240px]" />
            </ScrollReveal>

            {/* Body copy */}
            <ScrollReveal delay={0.25}>
              <p
                className="text-c3 text-base leading-relaxed max-w-[38ch]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                A studio for shipping AI products, training engineers, and building the software that keeps teams moving.
              </p>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.35} className="mt-10">
              <button
                onClick={() => onScrollTo('products')}
                className="btn-ghost"
                aria-label="View our products"
              >
                Our Products →
              </button>
            </ScrollReveal>
          </div>

          {/* RIGHT: service list */}
          <div className="flex flex-col justify-start pt-2">
            {services.map((service, i) => (
              <ScrollReveal key={service.letter} delay={0.15 + i * 0.1}>
                <div>
                  {/* Hairline divider above each entry */}
                  <div className="hairline mb-6" />

                  <div className="flex gap-4 pb-8">
                    {/* Letter badge */}
                    <div className="service-letter shrink-0 mt-0.5">
                      <span
                        className="font-mono text-xs text-c3"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {service.letter}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {/* Service title */}
                      <h3
                        className="font-mono text-sm tracking-[0.08em] text-c2 font-medium"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {service.title}
                      </h3>
                      {/* Description */}
                      <p
                        className="text-c3 text-sm leading-relaxed max-w-[40ch]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            {/* Final hairline */}
            <div className="hairline" />
          </div>
        </div>
      </div>
    </section>
  )
}
