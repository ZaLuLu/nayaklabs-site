import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { CrosshairTicks } from './CrosshairTicks'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Terminal, Play, RefreshCw, Cpu, ArrowRight } from 'lucide-react'

interface HeroProps {
  onScrollTo: (id: string) => void
}

function useScrambleText(targetText: string, delayMs = 0) {
  const [displayText, setDisplayText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*/<>{}[]'

  const scramble = () => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '.' || char === '/') return char
            if (index < iteration) return targetText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= targetText.length) {
        clearInterval(interval)
      }
      iteration += 1 / 2
    }, 26)
  }

  useEffect(() => {
    const timer = setTimeout(() => scramble(), delayMs)
    return () => clearTimeout(timer)
  }, [targetText, delayMs])

  return { displayText, triggerScramble: scramble }
}

export function Hero({ onScrollTo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { setCursorLabel } = useTheme()
  const [activeMode, setActiveMode] = useState<'dsa' | 'radar'>('dsa')
  const [temperature, setTemperature] = useState<number>(0.7)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [generatedOutput, setGeneratedOutput] = useState<string>(
    'SYSTEM READY // Select engine and click RUN to execute real-time telemetry.'
  )
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const ist = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setCurrentTime(ist)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const { displayText: heroTitle, triggerScramble: scrambleHero } = useScrambleText('Nayak Labs.', 200)
  const { displayText: heroSubtitle } = useScrambleText('Build. Learn. Automate with AI.', 600)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 45, damping: 18 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set(((e.clientX - innerWidth / 2) / innerWidth) * 10)
      mouseY.set(((e.clientY - innerHeight / 2) / innerHeight) * 6)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const handleExecute = () => {
    sound.playClick(1100)
    setIsGenerating(true)
    setGeneratedOutput('INITIALIZING TELEMETRY PIPELINE...')

    const outputs: Record<typeof activeMode, string[]> = {
      dsa: [
        'DI NOTES // Compiling QuickSort recursion tree...',
        'DI NOTES // Partition pivot: [42] → L: [12, 19, 35] | R: [58, 91]',
        'DI NOTES // Complexity verified: O(N log N) time | 0.08ms visual trace.',
      ],
      radar: [
        'EVENTMESH // Scanning 42 node clusters across India...',
        'EVENTMESH // Match found: "AI Founders Night — Bengaluru (May 24)"',
        'EVENTMESH // 1-Click RSVP node authenticated & synced.',
      ],
    }

    const sequence = outputs[activeMode]
    let step = 0

    const interval = setInterval(() => {
      if (step < sequence.length) {
        setGeneratedOutput(sequence[step])
        sound.playTone(320 + step * 180, 0.08)
        step++
      } else {
        clearInterval(interval)
        setIsGenerating(false)
        sound.playSuccess(0.08)
      }
    }, 450)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 transition-colors duration-300"
      aria-labelledby="hero-headline"
    >
      <CrosshairTicks />

      {/* Top Telemetry / Status Ticker */}
      <div className="absolute top-20 left-6 right-6 md:left-12 md:right-12 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.18em] text-[var(--text-muted)] uppercase">
            ENGINES ONLINE // <span className="text-[var(--text-primary)] font-semibold">2/2 NODES</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 font-mono text-[0.65rem] tracking-wider text-[var(--text-muted)]">
          <span>LATENCY: <strong className="text-[var(--text-primary)] font-normal">14ms</strong></span>
          <span>IST: <strong className="text-[var(--text-primary)] font-normal">{currentTime || '12:00:00'}</strong></span>
          <span className="px-2 py-0.5 border border-[var(--border-base)] text-[var(--text-secondary)] bg-[var(--bg-card)] rounded-xs">
            BUILD 2026.4
          </span>
        </div>
      </div>

      {/* Main Centered Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-10 flex flex-col items-center text-center mt-6"
        style={{ y: headlineY, opacity: headlineOpacity, x: springX }}
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-8 border border-[var(--border-base)] bg-[var(--bg-card)] backdrop-blur-md rounded-full shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary,#E2001A)]" />
          <span className="font-mono text-[0.68rem] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
            {heroSubtitle || '00 / AN AI-FIRST ECOSYSTEM'}
          </span>
        </motion.div>

        {/* Giant Kinetic Headline */}
        <motion.h1
          id="hero-headline"
          onMouseEnter={() => {
            scrambleHero()
            sound.playClick(1200, 0.02)
          }}
          className="text-hero font-display font-bold text-[var(--text-primary)] tracking-tight cursor-default select-none group"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {heroTitle || 'Nayak Labs.'}
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[var(--text-secondary)] text-base md:text-xl mt-6 max-w-[48ch] leading-relaxed font-light"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          An AI product studio, hands-on tech academy, and high-velocity engineering partner engineered to turn ideas into deployed software.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <button
            onClick={() => {
              sound.playClick(850)
              onScrollTo('products')
            }}
            onMouseEnter={() => setCursorLabel('EXPLORE')}
            onMouseLeave={() => setCursorLabel(null)}
            className="btn-primary flex items-center gap-2 group shadow-xl"
          >
            <span>Explore Products</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>

          <button
            onClick={() => {
              sound.playClick(750)
              onScrollTo('training')
            }}
            onMouseEnter={() => setCursorLabel('ACADEMY')}
            onMouseLeave={() => setCursorLabel(null)}
            className="btn-ghost flex items-center gap-2"
          >
            <span>Tech Training Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Interactive AI Studio Core HUD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-[800px] mt-12 border border-[var(--border-base)] bg-[var(--bg-card)] backdrop-blur-xl shadow-2xl text-left overflow-hidden rounded-sm"
        >
          {/* Top terminal bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-base)] bg-[var(--bg-surface)]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[0.68rem] tracking-wider text-[var(--text-muted)] ml-2 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-[var(--text-muted)]" />
                nayaklabs-core.engine
              </span>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center gap-1">
              {(
                [
                  { id: 'dsa', label: 'DI Notes Engine' },
                  { id: 'radar', label: 'EventMesh Radar' },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    sound.playClick(900)
                    setActiveMode(mode.id)
                  }}
                  className={`px-3 py-1 font-mono text-[0.62rem] tracking-wider transition-all cursor-pointer rounded-xs ${
                    activeMode === mode.id
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Parameters & Output */}
          <div className="p-5 md:p-6 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[var(--border-base)]">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  Target Pipeline: <span className="text-[var(--text-primary)] font-medium capitalize">{activeMode === 'dsa' ? 'DI Notes Computation' : 'EventMesh Radar Node'}</span>
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <span>Temp: {temperature.toFixed(1)}</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(parseFloat(e.target.value))
                      sound.playTone(400 + parseFloat(e.target.value) * 300, 0.04)
                    }}
                    className="w-20 accent-[var(--accent-primary)] cursor-pointer"
                  />
                </div>

                <button
                  onClick={handleExecute}
                  disabled={isGenerating}
                  className="px-3.5 py-1.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-mono text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer disabled:opacity-50 rounded-xs"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>STREAMING...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>RUN ENGINE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Output console */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-base)] p-4 min-h-[72px] flex items-center font-mono text-xs text-emerald-500 dark:text-emerald-400 leading-relaxed overflow-x-auto rounded-xs">
              <div className="flex items-start gap-2 w-full">
                <span className="text-[var(--text-muted)] select-none">&gt;</span>
                <span className="text-[var(--text-primary)]">{generatedOutput}</span>
                {isGenerating && <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll CTA indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-3 mt-10"
        >
          <button
            onClick={() => {
              sound.playClick(600)
              onScrollTo('about')
            }}
            className="scroll-down-text bg-transparent border-none group flex items-center gap-2 cursor-pointer"
            aria-label="Scroll to Ecosystem section"
          >
            <span>Scroll down</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
