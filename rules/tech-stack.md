# Kural: Teknoloji Stack Kısıtlamaları

## İzin Verilen Teknolojiler

| Kategori | Teknoloji | Versiyon |
|----------|-----------|----------|
| Framework | Next.js | 15.x (App Router) |
| Dil | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Notion Client | @notionhq/client | latest |
| Notion → Markdown | notion-to-md | latest |
| Syntax Highlight | shiki | latest |
| Deploy | Vercel | - |
| Package Manager | pnpm (tercih) veya npm | - |
| Node.js | 20.x LTS veya 22.x | - |

## İzin Verilen Bağımlılıklar (dependencies)

```
next
react
react-dom
@notionhq/client
notion-to-md
shiki
reading-time
```

## İzin Verilen Dev Dependencies

```
typescript
@types/react
@types/node
tailwindcss
@tailwindcss/typography
postcss
autoprefixer
eslint
eslint-config-next
prettier
prettier-plugin-tailwindcss
```

## YASAK Teknolojiler

- ❌ MDX / next-mdx-remote — içerik Notion'dan geliyor, MDX yok
- ❌ gray-matter — frontmatter yok, Notion properties var
- ❌ contentlayer — dosya tabanlı CMS yok
- ❌ CSS-in-JS kütüphaneleri (styled-components, emotion)
- ❌ State management (Redux, Zustand, Jotai)
- ❌ UI component kütüphaneleri (shadcn, Chakra, MUI) — Tailwind yeterli
- ❌ Database ORM (Prisma, Drizzle) — veritabanı yok
- ❌ Auth kütüphaneleri (NextAuth, Clerk)
- ❌ CMS SDK'ları (Sanity, Contentful)
- ❌ Test framework — MVP'de test yok
- ❌ Docker — Vercel yeterli

## Rendering Stratejisi

- **ISR (Incremental Static Regeneration)** — `revalidate: 3600` (1 saat)
- **On-demand revalidation** — `/api/revalidate` endpoint (gelecekte n8n tetikler)
- **Server Components default** — `'use client'` sadece theme toggle ve filtreleme
- **generateStaticParams** — Build time'da tüm slug'ları Notion'dan çek

## Notion API Kuralları

- **Rate limit:** 3 request/saniye — batch query kullan
- **Tek API client instance** — `lib/notion.ts`'de singleton
- **Cache:** Next.js fetch cache + ISR, ek cache katmanı yok
- **Error handling:** Notion API hatalarında fallback göster, site çökmesin
- **ENV variables:** NOTION_API_KEY ve NOTION_DATABASE_ID .env.local'de

## Next.js Kuralları

- **App Router kullan** — Pages Router yasak
- **Server Components default** — Client component sadece interaktivite gerektiğinde
- **Static Generation + ISR** tercih — runtime SSR minimizasyonu
- **API Routes** — sadece RSS feed + revalidation için
