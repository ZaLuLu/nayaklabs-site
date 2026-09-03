import React from 'react'
import { Link } from 'react-router-dom'
import { ScrollReveal } from '../ScrollReveal'
import { SectionEyebrow } from '../SectionEyebrow'
import { sound } from '../../utils/audioEngine'
import {
  ArrowRight,
  Terminal,
  Activity,
  Cpu,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export function PillarStack() {
  return (
    <div className="w-full">
      {/* =========================================================================
          DIVISION 01: PRODUCTS (P)
          ========================================================================= */}
      <section
        id="products"
        className="py-24 md:py-32 border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow index="01" label="DIVISION 01 // PRODUCTS (P)" />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <span className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
                IN-HOUSE PLATFORMS & RUNTIMES
              </span>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-12">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4">
                What we build when no one’s watching.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                We engineer autonomous runtime telemetry, visual developer sandboxes, and indexing tools used by technical teams worldwide. 100% free, production-tested, and open source.
              </p>
            </div>
          </ScrollReveal>

          {/* Products Preview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {/* Product 1: DI Notes Visualizer */}
            <ScrollReveal delay={0.12}>
              <div className="p-7 sm:p-8 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        DI Notes Visualizer
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-primary)]">
                      v2.4 STABLE
                    </span>
                  </div>

                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Real-time memory allocation, pointer swaps, and recursion call-stack visualizer. Step forward frame by frame, inspect runtime variables, and duel algorithms in real time.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #AlgorithmTrace
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #MemoryState
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #InteractiveDuel
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">Interactive Workbench</span>
                  <Link
                    to="/products"
                    onClick={() => sound.playClick(850)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-primary)] hover:underline font-bold"
                  >
                    <span>LAUNCH SANDBOX</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Product 2: EventMesh Radar */}
            <ScrollReveal delay={0.16}>
              <div className="p-7 sm:p-8 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)]">
                        <Activity className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                        EventMesh Radar
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-emerald)]">
                      LIVE RADAR
                    </span>
                  </div>

                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Global hackathon and technical summit telemetry engine. Real-time verification, direct calendar ICS sync, and prize pool analytics.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 font-mono text-[11px]">
                    <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #LiveTelemetry
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #SummitTracker
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)]">
                      #CalendarSync
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)]">Live Telemetry Feed</span>
                  <Link
                    to="/products"
                    onClick={() => sound.playClick(850)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-emerald)] hover:underline font-bold"
                  >
                    <span>EXPLORE RADAR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Interactive Workbench Action Trigger */}
          <ScrollReveal delay={0.2}>
            <Link
              to="/products"
              onClick={() => sound.playClick(900)}
              className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[var(--accent-primary)] text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    Click to Open Full Interactive Products Suite
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Access real-time algorithm runs, radar sync, and inspect live production telemetry.
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-primary)] shrink-0">
                <span>OPEN INTERACTIVE WORKBENCH</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 02: SERVICES (S)
          ========================================================================= */}
      <section
        id="services"
        className="py-24 md:py-32 border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow index="02" label="DIVISION 02 // SERVICES (S)" />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <span className="font-mono text-xs text-[var(--accent-emerald)] font-bold tracking-wider uppercase">
                18-DAY SPRINT DELIVERY
              </span>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-12">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4">
                Your team, minus the overhead.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                We partner with venture-backed founders and engineering executives to architect, code, and deploy production AI pipelines and full-stack web applications in dedicated 18-day fixed sprint pods.
              </p>
            </div>
          </ScrollReveal>

          {/* Three Sprint Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <ScrollReveal delay={0.12}>
              <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col justify-between h-full shadow-sm">
                <Clock className="w-5 h-5 text-[var(--accent-emerald)] mb-4" />
                <div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    VELOCITY
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                    18-Day Delivery
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Fixed-timeline execution. Working software deployed to live staging environments by Day 07 and locked for launch on Day 18.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col justify-between h-full shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-emerald)] mb-4" />
                <div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    OWNERSHIP
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                    100% IP Transfer
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Zero lock-in or agency retainers. Full Git history, environment secrets, and cloud infrastructure belong completely to your company.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col justify-between h-full shadow-sm">
                <Cpu className="w-5 h-5 text-[var(--accent-emerald)] mb-4" />
                <div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    WARRANTY
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                    30-Day Launch Guarantee
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed">
                    Post-launch reliability. We own bug fixes, telemetry patches, and edge cases so your team can focus strictly on growth.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Interactive Estimator Link Trigger */}
          <ScrollReveal delay={0.22}>
            <Link
              to="/services"
              onClick={() => sound.playClick(900)}
              className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)] hover:border-[var(--accent-emerald)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[var(--accent-emerald)] text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-emerald)] transition-colors">
                    Click to Open Interactive Sprint Estimator & Architecture Pods
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Model your requirements, stack components, timeline budgets, and generate a customized sprint brief.
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-emerald)] shrink-0">
                <span>ESTIMATE SPRINT SCOPE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 03: ACADEMICS (A)
          ========================================================================= */}
      <section
        id="academics"
        className="py-24 md:py-32 border-t border-[var(--border-base)] relative scroll-mt-20"
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
            <ScrollReveal delay={0}>
              <SectionEyebrow index="03" label="DIVISION 03 // ACADEMICS (A)" />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold tracking-wider uppercase">
                6-WEEK ENGINEERING FELLOWSHIP
              </span>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.08}>
            <div className="max-w-3xl mb-12">
              <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4">
                Skip the tutorials. Ship the real thing.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                A rigorous, code-first engineering cohort for engineers building stateful multi-agent systems, semantic vector search, and high-throughput production infrastructure.
              </p>
            </div>
          </ScrollReveal>

          {/* 3 Curriculum Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <ScrollReveal delay={0.12}>
              <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col justify-between h-full shadow-sm">
                <div className="font-mono text-xs font-bold text-[var(--accent-cyan)] mb-2">
                  WEEKS 01–02
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                  Foundations & Vector Search
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  High-dimensional indexing with Qdrant, hybrid sparse-dense retrieval, and semantic reranking pipelines.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-primary)] pt-3 border-t border-[var(--border-base)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  <span>Sub-50ms hybrid search engine</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col justify-between h-full shadow-sm">
                <div className="font-mono text-xs font-bold text-[var(--accent-cyan)] mb-2">
                  WEEKS 03–04
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                  Autonomous Multi-Agent Systems
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Stateful workflow graphs, cyclic error correction, deterministic tool execution, and token budget optimization.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-primary)] pt-3 border-t border-[var(--border-base)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  <span>Self-correcting research agent</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col justify-between h-full shadow-sm">
                <div className="font-mono text-xs font-bold text-[var(--accent-cyan)] mb-2">
                  WEEKS 05–06
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">
                  Distributed Cloud & Scale
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Distributed queue topologies (BullMQ/Redis), streaming SSE latency budgets, authentication, and metered billing.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-primary)] pt-3 border-t border-[var(--border-base)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  <span>Live AI SaaS deployed to prod</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Syllabus Detail Trigger */}
          <ScrollReveal delay={0.22}>
            <Link
              to="/academics"
              onClick={() => sound.playClick(900)}
              className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60 hover:bg-[var(--bg-surface)] hover:border-[var(--accent-cyan)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[var(--accent-cyan)] text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                    Click to Inspect Full Fellowship Curriculum & Apply
                  </div>
                  <div className="font-body text-xs text-[var(--text-secondary)]">
                    Review weekly deliverables, prerequisites, admissions process, and cohort dates.
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--accent-cyan)] shrink-0">
                <span>VIEW FELLOWSHIP SYLLABUS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
