import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { sound } from '../utils/audioEngine'
import { Sparkles, GraduationCap, Cpu, Check, ArrowRight } from 'lucide-react'

interface AboutProps {
  onScrollTo: (id: string) => void
}

const STATS = [
  { value: '18 Days', label: 'AVG. MVP TIMELINE', desc: 'From specification to live production deployment' },
  { value: '100%', label: 'CODE & IP OWNERSHIP', desc: 'Full Git repository, documentation, and cloud rights' },
  { value: '500+', label: 'DEVELOPERS TRAINED', desc: 'Hands-on mentorship across Agentic AI & systems' },
  { value: '<15ms', label: 'OPTIMIZED LATENCY', desc: 'High-performance cloud architectures & pipelines' },
]

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.25, 1])
  const color = useTransform(progress, range, ['var(--text-muted)', 'var(--text-primary)'])
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-1.5 transition-colors">
      {children}
    </motion.span>
  )
}

export function About({ onScrollTo }: AboutProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.85', 'end 0.55'],
  })

  const manifestoText =
    "Most tech agencies talk in confusing buzzwords and deliver bloated slide decks. We focus on what actually moves the needle: high-velocity software engineering, autonomous AI systems that solve real business bottlenecks, and elite mentorship for serious builders."
  const words = manifestoText.split(' ')

  return (
    <section
      id="about"
      className="py-20 md:py-28 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="about-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="01" label="THE NAYAK LABS MANIFESTO" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( PRECISION ENGINEERING • ZERO JARGON )
            </p>
          </ScrollReveal>
        </div>

        {/* Big Editorial Headline with Mixed Fonts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-14">
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <h2
                id="about-headline"
                className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight mb-6 leading-[1.14]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                We build products. <br />
                We train builders. <br />
                We turn ideas into{' '}
                <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                  reality
                </span>.
              </h2>
            </ScrollReveal>

            {/* Scroll-Linked Word Illumination Text */}
            <p
              ref={paragraphRef}
              className="text-base sm:text-xl font-normal leading-relaxed max-w-[50ch] mb-8 font-display"
            >
              {words.map((word, i) => {
                const start = i / words.length
                const end = start + 1 / words.length
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                )
              })}
            </p>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => {
                    sound.playClick(800)
                    onScrollTo('products')
                  }}
                  className="btn-primary"
                >
                  <span>EXPLORE OUR PRODUCTS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    sound.playClick(800)
                    onScrollTo('estimator')
                  }}
                  className="btn-ghost"
                >
                  <span>SCOPE A PROJECT</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Ecosystem Triple Pillars with 3D Tilt */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <ScrollReveal delay={0.15}>
              <SpotlightCard
                borderGlowColor="rgba(226, 0, 26, 0.35)"
                className="p-5 sm:p-6 rounded-2xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] tracking-wider uppercase">
                      01 // AI Product Studio
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--accent-primary)] font-semibold px-2 py-0.5 rounded-md bg-[var(--accent-glow)]">
                    IN-HOUSE
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-xs sm:text-[13px] leading-relaxed mb-3">
                  We build standalone software ventures like <strong className="text-[var(--text-primary)]">DI Notes</strong> (visual algorithm engine) and <strong className="text-[var(--text-primary)]">EventMesh</strong> (tech event radar).
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                  <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                  <span>Battle-tested with real-world users</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <SpotlightCard
                borderGlowColor="rgba(0, 245, 160, 0.35)"
                className="p-5 sm:p-6 rounded-2xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-[var(--accent-emerald)]">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] tracking-wider uppercase">
                      02 // Engineering Fellowship
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--accent-emerald)] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10">
                    LIVE COHORTS
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-xs sm:text-[13px] leading-relaxed mb-3">
                  Intensive mentorship in <strong className="text-[var(--text-primary)]">Agentic AI, Full-Stack Cloud, and Visual DSA</strong>. Strictly 12 seats with 1-on-1 code reviews.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                  <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                  <span>100% production portfolio code</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay={0.28}>
              <SpotlightCard
                borderGlowColor="rgba(255, 184, 0, 0.35)"
                className="p-5 sm:p-6 rounded-2xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-[var(--accent-amber)]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] tracking-wider uppercase">
                      03 // Custom Software Services
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--accent-amber)] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10">
                    FOR CLIENTS
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-xs sm:text-[13px] leading-relaxed mb-3">
                  We build custom web apps, mobile apps, and AI automations for businesses. 18-day average delivery with 100% IP transfer.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                  <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                  <span>Fixed-price sprints & milestone delivery</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats Grid */}
        <ScrollReveal delay={0.35}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[var(--border-base)] font-mono">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col p-4 sm:p-5 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60 backdrop-blur-xs">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mb-1">
                  {stat.value}
                </span>
                <span className="text-xs tracking-wider text-[var(--accent-primary)] font-bold uppercase mb-1">
                  {stat.label}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-normal leading-snug">
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
