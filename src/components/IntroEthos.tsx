import React from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { sound } from '../utils/audioEngine'
import { ArrowRight, Quote, Clock, ShieldCheck, Zap, Sparkles } from 'lucide-react'

interface IntroEthosProps {
  onScrollTo: (id: string) => void
}

export function IntroEthos({ onScrollTo }: IntroEthosProps) {
  return (
    <section
      id="intro"
      className="relative z-10 py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto border-b border-[var(--border-base)] transition-colors duration-300"
      aria-label="Studio Ethos and Overview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Authoritative, Punchy Studio Value Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-secondary)] font-mono text-xs mb-6 w-fit shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>AI PRODUCT STUDIO & ENGINEERING FELLOWSHIP</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2
              className="text-hero font-display font-extrabold text-[var(--text-primary)] tracking-tight mb-6 leading-[1.08]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Most agencies sell slide decks. <br />
              We engineer{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)] tracking-normal">
                software that ships
              </span>.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p
              className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-[50ch] mb-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              We build custom AI agent architectures, launch full-stack SaaS apps in weeks, and mentor serious engineers through production builds. Zero fluff, 100% code ownership.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={() => {
                  sound.playClick(950)
                  onScrollTo('estimator')
                }}
                className="btn-primary group"
              >
                <span>SCOPE A SPRINT (60 SECONDS)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  sound.playClick(750)
                  onScrollTo('products')
                }}
                className="btn-ghost"
              >
                <span>EXPLORE PRODUCTS</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Trust Guarantees Bar */}
          <ScrollReveal delay={0.28}>
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[var(--border-base)] font-mono text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                <span>Avg. MVP delivery: 18 days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                <span>100% Source Code & IP Transfer</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: Squishy Hover-Morphing Founding Ethos Card with 3D Depth */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <ScrollReveal delay={0.18}>
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden group transition-colors hover:border-[var(--border-hover)]"
            >
              {/* Background gradient sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-base)] font-mono text-xs text-[var(--text-muted)] relative z-10">
                <span className="flex items-center gap-2 font-bold tracking-widest text-[var(--text-primary)] uppercase">
                  <Quote className="w-4 h-4 text-[var(--accent-primary)]" />
                  FOUNDING ETHOS
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-base)]">
                  STANDARD
                </span>
              </div>

              {/* The Conviction Quote */}
              <blockquote className="space-y-6 relative z-10">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                  "Do not prove them wrong,{' '}
                  <span className="text-[var(--accent-primary)] underline decoration-[var(--accent-glow)] underline-offset-8">
                    Demolish them.
                  </span>"
                </p>
                <footer className="flex items-center justify-between pt-4 border-t border-[var(--border-base)] font-mono text-xs text-[var(--text-secondary)]">
                  <span className="font-bold tracking-wider text-[var(--text-primary)] text-sm">— Suraj Nayak</span>
                  <span className="text-[var(--text-muted)]">Founder & Principal Engineer</span>
                </footer>
              </blockquote>

              {/* Interactive Core Pillar Highlights */}
              <div className="mt-8 pt-5 border-t border-[var(--border-base)] flex flex-wrap gap-2 font-mono text-[11px] text-[var(--text-muted)] relative z-10">
                <span className="px-3 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)]">
                  ⚡ Agentic AI
                </span>
                <span className="px-3 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)]">
                  🚀 High-Velocity SaaS
                </span>
                <span className="px-3 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-primary)]">
                  🛡️ 100% IP Transfer
                </span>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
