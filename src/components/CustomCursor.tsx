import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from '../utils/themeContext'

export function CustomCursor() {
  const { cursorLabel } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for fluid trailing feel
  const springX = useSpring(mouseX, { stiffness: 450, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 450, damping: 30 })

  const ringSpringX = useSpring(mouseX, { stiffness: 180, damping: 24 })
  const ringSpringY = useSpring(mouseY, { stiffness: 180, damping: 24 })

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (target) {
        const interactive =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-hover')
        setIsPointer(!!interactive)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (isTouch) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]" aria-hidden="true">
      {/* Precision center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: cursorLabel ? 0 : isPointer ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing dynamic ring / badge */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: cursorLabel ? 76 : isPointer ? 44 : 26,
          height: cursorLabel ? 32 : isPointer ? 44 : 26,
          borderRadius: cursorLabel ? '16px' : '50%',
          backgroundColor: cursorLabel
            ? 'var(--accent-primary, #E2001A)'
            : isPointer
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 0.02)',
          borderColor: cursorLabel
            ? 'transparent'
            : isPointer
            ? 'rgba(255, 255, 255, 0.35)'
            : 'rgba(255, 255, 255, 0.15)',
          borderWidth: '1px',
          backdropFilter: cursorLabel ? 'blur(8px)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[0.6rem] font-bold tracking-widest text-white uppercase select-none"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </div>
  )
}
