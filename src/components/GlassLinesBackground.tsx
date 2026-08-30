import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'

interface GlassLinesBackgroundProps {
  /** Number of vertical lines */
  lineCount?: number
  /** Whether to apply parallax scroll effect */
  parallax?: boolean
}

/**
 * Abstract animated "glass lines" background.
 * Layered SVG-based vertical lines with radial glow distortion.
 * Fully CSS/SVG based — no canvas, lightweight on mobile.
 * Optional parallax on scroll via Framer Motion.
 */
export function GlassLinesBackground({ lineCount = 14, parallax = false }: GlassLinesBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  const lines = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => {
      const pos = ((i + 0.5) / lineCount) * 100
      // Lines near center are slightly brighter (radial effect)
      const distFromCenter = Math.abs(pos - 50) / 50
      const baseOpacity = 0.04 + (1 - distFromCenter) * 0.07
      return {
        left: `${pos}%`,
        opacity: baseOpacity,
        delay: i * 0.04,
        heightPercent: 70 + Math.random() * 30, // varying heights for texture
        offsetY: Math.random() * 30, // random start position
      }
    })
  }, [lineCount])

  const content = (
    <div className="glass-lines-bg" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* SVG for precise line rendering */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Fade gradient for lines */}
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* Radial distortion mask */}
          <radialGradient id="radialMask" cx="50%" cy="50%" r="55%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="60%" stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Vertical lines */}
        {lines.map((line, i) => (
          <rect
            key={i}
            x={line.left}
            y="0"
            width="1"
            height="100%"
            fill="url(#lineGrad)"
            opacity={line.opacity}
          />
        ))}

        {/* Radial center glow overlay */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#radialMask)" />
      </svg>

      {/* Animated shimmer sweep */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(108deg, transparent 35%, rgba(255,255,255,0.012) 50%, transparent 65%)',
          backgroundSize: '300% 100%',
          backgroundPosition: '200% 0',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
      />
    </div>
  )

  if (!parallax) {
    return <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">{content}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY, position: 'absolute', inset: '-15%', willChange: 'transform' }}
      aria-hidden="true"
    >
      {content}
    </motion.div>
  )
}
