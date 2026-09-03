import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { Volume2, VolumeX, Sun, Moon, ArrowRight, Menu, X } from 'lucide-react'

interface NavbarProps {
  onScrollTo?: (id: string) => void
}

const navLinks = [
  { label: 'Products', num: '01', id: 'products' },
  { label: 'Services', num: '02', id: 'services' },
  { label: 'Academics', num: '03', id: 'academics' },
  { label: 'Why Us', num: '04', id: 'why-us' },
  { label: 'Contact', num: '05', id: 'contact' },
]

export function Navbar({ onScrollTo }: NavbarProps) {
  const { themeMode, toggleThemeMode, audioEnabled, toggleAudio } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('products')
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const navContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      if (!isHome) return

      const sections = ['hero', 'products', 'services', 'academics', 'why-us', 'social', 'contact']
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
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const handleNavClick = (id?: string) => {
    sound.playClick(800)
    setMobileOpen(false)
    if (id) {
      if (isHome) {
        onScrollTo?.(id)
      } else {
        navigate('/', { state: { scrollTo: id } })
      }
    }
  }

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto max-w-[1040px] w-full px-4 sm:px-6 h-14 rounded-2xl border transition-all duration-300 flex items-center justify-between shadow-lg ${
            scrolled
              ? 'bg-[var(--glass-bg)] border-[var(--border-hover)] backdrop-blur-2xl'
              : 'bg-[var(--glass-bg)]/85 border-[var(--border-base)] backdrop-blur-xl'
          }`}
          style={{
            boxShadow: 'var(--card-shadow)',
          }}
          aria-label="Primary navigation"
        >
          {/* Brand Wordmark */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              onClick={() => {
                sound.playClick(800)
                if (isHome && onScrollTo) onScrollTo('hero')
              }}
              className="flex items-center gap-1.5 group cursor-pointer bg-transparent border-none text-left"
              aria-label="Nayak Labs — home"
            >
              <span className="font-display font-bold text-[var(--text-primary)] text-lg tracking-tight transition-opacity duration-200 group-hover:opacity-80">
                Nayak Labs
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] inline-block" />
            </Link>
          </div>

          {/* Desktop Nav Capsule with Smooth Active Pill */}
          <div
            ref={navContainerRef}
            className="relative hidden md:flex items-center gap-1 p-1 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]/60 backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const active = isHome && activeSection === link.id

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative z-10 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer font-body text-xs font-semibold ${
                    active
                      ? 'text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-base)] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">{link.num}</span>
                    <span>{link.label}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => toggleAudio()}
              className="p-2 rounded-xl border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer bg-[var(--bg-surface)]/40"
              title={audioEnabled ? 'Mute Interface Sound' : 'Enable Interface Sound'}
              aria-label={audioEnabled ? 'Mute sound' : 'Enable sound'}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-[var(--accent-emerald)]" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => toggleThemeMode()}
              className="p-2 rounded-xl border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer bg-[var(--bg-surface)]/40"
              title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme mode"
            >
              {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5 text-[var(--accent-amber)]" /> : <Moon className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 btn-primary py-1.5 px-3.5 text-xs font-body font-semibold rounded-xl"
            >
              <span>CONNECT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)]/40"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-base)]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <div className="flex flex-col gap-6 max-w-sm mx-auto w-full">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between text-2xl font-display font-bold text-[var(--text-primary)] text-left py-2 border-b border-[var(--border-base)]"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">{link.num}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
