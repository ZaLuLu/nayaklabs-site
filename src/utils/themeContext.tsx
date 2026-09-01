import React, { createContext, useContext, useEffect, useState } from 'react'
import { sound } from './audioEngine'

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
  audioEnabled: boolean
  soundEnabled: boolean
  toggleAudio: () => boolean
  toggleSound: () => boolean
  cursorLabel: string | null
  setCursorLabel: (label: string | null) => void
  activeBrief: string | null
  setActiveBrief: (brief: string | null) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_ACCENTS: Record<AccentTheme, { primary: string; glow: string }> = {
  'swiss-red': {
    primary: '#E2001A',
    glow: 'rgba(226, 0, 26, 0.35)',
  },
  emerald: {
    primary: '#10B981',
    glow: 'rgba(16, 185, 129, 0.35)',
  },
  cobalt: {
    primary: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.35)',
  },
  monochrome: {
    primary: '#FFFFFF',
    glow: 'rgba(255, 255, 255, 0.35)',
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark')
  const [accentTheme, setAccentThemeState] = useState<AccentTheme>('swiss-red')
  const [audioEnabled, setAudioEnabled] = useState<boolean>(sound.isEnabled())
  const [cursorLabel, setCursorLabel] = useState<string | null>(null)
  const [activeBrief, setActiveBrief] = useState<string | null>(null)

  useEffect(() => {
    const savedMode = localStorage.getItem('nayak_theme_mode') as ThemeMode
    if (savedMode === 'light' || savedMode === 'dark') {
      setThemeModeState(savedMode)
    }

    const savedTheme = localStorage.getItem('nayak_accent_theme') as AccentTheme
    if (savedTheme && THEME_ACCENTS[savedTheme]) {
      setAccentThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
    localStorage.setItem('nayak_theme_mode', themeMode)
  }, [themeMode])

  useEffect(() => {
    const theme = THEME_ACCENTS[accentTheme]
    document.documentElement.style.setProperty('--accent-primary', theme.primary)
    document.documentElement.style.setProperty('--accent-glow', theme.glow)
    document.documentElement.setAttribute('data-accent', accentTheme)
  }, [accentTheme])

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
    sound.playClick(950)
  }

  const toggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(nextMode)
  }

  const setAccentTheme = (theme: AccentTheme) => {
    setAccentThemeState(theme)
    localStorage.setItem('nayak_accent_theme', theme)
    sound.playClick(900)
  }

  const toggleAudio = () => {
    const newState = sound.toggle()
    setAudioEnabled(newState)
    return newState
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
        audioEnabled,
        soundEnabled: audioEnabled,
        toggleAudio,
        toggleSound: toggleAudio,
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
