'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark' | 'system'

function subscribeToHydration(): () => void {
  return () => {}
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system'

  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // Keep the default usable when browser storage is unavailable.
  }

  return 'system'
}

function applyTheme(t: Theme): void {
  const root = document.documentElement
  if (
    t === 'dark' ||
    (t === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false)

  useEffect(() => {
    applyTheme(theme)
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handlePreferenceChange = () => applyTheme('system')
    mediaQuery.addEventListener('change', handlePreferenceChange)
    return () => mediaQuery.removeEventListener('change', handlePreferenceChange)
  }, [theme])

  function toggleTheme(): void {
    const next: Theme =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // The selected theme still works for this page without persistence.
    }
    applyTheme(next)
  }

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors hover:bg-surface-sunken focus-ring"
      aria-label={`Tema: ${theme}`}
      title={`Tema: ${theme}`}
    >
      {theme === 'light' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : theme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
    </button>
  )
}
