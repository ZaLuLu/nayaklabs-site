interface SectionEyebrowProps {
  index: string   // e.g. "02"
  label: string   // e.g. "ABOUT"
  delay?: number
  className?: string
}

/**
 * Section eyebrow label: "— 02 / ABOUT"
 * Rendered as-is (parent ScrollReveal handles animation).
 */
export function SectionEyebrow({ index, label, className = '' }: SectionEyebrowProps) {
  return (
    <p className={`font-mono text-xs tracking-[0.15em] text-c3 ${className}`}>
      — {index} / {label}
    </p>
  )
}
