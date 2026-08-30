import { useEffect, useCallback, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'

import { GrainOverlay } from './components/GrainOverlay'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Products } from './components/Products'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import ComingSoon from './pages/ComingSoon'

/**
 * Main one-page layout with Lenis smooth scroll.
 */
function MainLayout() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // RAF loop
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  /**
   * Smooth-scroll to a section by id using Lenis.
   * Falls back to native scrollIntoView if lenis not ready.
   */
  const scrollTo = useCallback((id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64, duration: 1.2 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <>
      {/* Grain/noise overlay — fixed, covers full viewport */}
      <GrainOverlay />

      {/* Fixed top navigation */}
      <Navbar onScrollTo={scrollTo} />

      {/* One-page scrollable content */}
      <main>
        <Hero onScrollTo={scrollTo} />
        <About onScrollTo={scrollTo} />
        <Products />
        <Contact />
      </main>

      <Footer onScrollTo={scrollTo} />
    </>
  )
}

/**
 * Root app with router.
 * Routes:
 *   /             → Main one-page layout
 *   /coming-soon  → Placeholder page for product links
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  )
}
