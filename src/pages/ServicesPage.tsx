import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, ShieldCheck, Cpu, CheckCircle2, Zap } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { ProjectEstimator } from '../components/ProjectEstimator'
import { Footer } from '../components/Footer'
import { sound } from '../utils/audioEngine'

export default function ServicesPage() {
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
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]">
              02 / SERVICES
            </span>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-10 max-w-[1240px] mx-auto">
        {/* Hero Banner */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-emerald)]/30 bg-[var(--accent-emerald)]/10 font-mono text-xs text-[var(--accent-emerald)] mb-6">
            CLIENT SPRINT PODS
          </div>
          <h1 className="text-section-h md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-6">
            Your team, minus the overhead.
          </h1>
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            We partner with ambitious founders and engineering leaders to design, build, and deploy production AI pipelines and full-stack web applications in dedicated 18-day sprint cycles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-base)] font-mono text-xs">
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
              <Clock className="w-4 h-4 text-[var(--accent-emerald)] mb-2" />
              <div className="text-[var(--text-muted)] text-[10px] uppercase">VELOCITY</div>
              <div className="font-bold text-sm text-[var(--text-primary)]">18-Day Delivery</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-emerald)] mb-2" />
              <div className="text-[var(--text-muted)] text-[10px] uppercase">OWNERSHIP</div>
              <div className="font-bold text-sm text-[var(--text-primary)]">100% IP & Code Transfer</div>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
              <Cpu className="w-4 h-4 text-[var(--accent-emerald)] mb-2" />
              <div className="text-[var(--text-muted)] text-[10px] uppercase">GUARANTEE</div>
              <div className="font-bold text-sm text-[var(--text-primary)]">30-Day Launch Warranty</div>
            </div>
          </div>
        </div>

        {/* Sprint Timeline Overview */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">The 18-Day Sprint Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)]">
              <span className="font-mono text-xs text-[var(--accent-emerald)] font-bold">DAYS 01–03</span>
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mt-2 mb-1">Discovery & Contracts</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Topology design, API contracts, schema validation, and bilateral NDA sign-off.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)]">
              <span className="font-mono text-xs text-[var(--accent-emerald)] font-bold">DAYS 04–07</span>
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mt-2 mb-1">Live Prototype</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Staging environment deployment. You interact with the real clickable application before production code is locked.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)]">
              <span className="font-mono text-xs text-[var(--accent-emerald)] font-bold">DAYS 08–16</span>
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mt-2 mb-1">Production Build</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Distributed backends, high-throughput agents, auth, billing, and database indexing.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)]">
              <span className="font-mono text-xs text-[var(--accent-emerald)] font-bold">DAYS 17–18</span>
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)] mt-2 mb-1">Handoff & Transfer</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Full Git commit history, secrets, cloud infrastructure, and documentation transfer.
              </p>
            </div>
          </div>
        </section>

        {/* Relocated Purposeful Estimator */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">Scope & Budget Estimator</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Configure your requirements below to instantly model sprint timelines, pod sizing, and deliverables.
            </p>
          </div>
          <ProjectEstimator />
        </section>
      </main>

      <Footer onScrollTo={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
