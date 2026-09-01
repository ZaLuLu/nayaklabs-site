import { useEffect, useState, useRef } from 'react'

interface SectionEyebrowProps {
  index: string // e.g. "02"
  label: string // e.g. "ABOUT"
  className?: string
}

const CYPHER_CHARS = '!<>-_\\/[]{}—=+*^?#________'

export function SectionEyebrow({ index, label, className = '' }: SectionEyebrowProps) {
  const fullText = `— ${index} / ${label}`
  const [displayText, setDisplayText] = useState(fullText)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        fullText
          .split('')
          .map((char, idx) => {
            if (idx < iteration) {
              return fullText[idx]
            }
            if (char === ' ' || char === '/' || char === '—') return char
            return CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)]
          })
          .join('')
      )

      if (iteration >= fullText.length) {
        clearInterval(interval)
      }
      iteration += 1 / 2
    }, 28)

    return () => clearInterval(interval)
  }, [fullText])

  return (
    <p className={`font-mono text-xs tracking-[0.18em] text-[var(--accent-primary)] font-bold select-none ${className}`}>
      {displayText}
    </p>
  )
}
