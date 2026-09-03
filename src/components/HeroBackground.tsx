import React, { useRef, useEffect } from 'react'

/**
 * HeroBackground:
 * Multi-layered Chromatic Space Aurora & Frosted Glass Caustics.
 * Blends vibrant cyan, electric violet, and fiery amber light streaks behind a subtle architectural grid.
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
      {/* ── Layer 1: Ambient Chromatic Space Aurora Caustic Blobs ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Violet / Purple Aurora Caustic (Center-Left) */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[70vw] h-[75vh] rounded-full opacity-40 dark:opacity-35 animate-pulse"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.45) 0%, rgba(99, 102, 241, 0.2) 45%, transparent 70%)',
            filter: 'blur(70px)',
            animationDuration: '8s',
          }}
        />

        {/* Electric Cyan Aurora Caustic (Center-Right) */}
        <div
          className="absolute top-[20%] -right-[15%] w-[65vw] h-[70vh] rounded-full opacity-45 dark:opacity-35"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 210, 255, 0.45) 0%, rgba(2, 132, 199, 0.2) 50%, transparent 75%)',
            filter: 'blur(75px)',
          }}
        />

        {/* Fiery Amber / Crimson Horizon Core (Bottom Center) */}
        <div
          className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[85vw] h-[65vh] rounded-full opacity-40 dark:opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 107, 0, 0.4) 0%, rgba(226, 0, 26, 0.25) 40%, transparent 75%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ── Layer 2: Vertical Fluted Crystal Glass Ribs & Caustics ── */}
      <div
        className="absolute inset-0 opacity-[0.22] dark:opacity-[0.18]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 56px, rgba(255, 255, 255, 0.035) 56px, rgba(255, 255, 255, 0.035) 58px)',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* ── Layer 3: Precision Crosshair Architectural Coordinate Grid ── */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.20]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-base) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-base) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 85%)',
        }}
      />

      {/* ── Layer 4: Interactive Liquid Specular Spotlight (Tracks cursor) ── */}
      <div
        ref={spotlightRef}
        className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-500 opacity-60 dark:opacity-45"
        style={{
          background: 'radial-gradient(circle at center, var(--accent-glow) 0%, rgba(0, 210, 255, 0.12) 40%, rgba(139, 92, 246, 0.08) 60%, transparent 75%)',
          filter: 'blur(55px)',
          willChange: 'transform',
        }}
      />

      {/* ── Layer 5: Subtle Specular Vignette at screen perimeters ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, var(--bg-base) 95%)',
        }}
      />
    </div>
  )
}
