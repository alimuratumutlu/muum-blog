# Prompt 03: Tailwind Tema, Renk Paleti, Tipografi ve Dark Mode CSS

## Bağımlılıklar
- Prompt 01 ve 02 tamamlanmış olmalı

## Kural Referansları
- rules/design-system.md — tipografi, renk, spacing kuralları
- rules/tech-stack.md — Tailwind CSS 4

## Tasarım Notu

**Referans:** joshwcomeau.com — renkli, oyuncu ama profesyonel. Minimalist ama steril değil.
**Accent renk:** Teal/lime arası (turkuaz-yeşil gradient hissi)

design-system.md kurallarındaki bazı kısıtlamalar (gradient yok, gölge yok) bu proje için gevşetilmiştir:
- Subtle gradient'lar accent renklerde KULLANILIR (joshwcomeau referansı)
- Hafif gölgeler kart hover'larında KULLANILIR
- Dekoratif ama fonksiyonel öğeler KULLANILIR (renkli badge'ler, accent border'lar)
- Aşırı dekorasyon (parallax, carousel, splash screen) hala YASAKTIR

## Görev

### 1. Tailwind CSS 4 Yapılandırması

Tailwind CSS 4 `@config` direktifi veya CSS-first config kullanır. `app/globals.css` dosyasını güncelle:

```css
@import "tailwindcss";

@theme {
  /* Fonts */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;

  /* Accent Colors — Teal/Lime */
  --color-accent-50: #f0fdfa;
  --color-accent-100: #ccfbf1;
  --color-accent-200: #99f6e4;
  --color-accent-300: #5eead4;
  --color-accent-400: #2dd4bf;
  --color-accent-500: #14b8a6;
  --color-accent-600: #0d9488;
  --color-accent-700: #0f766e;
  --color-accent-800: #115e59;
  --color-accent-900: #134e4a;

  /* Lime highlight (secondary accent) */
  --color-lime-400: #a3e635;
  --color-lime-500: #84cc16;

  /* Surface Colors - Light */
  --color-surface: #f9fafb;
  --color-surface-raised: #ffffff;
  --color-surface-sunken: #f3f4f6;

  /* Border */
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;

  /* Prose widths */
  --width-prose: 45rem;
  --width-container: 64rem;
}

/* Dark mode overrides */
@variant dark (&:where(.dark, .dark *)) {
  --color-surface: #0a0a0a;
  --color-surface-raised: #171717;
  --color-surface-sunken: #111111;
  --color-border: #27272a;
  --color-border-hover: #3f3f46;
}
```

### 2. Font Kurulumu (next/font)

`app/layout.tsx`'de (veya ayrı bir `lib/fonts.ts`'de) font'ları tanımla:

```typescript
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
```

### 3. Global CSS — Tipografi ve Prose

`app/globals.css`'e ekle:

```css
/* Base body */
body {
  @apply bg-surface text-gray-900 dark:text-gray-100 antialiased;
  font-size: 18px;
  line-height: 1.75;
}

/* Prose overrides — makale içeriği */
.prose {
  --tw-prose-body: theme(--color-gray-800);
  --tw-prose-headings: theme(--color-gray-900);
  --tw-prose-links: theme(--color-accent-600);
  --tw-prose-code: theme(--color-accent-700);
  --tw-prose-pre-bg: theme(--color-surface-sunken);
  max-width: var(--width-prose);
}

.dark .prose {
  --tw-prose-body: theme(--color-gray-300);
  --tw-prose-headings: theme(--color-gray-100);
  --tw-prose-links: theme(--color-accent-400);
  --tw-prose-code: theme(--color-accent-300);
  --tw-prose-pre-bg: theme(--color-surface-sunken);
}

/* Link hover — accent underline animation */
.prose a {
  @apply underline decoration-accent-400/50 underline-offset-2 transition-colors duration-150 hover:decoration-accent-500;
}

/* Code inline */
.prose :not(pre) > code {
  @apply rounded bg-surface-sunken px-1.5 py-0.5 text-sm font-medium;
}

/* Headings — subtle accent left border (joshwcomeau style) */
.prose h2 {
  @apply border-l-4 border-accent-400 pl-4;
}

/* Selection color */
::selection {
  @apply bg-accent-200 dark:bg-accent-800;
}
```

### 4. Utility Classes

Projeye özel yardımcı sınıflar:

```css
/* Gradient text — accent */
.text-gradient {
  @apply bg-gradient-to-r from-accent-500 to-lime-500 bg-clip-text text-transparent;
}

/* Card hover effect */
.card-hover {
  @apply transition-all duration-200 hover:shadow-md hover:border-accent-400/50 hover:-translate-y-0.5;
}

/* Focus ring — erişilebilirlik */
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface;
}
```

## Kabul Kriterleri
- [ ] Tailwind CSS 4 `@theme` ile accent renk paleti (teal/lime) tanımlı
- [ ] `next/font` ile Inter ve JetBrains Mono yükleniyor
- [ ] Dark mode CSS değişkenleri tanımlı
- [ ] Prose override'lar makale tipografisi için hazır
- [ ] `.text-gradient`, `.card-hover`, `.focus-ring` utility class'ları tanımlı
- [ ] `::selection` rengi accent ile uyumlu
- [ ] `npm run dev` çalışıyor, stiller görünüyor

## Dosya Çıktıları
- app/globals.css (tam güncelleme)
- app/layout.tsx (font tanımları — kısmi güncelleme, tam layout Prompt 04'te)
