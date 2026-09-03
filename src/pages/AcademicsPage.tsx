import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, Calendar, Award, CheckCircle2, ChevronRight } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { SpotlightCard } from '../components/SpotlightCard'
import { Footer } from '../components/Footer'
import { sound } from '../utils/audioEngine'

const SYLLABUS = [
  {
    week: 'WEEKS 01–02',
    title: 'Foundations & Semantic Search',
    desc: 'Vector embeddings, high-dimensional indexing with Qdrant, hybrid sparse-dense retrieval, and semantic reranking architectures.',
    deliverable: 'Sub-50ms hybrid semantic search engine deployed to staging.',
  },
  {
    week: 'WEEKS 03–04',
    title: 'Autonomous Multi-Agent Orchestration',
    desc: 'Stateful workflow graphs with LangGraph, cyclic error correction, deterministic tool execution, and token cost optimization.',
    deliverable: 'Self-correcting research & synthesis agent with external sandbox execution.',
  },
  {
    week: 'WEEKS 05–06',
    title: 'Production Infrastructure & Scale',
    desc: 'Distributed queue worker topologies (BullMQ/Redis), streaming SSE latency budgets, authentication, and metered billing integration.',
    deliverable: 'Complete end-to-end AI SaaS deployed to production with custom domain & telemetry.',
  },
]

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] relative">
      <GrainOverlay />

      {/* Subpage Header Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-base)]">
        <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => sound.playClick(800)}
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO STUDIO</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]">
              03 / ACADEMICS
            </span>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-10 max-w-[1240px] mx-auto">
        {/* Hero Banner */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 font-mono text-xs text-[var(--accent-cyan)] mb-6">
            ENGINEERING FELLOWSHIP ACADEMY
          </div>
          <h1 className="text-section-h md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-6">
            Skip the tutorials. Ship the real thing.
          </h1>
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            An elite 6-week intensive engineering cohort for serious builders. Strictly 12 seats. Direct founder mentorship, real-time code reviews, and production software deployed by Week 6.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-base)] font-mono text-xs">
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
              <Users className="w-4 h-4 text-[var(--accent-cyan)] mb-2" />
              <div className="text-[var(--text-muted)] text-[10px] uppercase">COHORT SIZE</div>
              <div className="font-bold text-sm text-[var(--text-primary)]">Strictly 12 Seats</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
              <Calendar className="w-4 h-4 text-[var(--accent-cyan)] mb-2" />
              <div className="text-[var(--text-muted)] text-[10px] uppercase">DURATION</div>
              <div className="font-bold text-sm text-[var(--text-primary)]">6 Weeks (Live)</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
              <Award className="w-4 h-4 text-[var(--accent-cyan)] mb-2" />
              <div className="text-[var(--text-muted)] text-[10px] uppercase">OUTCOME</div>
              <div className="font-bold text-sm text-[var(--text-primary)]">Production AI SaaS</div>
            </div>
          </div>
        </div>

        {/* 6-Week Live Syllabus */}
        <section className="mb-20">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-[var(--border-base)]">
            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">6-Week Curriculum Roadmap</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Zero theoretical slides. Every module culminates in verified production code and stress-tested telemetry.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent-cyan)]">COHORT 03 ENROLLING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SYLLABUS.map((item, idx) => (
              <SpotlightCard
                key={idx}
                borderGlowColor="rgba(0, 210, 255, 0.35)"
                className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--accent-cyan)]">
                    {item.week}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-base)]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    VERIFIED DELIVERABLE
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                    <span>{item.deliverable}</span>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Admissions CTA */}
        <section className="p-8 sm:p-12 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)] relative overflow-hidden shadow-md">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4">
              Join the Next Cohort.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
              Admissions are competitive and evaluated on technical aptitude and engineering ambition. We review applications on a rolling basis until all 12 seats are allocated.
            </p>

            <a
              href="mailto:hello@nayaklabs.com?subject=Fellowship%20Cohort%20Application"
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-mono inline-flex items-center gap-2"
            >
              <span>SUBMIT APPLICATION FOR REVIEW</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer onScrollTo={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
