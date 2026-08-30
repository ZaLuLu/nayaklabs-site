import { useState, useMemo } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Cpu, Globe, Workflow, Check, ArrowRight, Sliders, Shield } from 'lucide-react'

interface ServiceCapability {
  id: string
  title: string
  desc: string
  tags: string[]
  icon: typeof Cpu
}

const CAPABILITIES: ServiceCapability[] = [
  {
    id: 'ai',
    title: 'AI Solutions & Models',
    desc: 'Custom model fine-tuning, RAG pipelines, autonomous multi-agent swarms, and rigorous evals tailored to your proprietary data.',
    tags: ['Fine-Tuning', 'pgvector & Embeddings', 'Agentic Workflows', 'Model Guardrails'],
    icon: Cpu,
  },
  {
    id: 'web',
    title: 'High-Velocity Web Platforms',
    desc: 'Bespoke web applications, interactive portals, and enterprise dashboards built with Next.js, React, and motion systems.',
    tags: ['Next.js 15', 'Design Systems', 'Sub-second Latency', 'SEO & Analytics'],
    icon: Globe,
  },
  {
    id: 'auto',
    title: 'Automation & Internal Tools',
    desc: 'Operational engines, ETL pipelines, and custom administrative tools that eliminate manual spreadsheets and SaaS sprawl.',
    tags: ['Workflow Engines', 'Data Orchestration', 'Custom Integrations', 'Legacy Migration'],
    icon: Workflow,
  },
]

export function ServicesConfigurator() {
  const { setCursorLabel, setActiveBrief } = useTheme()
  const [selectedServices, setSelectedServices] = useState<string[]>(['ai', 'web'])
  const [podSize, setPodSize] = useState<'sprint' | 'pod' | 'squad'>('pod')
  const [timelineWeeks, setTimelineWeeks] = useState<number>(6)

  const toggleService = (id: string) => {
    sound.playClick(900)
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id))
      }
    } else {
      setSelectedServices([...selectedServices, id])
    }
  }

  const generatedBrief = useMemo(() => {
    const names = selectedServices.map((id) => CAPABILITIES.find((c) => c.id === id)?.title).join(' + ')
    const podNames = {
      sprint: '2-Engineer Fast Sprint (2-4 Weeks)',
      pod: 'Dedicated 4-Engineer Senior Pod (4-8 Weeks)',
      squad: 'Full AI & Web Ecosystem Squad (8+ Weeks)',
    }
    return `Inquiry Scope: ${names} | Pod Configuration: ${podNames[podSize]} | Estimated Timeline: ~${timelineWeeks} weeks.`
  }, [selectedServices, podSize, timelineWeeks])

  const handleApplyBrief = () => {
    sound.playSuccess(0.08)
    setActiveBrief(generatedBrief)
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="services"
      className="min-h-screen py-28 md:py-36 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="services-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-12 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="04" label="SOFTWARE SERVICES" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( SENIOR-ONLY ENGINEERING PODS )
            </p>
          </ScrollReveal>
        </div>

        {/* Section Headline */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2
              id="services-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Engineering teams,<br />on call.
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[42ch] leading-relaxed">
              For ambitious startups and scale-ups that need to ship production software without hiring months of headcount. Clean execution, zero bloat.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Core Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon
            return (
              <ScrollReveal key={cap.id} delay={0.15 + idx * 0.08}>
                <SpotlightCard
                  borderGlowColor="rgba(255, 255, 255, 0.3)"
                  className="p-6 md:p-8 h-full flex flex-col justify-between rounded-sm border-[var(--border-base)]"
                >
                  <div>
                    <div className="w-10 h-10 rounded-sm bg-[var(--bg-surface)] border border-[var(--border-base)] flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-[var(--text-primary)]" />
                    </div>

                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-3">
                      {cap.title}
                    </h3>

                    <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-6 font-light">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-base)]">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[var(--bg-surface)] border border-[var(--border-base)] font-mono text-[0.62rem] text-[var(--text-muted)] rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Interactive Scope & Architecture Configurator */}
        <ScrollReveal delay={0.3}>
          <div className="border border-[var(--border-base)] bg-[var(--bg-card)] p-6 md:p-10 rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4 text-[var(--accent-primary,#E2001A)]" />
              <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider uppercase">
                INTERACTIVE SCOPE CONFIGURATOR
              </span>
            </div>
            <p className="font-mono text-xs text-[var(--text-muted)] mb-8">
              Configure your project stack and engineering pod to calculate scope and auto-generate an RFP brief.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* 1. Services to include */}
                <div>
                  <label className="font-mono text-xs text-[var(--text-secondary)] block mb-2.5 uppercase tracking-wider">
                    1. Select Capabilities Required:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CAPABILITIES.map((c) => {
                      const active = selectedServices.includes(c.id)
                      return (
                        <button
                          key={c.id}
                          onClick={() => toggleService(c.id)}
                          className={`px-3.5 py-2 font-mono text-xs border transition-all cursor-pointer flex items-center gap-2 rounded-xs ${
                            active
                              ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                              : 'border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5" />}
                          <span>{c.title.split('&')[0]}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 2. Pod Scale */}
                <div>
                  <label className="font-mono text-xs text-[var(--text-secondary)] block mb-2.5 uppercase tracking-wider">
                    2. Engineering Pod Velocity:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'sprint', label: '2 Engineers', desc: 'Fast MVP / Spike' },
                        { id: 'pod', label: '4 Senior Pod', desc: 'Core Production' },
                        { id: 'squad', label: 'Full Squad', desc: 'Enterprise Scale' },
                      ] as const
                    ).map((pod) => (
                      <button
                        key={pod.id}
                        onClick={() => {
                          sound.playClick(900)
                          setPodSize(pod.id)
                        }}
                        className={`p-3 border text-left font-mono transition-all cursor-pointer rounded-xs ${
                          podSize === pod.id
                            ? 'border-[var(--btn-primary-bg)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold'
                            : 'border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="font-bold text-xs text-[var(--text-primary)] mb-0.5">{pod.label}</div>
                        <div className="text-[0.62rem] text-[var(--text-muted)]">{pod.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Estimated Timeline */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[var(--text-secondary)] mb-2">
                    <span>3. Target Velocity:</span>
                    <span className="text-[var(--text-primary)] font-bold">{timelineWeeks} Weeks</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    step="1"
                    value={timelineWeeks}
                    onChange={(e) => {
                      setTimelineWeeks(parseInt(e.target.value))
                      sound.playTone(350 + parseInt(e.target.value) * 20, 0.03)
                    }}
                    className="w-full accent-[var(--accent-primary)] cursor-pointer"
                  />
                </div>
              </div>

              {/* Generated Brief Card */}
              <div className="lg:col-span-5 bg-[var(--bg-surface)] border border-[var(--border-base)] p-6 rounded-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--border-base)]">
                    <Shield className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase">
                      GENERATED RFP BRIEF
                    </span>
                  </div>

                  <p className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-card)] border border-[var(--border-base)] p-4 rounded-xs mb-4">
                    {generatedBrief}
                  </p>

                  <div className="flex flex-col gap-1.5 font-mono text-[0.65rem] text-[var(--text-muted)] mb-6">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                      <span>Direct Slack channel with senior engineering leads</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                      <span>Weekly sprint demos & public preview branches</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleApplyBrief}
                  onMouseEnter={() => setCursorLabel('START')}
                  onMouseLeave={() => setCursorLabel(null)}
                  className="w-full py-3 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-mono text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer rounded-xs"
                >
                  <span>TRANSFER BRIEF TO CONTACT FORM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
