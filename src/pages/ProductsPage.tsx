import React, { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, GitBranch, Terminal, Activity, Sparkles, Globe } from 'lucide-react'
import { GrainOverlay } from '../components/GrainOverlay'
import { Footer } from '../components/Footer'
import { ScrollReveal } from '../components/ScrollReveal'
import { Navbar } from '../components/Navbar'

// Lazy load sandboxes
const DiNotesVisualizer = lazy(() =>
  import('../components/products/DiNotesVisualizer').then((m) => ({ default: m.DiNotesVisualizer }))
)
const EventMeshRadar = lazy(() =>
  import('../components/products/EventMeshRadar').then((m) => ({ default: m.EventMeshRadar }))
)

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] relative selection:bg-[var(--accent-primary)] selection:text-white transition-colors duration-300">
      <GrainOverlay />

      {/* Unified Gradient Glassmorphic Navbar */}
      <Navbar />

      {/* Ambient Chromatic Aurora Light Pool */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[350px] rounded-full opacity-35 dark:opacity-25 pointer-events-none -z-10" style={{ background: 'radial-gradient(circle at center, rgba(226, 0, 26, 0.35) 0%, rgba(139, 92, 246, 0.2) 45%, transparent 70%)', filter: 'blur(70px)' }} />

      {/* Hero Banner with Signature Products Clip-Wipe Reveal */}
      <main className="pt-24 sm:pt-28 pb-24 px-6 md:px-10 max-w-[1240px] mx-auto relative z-10">
        <ScrollReveal variant="clip-wipe">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill font-mono text-xs text-[var(--accent-primary)] mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP IN-HOUSE PLATFORMS & RUNTIMES</span>
            </div>
            <h1 className="text-section-h md:text-5xl font-display font-bold text-[var(--text-primary)] tracking-tight mb-6">
              What we build when no one’s watching.
            </h1>
            <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
              We don’t just write client code. We engineer autonomous runtime telemetry and visual developer tools used by thousands of builders worldwide. 100% free, production-tested, and open source.
            </p>
          </div>
        </ScrollReveal>

        {/* Product 1: EventMesh 3D Global Radar */}
        <section className="mb-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-4 border-b border-[var(--border-base)]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-[var(--accent-emerald)]" />
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  EventMesh 3D Global Radar
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-emerald)] font-bold">
                  3D TELEMETRY
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-body max-w-xl">
                Interactive rotatable 3D canvas globe tracking global developer summits, AI hackathons, and archive benchmarks across Bengaluru, SF, London, Tokyo, Berlin, and Singapore.
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
                <span>GITHUB SOURCE</span>
              </a>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="h-96 glass-panel rounded-2xl flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">
                Loading 3D Globe Telemetry Engine...
              </div>
            }
          >
            <EventMeshRadar />
          </Suspense>
        </section>

        {/* Product 2: DI Notes Visualizer */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-4 border-b border-[var(--border-base)]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-5 h-5 text-[var(--accent-primary)]" />
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  DI Notes Algorithm Visualizer
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-bold">
                  v2.5 STABLE
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-body max-w-xl">
                Interactive memory allocation, pointer swaps, recursion trees, and call stack visualizer. Step forward, inspect runtime variable state, and benchmark algorithm complexity.
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

          <Suspense
            fallback={
              <div className="h-96 glass-panel rounded-2xl flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">
                Loading Algorithm Engine...
              </div>
            }
          >
            <DiNotesVisualizer />
          </Suspense>
        </section>
      </main>

      <Footer onScrollTo={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  )
}
