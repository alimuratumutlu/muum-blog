import { POST_TYPE_CONFIG } from '@/lib/types'
import type { PostType } from '@/lib/types'

export default function TypeBadge({ type }: { type: PostType }) {
  const config = POST_TYPE_CONFIG[type]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.badgeClass}`}
    >
      <span>{config.emoji}</span>
      {config.label}
    </span>
  )
}
