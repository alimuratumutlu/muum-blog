import Link from 'next/link'
import TypeBadge from '@/components/ui/TypeBadge'
import type { BlogPost } from '@/lib/types'

export default function ArticleItem({ post }: { post: BlogPost }) {
  return (
    <article className="group border-b border-border py-8 first:pt-0 last:border-b-0">
      <Link href={`/${post.slug}`} className="block">
        <div className="flex items-center gap-3">
          <TypeBadge type={post.type} />
          <span className="text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
            {post.category}
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-accent-600 dark:text-gray-100 dark:group-hover:text-accent-400">
          {post.title}
        </h2>

        <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {post.excerpt}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900 underline decoration-transparent underline-offset-2 transition-colors group-hover:decoration-accent-400 dark:text-gray-100">
            Devamını oku
          </span>
          {post.readingTime && (
            <span className="text-xs text-gray-500">
              · {post.readingTime} dk
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}
