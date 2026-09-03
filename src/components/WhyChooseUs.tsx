import React, { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, GitCommit, FileCode, Clock } from 'lucide-react'

interface MilestoneStep {
  id: string
  num: string
  title: string
  timeline: string
  badge: string
  desc: string
  deliverables: string[]
  icon: React.ElementType
}

const STEPS: MilestoneStep[] = [
  {
    id: 'discovery',
    num: '01',
    title: 'Discovery & System Contracts',
    timeline: 'Phase 01',
    badge: 'ARCHITECTURE',
    desc: 'Deep-dive into your data schema, API topology, latency budgets, and security boundaries. Bilateral NDA and IP transfer agreement executed before the first line of code.',
    deliverables: ['System Architecture Blueprint', 'OpenAPI 3.0 Specs & DB Schemas', 'Executed Bilateral IP Assignment'],
    icon: FileCode,
  },
  {
    id: 'prototype',
    num: '02',
    title: 'Live Clickable Prototype',
    timeline: 'Phase 02',
    badge: 'VERIFICATION',
    desc: 'We deploy an active interactive build to a private staging URL. You click through real screens and validate user flows before production backend logic is finalized.',
    deliverables: ['Live Staging URL Deployed', 'Interactive UX Feedback Review', 'Production API Contracts Locked'],
    icon: Zap,
  },
  {
    id: 'build',
    num: '03',
    title: 'Production Build & AI Pipelines',
    timeline: 'Phase 03',
    badge: 'CORE ENGINEERING',
    desc: 'High-velocity production code. Distributed queues (BullMQ/Redis), agent orchestration graphs, vector search indexes, auth, billing, and automated CI/CD pipeline.',
    deliverables: ['Full-Stack Production Application', 'Self-Correcting LLM Pipelines', 'Test Suites & Load Telemetry'],
    icon: GitCommit,
  },
  {
    id: 'transfer',
    num: '04',
    title: '100% IP & Asset Transfer',
    timeline: 'Phase 04',
    badge: 'OWNERSHIP',
    desc: 'Complete handover of all repositories, secrets, Docker registries, and cloud infrastructure directly to your organization. Zero vendor lock-in or recurring agency fees.',
    deliverables: ['Git Commit History & Repository Ownership', 'Cloud Infrastructure & Secret Transfer', 'Technical Architecture Documentation'],
    icon: ShieldCheck,
  },
  {
    id: 'warranty',
    num: '05',
    title: 'Active Launch Support',
    timeline: 'Post-Launch',
    badge: 'PEACE OF MIND',
    desc: 'We stand by what we ship. Includes active post-launch bug triage, edge-case monitoring, and telemetry stabilization so your team launches with 100% confidence.',
    deliverables: ['Guaranteed Bug Fix SLA', 'Telemetry & Error Monitoring', 'Team Onboarding Walkthrough'],
    icon: Clock,
  },
]

export function WhyChooseUs() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const activeStep = STEPS[activeStepIndex]
  const IconComponent = activeStep.icon

  return (
    <section
      id="why-us"
      className="py-24 md:py-32 border-t border-[var(--border-base)] relative scroll-mt-20"
      aria-labelledby="why-headline"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="04" label="WHY CHOOSE US // ENGINEERING LIFECYCLE" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <span className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
              INTERACTIVE 5-STAGE PIPELINE
            </span>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.08}>
          <div className="max-w-3xl mb-12">
            <h2
              id="why-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4"
            >
              Linear precision.{' '}
              <span className="text-[var(--accent-primary)]">
                Zero ambiguity.
              </span>
            </h2>
            <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
              Every deliverable is locked, tested, and verified before the next begins. Click through the 5 milestones below to inspect our engineering roadmap.
            </p>
          </div>
        </ScrollReveal>

        {/* Linear Stepper Navigation Bar */}
        <ScrollReveal delay={0.12}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl glass-panel mb-8">
            {STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepIndex(idx)
                  }}
                  className={`py-3 px-3 rounded-xl font-mono text-xs transition-all flex flex-col items-start gap-1 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[var(--bg-card)] border border-[var(--border-base)] text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-bold ${isActive ? 'text-[var(--accent-primary)]' : ''}`}>
                      {step.num}
                    </span>
                    <span className="text-[10px] uppercase opacity-70">
                      {step.timeline.split(' ')[0]}
                    </span>
                  </div>
                  <span className="font-display font-semibold text-xs truncate w-full">
                    {step.title.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Interactive Active Milestone Panel */}
        <ScrollReveal delay={0.16} variant="depth-scale">
          <div className="glass-panel specular-border p-8 sm:p-10 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Stage Detail */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--accent-primary)] font-semibold">
                    STAGE {activeStep.num} / {activeStep.badge}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {activeStep.timeline}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-4">
                  {activeStep.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  {activeStep.desc}
                </p>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-base)]">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i <= activeStepIndex
                          ? 'w-8 bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]'
                          : 'w-2 bg-[var(--border-base)]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Verified Deliverables Checklist */}
              <div className="lg:col-span-5 p-6 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60">
                <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-bold mb-4">
                  VERIFIED DELIVERABLES
                </div>
                <div className="space-y-3.5">
                  {activeStep.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                      <span className="font-body font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-base)] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {activeStepIndex === STEPS.length - 1 ? 'Pipeline Complete' : `Next: Stage ${STEPS[activeStepIndex + 1]?.num}`}
                  </span>
                  <button
                    onClick={() => {
                      setActiveStepIndex((prev) => (prev + 1) % STEPS.length)
                    }}
                    className="font-mono text-xs font-bold text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{activeStepIndex === STEPS.length - 1 ? 'RESTART' : 'NEXT STAGE'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
