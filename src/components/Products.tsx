import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { DiNotesVisualizer } from './products/DiNotesVisualizer'
import { EventMeshRadar } from './products/EventMeshRadar'
import { sound } from '../utils/audioEngine'
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'

interface ProductItem {
  id: string
  name: string
  num: string
  category: string
  benefitTag: string
  tagline: string
  description: string
  tags: string[]
  highlights: string[]
  accentColor: string
  component: React.ReactNode
}

export function Products() {
  const products: ProductItem[] = [
    {
      id: 'dinotes',
      name: 'DI Notes',
      num: '01',
      category: '/ INTERACTIVE LEARNING ENGINE',
      benefitTag: 'Learn Complex Coding 3x Faster with Visual Cues',
      tagline: 'See how algorithms work instead of memorizing code.',
      description:
        'A revolutionary visual notebook for developers and students. Adjust data inputs with a slider and watch sorting trees, memory pointers, and algorithmic step-traces animate in real time.',
      tags: ['Visual DSA', 'Interactive Sliders', 'Step Tracing', 'Beginner Friendly'],
      highlights: ['Interactive step-by-step memory tracers', 'Live complexity graphs (O(N log N))', 'Multi-language code output'],
      accentColor: 'rgba(0, 210, 255, 0.35)',
      component: <DiNotesVisualizer />,
    },
    {
      id: 'eventmesh',
      name: 'EventMesh',
      num: '02',
      category: '/ TECH EVENT AGGREGATOR',
      benefitTag: 'Never Miss a High-Value Tech Meetup or Hackathon',
      tagline: 'All verified developer conferences & summits in one radar.',
      description:
        'A real-time discovery platform that scans, curates, and matches you with verified AI hackathons, founder meetups, and developer workshops across India and global tech hubs.',
      tags: ['AI Hackathons', 'Founder Meetups', '1-Click RSVP', 'Automated Alerts'],
      highlights: ['Automated multi-platform event indexing', 'Direct calendar integration', 'Collaborator & team finder'],
      accentColor: 'rgba(0, 245, 160, 0.35)',
      component: <EventMeshRadar />,
    },
  ]

  return (
    <section
      id="products"
      className="py-20 md:py-28 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="products-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="03" label="FLAGSHIP IN-HOUSE PRODUCTS" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( LIVE PRODUCTION APPS • INTERACT BELOW )
            </p>
          </ScrollReveal>
        </div>

        {/* Headline with Mixed Fonts */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2
              id="products-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14]"
            >
              Software built for{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                real-world impact
              </span>.
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[42ch] leading-relaxed">
              We don't just build client projects — we engineer and scale our own software used by thousands of learners and builders.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Product Suite Stack */}
        <div className="flex flex-col gap-14 lg:gap-18">
          {products.map((product, idx) => {
            const isReversed = idx % 2 === 1
            return (
              <ScrollReveal key={product.id} delay={0.15 + idx * 0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Product Narrative */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:col-start-8' : ''}`}>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="font-mono text-xs text-[var(--accent-primary)] font-bold">
                        {product.num}
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-base)] text-xs font-mono text-[var(--text-primary)] mb-3 shadow-xs">
                      ✨ {product.benefitTag}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-2">
                      {product.name}
                    </h3>
                    <p className="font-mono text-xs text-[var(--text-primary)] font-semibold mb-3">
                      {product.tagline}
                    </p>

                    <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5">
                      {product.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-primary)] font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {product.tags.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-xs font-mono text-[var(--text-secondary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          sound.playClick(900)
                          window.open('https://github.com/ZaLuLu/nayaklabs-site', '_blank')
                        }}
                        className="btn-primary"
                      >
                        <span>VIEW REPO & DOCS</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Interactive Visualizer Canvas */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:col-start-1' : ''}`}>
                    <SpotlightCard
                      borderGlowColor={product.accentColor}
                      className="p-1 sm:p-2 rounded-2xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-xl"
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
