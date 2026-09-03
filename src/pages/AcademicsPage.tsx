import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Users,
  Calendar,
  Award,
  CheckCircle2,
  ChevronRight,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  BookOpen,
  X,
  Mail,
} from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { Footer } from '../components/Footer'
import { ScrollReveal } from '../components/ScrollReveal'
import { Navbar } from '../components/Navbar'

interface ModuleItem {
  number: string
  title: string
  duration: string
  coreTopics: string[]
  codeLab: string
  capstoneOutcome: string
}

const MODULES: ModuleItem[] = [
  {
    number: '01',
    title: 'Modern Systems Foundations & TypeScript Architecture',
    duration: 'WEEK 01',
    coreTopics: [
      'Advanced TypeScript generic constraints, template literal types & discriminated unions.',
      'Asynchronous event loop mechanics, microtask scheduling & memory profiling.',
      'Deterministic functional state pipelines and error boundary design patterns.',
    ],
    codeLab: 'Build a strict type-safe RPC client with compile-time schema inference and automated retry buffers.',
    capstoneOutcome: 'Zero `any` type safety with 100% strict compiler compliance.',
  },
  {
    number: '02',
    title: 'High-Throughput Backends & Distributed Task Engines',
    duration: 'WEEK 02',
    coreTopics: [
      'FastAPI & Node.js asynchronous runtime optimization.',
      'Distributed task queues with Redis Streams, BullMQ, and dead-letter handling.',
      'PostgreSQL query indexing (B-Tree, GIN, GiST), connection pooling (PgBouncer), and transaction isolation.',
    ],
    codeLab: 'Design a resilient distributed job worker processing 5,000 concurrent events/sec with rate limiters.',
    capstoneOutcome: 'Sub-15ms p95 API response times under simulated load testing.',
  },
  {
    number: '03',
    title: 'Agentic AI Architecture & Production Vector Retrieval',
    duration: 'WEEK 03',
    coreTopics: [
      'Multi-agent state graph topologies using LangGraph with cyclic error resolution.',
      'High-dimensional vector indexing, HNSW algorithms, and hybrid sparse-dense search (Qdrant).',
      'Deterministic function-calling schemas, streaming inference, and guardrails against prompt injection.',
    ],
    codeLab: 'Build an autonomous multi-step research agent that executes sandbox Python code and compiles verified reports.',
    capstoneOutcome: 'Autonomous multi-tool agent with verifiable reasoning traces and checkpoint recovery.',
  },
  {
    number: '04',
    title: 'Advanced Kinetic Frontend & Design Systems',
    duration: 'WEEK 04',
    coreTopics: [
      'Next.js 15 Server Components, streaming SSR, and edge route handlers.',
      'Hardware-accelerated 60fps GSAP ScrollTrigger timelines and inertia scroll integration.',
      'Custom liquid glassmorphic design token architecture and accessible WCAG AA standards.',
    ],
    codeLab: 'Construct an interactive 3D WebGL / Canvas visualizer integrated into a production design system.',
    capstoneOutcome: 'Lighthouse 98+ performance score with 60fps fluid frame rendering.',
  },
  {
    number: '05',
    title: 'Production Infrastructure, Security & Observability',
    duration: 'WEEK 05',
    coreTopics: [
      'Docker container multi-stage builds and automated CI/CD pipelines (GitHub Actions).',
      'OpenTelemetry distributed tracing, Prometheus metrics, and structured JSON telemetry.',
      'Zero-trust authentication, JWT rotation, CORS policies, and rate-limiting middleware.',
    ],
    codeLab: 'Configure automated blue-green cloud deployments with zero-downtime database migrations.',
    capstoneOutcome: 'Fully automated production deployment pipeline with telemetry dashboards.',
  },
  {
    number: '06',
    title: 'Full-Scale Capstone Build & Engineering Defense',
    duration: 'WEEK 06',
    coreTopics: [
      'End-to-end architecture sprint from product specification to live staging deployment.',
      'Live code reviews with senior engineering mentors and architecture defense.',
      'Production hardening, stress benchmarking, and final launch preparation.',
    ],
    codeLab: 'Deploy a full-stack, production-grade AI platform with live users, real-time analytics, and billing.',
    capstoneOutcome: 'Live shipped production application ready for portfolio and commercial usage.',
  },
]

export default function AcademicsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (waitlistEmail) {
      setWaitlistSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <GrainOverlay />

      {/* Unified Gradient Glassmorphic Navbar */}
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-24 px-6 md:px-10 max-w-[1240px] mx-auto">
        {/* Hero Banner with Kinetic Reveal */}
        <ScrollReveal variant="line-stagger">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill font-mono text-xs text-[var(--accent-cyan)] mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ENGINEERING FELLOWSHIP ACADEMY</span>
            </div>
            <h1 className="text-section-h md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-6">
              Skip the tutorials. Master production engineering.
            </h1>
            <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              An elite 6-week intensive engineering fellowship for serious developers. Strictly 12 seats. Direct architectural mentorship, weekly production code reviews, and live software deployed by Week 6.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-base)] font-mono text-xs">
              <div className="p-4 rounded-xl glass-panel specular-border">
                <Users className="w-4 h-4 text-[var(--accent-cyan)] mb-2" />
                <div className="text-[var(--text-muted)] text-[10px] uppercase">COHORT SIZE</div>
                <div className="font-bold text-sm text-[var(--text-primary)]">Strictly 12 Seats</div>
              </div>
              <div className="p-4 rounded-xl glass-panel specular-border">
                <Calendar className="w-4 h-4 text-[var(--accent-cyan)] mb-2" />
                <div className="text-[var(--text-muted)] text-[10px] uppercase">DURATION</div>
                <div className="font-bold text-sm text-[var(--text-primary)]">6 Weeks (Live)</div>
              </div>
              <div className="p-4 rounded-xl glass-panel specular-border">
                <Award className="w-4 h-4 text-[var(--accent-cyan)] mb-2" />
                <div className="text-[var(--text-muted)] text-[10px] uppercase">OUTCOME</div>
                <div className="font-bold text-sm text-[var(--text-primary)]">Production AI Software</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 6-Week Detailed Curriculum */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 pb-4 border-b border-[var(--border-base)]">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                6-Week Curriculum Blueprint
              </h2>
              <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Every single module is rooted in production repositories and real-world latency budgets.
              </p>
            </div>
            <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold">
              COHORT 03 ENROLLING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod, mIdx) => (
              <ScrollReveal key={mod.number} delay={mIdx * 0.05} variant="depth-scale">
                <div className="glass-panel specular-border p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-cyan)] font-bold">
                        MODULE {mod.number}
                      </span>
                      <span className="text-[var(--text-muted)]">{mod.duration}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3 leading-snug">
                      {mod.title}
                    </h3>

                    <ul className="space-y-2 mb-6 font-body text-xs text-[var(--text-secondary)]">
                      {mod.coreTopics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[var(--accent-cyan)] mt-0.5">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-base)] space-y-3 font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Code2 className="w-3 h-3 text-[var(--accent-cyan)]" />
                        <span>CODE LAB</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-primary)] leading-relaxed">
                        {mod.codeLab}
                      </p>
                    </div>

                    <div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[var(--accent-emerald)]" />
                        <span>BENCHMARK OUTCOME</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {mod.capstoneOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Admissions Action Banner */}
        <section className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden text-left">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider">
              FELLOWSHIP ADMISSIONS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2 mb-4">
              Ready to build at the highest level?
            </h2>
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
              Admissions are evaluated on engineering ambition and technical foundation. We review submissions on a rolling basis until the 12 seats are allocated.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary py-3 px-6 text-xs sm:text-sm font-mono inline-flex items-center gap-2 cursor-pointer"
            >
              <span>APPLY FOR NEXT COHORT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Under Construction / Applications Waitlist Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
          <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-2xl relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setModalOpen(false)
                setWaitlistSubmitted(false)
              }}
              className="absolute top-5 right-5 p-1.5 rounded-lg border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-amber)] animate-ping" />
              <span className="font-mono text-xs font-bold text-[var(--accent-amber)] uppercase tracking-wider">
                UNDER CONSTRUCTION // ENROLLMENT
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
              Cohort 03 Applications Opening Soon
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              The application portal is currently being configured for the upcoming cohort. Enter your email below to be notified first when seats unlock.
            </p>

            {waitlistSubmitted ? (
              <div className="p-4 rounded-xl bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)] text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are on the priority waitlist! We will notify you once admissions go live.</span>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="founder@company.com"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-base)] rounded-xl text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary justify-center py-2.5 text-xs font-mono font-bold"
                >
                  NOTIFY ME WHEN SEATS OPEN →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer onScrollTo={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
