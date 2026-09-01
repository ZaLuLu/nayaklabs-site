import { sound } from '../utils/audioEngine'
import { useTheme, AccentTheme } from '../utils/themeContext'
import { ArrowUp, Sun, Moon } from 'lucide-react'

interface FooterProps {
  onScrollTo: (id: string) => void
}

export function Footer({ onScrollTo }: FooterProps) {
  const { accentTheme, setAccentTheme, themeMode, toggleThemeMode } = useTheme()

  return (
    <footer className="relative z-10 bg-[var(--bg-base)] border-t border-[var(--border-base)] transition-colors duration-300" aria-label="Site footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {/* Top footer row: Ecosystem columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-12 border-b border-[var(--border-base)] font-mono text-xs">
          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">PRODUCTS</p>
            <ul className="flex flex-col gap-2 text-[var(--text-muted)]">
              <li><a href="#products" onClick={() => onScrollTo('products')} className="hover:text-[var(--text-primary)] transition-colors">DI Notes Visualizer</a></li>
              <li><a href="#products" onClick={() => onScrollTo('products')} className="hover:text-[var(--text-primary)] transition-colors">EventMesh Radar</a></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">ACADEMY</p>
            <ul className="flex flex-col gap-2 text-[var(--text-muted)]">
              <li><a href="#training" onClick={() => onScrollTo('training')} className="hover:text-[var(--text-primary)] transition-colors">Cohort Curriculum</a></li>
              <li><a href="#training" onClick={() => onScrollTo('training')} className="hover:text-[var(--text-primary)] transition-colors">DSA Masterclass</a></li>
              <li><a href="#training" onClick={() => onScrollTo('training')} className="hover:text-[var(--text-primary)] transition-colors">AI & MLOps Track</a></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">SERVICES</p>
            <ul className="flex flex-col gap-2 text-[var(--text-muted)]">
              <li><a href="#services" onClick={() => onScrollTo('services')} className="hover:text-[var(--text-primary)] transition-colors">Custom AI Models</a></li>
              <li><a href="#services" onClick={() => onScrollTo('services')} className="hover:text-[var(--text-primary)] transition-colors">High-Velocity Web</a></li>
              <li><a href="#services" onClick={() => onScrollTo('services')} className="hover:text-[var(--text-primary)] transition-colors">Workflow Automation</a></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">CONNECT</p>
            <ul className="flex flex-col gap-2 text-[var(--text-muted)]">
              <li><a href="mailto:hello@nayaklabs.com" className="hover:text-[var(--text-primary)] transition-colors">hello@nayaklabs.com</a></li>
              <li><a href="https://instagram.com/nayaklabs" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Instagram ↗</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">Twitter / X ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom footer row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 font-mono text-xs text-[var(--text-muted)]">
          {/* Left: Copyright */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary,#E2001A)]" />
            <p className="text-xs tracking-wider text-[var(--text-secondary)]">
              NAYAK LABS © 2026 — ENGINEERED TO SHIP
            </p>
          </div>

          {/* Theme Quick Switcher */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => toggleThemeMode()}
              className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--border-base)] rounded-md hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-pointer bg-[var(--bg-surface)]"
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

            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-muted)]">ACCENT:</span>
              {(
                [
                  { id: 'swiss-red', label: 'RED' },
                  { id: 'emerald', label: 'EMR' },
                  { id: 'cobalt', label: 'BLU' },
                  { id: 'monochrome', label: 'MONO' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAccentTheme(t.id as AccentTheme)}
                  className={`px-2 py-0.5 border rounded-md transition-colors cursor-pointer text-xs ${
                    accentTheme === t.id
                      ? 'border-[var(--btn-primary-bg)] text-[var(--text-primary)] font-bold bg-[var(--bg-surface)]'
                      : 'border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Back to top */}
          <button
            onClick={() => {
              sound.playClick(800)
              onScrollTo('home')
            }}
            className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors cursor-pointer bg-transparent border-none text-xs"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
