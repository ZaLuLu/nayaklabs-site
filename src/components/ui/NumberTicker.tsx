import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface NumberTickerProps {
  value: number
  direction?: 'up' | 'down'
  className?: string
  delay?: number
  prefix?: string
  suffix?: string
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className = '',
  prefix = '',
  suffix = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value)
      }, delay * 1000)
    }
  }, [motionValue, isInView, delay, value, direction])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Intl.NumberFormat('en-US').format(
            Math.round(latest)
          )}${suffix}`
        }
      }),
    [springValue, prefix, suffix]
  )

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums font-display font-extrabold ${className}`}
    >
      {prefix}0{suffix}
    </span>
  )
}
