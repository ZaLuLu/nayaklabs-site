import { useState, useEffect } from 'react'
import { CrosshairTicks } from './CrosshairTicks'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import confetti from 'canvas-confetti'
import { Send, Check, Mail, ArrowUpRight } from 'lucide-react'

const WHY_ITEMS = [
  { num: '01', title: 'Production from day one', detail: 'No toy demos. Every line of code is structured for live traffic and edge environments.' },
  { num: '02', title: 'Engineers who ship', detail: 'Taught and built by engineers actively deploying LLMs, RAG, and distributed systems.' },
  { num: '03', title: 'Designed to compound', detail: 'Clean code, resilient architectural patterns, and considered developer experiences.' },
  { num: '04', title: 'Weekly shipping cadence', detail: 'Public changelogs, staging branch previews, and relentless iteration.' },
]

export function Contact() {
  const { setCursorLabel, activeBrief } = useTheme()
  const [inquiryType, setInquiryType] = useState<'services' | 'training' | 'product' | 'general'>('services')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Listen to activeBrief changes from the Services Configurator
  useEffect(() => {
    if (activeBrief) {
      setMessage(activeBrief)
      setInquiryType('services')
    }
  }, [activeBrief])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    sound.playClick(1050)
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      sound.playSuccess(0.1)
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E2001A', '#ffffff', '#10B981'],
      })
    }, 700)
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen py-28 md:py-36 overflow-hidden border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="contact-headline"
    >
      <CrosshairTicks />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-16 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="06" label="CONTACT" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              06 / 06 // INITIATE CONVERSATION
            </p>
          </ScrollReveal>
        </div>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h2
            id="contact-headline"
            className="font-display font-bold text-[var(--text-primary)] mb-6 tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              lineHeight: 0.94,
              maxWidth: '18ch',
            }}
          >
            Ready to build something that{' '}
            <span className="text-[var(--accent-primary,#E2001A)]">
              actually ships?
            </span>
          </h2>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={0.18}>
          <p
            className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-[50ch] mb-16 font-light"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Whether you need a dedicated AI engineering pod, a seat in our upcoming training cohort, or access to our products — let's build together.
          </p>
        </ScrollReveal>

        {/* 2-Column: Left (Why Us + Direct Tiles) / Right (Interactive Inquiry Wizard) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Why Us List */}
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-6">
                // WHY CHOOSE NAYAK LABS
              </p>
              <div className="flex flex-col">
                {WHY_ITEMS.map((item, i) => (
                  <ScrollReveal key={item.num} delay={0.2 + i * 0.06}>
                    <div className="border-b border-[var(--border-base)] pb-5 mb-5">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-[var(--accent-primary,#E2001A)] mt-0.5">
                          {item.num}
                        </span>
                        <div>
                          <p className="text-[var(--text-primary)] text-sm font-semibold mb-1">
                            {item.title}
                          </p>
                          <p className="text-[var(--text-muted)] text-xs leading-relaxed font-light">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="mailto:hello@nayaklabs.com"
                onMouseEnter={() => setCursorLabel('EMAIL')}
                onMouseLeave={() => setCursorLabel(null)}
                className="contact-tile p-5 flex items-center justify-between group rounded-sm border border-[var(--border-base)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                  <div>
                    <p className="font-mono text-[0.62rem] text-[var(--text-muted)] uppercase tracking-widest">
                      DIRECT EMAIL
                    </p>
                    <p className="font-mono text-xs text-[var(--text-primary)]">
                      hello@nayaklabs.com
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
              </a>

              <a
                href="https://instagram.com/nayaklabs"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorLabel('OPEN')}
                onMouseLeave={() => setCursorLabel(null)}
                className="contact-tile p-5 flex items-center justify-between group rounded-sm border border-[var(--border-base)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <div>
                    <p className="font-mono text-[0.62rem] text-[var(--text-muted)] uppercase tracking-widest">
                      INSTAGRAM
                    </p>
                    <p className="font-mono text-xs text-[var(--text-primary)]">
                      @nayaklabs
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <SpotlightCard
              borderGlowColor="rgba(226, 0, 26, 0.3)"
              className="p-6 md:p-10 rounded-sm border-[var(--border-base)] bg-[var(--bg-card)]"
            >
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                    Inquiry Received.
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm max-w-[38ch] font-light">
                    Our engineering leads review all inquiries within 24 hours. We will reach out to <strong className="text-[var(--text-primary)]">{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setName('')
                      setEmail('')
                      setMessage('')
                    }}
                    className="mt-4 px-4 py-2 border border-[var(--border-base)] font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer rounded-xs"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono text-xs">
                  {/* Inquiry Type Buttons */}
                  <div>
                    <label className="text-[var(--text-secondary)] block mb-2.5 uppercase tracking-wider text-[0.68rem]">
                      1. Select Inquiry Stream:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(
                        [
                          { id: 'services', label: 'Services Pod' },
                          { id: 'training', label: 'Tech Training' },
                          { id: 'product', label: 'Products' },
                          { id: 'general', label: 'Other / Hello' },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            sound.playClick(900)
                            setInquiryType(item.id)
                          }}
                          className={`p-2.5 border text-center transition-all cursor-pointer rounded-xs ${
                            inquiryType === item.id
                              ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold border-[var(--btn-primary-bg)]'
                              : 'bg-[var(--bg-surface)] border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--text-secondary)] block mb-2 uppercase tracking-wider text-[0.68rem]">
                        2. Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ada Lovelace"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-base)] p-3 text-[var(--text-primary)] font-mono text-xs focus:outline-none focus:border-[var(--border-hover)] rounded-xs placeholder:text-[var(--text-muted)]"
                      />
                    </div>

                    <div>
                      <label className="text-[var(--text-secondary)] block mb-2 uppercase tracking-wider text-[0.68rem]">
                        3. Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="ada@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-base)] p-3 text-[var(--text-primary)] font-mono text-xs focus:outline-none focus:border-[var(--border-hover)] rounded-xs placeholder:text-[var(--text-muted)]"
                      />
                    </div>
                  </div>

                  {/* Message & Scope Brief */}
                  <div>
                    <label className="text-[var(--text-secondary)] block mb-2 uppercase tracking-wider text-[0.68rem]">
                      4. Project Scope / Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you're building, target timelines, or specific questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border-base)] p-3 text-[var(--text-primary)] font-mono text-xs focus:outline-none focus:border-[var(--border-hover)] rounded-xs placeholder:text-[var(--text-muted)] leading-relaxed resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setCursorLabel('SHIP')}
                    onMouseLeave={() => setCursorLabel(null)}
                    className="btn-primary w-full justify-center py-3 text-xs tracking-widest font-bold cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING DISPATCH...</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>INITIATE ENGAGEMENT</span>
                        <Send className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  )
}
