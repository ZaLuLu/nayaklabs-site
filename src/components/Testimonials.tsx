import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { Star, Quote, CheckCircle } from 'lucide-react'

interface TestimonialItem {
  name: string
  role: string
  org: string
  type: 'Client & Founder' | 'Academy Graduate' | 'Engineering Lead'
  quote: string
  accentColor: string
}

const REVIEWS: TestimonialItem[] = [
  {
    name: 'Aarav Malhotra',
    role: 'Co-Founder & CEO',
    org: 'Logistics AI Venture',
    type: 'Client & Founder',
    quote:
      'Nayak Labs took our raw concept and turned it into a live, production-ready AI dispatch engine in under 3 weeks. They translated complex tech trade-offs into plain business decisions.',
    accentColor: 'rgba(226, 0, 26, 0.35)',
  },
  {
    name: 'Pooja Iyer',
    role: 'AI Engineer',
    org: 'Alumni (Agentic AI Cohort)',
    type: 'Academy Graduate',
    quote:
      'The mentorship here is unlike any online course. You build real production pipelines, get your code thoroughly reviewed by senior engineers, and leave with a killer GitHub portfolio.',
    accentColor: 'rgba(0, 245, 160, 0.35)',
  },
  {
    name: 'Devendra K.',
    role: 'Director of Engineering',
    org: 'SaaS Platform',
    type: 'Engineering Lead',
    quote:
      'Their team delivered our custom vector search pipeline 2 weeks ahead of schedule. The code was exceptionally well-documented, clean, and seamlessly transferred to our in-house developers.',
    accentColor: 'rgba(0, 210, 255, 0.35)',
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="testimonials-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="07" label="TRUST & CLIENT OUTCOMES" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( VERIFIED EXPERIENCES FROM BUILDERS & CLIENTS )
            </p>
          </ScrollReveal>
        </div>

        {/* Headline with Mixed Fonts */}
        <div className="max-w-3xl mb-12">
          <ScrollReveal delay={0.1}>
            <h2
              id="testimonials-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14] mb-3"
            >
              Real outcomes from people who{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                shipped with us
              </span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
              From early-stage startups needing rapid MVPs to ambitious engineers mastering agentic systems.
            </p>
          </ScrollReveal>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <ScrollReveal key={idx} delay={0.1 + idx * 0.08}>
              <SpotlightCard
                borderGlowColor={review.accentColor}
                className="p-6 sm:p-7 rounded-xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md flex flex-col justify-between h-full group hover:border-[var(--border-hover)] transition-all"
              >
                <div>
                  {/* Rating Stars & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[var(--accent-amber)]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[var(--text-muted)] border border-[var(--border-base)] px-2.5 py-0.5 rounded-md bg-[var(--bg-surface)]">
                      {review.type}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] font-normal leading-relaxed mb-6 italic">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[var(--border-base)] flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--text-primary)]">
                      {review.name}
                    </h4>
                    <p className="text-xs font-mono text-[var(--text-muted)]">
                      {review.role} • {review.org}
                    </p>
                  </div>

                  <CheckCircle className="w-4 h-4 text-[var(--accent-emerald)] shrink-0" />
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
