import React, { useRef, useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  borderGlowColor?: string
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
  onClick,
  onMouseEnter,
  onMouseLeave,
  style = {},
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onMouseLeave?.()
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`relative overflow-hidden border border-[var(--border-base)] bg-[var(--bg-card)] backdrop-blur-md transition-all duration-300 ${className}`}
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

      <div className="relative z-10">{children}</div>
    </div>
  )
}
