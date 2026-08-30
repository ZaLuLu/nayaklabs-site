import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sound } from '../utils/audioEngine'
import confetti from 'canvas-confetti'
import { X, Copy, Check, Sparkles } from 'lucide-react'

interface InstagramCardModalProps {
  isOpen: boolean
  onClose: () => void
  initialHeadline?: string
  initialFormat?: string
}

export function InstagramCardModal({
  isOpen,
  onClose,
  initialHeadline = 'Why we stopped prompting and started evaluating. A DI Notes teardown.',
  initialFormat = 'NOTE',
}: InstagramCardModalProps) {
  const [headline, setHeadline] = useState(initialHeadline)
  const [format, setFormat] = useState(initialFormat)
  const [copied, setCopied] = useState(false)

  const handleCopyText = () => {
    sound.playSuccess(0.08)
    const quote = `[${format}] "${headline}"\n\n— @NAYAKLABS · nayaklabs.com`
    navigator.clipboard.writeText(quote)
    setCopied(true)
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-base)] p-6 md:p-8 rounded-sm shadow-2xl flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-base)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent-primary,#E2001A)]" />
                <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-widest uppercase">
                  1:1 SWISS SOCIAL CARD GENERATOR
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer bg-transparent border-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1:1 Canvas (Preview Area) */}
            <div className="flex justify-center">
              <div
                id="swiss-social-card"
                className="w-full max-w-[380px] aspect-square bg-[#F4F4F0] text-[#111111] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative select-none border border-neutral-300 rounded-xs"
              >
                {/* Top: Micro Format tag */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#111111]">
                    {format}
                  </span>
                  <span className="font-mono text-[0.65rem] text-[#888888] tracking-widest">
                    VOL. 26
                  </span>
                </div>

                {/* Center: Big Statement */}
                <div className="my-auto py-4">
                  <h3
                    className="font-display font-extrabold text-xl sm:text-2xl leading-[1.05] tracking-tight text-[#111111]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    "{headline}"
                  </h3>
                </div>

                {/* Bottom: Handle + Red Rule + Wordmark */}
                <div>
                  <div className="w-10 h-0.5 bg-[#E2001A] mb-3" />
                  <div className="flex items-center justify-between font-mono text-[0.65rem] tracking-wider text-[#111111]">
                    <span className="font-bold">@NAYAKLABS · 22D</span>
                    <span className="font-display font-bold">NayakLabs.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Input Controls */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <div>
                <label className="text-[var(--text-secondary)] block mb-1 uppercase tracking-wider text-[0.68rem]">
                  Edit Statement Text:
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-base)] px-3 py-2 text-[var(--text-primary)] font-mono text-xs focus:outline-none focus:border-[var(--border-hover)] rounded-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  {['SHORT', 'THREAD', 'NOTE', 'CASE'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => {
                        sound.playClick(900)
                        setFormat(fmt)
                      }}
                      className={`px-2.5 py-1 text-[0.62rem] font-mono transition-colors cursor-pointer rounded-xs ${
                        format === fmt
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                          : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopyText}
                  className="px-4 py-2 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-mono text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer rounded-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>COPIED QUOTE</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY SOCIAL QUOTE</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
