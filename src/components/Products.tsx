import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { DiNotesVisualizer } from './products/DiNotesVisualizer'
import { EventMeshRadar } from './products/EventMeshRadar'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

interface ProductItem {
  id: string
  name: string
  num: string
  category: string
  tagline: string
  description: string
  tags: string[]
  highlights: string[]
  accentColor: string
  component: React.ReactNode
}

export function Products() {
  const { setCursorLabel } = useTheme()

  const products: ProductItem[] = [
    {
      id: 'dinotes',
      name: 'DI Notes',
      num: '01',
      category: '/ INTERACTIVE LEARNING',
      tagline: 'Learning that responds to you in real-time.',
      description:
        'Concepts you can touch. Every lesson comes with a live computational playground — change an input, adjust a parameter, and watch algorithms and equations re-render with synchronized execution tracing.',
      tags: ['Interactive DSA', 'Visual Algorithms', 'Real-time Math Render', 'Audio-Visual Cues'],
      highlights: ['Step-by-step memory tracers', 'Live complexity graphs', 'Multi-language code generators'],
      accentColor: 'rgba(59, 130, 246, 0.4)',
      component: <DiNotesVisualizer />,
    },
    {
      id: 'eventmesh',
      name: 'EventMesh',
      num: '02',
      category: '/ TECH EVENT AGGREGATOR',
      tagline: 'Every hackathon, meetup, and workshop in one place.',
      description:
        'A single real-time discovery feed aggregating verified tech events across India and global developer hubs. Filter by ecosystem, track prize pools, and join with one authenticated click.',
      tags: ['Hackathons', 'AI Meetups', 'Web3 Summits', '1-Click RSVP'],
      highlights: ['Automated multi-platform scraping', 'Calendar sync & smart reminders', 'Builder team matching'],
      accentColor: 'rgba(16, 185, 129, 0.4)',
      component: <EventMeshRadar />,
    },
  ]

  return (
    <section
      id="products"
      className="min-h-screen py-28 md:py-36 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="products-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-12 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="02" label="PRODUCTS" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( 2 ACTIVE PRODUCTION ENGINES )
            </p>
          </ScrollReveal>
        </div>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2
              id="products-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Products that<br />actually ship.
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[40ch] leading-relaxed">
              Each tool stands on its own — but together, they form the intelligent foundation of the NayakLabs ecosystem.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Product Suite Stack */}
        <div className="flex flex-col gap-24">
          {products.map((product, idx) => {
            const isReversed = idx % 2 === 1
            return (
              <ScrollReveal key={product.id} delay={0.15 + idx * 0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start ${
                    isReversed ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Info Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between h-full ${
                      isReversed ? 'lg:col-start-8' : ''
                    }`}
                  >
                    <div>
                      {/* Product Number & Category */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-sm font-bold text-[var(--accent-primary,#E2001A)]">
                          {product.num}
                        </span>
                        <span className="font-mono text-xs tracking-widest text-[var(--text-muted)]">
                          {product.category}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3
                        className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {product.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-[var(--text-secondary)] text-sm md:text-base font-medium mb-4">
                        {product.tagline}
                      </p>

                      {/* Full description */}
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 font-light">
                        {product.description}
                      </p>

                      {/* Feature Highlights */}
                      <div className="flex flex-col gap-2 mb-6">
                        {product.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-[var(--bg-card)] border border-[var(--border-base)] font-mono text-[0.65rem] text-[var(--text-muted)] tracking-wider rounded-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#contact"
                        onClick={() => sound.playClick(800)}
                        onMouseEnter={() => setCursorLabel('INQUIRE')}
                        onMouseLeave={() => setCursorLabel(null)}
                        className="btn-ghost inline-flex items-center gap-2 text-xs py-2.5 px-4 font-mono tracking-wider"
                      >
                        <span>GET ACCESS TO {product.name.toUpperCase()}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Interactive Mini-App Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isReversed ? 'lg:col-start-1' : ''
                    }`}
                  >
                    <SpotlightCard
                      borderGlowColor={product.accentColor}
                      className="rounded-sm shadow-2xl border-[var(--border-base)]"
                    >
                      {product.component}
                    </SpotlightCard>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
