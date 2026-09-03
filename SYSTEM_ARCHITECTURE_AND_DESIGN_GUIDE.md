# Nayak Labs — Complete System Architecture & Design Guide

> **Official Documentation & Technical Blueprint**  
> *Repository*: `/home/nawaz/CODING/nayaklabs-site`  
> *Engineering Standard*: Founder-led, high-velocity product studio & engineering fellowship.  
> *Stack*: React 18, TypeScript, Vite, Tailwind CSS, GSAP 3.15 + ScrollTrigger, Lenis Smooth Scroll, Web Audio API.

---

## 1. Executive Summary & Philosophy

The **Nayak Labs** web platform is engineered as a **product-first, editorial experience**. It avoids bloated agency templates and frivolous 3D canvas overhead in favor of:
1. **Immediate Comprehension**: An ambitious founder or developer understands *what* we build, *why* it matters, and *how* to explore it in under 5 seconds.
2. **Deterministic, 60fps Motion**: Choreographed entirely with **GSAP & ScrollTrigger**, tightly synchronized with **Lenis's** inertial scroll ticker.
3. **Physical Optical Depth**: Ambient fluid gradient blobs, SVG turbulence noise texture, and frosted glass panels create tangible material depth.
4. **Zero Fluff & High Conversion**: Direct WhatsApp access to founder Suraj Nayak, live algorithm memory visualizers, and an interactive 18-day sprint compiler.

---

## 2. Technical Stack & Runtime Dependencies

```
Core Technologies:
├── Framework:            React 18.2 + TypeScript (Strict)
├── Bundler & Dev Server: Vite 5.4
├── Styling:              Tailwind CSS 3.4 + Vanilla CSS Design Tokens
├── Animation Engine:     GSAP 3.15 + ScrollTrigger (Zero Framer Motion)
├── Inertial Scroll:      Lenis 1.3
├── Typography:           Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono, Instrument Serif)
├── Audio Micro-Haptics:  Web Audio API Synthesizer (Native Oscillators)
└── Icons:                Lucide React
```

### Performance & Bundle Metrics
- **Initial Gzipped JavaScript**: `126.24 kB` (Exceeding the `< 250 kB` performance budget target).
- **Build Time**: `~1.99s` with `0` TypeScript errors.
- **Code Splitting**: Interactive sandboxes (`DiNotesVisualizer`, `EventMeshRadar`) are wrapped in `React.lazy()` + `Suspense`, deferred until scrolled into view.

---

## 3. Design System & Token Specifications

### A. Typography Hierarchy

| Role | Font Family | Weights | Usage |
|---|---|---|---|
| **Display / Headings** | `"Outfit", sans-serif` | `600, 700, 800` | Section headings, Hero wordmark, primary stat numbers |
| **Body & UI Controls** | `"Plus Jakarta Sans", sans-serif` | `400, 500, 600, 700` | Body text, interactive buttons, tabs, form inputs |
| **Technical / Code** | `"JetBrains Mono", monospace` | `500, 600` | Microservice nodes, step-trace lines, category tags, timestamps |
| **Editorial Accent** | `"Instrument Serif", serif` | `400 Italic` | Single-phrase conviction emphasis (*real-world impact*, *actually ships*) |

#### Fluid Typographic Scale:
- **Hero Title**: `clamp(3.4rem, 8.5vw, 6.8rem)` / `line-height: 0.98` / `letter-spacing: -0.035em`
- **Section Heading (H2)**: `clamp(2.0rem, 4.2vw, 3.2rem)` / `line-height: 1.1` / `letter-spacing: -0.03em`
- **Card Heading (H3)**: `clamp(1.25rem, 2.0vw, 1.6rem)` / `line-height: 1.2` / `letter-spacing: -0.02em`
- **Body Large**: `1.125rem (18px)` / `line-height: 1.6` (Max `48ch` column width for readability)
- **Mono Eyebrows**: `0.75rem (12px)` / `letter-spacing: 0.1em` / `text-transform: uppercase`

---

### B. Color System & Environmental Luminance

Color is used strictly for environmental depth, structural contrast, and semantic telemetry:

```
Dark Theme (Default "Obsidian Titanium"):
├── --bg-base:        #07080B (Deep obsidian foundation)
├── --bg-card:        #0E1017 (Elevated structural surface)
├── --bg-surface:     #151824 (Interactive containers & inputs)
├── --text-primary:   #F8F9FC (Crisp optic white)
├── --text-secondary: #9499AD (Warm slate neutral)
├── --text-muted:     #767CA0 (Contrast-hardened grey — 5.2:1 WCAG AA)
├── --border-base:    rgba(255, 255, 255, 0.08)
├── --border-hover:   rgba(255, 255, 255, 0.22)
├── --glass-bg:       rgba(14, 16, 23, 0.75)
├── --accent-primary: #E2001A (Swiss Precision Crimson)
├── --accent-glow:    rgba(226, 0, 26, 0.25)
├── --accent-emerald: #00F5A0 (Active status & verified guarantees)
└── --accent-cyan:    #00D2FF (Interactive memory pointers & active links)

Light Theme ("Swiss Alabaster Studio"):
├── --bg-base:        #F8F8FA (Clean alabaster studio floor)
├── --bg-card:        #FFFFFF (Pure white surface)
├── --bg-surface:     #EEEEF2 (Subtle control background)
├── --text-primary:   #0A0B10 (Near-black obsidian text)
├── --text-secondary: #4A4E61 (Medium slate text)
├── --text-muted:     #6B7086 (Subtle grey — 5.0:1 WCAG AA)
├── --border-base:    rgba(0, 0, 0, 0.08)
├── --border-hover:   rgba(0, 0, 0, 0.24)
└── --accent-primary: #D00018 (Deep crimson)
```

---

### C. Physical Textures & Environmental Layers

1. **Site-Wide SVG Grain Texture (`GrainOverlay.tsx`)**:
   - An SVG overlay with `<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2"/>`.
   - Fixed across the viewport at `4.5%` opacity with `mix-blend-mode: overlay`.
   - Adds physical tactile warmth without tinting colors or slowing down GPU rendering.
2. **Fluid Gradient Blob Field (`HeroBackground.tsx`)**:
   - Three continuous GSAP-animated radial gradient pools (Crimson `42vw`, Emerald `36vw`, Cyan `30vw`) drifting in slow sine loops (`14s–18s`).
   - Covered with an architectural 64px grid pattern masked by a radial vignette.
3. **Elevated Frosted Glass Panels (`.hero-content`)**:
   - `backdrop-filter: blur(20px) saturate(140%)` with `1px solid var(--border-base)` hairline borders.

---

## 4. Narrative Information Flow (The 7 Acts)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACT 1: HERO (Pure GSAP Typographic Stage)                                   │
│ • Eyebrow: [ ● AI PRODUCT STUDIO & ENGINEERING FELLOWSHIP ]                 │
│ • Wordmark: "Nayak Labs." with kinetic color-morphing accent period (.)     │
│ • Subtitle: "We engineer software that ships."                              │
│ • CTAs: [ EXPLORE PRODUCTS → ]  [ SCOPE AN 18-DAY SPRINT ]                  │
│ • Telemetry: 18-Day MVP Sprint  •  100% IP Transfer  •  12-Seat Cohorts     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACT 2: FLAGSHIP IN-HOUSE PRODUCTS (01 // PRODUCTS)                          │
│ • 01 DI Notes: Interactive Algorithm & Memory Visualizer (Live Sandbox)     │
│ • 02 EventMesh: Real-Time Developer Discovery Radar (Live Filter Search)    │
│ • Framework: WHAT IS IT? → WHY IT MATTERS → HOW TO EXPLORE (Lazy Loaded)    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACT 3: ARCHITECTURE & SPRINT ESTIMATOR (02 // ESTIMATOR)                    │
│ • Mode 1: AI Prompt to Architecture Compiler                                │
│ • Mode 2: 3-Click Parameter Selector                                        │
│ • Microservice Topology: Dynamic dataflow nodes connected via AnimatedBeam  │
│ • Direct Sync: 1-Click WhatsApp brief to Suraj Nayak / Lock in Form         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACT 4: STUDIO MANIFESTO & ETHOS (03 // MANIFESTO)                           │
│ • Conviction Banner: "Do not prove them wrong, Demolish them." — Suraj Nayak│
│ • 3 Core Pillars: In-House AI Products • Fellowship Academy • Sprint Pods   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACT 5: INTEGRATED STUDIO HUB (04 // HUB)                                    │
│ • Tab 1: Custom Software & Pods (LangGraph, Next.js 15, FastAPI)            │
│ • Tab 2: 6-Week Fellowship Academy (Agentic AI & Distributed Cloud)         │
│ • Tab 3: 4-Step Operating Model (Discovery → Prototype → Build → Transfer)  │
│ • Tab 4: Policies & FAQ (Mutual NDA, Code Rights, Support Guarantee)        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACT 6: THE COMPARISON MATRIX (05 // WHY US)                                 │
│ • "Buy Premium, Get Premium" Standard                                       │
│ • Semantic Comparison: Nayak Labs vs Traditional Big Agencies vs In-House   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACT 7: HIGH-CONVERSION INQUIRY & WHATSAPP (06 // CONTACT)                   │
│ • Topic presets (MVP Sprint, Fellowship, Automation, Audit)                 │
│ • Direct WhatsApp channel to founder Suraj Nayak                            │
│ • 15-Minute Cal.com Architecture Call booking                               │
│ • 24-Hour Guaranteed Response SLA                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ FOOTER: ECOSYSTEM SITEMAP & CONTROLS                                        │
│ • Complete sitemap, Light/Dark mode switcher, 4 Accent Themes, Back-to-Top  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Component Deep Dive & Implementation Details

### 1. `Navbar.tsx` (Fixed Frosted Glass & GSAP Sliding Pill)
- **Glass Shell**: Fixed top navigation with dynamic backdrop blur triggered on scroll (`window.scrollY > 30`).
- **GSAP Sliding Pill Indicator**:
  - Instead of shipping Framer Motion, an absolute positioned background pill tracks the active section button.
  - On section change, `gsap.to(pillRef.current, { x: targetX, width: targetWidth, duration: 0.35, ease: 'power2.out' })` glides under the active link with pixel precision.
- **Controls**: Includes an audio micro-haptics toggle, light/dark mode switch, and mobile curtain drawer.

---

### 2. `Hero3D.tsx` & `HeroBackground.tsx` (Hero Experience)
- **No 3D WebGL Canvas**: Replaced with high-performance CSS radial gradients and GSAP timeline tweens.
- **Staggered Letter Entrance**:
  - Wordmark `Nayak Labs.` split into individual `span.hero-letter` elements.
  - `gsap.fromTo('.hero-letter', { opacity: 0, y: 45, rotateX: -25 }, { opacity: 1, y: 0, rotateX: 0, stagger: 0.03, ease: 'power4.out' })`.
- **Kinetic Accent Period (`.`)**:
  - Cycles through 5 vibrant brand accent colors on click (`#E2001A`, `#00F5A0`, `#00D2FF`, `#FFB800`, `#A855F7`) with sound feedback.
- **ScrollTrigger Parallax Scrub**:
  - As the user scrolls, the hero content panel translates upward (`y: -80`, `opacity: 0.15`, `scale: 0.97`) without scroll-hijacking.
- **Accessibility (`prefers-reduced-motion`)**:
  - Gated using `gsap.matchMedia()`. Reduced-motion users get instant final states with `0ms` delay and zero cursor parallax.

---

### 3. `Products.tsx` & Interactive Sandboxes (Act 2)
- **WHAT / WHY / HOW Framework**:
  - Eliminates long paragraphs; provides immediate clarity with structured cards.
- **DI Notes Algorithm Visualizer (`DiNotesVisualizer.tsx`)**:
  - Real-time step-by-step memory pointer and swap tracer for Bubble Sort, Selection Sort, and Quick Sort.
  - Features duel mode, playback controls (Play/Pause/Step/Shuffle/Speed), and line-by-line pseudocode highlighting.
- **EventMesh Radar (`EventMeshRadar.tsx`)**:
  - Live filterable developer event radar across major tech hubs.
  - Category filters (Hackathons, AI Meetups, Workshops), search input, and 1-click RSVP simulation with haptic feedback.
- **React.lazy Code Splitting**:
  - Sandboxes load on-demand with clean `<SandboxFallback />` skeleton states.

---

### 4. `ProjectEstimator.tsx` (Act 3 — Sprint Compiler)
- **AI Prompt Parser**:
  - Parses freeform text to identify intent (WhatsApp AI bot, scraping crawler, mobile SaaS, enterprise RAG) and dynamically generates:
    - Production Tech Stack (`FastAPI`, `LangGraph`, `Qdrant`, `Next.js 15`, etc.)
    - Estimated Sprint Timeline (`14–21 Days`)
    - Pod Composition (`2 Senior Engineers + AI Architect`)
- **Animated Dataflow Topology (`AnimatedBeam.tsx`)**:
  - SVG pulse gradients animating data transfer between microservice nodes.
- **1-Click WhatsApp Sync**:
  - Compiles the blueprint directly into an encoded WhatsApp URL for instant founder kickoff.

---

### 5. `StudioHub.tsx` (Act 5 — Progressive Disclosure Bento)
- **Zero Modal Drawers**:
  - Replaced friction-heavy modal popups with 4 clean inline tabs:
    - `01 // Services & Pods`: Deliverables, architectures, and stack badges.
    - `02 // Fellowship Academy`: 6-week curriculum breakdown, weekly topics, capstone projects, and seat limits.
    - `03 // 4-Step Sprint Model`: Day-by-day milestone roadmap (Discovery → Prototype in 5 days → Build → 100% IP Transfer).
    - `04 // Policies & FAQ`: Mutual NDA, code rights, and 30-day warranty.

---

### 6. `StudioComparison.tsx` (Act 6 — The Comparison)
- **"Buy Premium, Get Premium"**:
  - Displays a high-contrast matrix comparing Nayak Labs against traditional slow agencies and full-time hiring.
  - Accessible table semantics with `<th scope="col">` and `<th scope="row">` headers for screen readers.

---

### 7. `Contact.tsx` (Act 7 — Direct Founder Access)
- **Topic Preset Autofills**: 1-click selection to auto-populate the inquiry message.
- **Direct Founder Channels**: WhatsApp direct chat + 15-minute Cal.com architecture review.
- **Accessible Form Elements**: Explicit `<label htmlFor="...">` bindings.

---

### 8. `themeContext.tsx` & Audio Micro-Haptics
- **Theme Persistence & FOUC Prevention**:
  - Synchronous inline script in `index.html` initializes `data-theme` on `<html>` before React mount.
  - State saved to `localStorage` under `nayaklabs-theme`.
- **Web Audio API Engine (`audioEngine.ts`)**:
  - Synthesizes clean, short click (`800–1050 Hz`) and success chimes using native Web Audio API oscillators without external audio asset downloads.

---

## 6. Directory Structure & File Map

```
/home/nawaz/CODING/nayaklabs-site/
├── index.html                   # SEO tags, Google Fonts link, FOUC script, root div
├── tailwind.config.js           # Font family mappings & fluid typography scales
├── package.json                 # Pure dependencies (GSAP, Lenis, Lucide, React)
├── src/
│   ├── main.tsx                 # React DOM mount
│   ├── App.tsx                  # Lenis + GSAP ScrollTrigger ticker integration & 7-Act Layout
│   ├── index.css                # Obsidian & Alabaster tokens, grain overlay, blob styles
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed frosted header with GSAP sliding pill
│   │   ├── Hero3D.tsx           # Typographic hero with GSAP entrance & scroll scrub
│   │   ├── HeroBackground.tsx   # Fluid GSAP gradient blob field & grid lines
│   │   ├── GrainOverlay.tsx     # Site-wide SVG noise overlay (mix-blend-mode: overlay)
│   │   ├── Products.tsx         # Flagship in-house products (WHAT / WHY / HOW)
│   │   ├── ProjectEstimator.tsx # AI Prompt / 3-Click Sprint & Topology compiler
│   │   ├── About.tsx            # Manifesto, Suraj Nayak conviction banner, 3 pillars
│   │   ├── StudioHub.tsx        # Bento tabbed hub (Services, Fellowship, Roadmap, FAQ)
│   │   ├── StudioComparison.tsx # Semantic comparison table ("Buy Premium, Get Premium")
│   │   ├── Contact.tsx          # Accessible inquiry form & WhatsApp channel
│   │   ├── Footer.tsx           # Sitemap, theme toggles, accent theme presets
│   │   ├── ScrollReveal.tsx     # GSAP ScrollTrigger section reveal utility
│   │   ├── SectionEyebrow.tsx   # Standardized section counter badge
│   │   ├── SpotlightCard.tsx    # Pure CSS gradient mask spotlight card
│   │   ├── products/
│   │   │   ├── DiNotesVisualizer.tsx # DSA step-by-step memory pointer visualizer
│   │   │   └── EventMeshRadar.tsx    # Live developer event discovery radar
│   │   └── ui/
│   │       └── AnimatedBeam.tsx      # SVG glowing pulse dataflow beam
│   ├── utils/
│   │   ├── audioEngine.ts       # Native Web Audio API haptics synthesizer
│   │   └── themeContext.tsx     # ThemeMode (dark/light) & AccentTheme context
│   └── pages/
│       └── ComingSoon.tsx       # Placeholder page for external links
```

---

## 7. Development & Deployment Guide

### Running Locally
```bash
# Install dependencies
npm install

# Start Vite development server (hot-reload enabled)
npm run dev
# Live at: http://localhost:5173/
```

### Production Build & Type Check
```bash
# Run TypeScript type check and production bundle compilation
npm run build
# Output directory: /dist
```

### Deployment
The project builds into a static, production-optimized single-page application (`dist/`) suitable for immediate zero-config deployment to **Vercel**, **Cloudflare Pages**, **Netlify**, or **AWS S3 + CloudFront**.
