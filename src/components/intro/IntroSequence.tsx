import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

interface IntroSequenceProps {
  onHandoffStart?: () => void
  onComplete: () => void
}

const PHRASES = [
  'No pitch. Just proof.',
  'Look first. Decide fast.',
  'Explore First, Try Later.',
]

/**
 * IntroSequence:
 * Unhurried, cinematic editorial intro sequence with fluid optical blur decay
 * and smooth horizontal liquid aperture expansion that seamlessly awakens the Hero behind it.
 */
export function IntroSequence({ onHandoffStart, onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)
  const seamRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const skipBtnRef = useRef<HTMLButtonElement>(null)

  const [phase, setPhase] = useState<'text' | 'blade' | 'done'>('text')

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current
    const topPanel = topPanelRef.current
    const bottomPanel = bottomPanelRef.current
    const seam = seamRef.current
    const flash = flashRef.current
    const skipBtn = skipBtnRef.current

    if (!container || !textEl || !topPanel || !bottomPanel || !seam || !flash) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      onHandoffStart?.()
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
      if (skipBtn) gsap.set(skipBtn, { opacity: 0, y: -8 })

      // Fade in skip button gently
      if (skipBtn) {
        masterTl.to(skipBtn, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.4)
      }

      // ── Act I: Fluid Typography Progression with Optical Depth ──
      PHRASES.forEach((phrase, idx) => {
        const isLast = idx === PHRASES.length - 1

        masterTl
          .call(() => {
            if (textEl) textEl.textContent = phrase
          })
          .fromTo(
            textEl,
            { opacity: 0, scale: 1.05, filter: 'blur(12px)', y: 16 },
            { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 0.7, ease: 'expo.out' }
          )
          .to(textEl, { duration: 1.0 })
          .to(textEl, {
            opacity: 0,
            scale: 0.97,
            filter: 'blur(8px)',
            y: -12,
            duration: isLast ? 0.35 : 0.42,
            ease: 'power2.inOut',
          })
      })

      // ── Act II: Liquid Specular Seam & Choreographed Shutter Parting ──
      masterTl
        .to({}, { duration: 0.15 })
        .call(() => {
          setPhase('blade')
          // Fade out skip button as shutter engages
          if (skipBtn) gsap.to(skipBtn, { opacity: 0, duration: 0.2 })
        })
        .set(seam, { opacity: 1, scaleX: 0 })
        .to(seam, {
          scaleX: 1,
          duration: 0.3,
          ease: 'power4.out',
          onComplete: () => {
            // Signal Hero in background to begin 3D letter emergence in sync with shutter opening
            onHandoffStart?.()
          },
        })
        .set(flash, { opacity: 0.18 })
        .to(flash, { opacity: 0, duration: 0.3, ease: 'power2.out' })
        .to(seam, { opacity: 0, duration: 0.35, ease: 'power2.in' }, '-=0.15')
        .to(
          topPanel,
          {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          '-=0.2'
        )
        .to(
          bottomPanel,
          {
            yPercent: 100,
            duration: 0.9,
            ease: 'power4.inOut',
          },
          '-=0.86'
        )
    })

    return () => mm.revert()
  }, [onHandoffStart, onComplete])

  const handleSkip = () => {
    if (phase === 'done') return
    const textEl = textRef.current
    const topPanel = topPanelRef.current
    const bottomPanel = bottomPanelRef.current
    const seam = seamRef.current
    const skipBtn = skipBtnRef.current

    setPhase('blade')
    onHandoffStart?.()

    if (skipBtn) gsap.to(skipBtn, { opacity: 0, duration: 0.15 })
    if (textEl) gsap.to(textEl, { opacity: 0, scale: 0.96, filter: 'blur(10px)', duration: 0.2 })
    if (seam) {
      gsap.set(seam, { opacity: 1, scaleX: 1 })
      gsap.to(seam, { opacity: 0, duration: 0.3 })
    }

    if (topPanel && bottomPanel) {
      gsap.to(topPanel, {
        yPercent: -100,
        duration: 0.5,
        ease: 'power4.inOut',
      })
      gsap.to(bottomPanel, {
        yPercent: 100,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          setPhase('done')
          onComplete()
        },
      })
    } else {
      setPhase('done')
      onComplete()
    }
  }

  if (phase === 'done') return null

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[300] select-none ${
        phase === 'blade' ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Welcome to Nayak Labs"
      role="status"
    >
      {/* Skip button for immediate visitor control */}
      <button
        ref={skipBtnRef}
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/75 hover:text-white font-mono text-[11px] tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-sm"
        aria-label="Skip introductory animation"
      >
        SKIP INTRO →
      </button>

      {/* Top half-panel */}
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 bg-[#06070A] z-20 border-b border-white/[0.06] overflow-hidden"
        style={{ height: '50%', willChange: 'transform' }}
      >
        {/* Subtle engineering telemetry watermark in top panel */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-white/20 tracking-widest pointer-events-none">
          LAT 12.9716° N · LNG 77.5946° E // NAYAK LABS STUDIO
        </div>
      </div>

      {/* Bottom half-panel */}
      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 bg-[#06070A] z-20 border-t border-white/[0.06] overflow-hidden"
        style={{ height: '50%', willChange: 'transform' }}
      >
        {/* Telemetry watermark in bottom panel */}
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-white/20 tracking-widest pointer-events-none">
          AUTONOMOUS RUNTIMES · FULLSTACK SYSTEMS · 2026
        </div>
      </div>

      {/* Laser seam streak (Liquid Specular Cut) */}
      <div
        ref={seamRef}
        className="absolute inset-x-0 z-30 pointer-events-none origin-center"
        style={{
          top: '50%',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent 0%, #FFFFFF 25%, #E2001A 50%, #00D2FF 70%, transparent 100%)',
          boxShadow: '0 0 16px rgba(255,255,255,0.9), 0 0 32px rgba(226,0,26,0.7)',
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
            fontSize: 'clamp(1.85rem, 4.4vw, 3.4rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1.15,
            willChange: 'transform, opacity, filter',
          }}
        />
      </div>
    </div>
  )
}
