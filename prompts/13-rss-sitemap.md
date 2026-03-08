# Prompt 13: RSS Feed ve Sitemap

## Bağımlılıklar
- Prompt 05 tamamlanmış olmalı (lib/notion.ts — getAllPosts)

## Kural Referansları
- rules/prd-scope.md — RSS feed, Sitemap MVP kapsamında
- rules/tech-stack.md — API routes: RSS + revalidation için

## Görev

### 1. app/rss.xml/route.ts — RSS Feed

```typescript
import { getAllPosts } from '@/lib/notion'
import { SITE_CONFIG } from '@/lib/constants'

export async function GET(): Promise<Response> {
  const posts = await getAllPosts()

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_CONFIG.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
    )
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <link>${SITE_CONFIG.url}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
```

### 2. app/sitemap.ts — Dynamic Sitemap

Next.js built-in sitemap generation:

```typescript
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/notion'
import { SITE_CONFIG } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const blogPosts = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogPosts,
  ]
}
```

## Kabul Kriterleri
- [ ] /rss.xml valid XML döndürüyor
- [ ] RSS feed tüm yayınlanmış makaleleri içeriyor
- [ ] RSS Content-Type: application/xml
- [ ] /sitemap.xml tüm sayfaları ve makale URL'lerini içeriyor
- [ ] Sitemap lastModified tarihleri doğru
- [ ] RSS ve Sitemap'te SITE_CONFIG.url kullanılıyor
- [ ] Cache-Control header'ı var (RSS)

## Dosya Çıktıları
- app/rss.xml/route.ts (tam implementasyon)
- app/sitemap.ts (tam implementasyon)
