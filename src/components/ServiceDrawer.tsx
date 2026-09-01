import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import {
  X,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Zap,
  Layers,
  Copy,
  CheckCheck,
} from 'lucide-react'

export interface ServiceData {
  id: string
  title: string
  category: string
  tagline: string
  plainEnglishBenefit: string
  description: string
  deliverables: string[]
  techStack: string[]
  icon: typeof Cpu
  color: string
}

interface ServiceDrawerProps {
  service: ServiceData | null
  onClose: () => void
  onApplyScope: (scopeSummary: string) => void
}

export function ServiceDrawer({ service, onClose, onApplyScope }: ServiceDrawerProps) {
  const { setActiveBrief } = useTheme()
  const [podSize, setPodSize] = useState<'sprint' | 'pod' | 'squad'>('pod')
  const [timelineWeeks, setTimelineWeeks] = useState<number>(4)
  const [copied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    if (service) {
      sound.playWhoosh(0.04)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [service, onClose])

  const podConfigs = {
    sprint: {
      name: '2-Engineer Fast Sprint',
      target: 'Rapid MVP Prototype & Initial Validation',
      timeline: '2–3 Weeks',
    },
    pod: {
      name: 'Dedicated 4-Engineer Senior Pod',
      target: 'Full Production Application & Custom AI',
      timeline: '4–6 Weeks',
    },
    squad: {
      name: 'Enterprise Scale Squad',
      target: 'Complex Microservices & High-Throughput Pipelines',
      timeline: '8–12 Weeks',
    },
  }

  const generatedBrief = useMemo(() => {
    if (!service) return ''
    return `SERVICE INQUIRY: ${service.title}\nDELIVERY POD: ${podConfigs[podSize].name} (${podConfigs[podSize].target})\nESTIMATED TIMELINE: ~${timelineWeeks} Weeks\nKEY DELIVERABLES:\n${service.deliverables.map((d) => `• ${d}`).join('\n')}\nINCLUDED: 100% Source Code Transfer, Architecture Blueprint, Staging Previews, & 30-Day Post-Launch Support.`
  }, [service, podSize, timelineWeeks])

  const handleCopy = () => {
    sound.playClick(900)
    navigator.clipboard.writeText(generatedBrief)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleApply = () => {
    sound.playSuccess(0.06)
    setActiveBrief(generatedBrief)
    onApplyScope(generatedBrief)
    onClose()
  }

  if (!service) return null

  const Icon = service.icon

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex justify-end" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative z-10 w-full max-w-2xl h-full bg-[var(--bg-card)] border-l border-[var(--border-base)] shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-[var(--border-base)] flex items-start justify-between gap-4 sticky top-0 bg-[var(--bg-card)]/95 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
                  {service.category}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                  {service.title}
                </h3>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playClick(700)
                onClose()
              }}
              className="p-2 rounded-lg border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
              aria-label="Close service details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-8 flex-1">
            {/* Plain English Value Proposition */}
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-emerald)] font-bold mb-1">
                <Zap className="w-3.5 h-3.5" />
                OUTCOME PROMISE
              </div>
              <p className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                {service.plainEnglishBenefit}
              </p>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 font-bold">
                Overview
              </h4>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Key Deliverables */}
            <div>
              <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 font-bold">
                Key Production Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)]/60 text-xs sm:text-sm text-[var(--text-primary)]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 font-bold">
                Engineering Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md border border-[var(--border-base)] bg-[var(--bg-surface)] font-mono text-xs text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Pod Configurator */}
            <div className="pt-6 border-t border-[var(--border-base)]">
              <h4 className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                Select Delivery Pod Model
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {(['sprint', 'pod', 'squad'] as const).map((key) => {
                  const cfg = podConfigs[key]
                  const isSelected = podSize === key
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        sound.playClick(850)
                        setPodSize(key)
                        if (key === 'sprint') setTimelineWeeks(3)
                        if (key === 'pod') setTimelineWeeks(5)
                        if (key === 'squad') setTimelineWeeks(8)
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[var(--accent-primary)] bg-[var(--accent-glow)]/10 text-[var(--text-primary)] shadow-sm'
                          : 'border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold uppercase mb-1">{key}</div>
                      <div className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                        {cfg.name}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--text-muted)]">
                        ~{cfg.timeline}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Timeline Slider */}
              <div className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]/80 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--text-secondary)]">Target Sprint Duration:</span>
                  <span className="font-bold text-[var(--accent-primary)]">
                    {timelineWeeks} WEEKS
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={timelineWeeks}
                  onChange={(e) => {
                    sound.playClick(900, 0.02)
                    setTimelineWeeks(Number(e.target.value))
                  }}
                  className="w-full accent-[var(--accent-primary)] cursor-pointer"
                />
                <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                  <span>2 Wks (MVP Sprint)</span>
                  <span>6 Wks (Full App)</span>
                  <span>12 Wks (Scale)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 sm:p-8 border-t border-[var(--border-base)] bg-[var(--bg-card)]/95 backdrop-blur-md sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                  <span>COPIED SCOPE</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY SCOPE</span>
                </>
              )}
            </button>

            <button
              onClick={handleApply}
              className="btn-primary flex-1 sm:flex-initial"
            >
              <span>APPLY SCOPE TO INQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
