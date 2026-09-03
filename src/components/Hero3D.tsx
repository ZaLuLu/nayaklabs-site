import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sound } from '../utils/audioEngine'
import { ArrowDown, ArrowRight, ShieldCheck, Clock, Cpu } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Hero3DProps {
  visible?: boolean
  onScrollToDivision?: (id: string) => void
}

/**
 * Hero3D (Streamlined Static & Zoom-Through Hero)
 * - Pure typographic precision without distracting animated background blobs.
 * - Razor-sharp "Nayak Labs." title directly visible once split intro ends.
 * - On scroll down, the wordmark smoothly expands in 3D camera space (zoom-through effect)
 *   guiding the user through the brand text directly into the P - S - A divisions.
 */
export function Hero3D({ visible = true, onScrollToDivision }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible) return
    const container = containerRef.current
    const wordmark = wordmarkRef.current
    const content = contentRef.current
    if (!container || !wordmark || !content) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        isReducedMotion: '(prefers-reduced-motion: reduce)',
        isStandard: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { isReducedMotion } = context.conditions as { isReducedMotion: boolean }

        if (isReducedMotion) {
          gsap.set([wordmark, content], { opacity: 1, scale: 1 })
          return
        }

        // ScrollTrigger Zoom-through transition:
        // As user scrolls, wordmark scales up and fades out cleanly into the PSA sections
        const zoomTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
          },
        })

        zoomTl
          .to(wordmark, {
            scale: 2.8,
            opacity: 0,
            y: -40,
            filter: 'blur(10px)',
            ease: 'power2.inOut',
          }, 0)
          .to(
            '.hero-fade-element',
            {
              opacity: 0,
              y: -30,
              stagger: 0.04,
              ease: 'power1.in',
            },
            0
          )
      },
      container
    )

    return () => mm.revert()
  }, [visible])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 pb-16 px-6 md:px-10 text-[var(--text-primary)] overflow-hidden"
    >
      {/* Subtle Architectural Reference Grid */}
      <div className="hero-grid-lines opacity-70" aria-hidden="true" />

      {/* Hero Content Container */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center py-6"
      >
        {/* Eyebrow badge */}
        <div className="hero-fade-element inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border-base)] bg-[var(--bg-card)]/80 backdrop-blur-md font-mono text-xs text-[var(--text-secondary)] mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span className="tracking-wider uppercase font-semibold text-[11px]">
            AI PRODUCT STUDIO & RESEARCH PODS
          </span>
        </div>

        {/* Zoom-Through Central Wordmark */}
        <h1
          ref={wordmarkRef}
          className="font-display font-bold text-hero text-[var(--text-primary)] mb-6 select-none tracking-tight will-change-transform"
        >
          Nayak Labs
          <span
            className="text-[var(--accent-primary)] ml-0.5 inline-block cursor-pointer hover:scale-110 transition-transform"
            onClick={() => sound.playSuccess(0.08)}
            title="Nayak Labs"
          >
            .
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-fade-element font-body text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          We engineer software that ships.
          <span className="text-[var(--text-muted)] ml-2">
            18-day fixed MVP sprints · autonomous AI pipelines · 100% intellectual property transfer.
          </span>
        </p>

        {/* Division Shortcut Anchors */}
        <div className="hero-fade-element flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault()
              sound.playClick(800)
              onScrollToDivision?.('products')
            }}
            className="px-4 py-2 rounded-xl border border-[var(--border-base)] bg-[var(--bg-card)]/60 hover:border-[var(--accent-primary)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="text-[var(--accent-primary)] font-bold">01</span>
            <span>Products (P)</span>
          </a>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              sound.playClick(850)
              onScrollToDivision?.('services')
            }}
            className="px-4 py-2 rounded-xl border border-[var(--border-base)] bg-[var(--bg-card)]/60 hover:border-[var(--accent-emerald)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="text-[var(--accent-emerald)] font-bold">02</span>
            <span>Services (S)</span>
          </a>

          <a
            href="#academics"
            onClick={(e) => {
              e.preventDefault()
              sound.playClick(900)
              onScrollToDivision?.('academics')
            }}
            className="px-4 py-2 rounded-xl border border-[var(--border-base)] bg-[var(--bg-card)]/60 hover:border-[var(--accent-cyan)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="text-[var(--accent-cyan)] font-bold">03</span>
            <span>Academics (A)</span>
          </a>
        </div>

        {/* Scroll down prompt */}
        <div className="hero-fade-element flex flex-col items-center gap-2 font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
          <span className="uppercase">SCROLL TO ENTER DIVISIONS</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[var(--text-secondary)]" />
        </div>
      </div>
    </section>
  )
}
