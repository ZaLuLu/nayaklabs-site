import React, { createContext, useContext, useEffect, useState } from 'react'

export type AccentTheme = 'swiss-red' | 'emerald' | 'cobalt' | 'monochrome'
export type ThemeMode = 'dark' | 'light'

interface ThemeContextType {
  themeMode: ThemeMode
  theme: ThemeMode
  setThemeMode: (mode: ThemeMode) => void
  toggleThemeMode: () => void
  toggleTheme: () => void
  accentTheme: AccentTheme
  setAccentTheme: (theme: AccentTheme) => void
  cursorLabel: string | null
  setCursorLabel: (label: string | null) => void
  activeBrief: string | null
  setActiveBrief: (brief: string | null) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_ACCENTS: Record<AccentTheme, { primary: string; glow: string }> = {
  'swiss-red': {
    primary: '#E2001A',
    glow: 'rgba(226, 0, 26, 0.22)',
  },
  emerald: {
    primary: '#00F5A0',
    glow: 'rgba(0, 245, 160, 0.22)',
  },
  cobalt: {
    primary: '#00D2FF',
    glow: 'rgba(0, 210, 255, 0.22)',
  },
  monochrome: {
    primary: '#F8F9FC',
    glow: 'rgba(248, 249, 252, 0.22)',
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nayaklabs-theme') as ThemeMode
      if (saved === 'light' || saved === 'dark') return saved
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
    return 'dark'
  })

  const [accentTheme, setAccentThemeState] = useState<AccentTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nayaklabs-accent') as AccentTheme
      if (saved && THEME_ACCENTS[saved]) return saved
    }
    return 'swiss-red'
  })

  const [cursorLabel, setCursorLabel] = useState<string | null>(null)
  const [activeBrief, setActiveBrief] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
    localStorage.setItem('nayaklabs-theme', themeMode)
  }, [themeMode])

  useEffect(() => {
    const theme = THEME_ACCENTS[accentTheme]
    document.documentElement.style.setProperty('--accent-primary', theme.primary)
    document.documentElement.style.setProperty('--accent-glow', theme.glow)
    document.documentElement.setAttribute('data-accent', accentTheme)
    localStorage.setItem('nayaklabs-accent', accentTheme)
  }, [accentTheme])

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
  }

  const toggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(nextMode)
  }

  const setAccentTheme = (theme: AccentTheme) => {
    setAccentThemeState(theme)
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme: themeMode,
        setThemeMode,
        toggleThemeMode,
        toggleTheme: toggleThemeMode,
        accentTheme,
        setAccentTheme,
        cursorLabel,
        setCursorLabel,
        activeBrief,
        setActiveBrief,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
