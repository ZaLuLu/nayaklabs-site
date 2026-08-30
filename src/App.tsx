import { useEffect, useCallback, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'

import { ThemeProvider } from './utils/themeContext'
import { GrainOverlay } from './components/GrainOverlay'
import { InteractiveCanvas } from './components/InteractiveCanvas'
import { CustomCursor } from './components/CustomCursor'
import { SectionNavRail } from './components/SectionNavRail'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Products } from './components/Products'
import { TrainingRoadmap } from './components/TrainingRoadmap'
import { ServicesConfigurator } from './components/ServicesConfigurator'
import { FieldNotesGrid } from './components/FieldNotesGrid'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import ComingSoon from './pages/ComingSoon'

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
    <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      {/* 1. Precision trailing magnetic cursor */}
      <CustomCursor />

      {/* 2. Rich atmospheric canvas (Ambient Aurora Orbs + Blueprint Matrix + Constellation) */}
      <InteractiveCanvas />

      {/* 3. Micro grain texture overlay */}
      <GrainOverlay />

      {/* 4. Fixed navigation with Light/Dark toggle & Audio haptics */}
      <Navbar onScrollTo={scrollTo} />

      {/* 5. Floating right-edge HUD Section Navigation Rail */}
      <SectionNavRail />

      {/* 6. Main Ecosystem Sections */}
      <main>
        <Hero onScrollTo={scrollTo} />
        <About onScrollTo={scrollTo} />
        <Products />
        <TrainingRoadmap />
        <ServicesConfigurator />
        <FieldNotesGrid />
        <Contact />
      </main>

      {/* 7. Footer */}
      <Footer onScrollTo={scrollTo} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
