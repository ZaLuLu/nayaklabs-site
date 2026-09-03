import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

interface IntroSequenceProps {
  onComplete: () => void
}

const PHRASES = [
  'No pitch. Just proof.',
  'Look first. Decide fast.',
  'Explore First, Try Later.',
]

/**
 * Linear / Apple style intro sequence:
 * - Clean, non-skippable editorial flow.
 * - Deep slate mechanical retraction.
 * - Precision hairline laser cut.
 */
export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  const [phase, setPhase] = useState<'text' | 'blade' | 'done'>('text')

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current
    const topPanel = topPanelRef.current
    const bottomPanel = bottomPanelRef.current
    const seam = seamRef.current
    const flash = flashRef.current

    if (!container || !textEl || !topPanel || !bottomPanel || !seam || !flash) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      onComplete()
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const masterTl = gsap.timeline({
        onComplete: () => {
          setPhase('done')
          onComplete()
        },
      })

      // Initial state
      gsap.set(topPanel, { yPercent: 0 })
      gsap.set(bottomPanel, { yPercent: 0 })
      gsap.set(seam, { opacity: 0, scaleX: 0 })
      gsap.set(flash, { opacity: 0 })

      // ── Act I: Editorial Text Flow (Unhurried, authoritative) ──
      PHRASES.forEach((phrase, idx) => {
        const isLast = idx === PHRASES.length - 1

        masterTl
          .call(() => {
            if (textEl) textEl.textContent = phrase
          })
          .fromTo(
            textEl,
            { opacity: 0, scale: 1.04, filter: 'blur(12px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
          )
          .to(textEl, { duration: 1.25 })
          .to(textEl, {
            opacity: 0,
            scale: 0.98,
            filter: 'blur(8px)',
            duration: isLast ? 0.3 : 0.45,
            ease: 'power2.inOut',
          })
      })

      // ── Act II: Laser Seam Cut & Mechanical Panel Retraction ──
      masterTl
        // 0.25s moment of quiet tension
        .to({}, { duration: 0.25 })
        .call(() => {
          setPhase('blade')
        })
        // 1px clean laser streak
        .set(seam, { opacity: 1, scaleX: 0 })
        .to(seam, { scaleX: 1, duration: 0.16, ease: 'power4.out' })
        // Subtle optical sheen
        .set(flash, { opacity: 0.16 })
        .to(flash, { opacity: 0, duration: 0.18, ease: 'power2.out' })
        .to(seam, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.08')
        // Retract panels with Apple's out-expo curve
        .to(
          topPanel,
          {
            yPercent: -100,
            duration: 0.8,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          },
          '-=0.1'
        )
        .to(
          bottomPanel,
          {
            yPercent: 100,
            duration: 0.8,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          },
          '-=0.8'
        )
    })

    const handleSkip = () => {
      mm.revert()
      setPhase('done')
      onComplete()
    }

    return () => mm.revert()
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] select-none pointer-events-auto bg-[#07080B]"
      aria-label="Welcome to Nayak Labs"
      role="status"
    >
      {/* Skip button for immediate visitor control */}
      <button
        onClick={() => {
          setPhase('done')
          onComplete()
        }}
        className="absolute top-6 right-6 z-50 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-[11px] tracking-wider transition-all cursor-pointer backdrop-blur-md"
        aria-label="Skip introductory animation"
      >
        SKIP INTRO →
      </button>

      {/* Top half-panel */}
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 bg-[#07080B] z-20 border-b border-white/[0.06]"
        style={{ height: '50%', willChange: 'transform' }}
      />

      {/* Bottom half-panel */}
      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 bg-[#07080B] z-20 border-t border-white/[0.06]"
        style={{ height: '50%', willChange: 'transform' }}
      />

      {/* Laser seam streak (Crimson Precision Cut) */}
      <div
        ref={seamRef}
        className="absolute inset-x-0 z-30 pointer-events-none origin-center"
        style={{
          top: '50%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #FFFFFF 35%, #E2001A 50%, #FFFFFF 65%, transparent 100%)',
          boxShadow: '0 0 12px rgba(255,255,255,0.7), 0 0 24px rgba(226,0,26,0.5)',
          transform: 'translateY(-50%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Subtle bloom flash */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-30 pointer-events-none bg-white opacity-0"
        style={{ willChange: 'opacity' }}
      />

      {/* Centered Typography container */}
      <div className="absolute inset-0 z-40 flex items-center justify-center px-6 pointer-events-none">
        <h2
          ref={textRef}
          className="font-display font-medium text-center tracking-tight text-white/95"
          style={{
            fontSize: 'clamp(1.75rem, 4.2vw, 3.25rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1.15,
            willChange: 'transform, opacity, filter',
          }}
        />
      </div>
    </div>
  )
}
