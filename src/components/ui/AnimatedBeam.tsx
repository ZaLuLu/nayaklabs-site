import React from 'react'

interface AnimatedBeamProps {
  className?: string
  colorFrom?: string
  colorTo?: string
  duration?: number
}

export function AnimatedBeam({
  className = '',
  colorFrom = 'var(--accent-primary, #E2001A)',
  colorTo = '#00D2FF',
  duration = 2.5,
}: AnimatedBeamProps) {
  return (
    <div className={`relative flex items-center justify-center w-8 sm:w-12 h-6 ${className}`}>
      <svg className="w-full h-full overflow-visible" viewBox="0 0 48 24" fill="none">
        {/* Base Track */}
        <path
          d="M 0 12 L 48 12"
          stroke="var(--border-base)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Animated Glowing Pulse Beam */}
        <path
          d="M 0 12 L 48 12"
          stroke="url(#beam-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-pulse"
        />

        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="0.2" />
            <stop offset="50%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="100%" stopColor={colorTo} stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
