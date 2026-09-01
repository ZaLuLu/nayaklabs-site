import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { sound } from '../utils/audioEngine'

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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (idx: number) => {
    sound.playClick(750)
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section
      id="faq"
      className="py-20 md:py-28 relative border-t border-[var(--border-base)] bg-[var(--bg-base)] transition-colors duration-300"
      aria-labelledby="faq-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="06" label="FREQUENTLY ASKED QUESTIONS" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( TRANSPARENT ANSWERS FOR CLIENTS & LEARNERS )
            </p>
          </ScrollReveal>
        </div>

        {/* Headline with Mixed Fonts */}
        <div className="max-w-3xl mb-12">
          <ScrollReveal delay={0.1}>
            <h2
              id="faq-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14] mb-3"
            >
              Clear answers to your{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                questions
              </span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
              Everything you need to know about working with our product studio, licensing our tools, or enrolling in our academy.
            </p>
          </ScrollReveal>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <ScrollReveal key={idx} delay={0.1 + idx * 0.05}>
                <div
                  onClick={() => toggleFAQ(idx)}
                  className={`p-5 sm:p-6 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isOpen
                      ? 'border-[var(--accent-primary)] bg-[var(--bg-card)] shadow-md'
                      : 'border-[var(--border-base)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[var(--accent-primary)] font-bold px-2.5 py-0.5 rounded-md bg-[var(--accent-glow)] hidden sm:inline">
                        {faq.category}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)]">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="p-1 rounded-full text-[var(--text-muted)] shrink-0">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[var(--accent-primary)]" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-base)] text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
