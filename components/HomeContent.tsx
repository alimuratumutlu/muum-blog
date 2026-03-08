'use client'

import { useState, useMemo } from 'react'
import ArticleItem from '@/components/ArticleItem'
import Sidebar from '@/components/Sidebar'
import type { BlogPost, PostType } from '@/lib/types'

interface HomeContentProps {
  posts: BlogPost[]
  categories: string[]
}

export default function HomeContent({ posts, categories }: HomeContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<PostType | null>(null)

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (selectedType && p.type !== selectedType) return false
      if (selectedCategory && p.category !== selectedCategory) return false
      return true
    })
  }, [posts, selectedType, selectedCategory])

  const visibleCategories = useMemo(() => {
    if (!selectedType) return categories
    return [
      ...new Set(
        posts
          .filter((p) => p.type === selectedType)
          .map((p) => p.category)
          .filter(Boolean)
      ),
    ]
  }, [posts, categories, selectedType])

  const popular = posts
    .filter((p) => p.order != null)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 5)

  const popularFallback = popular.length > 0 ? popular : posts.slice(0, 5)

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
      {/* Main — Article List */}
      <div className="min-w-0 flex-1">
        <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          Makaleler ve Rehberler
        </h2>

        {filtered.length > 0 ? (
          <div>
            {filtered.map((post) => (
              <ArticleItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-gray-500">
            {selectedCategory || selectedType
              ? 'Bu filtreyle eşleşen içerik bulunamadı.'
              : 'Henüz yayınlanmış içerik yok.'}
          </p>
        )}
      </div>

      {/* Sidebar */}
      <div className="w-full shrink-0 lg:w-72">
        <div className="sticky top-24">
          <Sidebar
            categories={visibleCategories}
            popularPosts={popularFallback}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        </div>
      </div>
    </div>
  )
}
