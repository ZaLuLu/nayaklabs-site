import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  onScrollTo: (id: string) => void
}

const navLinks = [
  { label: 'Home', num: '01', id: 'home' },
  { label: 'About', num: '02', id: 'about' },
  { label: 'Products', num: '03', id: 'products' },
  { label: 'Contact', num: '04', id: 'contact' },
]

/**
 * Fixed top navigation bar.
 * - Transparent on mount, frosted dark on scroll >50px
 * - Smooth background transition via Framer Motion useScroll
 * - Clicking links triggers Lenis smooth scroll
 * - Mobile: logo + hamburger menu
 */
export function Navbar({ onScrollTo }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 50))
    return unsub
  }, [scrollY])

  const handleNav = (id: string) => {
    setMobileOpen(false)
    onScrollTo(id)
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        }}
      >
        <nav
          className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-baseline gap-2 group cursor-pointer bg-transparent border-none"
            aria-label="Nayak Labs — go to top"
          >
            <span
              className="font-display font-bold text-c2 text-xl tracking-tight transition-opacity duration-200 group-hover:opacity-80"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Nayak Labs.
            </span>
            <span
              className="font-mono text-[0.6rem] text-c3 tracking-[0.1em] hidden sm:block"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              / AI STUDIO
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-c3 hover:text-c2 transition-colors duration-150 bg-transparent border-none cursor-pointer font-body group"
              >
                <span className="font-mono text-[0.65rem] tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">{link.num}</span>
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button
              onClick={() => handleNav('contact')}
              className="btn-ghost text-sm py-2 px-4 font-body"
            >
              GET IN TOUCH →
            </button>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNav('contact')}
              className="font-mono text-xs tracking-[0.1em] text-c3 hover:text-c2 transition-colors bg-transparent border-none cursor-pointer"
            >
              CONTACT
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
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

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col items-start justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="flex items-baseline gap-3 py-4 text-4xl font-display font-bold text-c2 hover:text-c3 transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-xs text-c3">{link.num}</span>
                {link.label}
              </motion.button>
            ))}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <button
                onClick={() => handleNav('contact')}
                className="btn-primary text-sm"
              >
                GET IN TOUCH →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
