import { useState, useEffect } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import confetti from 'canvas-confetti'
import { Send, Mail, Calendar, ShieldCheck, Clock, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'

const PRESET_TOPICS = [
  { label: '🚀 Build an AI MVP (2–4 Wks)', subject: 'AI MVP Development Inquiry' },
  { label: '🎓 Join Engineering Fellowship', subject: 'Fellowship Enrollment & Mentorship' },
  { label: '⚡ Automate Business Workflows', subject: 'Workflow Automation & Custom Tools' },
  { label: '🛡️ Request Architecture Audit', subject: 'Technical Audit & Consultation' },
]

export function Contact() {
  const { activeBrief } = useTheme()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (activeBrief) {
      setMessage(activeBrief)
    }
  }, [activeBrief])

  const handleSelectPreset = (preset: { label: string; subject: string }) => {
    sound.playClick(850)
    setMessage(`Hello Nayak Labs team,\n\nI would like to discuss: ${preset.subject}.\n\nDetails about my project/goals: `)
  }

  const handleSendWhatsApp = () => {
    sound.playClick(950)
    const text = encodeURIComponent(
      `Hey Suraj, I'm reaching out via Nayak Labs:\n\n${message || 'I have a project idea and would like to discuss timelines and sprint scope.'}`
    )
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    sound.playClick(1050)
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      sound.playSuccess(0.08)
      confetti({
        particleCount: 60,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#E2001A', '#ffffff', '#00F5A0', '#00D2FF'],
      })
    }, 700)
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 md:py-28 overflow-hidden border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="contact-headline"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="06" label="START A BUILD // GET IN TOUCH" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( 24-HOUR RESPONSE GUARANTEE • DIRECT FOUNDER ACCESS )
            </p>
          </ScrollReveal>
        </div>

        {/* Headline with Mixed Fonts */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mb-12">
            <h2
              id="contact-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14] mb-3"
            >
              Ready to build something that{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                actually ships
              </span>?
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
              Tell us about your project or learning goals. We reply within 24 hours with concrete technical recommendations, timeline estimates, or cohort details.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Grid: Form + Direct WhatsApp & Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <SpotlightCard
              borderGlowColor="rgba(226, 0, 26, 0.35)"
              className="p-6 sm:p-8 rounded-2xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-xl"
            >
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 font-mono">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-[var(--accent-emerald)] flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-[40ch] mx-auto leading-relaxed">
                    Thank you, {name}. Our senior engineering team will review your requirements and reach out at <strong className="text-[var(--text-primary)]">{email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      sound.playClick(800)
                      setIsSubmitted(false)
                      setName('')
                      setEmail('')
                      setPhone('')
                      setMessage('')
                    }}
                    className="btn-ghost mt-4"
                  >
                    <span>SEND ANOTHER MESSAGE</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Topic Presets */}
                  <div>
                    <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
                      Quick Inquiry Presets (Click to autofill):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_TOPICS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className="px-3 py-1.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-card)] font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer text-left"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Suraj Nayak"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                      Phone Number (Optional / WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                      Project Details / Learning Goals *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you want to build or what training program you're interested in..."
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors font-mono text-xs leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-3.5 text-sm cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <span>TRANSMIT INQUIRY</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </div>

          {/* Right: WhatsApp Fast-Track & Discovery Call Booking */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Card */}
            <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)]">
                    Fast-Track WhatsApp Chat
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    Direct conversation with Suraj Nayak
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Prefer immediate messaging? Skip the email queue and connect directly with our founder on WhatsApp.
              </p>
              <button
                onClick={handleSendWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-black font-mono font-bold text-xs hover:bg-[#20bd5a] transition-all flex items-center justify-between shadow-md cursor-pointer"
              >
                <span>OPEN WHATSAPP CHAT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Discovery Call Card */}
            <div className="p-6 sm:p-7 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)]">
                    Book a 15-Min Discovery Call
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    Architecture & sprint scope review
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Schedule a 15-minute video call to walk through technical architecture, timelines, or cohort curriculum.
              </p>

              <button
                onClick={() => {
                  sound.playClick(900)
                  window.open('https://cal.com', '_blank')
                }}
                className="w-full py-3 px-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-xs font-mono font-bold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all flex items-center justify-between cursor-pointer"
              >
                <span>SELECT TIME ON CALENDAR</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-2 pt-2 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-base)]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-amber)] shrink-0" />
                  <span>24-Hour Guaranteed Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>Strict NDA & IP Confidentiality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0" />
                  <span>Direct: hello@nayaklabs.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
