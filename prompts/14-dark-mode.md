# Prompt 14: Dark/Light Mode Toggle

## Bağımlılıklar
- Prompt 03 tamamlanmış olmalı (dark mode CSS değişkenleri)
- Prompt 04 tamamlanmış olmalı (Header — ThemeToggle placeholder)

## Kural Referansları
- rules/prd-scope.md — dark/light mode: system preference + toggle
- rules/code-standards.md — `'use client'` sadece theme toggle için
- rules/design-system.md — max 3 inline SVG ikon (theme toggle)

## Görev

### 1. components/ThemeToggle.tsx

`'use client'` component. System preference'ı algılar, kullanıcı tercihi localStorage'da saklanır.

**Strateji:**
- `<html>` element'ine `class="dark"` ekleme/çıkarma (Tailwind dark mode)
- İlk yüklemede FOUC (flash of unstyled content) önleme — inline script ile

```tsx
'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      setTheme(stored)
      applyTheme(stored)
    }
  }, [])

  function applyTheme(t: Theme): void {
    const root = document.documentElement
    if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  function toggleTheme(): void {
    const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    applyTheme(next)
  }

  // İkon: güneş (light), ay (dark), monitor (system) — inline SVG
  const icon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors hover:bg-surface-sunken focus-ring"
      aria-label={`Tema: ${theme}`}
      title={`Tema: ${theme}`}
    >
      {icon}
    </button>
  )
}
```

**Not:** Emoji yerine inline SVG ikonları tercih edilebilir. Ancak ikon kütüphanesi YASAKTIR (rules/design-system.md). 3 basit inline SVG ile (güneş, ay, monitor) uygulanabilir.

### 2. FOUC Önleme — Inline Script

`app/layout.tsx`'te `<body>` açılmadan önce inline script ekle:

```tsx
<html lang="tr" suppressHydrationWarning>
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
      }}
    />
  </head>
  <body>...</body>
</html>
```

### 3. Header'a ThemeToggle Ekle

`components/Header.tsx`'deki ThemeToggle placeholder'ı gerçek component ile değiştir:

```tsx
import ThemeToggle from '@/components/ThemeToggle'

// Nav bölümünde:
<nav className="flex items-center gap-6">
  {/* nav links */}
  <ThemeToggle />
</nav>
```

## Kabul Kriterleri
- [ ] Light/Dark/System mode 3 durumlu toggle çalışıyor
- [ ] System preference algılanıyor
- [ ] Kullanıcı tercihi localStorage'da saklanıyor
- [ ] Sayfa yenilendiğinde tercih korunuyor
- [ ] FOUC yok — ilk yüklemede doğru tema uygulanıyor
- [ ] Header'da ThemeToggle görünüyor
- [ ] Tüm sayfalar dark mode'da doğru görünüyor
- [ ] Erişilebilirlik: aria-label, focus-ring

## Dosya Çıktıları
- components/ThemeToggle.tsx (yeni — tam implementasyon)
- app/layout.tsx (güncelleme — inline script + suppressHydrationWarning)
- components/Header.tsx (güncelleme — ThemeToggle import)
