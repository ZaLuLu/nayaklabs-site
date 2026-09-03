import { useEffect, useCallback, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ThemeProvider } from './utils/themeContext'
import { GrainOverlay } from './components/GrainOverlay'
import { Navbar } from './components/Navbar'
import { Hero3D } from './components/Hero3D'
import { PillarStack } from './components/pillars/PillarStack'
import { About } from './components/About'
import { WhyChooseUs } from './components/WhyChooseUs'
import { SocialMediaSection } from './components/SocialMediaSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { IntroSequence } from './components/intro/IntroSequence'

import ProductsPage from './pages/ProductsPage'
import ServicesPage from './pages/ServicesPage'
import AcademicsPage from './pages/AcademicsPage'
import ComingSoon from './pages/ComingSoon'

gsap.registerPlugin(ScrollTrigger)

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])
  return null
}

function MainLayout() {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('nayak_intro_seen') === 'true'
    }
    return false
  })
  const [heroAwake, setHeroAwake] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('nayak_intro_seen') === 'true'
    }
    return false
  })

  // Initialize Lenis smooth scroll + GSAP ticker sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  // Lock body scroll only while intro sequence is in progress
  useEffect(() => {
    if (!introFinished) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (lenisRef.current) {
        lenisRef.current.resize()
      }
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [introFinished])

  const scrollTo = useCallback((id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64, duration: 1.1 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Handle incoming scroll request from subpage navigation
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo && introFinished) {
      const timer = setTimeout(() => {
        scrollTo(state.scrollTo!)
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [location.state, introFinished, scrollTo])

  const handleHandoffStart = useCallback(() => {
    setHeroAwake(true)
  }, [])

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true)
    setHeroAwake(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('nayak_intro_seen', 'true')
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
      <GrainOverlay />

      {/* Intro sequence lives as a top overlay — unmasks Hero in place without layout pop */}
      {!introFinished && (
        <IntroSequence
          onHandoffStart={handleHandoffStart}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Main layout is rendered in natural flow so fonts and sizes measure with 100% precision */}
      <div className="relative w-full">
        <Navbar onScrollTo={scrollTo} />

        <main id="home">
          {/* Act 1: Hero Section with Scroll Zoom */}
          <Hero3D visible={heroAwake || introFinished} onScrollToDivision={scrollTo} />

          {/* Act 2: Dedicated Division Sections (P, S, A) */}
          <PillarStack />

          {/* Act 3: Studio Manifesto */}
          <About />

          {/* Act 4: Linear Interactive Why Choose Us */}
          <WhyChooseUs />

          {/* Act 5: Community & Dispatch (Social Media Placeholder) */}
          <SocialMediaSection />

          {/* Act 6: Direct 3-Card Contact (Gmail, LinkedIn, Instagram) */}
          <Contact />
        </main>

        <Footer onScrollTo={scrollTo} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
