# PRD: AI Solution Blog (muum-blog)

## Proje Özeti

Notion veritabanı ile yönetilen, Next.js App Router tabanlı, SEO-optimized, minimalist bir kişisel blog platformu. İçerikler Notion "AI Solution Blog" tablosunda yaşar. "Yayınla" checkbox'ı tikli olanlar sitede görünür.

## Problem

- İçerik Pipeline tweet + flood üretiyor ama kaynak makale yok
- Flood'lar yüzeysel kalıyor çünkü derinlemesine içerik platformu eksik
- Kendi kontrolünde, SEO-friendly bir yayın platformu gerekiyor
- İçerik zaten Notion'da yaşıyor — ayrı bir CMS/dosya sistemi gereksiz

## Çözüm

Next.js + Notion API tabanlı blog. İçerik Notion DB'de yazılır/düzenlenir. "Yayınla" checkbox tiklenince ISR ile sitede görünür. n8n pipeline'ı da direkt Notion'a yazabilir.

---

## İçerik Kaynağı: Notion

### Veritabanı Bilgileri

- **DB Adı:** AI Solution Blog
- **Data Source ID:** 8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86
- **Yayın Kuralı:** `Yayınla` checkbox = true olan kayıtlar sitede görünür

### Notion DB Şeması

| Property | Tip | Açıklama |
|----------|-----|----------|
| Başlık | Title | Makale başlığı |
| Slug | Text | URL slug (kebab-case, Türkçe karakter yok) |
| Özet | Text | Meta description, max 200 karakter |
| Kategori | Select | AI Araştırma, Teknik Analiz, Sektör Haberleri, Görüş & Yorum, Rehber & Tutorial |
| Etiketler | Multi-select | ai, llm, anthropic, openai, google, saas, startup, turkiye, egitim, mcp, n8n, nextjs, career |
| Yayınla | Checkbox | ✅ = sitede görünür |
| Yayın Tarihi | Date | Yayınlanma tarihi |
| Cover Image | URL | Kapak görseli URL |
| Kaynak URL | URL | Orijinal makale linki (n8n pipeline'dan gelen) |
| Kaynak Başlık | Text | Orijinal İngilizce başlık |
| Reading Time | Number | Tahmini okuma süresi (dakika) |
| Sıra | Number | Anasayfada öne çıkarma sıralaması |

### Makale İçeriği

Makale gövdesi Notion sayfasının **page content**'i olarak yazılır. Notion API ile block'lar çekilir ve HTML'e dönüştürülür.

---

## Teknik Kapsam

### Stack

| Katman | Teknoloji |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| İçerik Kaynağı | Notion API (@notionhq/client) |
| Notion → HTML | notion-to-md veya @notion-render/client |
| Styling | Tailwind CSS 4 |
| Deploy | Vercel |
| Dil | TypeScript |
| Rendering | ISR (Incremental Static Regeneration) |

### Sayfa Yapısı

```
/ → Ana sayfa (son makaleler listesi)
/blog → Tüm makaleler (pagination)
/blog/[slug] → Makale detay
/about → Hakkımda
/rss.xml → RSS feed
/sitemap.xml → Sitemap
```

### Temel Özellikler (MVP — Hafta Sonu Scope)

1. **Makale listeleme** — Ana sayfa + /blog, Notion API'dan çekilir, Yayınla=true filter
2. **Makale detay** — Notion page content render, kod blokları syntax highlight
3. **Kategori & etiket** — Filtreleme (URL query params veya client-side)
4. **SEO** — Dynamic meta tags, Open Graph, Twitter Card, JSON-LD
5. **RSS feed** — /rss.xml otomatik üretim
6. **Sitemap** — /sitemap.xml otomatik üretim
7. **Responsive tasarım** — Mobile-first, minimalist, okunabilir tipografi
8. **Dark/Light mode** — System preference + toggle
9. **Kaynak attribution** — Orijinal makale linki her yazıda (varsa)
10. **Kod bloğu** — Syntax highlighting (shiki)
11. **ISR** — revalidate: 3600 (1 saat), on-demand revalidation API route

### MVP Dışı (Sonra)

- Yorum sistemi
- Newsletter signup
- Full-text arama
- View counter
- n8n → blog otomatik publish pipeline
- X Articles cross-post
- i18n (TR/EN)
- Analytics (Plausible/Umami)
- Notion webhook ile instant revalidation

---

## Dosya/Klasör Yapısı

```
muum-blog/
├── app/
│   ├── layout.tsx          # Root layout (nav, footer, theme)
│   ├── page.tsx            # Ana sayfa
│   ├── blog/
│   │   ├── page.tsx        # Makale listesi
│   │   └── [slug]/
│   │       └── page.tsx    # Makale detay
│   ├── about/
│   │   └── page.tsx
│   ├── rss.xml/
│   │   └── route.ts        # RSS feed
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts    # On-demand ISR revalidation
│   └── sitemap.ts          # Dynamic sitemap
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   ├── NotionRenderer.tsx  # Notion blocks → HTML
│   ├── ThemeToggle.tsx
│   └── ui/
│       ├── Badge.tsx
│       └── Container.tsx
├── lib/
│   ├── notion.ts           # Notion API client + query functions
│   ├── renderer.ts         # Notion block → HTML dönüşümü
│   ├── types.ts            # TypeScript type definitions
│   └── constants.ts        # Site metadata, nav links
├── public/
│   ├── images/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local              # NOTION_API_KEY, NOTION_DATABASE_ID
```

---

## Tasarım Prensipleri

- **Minimalist** — İçerik odaklı, gereksiz dekorasyon yok
- **Okunabilirlik** — max-width 720px prose, 1.75 line-height, 18px base font
- **Referans:** leerob.io, rauchg.com estetiği
- **Mobil öncelik** — Basit nav, responsive tipografi

---

## Performans Hedefleri

| Metrik | Hedef |
|--------|-------|
| Lighthouse Performance | >95 |
| LCP | <2s (Notion API overhead dahil) |
| ISR Revalidation | 3600s (1 saat) |
| First Load JS | <80kB |

---

## Environment Variables

```
NOTION_API_KEY=secret_xxx          # Notion Internal Integration token
NOTION_DATABASE_ID=8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86
REVALIDATION_SECRET=xxx            # On-demand revalidation secret
NEXT_PUBLIC_SITE_URL=https://blog.umutlu.net  # (veya seçilen domain)
```

---

## Başarı Kriterleri

- [ ] Notion'da "Yayınla" tiklenince site 1 saat içinde güncellenir
- [ ] /blog ve /blog/[slug] Notion'dan içerik render ediyor
- [ ] SEO meta tags doğru (og:title, og:description, og:image)
- [ ] RSS feed valid XML
- [ ] Dark/Light mode çalışıyor
- [ ] Mobile'da okunabilir
- [ ] Vercel'e deploy edilmiş
- [ ] Lighthouse >95

---

## Kısıtlamalar

- **Scope genişletme yasak** — MVP listesi dışına çıkılmaz
- **Veritabanı yok** — Notion = tek veri kaynağı
- **Auth yok** — Public blog
- **Backend API yok** — RSS + revalidation dışında API route yok
- **content/ klasörü yok** — Tüm içerik Notion'da
