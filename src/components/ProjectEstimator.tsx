import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { AnimatedBeam } from './ui/AnimatedBeam'
import {
  Cpu,
  Globe,
  Workflow,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Zap,
  Terminal,
  Play,
  Layers,
} from 'lucide-react'

type ProjectType = 'ai' | 'saas' | 'automation'
type ProjectStage = 'idea' | 'figma' | 'codebase'
type ProjectSpeed = 'fast' | 'production'

const PRESET_IDEAS = [
  {
    label: '🤖 AI WhatsApp Support Agent (RAG)',
    prompt: 'Autonomous WhatsApp customer support agent that searches internal PDF manuals and books appointments.',
  },
  {
    label: '🚀 Multi-Tenant SaaS + Stripe',
    prompt: 'B2B subscription software with team workspaces, role-based auth, and Stripe metered billing.',
  },
  {
    label: '⚡ Real-Time Price Scraper & Alerts',
    prompt: 'Distributed web scraper that tracks competitor prices every 15 minutes and sends instant Slack alerts.',
  },
]

// Smart Keyword-Matching Parser for 100% Real Technical Accuracy
function parsePromptArchitecture(promptText: string) {
  const p = promptText.toLowerCase()

  if (p.includes('whatsapp') || p.includes('voice') || p.includes('call') || p.includes('bot') || p.includes('chat')) {
    return {
      title: 'Autonomous AI Agent & Messaging Pipeline',
      stack: ['WhatsApp Cloud API', 'Python FastAPI', 'LangGraph', 'Whisper / ElevenLabs', 'Qdrant Vector DB', 'Postgres'],
      timeline: '18 Days',
      team: '2 Senior Engineers + AI Architect',
      nodes: ['WhatsApp API', 'FastAPI Gateway', 'LangGraph Engine', 'Claude 3.5 Sonnet', 'PostgreSQL'],
      latency: '< 85ms (Streaming)',
    }
  }

  if (p.includes('scrape') || p.includes('crawler') || p.includes('monitor') || p.includes('price') || p.includes('alert')) {
    return {
      title: 'Distributed Scraping & Alert Pipeline',
      stack: ['Python Playwright', 'Celery Workers', 'Redis Queue', 'TimescaleDB', 'FastAPI', 'Docker'],
      timeline: '14 Days',
      team: '1 Backend & Automation Architect',
      nodes: ['Playwright Cluster', 'Redis Queue', 'FastAPI Service', 'TimescaleDB', 'Slack / Webhooks'],
      latency: '< 15ms (Queue-driven)',
    }
  }

  if (p.includes('mobile') || p.includes('ios') || p.includes('android')) {
    return {
      title: 'Cross-Platform Mobile & Cloud SaaS',
      stack: ['React Native (Expo)', 'Next.js 15', 'Supabase Auth', 'PostgreSQL', 'Tailwind CSS'],
      timeline: '21 Days',
      team: '2 Senior Mobile & Cloud Engineers',
      nodes: ['Expo Mobile App', 'Edge API Gateway', 'Supabase Auth', 'Postgres DB', 'Push Notifications'],
      latency: '< 45ms (Edge Cached)',
    }
  }

  if (p.includes('pdf') || p.includes('rag') || p.includes('search') || p.includes('docs') || p.includes('knowledge')) {
    return {
      title: 'Enterprise Semantic RAG Knowledge Engine',
      stack: ['Qdrant Vector DB', 'pgvector', 'FastAPI', 'Hybrid BM25 Search', 'Claude 3.5 Sonnet', 'Docker'],
      timeline: '18 Days',
      team: '2 Senior AI Engineers',
      nodes: ['Document Ingest', 'Qdrant Vector DB', 'Hybrid RAG Retriever', 'Claude 3.5', 'Client API'],
      latency: '< 120ms (Hybrid Search)',
    }
  }

  // Default Full-Stack SaaS Architecture
  return {
    title: 'High-Velocity SaaS Web Application',
    stack: ['Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe Billing', 'FastAPI'],
    timeline: '18–21 Days',
    team: '2 Senior Full-Stack Engineers',
    nodes: ['Next.js 15 App', 'Edge Middleware', 'Stripe Billing', 'Postgres DB', 'Cloudflare CDN'],
    latency: '< 35ms (Edge CDN)',
  }
}

export function ProjectEstimator() {
  const { setActiveBrief } = useTheme()
  const [mode, setMode] = useState<'prompt' | 'selector'>('prompt')

  // Prompt Mode State
  const [inputPrompt, setInputPrompt] = useState(PRESET_IDEAS[0].prompt)
  const [isCompiling, setIsCompiling] = useState(false)

  // Selector Mode State
  const [projectType, setProjectType] = useState<ProjectType>('ai')
  const [projectStage, setProjectStage] = useState<ProjectStage>('idea')
  const [projectSpeed, setProjectSpeed] = useState<ProjectSpeed>('fast')

  const typeConfig = {
    ai: {
      label: 'Autonomous AI / LLM Agent',
      icon: Cpu,
      desc: 'RAG pipelines, custom agent loops, vector search, or voice/vision bots.',
      baseWeeks: 3,
    },
    saas: {
      label: 'Full-Stack Web & Mobile App',
      icon: Globe,
      desc: 'Next.js 15, React Native, Postgres, Stripe, auth & modern UI.',
      baseWeeks: 3,
    },
    automation: {
      label: 'Internal Ops & Automation',
      icon: Workflow,
      desc: 'ETL pipelines, scraper bots, CRM integrations, and back-office tools.',
      baseWeeks: 2,
    },
  }

  const stageConfig = {
    idea: { label: 'Idea / Notes', addWeeks: 1, desc: 'We shape the wireframes & technical architecture.' },
    figma: { label: 'Figma Ready', addWeeks: 0, desc: 'Ready for immediate front-end & back-end sprint.' },
    codebase: { label: 'Existing Codebase', addWeeks: 1, desc: 'Refactoring, new AI features, or scaling existing infra.' },
  }

  const speedConfig = {
    fast: { label: 'Fast MVP Sprint', team: '2 Senior Engineers', target: 'Working software in 2–3 weeks' },
    production: { label: 'Production Pod', team: '4-Engineer Dedicated Pod', target: 'Complete enterprise app in 4–6 weeks' },
  }

  // Dynamic Blueprint Resolution
  const activeBlueprint = useMemo(() => {
    if (mode === 'prompt') {
      return parsePromptArchitecture(inputPrompt)
    } else {
      const base = typeConfig[projectType].baseWeeks
      const stageAdd = stageConfig[projectStage].addWeeks
      const raw = (base + stageAdd) * (projectSpeed === 'production' ? 1.4 : 1)
      const weeks = Math.max(2, Math.round(raw))
      return {
        title: typeConfig[projectType].label,
        stack: ['Next.js 15', 'FastAPI', 'LangGraph / RAG', 'PostgreSQL', 'Stripe', 'Docker'],
        timeline: `~${weeks} Weeks`,
        team: speedConfig[projectSpeed].team,
        nodes: ['Client App', 'Edge API', 'AI & Business Logic', 'Database', '100% Git'],
        latency: '< 45ms (Production SLA)',
      }
    }
  }, [mode, inputPrompt, projectType, projectStage, projectSpeed])

  const handleRunCompile = () => {
    sound.playClick(1050)
    setIsCompiling(true)
    setTimeout(() => {
      setIsCompiling(false)
      sound.playSuccess(0.06)
    }, 450)
  }

  const handleSendWhatsApp = () => {
    sound.playClick(950)
    const text = encodeURIComponent(
      `Hey Suraj Nayak, I generated an Architecture & Sprint Blueprint on Nayak Labs:\n\n` +
      `• Project: ${activeBlueprint.title}\n` +
      `• Concept: ${inputPrompt}\n` +
      `• Stack: ${activeBlueprint.stack.join(', ')}\n` +
      `• Timeline: ${activeBlueprint.timeline} (${activeBlueprint.team})\n\n` +
      `Let's connect to discuss kickoff availability!`
    )
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank')
  }

  const handleApplyToForm = () => {
    sound.playSuccess(0.06)
    const formatted = `ARCHITECTURE & SPRINT BLUEPRINT:\nProject: ${activeBlueprint.title}\nDetails: ${inputPrompt}\nStack: ${activeBlueprint.stack.join(', ')}\nSprint: ${activeBlueprint.timeline} (${activeBlueprint.team})\nINCLUDED: 100% Source Code Transfer, Architecture Blueprint, Staging Previews, & 30-Day Support Guarantee.`
    setActiveBrief(formatted)
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="estimator"
      className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto border-t border-[var(--border-base)] transition-colors duration-300 relative"
      aria-labelledby="estimator-headline"
    >
      {/* Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
        <ScrollReveal delay={0}>
          <SectionEyebrow index="02" label="ARCHITECTURE & SPRINT ESTIMATOR" />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            ( TYPE ANY IDEA OR CHOOSE PRESETS • REAL ESTIMATES )
          </p>
        </ScrollReveal>
      </div>

      {/* Headline with Mixed Fonts */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              id="estimator-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14] mb-3"
            >
              Turn your vision into a{' '}
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                production sprint
              </span>.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl">
              Type your idea or select project parameters below to see the exact tech stack, microservice dataflow, and sprint timeline.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="p-1 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] font-mono text-xs flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                sound.playClick(850)
                setMode('prompt')
              }}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                mode === 'prompt'
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              ⚡ AI Prompt to Architecture
            </button>
            <button
              onClick={() => {
                sound.playClick(850)
                setMode('selector')
              }}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                mode === 'selector'
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              ⚙️ 3-Click Selector
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Grid: Input Controls + Live Interactive Architecture Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Input Pane */}
        <div className="lg:col-span-6 space-y-6">
          {mode === 'prompt' ? (
            <ScrollReveal delay={0.12}>
              <div className="p-6 sm:p-7 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl shadow-xl space-y-5">
                <div>
                  <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2.5 font-bold">
                    Quick Preset Concepts:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IDEAS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          sound.playClick(850)
                          setInputPrompt(preset.prompt)
                          handleRunCompile()
                        }}
                        className="px-3 py-1.5 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--accent-primary)] font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer text-left"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider font-bold">
                    Describe What You Want to Build:
                  </label>
                  <textarea
                    rows={3}
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder="e.g. AI WhatsApp support bot that searches internal PDF manuals and books meetings..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors font-mono text-xs leading-relaxed"
                  />
                  <button
                    onClick={handleRunCompile}
                    disabled={isCompiling || !inputPrompt.trim()}
                    className="btn-primary w-full justify-center py-3 text-xs cursor-pointer"
                  >
                    {isCompiling ? (
                      <span>COMPILING BLUEPRINT...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        COMPILE ARCHITECTURE BLUEPRINT
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.12}>
              <div className="space-y-6">
                {/* Step 1: Project Type */}
                <div>
                  <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2.5 font-bold">
                    1. What are you building?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(['ai', 'saas', 'automation'] as const).map((type) => {
                      const cfg = typeConfig[type]
                      const isSelected = projectType === type
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            sound.playClick(850)
                            setProjectType(type)
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[var(--accent-primary)] bg-[var(--bg-card)] shadow-md ring-1 ring-[var(--accent-primary)]'
                              : 'border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          <div className="font-display font-bold text-xs text-[var(--text-primary)] mb-1">
                            {cfg.label}
                          </div>
                          <div className="text-[10px] text-[var(--text-secondary)]">
                            ~{cfg.baseWeeks} Wks
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 2: Project Stage */}
                <div>
                  <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2.5 font-bold">
                    2. Current stage:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(['idea', 'figma', 'codebase'] as const).map((stage) => {
                      const cfg = stageConfig[stage]
                      const isSelected = projectStage === stage
                      return (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => {
                            sound.playClick(850)
                            setProjectStage(stage)
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[var(--accent-primary)] bg-[var(--bg-card)] shadow-md ring-1 ring-[var(--accent-primary)]'
                              : 'border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          <div className="font-display font-bold text-xs text-[var(--text-primary)]">
                            {cfg.label}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: Speed & Pod */}
                <div>
                  <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2.5 font-bold">
                    3. Team Pod:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(['fast', 'production'] as const).map((speed) => {
                      const cfg = speedConfig[speed]
                      const isSelected = projectSpeed === speed
                      return (
                        <button
                          key={speed}
                          type="button"
                          onClick={() => {
                            sound.playClick(850)
                            setProjectSpeed(speed)
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[var(--accent-primary)] bg-[var(--bg-card)] shadow-md ring-1 ring-[var(--accent-primary)]'
                              : 'border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          <div className="font-display font-bold text-xs text-[var(--text-primary)]">
                            {cfg.label}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)] font-mono">
                            {cfg.team}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Right Output: Architecture Blueprint & Animated Beam Topology */}
        <div className="lg:col-span-6">
          <ScrollReveal delay={0.18}>
            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-base)]">
                <div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                    PRODUCTION BLUEPRINT
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {activeBlueprint.title}
                  </h3>
                </div>
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-[var(--accent-emerald)] font-bold">
                  ● ACTIVE CAPACITY
                </span>
              </div>

              {/* Animated Beam Dataflow Topology */}
              <div>
                <div className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3 font-bold">
                  Microservice Dataflow Topology:
                </div>
                <div className="flex flex-wrap items-center gap-1 p-3.5 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60">
                  {activeBlueprint.nodes.map((node, i) => (
                    <div key={i} className="flex items-center">
                      <span className="px-2.5 py-1.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-card)] font-mono text-[11px] font-bold text-[var(--text-primary)] shadow-xs">
                        {node}
                      </span>
                      {i < activeBlueprint.nodes.length - 1 && (
                        <AnimatedBeam />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack & Sprint Metrics Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Tech Stack */}
                <div className="p-4 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]">
                  <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase mb-2 font-bold">
                    Production Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeBlueprint.stack.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-base)] font-mono text-[10px] text-[var(--text-primary)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Duration & Team */}
                <div className="p-4 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)] flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase mb-1 font-bold">
                      Sprint Timeline:
                    </div>
                    <div className="font-display font-extrabold text-2xl text-[var(--accent-primary)]">
                      {activeBlueprint.timeline}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-[var(--text-secondary)] mt-2">
                    Team: <strong>{activeBlueprint.team}</strong>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[var(--text-secondary)] pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>100% IP & Git Transfer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>30-Day Support Guarantee</span>
                </div>
              </div>

              {/* Actions: WhatsApp Fast-Track + Inquiry Form Sync */}
              <div className="space-y-2.5 pt-4 border-t border-[var(--border-base)]">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-black font-mono font-bold text-xs hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>SEND BLUEPRINT ON WHATSAPP TO SURAJ NAYAK</span>
                </button>

                <button
                  onClick={handleApplyToForm}
                  className="btn-primary w-full justify-center py-3 text-xs cursor-pointer"
                >
                  <span>LOCK IN BLUEPRINT & INQUIRE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
