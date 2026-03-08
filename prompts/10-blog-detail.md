# Prompt 10: Blog Detay Sayfası

## Bağımlılıklar
- Prompt 05 tamamlanmış olmalı (lib/notion.ts — getPostBySlug, getPostContent)
- Prompt 06 tamamlanmış olmalı (NotionRenderer component)
- Prompt 07 tamamlanmış olmalı (lib/types.ts)

## Kural Referansları
- rules/tech-stack.md — ISR, generateStaticParams
- rules/content-schema.md — makale şeması, kaynak attribution
- rules/design-system.md — prose max-width 720px, tipografi
- rules/prd-scope.md — kaynak attribution (varsa)

## Görev

### 1. app/blog/[slug]/page.tsx — Makale Detay

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllPosts, getPostBySlug } from '@/lib/notion'
import NotionRenderer from '@/components/NotionRenderer'
import Badge from '@/components/ui/Badge'
import Container from '@/components/ui/Container'

export const revalidate = 3600

/** Build time'da tüm slug'ları Notion'dan çek — SSG */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

/** Dynamic metadata — SEO (Prompt 12'de genişletilecek) */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Bulunamadi' }

  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="py-16">
      <Container className="max-w-prose">
        {/* Kategori badge */}
        <Badge>{post.category}</Badge>

        {/* Başlık */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Meta bilgi */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </time>
          {post.readingTime && <span>· {post.readingTime} dk okuma</span>}
        </div>

        {/* Etiketler */}
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-accent-600 dark:text-accent-400">
              #{tag}
            </span>
          ))}
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        )}

        {/* Kaynak attribution (varsa) */}
        {post.sourceUrl && (
          <div className="mt-6 rounded-lg border border-accent-200 bg-accent-50 p-4 dark:border-accent-800 dark:bg-accent-950/30">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Kaynak:{' '}
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 underline hover:text-accent-500 dark:text-accent-400"
              >
                {post.sourceTitle || 'Orijinal makale'}
              </a>
            </p>
          </div>
        )}

        {/* Makale içeriği — Notion render */}
        <div className="mt-10">
          <NotionRenderer pageId={post.id} />
        </div>
      </Container>
    </article>
  )
}
```

### 2. app/not-found.tsx (veya app/blog/[slug]/not-found.tsx)

Geçersiz slug için 404 sayfası:

```tsx
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center">
        <h1 className="text-6xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Aradiginiz makale bulunamadi.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-block rounded-lg bg-accent-500 px-6 py-2 text-sm font-medium text-white hover:bg-accent-600 transition-colors"
        >
          Tum makalelere don
        </Link>
      </Container>
    </section>
  )
}
```

## Kabul Kriterleri
- [ ] /blog/[slug] Notion'dan makale çekip render ediyor
- [ ] `generateStaticParams` build time'da tüm slug'ları çekiyor
- [ ] `generateMetadata` dynamic title ve description üretiyor
- [ ] Geçersiz slug'da 404 sayfası gösteriliyor (`notFound()`)
- [ ] Cover image Next.js `<Image>` ile render (priority, fill)
- [ ] Kaynak attribution kutusu gösteriliyor (sourceUrl varsa)
- [ ] NotionRenderer makale içeriğini prose class ile render ediyor
- [ ] ISR revalidate: 3600 aktif
- [ ] Tarih Türkçe formatında
- [ ] Mobile responsive

## Dosya Çıktıları
- app/blog/[slug]/page.tsx (tam implementasyon)
- app/not-found.tsx (yeni)
