import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { Quote, Sparkles } from 'lucide-react'

const COMPARISON_ROWS = [
  {
    feature: 'Time to Kickoff & Code',
    nayak: '48 Hours',
    agency: '4–8 Weeks of meetings',
    fullTime: '2–3 Months of recruiting',
  },
  {
    feature: 'Time to Working MVP',
    nayak: '18–25 Days',
    agency: '3–6 Months (Waterfall)',
    fullTime: '4–6 Months',
  },
  {
    feature: 'Seniority on Your Project',
    nayak: '100% Senior Engineers & Founders',
    agency: 'Billed as Senior, delegated to Juniors',
    fullTime: 'Depends on budget ($120k+ for seniors)',
  },
  {
    feature: 'Code & IP Ownership',
    nayak: '100% Day One (Full Git Transfer)',
    agency: 'Proprietary lock-in or extra IP fees',
    fullTime: '100% Company Owned',
  },
  {
    feature: 'Billing & Cost Structure',
    nayak: 'Fixed-Price Clear Sprints',
    agency: 'Bloated hourly retainers + scope creep',
    fullTime: '$10k+/mo salary + benefits + equity',
  },
  {
    feature: 'Modern AI & Web Stack',
    nayak: 'Next.js 15, FastAPI, LangGraph, Qdrant',
    agency: 'Legacy WordPress, slow boilerplate',
    fullTime: 'Varies by developer experience',
  },
]

export function StudioComparison() {
  return (
    <section
      id="comparison"
      className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto border-t border-[var(--border-base)] transition-colors duration-300 relative"
      aria-labelledby="comparison-headline"
    >
      {/* Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
        <ScrollReveal delay={0}>
          <SectionEyebrow index="05" label="WHY CHOOSE US // THE COMPARISON" />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            ( ZERO FLUFF • HIGH-VELOCITY ENGINEERING )
          </p>
        </ScrollReveal>
      </div>

      {/* Quote Banner: "Buy Premium, Get Premium" */}
      <ScrollReveal delay={0.08}>
        <div className="mb-12 p-6 sm:p-8 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] font-bold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5 fill-current" />
              THE NAYAK LABS PRINCIPLE
            </div>
            <blockquote className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
              "Buy Premium,{' '}
              <span className="text-[var(--accent-primary)] underline decoration-[var(--accent-glow)] underline-offset-8">
                Get Premium
              </span>."
            </blockquote>
          </div>

          <div className="font-mono text-xs text-right border-l sm:border-l sm:border-t-0 border-[var(--border-base)] pl-4 sm:pl-6 text-[var(--text-secondary)]">
            <div className="font-bold text-[var(--text-primary)] text-sm">— Suraj Nayak</div>
            <div className="text-[var(--text-muted)]">Founder & Principal Engineer</div>
          </div>
        </div>
      </ScrollReveal>

      {/* Headline */}
      <ScrollReveal delay={0.12}>
        <div className="max-w-3xl mb-12">
          <h2
            id="comparison-headline"
            className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14] mb-3"
          >
            Why ambitious founders{' '}
            <span className="font-serif italic font-normal text-[var(--accent-primary)]">
              choose us
            </span>.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
            Hiring full-time engineers takes months. Traditional agencies charge bloated retainers for junior developers. We provide founder-led senior pods that ship in weeks.
          </p>
        </div>
      </ScrollReveal>

      {/* Responsive Comparison Matrix Table */}
      <ScrollReveal delay={0.16}>
        <div className="overflow-x-auto rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[var(--border-base)] bg-[var(--bg-surface)]/60 font-mono text-xs">
                <th className="p-5 font-bold text-[var(--text-muted)] uppercase">DELIVERY METRIC</th>
                <th className="p-5 font-extrabold text-[var(--accent-primary)] bg-[var(--accent-glow)]/10 border-x border-[var(--border-base)]">
                  ⚡ NAYAK LABS
                </th>
                <th className="p-5 font-medium text-[var(--text-secondary)]">TRADITIONAL BIG AGENCY</th>
                <th className="p-5 font-medium text-[var(--text-secondary)]">FULL-TIME IN-HOUSE HIRE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-base)] font-mono text-xs">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[var(--bg-surface)]/40 transition-colors"
                >
                  <td className="p-5 font-semibold text-[var(--text-primary)]">
                    {row.feature}
                  </td>
                  <td className="p-5 font-bold text-[var(--text-primary)] bg-[var(--accent-glow)]/5 border-x border-[var(--border-base)]">
                    <span className="text-[var(--accent-primary)] font-extrabold mr-1.5">✓</span>
                    {row.nayak}
                  </td>
                  <td className="p-5 text-[var(--text-secondary)]">
                    <span className="text-[var(--text-muted)] mr-1.5">✕</span>
                    {row.agency}
                  </td>
                  <td className="p-5 text-[var(--text-secondary)]">
                    <span className="text-[var(--text-muted)] mr-1.5">~</span>
                    {row.fullTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </section>
  )
}
