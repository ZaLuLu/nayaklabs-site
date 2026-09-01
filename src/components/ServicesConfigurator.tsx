import { useState, useMemo } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Cpu, Globe, Workflow, Check, ArrowRight, Copy, CheckCheck, Sliders, Shield, Zap } from 'lucide-react'

interface ServiceCapability {
  id: string
  title: string
  plainEnglishBenefit: string
  desc: string
  tags: string[]
  icon: typeof Cpu
}

const CAPABILITIES: ServiceCapability[] = [
  {
    id: 'ai',
    title: 'Custom AI & Smart Automation',
    plainEnglishBenefit: 'Cut 20+ hours of manual data processing and customer support every week.',
    desc: 'Custom LLM agents, intelligent document search, voice/chat bots, and automated task workflows tailored to your proprietary data.',
    tags: ['Custom AI Agents', 'Document Intelligence', 'Smart Search', 'API Integrations'],
    icon: Cpu,
  },
  {
    id: 'web',
    title: 'Modern Web & Mobile Apps',
    plainEnglishBenefit: 'Turn your idea into a fast, beautiful, and secure app that converts customers.',
    desc: 'Bespoke web applications, SaaS dashboards, customer portals, and mobile-responsive platforms built with Next.js, React, and cloud hosting.',
    tags: ['Next.js App', 'SaaS Dashboards', 'Stripe Billing', 'Mobile Responsive'],
    icon: Globe,
  },
  {
    id: 'auto',
    title: 'Workflow & Internal Tools',
    plainEnglishBenefit: 'Eliminate chaotic spreadsheets and automate messy back-office operations.',
    desc: 'Custom administrative dashboards, database synchronizers, and automated webhook pipelines connecting your CRM, payment processors, and tools.',
    tags: ['Custom CRM Dashboards', 'Webhook Automations', 'Database Sync', 'Zero Manual Entry'],
    icon: Workflow,
  },
]

export function ServicesConfigurator() {
  const { setCursorLabel, setActiveBrief } = useTheme()
  const [selectedServices, setSelectedServices] = useState<string[]>(['ai', 'web'])
  const [podSize, setPodSize] = useState<'sprint' | 'pod' | 'squad'>('pod')
  const [timelineWeeks, setTimelineWeeks] = useState<number>(4)
  const [copied, setCopied] = useState<boolean>(false)

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
      sprint: '2-Engineer Fast Sprint (MVP Prototype)',
      pod: 'Dedicated 4-Engineer Senior Pod (Full Production App)',
      squad: 'Full AI & Web Ecosystem Squad (Enterprise Scale)',
    }
    return `PROJECT SCOPE: ${names}\nDELIVERY POD: ${podNames[podSize]}\nTIMELINE: ~${timelineWeeks} Weeks\nINCLUDED: 100% Source Code Transfer, Architecture Blueprint, Staging Previews, & 30-Day Post-Launch Support.`
  }, [selectedServices, podSize, timelineWeeks])

  const handleCopyScope = () => {
    sound.playClick(1000)
    navigator.clipboard.writeText(generatedBrief)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

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
      className="py-20 md:py-28 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="services-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="05" label="SERVICES & PROJECT ESTIMATOR" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( INTERACTIVE SCOPE GENERATOR • TRANSPARENT PRICING )
            </p>
          </ScrollReveal>
        </div>

        {/* Headline with Mixed Fonts */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2
              id="services-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14]"
            >
              Configure your project.{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                Get an instant scope.
              </span>
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[42ch] leading-relaxed">
              Select the capabilities your business needs to estimate the sprint timeline and generate a tailored scope of work proposal.
            </p>
          </div>
        </ScrollReveal>

        {/* Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Interactive Capability Selectors */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5 flex items-center gap-2 font-semibold">
              <Sliders className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>STEP 1: SELECT CAPABILITIES NEEDED</span>
            </div>

            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon
              const isSelected = selectedServices.includes(cap.id)
              return (
                <div
                  key={cap.id}
                  onClick={() => toggleService(cap.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${isSelected
                      ? 'border-[var(--accent-primary)] bg-[var(--bg-card)] shadow-md'
                      : 'border-[var(--border-base)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)]'
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-lg mt-0.5 ${isSelected ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)]' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] mb-1">
                          {cap.title}
                        </h4>
                        <div className="inline-block font-mono text-xs text-[var(--accent-emerald)] font-semibold mb-2">
                          ✨ {cap.plainEnglishBenefit}
                        </div>
                        <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] font-normal leading-relaxed mb-3">
                          {cap.desc}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {cap.tags.map((t, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded-md bg-[var(--bg-base)] border border-[var(--border-base)] text-xs font-mono text-[var(--text-muted)]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-colors ${isSelected ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white' : 'border-[var(--border-base)]'
                      }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Step 2: Pod Size / Engagement Level */}
            <div className="pt-3 mt-1">
              <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2.5 flex items-center gap-2 font-semibold">
                <Zap className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                <span>STEP 2: CHOOSE SPRINT VELOCITY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    sound.playClick(800)
                    setPodSize('sprint')
                    setTimelineWeeks(3)
                  }}
                  className={`p-4 rounded-xl border text-left font-mono transition-all cursor-pointer ${podSize === 'sprint'
                      ? 'border-[var(--accent-amber)] bg-[var(--bg-card)] shadow-xs'
                      : 'border-[var(--border-base)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)]'
                    }`}
                >
                  <div className="text-xs font-bold text-[var(--text-primary)] mb-1">Fast MVP Sprint</div>
                  <div className="text-[11px] text-[var(--text-muted)]">2-4 Weeks • Prototype to launch</div>
                </button>

                <button
                  onClick={() => {
                    sound.playClick(800)
                    setPodSize('pod')
                    setTimelineWeeks(6)
                  }}
                  className={`p-4 rounded-xl border text-left font-mono transition-all cursor-pointer ${podSize === 'pod'
                      ? 'border-[var(--accent-primary)] bg-[var(--bg-card)] shadow-xs'
                      : 'border-[var(--border-base)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)]'
                    }`}
                >
                  <div className="text-xs font-bold text-[var(--text-primary)] mb-1">Dedicated Pod</div>
                  <div className="text-[11px] text-[var(--text-muted)]">4-8 Weeks • Full production</div>
                </button>

                <button
                  onClick={() => {
                    sound.playClick(800)
                    setPodSize('squad')
                    setTimelineWeeks(10)
                  }}
                  className={`p-4 rounded-xl border text-left font-mono transition-all cursor-pointer ${podSize === 'squad'
                      ? 'border-[var(--accent-cyan)] bg-[var(--bg-card)] shadow-xs'
                      : 'border-[var(--border-base)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)]'
                    }`}
                >
                  <div className="text-xs font-bold text-[var(--text-primary)] mb-1">Enterprise Squad</div>
                  <div className="text-[11px] text-[var(--text-muted)]">8+ Weeks • Scaled systems</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Generated Scope & Proposal Exporter */}
          <div className="lg:col-span-5 sticky top-24">
            <SpotlightCard
              borderGlowColor="rgba(226, 0, 26, 0.35)"
              className="p-6 sm:p-7 rounded-xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-base)]">
                  <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                    TAILORED SCOPE SUMMARY
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    ESTIMATED: ~{timelineWeeks} WEEKS
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[var(--bg-base)] border border-[var(--border-base)] font-mono text-xs text-[var(--text-primary)] mb-5 whitespace-pre-line leading-relaxed">
                  {generatedBrief}
                </div>

                <div className="space-y-2 mb-6 text-xs font-mono text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                    <span>Fixed-price milestone billing (No surprises)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                    <span>Weekly live demo & staging links</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                    <span>100% intellectual property & code ownership</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-[var(--border-base)]">
                <button
                  onClick={handleApplyBrief}
                  onMouseEnter={() => setCursorLabel('INQUIRE')}
                  onMouseLeave={() => setCursorLabel(null)}
                  className="btn-primary w-full justify-center"
                >
                  <span>SEND SCOPE TO INQUIRY FORM</span>
                  <ArrowRight className="w-4 h-4 ml-1 inline" />
                </button>

                <button
                  onClick={handleCopyScope}
                  className="btn-ghost w-full justify-center"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-[var(--accent-emerald)]" />
                      <span className="text-[var(--accent-emerald)]">SCOPE COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY SCOPE PROPOSAL (TEXT)</span>
                    </>
                  )}
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  )
}
