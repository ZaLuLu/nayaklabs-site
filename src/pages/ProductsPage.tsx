import React, { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, GitBranch, Terminal, Activity, Layers } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { SpotlightCard } from '../components/SpotlightCard'
import { Footer } from '../components/Footer'
import { sound } from '../utils/audioEngine'

// Lazy load sandboxes
const DiNotesVisualizer = lazy(() =>
  import('../components/products/DiNotesVisualizer').then((m) => ({ default: m.DiNotesVisualizer }))
)
const EventMeshRadar = lazy(() =>
  import('../components/products/EventMeshRadar').then((m) => ({ default: m.EventMeshRadar }))
)

export default function ProductsPage() {
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
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-primary)]">
              01 / PRODUCTS
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <main className="pt-32 pb-24 px-6 md:px-10 max-w-[1240px] mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10 font-mono text-xs text-[var(--accent-primary)] mb-6">
            FLAGSHIP IN-HOUSE PLATFORMS
          </div>
          <h1 className="text-section-h md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-6">
            What we build when no one’s watching.
          </h1>
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
            We don’t just write client code. We engineer autonomous runtime telemetry and visual developer tools used by thousands of builders worldwide. 100% free, production-tested, and open source.
          </p>
        </div>

        {/* Product 1: DI Notes Visualizer */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-4 border-b border-[var(--border-base)]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-5 h-5 text-[var(--accent-primary)]" />
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">DI Notes Visualizer</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)]">
                  v2.4 STABLE
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-body max-w-xl">
                Interactive memory allocation, pointer swaps, and recursion call-stack visualizer. Step forward, inspect runtime variable state, and debug algorithms frame by frame.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ZaLuLu/nayaklabs-site"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost py-2.5 px-4 text-xs font-mono inline-flex items-center gap-2"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>SOURCE REPO</span>
              </a>
            </div>
          </div>

          <SpotlightCard
            borderGlowColor="rgba(226, 0, 26, 0.25)"
            className="p-4 sm:p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] backdrop-blur-md"
          >
            <Suspense fallback={<div className="h-64 flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">Loading Visualizer...</div>}>
              <DiNotesVisualizer />
            </Suspense>
          </SpotlightCard>
        </section>

        {/* Product 2: EventMesh Radar */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-4 border-b border-[var(--border-base)]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-[var(--accent-emerald)]" />
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">EventMesh Radar</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-emerald)]">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-body max-w-xl">
                Global hackathon and technical summit aggregation telemetry engine. Real-time verification, calendar ICS sync, and prize pool analytics.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ZaLuLu/nayaklabs-site"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost py-2.5 px-4 text-xs font-mono inline-flex items-center gap-2"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>TELEMETRY FEED</span>
              </a>
            </div>
          </div>

          <SpotlightCard
            borderGlowColor="rgba(0, 245, 160, 0.25)"
            className="p-4 sm:p-6 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] backdrop-blur-md"
          >
            <Suspense fallback={<div className="h-64 flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">Loading Radar...</div>}>
              <EventMeshRadar />
            </Suspense>
          </SpotlightCard>
        </section>
      </main>

      <Footer onScrollTo={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
