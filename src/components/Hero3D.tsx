import React, { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import confetti from 'canvas-confetti'

const SECTION_HEIGHT = 1400 // Scroll travel distance in px for pinned cinematic zoom
const DOT_COLORS = ['#E2001A', '#00F5A0', '#00D2FF', '#FFB800', '#A855F7', '#3B82F6']

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { themeMode } = useTheme()
  const isLight = themeMode === 'light'
  const [dotColor, setDotColor] = useState(DOT_COLORS[0])
  const [isHovered, setIsHovered] = useState(false)
  const [rippleActive, setRippleActive] = useState(false)

  // Slowly & randomly transition the full stop (.) color
  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)]
      setDotColor(randomColor)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  // Mouse tilt & torchlight specular tracking physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorClientX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500)
  const cursorClientY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500)

  const springConfig = { stiffness: 120, damping: 22, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [18, -18])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-24, 24])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set(e.clientX / innerWidth - 0.5)
      mouseY.set(e.clientY / innerHeight - 0.5)
      cursorClientX.set(e.clientX)
      cursorClientY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, cursorClientX, cursorClientY])

  // Pinned scroll-driven zoom & dissolve mechanics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth transformations as user scrolls past the hero
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1.85, 4.2])
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.95], [1, 0.9, 0])
  const blurValue = useTransform(scrollYProgress, [0.35, 0.95], [0, 16])
  const filter = useMotionTemplate`blur(${blurValue}px)`
  const letterSpacing = useTransform(scrollYProgress, [0, 0.7], ['-0.05em', '0.12em'])

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const indicatorY = useTransform(scrollYProgress, [0, 0.15], [0, 20])

  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])
  const auroraOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    isLight ? [0.2, 0.05] : [0.35, 0.1]
  )

  // Interactive Dot Burst Easter Egg
  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playSuccess(0.08)
    setRippleActive(true)
    setTimeout(() => setRippleActive(false), 1200)

    confetti({
      particleCount: 45,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: DOT_COLORS,
    })
  }

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-[var(--bg-base)] text-[var(--text-primary)] select-none transition-colors duration-300"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1200px]">
        {/* Atmospheric Volumetric Aurora Mesh */}
        <motion.div
          style={{ scale: auroraScale, opacity: auroraOpacity }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          aria-hidden="true"
        >
          {/* Crimson Core Light */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] animate-pulse ${
              isLight
                ? 'bg-gradient-to-tr from-[#E2001A]/10 via-[#E2001A]/5 to-transparent'
                : 'bg-gradient-to-tr from-[#E2001A]/25 via-[#E2001A]/10 to-transparent'
            }`}
          />
          {/* Cobalt Depth Pool */}
          <div
            className={`absolute top-1/3 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] ${
              isLight ? 'bg-[#00D2FF]/10' : 'bg-[#00D2FF]/20'
            }`}
          />
          {/* Emerald Rim Pool */}
          <div
            className={`absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[130px] ${
              isLight ? 'bg-[#00F5A0]/8' : 'bg-[#00F5A0]/15'
            }`}
          />

          {/* Dot Click Chromatic Wave Ripple */}
          <AnimatePresence>
            {rippleActive && (
              <motion.div
                initial={{ scale: 0.2, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-2xl border-2 border-white/60 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${dotColor}40 0%, transparent 70%)`,
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* 3D Chiseled Wordmark Layer */}
        <motion.div
          style={{
            scale,
            opacity,
            filter,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseEnter={() => {
            sound.playClick(900, 0.02)
            setIsHovered(true)
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-10 flex items-center justify-center cursor-default px-4 will-change-transform"
        >
          {/* Deep Shadow Extrusion Plane (-16px Z) */}
          <motion.div
            style={{
              letterSpacing,
              transform: 'translateZ(-16px)',
            }}
            className={`absolute font-display font-black text-[clamp(4.2rem,13.5vw,13rem)] tracking-tighter blur-[6px] pointer-events-none select-none ${
              isLight ? 'text-black/10' : 'text-black/70'
            }`}
            aria-hidden="true"
          >
            Nayak Labs.
          </motion.div>

          {/* Mid Chisel Extrusion Plane (-8px Z) */}
          <motion.div
            style={{
              letterSpacing,
              transform: 'translateZ(-8px)',
            }}
            className={`absolute font-display font-black text-[clamp(4.2rem,13.5vw,13rem)] tracking-tighter pointer-events-none select-none ${
              isLight ? 'text-black/15' : 'text-[#16171E]'
            }`}
            aria-hidden="true"
          >
            Nayak Labs.
          </motion.div>

          {/* Core Illuminated Foreground 3D Text Face (+12px Z) */}
          <motion.h1
            style={{
              letterSpacing,
              transform: 'translateZ(12px)',
            }}
            className={`font-display font-black text-[clamp(4.2rem,13.5vw,13rem)] tracking-tighter leading-none text-transparent bg-clip-text relative group ${
              isLight
                ? 'bg-gradient-to-b from-[#09090b] via-[#23242c] to-[#5a5c68] drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]'
                : 'bg-gradient-to-b from-white via-[#E8E8EE] to-[#8E909E] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
            }`}
          >
            Nayak Labs
            {/* Interactive Kinetic Color-Morphing Full Stop (Clickable Easter Egg) */}
            <span
              onClick={handleDotClick}
              title="Click for sound burst!"
              className="inline-block transition-colors duration-1000 ease-in-out cursor-pointer hover:scale-125 transition-transform"
              style={{
                color: dotColor,
                textShadow: isLight
                  ? `0 0 25px ${dotColor}60, 0 0 50px ${dotColor}30`
                  : `0 0 35px ${dotColor}80, 0 0 70px ${dotColor}40`,
              }}
            >
              .
            </span>
          </motion.h1>
        </motion.div>

        {/* Minimalist Bottom Scroll Affordance (Thin Line + Breathing Indicator) */}
        <motion.div
          style={{ opacity: indicatorOpacity, y: indicatorY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
          aria-hidden="true"
        >
          <div
            className={`w-[1px] h-8 animate-pulse ${
              isLight
                ? 'bg-gradient-to-b from-transparent via-black/30 to-black/80'
                : 'bg-gradient-to-b from-transparent via-white/40 to-white/90'
            }`}
          />
          <span
            className={`font-mono text-[9px] tracking-[0.3em] uppercase ${
              isLight ? 'text-black/50' : 'text-white/40'
            }`}
          >
            SCROLL
          </span>
        </motion.div>

        {/* Seamless Bottom Vignette Blend into Lower Sections */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[var(--bg-base)] pointer-events-none z-10" />
      </div>
    </div>
  )
}
