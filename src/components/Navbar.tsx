import { useEffect, useState } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Volume2, VolumeX, Sun, Moon, ArrowRight, Menu, X } from 'lucide-react'

interface NavbarProps {
  onScrollTo: (id: string) => void
}

const navLinks = [
  { label: 'Manifesto', num: '01', id: 'about' },
  { label: 'Estimator', num: '02', id: 'estimator' },
  { label: 'Products', num: '03', id: 'products' },
  { label: 'Studio Hub', num: '04', id: 'hub' },
  { label: 'Contact', num: '05', id: 'contact' },
]

export function Navbar({ onScrollTo }: NavbarProps) {
  const { themeMode, toggleThemeMode, audioEnabled, toggleAudio } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 20))
    return unsub
  }, [scrollY])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'estimator', 'products', 'hub', 'contact']
      const scrollPos = window.scrollY + 220

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (id: string) => {
    sound.playClick(800)
    setMobileOpen(false)
    onScrollTo(id)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-base)' : '1px solid transparent',
        }}
      >
        <nav
          className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Left: Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 group cursor-pointer bg-transparent border-none text-left"
              aria-label="Nayak Labs — go to top"
            >
              <span
                className="font-display font-black text-[var(--text-primary)] text-xl tracking-tight transition-opacity duration-200 group-hover:opacity-80"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Nayak Labs.
              </span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[var(--text-primary)] bg-[var(--bg-surface)] font-bold'
                      : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]/60'
                  }`}
                >
                  <span className="text-[10px] text-[var(--text-muted)] mr-1.5">{link.num}</span>
                  <span>{link.label}</span>
                </button>
              )
            })}
          </div>

          {/* Right: Controls & CTA */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                audioEnabled
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-glow)]/15 text-[var(--accent-primary)]'
                  : 'border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title={audioEnabled ? 'Audio Micro-Haptics Enabled' : 'Audio Muted'}
              aria-label="Toggle Audio Micro-Haptics"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleThemeMode}
              className="p-2 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all cursor-pointer"
              title="Toggle Light / Dark Theme"
              aria-label="Toggle Theme"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Start Project CTA */}
            <button
              onClick={() => handleNav('contact')}
              className="btn-primary hidden sm:inline-flex py-2 px-3.5 text-xs"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 bg-[var(--bg-card)] border-b border-[var(--border-base)] p-6 shadow-2xl lg:hidden backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3 font-mono text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[var(--accent-primary)] font-bold">{link.num}</span>
                </button>
              ))}
              <button
                onClick={() => handleNav('contact')}
                className="btn-primary w-full justify-center mt-2 py-3"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 ml-1 inline" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
