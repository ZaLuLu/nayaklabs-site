import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, HelpCircle, Plus, Minus, ShieldCheck, Mail, ArrowRight } from 'lucide-react'
import { sound } from '../../utils/audioEngine'

interface FaqModalProps {
  isOpen: boolean
  onClose: () => void
  onContact: () => void
}

interface FAQItem {
  question: string
  answer: string
  category: 'Clients & Founders' | 'Learners & Academy' | 'Process & IP'
}

const FAQS: FAQItem[] = [
  {
    category: 'Clients & Founders',
    question: 'Do I need technical knowledge to build a software or AI product with you?',
    answer:
      'Not at all. You bring the business problem or product vision, and we handle the end-to-end engineering — UI/UX design, database architecture, AI integration, and cloud hosting. We explain every milestone in plain English without confusing jargon.',
  },
  {
    category: 'Clients & Founders',
    question: 'How fast can you launch an MVP (Minimum Viable Product)?',
    answer:
      'Our average sprint timeline for a functional, investor-ready MVP is 2 to 4 weeks. You will be able to test a clickable interactive prototype within the first week before full production engineering begins.',
  },
  {
    category: 'Process & IP',
    question: 'Will our business own 100% of the source code and intellectual property?',
    answer:
      'Yes, 100%. Upon project completion, all Git repositories, cloud credentials, database assets, and intellectual property rights are fully transferred to you. There is zero proprietary vendor lock-in.',
  },
  {
    category: 'Process & IP',
    question: 'Can you sign a Non-Disclosure Agreement (NDA) before we discuss our idea?',
    answer:
      'Absolutely. We treat all client concepts with strict confidentiality. We are happy to execute a standard mutual NDA before our initial discovery call.',
  },
  {
    category: 'Learners & Academy',
    question: 'Are your training cohorts suitable for complete beginners?',
    answer:
      'Yes! Our "Modern Full-Stack & Cloud" track starts from ground zero with TypeScript and React. Our advanced "Agentic AI & LLM Systems" track is ideal for those who have basic Python familiarity. Both tracks include hands-on 1-on-1 code reviews.',
  },
  {
    category: 'Clients & Founders',
    question: 'How does ongoing support work after our app is launched?',
    answer:
      'Every project includes 30 days of complimentary post-launch monitoring, bug fixes, and performance tuning. We also offer dedicated monthly engineering retainers for ongoing feature development.',
  },
]

export function FaqModal({ isOpen, onClose, onContact }: FaqModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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

  const toggleFAQ = (idx: number) => {
    sound.playClick(750)
    setOpenIndex(openIndex === idx ? null : idx)
  }

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
          className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[var(--bg-card)] border border-[var(--border-base)] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-base)] flex items-center justify-between bg-[var(--bg-card)]/95 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
                  TRANSPARENCY & POLICIES
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                  Frequently Asked Questions
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(700)
                onClose()
              }}
              className="p-2 rounded-xl border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
              aria-label="Close FAQ modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  onClick={() => toggleFAQ(idx)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isOpen
                      ? 'border-[var(--accent-primary)] bg-[var(--bg-surface)] shadow-md'
                      : 'border-[var(--border-base)] bg-[var(--bg-surface)]/60 hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[var(--accent-primary)] font-bold px-2 py-0.5 rounded-md bg-[var(--accent-glow)] hidden sm:inline">
                        {faq.category}
                      </span>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                        {faq.question}
                      </h4>
                    </div>

                    <div className="p-1 rounded-full text-[var(--text-muted)] shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[var(--accent-primary)]" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-3.5 pt-3.5 border-t border-[var(--border-base)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-[var(--border-base)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[var(--text-muted)]">
              Still have questions? Reach us directly at <span className="text-[var(--text-primary)]">hello@nayaklabs.com</span>
            </div>
            <button
              onClick={() => {
                sound.playClick(900)
                onClose()
                onContact()
              }}
              className="btn-primary w-full sm:w-auto"
            >
              <span>SEND A DIRECT INQUIRY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
