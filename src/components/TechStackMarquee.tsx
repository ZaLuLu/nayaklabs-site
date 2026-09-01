import { motion } from 'framer-motion'
import { Cpu, Zap, Shield, Sparkles, Code2, Database, Terminal, Layers } from 'lucide-react'

const BADGES = [
  { icon: Sparkles, text: 'Custom AI & LLM Systems', color: 'text-[var(--accent-primary)]', bg: 'bg-[var(--accent-glow)]' },
  { icon: Zap, text: '2-4 Week MVP Delivery', color: 'text-[var(--accent-amber)]', bg: 'bg-amber-500/10' },
  { icon: Code2, text: 'Next.js & TypeScript', color: 'text-[var(--accent-cyan)]', bg: 'bg-cyan-500/10' },
  { icon: Cpu, text: 'PyTorch & LangChain', color: 'text-[var(--accent-emerald)]', bg: 'bg-emerald-500/10' },
  { icon: Shield, text: '100% Code Ownership', color: 'text-[var(--accent-primary)]', bg: 'bg-[var(--accent-glow)]' },
  { icon: Database, text: 'PostgreSQL & Vector DBs', color: 'text-[var(--accent-cyan)]', bg: 'bg-cyan-500/10' },
  { icon: Terminal, text: 'FastAPI & Python Pipelines', color: 'text-[var(--accent-amber)]', bg: 'bg-amber-500/10' },
  { icon: Layers, text: 'Live Cohort Mentorship', color: 'text-[var(--accent-emerald)]', bg: 'bg-emerald-500/10' },
]

export function TechStackMarquee() {
  return (
    <div className="relative w-full border-y border-[var(--border-base)] bg-[var(--bg-card)]/50 backdrop-blur-sm overflow-hidden py-4 select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {[...BADGES, ...BADGES].map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-colors duration-200"
            >
              <div className={`p-1 rounded-full ${item.bg}`}>
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
              <span className="font-mono text-xs font-semibold tracking-wide text-[var(--text-primary)] whitespace-nowrap">
                {item.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
