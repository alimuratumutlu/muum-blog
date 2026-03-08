# Prompt 04: Root Layout, Header, Footer, Container

## Bağımlılıklar
- Prompt 03 tamamlanmış olmalı (font tanımları, Tailwind tema)

## Kural Referansları
- rules/design-system.md — layout, spacing, nav kuralları
- rules/code-standards.md — component yapısı, import sırası
- rules/file-naming.md — PascalCase component dosyaları

## Tasarım Notu

**Referans:** joshwcomeau.com navigasyonu — temiz, renkli accent'li, scroll'da sticky.
**Logo:** Text-based "ai pusulası" (placeholder, sonra değiştirilecek)

## Görev

### 1. lib/constants.ts — Site Metadatası

```typescript
export const SITE_CONFIG = {
  name: 'ai pusulası',
  description: 'Yapay zeka dünyasından derinlemesine analizler, teknik incelemeler ve rehberler.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.umutlu.net',
  author: {
    name: 'ai pusulası',
    twitter: '@muratumutlu', // varsa
  },
  nav: [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Hakkımda', href: '/about' },
  ],
} as const
```

### 2. components/ui/Container.tsx

Sayfa genelinde kullanılacak wrapper component:

```tsx
export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-4xl px-4 md:px-6 ${className ?? ''}`}>
      {children}
    </div>
  )
}
```

### 3. components/Header.tsx

- Sticky header, blur backdrop
- Text logo "murat umutlu" — gradient text kullan (teal/lime)
- Nav linkleri: Ana Sayfa, Blog, Hakkımda
- Sağda ThemeToggle placeholder (Prompt 14'te implement edilecek)
- Aktif sayfa linki accent renkle vurgulanır
- Mobile'da nav linkleri inline kalır (hamburger menü YASAK — rules/design-system.md)

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from '@/components/ui/Container'
import { SITE_CONFIG } from '@/lib/constants'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gradient">
          {SITE_CONFIG.name}
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          {SITE_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent-500 ${
                pathname === item.href
                  ? 'text-accent-600 dark:text-accent-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* ThemeToggle buraya eklenecek — Prompt 14 */}
        </nav>
      </Container>
    </header>
  )
}
```

### 4. components/Footer.tsx

- Minimalist footer
- Copyright + yıl
- Accent renk border-top
- RSS ve sosyal linkler (basit text link)

```tsx
import Container from '@/components/ui/Container'
import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Tum haklari saklidir.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/rss.xml"
            className="text-sm text-gray-500 transition-colors hover:text-accent-500 dark:text-gray-400"
          >
            RSS
          </a>
        </div>
      </Container>
    </footer>
  )
}
```

### 5. app/layout.tsx — Root Layout

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_CONFIG } from '@/lib/constants'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans flex min-h-screen flex-col bg-surface`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

## Kabul Kriterleri
- [ ] Header sticky, blur backdrop, gradient logo görünüyor
- [ ] Nav linkleri çalışıyor, aktif sayfa vurgulanıyor
- [ ] Footer copyright yılı dinamik
- [ ] Container max-width 1024px, responsive padding
- [ ] Layout — Header + Main (flex-1) + Footer yapısı doğru
- [ ] Mobile'da hamburger menü YOK, nav inline
- [ ] `npm run dev` çalışıyor, tüm sayfalar layout içinde render ediliyor
- [ ] Font'lar (Inter, JetBrains Mono) yükleniyor

## Dosya Çıktıları
- lib/constants.ts (yeni — tam implementasyon)
- components/ui/Container.tsx (yeni — tam implementasyon)
- components/Header.tsx (yeni — tam implementasyon)
- components/Footer.tsx (yeni — tam implementasyon)
- app/layout.tsx (tam güncelleme)
