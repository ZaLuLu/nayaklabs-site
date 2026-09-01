import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  borderGlowColor?: string
  enable3DTilt?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  style?: React.CSSProperties
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.04)',
  borderGlowColor = 'rgba(255, 255, 255, 0.22)',
  enable3DTilt = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style = {},
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // 3D Tilt Spring Physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 260, damping: 24, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })

    // Normalize -0.5 to 0.5 for 3D tilt
    mouseX.set(x / rect.width - 0.5)
    mouseY.set(y / rect.height - 0.5)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    onMouseLeave?.()
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        rotateX: enable3DTilt ? rotateX : 0,
        rotateY: enable3DTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden border border-[var(--border-base)] bg-[var(--bg-card)] backdrop-blur-md transition-shadow duration-300 will-change-transform ${className}`}
    >
      {/* Radial spotlight on background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Illuminated border glow mask */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, ${borderGlowColor}, transparent 70%)`,
          maskImage: 'linear-gradient(#000,#000), linear-gradient(#000,#000)',
          maskClip: 'content-box, border-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          border: '1px solid transparent',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10" style={{ transform: 'translateZ(8px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
