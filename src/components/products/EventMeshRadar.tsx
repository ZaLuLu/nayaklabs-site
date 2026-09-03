import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Radio, Search, Calendar, MapPin, Globe, Sparkles, History, Users, Compass, Navigation2 } from 'lucide-react'
import { useTheme } from '../../utils/themeContext'

export interface GlobalEvent {
  id: string
  title: string
  category: 'Hackathon' | 'AI Summit' | 'Conference' | 'Workshop'
  date: string
  city: string
  country: string
  lat: number
  lng: number
  attendees: number
  isPast?: boolean
  description: string
  highlights?: string[]
  isIndiaHub?: boolean
}

// Global & India Hub Events
const EVENTS_DATA: GlobalEvent[] = [
  {
    id: 'e1',
    title: 'Agentic AI Builders Hackathon 2026',
    category: 'Hackathon',
    date: 'OCT 14, 2026',
    city: 'Bengaluru',
    country: 'India',
    lat: 12.9716,
    lng: 77.5946,
    attendees: 520,
    isPast: false,
    description: '48-hour autonomous agentic workflow build with production tool-use and multi-model routing at Nayak Labs HQ.',
    highlights: ['Autonomous Agents', 'LangGraph', 'Qdrant RAG', 'Nayak Studio HQ'],
    isIndiaHub: true,
  },
  {
    id: 'e2',
    title: 'SF Global AI Systems Summit',
    category: 'AI Summit',
    date: 'NOV 08, 2026',
    city: 'San Francisco',
    country: 'USA',
    lat: 37.7749,
    lng: -122.4194,
    attendees: 1200,
    isPast: false,
    description: 'Flagship gathering of foundation model researchers, inference engineers, and GPU cluster architects.',
    highlights: ['Distributed Inference', 'vLLM', 'Custom Hardware'],
    isIndiaHub: false,
  },
  {
    id: 'e3',
    title: 'London High-Throughput Cloud Meetup',
    category: 'Conference',
    date: 'DEC 02, 2026',
    city: 'London',
    country: 'UK',
    lat: 51.5074,
    lng: -0.1278,
    attendees: 430,
    isPast: false,
    description: 'Architecting zero-downtime distributed systems, edge routing, and WebRTC telemetry.',
    highlights: ['Edge Compute', 'Distributed Data', 'Rust/Go'],
    isIndiaHub: false,
  },
  {
    id: 'e4',
    title: 'Tokyo Agentic Robotics & Vision Expo',
    category: 'Conference',
    date: 'JAN 19, 2027',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    attendees: 850,
    isPast: false,
    description: 'Embodied intelligence, real-time spatial computing, and low-latency computer vision.',
    highlights: ['Spatial AI', 'Vision Transformers', 'Robotics'],
    isIndiaHub: false,
  },
  {
    id: 'e5',
    title: 'Berlin Open Source Kernel & Rust Summit',
    category: 'Workshop',
    date: 'MAR 12, 2026',
    city: 'Berlin',
    country: 'Germany',
    lat: 52.5200,
    lng: 13.4050,
    attendees: 380,
    isPast: true,
    description: 'Benchmark deep-dive into async runtime optimizations and memory-safe systems engineering.',
    highlights: ['Rust Kernel', 'Async Runtimes', 'Security'],
    isIndiaHub: false,
  },
  {
    id: 'e6',
    title: 'Singapore FinTech & Distributed Ledger Hackathon',
    category: 'Hackathon',
    date: 'FEB 04, 2026',
    city: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    attendees: 640,
    isPast: true,
    description: 'High-frequency algorithmic settlement, zero-knowledge proofs, and micro-latency architecture.',
    highlights: ['ZK Proofs', 'Ultra-Low Latency', 'Algorithmic Systems'],
    isIndiaHub: false,
  },
  {
    id: 'e7',
    title: 'Zurich Machine Intelligence Colloquium',
    category: 'AI Summit',
    date: 'JAN 15, 2026',
    city: 'Zurich',
    country: 'Switzerland',
    lat: 47.3769,
    lng: 8.5417,
    attendees: 290,
    isPast: true,
    description: 'Theoretical frontiers of geometric deep learning and state space models.',
    highlights: ['State Space Models', 'Geometric ML', 'Mathematical Optimization'],
    isIndiaHub: false,
  },
  // India Tech Hubs
  {
    id: 'e8',
    title: 'Delhi NCR Cloud Platforms & Inference Summit',
    category: 'Conference',
    date: 'NOV 22, 2026',
    city: 'Delhi NCR',
    country: 'India',
    lat: 28.6139,
    lng: 77.2090,
    attendees: 480,
    isPast: false,
    description: 'Enterprise model serving, vLLM deployment clusters, and microservice resiliency.',
    highlights: ['Cloud Inference', 'K8s GPU', 'Platform Engineering'],
    isIndiaHub: true,
  },
  {
    id: 'e9',
    title: 'Mumbai Algorithmic Systems & High-Frequency Pod',
    category: 'Workshop',
    date: 'DEC 10, 2026',
    city: 'Mumbai',
    country: 'India',
    lat: 19.0760,
    lng: 72.8777,
    attendees: 350,
    isPast: false,
    description: 'Ultra-low-latency order routing, async C++ pipelines, and distributed ledger reconciliations.',
    highlights: ['Micro-latency', 'FinTech Telemetry', 'Async Pipelines'],
    isIndiaHub: true,
  },
  {
    id: 'e10',
    title: 'Hyderabad Distributed Runtimes & Data Pod',
    category: 'Conference',
    date: 'JAN 08, 2027',
    city: 'Hyderabad',
    country: 'India',
    lat: 17.3850,
    lng: 78.4867,
    attendees: 410,
    isPast: false,
    description: 'High-throughput Redis Streams, distributed task scheduling with BullMQ, and PostgreSQL optimization.',
    highlights: ['Distributed Queues', 'Redis Streams', 'PostgreSQL B-Trees'],
    isIndiaHub: true,
  },
  {
    id: 'e11',
    title: 'Pune Systems Engineering & Rust Infrastructure',
    category: 'Workshop',
    date: 'FEB 14, 2027',
    city: 'Pune',
    country: 'India',
    lat: 18.5204,
    lng: 73.8567,
    attendees: 290,
    isPast: false,
    description: 'Deep dive into memory-safe async runtimes, Linux kernel profiling, and eBPF observability.',
    highlights: ['Rust Systems', 'Linux eBPF', 'Kernel Profiling'],
    isIndiaHub: true,
  },
  {
    id: 'e12',
    title: 'Chennai Embodied AI & Edge Vision Lab',
    category: 'Workshop',
    date: 'FEB 28, 2027',
    city: 'Chennai',
    country: 'India',
    lat: 13.0827,
    lng: 80.2707,
    attendees: 320,
    isPast: false,
    description: 'Real-time spatial computing, vision transformers on edge GPUs, and autonomous robotics.',
    highlights: ['Edge AI', 'Vision Transformers', 'Robotics Runtimes'],
    isIndiaHub: true,
  },
]

// Geographic Continent Landmass Vector Points (lat, lng) for high-fidelity 3D Earth Globe
const CONTINENT_POINTS: { lat: number; lng: number }[] = [
  // North America
  { lat: 70, lng: -140 }, { lat: 65, lng: -160 }, { lat: 60, lng: -140 }, { lat: 55, lng: -125 },
  { lat: 50, lng: -120 }, { lat: 45, lng: -124 }, { lat: 38, lng: -122 }, { lat: 34, lng: -118 },
  { lat: 30, lng: -115 }, { lat: 25, lng: -110 }, { lat: 20, lng: -105 }, { lat: 18, lng: -95 },
  { lat: 15, lng: -90 }, { lat: 10, lng: -85 }, { lat: 9, lng: -80 }, { lat: 25, lng: -80 },
  { lat: 30, lng: -84 }, { lat: 32, lng: -80 }, { lat: 37, lng: -76 }, { lat: 41, lng: -72 },
  { lat: 44, lng: -66 }, { lat: 48, lng: -60 }, { lat: 52, lng: -56 }, { lat: 58, lng: -62 },
  { lat: 62, lng: -75 }, { lat: 60, lng: -90 }, { lat: 55, lng: -90 }, { lat: 52, lng: -80 },
  { lat: 58, lng: -95 }, { lat: 65, lng: -110 }, { lat: 68, lng: -125 },
  // North America interior density
  { lat: 48, lng: -100 }, { lat: 42, lng: -105 }, { lat: 40, lng: -90 }, { lat: 36, lng: -98 },
  { lat: 35, lng: -85 }, { lat: 45, lng: -75 }, { lat: 50, lng: -110 }, { lat: 55, lng: -105 },

  // South America
  { lat: 11, lng: -72 }, { lat: 8, lng: -60 }, { lat: 4, lng: -52 }, { lat: 0, lng: -50 },
  { lat: -5, lng: -36 }, { lat: -8, lng: -35 }, { lat: -13, lng: -39 }, { lat: -22, lng: -41 },
  { lat: -28, lng: -49 }, { lat: -35, lng: -57 }, { lat: -42, lng: -65 }, { lat: -50, lng: -68 },
  { lat: -54, lng: -70 }, { lat: -48, lng: -74 }, { lat: -40, lng: -74 }, { lat: -32, lng: -72 },
  { lat: -20, lng: -70 }, { lat: -12, lng: -77 }, { lat: -4, lng: -81 }, { lat: 2, lng: -78 },
  // South America interior
  { lat: -4, lng: -62 }, { lat: -10, lng: -55 }, { lat: -15, lng: -48 }, { lat: -22, lng: -55 },

  // Europe
  { lat: 36, lng: -6 }, { lat: 43, lng: -9 }, { lat: 47, lng: -3 }, { lat: 49, lng: 0 },
  { lat: 51, lng: 2 }, { lat: 54, lng: 8 }, { lat: 57, lng: 9 }, { lat: 60, lng: 5 },
  { lat: 65, lng: 12 }, { lat: 70, lng: 20 }, { lat: 65, lng: 25 }, { lat: 60, lng: 20 },
  { lat: 55, lng: 18 }, { lat: 54, lng: 14 }, { lat: 45, lng: 13 }, { lat: 40, lng: 18 },
  { lat: 38, lng: 24 }, { lat: 36, lng: 22 }, { lat: 42, lng: 28 }, { lat: 46, lng: 30 },
  // UK & Ireland
  { lat: 51, lng: -1 }, { lat: 53, lng: -2 }, { lat: 56, lng: -4 }, { lat: 58, lng: -5 },
  { lat: 53, lng: -8 },
  // Europe interior
  { lat: 48, lng: 10 }, { lat: 50, lng: 15 }, { lat: 52, lng: 20 }, { lat: 46, lng: 24 },

  // Africa
  { lat: 36, lng: 10 }, { lat: 32, lng: 24 }, { lat: 31, lng: 32 }, { lat: 22, lng: 37 },
  { lat: 12, lng: 43 }, { lat: 10, lng: 50 }, { lat: 5, lng: 48 }, { lat: -3, lng: 40 },
  { lat: -11, lng: 40 }, { lat: -17, lng: 38 }, { lat: -26, lng: 33 }, { lat: -34, lng: 26 },
  { lat: -34, lng: 18 }, { lat: -28, lng: 16 }, { lat: -18, lng: 12 }, { lat: -5, lng: 12 },
  { lat: 4, lng: 9 }, { lat: 5, lng: 1 }, { lat: 5, lng: -5 }, { lat: 7, lng: -12 },
  { lat: 12, lng: -16 }, { lat: 20, lng: -16 }, { lat: 28, lng: -12 }, { lat: 35, lng: -2 },
  // Africa interior
  { lat: 25, lng: 15 }, { lat: 20, lng: 25 }, { lat: 15, lng: 18 }, { lat: 0, lng: 25 },
  { lat: -10, lng: 25 }, { lat: -20, lng: 25 },

  // Asia / India / Middle East
  { lat: 30, lng: 35 }, { lat: 25, lng: 45 }, { lat: 24, lng: 55 }, { lat: 25, lng: 62 },
  // India coastline & shape
  { lat: 24, lng: 68 }, { lat: 22, lng: 69 }, { lat: 19, lng: 72 }, { lat: 15, lng: 73 },
  { lat: 12, lng: 75 }, { lat: 8.5, lng: 77 }, { lat: 10, lng: 79 }, { lat: 13, lng: 80 },
  { lat: 16, lng: 82 }, { lat: 20, lng: 86 }, { lat: 22, lng: 89 },
  // India interior
  { lat: 13, lng: 77.5 }, { lat: 17, lng: 78 }, { lat: 19, lng: 75 }, { lat: 22, lng: 78 },
  { lat: 26, lng: 77 }, { lat: 28.5, lng: 77 }, { lat: 32, lng: 76 }, { lat: 26, lng: 85 },
  // Rest of Asia
  { lat: 22, lng: 92 }, { lat: 15, lng: 97 }, { lat: 8, lng: 99 }, { lat: 2, lng: 102 },
  { lat: 5, lng: 108 }, { lat: 12, lng: 109 }, { lat: 20, lng: 107 }, { lat: 22, lng: 114 },
  { lat: 28, lng: 121 }, { lat: 35, lng: 120 }, { lat: 39, lng: 122 }, { lat: 42, lng: 130 },
  { lat: 45, lng: 140 }, { lat: 55, lng: 140 }, { lat: 60, lng: 150 }, { lat: 65, lng: 170 },
  // Japan
  { lat: 32, lng: 130 }, { lat: 35, lng: 136 }, { lat: 38, lng: 141 }, { lat: 43, lng: 144 },
  // Central/North Asia
  { lat: 40, lng: 50 }, { lat: 45, lng: 65 }, { lat: 48, lng: 80 }, { lat: 45, lng: 100 },
  { lat: 50, lng: 115 }, { lat: 55, lng: 90 }, { lat: 60, lng: 70 }, { lat: 62, lng: 100 },

  // Australia & New Zealand
  { lat: -12, lng: 132 }, { lat: -15, lng: 125 }, { lat: -20, lng: 115 }, { lat: -25, lng: 113 },
  { lat: -32, lng: 116 }, { lat: -35, lng: 120 }, { lat: -32, lng: 132 }, { lat: -38, lng: 145 },
  { lat: -34, lng: 151 }, { lat: -26, lng: 153 }, { lat: -20, lng: 148 }, { lat: -14, lng: 142 },
  { lat: -25, lng: 134 }, { lat: -42, lng: 147 }, { lat: -38, lng: 175 }, { lat: -44, lng: 170 },
]

// India Boundary polygon points normalized (0 to 1 relative to map bounding box)
const INDIA_OUTLINE: { x: number; y: number }[] = [
  { x: 0.36, y: 0.08 }, // Kashmir top
  { x: 0.42, y: 0.05 },
  { x: 0.48, y: 0.09 },
  { x: 0.50, y: 0.17 }, // Ladakh
  { x: 0.52, y: 0.22 }, // Himachal / Uttarakhand
  { x: 0.60, y: 0.25 }, // Nepal border
  { x: 0.67, y: 0.28 }, // Sikkim
  { x: 0.72, y: 0.27 }, // Bhutan border
  { x: 0.88, y: 0.25 }, // Arunachal Pradesh
  { x: 0.92, y: 0.35 }, // Nagaland / Manipur
  { x: 0.84, y: 0.45 }, // Mizoram / Tripura
  { x: 0.75, y: 0.42 }, // Bengal border
  { x: 0.70, y: 0.48 }, // Odisha coast
  { x: 0.64, y: 0.58 }, // Andhra coast
  { x: 0.58, y: 0.72 }, // Chennai coast
  { x: 0.52, y: 0.88 }, // Tamil Nadu / Cape Comorin
  { x: 0.48, y: 0.95 }, // Kanyakumari
  { x: 0.44, y: 0.85 }, // Kerala coast
  { x: 0.40, y: 0.72 }, // Karnataka coast
  { x: 0.36, y: 0.60 }, // Goa / Maharashtra coast
  { x: 0.32, y: 0.50 }, // Mumbai coast
  { x: 0.24, y: 0.44 }, // Gujarat Gulf of Cambay
  { x: 0.18, y: 0.42 }, // Saurashtra
  { x: 0.14, y: 0.38 }, // Kutch
  { x: 0.22, y: 0.32 }, // Rajasthan border
  { x: 0.26, y: 0.20 }, // Punjab border
  { x: 0.32, y: 0.14 }, // Jammu border
]

// India tech hubs mapped to relative (x, y) coordinates on the India map
const INDIA_HUBS: { city: string; x: number; y: number; role: string; isHQ?: boolean }[] = [
  { city: 'Bengaluru', x: 0.47, y: 0.74, role: 'STUDIO HQ · AGENTIC RUNTIMES', isHQ: true },
  { city: 'Delhi NCR', x: 0.42, y: 0.27, role: 'CLOUD SYSTEMS & INFERENCE' },
  { city: 'Mumbai', x: 0.32, y: 0.52, role: 'FINTECH & MICRO-LATENCY' },
  { city: 'Hyderabad', x: 0.50, y: 0.58, role: 'DISTRIBUTED QUEUES' },
  { city: 'Pune', x: 0.35, y: 0.57, role: 'KERNEL & RUST SYSTEMS' },
  { city: 'Chennai', x: 0.56, y: 0.74, role: 'EDGE VISION & ROBOTICS' },
]

export function EventMeshRadar() {
  const { themeMode } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [viewMode, setViewMode] = useState<'global' | 'india'>('global')
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru')
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 3D Globe state
  const rotationRef = useRef({ x: 0.22, y: -1.35 })
  const isDraggingRef = useRef(false)
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const autoRotateSpeedRef = useRef(0.0025)
  const pulseOffsetRef = useRef(0)

  // India radar scanline angle
  const radarAngleRef = useRef(0)

  const activeEvent = useMemo(() => {
    return (
      EVENTS_DATA.find((e) => e.city === selectedCity) ||
      EVENTS_DATA.find((e) => e.city === 'Bengaluru') ||
      EVENTS_DATA[0]
    )
  }, [selectedCity])

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((e) => {
      const matchView = viewMode === 'global' ? true : e.isIndiaHub
      const matchTab =
        activeTab === 'all' ? true : activeTab === 'upcoming' ? !e.isPast : e.isPast
      const matchSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.country.toLowerCase().includes(searchQuery.toLowerCase())
      return matchView && matchTab && matchSearch
    })
  }, [viewMode, activeTab, searchQuery])

  // Center globe onto a city lat/lng
  const rotateToCity = (lat: number, lng: number) => {
    const targetY = -((lng * Math.PI) / 180) - Math.PI / 2
    const targetX = ((lat * Math.PI) / 180) * 0.5
    rotationRef.current = { x: targetX, y: targetY }
  }

  // 3D Canvas Rendering Engine with Dual-Mode (Globe + India Radar) and Light/Dark theme adaptation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const isLight = themeMode === 'light'

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const cx = width / 2
      const cy = height / 2

      ctx.clearRect(0, 0, width, height)
      pulseOffsetRef.current += 0.015

      if (viewMode === 'global') {
        // =====================================================================
        // MODE 1: 3D HIGH-FIDELITY EARTH GLOBE WITH REAL CONTINENTS & ARCS
        // =====================================================================
        const radius = Math.min(width, height) * 0.38

        // Auto-rotation when not dragging
        if (!isDraggingRef.current) {
          rotationRef.current.y += autoRotateSpeedRef.current
        }

        const rx = rotationRef.current.x
        const ry = rotationRef.current.y

        // Globe Outer Glow Ring
        const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.15)
        glowGrad.addColorStop(
          0,
          isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(226, 0, 26, 0.09)'
        )
        glowGrad.addColorStop(
          0.7,
          isLight ? 'rgba(2, 132, 199, 0.04)' : 'rgba(0, 210, 255, 0.05)'
        )
        glowGrad.addColorStop(1, 'transparent')
        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2)
        ctx.fill()

        // Globe Sphere Base
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fillStyle = isLight ? 'rgba(236, 243, 252, 0.75)' : 'rgba(12, 16, 26, 0.65)'
        ctx.fill()
        ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.12)'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // 3D vector projection formula
        const project = (lat: number, lng: number) => {
          const phi = (lat * Math.PI) / 180
          const theta = (lng * Math.PI) / 180 + ry

          const x = radius * Math.cos(phi) * Math.sin(theta)
          const y =
            radius *
            (Math.sin(phi) * Math.cos(rx) - Math.cos(phi) * Math.sin(rx) * Math.cos(theta))
          const z =
            radius *
            (Math.sin(phi) * Math.sin(rx) + Math.cos(phi) * Math.cos(rx) * Math.cos(theta))

          return {
            x: cx + x,
            y: cy - y,
            z,
            visible: z > -radius * 0.25,
          }
        }

        // Draw Wireframe Latitude rings
        ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.04)'
        ctx.lineWidth = 1
        for (let lat = -60; lat <= 60; lat += 30) {
          ctx.beginPath()
          let first = true
          for (let lng = -180; lng <= 180; lng += 15) {
            const p = project(lat, lng)
            if (p.visible) {
              if (first) {
                ctx.moveTo(p.x, p.y)
                first = false
              } else {
                ctx.lineTo(p.x, p.y)
              }
            } else {
              first = true
            }
          }
          ctx.stroke()
        }

        // Draw High-Fidelity Continents Landmass Points
        CONTINENT_POINTS.forEach((pt) => {
          const p = project(pt.lat, pt.lng)
          if (p.visible) {
            const depth = Math.max(0.15, (p.z + radius) / (radius * 2))
            ctx.beginPath()
            ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
            ctx.fillStyle = isLight
              ? `rgba(30, 41, 59, ${depth * 0.65})`
              : `rgba(180, 215, 255, ${depth * 0.6})`
            ctx.fill()
          }
        })

        // Draw Flight & Telemetry Arcs radiating from Bengaluru (HQ)
        const blr = EVENTS_DATA.find((e) => e.city === 'Bengaluru')!
        const pBlr = project(blr.lat, blr.lng)

        if (pBlr.visible && pBlr.z > -radius * 0.1) {
          // Pulse beacon on Bengaluru
          const ringRad = 8 + (Math.sin(pulseOffsetRef.current * 3) + 1) * 6
          ctx.beginPath()
          ctx.arc(pBlr.x, pBlr.y, ringRad, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(226, 0, 26, 0.4)'
          ctx.lineWidth = 1.2
          ctx.stroke()

          // Connect arcs to major global nodes
          const targets = ['San Francisco', 'London', 'Tokyo', 'Berlin', 'Singapore', 'Zurich']
          targets.forEach((tgtCity, idx) => {
            const tgt = EVENTS_DATA.find((e) => e.city === tgtCity)
            if (!tgt) return
            const pTgt = project(tgt.lat, tgt.lng)

            if (pTgt.visible && pTgt.z > -radius * 0.15) {
              // Midpoint control point for curved flight trajectory
              const midX = (pBlr.x + pTgt.x) / 2
              const midY = (pBlr.y + pTgt.y) / 2 - 24
              ctx.beginPath()
              ctx.moveTo(pBlr.x, pBlr.y)
              ctx.quadraticCurveTo(midX, midY, pTgt.x, pTgt.y)
              ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(0, 210, 255, 0.25)'
              ctx.lineWidth = 1.2
              ctx.setLineDash([4, 4])
              ctx.stroke()
              ctx.setLineDash([])

              // Travelling pulse dot along the arc
              const t = (pulseOffsetRef.current * 0.6 + idx * 0.25) % 1
              const curX = (1 - t) * (1 - t) * pBlr.x + 2 * (1 - t) * t * midX + t * t * pTgt.x
              const curY = (1 - t) * (1 - t) * pBlr.y + 2 * (1 - t) * t * midY + t * t * pTgt.y

              ctx.beginPath()
              ctx.arc(curX, curY, 2.2, 0, Math.PI * 2)
              ctx.fillStyle = '#00D2FF'
              ctx.shadowColor = '#00D2FF'
              ctx.shadowBlur = 6
              ctx.fill()
              ctx.shadowBlur = 0
            }
          })
        }

        // Draw Event Hotspot Pins
        EVENTS_DATA.filter((e) => !e.isIndiaHub || e.city === 'Bengaluru').forEach((evt) => {
          const p = project(evt.lat, evt.lng)
          if (p.visible && p.z > 0) {
            const isSelected = evt.city === selectedCity
            const pinColor = evt.isPast
              ? '#A855F7'
              : evt.city === 'Bengaluru'
              ? '#E2001A'
              : isSelected
              ? '#E2001A'
              : '#00F5A0'

            // Hotspot Beacon
            ctx.beginPath()
            ctx.arc(p.x, p.y, isSelected ? 8 : 4.5, 0, Math.PI * 2)
            ctx.fillStyle = pinColor
            ctx.shadowColor = pinColor
            ctx.shadowBlur = isSelected ? 16 : 8
            ctx.fill()
            ctx.shadowBlur = 0

            // Inner Core
            ctx.beginPath()
            ctx.arc(p.x, p.y, isSelected ? 3 : 1.8, 0, Math.PI * 2)
            ctx.fillStyle = '#FFFFFF'
            ctx.fill()

            // City Label
            ctx.font = isSelected ? 'bold 11px JetBrains Mono' : '10px JetBrains Mono'
            ctx.fillStyle = isSelected
              ? isLight
                ? '#0A0D14'
                : '#FFFFFF'
              : isLight
              ? 'rgba(15, 23, 42, 0.7)'
              : 'rgba(255, 255, 255, 0.7)'
            ctx.fillText(evt.city, p.x + 9, p.y + 4)
          }
        })
      } else {
        // =====================================================================
        // MODE 2: HIGH-PRECISION ARCHITECTURAL INDIA RADAR MAP
        // =====================================================================
        radarAngleRef.current += 0.02
        const mapScale = Math.min(width, height) * 0.8
        const originX = cx - mapScale * 0.5
        const originY = cy - mapScale * 0.46

        // Draw Coordinate Grid Lines
        ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.05)'
        ctx.lineWidth = 1
        for (let i = 0; i <= width; i += 40) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, height)
          ctx.stroke()
        }
        for (let j = 0; j <= height; j += 40) {
          ctx.beginPath()
          ctx.moveTo(0, j)
          ctx.lineTo(width, j)
          ctx.stroke()
        }

        // Radar concentric circles around Bengaluru HQ
        const blrHub = INDIA_HUBS.find((h) => h.isHQ)!
        const blrX = originX + blrHub.x * mapScale
        const blrY = originY + blrHub.y * mapScale

        for (let r = 40; r <= mapScale * 0.6; r += 50) {
          ctx.beginPath()
          ctx.arc(blrX, blrY, r, 0, Math.PI * 2)
          ctx.strokeStyle = isLight ? 'rgba(226, 0, 26, 0.08)' : 'rgba(226, 0, 26, 0.12)'
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Radar sweep line from Bengaluru
        const sweepLen = mapScale * 0.55
        const sweepEndX = blrX + Math.cos(radarAngleRef.current) * sweepLen
        const sweepEndY = blrY + Math.sin(radarAngleRef.current) * sweepLen

        const sweepGrad = ctx.createLinearGradient(blrX, blrY, sweepEndX, sweepEndY)
        sweepGrad.addColorStop(0, 'rgba(226, 0, 26, 0.4)')
        sweepGrad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.moveTo(blrX, blrY)
        ctx.lineTo(sweepEndX, sweepEndY)
        ctx.strokeStyle = sweepGrad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw High-Precision India Outline
        ctx.beginPath()
        INDIA_OUTLINE.forEach((pt, idx) => {
          const px = originX + pt.x * mapScale
          const py = originY + pt.y * mapScale
          if (idx === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        })
        ctx.closePath()
        ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.04)' : 'rgba(0, 210, 255, 0.03)'
        ctx.fill()
        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.35)' : 'rgba(0, 210, 255, 0.35)'
        ctx.lineWidth = 1.6
        ctx.stroke()

        // Draw Indian Tech Hub Nodes with Telemetry
        INDIA_HUBS.forEach((hub) => {
          const hx = originX + hub.x * mapScale
          const hy = originY + hub.y * mapScale
          const isSelected = hub.city === selectedCity
          const isHQ = hub.isHQ

          // Pulse ring on HQ
          if (isHQ) {
            const r = 8 + (Math.sin(pulseOffsetRef.current * 4) + 1) * 8
            ctx.beginPath()
            ctx.arc(hx, hy, r, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(226, 0, 26, 0.5)'
            ctx.lineWidth = 1.2
            ctx.stroke()
          }

          // Hub Node Beacon
          ctx.beginPath()
          ctx.arc(hx, hy, isHQ ? 7 : isSelected ? 6 : 4.5, 0, Math.PI * 2)
          ctx.fillStyle = isHQ ? '#E2001A' : isSelected ? '#00D2FF' : '#00F5A0'
          ctx.shadowColor = isHQ ? '#E2001A' : '#00F5A0'
          ctx.shadowBlur = isSelected ? 14 : 6
          ctx.fill()
          ctx.shadowBlur = 0

          // Center white dot
          ctx.beginPath()
          ctx.arc(hx, hy, 2, 0, Math.PI * 2)
          ctx.fillStyle = '#FFFFFF'
          ctx.fill()

          // City Label & Role
          ctx.font = isHQ || isSelected ? 'bold 11px JetBrains Mono' : '10px JetBrains Mono'
          ctx.fillStyle = isHQ
            ? '#E2001A'
            : isSelected
            ? isLight
              ? '#0A0D14'
              : '#FFFFFF'
            : isLight
            ? 'rgba(15, 23, 42, 0.75)'
            : 'rgba(255, 255, 255, 0.75)'
          ctx.fillText(hub.city, hx + 10, hy + 3)

          if (isHQ) {
            ctx.font = '8px JetBrains Mono'
            ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)'
            ctx.fillText('STUDIO HQ', hx + 10, hy + 13)
          }
        })
      }

      animId = requestAnimationFrame(render)
    }

    render()

    // Interactive Drag Controls for 3D Globe
    const onMouseDown = (e: MouseEvent) => {
      if (viewMode !== 'global') return
      isDraggingRef.current = true
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || viewMode !== 'global') return
      const dx = e.clientX - lastMousePosRef.current.x
      const dy = e.clientY - lastMousePosRef.current.y
      rotationRef.current.y += dx * 0.006
      rotationRef.current.x = Math.max(-0.9, Math.min(0.9, rotationRef.current.x + dy * 0.006))
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDraggingRef.current = false
    }

    // Touch controls
    const onTouchStart = (e: TouchEvent) => {
      if (viewMode !== 'global') return
      if (e.touches.length === 1) {
        isDraggingRef.current = true
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1 || viewMode !== 'global') return
      const dx = e.touches[0].clientX - lastMousePosRef.current.x
      const dy = e.touches[0].clientY - lastMousePosRef.current.y
      rotationRef.current.y += dx * 0.008
      rotationRef.current.x = Math.max(-0.9, Math.min(0.9, rotationRef.current.x + dy * 0.008))
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const onTouchEnd = () => {
      isDraggingRef.current = false
    }

    const cvs = canvas
    cvs.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    cvs.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      cvs.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      cvs.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [viewMode, selectedCity, themeMode])

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    const evt = EVENTS_DATA.find((e) => e.city === city)
    if (evt && viewMode === 'global') {
      rotateToCity(evt.lat, evt.lng)
    }
  }

  return (
    <div className="w-full glass-panel p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6 text-left transition-colors duration-300">
      {/* Header Bar with Dual-Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[var(--border-base)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-4 h-4 text-[var(--accent-emerald)] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              EVENTMESH // {viewMode === 'global' ? '3D GLOBAL DEVELOPER RADAR' : 'INDIA PRECISION RADAR'}
            </span>
          </div>
          <p className="font-body text-xs text-[var(--text-secondary)]">
            {viewMode === 'global'
              ? 'Rotatable 3D Earth Globe with true continents & flight connection arcs from Bengaluru HQ.'
              : 'Precision architectural radar tracking engineering summits across premier Indian tech hubs.'}
          </p>
        </div>

        {/* View Switcher & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dual-Mode Toggle */}
          <div className="flex p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] font-mono text-xs shadow-xs">
            <button
              onClick={() => {
                setViewMode('global')
                rotateToCity(12.9716, 77.5946)
              }}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'global'
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] font-bold shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
              <span>GLOBAL MESH</span>
            </button>
            <button
              onClick={() => {
                setViewMode('india')
                setSelectedCity('Bengaluru')
              }}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'india'
                  ? 'bg-[var(--bg-card)] text-[var(--accent-primary)] font-bold shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="text-xs">🇮🇳</span>
              <span>INDIA FOCUS</span>
            </button>
          </div>

          {/* Tab Filter */}
          <div className="hidden sm:flex p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-base)] font-mono text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[var(--bg-card)] text-[var(--accent-emerald)] font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              UPCOMING
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'past'
                  ? 'bg-[var(--bg-card)] text-purple-400 font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              PAST
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search summit, hub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-base)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] rounded-xl w-32 sm:w-44 transition-colors font-mono"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas Stage + Event Details Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive Canvas Stage */}
        <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] w-full rounded-xl bg-[var(--bg-surface)]/50 border border-[var(--border-base)] overflow-hidden flex items-center justify-center select-none cursor-grab active:cursor-grabbing">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Mode Indicator Overlay Badge */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)]/85 backdrop-blur-md border border-[var(--border-base)] font-mono text-[11px] text-[var(--text-secondary)] shadow-xs">
            {viewMode === 'global' ? (
              <>
                <Compass className="w-3.5 h-3.5 text-[var(--accent-cyan)] animate-spin-slow" />
                <span>3D Earth Continents · Drag to Rotate</span>
              </>
            ) : (
              <>
                <Navigation2 className="w-3.5 h-3.5 text-[var(--accent-primary)] animate-pulse" />
                <span>India Tech Radar · Concentric Sweep Active</span>
              </>
            )}
          </div>

          {/* City selector pills */}
          <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px]">
            {(viewMode === 'global'
              ? EVENTS_DATA.filter((e) => !e.isIndiaHub || e.city === 'Bengaluru')
              : INDIA_HUBS
            ).map((item) => (
              <button
                key={item.city}
                onClick={() => handleCitySelect(item.city)}
                className={`px-2.5 py-1 rounded-lg border backdrop-blur-md transition-all cursor-pointer ${
                  item.city === selectedCity
                    ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-sm font-bold'
                    : 'bg-[var(--bg-card)]/80 border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.city} {item.city === 'Bengaluru' && '★ HQ'}
              </button>
            ))}
          </div>
        </div>

        {/* Event Detail Inspector Card */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[var(--bg-surface)]/60 border border-[var(--border-base)] p-6 rounded-xl shadow-xs">
          {activeEvent ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-base)] text-xs font-mono font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                  {activeEvent.category}
                </span>

                {activeEvent.isPast ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-purple-400 font-bold">
                    <History className="w-3.5 h-3.5" />
                    PAST BENCHMARK
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--accent-emerald)] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    ACTIVE STAGE
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)] mb-2">
                  {activeEvent.title}
                </h3>
                <p className="font-body text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  {activeEvent.description}
                </p>
              </div>

              <div className="space-y-2 py-3 border-y border-[var(--border-base)] font-mono text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  <span className="text-[var(--text-primary)] font-semibold">{activeEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  <span>
                    {activeEvent.city}, {activeEvent.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  <span>{activeEvent.attendees.toLocaleString()} Engineering Attendees</span>
                </div>
              </div>

              {activeEvent.highlights && (
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {activeEvent.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-base)] text-[var(--text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-[var(--text-muted)]">
              Select a city or node on the 3D radar to inspect telemetry.
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-[var(--border-base)] flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-muted)]">Node: {selectedCity}</span>
            <span className="text-[var(--accent-emerald)] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              ACTIVE TELEMETRY
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
