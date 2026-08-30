import { useEffect, useState } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react'

interface NavbarProps {
  onScrollTo: (id: string) => void
}

const navLinks = [
  { label: 'Home', num: '00', id: 'home' },
  { label: 'Ecosystem', num: '01', id: 'about' },
  { label: 'Products', num: '02', id: 'products' },
  { label: 'Training', num: '03', id: 'training' },
  { label: 'Services', num: '04', id: 'services' },
  { label: 'Field Notes', num: '05', id: 'notes' },
  { label: 'Contact', num: '06', id: 'contact' },
]

export function Navbar({ onScrollTo }: NavbarProps) {
  const {
    themeMode,
    toggleThemeMode,
    audioEnabled,
    toggleAudio,
    setCursorLabel,
  } = useTheme()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 30))
    return unsub
  }, [scrollY])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'training', 'services', 'notes', 'contact']
      const scrollPos = window.scrollY + 200

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
          {/* Wordmark Brand */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group cursor-pointer bg-transparent border-none text-left"
            aria-label="Nayak Labs — go to top"
          >
            <span
              className="font-display font-bold text-[var(--text-primary)] text-xl tracking-tight transition-opacity duration-200 group-hover:opacity-80"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Nayak Labs.
            </span>
            <span
              className="font-mono text-[0.6rem] text-[var(--text-muted)] tracking-[0.15em] hidden sm:inline-block px-2 py-0.5 border border-[var(--border-base)] rounded-xs bg-[var(--bg-card)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              AI STUDIO
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-base)] px-2 py-1 rounded-full backdrop-blur-md shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all duration-150 rounded-full cursor-pointer ${
                    isActive
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-sm'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-transparent'
                  }`}
                >
                  <span className={`text-[0.6rem] ${isActive ? 'opacity-70' : 'opacity-50'}`}>
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                </button>
              )
            })}
          </div>

          {/* Action buttons (Theme Toggle + Audio Equalizer + CTA) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button (Light ☀️ / Dark 🌙) */}
            <button
              onClick={() => toggleThemeMode()}
              onMouseEnter={() => setCursorLabel(themeMode === 'dark' ? 'LIGHT' : 'DARK')}
              onMouseLeave={() => setCursorLabel(null)}
              className="p-2 bg-[var(--bg-card)] border border-[var(--border-base)] hover:border-[var(--border-hover)] text-[var(--text-primary)] rounded-full transition-all cursor-pointer shadow-sm flex items-center justify-center"
              title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle theme mode"
            >
              {themeMode === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-blue-600" />
              )}
            </button>

            {/* Audio Micro-Haptics Equalizer Toggle */}
            <button
              onClick={() => toggleAudio()}
              onMouseEnter={() => setCursorLabel(audioEnabled ? 'MUTE' : 'UNMUTE')}
              onMouseLeave={() => setCursorLabel(null)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 border rounded-xs font-mono text-[0.65rem] transition-colors cursor-pointer ${
                audioEnabled
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-[var(--border-base)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title={audioEnabled ? 'Mute Sound Effects' : 'Enable Micro-Audio Haptics'}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-emerald-500 animate-pulse h-2" />
                    <span className="w-0.5 bg-emerald-500 animate-pulse h-3" />
                    <span className="w-0.5 bg-emerald-500 animate-pulse h-1.5" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">MUTED</span>
                </>
              )}
            </button>

            {/* CTA */}
            <button
              onClick={() => handleNav('contact')}
              className="btn-primary text-xs py-2 px-4 font-mono tracking-wider ml-1"
            >
              GET IN TOUCH →
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => toggleThemeMode()}
              className="p-2 text-[var(--text-primary)]"
              aria-label="Toggle theme"
            >
              {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>

            <button
              onClick={() => toggleAudio()}
              className="p-2 text-[var(--text-muted)]"
              aria-label="Toggle audio"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                className="hamburger-line"
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="hamburger-line"
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              />
              <motion.span
                className="hamburger-line"
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--bg-base)] flex flex-col items-start justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="flex items-baseline gap-3 py-3 text-3xl font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <span className="font-mono text-xs text-[var(--text-muted)]">{link.num}</span>
                {link.label}
              </motion.button>
            ))}

            <div className="mt-8 flex flex-col gap-3 w-full">
              <button
                onClick={() => handleNav('contact')}
                className="btn-primary text-xs py-3 w-full justify-center"
              >
                START A CONVERSATION →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
