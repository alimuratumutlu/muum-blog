import Link from 'next/link'
import Image from 'next/image'
import TypeBadge from '@/components/ui/TypeBadge'
import type { BlogPost } from '@/lib/types'

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/${post.slug}`}>
      <article className="group rounded-xl border border-border bg-surface-raised p-6 card-hover">
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

        <div className="flex items-center gap-2">
          <TypeBadge type={post.type} />
          {post.category && (
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {post.category}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-semibold text-gray-900 transition-colors group-hover:text-accent-600 dark:text-gray-100 dark:group-hover:text-accent-400">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.readingTime && <span>{post.readingTime} dk okuma</span>}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-accent-600 dark:text-accent-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
