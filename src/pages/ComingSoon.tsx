import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { GrainOverlay } from '../components/GrainOverlay'

/**
 * Placeholder page for product links with pure CSS animations.
 */
export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col items-center justify-center px-6 text-center text-[var(--text-primary)] relative transition-colors duration-300">
      <GrainOverlay />
      <Navbar />

      <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-6 duration-500 max-w-lg mx-auto pt-16">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--text-muted)] uppercase">
          — PRODUCT PORTAL
        </p>

        <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-[var(--text-primary)]">
          Live release deploying soon.
        </h1>

        <div className="w-24 h-px bg-[var(--border-base)]" />

        <Link
          to="/"
          className="btn-primary py-2.5 px-5 text-xs font-body font-semibold rounded-xl"
        >
          ← Return to Nayak Labs
        </Link>
      </div>
    </div>
  )
}
