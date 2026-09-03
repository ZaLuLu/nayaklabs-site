import React from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { Sparkles, Layers } from 'lucide-react'

/**
 * SocialMediaSection
 * Blank, styled canvas ready for the upcoming social media / community carousel.
 */
export function SocialMediaSection() {
  return (
    <section
      id="social"
      className="py-24 md:py-32 border-t border-[var(--border-base)] relative scroll-mt-20"
      aria-labelledby="social-headline"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="05" label="COMMUNITY & DISPATCH // SOCIAL" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
              ( FEED & CAROUSEL READY )
            </span>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.08}>
          <div className="max-w-2xl mb-12">
            <h2
              id="social-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4"
            >
              Public build logs & dispatches.
            </h2>
            <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
              Real-time engineering updates, architecture breakdowns, and telemetry snapshots from our development lab.
            </p>
          </div>
        </ScrollReveal>

        {/* Blank, styled container reserved for upcoming carousel */}
        <ScrollReveal delay={0.12}>
          <div className="min-h-[260px] sm:min-h-[320px] rounded-3xl border border-dashed border-[var(--border-hover)] bg-[var(--bg-card)]/40 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:scale-105 transition-all duration-300 mb-4 shadow-sm">
              <Layers className="w-8 h-8" />
            </div>
            <div className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
              Social Media Carousel Canvas
            </div>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-md">
              ( Section reserved for interactive post slider / community feed )
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
