import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { GlassLinesBackground } from './GlassLinesBackground'
import { CrosshairTicks } from './CrosshairTicks'
import { ScrollReveal } from './ScrollReveal'

interface HeroProps {
  onScrollTo: (id: string) => void
}

/**
 * Hero section — full viewport height, centered content.
 * - Glass lines animated background with parallax
 * - Mouse-move reactive subtle tilt
 * - Corner crosshair ticks
 * - Fluid giant headline with Clash Display
 * - Staggered entrance animation
 * - Hairline rule + "Scroll down ↓" CTA
 * - Vertical side labels (left + right edge)
 * - Index mark "01 / 04" top-left
 */
export function Hero({ onScrollTo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Headline fades and moves up as you scroll past hero
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  // Mouse parallax for subtle depth
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set(((e.clientX - innerWidth / 2) / innerWidth) * 12)
      mouseY.set(((e.clientY - innerHeight / 2) / innerHeight) * 8)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const stagger = {
    container: {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.15,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 28 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    },
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-c1"
      aria-labelledby="hero-headline"
    >
      {/* Background: glass lines with parallax */}
      <GlassLinesBackground lineCount={16} parallax />

      {/* Corner crosshairs */}
      <CrosshairTicks />

      {/* Section index — top-left */}
      <div className="absolute top-20 left-6 md:left-10 z-10">
        <motion.p
          className="section-index"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          01 / 04
        </motion.p>
      </div>

      {/* Vertical side label — right edge, desktop only */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p
          className="side-label"
          style={{ transform: 'rotate(90deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}
        >
          AI PRODUCTS · TRAINING · SOFTWARE
        </p>
      </motion.div>

      {/* Vertical side label — left edge */}
      <motion.div
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p
          className="side-label"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', whiteSpace: 'nowrap' }}
        >
          EST. INDIA · 2024
        </p>
      </motion.div>

      {/* Main centered content */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col items-center text-center"
        style={{ y: headlineY, opacity: headlineOpacity, x: springX }}
      >
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={stagger.item}
            className="font-mono text-[0.65rem] tracking-[0.25em] text-c3 uppercase mb-10"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            — 01 / HOME
          </motion.p>

          {/* Giant headline */}
          <motion.h1
            id="hero-headline"
            variants={stagger.item}
            className="text-hero font-display font-bold text-c2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Nayak Labs.
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={stagger.item}
            className="text-c3 text-base md:text-lg mt-6 max-w-[44ch] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            An AI product studio, tech training provider, and software services company.
          </motion.p>

          {/* Hairline rule + scroll CTA */}
          <motion.div
            variants={stagger.item}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <div className="hairline w-16" />
            <button
              onClick={() => onScrollTo('about')}
              className="scroll-down-text bg-transparent border-none group flex items-center gap-2"
              aria-label="Scroll to About section"
            >
              <span>Scroll down</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↓
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 60%, #000 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
