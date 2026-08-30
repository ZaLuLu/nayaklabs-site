/**
 * Fine grain/noise overlay using SVG feTurbulence filter.
 * Fixed position, covers entire viewport, blended with overlay mix-blend-mode.
 * Lightweight CSS/SVG approach — no heavy canvas needed.
 */
export function GrainOverlay() {
  return (
    <>
      <svg
        className="grain-filter"
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999, opacity: 0.05, mixBlendMode: 'overlay' }}
      >
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </>
  )
}
