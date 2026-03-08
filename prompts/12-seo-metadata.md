# Prompt 12: SEO — Dynamic Meta Tags, Open Graph, Twitter Card, JSON-LD

## Bağımlılıklar
- Prompt 04 tamamlanmış olmalı (root layout metadata)
- Prompt 10 tamamlanmış olmalı (blog detail generateMetadata)

## Kural Referansları
- rules/prd-scope.md — SEO: meta tags, OG, Twitter Card, JSON-LD
- rules/performance.md — SEO Lighthouse 100

## Görev

### 1. app/layout.tsx — Root Metadata Genişletme

Root layout'taki metadata objesini genişlet:

```typescript
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': `${SITE_CONFIG.url}/rss.xml`,
    },
  },
}
```

### 2. app/blog/[slug]/page.tsx — generateMetadata Genişletme

Makale detay sayfasının metadata fonksiyonunu OG, Twitter Card ve JSON-LD ile genişlet:

```typescript
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Bulunamadi' }

  const url = `${SITE_CONFIG.url}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.publishedAt,
      authors: [SITE_CONFIG.author.name],
      tags: post.tags,
      ...(post.coverImage && { images: [{ url: post.coverImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  }
}
```

### 3. JSON-LD Structured Data

Blog detay sayfasına JSON-LD ekle. `<script type="application/ld+json">` olarak render edilecek.

```tsx
// app/blog/[slug]/page.tsx içinde, return'den önce:

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.summary,
  datePublished: post.publishedAt,
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.author.name,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
  },
  ...(post.coverImage && {
    image: post.coverImage,
  }),
  url: `${SITE_CONFIG.url}/blog/${post.slug}`,
}

// JSX'e ekle:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### 4. Ana Sayfa JSON-LD

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
}
```

## Kabul Kriterleri
- [ ] Root layout: og:title, og:description, og:type=website
- [ ] Root layout: twitter:card, twitter:creator
- [ ] Blog detay: og:type=article, og:published_time, og:tags
- [ ] Blog detay: coverImage varsa og:image ve twitter:image
- [ ] Blog detay: JSON-LD Article schema
- [ ] Ana sayfa: JSON-LD WebSite schema
- [ ] RSS alternate link `<head>`'de
- [ ] robots: index, follow
- [ ] Tüm meta tag'lar HTML source'da doğru görünüyor

## Dosya Çıktıları
- app/layout.tsx (metadata genişletme)
- app/blog/[slug]/page.tsx (generateMetadata + JSON-LD)
- app/page.tsx (JSON-LD WebSite)
