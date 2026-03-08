# Kural: Tasarım Sistemi

## Tipografi

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Body | Inter / Geist / System | 18px (1.125rem) | 400 | 1.75 |
| H1 (Sayfa başlığı) | Aynı | 36px (2.25rem) | 700 | 1.2 |
| H2 | Aynı | 28px (1.75rem) | 600 | 1.3 |
| H3 | Aynı | 22px (1.375rem) | 600 | 1.4 |
| Small/Meta | Aynı | 14px (0.875rem) | 400 | 1.5 |
| Code | JetBrains Mono / Fira Code / mono | 15px | 400 | 1.6 |

## Prose Kuralları

- Makale içeriği max-width: **720px** (45rem)
- Paragraflar arası spacing: **1.5em**
- Heading'ler üst margin: **2em**, alt margin: **0.75em**
- Tailwind `@tailwindcss/typography` prose class kullanılacak
- Prose override'lar globals.css'de

## Renk Paleti

### Light Mode

| Kullanım | Renk | Hex |
|----------|------|-----|
| Background | Beyaz | #FFFFFF |
| Surface | Açık gri | #F9FAFB |
| Text primary | Koyu gri | #111827 |
| Text secondary | Orta gri | #6B7280 |
| Border | Açık gri | #E5E7EB |
| Accent | Mavi | #2563EB |
| Accent hover | Koyu mavi | #1D4ED8 |
| Code bg | Açık gri | #F3F4F6 |

### Dark Mode

| Kullanım | Renk | Hex |
|----------|------|-----|
| Background | Koyu | #0A0A0A |
| Surface | Koyu gri | #171717 |
| Text primary | Beyaz | #EDEDED |
| Text secondary | Gri | #A1A1AA |
| Border | Koyu gri | #27272A |
| Accent | Açık mavi | #3B82F6 |
| Accent hover | Parlak mavi | #60A5FA |
| Code bg | Koyu gri | #1E1E1E |

## Spacing Sistemi

Tailwind default spacing scale kullanılacak. Özel spacing tanımlanmaz.

| Kullanım | Tailwind Class |
|----------|---------------|
| Section padding | py-16 (64px) |
| Component gap | gap-8 (32px) |
| Card padding | p-6 (24px) |
| Inline spacing | gap-2 (8px) veya gap-3 (12px) |
| Nav height | h-16 (64px) |

## Layout

- **Container max-width:** 1024px (max-w-4xl)
- **Prose max-width:** 720px (max-w-prose veya max-w-2xl)
- **Side padding:** px-4 (mobile), px-6 (desktop)
- **Sayfa yapısı:** Header (sticky) + Main + Footer
- **Grid yok** — blog listesi basit flex column

## Komponent Tasarım Kuralları

1. **Animasyon minimizasyonu** — Sadece hover state'lerde subtle transition (150ms)
2. **Border-radius** — rounded-lg (8px) default
3. **Gölge yok** — shadow kullanma, border yeterli
4. **İkon yok** — MVP'de ikon kütüphanesi ekleme. Gerekirse inline SVG (max 3 ikon: theme toggle, external link, arrow)
5. **Dekoratif element yok** — gradient, pattern, illustration yok
6. **Focus state** — Erişilebilirlik için focus-visible ring

## Responsive Breakpoints

| Breakpoint | Kullanım |
|-----------|----------|
| Default (mobile) | Tek kolon, tam genişlik |
| sm (640px) | Minor adjustments |
| md (768px) | Nav genişler |
| lg (1024px) | Max container width |

**3 breakpoint'tan fazla kullanma. Basit tut.**

## YASAK Tasarım Kararları

- ❌ Hero section / büyük banner
- ❌ Carousel / slider
- ❌ Modal / popup
- ❌ Sidebar
- ❌ Floating action button
- ❌ Hamburger menü (basit inline nav yeterli)
- ❌ Parallax efekt
- ❌ Gradient background
- ❌ Custom scroll behavior
- ❌ Splash screen / loading animation
