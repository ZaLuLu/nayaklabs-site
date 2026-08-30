import { useState } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { SpotlightCard } from './SpotlightCard'
import { InstagramCardModal } from './InstagramCardModal'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Sparkles } from 'lucide-react'

interface NoteItem {
  id: string
  format: 'THREAD' | 'VIDEO' | 'NOTE' | 'GUIDE' | 'LIVE' | 'CASE' | 'SHORT' | 'WRAP'
  headline: string
  handle: string
  daysAgo: string
  readTime: string
  tags: string[]
  bodyContent: string
}

const FIELD_NOTES: NoteItem[] = [
  {
    id: 'n1',
    format: 'THREAD',
    headline: '5 ways agents fail in production — and the eval strategies that caught them.',
    handle: '@NAYAKLABS',
    daysAgo: '4D',
    readTime: '3 min read',
    tags: ['AI Agents', 'Evals', 'Production'],
    bodyContent:
      'Most multi-agent frameworks look great in local demos but unravel when subjected to non-deterministic edge cases. In this breakdown, we detail the 5 failure modes we encountered and the automated pytest-style evaluation matrix that prevented regressions.',
  },
  {
    id: 'n2',
    format: 'VIDEO',
    headline: 'Build a RAG app in 7 minutes. No fluff, no placeholder data.',
    handle: '@NAYAKLABS',
    daysAgo: '17D',
    readTime: '7 min watch',
    tags: ['RAG', 'Postgres', 'Vector Search'],
    bodyContent:
      'Step-by-step video architectural walkthrough showing how to spin up pgvector, generate normalized embeddings, and implement reciprocal rank fusion for real-time document search with zero external SaaS subscriptions.',
  },
  {
    id: 'n3',
    format: 'NOTE',
    headline: 'Why we stopped prompting and started evaluating. A DI Notes teardown.',
    handle: '@NAYAKLABS',
    daysAgo: '30D',
    readTime: '5 min read',
    tags: ['DI Notes', 'LLM Evals', 'Architecture'],
    bodyContent:
      'Prompt engineering reaches a ceiling rapidly when generating mathematical visualizations. Here is why we switched our entire prompt pipeline to strict schema generation with automated validation gates.',
  },
  {
    id: 'n4',
    format: 'GUIDE',
    headline: "The DSA questions we've seen most — ranked by company and updated weekly.",
    handle: '@NAYAKLABS',
    daysAgo: '43D',
    readTime: '8 min read',
    tags: ['DSA', 'Interviews', 'Tech Training'],
    bodyContent:
      'A continuously curated analysis of technical interview patterns across top product companies in India and the US, categorizing questions by graph traversal, dynamic programming, and concurrency.',
  },
  {
    id: 'n5',
    format: 'LIVE',
    headline: 'Office hours: shipping EventMesh filters with vector search. Replay inside.',
    handle: '@NAYAKLABS',
    daysAgo: '56D',
    readTime: '45 min stream',
    tags: ['EventMesh', 'Full-Stack', 'Live Code'],
    bodyContent:
      'Recorded deep-dive session walking through the real-time indexing pipeline of EventMesh, geo-distance querying, and how we handle multi-source event deduplication.',
  },
  {
    id: 'n6',
    format: 'CASE',
    headline: 'How a 4-person ops team replaced 9 SaaS tools with one automation.',
    handle: '@NAYAKLABS',
    daysAgo: '9D',
    readTime: '4 min read',
    tags: ['Automation', 'Services', 'Internal Tools'],
    bodyContent:
      'A breakdown of how Nayak Labs designed a unified workflow engine for a fast-scaling client, replacing disjointed CRM and invoicing subscriptions with an internal Postgres-driven orchestration hub.',
  },
  {
    id: 'n7',
    format: 'SHORT',
    headline: 'Structured JSON schema outputs vs freeform LLM generation.',
    handle: '@NAYAKLABS',
    daysAgo: '22D',
    readTime: '1 min read',
    tags: ['Schema', 'Short', 'AI'],
    bodyContent:
      'The exact system prompt architecture and schema guardrail configuration that guaranteed 100% deterministic type parsing across our interactive computational tools.',
  },
  {
    id: 'n8',
    format: 'WRAP',
    headline: 'What we built this month across DI Notes, EventMesh, and Academy.',
    handle: '@NAYAKLABS',
    daysAgo: '35D',
    readTime: '4 min read',
    tags: ['Ecosystem', 'Changelog', 'Monthly'],
    bodyContent:
      'Comprehensive public shipping log covering v2.1 releases across our 2 flagship products, training cohort metrics, and open-source contributions.',
  },
]

export function FieldNotesGrid() {
  const { setCursorLabel } = useTheme()
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL')
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null)
  const [socialModalData, setSocialModalData] = useState<{ open: boolean; headline: string; format: string }>({
    open: false,
    headline: '',
    format: 'SHORT',
  })

  const filteredNotes = selectedFormat === 'ALL'
    ? FIELD_NOTES
    : FIELD_NOTES.filter((n) => n.format === selectedFormat)

  const openSocialCard = (note: NoteItem, e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playClick(950)
    setSocialModalData({
      open: true,
      headline: note.headline,
      format: note.format,
    })
  }

  return (
    <section
      id="notes"
      className="min-h-screen py-28 md:py-36 relative border-t border-[var(--border-base)] transition-colors duration-300"
      aria-labelledby="notes-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-12 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="05" label="FIELD NOTES" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              ( 8 PRODUCTION DISPATCHES )
            </p>
          </ScrollReveal>
        </div>

        {/* Section Headline */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2
              id="notes-headline"
              className="text-section-h font-display font-bold text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Learn with us<br />in the open.
            </h2>
            <p className="font-mono text-xs text-[var(--text-muted)] max-w-[42ch] leading-relaxed">
              Short-form breakdowns, engineering teardowns, and video deep-dives shipped weekly across our builder community.
            </p>
          </div>
        </ScrollReveal>

        {/* Format Filter Bar */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-[var(--border-base)]">
            {['ALL', 'THREAD', 'VIDEO', 'NOTE', 'GUIDE', 'LIVE', 'CASE', 'SHORT', 'WRAP'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => {
                  sound.playClick(850)
                  setSelectedFormat(fmt)
                }}
                className={`px-3 py-1 font-mono text-xs transition-colors cursor-pointer rounded-xs ${
                  selectedFormat === fmt
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                    : 'bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Dense Editorial Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note, idx) => (
            <ScrollReveal key={note.id} delay={0.1 + idx * 0.05}>
              <SpotlightCard
                onClick={() => {
                  sound.playClick(900)
                  setSelectedNote(note)
                }}
                onMouseEnter={() => setCursorLabel('READ')}
                onMouseLeave={() => setCursorLabel(null)}
                borderGlowColor="rgba(255, 255, 255, 0.25)"
                className="p-6 h-full flex flex-col justify-between rounded-sm border-[var(--border-base)] cursor-pointer group transition-all"
              >
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between font-mono text-[0.65rem] text-[var(--text-muted)] mb-4 pb-3 border-b border-[var(--border-base)]">
                    <span className="font-bold text-[var(--text-primary)] tracking-widest uppercase">
                      {note.format}
                    </span>
                    <span>{note.daysAgo}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-display text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary,#E2001A)] transition-colors leading-snug mb-4">
                    {note.headline}
                  </h3>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {note.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[var(--bg-surface)] font-mono text-[0.58rem] text-[var(--text-muted)] rounded-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Strip */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-base)] font-mono text-[0.62rem] text-[var(--text-muted)]">
                    <span>{note.readTime}</span>
                    <button
                      onClick={(e) => openSocialCard(note, e)}
                      title="Open 1:1 Social Card"
                      className="p-1 hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-[var(--accent-primary,#E2001A)]" />
                      <span>CARD</span>
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Note Reader Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
          <div
            onClick={() => setSelectedNote(null)}
            className="absolute inset-0"
          />
          <div className="relative z-10 w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-base)] p-6 md:p-8 rounded-sm shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-base)] font-mono text-xs text-[var(--text-muted)]">
              <span className="font-bold text-[var(--text-primary)] uppercase">{selectedNote.format} DISPATCH</span>
              <span>{selectedNote.daysAgo}</span>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4">
                {selectedNote.headline}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light whitespace-pre-line mb-6">
                {selectedNote.bodyContent}
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedNote.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-[var(--bg-surface)] font-mono text-xs text-[var(--text-secondary)] rounded-xs">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-base)]">
              <button
                onClick={(e) => {
                  setSelectedNote(null)
                  openSocialCard(selectedNote, e)
                }}
                className="btn-ghost text-xs py-2 px-4 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary,#E2001A)]" />
                <span>GENERATE 1:1 SOCIAL CARD</span>
              </button>

              <button
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-mono text-xs font-bold hover:opacity-90 cursor-pointer rounded-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instagram 1:1 Social Card Modal */}
      <InstagramCardModal
        isOpen={socialModalData.open}
        onClose={() => setSocialModalData({ ...socialModalData, open: false })}
        initialHeadline={socialModalData.headline}
        initialFormat={socialModalData.format}
      />
    </section>
  )
}
