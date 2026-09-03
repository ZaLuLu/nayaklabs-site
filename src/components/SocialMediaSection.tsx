import React, { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { ChevronLeft, ChevronRight, Terminal, GitBranch, Sparkles, ExternalLink, ArrowRight } from 'lucide-react'

interface DispatchPost {
  id: string
  tag: string
  title: string
  date: string
  excerpt: string
  metric: string
  author: string
}

const DISPATCHES: DispatchPost[] = [
  {
    id: 'd1',
    tag: '#AgenticAI',
    title: 'Autonomous Multi-Agent State Routing: Resolving Cyclic Loops',
    date: '2 DAYS AGO',
    excerpt: 'Deep-dive into designing deterministic supervisor graphs with checkpoint recovery, fallback models, and human-in-the-loop review nodes.',
    metric: '99.4% Task Convergence',
    author: 'Nayak Labs Systems Pod',
  },
  {
    id: 'd2',
    tag: '#DistributedQueues',
    title: 'Benchmarking Redis Streams vs BullMQ: Sub-12ms p95 Under Load',
    date: '5 DAYS AGO',
    excerpt: 'Profiling memory allocation and event-loop microtasks when ingesting 5,000 concurrent streaming jobs across distributed worker pools.',
    metric: '11.8ms p95 Latency',
    author: 'Telemetry & Infra Pod',
  },
  {
    id: 'd3',
    tag: '#KineticUI',
    title: 'Liquid Glassmorphic Tokens: Dual-Mode Specular Depth in CSS',
    date: '1 WEEK AGO',
    excerpt: 'Architecting dynamic refraction borders, backdrop saturation, and zero-jank 60fps GSAP timelines across both light and dark operating modes.',
    metric: '60fps Hardware Accelerated',
    author: 'Kinetic Design Pod',
  },
  {
    id: 'd4',
    tag: '#EngineeringFellowship',
    title: 'Fellowship Cohort 04: 12 Builders Shipping Production AI',
    date: '2 WEEKS AGO',
    excerpt: 'Behind the scenes of our 6-week intensive engineering cohort. Live code reviews, weekly architectural defenses, and zero tutorial fluff.',
    metric: '12 / 12 Seats Assigned',
    author: 'Nayak Labs Academy',
  },
  {
    id: 'd5',
    tag: '#OpenSource',
    title: 'EventMesh 3D Radar v2.0: Real-Time Global Summit Tracking',
    date: '3 WEEKS AGO',
    excerpt: 'Open source 3D Canvas engine tracking developer summits, AI hackathons, and national tech hubs with zero external map library overhead.',
    metric: '100% Free & Open Source',
    author: 'Open Technical Research',
  },
]

export function SocialMediaSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? DISPATCHES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === DISPATCHES.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      id="social"
      className="py-24 md:py-32 border-t border-[var(--border-base)] relative scroll-mt-20 overflow-hidden"
      aria-labelledby="social-headline"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="05" label="COMMUNITY & DISPATCH // SOCIAL" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <span className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
              LIVE STUDIO DISPATCHES & ARCHITECTURE LOGS
            </span>
          </ScrollReveal>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <ScrollReveal delay={0.08}>
            <div className="max-w-2xl">
              <h2
                id="social-headline"
                className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4"
              >
                Public build logs & dispatches.
              </h2>
              <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
                Real-time engineering updates, architecture breakdowns, and telemetry snapshots directly from our lab.
              </p>
            </div>
          </ScrollReveal>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous dispatch"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 py-2 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] font-mono text-xs text-[var(--text-muted)]">
              <span className="text-[var(--text-primary)] font-bold">0{activeIndex + 1}</span> / 0{DISPATCHES.length}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Next dispatch"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Depth-Blur Carousel Stage */}
        <ScrollReveal delay={0.12} variant="depth-scale">
          <div className="relative min-h-[360px] sm:min-h-[380px] w-full flex items-center justify-center py-4 select-none perspective-1200">
            {DISPATCHES.map((item, idx) => {
              const diff = (idx - activeIndex + DISPATCHES.length) % DISPATCHES.length
              const isCenter = diff === 0
              const isNext = diff === 1 || diff === -(DISPATCHES.length - 1)
              const isPrev = diff === DISPATCHES.length - 1 || diff === -1

              // Position calculation
              let translateX = '0%'
              let scale = 1
              let opacity = 1
              let blur = '0px'
              let zIndex = 30
              let rotateY = 0

              if (isCenter) {
                translateX = '0%'
                scale = 1
                opacity = 1
                blur = '0px'
                zIndex = 30
                rotateY = 0
              } else if (isNext) {
                translateX = '65%'
                scale = 0.84
                opacity = 0.5
                blur = '4px'
                zIndex = 20
                rotateY = -12
              } else if (isPrev) {
                translateX = '-65%'
                scale = 0.84
                opacity = 0.5
                blur = '4px'
                zIndex = 20
                rotateY = 12
              } else {
                translateX = diff < DISPATCHES.length / 2 ? '120%' : '-120%'
                scale = 0.7
                opacity = 0
                blur = '10px'
                zIndex = 10
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute w-full max-w-xl transition-all duration-500 ease-out-expo cursor-pointer ${
                    isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-75'
                  }`}
                  style={{
                    transform: `translateX(${translateX}) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    filter: `blur(${blur})`,
                    zIndex,
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <div className="glass-panel specular-border p-7 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between h-[300px] border border-[var(--border-base)]">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-primary)] font-semibold">
                          {item.tag}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-3 leading-snug">
                        {item.title}
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs">
                      <span className="text-[var(--accent-emerald)] font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {item.metric}
                      </span>
                      <span className="text-[var(--text-muted)] text-[11px]">
                        {item.author}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {DISPATCHES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? 'w-8 bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]'
                    : 'w-2 bg-[var(--border-base)] hover:bg-[var(--border-hover)]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
