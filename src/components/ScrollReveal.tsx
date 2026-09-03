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
}

/**
 * Reusable GSAP ScrollTrigger-driven reveal wrapper.
 * Smoothly animates opacity 0->1 and translateY with clean power3.out easing,
 * and seamlessly provides instant visibility under prefers-reduced-motion: reduce.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  y = 30,
  duration = 0.8,
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
          gsap.set(el, { opacity: 1, y: 0 })
          return
        }

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
    )

    return () => mm.revert()
  }, [delay, y, duration])

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  )
}
