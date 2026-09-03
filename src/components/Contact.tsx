import React, { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { sound } from '../utils/audioEngine'
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react'

function InstagramIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedInIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    sound.playSuccess(0.08)
    navigator.clipboard.writeText('hello@nayaklabs.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const CHANNELS = [
    {
      id: 'email',
      name: 'Gmail / Direct Email',
      handle: 'hello@nayaklabs.com',
      badge: '24-HR GUARANTEED RESPONSE',
      desc: 'Send an inquiry directly to founder engineering inbox. Ideal for custom RFPs, sprint briefs, and enterprise agreements.',
      actionText: 'COMPOSE EMAIL',
      href: 'mailto:hello@nayaklabs.com?subject=Project%20Inquiry%20%E2%80%94%20Nayak%20Labs',
      icon: Mail,
      accentColor: 'var(--accent-primary)',
      badgeClass: 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/20',
      hasCopy: true,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'Nayak Labs / Suraj Nayak',
      badge: 'FOUNDER & ENTERPRISE DISPATCH',
      desc: 'Connect with technical leadership, follow engineering updates, and discuss strategic product partnerships.',
      actionText: 'CONNECT ON LINKEDIN',
      href: 'https://www.linkedin.com/company/nayaklabs',
      icon: LinkedInIcon,
      accentColor: 'var(--accent-cyan)',
      badgeClass: 'text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 border-[var(--accent-cyan)]/20',
      hasCopy: false,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@nayaklabs',
      badge: 'STUDIO LIFE & BEHIND THE SCENES',
      desc: 'Behind-the-scenes engineering logs, product teasers, cohort highlights, and community updates.',
      actionText: 'FOLLOW @NAYAKLABS',
      href: 'https://instagram.com/nayaklabs',
      icon: InstagramIcon,
      accentColor: 'var(--accent-emerald)',
      badgeClass: 'text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10 border-[var(--accent-emerald)]/20',
      hasCopy: false,
    },
  ]

  return (
    <section
      id="contact"
      className="py-24 md:py-32 border-t border-[var(--border-base)] relative scroll-mt-20"
      aria-labelledby="contact-headline"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="06" label="GET IN TOUCH // DIRECT ACCESS" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <span className="font-mono text-xs text-[var(--accent-primary)] font-bold tracking-wider uppercase">
              NO GATEKEEPERS · DIRECT ENGINEER CONTACT
            </span>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.08}>
          <div className="max-w-3xl mb-12">
            <h2
              id="contact-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-4"
            >
              Let’s build together.
            </h2>
            <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed">
              No endless automated forms or agency account managers. Reach out directly through any of our 3 official communication channels.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 High-Impact Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CHANNELS.map((ch, idx) => {
            const IconComponent = ch.icon
            return (
              <ScrollReveal key={ch.id} delay={0.1 + idx * 0.05} className="h-full">
                <a
                  href={ch.href}
                  target={ch.id === 'email' ? undefined : '_blank'}
                  rel={ch.id === 'email' ? undefined : 'noopener noreferrer'}
                  onClick={() => sound.playClick(850 + idx * 50)}
                  className="group relative flex flex-col justify-between h-full p-8 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all duration-300 shadow-sm cursor-pointer select-none"
                >
                  <div>
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div
                        className="p-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)] group-hover:scale-110 transition-transform duration-200"
                        style={{ color: ch.accentColor }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${ch.badgeClass}`}>
                        {ch.badge}
                      </span>
                    </div>

                    {/* Channel Title & Handle */}
                    <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">
                      {ch.name}
                    </h3>
                    <div className="font-mono text-xs text-[var(--text-muted)] mb-4 flex items-center gap-2">
                      <span>{ch.handle}</span>
                      {ch.hasCopy && (
                        <button
                          onClick={handleCopyEmail}
                          title="Copy Email Address"
                          className="p-1 rounded hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-8">
                      {ch.desc}
                    </p>
                  </div>

                  {/* Bottom Action Trigger */}
                  <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    <span>{ch.actionText}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
