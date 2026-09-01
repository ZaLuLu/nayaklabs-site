import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { MessageSquare, LayoutTemplate, Terminal, Rocket, CheckCircle, Shield, ArrowRight } from 'lucide-react'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'

const STEPS = [
  {
    step: '01',
    title: 'Plain-English Discovery',
    tagline: 'We listen to your vision — no tech jargon.',
    desc: 'You tell us what problem your business needs to solve. We draft a clear architecture plan, fixed quote, and weekly timeline in simple terms.',
    icon: MessageSquare,
    color: 'text-[var(--accent-primary)]',
    bg: 'bg-[var(--accent-glow)]',
    deliverable: 'Specification Document & Fixed-Price Scope',
  },
  {
    step: '02',
    title: 'Interactive Clickable Prototype',
    tagline: 'See and test your app in days before coding.',
    desc: 'We design high-fidelity interactive screens so you can click through the user experience, give feedback, and ensure the flow is flawless.',
    icon: LayoutTemplate,
    color: 'text-[var(--accent-cyan)]',
    bg: 'bg-cyan-500/10',
    deliverable: 'Figma UI/UX & Clickable Prototype',
  },
  {
    step: '03',
    title: 'Production Engineering & AI',
    tagline: 'Rapid build with weekly transparent updates.',
    desc: 'Our engineering team develops the full application using modern web frameworks and custom AI models. You get a private staging link to watch progress live.',
    icon: Terminal,
    color: 'text-[var(--accent-emerald)]',
    bg: 'bg-emerald-500/10',
    deliverable: 'Full-Stack Codebase & Weekly Demos',
  },
  {
    step: '04',
    title: 'Launch & 100% IP Transfer',
    tagline: 'Live on your domain. You own everything.',
    desc: 'We handle production deployment, domain setup, SSL, and security audits. We transfer 100% of the source code, credentials, and documentation to you.',
    icon: Rocket,
    color: 'text-[var(--accent-amber)]',
    bg: 'bg-amber-500/10',
    deliverable: 'Live Deployment & Complete IP Transfer',
  },
]

export function ProcessRoadmap({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const { setCursorLabel } = useTheme()

  return (
    <section
      id="process"
      className="py-20 md:py-28 relative border-t border-[var(--border-base)] bg-[var(--bg-base)] transition-colors duration-300"
      aria-labelledby="process-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="02" label="HOW WE WORK WITH YOU" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( 4-STEP CLIENT ROADMAP • 100% TRANSPARENCY )
            </p>
          </ScrollReveal>
        </div>

        {/* Section Header with Mixed Fonts */}
        <div className="max-w-3xl mb-12">
          <ScrollReveal delay={0.1}>
            <h2
              id="process-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight mb-4 leading-[1.14]"
            >
              How we turn your idea into a{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                live product
              </span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
              No guesswork, no endless meetings. We guide you step-by-step from raw concept to a secure, scalable software application that your customers will love.
            </p>
          </ScrollReveal>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <ScrollReveal key={idx} delay={0.1 + idx * 0.08}>
                <SpotlightCard
                  borderGlowColor="rgba(255, 255, 255, 0.18)"
                  className="p-5 sm:p-6 rounded-xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md flex flex-col justify-between h-full relative group hover:border-[var(--border-hover)] transition-all"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                        {step.step}
                      </span>
                      <div className={`p-2 rounded-lg ${step.bg} ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] mb-1">
                      {step.title}
                    </h3>
                    <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold mb-2.5">
                      {step.tagline}
                    </p>
                    <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed font-normal mb-5">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-[var(--border-base)] flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)]">
                    <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                    <span className="truncate">{step.deliverable}</span>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            )
          })}
        </div>

        {/* CTA Banner inside Process */}
        <ScrollReveal delay={0.4}>
          <div className="p-6 sm:p-7 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[var(--accent-glow)] text-[var(--accent-primary)] shrink-0 hidden sm:block">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] mb-1">
                  Have a specific project in mind?
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
                  Get a free architectural breakdown and fixed quote within 24 hours. No commitment required.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(900)
                onScrollTo('contact')
              }}
              onMouseEnter={() => setCursorLabel('INQUIRE')}
              onMouseLeave={() => setCursorLabel(null)}
              className="btn-primary whitespace-nowrap shrink-0"
            >
              <span>REQUEST FREE PROPOSAL</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 inline" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
