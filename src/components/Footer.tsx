interface FooterProps {
  onScrollTo: (id: string) => void
}

/**
 * Footer strip — sits at the very bottom of the Contact section.
 * Hairline rule, then flex row: copyright · links · back to top.
 */
export function Footer({ onScrollTo }: FooterProps) {
  return (
    <footer className="relative z-10 bg-c1 border-t border-white/10" aria-label="Site footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
          {/* Left: copyright */}
          <p className="font-mono text-[0.65rem] tracking-[0.1em] text-c3" style={{ fontFamily: 'var(--font-mono)' }}>
            NAYAK LABS © 2026 — BUILT TO SHIP
          </p>

          {/* Center/right: links */}
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href="mailto:hello@nayaklabs.com"
              className="footer-link"
            >
              EMAIL
            </a>
            <a
              href="https://instagram.com/nayaklabs"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              INSTAGRAM
            </a>
            <a
              href="#"
              className="footer-link"
              onClick={(e) => e.preventDefault()}
            >
              PRIVACY POLICY
            </a>
          </div>

          {/* Right: back to top */}
          <button
            onClick={() => onScrollTo('home')}
            className="footer-link bg-transparent border-none cursor-pointer hover:text-c2 transition-colors"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
