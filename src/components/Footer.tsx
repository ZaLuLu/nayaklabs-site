import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { sound } from '../utils/audioEngine'
import { useTheme } from '../utils/themeContext'
import { ArrowUp, Sun, Moon } from 'lucide-react'

interface FooterProps {
  onScrollTo?: (id: string) => void
}

export function Footer({ onScrollTo }: FooterProps) {
  const { themeMode, toggleThemeMode } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleScroll = (id: string) => {
    sound.playClick(800)
    if (location.pathname === '/') {
      if (onScrollTo) {
        onScrollTo(id)
      } else {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <footer
      className="relative z-10 bg-[var(--bg-base)] border-t border-[var(--border-base)] transition-colors duration-300"
      aria-label="Site footer"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16">
        {/* Top footer row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-12 border-b border-[var(--border-base)] font-mono text-xs">
          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              DIVISIONS
            </p>
            <ul className="flex flex-col gap-2.5 text-[var(--text-secondary)] font-body text-xs">
              <li>
                <Link to="/products" className="hover:text-[var(--text-primary)] transition-colors">
                  01 / Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[var(--text-primary)] transition-colors">
                  02 / Services
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-[var(--text-primary)] transition-colors">
                  03 / Academics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              PLATFORMS
            </p>
            <ul className="flex flex-col gap-2.5 text-[var(--text-secondary)] font-body text-xs">
              <li>
                <Link to="/products" className="hover:text-[var(--text-primary)] transition-colors">
                  DI Notes Visualizer
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[var(--text-primary)] transition-colors">
                  EventMesh Radar
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[var(--text-primary)] transition-colors">
                  Sprint Scope Estimator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              STUDIO
            </p>
            <ul className="flex flex-col gap-2.5 text-[var(--text-secondary)] font-body text-xs">
              <li>
                <button
                  onClick={() => handleScroll('about')}
                  className="hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                >
                  Studio Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('why-us')}
                  className="hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('contact')}
                  className="hover:text-[var(--text-primary)] transition-colors text-left cursor-pointer"
                >
                  Start a Build
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              DIRECT ACCESS
            </p>
            <ul className="flex flex-col gap-2.5 text-[var(--text-secondary)] font-body text-xs">
              <li>
                <a
                  href="mailto:hello@nayaklabs.com"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  hello@nayaklabs.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ZaLuLu/nayaklabs-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/?text=Hello%20Nayak%20Labs%20Team"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  WhatsApp Fast-Track ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 font-mono text-xs text-[var(--text-muted)]">
          {/* Copyright */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            <p className="text-xs tracking-wider text-[var(--text-secondary)]">
              NAYAK LABS © 2026 — ENGINEERED TO SHIP
            </p>
          </div>

          {/* Theme & Back to top */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => toggleThemeMode()}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-base)] rounded-xl hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer bg-[var(--bg-surface)]"
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>LIGHT MODE</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-600" />
                  <span>DARK MODE</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sound.playClick(900)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-base)] rounded-xl hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer bg-[var(--bg-surface)]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
