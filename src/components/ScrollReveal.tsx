import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

/**
 * Reusable scroll-triggered reveal animation wrapper.
 * Elements animate in: opacity 0→1, translateY 24px→0
 * Respects prefers-reduced-motion automatically.
 */
export function ScrollReveal({ children, delay = 0, className = '', y = 24 }: ScrollRevealProps) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1], // expo out
      }}
    >
      {children}
    </motion.div>
  )
}
