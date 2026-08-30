import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import confetti from 'canvas-confetti'
import { Terminal, Check, Play, BookOpen, Layers, Rocket, ShieldCheck } from 'lucide-react'

const PHASES = [
  {
    num: '01',
    phase: 'Learn',
    title: 'Foundations & Mental Models',
    desc: 'Programming fundamentals, discrete math, systems thinking, and AI/ML architectures — interactive from day one.',
    icon: BookOpen,
  },
  {
    num: '02',
    phase: 'Practice',
    title: 'Drills & Algorithmic Reps',
    desc: 'Daily problem sets, automated testing suites, and guided algorithmic challenges that compound into deep intuition.',
    icon: Layers,
  },
  {
    num: '03',
    phase: 'Build',
    title: 'Portfolio-Grade Systems',
    desc: 'Ship production-grade AI agents, full-stack platforms, and distributed systems with senior engineer code reviews.',
    icon: Terminal,
  },
  {
    num: '04',
    phase: 'Deploy',
    title: 'Production CI/CD & MLOps',
    desc: 'Go live on cloud infrastructure. CI/CD pipelines, observability, rate limiting, and the ops muscle to run what you build.',
    icon: Rocket,
  },
]

const CURRICULUM_TRACKS = [
  {
    id: 'aiml',
    name: 'AI / ML & LLMs',
    topics: ['Custom Fine-tuning', 'RAG & Vector Embeddings', 'Agentic Workflows & Evals', 'Local Model Inference (Ollama/vLLM)'],
  },
  {
    id: 'dsa',
    name: 'Algorithms & DSA',
    topics: ['Recursion & Trees', 'Dynamic Programming', 'Graph Theory & Shortest Paths', 'System Concurrency'],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Architecture',
    topics: ['Next.js 15 & React Server Components', 'PostgreSQL & pgvector', 'Event-Driven Microservices', 'Tailwind & Motion Systems'],
  },
  {
    id: 'ops',
    name: 'DevOps & MLOps',
    topics: ['Docker & Container Orchestration', 'GitHub Actions CI/CD', 'Prometheus & Grafana Monitoring', 'Edge Caching & Cloudflare Workers'],
  },
]

export function TrainingRoadmap() {
  const { setCursorLabel } = useTheme()
  const [activeTrack, setActiveTrack] = useState(CURRICULUM_TRACKS[0])
  const [codeAnswer, setCodeAnswer] = useState<string>('arr.sort((a, b) => a - b)')
  const [testResult, setTestResult] = useState<'idle' | 'running' | 'passed'>('idle')

  const handleRunChallenge = () => {
    sound.playClick(950)
    setTestResult('running')
    setTimeout(() => {
      setTestResult('passed')
      sound.playSuccess(0.08)
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
      })
    }, 600)
  }

  return (
    <section
      id="training"
      className="min-h-screen py-28 md:py-36 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="training-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-12 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="03" label="TECH TRAINING" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>COHORT #4 ENROLLING · 12 SEATS REMAINING</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Section Headline */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <h2
              id="training-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Learn the loop.<br />Ship the work.
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[42ch] leading-relaxed">
              A structured, cohort-based curriculum from foundational computer science to live deployed AI models. Taught exclusively by engineers who ship every week.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Step Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {PHASES.map((p, idx) => {
            const Icon = p.icon
            return (
              <ScrollReveal key={p.num} delay={0.15 + idx * 0.08}>
                <SpotlightCard
                  borderGlowColor="rgba(226, 0, 26, 0.3)"
                  className="p-6 h-full flex flex-col justify-between rounded-sm border-[var(--border-base)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm font-bold text-[var(--accent-primary,#E2001A)]">
                        {p.num}
                      </span>
                      <Icon className="w-4 h-4 text-[var(--text-muted)]" />
                    </div>

                    <p className="font-mono text-[0.68rem] tracking-wider text-[var(--text-muted)] uppercase mb-1">
                      PHASE {p.num} // {p.phase}
                    </p>

                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)] mb-3">
                      {p.title}
                    </h3>

                    <p className="text-[var(--text-muted)] text-xs leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Interactive Curriculum Explorer + Mini Code Challenge */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-[var(--border-base)] bg-[var(--bg-card)] p-6 md:p-8 rounded-sm">
            {/* Left: Tracks Explorer */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[0.68rem] tracking-widest text-[var(--text-muted)] uppercase mb-3 block">
                  // DEEP-DIVE SYLLABUS
                </span>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Engineered for builders, not test-takers.
                </h3>

                {/* Track Selector Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {CURRICULUM_TRACKS.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        sound.playClick(900)
                        setActiveTrack(track)
                      }}
                      className={`px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer rounded-xs ${
                        activeTrack.id === track.id
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                          : 'bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {track.name}
                    </button>
                  ))}
                </div>

                {/* Topic Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {activeTrack.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-base)] flex items-center gap-4">
                <a
                  href="#contact"
                  onClick={() => sound.playClick(800)}
                  onMouseEnter={() => setCursorLabel('APPLY')}
                  onMouseLeave={() => setCursorLabel(null)}
                  className="btn-primary text-xs py-2.5 px-5"
                >
                  APPLY FOR COHORT SEAT →
                </a>
              </div>
            </div>

            {/* Right: Live Interactive Mini Code Challenge */}
            <div className="lg:col-span-6 bg-[var(--bg-surface)] border border-[var(--border-base)] p-5 flex flex-col justify-between rounded-sm">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-base)]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                      MINI-CHALLENGE // ARRAY NORMALIZATION
                    </span>
                  </div>
                  <span className="font-mono text-[0.62rem] text-[var(--text-muted)]">TYPESCRIPT</span>
                </div>

                <p className="font-mono text-xs text-[var(--text-muted)] mb-3">
                  Task: Return an array of sorted integers in ascending order.
                </p>

                <div className="bg-[var(--bg-card)] border border-[var(--border-base)] p-3 rounded-xs font-mono text-xs text-[var(--text-primary)] mb-3">
                  <div className="text-[var(--text-muted)] mb-1">// Write your solution:</div>
                  <input
                    type="text"
                    value={codeAnswer}
                    onChange={(e) => setCodeAnswer(e.target.value)}
                    className="w-full bg-transparent border-none text-emerald-600 dark:text-emerald-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                {testResult === 'passed' && (
                  <div className="p-2.5 mb-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs flex items-center gap-2 rounded-xs">
                    <Check className="w-4 h-4" />
                    <span>TEST SUITE PASSED (3/3 tests in 0.04ms)</span>
                  </div>
                )}

                <button
                  onClick={handleRunChallenge}
                  disabled={testResult === 'running'}
                  className="w-full py-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-mono text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer rounded-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{testResult === 'running' ? 'EXECUTING TEST HARNESS...' : 'RUN VERIFICATION TEST'}</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
