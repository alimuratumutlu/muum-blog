# Prompt 09: Blog Listesi Sayfası

## Bağımlılıklar
- Prompt 05 tamamlanmış olmalı (lib/notion.ts)
- Prompt 07 tamamlanmış olmalı (lib/types.ts)
- Prompt 08 tamamlanmış olmalı (PostCard component)

## Kural Referansları
- rules/prd-scope.md — kategori & etiket filtreleme (client-side)
- rules/code-standards.md — Server Component default, `'use client'` sadece filtreleme için
- rules/design-system.md — layout

## Görev

### 1. components/PostList.tsx — Filtrelenebilir Makale Listesi

Bu component client-side filtreleme yapar. `'use client'` direktifi gerekli.

```tsx
'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import Badge from '@/components/ui/Badge'
import type { Post, Category } from '@/lib/types'
import { CATEGORIES } from '@/lib/types'

interface PostListProps {
  posts: Post[]
  categories: string[]
  tags: string[]
}

export default function PostList({ posts, categories, tags }: PostListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filtered = posts.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) return false
    if (selectedTag && !post.tags.includes(selectedTag)) return false
    return true
  })

  return (
    <div>
      {/* Kategori filtreleri */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-accent-500 text-white'
              : 'bg-surface-sunken text-gray-600 hover:bg-accent-100 dark:text-gray-400 dark:hover:bg-accent-900/30'
          }`}
        >
          Tumu
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-accent-500 text-white'
                : 'bg-surface-sunken text-gray-600 hover:bg-accent-100 dark:text-gray-400 dark:hover:bg-accent-900/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Etiket filtreleri */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`text-xs transition-colors ${
              selectedTag === tag
                ? 'text-accent-600 font-semibold dark:text-accent-400'
                : 'text-gray-500 hover:text-accent-500 dark:text-gray-500'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Sonuç sayısı */}
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} makale
      </p>

      {/* Post listesi */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Boş durum */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          Bu filtreyle eslesen makale bulunamadi.
        </p>
      )}
    </div>
  )
}
```

### 2. app/blog/page.tsx — Blog Sayfası (Server Component)

```tsx
import type { Metadata } from 'next'
import { getAllPosts, getCategories, getTags } from '@/lib/notion'
import PostList from '@/components/PostList'
import Container from '@/components/ui/Container'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Yapay zeka, LLM, ve teknoloji uzerine tum makaleler.',
}

export default async function BlogPage() {
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getTags(),
  ])

  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Blog</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Tum makaleler — kategoriye veya etikete gore filtrele.
        </p>
        <PostList posts={posts} categories={categories} tags={tags} />
      </Container>
    </section>
  )
}
```

## Kabul Kriterleri
- [ ] /blog sayfası tüm yayınlanmış makaleleri listeliyor
- [ ] Kategori filtreleme çalışıyor (toggle)
- [ ] Etiket filtreleme çalışıyor (toggle)
- [ ] Filtre kombinasyonu çalışıyor (kategori + etiket)
- [ ] "Tümü" butonu tüm filtreleri temizliyor
- [ ] Boş durum mesajı gösteriliyor
- [ ] Sonuç sayısı görünüyor
- [ ] ISR revalidate: 3600 aktif
- [ ] PostList `'use client'`, BlogPage Server Component

## Dosya Çıktıları
- components/PostList.tsx (yeni — tam implementasyon)
- app/blog/page.tsx (tam güncelleme)
