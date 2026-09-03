import React, { useRef, useState, useCallback } from 'react'

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
  enable3DTilt = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style = {},
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // High-performance CSS custom properties update - 0 React re-renders during mouse tracking
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)

      if (enable3DTilt) {
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!isTouch && !isReduced) {
          const normX = (x / rect.width - 0.5) * 6
          const normY = (y / rect.height - 0.5) * -6
          card.style.transform = `perspective(1000px) rotateX(${normY}deg) rotateY(${normX}deg)`
        }
      }
    },
    [enable3DTilt]
  )

  const handleMouseEnter = () => {
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    const card = cardRef.current
    if (card && enable3DTilt) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
    onMouseLeave?.()
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      }}
      className={`relative overflow-hidden border border-[var(--border-base)] bg-[var(--bg-card)] backdrop-blur-md will-change-transform ${className}`}
    >
      {/* Radial spotlight on background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Illuminated border glow mask */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${borderGlowColor}, transparent 70%)`,
          maskImage: 'linear-gradient(#000,#000), linear-gradient(#000,#000)',
          maskClip: 'content-box, border-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          border: '1px solid transparent',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
