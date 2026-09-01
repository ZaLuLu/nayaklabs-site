import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { sound } from '../utils/audioEngine'
import { XCircle, CheckCircle2, Zap, AlertTriangle, ArrowRight } from 'lucide-react'

export function WorkflowSlider() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after')

  return (
    <section
      id="workflow-comparison"
      className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto border-t border-[var(--border-base)] transition-colors duration-300 relative"
      aria-labelledby="workflow-headline"
    >
      {/* Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
        <ScrollReveal delay={0}>
          <SectionEyebrow index="05" label="BUSINESS TRANSFORMATION // THE IMPACT" />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            ( MEASURABLE OUTCOMES • REAL-WORLD RESULTS )
          </p>
        </ScrollReveal>
      </div>

      {/* Headline */}
      <ScrollReveal delay={0.1}>
        <div className="max-w-3xl mb-12">
          <h2
            id="workflow-headline"
            className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14] mb-3"
          >
            The difference between{' '}
            <span className="font-serif italic font-normal text-[var(--accent-primary)]">
              stuck and scaling
            </span>.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
            See how partnering with Nayak Labs replaces slow manual bottlenecks with high-velocity, automated software.
          </p>
        </div>
      </ScrollReveal>

      {/* Interactive Transformation Card */}
      <ScrollReveal delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left: The Bottleneck (Before) */}
          <div className="p-7 sm:p-8 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-red-400 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  BEFORE NAYAK LABS
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">THE BOTTLENECK</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-4">
                Slow, Manual & Overwhelmed
              </h3>

              <ul className="space-y-3 font-mono text-xs text-[var(--text-secondary)]">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>3–4 hours/day wasted on manual data entry, customer tickets, and invoice sorting.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>3 months wasted searching, interviewing, and negotiating junior dev salaries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>Clunky monolithic app crashes during peak traffic with high cloud bills.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 font-mono text-xs text-red-300">
              Outcome: Stalled growth, high founder burnout & slow time-to-market.
            </div>
          </div>

          {/* Right: The Transformation (After) */}
          <div className="p-7 sm:p-8 rounded-3xl border border-[var(--accent-emerald)]/30 bg-emerald-500/5 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[var(--accent-emerald)] px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  AFTER NAYAK LABS
                </span>
                <span className="font-mono text-xs text-[var(--accent-emerald)] font-bold">18-DAY SPRINT</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-4">
                Autonomous, Fast & Production-Ready
              </h3>

              <ul className="space-y-3 font-mono text-xs text-[var(--text-primary)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                  <span>Autonomous AI Agent resolves 80% of support & document search in under 2 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                  <span>Founder-led senior engineering pod kicks off in 48 hours with weekly staging demos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                  <span>Modern Next.js 15 + FastAPI architecture with 100% full Git & IP transfer.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 font-mono text-xs text-[var(--accent-emerald)] font-bold">
              Outcome: Live in 18 days, zero technical debt & scalable revenue growth.
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
