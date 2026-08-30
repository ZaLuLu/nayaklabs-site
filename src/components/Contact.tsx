import { GlassLinesBackground } from './GlassLinesBackground'
import { CrosshairTicks } from './CrosshairTicks'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'

const whyItems = [
  { num: '01', title: 'Production from day one', detail: 'No demo-ware.' },
  { num: '02', title: 'Taught by builders', detail: 'Engineers who ship, teaching what they use.' },
  { num: '03', title: 'Designed to last', detail: 'Clean code, considered UX, no throwaway work.' },
  { num: '04', title: 'Always shipping', detail: 'Weekly releases, public changelogs.' },
]

/**
 * Contact section — bookends the page, same background as Hero.
 * Left: numbered "why us" list.
 * Right: email + instagram contact tiles.
 * Footer strip at bottom.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-c1 py-24 md:py-36 overflow-hidden"
      aria-labelledby="contact-headline"
    >
      {/* Reused glass lines background */}
      <GlassLinesBackground lineCount={10} />

      {/* Corner crosshairs */}
      <CrosshairTicks />

      {/* Vertical side labels */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10 hidden lg:block" aria-hidden="true">
        <p className="side-label" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
          EST. INDIA
        </p>
      </div>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 hidden lg:block" aria-hidden="true">
        <p className="side-label" style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}>
          EST. INDIA
        </p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow + index */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-16 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="04" label="CONTACT" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="section-index">04 / 04</p>
          </ScrollReveal>
        </div>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h2
            id="contact-headline"
            className="font-display font-bold text-c2 mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              maxWidth: '16ch',
            }}
          >
            Ready to build something that{' '}
            <strong className="text-c2" style={{ fontWeight: 800 }}>
              actually ships?
            </strong>
          </h2>
        </ScrollReveal>

        {/* Sub copy */}
        <ScrollReveal delay={0.18}>
          <p className="text-c3 text-base leading-relaxed max-w-[50ch] mb-16" style={{ fontFamily: 'var(--font-body)' }}>
            Whether it's a product, a cohort seat, or a services engagement — start a conversation.
          </p>
        </ScrollReveal>

        {/* Two-column: why list + contact tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT: Why choose us */}
          <div>
            <ScrollReveal delay={0.22}>
              <p className="font-mono text-[0.65rem] tracking-[0.15em] text-c3 mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
                WHY CHOOSE US
              </p>
            </ScrollReveal>

            <div className="flex flex-col">
              {whyItems.map((item, i) => (
                <ScrollReveal key={item.num} delay={0.28 + i * 0.08}>
                  <div>
                    <div className="hairline mb-4" />
                    <div className="flex gap-4 pb-5">
                      <span className="why-item-num mt-0.5">{item.num}</span>
                      <div>
                        <p className="text-c2 text-sm font-medium mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                          {item.title}
                        </p>
                        <p className="text-c3 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
              <div className="hairline" />
            </div>
          </div>

          {/* RIGHT: Contact tiles */}
          <div className="flex flex-col gap-4">
            <ScrollReveal delay={0.3}>
              <a
                href="mailto:hello@nayaklabs.com"
                className="contact-tile block group"
                aria-label="Send email to hello@nayaklabs.com"
              >
                <p className="font-mono text-[0.65rem] tracking-[0.15em] text-c3 mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  EMAIL
                </p>
                <p
                  className="text-c2 text-base font-medium group-hover:text-c3 transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  hello@nayaklabs.com
                </p>
              </a>
            </ScrollReveal>

            <ScrollReveal delay={0.38}>
              <a
                href="https://instagram.com/nayaklabs"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-tile block group"
                aria-label="Visit Nayak Labs on Instagram (opens in new tab)"
              >
                <p className="font-mono text-[0.65rem] tracking-[0.15em] text-c3 mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  INSTAGRAM
                </p>
                <p
                  className="text-c2 text-base font-medium group-hover:text-c3 transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  instagram.com/nayaklabs ↗
                </p>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
