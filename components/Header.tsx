'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from '@/components/ui/Container'
import ThemeToggle from '@/components/ThemeToggle'
import { SITE_CONFIG } from '@/lib/constants'

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero-curve')
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom
        setScrolled(heroBottom <= 64)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-surface/80 backdrop-blur-md'
          : 'bg-sky-200 dark:bg-sky-900'
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {SITE_CONFIG.name}<span className="text-accent-500">.</span>
        </Link>

        <nav className="flex items-center gap-6">
          {SITE_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative pb-1 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.75 -skew-x-12 rounded-full bg-accent-500" />
              )}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
