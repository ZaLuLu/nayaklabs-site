import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, CheckCircle2, ArrowUpRight, Code2, Radar } from 'lucide-react'
import { DiNotesVisualizer } from '../products/DiNotesVisualizer'
import { EventMeshRadar } from '../products/EventMeshRadar'
import { sound } from '../../utils/audioEngine'

interface ProductsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProductsModal({ isOpen, onClose }: ProductsModalProps) {
  const [activeTab, setActiveTab] = useState<'dinotes' | 'eventmesh'>('dinotes')

  useEffect(() => {
    if (isOpen) {
      sound.playWhoosh(0.04)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-[var(--bg-card)] border border-[var(--border-base)] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-base)] flex items-center justify-between bg-[var(--bg-card)]/95 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--accent-glow)] text-[var(--accent-primary)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
                  IN-HOUSE PRODUCT SUITE
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
                  Live Software Ventures
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Product Switcher Tabs */}
              <div className="hidden sm:flex p-1 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] font-mono text-xs">
                <button
                  onClick={() => {
                    sound.playClick(850)
                    setActiveTab('dinotes')
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'dinotes'
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  DI Notes (DSA)
                </button>
                <button
                  onClick={() => {
                    sound.playClick(850)
                    setActiveTab('eventmesh')
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'eventmesh'
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  EventMesh (Radar)
                </button>
              </div>

              <button
                onClick={() => {
                  sound.playClick(700)
                  onClose()
                }}
                className="p-2 rounded-xl border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
                aria-label="Close products modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="sm:hidden flex p-2 border-b border-[var(--border-base)] bg-[var(--bg-surface)] font-mono text-xs gap-2">
            <button
              onClick={() => {
                sound.playClick(850)
                setActiveTab('dinotes')
              }}
              className={`flex-1 py-2 rounded-lg text-center ${
                activeTab === 'dinotes'
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              DI Notes
            </button>
            <button
              onClick={() => {
                sound.playClick(850)
                setActiveTab('eventmesh')
              }}
              className={`flex-1 py-2 rounded-lg text-center ${
                activeTab === 'eventmesh'
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              EventMesh
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'dinotes' ? (
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-base)] text-xs font-mono text-[var(--text-primary)] mb-3">
                    ✨ Learn Complex Coding 3x Faster with Visual Cues
                  </div>
                  <h4 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">
                    DI Notes — Visual DSA & Algorithm Engine
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                    See how algorithms operate step-by-step with live memory pointers, complexity graphs, and customizable inputs.
                  </p>
                </div>

                <div className="p-2 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60">
                  <DiNotesVisualizer />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-base)] text-xs font-mono text-[var(--text-primary)] mb-3">
                    ✨ Real-Time Tech Conference & Hackathon Radar
                  </div>
                  <h4 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">
                    EventMesh — Global Tech Discovery
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                    Aggregates verified tech conferences, AI meetups, and hackathons across India and global tech hubs with 1-click RSVP.
                  </p>
                </div>

                <div className="p-2 rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60">
                  <EventMeshRadar />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
