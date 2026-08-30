import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Sparkles, GraduationCap, Cpu } from 'lucide-react'

interface AboutProps {
  onScrollTo: (id: string) => void
}

const STATS = [
  { value: '2', label: 'FLAGSHIP PRODUCTION ENGINES', desc: 'DI Notes & EventMesh' },
  { value: '100%', label: 'PRODUCTION FOCUS', desc: 'No pitch decks or disposable prototypes' },
  { value: '4x', label: 'SHIPPING CADENCE', desc: 'Weekly deployed iterations & public changelogs' },
  { value: '<15ms', label: 'INFERENCE PIPELINE', desc: 'Optimized low-latency vector architectures' },
]

export function About({ onScrollTo }: AboutProps) {
  const { setCursorLabel } = useTheme()

  return (
    <section
      id="about"
      className="py-28 md:py-36 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="about-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-12 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="01" label="ONE ECOSYSTEM" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( ARCHITECTURE & MANIFESTO )
            </p>
          </ScrollReveal>
        </div>

        {/* Big Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <h2
                id="about-headline"
                className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Where products,<br />learning, and code<br />
                <span className="text-[var(--accent-primary,#E2001A)]">
                  converge.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p
                className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-[46ch] font-light mb-8"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Nayak Labs is an integrated engineering ecosystem: we build AI tools, train the engineers who deploy them, and engineer scalable software for teams that demand velocity.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    sound.playClick(800)
                    onScrollTo('products')
                  }}
                  onMouseEnter={() => setCursorLabel('EXPLORE')}
                  onMouseLeave={() => setCursorLabel(null)}
                  className="btn-primary text-xs py-2.5 px-5 font-mono"
                >
                  EXPLORE 2 ENGINES →
                </button>
                <button
                  onClick={() => {
                    sound.playClick(800)
                    onScrollTo('training')
                  }}
                  onMouseEnter={() => setCursorLabel('ACADEMY')}
                  onMouseLeave={() => setCursorLabel(null)}
                  className="btn-ghost text-xs py-2.5 px-5 font-mono"
                >
                  VIEW TRAINING TRACKS
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Ecosystem Triple Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <ScrollReveal delay={0.15}>
              <SpotlightCard
                borderGlowColor="rgba(226, 0, 26, 0.3)"
                className="p-6 rounded-sm border-[var(--border-base)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-4 h-4 text-[var(--accent-primary,#E2001A)]" />
                  <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] tracking-wider uppercase">
                    01 // AI PRODUCTS
                  </h3>
                </div>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed font-light">
                  Autonomous tooling built in-house: DI Notes (interactive learning) and EventMesh (event discovery radar). Shipped to real users, refined daily.
                </p>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <SpotlightCard
                borderGlowColor="rgba(59, 130, 246, 0.3)"
                className="p-6 rounded-sm border-[var(--border-base)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] tracking-wider uppercase">
                    02 // TECH TRAINING
                  </h3>
                </div>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed font-light">
                  Cohort-based programs in LLMs, DSA, and Full-Stack systems. We train builders to deploy to production.
                </p>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.28}>
              <SpotlightCard
                borderGlowColor="rgba(16, 185, 129, 0.3)"
                className="p-6 rounded-sm border-[var(--border-base)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-mono text-sm font-bold text-[var(--text-primary)] tracking-wider uppercase">
                    03 // SOFTWARE SERVICES
                  </h3>
                </div>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed font-light">
                  Senior engineering pods on call. Custom AI models, vector search architectures, and high-velocity web platforms.
                </p>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats Grid */}
        <ScrollReveal delay={0.35}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[var(--border-base)] font-mono">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display font-bold text-3xl md:text-4xl text-[var(--text-primary)] mb-1">
                  {stat.value}
                </span>
                <span className="text-[0.68rem] tracking-wider text-[var(--text-secondary)] font-bold uppercase mb-1">
                  {stat.label}
                </span>
                <span className="text-[0.62rem] text-[var(--text-muted)] font-light">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
