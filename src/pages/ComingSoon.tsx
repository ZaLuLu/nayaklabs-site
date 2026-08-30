import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Placeholder page for product links.
 * Displays centered text with a back link.
 */
export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-c1 flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-8"
      >
        <p className="font-mono text-[0.65rem] tracking-[0.2em] text-c3" style={{ fontFamily: 'var(--font-mono)' }}>
          — PLACEHOLDER
        </p>

        <h1
          className="font-display font-bold text-c2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          Will add the URL soon.
        </h1>

        <div style={{ width: '100%', maxWidth: '120px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />

        <Link
          to="/"
          className="font-mono text-xs tracking-[0.12em] text-c3 hover:text-c2 transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ← Back
        </Link>
      </motion.div>
    </div>
  )
}
