/**
 * Corner crosshair "+" marks for Hero and Contact sections.
 * Rendered in all four corners of the parent (position: relative required).
 */
export function CrosshairTicks() {
  return (
    <>
      {/* Top-left */}
      <span className="crosshair" style={{ top: '1.5rem', left: '1.5rem' }} aria-hidden="true" />
      {/* Top-right */}
      <span className="crosshair" style={{ top: '1.5rem', right: '1.5rem' }} aria-hidden="true" />
      {/* Bottom-left */}
      <span className="crosshair" style={{ bottom: '1.5rem', left: '1.5rem' }} aria-hidden="true" />
      {/* Bottom-right */}
      <span className="crosshair" style={{ bottom: '1.5rem', right: '1.5rem' }} aria-hidden="true" />
    </>
  )
}
