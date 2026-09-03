import React from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-36 px-6 md:px-10 max-w-[1240px] mx-auto border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="about-headline"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
        <ScrollReveal delay={0}>
          <SectionEyebrow index="02" label="STUDIO MANIFESTO" />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            ( ENGINEERING ETHOS )
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <div className="max-w-4xl mb-16">
          <h2
            id="about-headline"
            className="text-section-h md:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.15] mb-8"
          >
            We believe modern software engineering is held back by bloated agency retainers, fragmented contractors, and endless slide decks.
          </h2>
          <p className="font-body text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-6 font-normal">
            Nayak Labs exists to counter this reality. We operate as a high-density product studio that prioritizes working software over pitch decks, production code over theoretical roadmaps, and verifiable outcomes over vague promises.
          </p>
          <p className="font-body text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Whether engineering autonomous multi-agent pipelines, shipping custom web platforms, or mentoring builders in our fellowship, we deliver 100% intellectual property ownership and zero compromises.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div
          className="glass-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-colors duration-300"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] mb-3 uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FOUNDER'S CONVICTION</span>
            </div>
            <blockquote className="font-display font-medium text-xl sm:text-2xl text-[var(--text-primary)] leading-snug">
              "Great engineering does not need to justify itself with hype. It proves itself the moment you test the software."
            </blockquote>
          </div>

          <Link
            to="/services"
            className="btn-primary py-3 px-5 text-xs font-body font-semibold inline-flex items-center gap-2 shrink-0"
          >
            <span>EXPLORE SERVICES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
