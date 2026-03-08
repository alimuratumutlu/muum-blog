'use client'

import Link from 'next/link'
import type { BlogPost, PostType } from '@/lib/types'
import { POST_TYPE_CONFIG } from '@/lib/types'

interface SidebarProps {
  categories: string[]
  popularPosts: BlogPost[]
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
  selectedType: PostType | null
  onTypeSelect: (type: PostType | null) => void
}

export default function Sidebar({
  categories,
  popularPosts,
  selectedCategory,
  onCategorySelect,
  selectedType,
  onTypeSelect,
}: SidebarProps) {
  return (
    <aside className="space-y-10">
      {/* Filter by Type */}
      <div>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          İçerik Türü
        </h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(POST_TYPE_CONFIG) as PostType[]).map((type) => {
            const config = POST_TYPE_CONFIG[type]
            return (
              <button
                key={type}
                onClick={() => onTypeSelect(type === selectedType ? null : type)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'border-accent-500 bg-accent-500 text-white'
                    : 'border-border bg-surface-raised text-gray-700 hover:border-accent-400 hover:text-accent-600 dark:text-gray-300 dark:hover:text-accent-400'
                }`}
              >
                {config.emoji} {config.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Browse by Category */}
      {categories.length > 0 && (
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Kategoriler
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  onCategorySelect(cat === selectedCategory ? null : cat)
                }
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'border-accent-500 bg-accent-500 text-white'
                    : 'border-border bg-surface-raised text-gray-700 hover:border-accent-400 hover:text-accent-600 dark:text-gray-300 dark:hover:text-accent-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Content */}
      {popularPosts.length > 0 && (
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Popüler İçerikler
          </h3>
          <ul className="space-y-3">
            {popularPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/${post.slug}`}
                  className="group block text-sm font-medium text-gray-700 transition-colors hover:text-accent-600 dark:text-gray-300 dark:hover:text-accent-400"
                >
                  <span className="underline decoration-transparent underline-offset-2 transition-colors group-hover:decoration-accent-400">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {popularPosts.some((p) => p.tags.length > 0) && (
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            Etiketler
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {Array.from(new Set(popularPosts.flatMap((p) => p.tags))).map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  #{tag}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </aside>
  )
}
