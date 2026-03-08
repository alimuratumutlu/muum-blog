# Prompt 08: Ana Sayfa

## Bağımlılıklar
- Prompt 04 tamamlanmış olmalı (layout, Header, Footer)
- Prompt 05 tamamlanmış olmalı (lib/notion.ts — getAllPosts)
- Prompt 07 tamamlanmış olmalı (lib/types.ts — Post tipi)

## Kural Referansları
- rules/design-system.md — layout, spacing, tipografi
- rules/code-standards.md — Server Component default
- rules/prd-scope.md — MVP kapsamı

## Tasarım Notu

**Referans:** joshwcomeau.com ana sayfası — büyük hoşgeldin başlığı, renkli kartlar, kategorize edilmiş içerik.
- Hero bölümü: Büyük başlık + kısa açıklama (gradient text accent)
- Son makaleler: Renkli kartlar, hover efektli
- "Sıra" property'si olan postlar öne çıkarılır

## Görev

### 1. components/PostCard.tsx

Blog listesinde ve ana sayfada kullanılacak makale kartı.

```tsx
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import type { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group rounded-xl border border-border bg-surface-raised p-6 card-hover">
        {/* Cover image (varsa) */}
        {post.coverImage && (
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        {/* Kategori badge */}
        <Badge>{post.category}</Badge>

        {/* Başlık */}
        <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-accent-600 dark:text-gray-100 dark:group-hover:text-accent-400 transition-colors">
          {post.title}
        </h3>

        {/* Özet */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {post.summary}
        </p>

        {/* Meta: tarih + okuma süresi */}
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </time>
          {post.readingTime && <span>{post.readingTime} dk okuma</span>}
        </div>

        {/* Etiketler */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-accent-600 dark:text-accent-400">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}
```

### 2. components/ui/Badge.tsx

```tsx
export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">
      {children}
    </span>
  )
}
```

### 3. app/page.tsx — Ana Sayfa

```tsx
import { getAllPosts } from '@/lib/notion'
import PostCard from '@/components/PostCard'
import Container from '@/components/ui/Container'

export const revalidate = 3600 // ISR: 1 saat

export default async function HomePage() {
  const posts = await getAllPosts()

  // Öne çıkan postlar (Sıra property'si olanlar, sıraya göre)
  const featured = posts
    .filter((p) => p.order !== null)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 3)

  // Son makaleler (en yeni 6 tanesi)
  const recent = posts.slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Yapay zeka dunyasini{' '}
            <span className="text-gradient">kesfet.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Derinlemesine analizler, teknik incelemeler ve pratik rehberler.
            AI dunyasindaki en onemli gelismeleri anlasılır bir dille aktariyorum.
          </p>
        </Container>
      </section>

      {/* Öne Çıkanlar (varsa) */}
      {featured.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="mb-8 text-2xl font-bold">One Cikanlar</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Son Makaleler */}
      <section className="py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-bold">Son Makaleler</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
```

## Kabul Kriterleri
- [ ] Ana sayfa Notion'dan post çekiyor ve render ediyor
- [ ] Hero section gradient text ile görünüyor
- [ ] PostCard — cover image, kategori badge, başlık, özet, tarih, etiketler
- [ ] PostCard hover efekti çalışıyor (card-hover)
- [ ] Öne çıkan postlar (Sıra property'si olanlar) ayrı bölümde
- [ ] Son makaleler grid layout'ta
- [ ] ISR revalidate: 3600 aktif
- [ ] Mobile responsive (tek kolon → çok kolon)
- [ ] Notion'da post yoksa sayfa çökmüyor

## Dosya Çıktıları
- components/PostCard.tsx (yeni — tam implementasyon)
- components/ui/Badge.tsx (yeni — tam implementasyon)
- app/page.tsx (tam güncelleme)
