import React, { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
  duration?: number
  variant?: 'fade-up' | 'clip-wipe' | 'line-stagger' | 'depth-scale'
}

/**
 * Reusable GSAP ScrollTrigger-driven reveal wrapper with signature kinetic variants:
 * - fade-up: Smooth optical opacity & vertical rise
 * - clip-wipe: Sharp horizontal clip-path expansion (Products signature)
 * - depth-scale: 3D perspective pop with subtle scale & blur
 * - line-stagger: Staggered line reveal for copy and technical cards
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  y = 30,
  duration = 0.85,
  variant = 'fade-up',
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const mm = gsap.matchMedia()

    mm.add(
      {
        motionOK: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { motionOK } = context.conditions as { motionOK: boolean }
        if (!motionOK) {
          gsap.set(el, { opacity: 1, y: 0, scale: 1, clipPath: 'none' })
          return
        }

        if (variant === 'clip-wipe') {
          gsap.fromTo(
            el,
            {
              clipPath: 'inset(0 100% 0 0)',
              opacity: 0.2,
            },
            {
              clipPath: 'inset(0 0% 0 0)',
              opacity: 1,
              duration,
              delay,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          )
        } else if (variant === 'depth-scale') {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              scale: 0.94,
              y: y * 0.7,
              filter: 'blur(6px)',
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          )
        } else {
          // Standard fade-up / line-stagger
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y,
            },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          )
        }
      }
    )

    return () => mm.revert()
  }, [delay, y, duration, variant])

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  )
}
