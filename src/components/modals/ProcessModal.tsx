import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageSquare, LayoutTemplate, Terminal, Rocket, CheckCircle, Shield, ArrowRight } from 'lucide-react'
import { sound } from '../../utils/audioEngine'

interface ProcessModalProps {
  isOpen: boolean
  onClose: () => void
  onStartProject: () => void
}

const STEPS = [
  {
    step: '01',
    title: 'Plain-English Discovery',
    tagline: 'We listen to your vision — zero tech jargon.',
    desc: 'You tell us what problem your business needs to solve. We draft a clear architecture blueprint, fixed quote, and weekly sprint timeline.',
    icon: MessageSquare,
    color: 'text-[var(--accent-primary)]',
    bg: 'bg-[var(--accent-glow)]',
    deliverable: 'Architecture Specification & Fixed-Price Scope',
  },
  {
    step: '02',
    title: 'Interactive Clickable Prototype',
    tagline: 'Test your app in days before coding starts.',
    desc: 'We design high-fidelity interactive screens so you can click through the user experience, give feedback, and ensure the flow is flawless.',
    icon: LayoutTemplate,
    color: 'text-[var(--accent-cyan)]',
    bg: 'bg-cyan-500/10',
    deliverable: 'Figma UI/UX & Clickable Prototype',
  },
  {
    step: '03',
    title: 'Production Engineering & AI',
    tagline: 'Rapid build with weekly transparent demos.',
    desc: 'Our engineering team develops the full application using modern web frameworks and custom AI models. You get a private staging link to watch progress live.',
    icon: Terminal,
    color: 'text-[var(--accent-emerald)]',
    bg: 'bg-emerald-500/10',
    deliverable: 'Full-Stack Codebase & Weekly Staging Demos',
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

export function ProcessModal({ isOpen, onClose, onStartProject }: ProcessModalProps) {
  useEffect(() => {
    if (isOpen) {
      sound.playWhoosh(0.04)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[var(--bg-card)] border border-[var(--border-base)] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-base)] flex items-center justify-between bg-[var(--bg-card)]/95 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
                  HOW WE WORK
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                  The 4-Step Client Operating Model
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(700)
                onClose()
              }}
              className="p-2 rounded-xl border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
              aria-label="Close process modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              No guesswork, no endless meetings. We guide you step-by-step from raw concept to a secure, scalable software application that your customers will love.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STEPS.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xl font-bold text-[var(--text-muted)]">
                          {step.step}
                        </span>
                        <div className={`p-2 rounded-lg ${step.bg} ${step.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-1">
                        {step.title}
                      </h4>
                      <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold mb-2">
                        {step.tagline}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border-base)] flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)]">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                      <span className="truncate">{step.deliverable}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-[var(--border-base)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[var(--text-muted)]">
              Avg. Turnaround: <strong>18 Days</strong> • 100% Code Ownership
            </div>
            <button
              onClick={() => {
                sound.playClick(900)
                onClose()
                onStartProject()
              }}
              className="btn-primary w-full sm:w-auto"
            >
              <span>REQUEST PROJECT PROPOSAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
