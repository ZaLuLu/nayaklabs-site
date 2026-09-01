import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Clock, Calendar, GraduationCap, ArrowRight, Download, BookOpen, Layers } from 'lucide-react'
import { sound } from '../utils/audioEngine'

export interface TrackData {
  id: string
  num: string
  title: string
  tagline: string
  audience: string
  duration: string
  schedule: string
  prerequisites: string
  level: string
  color: string
  modules: {
    week: string
    title: string
    topics: string[]
    project: string
  }[]
}

interface SyllabusDrawerProps {
  track: TrackData | null
  onClose: () => void
  onEnroll: (trackId: string) => void
}

export function SyllabusDrawer({ track, onClose, onEnroll }: SyllabusDrawerProps) {
  if (!track) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick(600)
            onClose()
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Content */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative w-full max-w-2xl h-full bg-[var(--bg-card)] border-l border-[var(--border-base)] shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-[var(--border-base)] bg-[var(--bg-surface)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[var(--accent-primary)] font-bold px-2.5 py-0.5 rounded-md bg-[var(--accent-glow)]">
                  {track.num} // {track.level}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  NAYAK LABS ACADEMY
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playClick(600)
                  onClose()
                }}
                className="p-2 rounded-full border border-[var(--border-base)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text-primary)] mb-2">
              {track.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
              {track.tagline}
            </p>

            {/* Quick Meta Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col">
                <span className="text-[11px] text-[var(--text-muted)] uppercase flex items-center gap-1 mb-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-amber)]" /> Duration
                </span>
                <span className="font-bold text-[var(--text-primary)] text-sm">{track.duration}</span>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col">
                <span className="text-[11px] text-[var(--text-muted)] uppercase flex items-center gap-1 mb-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent-emerald)]" /> Next Cohort
                </span>
                <span className="font-bold text-[var(--text-primary)] text-sm">{track.schedule}</span>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-base)] bg-[var(--bg-card)] flex flex-col col-span-2 sm:col-span-1">
                <span className="text-[11px] text-[var(--text-muted)] uppercase flex items-center gap-1 mb-1 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[var(--accent-cyan)]" /> Target
                </span>
                <span className="font-bold text-[var(--text-primary)] truncate text-sm">{track.audience}</span>
              </div>
            </div>
          </div>

          {/* Module Breakdown Body */}
          <div className="p-6 md:p-8 space-y-6 flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-base)]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Week-by-Week Curriculum Breakdown</span>
              </h4>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {track.modules.length} Intensive Modules
              </span>
            </div>

            <div className="space-y-4">
              {track.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                      {mod.week}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase font-semibold">
                      HANDS-ON LAB
                    </span>
                  </div>

                  <h5 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                    {mod.title}
                  </h5>

                  <ul className="space-y-1.5 mb-3">
                    {mod.topics.map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-[13px] text-[var(--text-secondary)] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-base)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
                    <Layers className="w-4 h-4 text-[var(--accent-emerald)] shrink-0" />
                    <span><strong className="text-[var(--accent-emerald)]">Project:</strong> {mod.project}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Prerequisites Section */}
            <div className="p-4 rounded-xl border border-[var(--border-base)] bg-amber-500/5 text-xs text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)] font-mono block mb-1">
                PREREQUISITES & PREPARATION:
              </strong>
              {track.prerequisites}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-[var(--border-base)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0">
            <div className="text-left w-full sm:w-auto">
              <div className="font-mono text-xs text-[var(--text-muted)]">COHORT CAPACITY</div>
              <div className="font-mono text-sm font-bold text-[var(--text-primary)]">
                Only 12 Seats per Cohort
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(1000)
                onEnroll(track.id)
              }}
              className="btn-primary w-full sm:w-auto justify-center"
            >
              <span>APPLY FOR THIS COHORT</span>
              <ArrowRight className="w-4 h-4 ml-1 inline" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
