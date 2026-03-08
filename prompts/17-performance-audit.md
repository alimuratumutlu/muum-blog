# Prompt 17: Performans Audit ve Optimizasyon

## Bağımlılıklar
- Tüm önceki promptlar (01-16) tamamlanmış olmalı

## Kural Referansları
- rules/performance.md — Lighthouse hedefleri, bundle bütçesi, Core Web Vitals

## Görev

### 1. Build Kontrolü

```bash
npm run build
```

Build çıktısındaki her sayfanın JS boyutunu kontrol et:

| Sayfa | Max JS |
|-------|--------|
| First Load (shared) | 80 kB |
| / (ana sayfa) | 30 kB |
| /blog | 30 kB |
| /blog/[slug] | 30 kB |
| /about | 10 kB |

Bütçe aşılıyorsa:
- `'use client'` directive'lerini kontrol et — gereksiz olanları kaldır
- Dynamic import kullan: `const Shiki = dynamic(() => import(...))`
- Shiki'yi server-side'da çalıştır (client bundle'a ekleme)

### 2. Lighthouse Audit

Dev server'da veya build sonrası:

```bash
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json
```

**Hedefler:**
- Performance: >95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### 3. Kontrol Listesi

**JavaScript:**
- [ ] `'use client'` sadece ThemeToggle ve PostList'te var
- [ ] Shiki server-side'da çalışıyor, client bundle'a dahil değil
- [ ] useEffect/useState sadece gerekli yerlerde

**Görseller:**
- [ ] Tüm `<Image>` component'lerinde width/height veya fill var
- [ ] Cover image'larda priority={true} (LCP için)
- [ ] Lazy loading fold altı görseller

**Font:**
- [ ] `next/font` ile local loading (external URL yok)
- [ ] display: 'swap' aktif

**SEO:**
- [ ] Tüm sayfalarda meta title ve description var
- [ ] og:image tüm sayfalarda var (fallback dahil)
- [ ] JSON-LD valid
- [ ] sitemap.xml ve rss.xml erişilebilir

**Erişilebilirlik:**
- [ ] Tüm interaktif elementlerde aria-label
- [ ] focus-visible ring
- [ ] Renk kontrastı WCAG AA

**Genel:**
- [ ] Console'da error/warning yok
- [ ] `npm run build` hatasız
- [ ] TypeScript strict mode hata yok

### 4. Optimizasyon Adımları (Gerekirse)

1. **Bundle size aşımı:** Dynamic import, tree shaking kontrol
2. **LCP yüksek:** Cover image priority, font preload
3. **CLS:** Image dimensions, font display swap
4. **Accessibility eksik:** aria-label, alt text, focus state ekleme

## Kabul Kriterleri
- [ ] `npm run build` hatasız tamamlanıyor
- [ ] First Load JS < 80 kB
- [ ] Lighthouse Performance > 95
- [ ] Lighthouse SEO = 100
- [ ] Console'da error yok
- [ ] `'use client'` sadece 2-3 dosyada

## Dosya Çıktıları
- Performans sorunlarına göre güncellenen dosyalar (değişken)
- Bu prompt dosya oluşturmaz, mevcut dosyaları optimize eder
