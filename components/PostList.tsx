'use client'

import { useState } from 'react'
import PostCard from '@/components/PostCard'
import type { BlogPost } from '@/lib/types'

interface PostListProps {
  posts: BlogPost[]
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
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-accent-500 text-white'
              : 'bg-surface-sunken text-gray-600 hover:bg-accent-100 dark:text-gray-400 dark:hover:bg-accent-900/30'
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(cat === selectedCategory ? null : cat)
            }
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

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`text-xs transition-colors ${
                selectedTag === tag
                  ? 'font-semibold text-accent-600 dark:text-accent-400'
                  : 'text-gray-500 hover:text-accent-500 dark:text-gray-500'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} içerik
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          Bu filtreyle eşleşen içerik bulunamadı.
        </p>
      )}
    </div>
  )
}
