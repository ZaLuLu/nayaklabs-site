import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../utils/themeContext'
import { Sun, Moon, ArrowRight, Menu, X } from 'lucide-react'

interface NavbarProps {
  onScrollTo?: (id: string) => void
}

interface NavLinkItem {
  label: string
  num: string
  id: string
  pagePath: string
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Products', num: '01', id: 'products', pagePath: '/products' },
  { label: 'Services', num: '02', id: 'services', pagePath: '/services' },
  { label: 'Academics', num: '03', id: 'academics', pagePath: '/academics' },
  { label: 'Why Us', num: '04', id: 'why-us', pagePath: '/#why-us' },
  { label: 'Contact', num: '05', id: 'contact', pagePath: '/#contact' },
]

export function Navbar({ onScrollTo }: NavbarProps) {
  const { themeMode, toggleThemeMode } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const navContainerRef = useRef<HTMLDivElement>(null)

  // Track active page or scroll position
  useEffect(() => {
    // If on subpage, set active section based on route
    if (location.pathname === '/products') {
      setActiveSection('products')
      return
    }
    if (location.pathname === '/services') {
      setActiveSection('services')
      return
    }
    if (location.pathname === '/academics') {
      setActiveSection('academics')
      return
    }

    // If on home, track scroll position
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
  }, [isHome, location.pathname])

  const handleNavClick = (link: NavLinkItem) => {
    setMobileOpen(false)

    if (isHome) {
      if (link.id === 'why-us' || link.id === 'contact' || link.id === 'products' || link.id === 'services' || link.id === 'academics') {
        if (onScrollTo) {
          onScrollTo(link.id)
        } else {
          const el = document.getElementById(link.id)
          el?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      // On subpage
      if (location.pathname === link.pagePath) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (link.pagePath.startsWith('/#')) {
        navigate('/', { state: { scrollTo: link.id } })
      } else {
        navigate(link.pagePath)
      }
    }
  }

  const handleBrandClick = () => {
    setMobileOpen(false)
    if (isHome) {
      if (onScrollTo) onScrollTo('hero')
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const handleConnectClick = () => {
    setMobileOpen(false)
    if (isHome) {
      if (onScrollTo) onScrollTo('contact')
      else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: 'contact' } })
    }
  }

  return (
    <>
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto max-w-[820px] w-full px-5 sm:px-6 h-12 rounded-full navbar-glass transition-all duration-300 flex items-center justify-between shadow-lg ${
            scrolled ? 'border-[var(--border-hover)]' : 'border-[var(--border-base)]'
          }`}
          aria-label="Primary navigation"
        >
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              onClick={handleBrandClick}
              className="flex items-center gap-1.5 group cursor-pointer bg-transparent border-none text-left select-none"
              aria-label="Nayak Labs — home"
            >
              <span className="font-display font-bold text-[var(--text-primary)] text-sm sm:text-base tracking-tight transition-opacity duration-200 group-hover:opacity-80">
                Nayak Labs
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] inline-block shadow-[0_0_8px_var(--accent-primary)] animate-pulse" />
            </Link>
          </div>

          {/* Desktop Nav Links - Free-flowing & Seamless (Zero Nested Pills) */}
          <div
            ref={navContainerRef}
            className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-medium"
          >
            {NAV_LINKS.map((link) => {
              const active =
                (!isHome && location.pathname === link.pagePath) ||
                (isHome && activeSection === link.id)

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`relative py-1 transition-all duration-200 cursor-pointer font-body text-xs select-none flex items-center gap-1.5 group ${
                    active
                      ? 'text-[var(--text-primary)] font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium'
                  }`}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)] animate-pulse" />
                  )}
                  <span>{link.label}</span>
                </button>
              )
            })}
          </div>

          {/* Action Area - Integrated & Borderless */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => toggleThemeMode()}
              className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 rounded-lg transition-colors cursor-pointer"
              title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme mode"
            >
              {themeMode === 'dark' ? (
                <Sun className="w-4 h-4 text-[var(--accent-amber)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--accent-cyan)]" />
              )}
            </button>

            <button
              onClick={handleConnectClick}
              className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3.5 text-xs font-body font-semibold rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-200 cursor-pointer shadow-xs"
            >
              <span>CONNECT</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-base)]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <div className="flex flex-col gap-5 max-w-xs mx-auto w-full">
            <div className="pb-3 mb-2 border-b border-[var(--border-base)] flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--text-muted)]">NAVIGATION // DIRECTORY</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="flex items-center justify-between text-xl font-display font-bold text-[var(--text-primary)] text-left py-2 border-b border-[var(--border-base)]"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">{link.num}</span>
              </button>
            ))}

            <button
              onClick={handleConnectClick}
              className="btn-primary w-full py-2.5 text-xs font-bold rounded-xl mt-4 flex items-center justify-center gap-2"
            >
              <span>INITIATE CONTACT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
