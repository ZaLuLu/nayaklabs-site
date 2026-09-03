import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, Terminal, Globe, GraduationCap, Sparkles, Activity, Cpu, Code2 } from 'lucide-react'
import HeroBackground from './HeroBackground'

gsap.registerPlugin(ScrollTrigger)

interface Hero3DProps {
  visible?: boolean
  onScrollToDivision?: (id: string) => void
}

const ACCENT_CYCLE = [
  { color: '#E2001A', name: 'Crimson / Products' },
  { color: '#00F5A0', name: 'Emerald / Services' },
  { color: '#00D2FF', name: 'Cyan / Academics' },
  { color: '#FFB800', name: 'Amber / Status' },
  { color: '#A855F7', name: 'Violet / Kinetic' },
]

const WORDMARK_LETTERS = [
  { char: 'N', key: 'l0' },
  { char: 'a', key: 'l1' },
  { char: 'y', key: 'l2' },
  { char: 'a', key: 'l3' },
  { char: 'k', key: 'l4' },
  { char: '\u00A0', key: 'l5' },
  { char: 'L', key: 'l6' },
  { char: 'a', key: 'l7' },
  { char: 'b', key: 'l8' },
  { char: 's', key: 'l9' },
]

export function Hero3D({ visible = true, onScrollToDivision }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordmarkStageRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLHeadingElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const scrollPromptRef = useRef<HTMLDivElement>(null)
  const revealedContentRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const [accentIndex, setAccentIndex] = useState(0)
  const activeAccent = ACCENT_CYCLE[accentIndex]

  // Period interactive trigger
  const handlePeriodClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setAccentIndex((prev) => (prev + 1) % ACCENT_CYCLE.length)

    // Micro vibration / pulse on the period
    const dot = e.currentTarget
    gsap.fromTo(
      dot,
      { scale: 1.6 },
      { scale: 1, duration: 0.45, ease: 'back.out(2.5)' }
    )
  }, [])

  // 3D Tilt interaction for the 3 division cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const normX = (x / rect.width - 0.5) * 8
    const normY = (y / rect.height - 0.5) * -8

    card.style.transform = `perspective(1000px) rotateX(${normY}deg) rotateY(${normX}deg) translateY(-4px)`
  }

  const handleCardMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx]
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  useEffect(() => {
    if (!visible) return
    const container = containerRef.current
    const wordmarkStage = wordmarkStageRef.current
    const wordmark = wordmarkRef.current
    const eyebrow = eyebrowRef.current
    const scrollPrompt = scrollPromptRef.current
    const revealedContent = revealedContentRef.current
    const cards = cardRefs.current.filter(Boolean)

    if (!container || !wordmarkStage || !wordmark || !scrollPrompt || !revealedContent) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        isReduced: '(prefers-reduced-motion: reduce)',
        isStandard: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { isReduced } = context.conditions as { isReduced: boolean }

        if (isReduced) {
          gsap.set(wordmark, { opacity: 1, scale: 1 })
          if (eyebrow) gsap.set(eyebrow, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
          gsap.set('.hero-letter', { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' })
          gsap.set(revealedContent, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' })
          return
        }

        // 1. Initial 3D letter emergence entrance & eyebrow badge animation
        gsap.set(wordmark, { opacity: 1 })
        if (eyebrow) {
          gsap.fromTo(
            eyebrow,
            { opacity: 0, y: 24, filter: 'blur(8px)', scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
              duration: 0.75,
              delay: 0.08,
              ease: 'power3.out',
            }
          )
        }

        gsap.fromTo(
          '.hero-letter',
          { opacity: 0, y: 40, rotateX: -28, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            stagger: 0.032,
            duration: 0.85,
            ease: 'power4.out',
          }
        )

        // Set initial state for scrub
        gsap.set(scrollPrompt, { opacity: 1, y: 0 })
        gsap.set(revealedContent, { opacity: 0, y: 40, scale: 0.95, pointerEvents: 'none' })

        // Initial 3D Stacked-deck arrangement for cards
        if (cards.length === 3) {
          gsap.set(cards[0], { xPercent: 35, rotateZ: -5, scale: 0.92 })
          gsap.set(cards[1], { xPercent: 0, rotateZ: 0, scale: 0.95 })
          gsap.set(cards[2], { xPercent: -35, rotateZ: 5, scale: 0.92 })
        }

        // Master ScrollTrigger Scrub Timeline
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=140%',
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
          },
        })

        // 00. Eyebrow badge dissolves gracefully upward into blur on scroll
        if (eyebrow) {
          masterTl.to(
            eyebrow,
            {
              opacity: 0,
              y: -28,
              scale: 0.92,
              filter: 'blur(10px)',
              duration: 0.22,
              ease: 'power2.in',
            },
            0
          )
        }

        masterTl
          // 01. Prompt dissolves first
          .to(
            scrollPrompt,
            {
              opacity: 0,
              y: -18,
              duration: 0.22,
              ease: 'power2.out',
            },
            0
          )
          // 02. Cinematic wordmark push into camera with optical rack-focus blur
          .to(
            wordmark,
            {
              scale: 2.75,
              opacity: 0,
              y: -55,
              filter: 'blur(16px)',
              duration: 0.65,
              ease: 'power2.inOut',
            },
            0.04
          )
          // 03. Unfurl the revealed content and fan-out the 3D stacked deck
          .to(
            revealedContent,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
              onStart: () => {
                revealedContent.style.pointerEvents = 'auto'
              },
              onReverseComplete: () => {
                revealedContent.style.pointerEvents = 'none'
              },
            },
            0.32
          )

        // Fan-out the 3 cards from stacked deck into grid
        if (cards.length === 3) {
          masterTl
            .to(
              cards[0],
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
              },
              0.38
            )
            .to(
              cards[1],
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
              },
              0.4
            )
            .to(
              cards[2],
              {
                xPercent: 0,
                rotateZ: 0,
                scale: 1,
                duration: 0.55,
                ease: 'power3.out',
              },
              0.42
            )
        }
      },
      container
    )

    return () => mm.revert()
  }, [visible])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)] select-none transition-colors duration-300"
    >
      {/* Architectural Grid & Interactive Cursor Spotlight */}
      <HeroBackground />

      <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 md:px-10 h-full flex flex-col items-center justify-center">
        {/* =========================================================================
            STAGE 1: MONUMENTAL 3D WORDMARK (Laser-Focused & Pristine)
            ========================================================================= */}
        <div
          ref={wordmarkStageRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        >
          <h1
            ref={wordmarkRef}
            className="font-display font-bold text-hero text-[var(--text-primary)] tracking-tight will-change-transform drop-shadow-sm select-none perspective-1200 flex items-center justify-center"
          >
            {WORDMARK_LETTERS.map((letter) => (
              <span key={letter.key} className="hero-letter">
                {letter.char}
              </span>
            ))}

            {/* Interactive Kinetic Accent Period */}
            <button
              onClick={handlePeriodClick}
              type="button"
              className="relative inline-block ml-1 cursor-pointer pointer-events-auto p-1 -m-1 focus:outline-none transition-transform hover:scale-125"
              title={`Active Accent: ${activeAccent.name} · Click to cycle`}
              aria-label={`Cycle brand accent color. Current: ${activeAccent.name}`}
            >
              <span
                className="inline-block transition-colors duration-300 font-display"
                style={{
                  color: activeAccent.color,
                  textShadow: `0 0 28px ${activeAccent.color}`,
                }}
              >
                .
              </span>
              {/* Subtle ambient pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
                style={{ backgroundColor: activeAccent.color }}
              />
            </button>
          </h1>

          {/* Minimalist Scroll Prompt */}
          <div
            ref={scrollPromptRef}
            className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] tracking-widest uppercase pointer-events-none opacity-80"
          >
            <ArrowDown
              className="w-4 h-4 animate-bounce"
              style={{ color: activeAccent.color }}
            />
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: REVEALED 3D FAN-OUT DIVISION PORTAL CARDS (Unfurls on Scroll)
            ========================================================================= */}
        <div
          ref={revealedContentRef}
          className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center py-6 will-change-transform"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill font-mono text-xs text-[var(--text-secondary)] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-pulse" />
            <span className="tracking-wider uppercase font-semibold text-[11px]">
              ENGINEERING DIVISIONS // P · S · A
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight mb-4">
            We engineer software that ships.
          </h2>

          <p className="font-body text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
            Autonomous AI runtimes · high-scale web platforms · open technical research.
          </p>

          {/* 3 High-Impact 3D Fan-Out Division Portal Cards */}
          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full mb-8 text-left perspective-1000"
          >
            {/* Portal 01: Products */}
            <Link
              ref={(el) => { cardRefs.current[0] = el }}
              to="/products"
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
              onMouseLeave={() => handleCardMouseLeave(0)}
              className="frosted-slab specular-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between group hover:border-[var(--accent-primary)] transition-all duration-200 cursor-pointer shadow-md will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] group-hover:scale-105 transition-transform">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-primary)] font-bold">
                    01 // PRODUCTS
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                  Products (P)
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  DI Notes Algorithm Visualizer & EventMesh 3D Global Radar.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #DI-Notes-v2.5
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #3D-Mesh
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-primary)] font-bold">
                <span>LAUNCH SANDBOX</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Portal 02: Services */}
            <Link
              ref={(el) => { cardRefs.current[1] = el }}
              to="/services"
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
              onMouseLeave={() => handleCardMouseLeave(1)}
              className="frosted-slab specular-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between group hover:border-[var(--accent-emerald)] transition-all duration-200 cursor-pointer shadow-md will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-emerald)]/10 text-[var(--accent-emerald)] group-hover:scale-105 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-emerald)] font-bold">
                    02 // SERVICES
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-emerald)] transition-colors">
                  Services (S)
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Autonomous agentic pipelines, high-scale web platforms & distributed systems.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #p95-12ms
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #AgenticPipelines
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-emerald)] font-bold">
                <span>VIEW CAPABILITIES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>

            {/* Portal 03: Academics */}
            <Link
              ref={(el) => { cardRefs.current[2] = el }}
              to="/academics"
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
              onMouseLeave={() => handleCardMouseLeave(2)}
              className="frosted-slab specular-border p-5 sm:p-6 rounded-2xl flex flex-col justify-between group hover:border-[var(--accent-cyan)] transition-all duration-200 cursor-pointer shadow-md will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-cyan)] font-bold">
                    03 // ACADEMICS
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-cyan)] transition-colors">
                  Academics (A)
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  6-Week intensive engineering fellowship with live code reviews & 12 seats.
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[var(--text-muted)] mb-4">
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)]">
                    #Cohort-04
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--accent-cyan)]">
                    ● 12 SEATS OPEN
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs text-[var(--accent-cyan)] font-bold">
                <span>VIEW SYLLABUS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
            <span>CONTINUE SCROLLING FOR FULL SYSTEM MANIFESTO & TELEMETRY</span>
            <ArrowDown className="w-3 h-3 text-[var(--text-secondary)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
