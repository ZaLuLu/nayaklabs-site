import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { sound } from '../utils/audioEngine'
import {
  Cpu,
  GraduationCap,
  Shield,
  HelpCircle,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'

import { ServiceDrawer, ServiceData } from './ServiceDrawer'
import { SyllabusDrawer, TrackData } from './SyllabusDrawer'
import { ProcessModal } from './modals/ProcessModal'
import { FaqModal } from './modals/FaqModal'

// Pre-packaged service data
const DEFAULT_SERVICE: ServiceData = {
  id: 'ai',
  title: 'Custom AI & Smart Automation',
  category: '01 // AI ENGINEERING',
  tagline: 'Autonomous multi-agent pipelines, RAG systems, and customized LLM tools.',
  plainEnglishBenefit: 'Cut 20+ hours of manual processing and customer support every week.',
  description:
    'We build production AI systems that integrate directly with your proprietary data. From autonomous agentic workflows and semantic document search to real-time voice and vision bots, our solutions operate reliably in production with strict evaluation benchmarks.',
  deliverables: [
    'Custom LLM Agent Architectures (LangGraph / AutoGen)',
    'Hybrid Vector RAG Pipeline (Qdrant / pgvector)',
    'Automated Evaluation & Regression Test Matrix',
    'Production Dockerized FastAPI Microservice',
  ],
  techStack: ['Python', 'FastAPI', 'PyTorch', 'LangChain', 'pgvector', 'Docker', 'AWS'],
  icon: Cpu,
  color: 'rgba(226, 0, 26, 0.35)',
}

// Pre-packaged fellowship track data
const DEFAULT_TRACK: TrackData = {
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
      topics: ['Embeddings & Vector Databases (Qdrant, pgvector)', 'Hybrid RAG architecture', 'Context optimization & token economics'],
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
}

interface StudioHubProps {
  onScrollTo: (id: string) => void
}

export function StudioHub({ onScrollTo }: StudioHubProps) {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null)
  const [selectedTrack, setSelectedTrack] = useState<TrackData | null>(null)
  const [processOpen, setProcessOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(false)

  const handleApplyScope = () => {
    onScrollTo('contact')
  }

  const handleEnroll = () => {
    setSelectedTrack(null)
    onScrollTo('contact')
  }

  return (
    <section
      id="hub"
      className="py-20 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto transition-colors duration-300 relative border-t border-[var(--border-base)]"
      aria-label="Interactive Studio Modules"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-3">
        <ScrollReveal delay={0}>
          <SectionEyebrow index="04" label="ON-DEMAND STUDIO MODULES" />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
            ( CLICK ANY MODULE TO CONFIGURE & EXPAND )
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.14]">
            Capabilities, Syllabi & Policies. <br />
            <span className="font-serif italic font-normal text-[var(--accent-primary)]">
              One clean click
            </span>{' '}
            away.
          </h2>
          <p className="font-mono text-xs text-[var(--text-muted)] max-w-[42ch] leading-relaxed">
            Click on any module card below to configure delivery pods, view weekly fellowship tracks, inspect our 4-step roadmap, or read FAQs.
          </p>
        </div>
      </ScrollReveal>

      {/* The 4 Core Interactive Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Custom Services & Pod Estimator */}
        <ScrollReveal delay={0.12}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 sm:p-8 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl flex flex-col justify-between h-full group hover:border-[var(--accent-primary)] transition-all relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-[var(--accent-primary)] border border-[var(--border-base)]">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[var(--accent-primary)] px-2.5 py-0.5 rounded-md bg-[var(--accent-glow)]">
                  01 // SERVICES
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-2.5">
                Custom AI & Software Engineering
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Custom LLM agent pipelines, high-velocity Next.js web applications, and backend automations with 100% IP transfer.
              </p>

              <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>Interactive Pod Estimator (Sprint, Pod, Squad)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>18-Day Average MVP Sprints</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(900)
                setSelectedService(DEFAULT_SERVICE)
              }}
              className="w-full py-3.5 px-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-xs font-mono font-bold text-[var(--text-primary)] group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all flex items-center justify-between cursor-pointer"
            >
              <span>CONFIGURE SCOPE & POD</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </ScrollReveal>

        {/* Module 2: Engineering Fellowship */}
        <ScrollReveal delay={0.18}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 sm:p-8 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl flex flex-col justify-between h-full group hover:border-[var(--accent-cyan)] transition-all relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-[var(--accent-cyan)] border border-[var(--border-base)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[var(--accent-cyan)] px-2.5 py-0.5 rounded-md bg-cyan-500/10">
                  02 // FELLOWSHIP
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-2.5">
                Engineering Mentorship & Academy
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Intensive mentorship in Agentic AI, modern full-stack cloud systems, and visual DSA. Built for engineers who want to ship production code.
              </p>

              <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>3 Tracks: Agentic AI, Cloud SaaS, Visual DSA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>Strictly 12 Seats per Cohort</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(900)
                setSelectedTrack(DEFAULT_TRACK)
              }}
              className="w-full py-3.5 px-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-xs font-mono font-bold text-[var(--text-primary)] group-hover:border-[var(--accent-cyan)] group-hover:bg-[var(--accent-cyan)] group-hover:text-black transition-all flex items-center justify-between cursor-pointer"
            >
              <span>INSPECT FULL SYLLABUS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </ScrollReveal>

        {/* Module 3: 4-Step Operating Model */}
        <ScrollReveal delay={0.24}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 sm:p-8 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl flex flex-col justify-between h-full group hover:border-amber-400 transition-all relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-amber-400 border border-[var(--border-base)]">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-md bg-amber-500/10">
                  03 // OPERATING MODEL
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-2.5">
                The 4-Step Client Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                From plain-English discovery to interactive prototype in 5 days, production engineering, and 100% IP transfer.
              </p>

              <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>Fixed-Price Sprints & Milestone Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>Zero Vendor Lock-In • Full Git Transfer</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(900)
                setProcessOpen(true)
              }}
              className="w-full py-3.5 px-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-xs font-mono font-bold text-[var(--text-primary)] group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all flex items-center justify-between cursor-pointer"
            >
              <span>VIEW SPRINT ROADMAP</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </ScrollReveal>

        {/* Module 4: Transparent FAQ & Policies */}
        <ScrollReveal delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-7 sm:p-8 rounded-3xl border border-[var(--border-base)] bg-[var(--bg-card)]/90 backdrop-blur-xl flex flex-col justify-between h-full group hover:border-purple-400 transition-all relative overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-purple-400 border border-[var(--border-base)]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-purple-400 px-2.5 py-0.5 rounded-md bg-purple-500/10">
                  04 // TRANSPARENCY
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-2.5">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Transparent answers regarding mutual NDAs, code rights, timelines, ongoing retainers, and beginner prerequisites.
              </p>

              <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>Pre-Call Mutual NDA Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-emerald)] shrink-0" />
                  <span>30 Days Post-Launch Support Included</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(900)
                setFaqOpen(true)
              }}
              className="w-full py-3.5 px-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-xs font-mono font-bold text-[var(--text-primary)] group-hover:border-purple-400 group-hover:bg-purple-400 group-hover:text-black transition-all flex items-center justify-between cursor-pointer"
            >
              <span>READ ALL 6 FAQS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Modals & Drawers */}
      <ServiceDrawer
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onApplyScope={handleApplyScope}
      />

      <SyllabusDrawer
        track={selectedTrack}
        onClose={() => setSelectedTrack(null)}
        onEnroll={handleEnroll}
      />

      <ProcessModal
        isOpen={processOpen}
        onClose={() => setProcessOpen(false)}
        onStartProject={() => onScrollTo('contact')}
      />

      <FaqModal
        isOpen={faqOpen}
        onClose={() => setFaqOpen(false)}
        onContact={() => onScrollTo('contact')}
      />
    </section>
  )
}
