import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { SyllabusDrawer, TrackData } from './SyllabusDrawer'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Sparkles, Terminal, Code2, ArrowRight, CheckCircle2, Users, Award, ShieldCheck } from 'lucide-react'

const TRACKS: TrackData[] = [
  {
    id: 'ai-agents',
    num: '01',
    title: 'Agentic AI & LLM Systems Engineering',
    tagline: 'Build autonomous multi-agent pipelines, vector search, and production AI apps.',
    audience: 'Developers, Tech Founders & AI Enthusiasts',
    duration: '6 Weeks (Live Mentorship)',
    schedule: 'Starts Next Month • 12 Seats',
    level: 'INTERMEDIATE TO ADVANCED',
    prerequisites: 'Basic Python familiarity. No prior AI/ML experience required.',
    color: 'rgba(226, 0, 26, 0.35)',
    modules: [
      {
        week: 'Week 01-02',
        title: 'LLM Foundations & Semantic Search',
        topics: ['Embeddings & Vector Databases (Pinecone, Qdrant)', 'Hybrid RAG architecture', 'Context optimization & token economics'],
        project: 'Domain-specific RAG Knowledge Engine with citation streaming',
      },
      {
        week: 'Week 03-04',
        title: 'Autonomous Multi-Agent Orchestration',
        topics: ['LangGraph & AutoGen frameworks', 'Tool calling & structured JSON outputs', 'Self-correcting code execution loops'],
        project: 'Autonomous Web Research & Market Intelligence Agent',
      },
      {
        week: 'Week 05-06',
        title: 'Production Deployment & Evaluation',
        topics: ['Latency optimization & LLM caching (Redis)', 'Evaluation benchmarks & prompt CI/CD', 'Dockerized FastAPI microservice deployment'],
        project: 'Production AI SaaS with user auth and billing ready for launch',
      },
    ],
  },
  {
    id: 'fullstack',
    num: '02',
    title: 'Modern Full-Stack & Cloud Architecture',
    tagline: 'From zero to high-performance SaaS applications deployed on cloud.',
    audience: 'Beginners, College Students & Career Switchers',
    duration: '8 Weeks (Zero to Deployment)',
    schedule: 'Starts Next Month • 12 Seats',
    level: 'BEGINNER TO JOB-READY',
    prerequisites: 'No prior coding experience required. We start from ground zero.',
    color: 'rgba(0, 210, 255, 0.35)',
    modules: [
      {
        week: 'Week 01-03',
        title: 'Modern Web Core & React 19 Ecosystem',
        topics: ['TypeScript fundamentals from scratch', 'Next.js App Router & Server Components', 'TailwindCSS & accessible component libraries'],
        project: 'Real-time collaborative workspace dashboard',
      },
      {
        week: 'Week 04-06',
        title: 'Backend Systems & PostgreSQL Database Design',
        topics: ['REST & GraphQL API design with Node / Go', 'PostgreSQL relational schemas & Prisma ORM', 'JWT authentication & role-based access control'],
        project: 'Multi-tenant B2B subscription platform with Stripe integration',
      },
      {
        week: 'Week 07-08',
        title: 'Cloud Infrastructure & DevOps CI/CD',
        topics: ['Docker containerization & AWS deployment', 'GitHub Actions automated testing pipelines', 'Vercel, AWS S3 and database backups'],
        project: 'Final Capstone Project: Live Production SaaS deployed to your domain',
      },
    ],
  },
  {
    id: 'dsa-systems',
    num: '03',
    title: 'Visual DSA & High-Throughput Systems',
    tagline: 'Master algorithms visually and build backend systems that scale to millions.',
    audience: 'CS Students & Software Engineers preparing for top roles',
    duration: '6 Weeks (Deep Dive)',
    schedule: 'Starts Next Month • 12 Seats',
    level: 'ALL LEVELS (ALGORITHMIC FOCUS)',
    prerequisites: 'Basic knowledge of any programming language (C++, Java, Python, or JS).',
    color: 'rgba(0, 245, 160, 0.35)',
    modules: [
      {
        week: 'Week 01-02',
        title: 'Visual Data Structures & Memory Optimization',
        topics: ['Dynamic Arrays, Linked Lists & Pointers', 'Trees, Heaps, and Trie architectures', 'Visual complexity profiling with DI Notes'],
        project: 'Custom In-Memory Cache Engine built from scratch',
      },
      {
        week: 'Week 03-04',
        title: 'Core Algorithms & Dynamic Programming',
        topics: ['Graph traversals (BFS, DFS, Dijkstra)', 'Dynamic programming pattern mastery', 'Bit manipulation & recursive backtracking'],
        project: 'Shortest Path & Network Route Optimizer Engine',
      },
      {
        week: 'Week 05-06',
        title: 'Distributed Systems & Concurrency',
        topics: ['Rate limiting, Load balancing & Caching strategies', 'Message queues (Kafka / RabbitMQ concepts)', 'System design interview blueprint'],
        project: 'High-throughput event queue handling 5,000+ msgs/sec',
      },
    ],
  },
]

export function TrainingRoadmap({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const { setCursorLabel } = useTheme()
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null)

  const handleEnroll = (trackId: string) => {
    setSelectedTrack(null)
    onScrollTo('contact')
  }

  return (
    <section
      id="training"
      className="py-20 md:py-28 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="training-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="04" label="TECH TRAINING ACADEMY" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( LIVE MENTORSHIP • 12 SEATS PER COHORT )
            </p>
          </ScrollReveal>
        </div>

        {/* Headline with Mixed Fonts */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2
              id="training-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14]"
            >
              Stop watching tutorials. <br />
              <span className="font-serif italic font-normal text-[var(--accent-primary)]">
                Build real systems.
              </span>
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[42ch] leading-relaxed">
              We teach modern engineering through live interactive code reviews, production capstones, and direct 1-on-1 mentorship.
            </p>
          </div>
        </ScrollReveal>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-12">
          {TRACKS.map((track, idx) => (
            <ScrollReveal key={track.id} delay={0.15 + idx * 0.1}>
              <SpotlightCard
                borderGlowColor={track.color}
                className="p-6 sm:p-7 rounded-xl border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-md flex flex-col justify-between h-full group hover:border-[var(--border-hover)] transition-all"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-mono text-xs font-bold text-[var(--accent-primary)] px-2.5 py-0.5 rounded-md bg-[var(--accent-glow)]">
                      TRACK {track.num}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {track.duration}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)] mb-2.5 leading-snug">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] font-normal leading-relaxed mb-5">
                    {track.tagline}
                  </p>

                  {/* Target Audience Pill */}
                  <div className="p-3 rounded-lg bg-[var(--bg-surface)]/80 border border-[var(--border-base)] text-xs font-mono text-[var(--text-primary)] mb-5 flex items-start gap-2">
                    <Users className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[var(--text-muted)] block text-[11px] mb-0.5">BEST SUITED FOR:</strong>
                      {track.audience}
                    </div>
                  </div>

                  {/* What you'll build */}
                  <div className="space-y-1.5 mb-5 text-xs font-mono text-[var(--text-secondary)]">
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-bold mb-2">
                      CAPSTONE HIGHLIGHTS:
                    </div>
                    {track.modules.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                        <span className="truncate">{m.project}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[var(--border-base)] flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      sound.playClick(850)
                      setSelectedTrack(track)
                    }}
                    onMouseEnter={() => setCursorLabel('SYLLABUS')}
                    onMouseLeave={() => setCursorLabel(null)}
                    className="btn-ghost w-full justify-center"
                  >
                    <span>VIEW FULL SYLLABUS</span>
                  </button>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Academy Guarantees */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-[var(--border-base)] font-mono text-xs text-[var(--text-muted)]">
            <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-[var(--bg-surface)]/70 border border-[var(--border-base)]">
              <Award className="w-4 h-4 text-[var(--accent-amber)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--text-primary)] block text-xs mb-1">Production Portfolio:</strong>
                Graduates build 3+ live, deployed applications to show potential employers or clients.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-[var(--bg-surface)]/70 border border-[var(--border-base)]">
              <Users className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--text-primary)] block text-xs mb-1">1-on-1 Code Mentorship:</strong>
                Every line of your project is reviewed with actionable feedback by experienced engineers.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-[var(--bg-surface)]/70 border border-[var(--border-base)]">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--text-primary)] block text-xs mb-1">Career & Interview Prep:</strong>
                Resume optimization, GitHub curation, and technical interview simulations.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Syllabus Drawer */}
      <SyllabusDrawer
        track={selectedTrack}
        onClose={() => setSelectedTrack(null)}
        onEnroll={handleEnroll}
      />
    </section>
  )
}
