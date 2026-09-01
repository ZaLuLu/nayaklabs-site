import { useEffect, useCallback, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'

import { ThemeProvider } from './utils/themeContext'
import { GrainOverlay } from './components/GrainOverlay'
import { Navbar } from './components/Navbar'
import { Hero3D } from './components/Hero3D'
import { IntroEthos } from './components/IntroEthos'
import { TechStackMarquee } from './components/TechStackMarquee'
import { About } from './components/About'
import { ProjectEstimator } from './components/ProjectEstimator'
import { Products } from './components/Products'
import { WorkflowSlider } from './components/WorkflowSlider'
import { StudioHub } from './components/StudioHub'
import { StudioComparison } from './components/StudioComparison'
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
      {/* Micro grain texture overlay */}
      <GrainOverlay />

      {/* Modern Fixed Navbar */}
      <Navbar onScrollTo={scrollTo} />

      {/* Main Unified 6-Act Studio Experience */}
      <main id="home">
        {/* Act 1: 3D Wordmark Hero with Torchlight Specular Sheen & Kinetic Dot Burst */}
        <Hero3D />

        {/* Act 2: Studio Overview & Suraj Nayak Conviction Quote */}
        <IntroEthos onScrollTo={scrollTo} />

        {/* Capabilities Ticker */}
        <TechStackMarquee />

        {/* Act 3: The Manifesto & Standard with Word Illumination & Number Ticker */}
        <About onScrollTo={scrollTo} />

        {/* Act 4: Unified Architecture & Sprint Engine with Animated Beam Topology */}
        <ProjectEstimator />

        {/* Act 5: Flagship In-House Ventures (DI Notes Duel & EventMesh Radar) */}
        <Products />

        {/* Act 6: Before & After Business Transformation */}
        <WorkflowSlider />

        {/* Act 7: On-Demand Studio Hub (Services, Fellowship, 4-Step Process, FAQ) */}
        <StudioHub onScrollTo={scrollTo} />

        {/* Act 8: "Buy Premium, Get Premium" Comparison Matrix */}
        <StudioComparison />

        {/* Act 9: High-Conversion Inquiry, WhatsApp Fast-Track & Booking */}
        <Contact />
      </main>

      {/* Studio Footer */}
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
