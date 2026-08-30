import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'

const SECTIONS = [
  { id: 'home', num: '00', label: 'Home' },
  { id: 'about', num: '01', label: 'Ecosystem' },
  { id: 'products', num: '02', label: 'Products' },
  { id: 'training', num: '03', label: 'Training' },
  { id: 'services', num: '04', label: 'Services' },
  { id: 'notes', num: '05', label: 'Field Notes' },
  { id: 'contact', num: '06', label: 'Contact' },
]

export function SectionNavRail() {
  const { setCursorLabel } = useTheme()
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setScrollPercent(Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))))
      }

      const scrollPos = scrollY + 250
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollTo = (id: string) => {
    sound.playClick(850)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center select-none"
      aria-label="Section navigation rail"
    >
      {/* Scroll Progress Ring / Percentage */}
      <div className="mb-4 flex flex-col items-center">
        <span className="font-mono text-[0.58rem] tracking-wider text-[var(--text-muted)] font-semibold">
          {scrollPercent}%
        </span>
      </div>

      {/* Vertical Rail Line & Interactive Section Checkpoints */}
      <div className="relative py-2 flex flex-col items-center gap-5">
        {/* Continuous background hairline track */}
        <div
          className="absolute top-0 bottom-0 w-px bg-[var(--border-base)]"
          aria-hidden="true"
        />

        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id
          const isHovered = hoveredSection === sec.id

          return (
            <div key={sec.id} className="relative flex items-center justify-center">
              {/* Tooltip on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="absolute right-7 px-2.5 py-1 bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xl rounded-xs font-mono text-[0.62rem] text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50 flex items-center gap-1.5"
                >
                  <span className="text-[var(--accent-primary)] font-bold">{sec.num}</span>
                  <span className="uppercase tracking-wider">{sec.label}</span>
                </motion.div>
              )}

              {/* Node Button */}
              <button
                onClick={() => handleScrollTo(sec.id)}
                onMouseEnter={() => {
                  setHoveredSection(sec.id)
                  setCursorLabel(sec.num)
                }}
                onMouseLeave={() => {
                  setHoveredSection(null)
                  setCursorLabel(null)
                }}
                className="relative z-10 p-1 bg-transparent border-none cursor-pointer flex items-center justify-center group"
                aria-label={`Scroll to ${sec.label}`}
              >
                <div
                  className={`transition-all duration-200 rounded-full ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-[var(--accent-primary)] ring-4 ring-[var(--accent-glow)]'
                      : isHovered
                      ? 'w-2 h-2 bg-[var(--text-primary)] scale-125'
                      : 'w-1.5 h-1.5 bg-[var(--text-muted)] hover:bg-[var(--text-primary)]'
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>

      {/* Bottom Telemetry Coordinate Stamp */}
      <div className="mt-4 font-mono text-[0.52rem] text-[var(--text-muted)] tracking-widest uppercase opacity-60">
        BLR
      </div>
    </div>
  )
}
