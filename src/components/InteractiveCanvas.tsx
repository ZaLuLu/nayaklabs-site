import { useEffect, useRef } from 'react'
import { useTheme } from '../utils/themeContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  baseAlpha: number
  pulseSpeed: number
  pulseOffset: number
}

interface AmbientOrb {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  colorDark: string
  colorLight: string
  targetX: number
  targetY: number
}

export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { themeMode } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Ambient Floating Aurora Light Orbs
    const orbs: AmbientOrb[] = [
      {
        x: width * 0.25,
        y: height * 0.3,
        radius: Math.min(width, height) * 0.35,
        vx: 0.2,
        vy: 0.15,
        colorDark: 'rgba(226, 0, 26, 0.045)', // Swiss Red glow
        colorLight: 'rgba(226, 0, 26, 0.035)',
        targetX: width * 0.25,
        targetY: height * 0.3,
      },
      {
        x: width * 0.75,
        y: height * 0.6,
        radius: Math.min(width, height) * 0.4,
        vx: -0.18,
        vy: -0.12,
        colorDark: 'rgba(59, 130, 246, 0.035)', // Cobalt glow
        colorLight: 'rgba(59, 130, 246, 0.025)',
        targetX: width * 0.75,
        targetY: height * 0.6,
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        radius: Math.min(width, height) * 0.3,
        vx: 0.15,
        vy: -0.2,
        colorDark: 'rgba(255, 255, 255, 0.025)',
        colorLight: 'rgba(0, 0, 0, 0.02)',
        targetX: width * 0.5,
        targetY: height * 0.8,
      },
    ]

    // 2. Micro Constellation Particles
    const particles: Particle[] = []
    const particleCount = 45
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
        baseAlpha: Math.random() * 0.35 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let time = 0

    const render = () => {
      time += 0.015
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04
      mouseY += (targetMouseY - mouseY) * 0.04

      ctx.clearRect(0, 0, width, height)

      // -------------------------------------------------------------
      // LAYER 1: Ambient Aurora Light Orbs
      // -------------------------------------------------------------
      for (const orb of orbs) {
        if (!prefersReducedMotion) {
          orb.x += orb.vx
          orb.y += orb.vy

          if (orb.x < -orb.radius) orb.x = width + orb.radius
          if (orb.x > width + orb.radius) orb.x = -orb.radius
          if (orb.y < -orb.radius) orb.y = height + orb.radius
          if (orb.y > height + orb.radius) orb.y = -orb.radius
        }

        // Mouse influence on orb centers
        const dx = (mouseX - width / 2) * 0.08
        const dy = (mouseY - height / 2) * 0.08
        const orbX = orb.x + dx
        const orbY = orb.y + dy

        const grad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orb.radius)
        const orbColor = isDark ? orb.colorDark : orb.colorLight
        grad.addColorStop(0, orbColor)
        grad.addColorStop(0.6, orbColor.replace(/[\d\.]+\)$/, '0.01)'))
        grad.addColorStop(1, 'rgba(0,0,0,0)')

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, width, height)
      }

      // -------------------------------------------------------------
      // LAYER 2: Blueprint Dot Matrix & Intersection Crosshairs
      // -------------------------------------------------------------
      const gridSpacing = 80
      const cols = Math.ceil(width / gridSpacing)
      const rows = Math.ceil(height / gridSpacing)

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const gx = c * gridSpacing
          const gy = r * gridSpacing

          const distToMouse = Math.hypot(gx - mouseX, gy - mouseY)
          const mouseFactor = Math.max(0, 1 - distToMouse / 280)

          // Base dot
          const dotAlpha = isDark
            ? 0.06 + mouseFactor * 0.25
            : 0.08 + mouseFactor * 0.25
          const dotColor = isDark
            ? `rgba(255, 255, 255, ${dotAlpha})`
            : `rgba(0, 0, 0, ${dotAlpha})`

          ctx.fillStyle = dotColor
          ctx.beginPath()
          ctx.arc(gx, gy, 1 + mouseFactor * 0.8, 0, Math.PI * 2)
          ctx.fill()

          // Draw subtle crosshairs at periodic intersections (every 2nd grid line)
          if (c % 2 === 0 && r % 2 === 0 && mouseFactor > 0.15) {
            const crossAlpha = mouseFactor * (isDark ? 0.35 : 0.3)
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${crossAlpha})`
              : `rgba(0, 0, 0, ${crossAlpha})`
            ctx.lineWidth = 1

            // Horizontal tick
            ctx.beginPath()
            ctx.moveTo(gx - 4, gy)
            ctx.lineTo(gx + 4, gy)
            ctx.stroke()

            // Vertical tick
            ctx.beginPath()
            ctx.moveTo(gx, gy - 4)
            ctx.lineTo(gx, gy + 4)
            ctx.stroke()
          }
        }
      }

      // -------------------------------------------------------------
      // LAYER 3: Constellation Particles & Proximity Lines
      // -------------------------------------------------------------
      if (!prefersReducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]

          p.x += p.vx
          p.y += p.vy

          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0

          // Cursor repulsion
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const dist = Math.hypot(dx, dy)
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140
            p.x += (dx / dist) * force * 0.6
            p.y += (dy / dist) * force * 0.6
          }

          // Render particle
          const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 10 + p.pulseOffset) * 0.15
          const particleColor = isDark
            ? `rgba(255, 255, 255, ${Math.max(0.08, currentAlpha)})`
            : `rgba(0, 0, 0, ${Math.max(0.12, currentAlpha)})`

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = particleColor
          ctx.fill()

          // Connect to cursor with a faint hairline
          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * (isDark ? 0.2 : 0.15)
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${lineAlpha})`
              : `rgba(0, 0, 0, ${lineAlpha})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouseX, mouseY)
            ctx.stroke()
          }

          // Connect to nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const pDist = Math.hypot(p.x - p2.x, p.y - p2.y)
            if (pDist < 90) {
              const lineAlpha = (1 - pDist / 90) * (isDark ? 0.08 : 0.06)
              ctx.strokeStyle = isDark
                ? `rgba(255, 255, 255, ${lineAlpha})`
                : `rgba(0, 0, 0, ${lineAlpha})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [themeMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  )
}
