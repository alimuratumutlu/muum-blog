# Kural: Performans Bütçesi

## Lighthouse Hedefleri

| Metrik | Minimum |
|--------|---------|
| Performance | 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Core Web Vitals

| Metrik | Hedef |
|--------|-------|
| LCP (Largest Contentful Paint) | < 1.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.05 |
| TTFB (Time to First Byte) | < 200ms |

## Bundle Size Bütçesi

| Kategori | Max Size |
|----------|----------|
| First Load JS (shared) | 80 kB |
| Per-page JS | 30 kB |
| Total CSS | 20 kB |

## Performans Kuralları

1. **ISR (Incremental Static Regeneration)** — Build time'da generateStaticParams + revalidate: 3600
2. **Image optimization** — Next.js `<Image>` component zorunlu, raw `<img>` yasak
3. **Font optimization** — `next/font` ile local font loading, external font URL yasak
4. **No layout shift** — Görsellerde width/height zorunlu, skeleton yok (SSG)
5. **Lazy loading** — Fold altı görseller `loading="lazy"`
6. **No client-side data fetching** — useEffect + fetch yasak, server'da çözülür
7. **Minimal JavaScript** — Client component sadece theme toggle ve filtreleme için
8. **No external scripts** — Analytics, chat widget, tracking pixel yasak (MVP)
9. **Preconnect/prefetch** — Kullanılmıyor çünkü external resource yok
10. **Notion API latency** — ISR ile gizlenir, build time'da batch query, runtime'da cache hit

## Build Performansı

| Metrik | Hedef |
|--------|-------|
| Build time (50 post) | < 30s |
| Build time (100 post) | < 60s |
| Dev server start | < 3s |

## Kontrol Listesi (Her Deploy Öncesi)

- [ ] `next build` hatasız tamamlanıyor
- [ ] Bundle analyzer ile JS size kontrol
- [ ] Lighthouse CI >= 95 performans
- [ ] Tüm görsellerde width/height var
- [ ] Console'da error/warning yok
- [ ] `'use client'` sadece gerekli dosyalarda
