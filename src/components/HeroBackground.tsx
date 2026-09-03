import React, { useRef, useEffect } from 'react'

/**
 * HeroBackground:
 * Ultra-crisp architectural coordinate grid with an interactive liquid specular spotlight
 * that follows the user's cursor with smooth spring inertia. Zero muddy/stale color blobs.
 */
export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const spotlight = spotlightRef.current
    if (!container || !spotlight) return

    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      // Smooth lerp (linear interpolation) for liquid inertia
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      if (spotlight) {
        spotlight.style.transform = `translate(${currentX}px, ${currentY}px)`
      }
      animId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Precision Crosshair Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-base) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-base) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 85%)',
        }}
      />

      {/* Interactive Liquid Specular Spotlight (Tracks cursor) */}
      <div
        ref={spotlightRef}
        className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-500 opacity-60 dark:opacity-40"
        style={{
          background: 'radial-gradient(circle at center, var(--accent-glow) 0%, rgba(0, 210, 255, 0.08) 45%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* Subtle Specular Vignette at screen perimeters */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, var(--bg-base) 95%)',
        }}
      />
    </div>
  )
}
