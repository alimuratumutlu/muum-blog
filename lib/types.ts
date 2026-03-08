export type PostType = 'haber' | 'analiz' | 'rehber'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  type: PostType
  category: string
  tags: string[]
  coverImage: string | null
  publishedAt: string
  source?: string
  sourceUrl?: string
  readingTime?: number
  videoUrl?: string
  // Analiz-specific (AI Solution Blog)
  order?: number
  sourceTitle?: string
  // Rehber-specific (AI Gelişim Planı)
  level?: string
  targetAudience?: string
  // Haber-specific (AI Güncel Haberler)
  tweet?: string
  flood?: string
}

export const POST_TYPE_CONFIG: Record<
  PostType,
  { label: string; emoji: string; badgeClass: string; href: string }
> = {
  haber: {
    label: 'Haber',
    emoji: '📰',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    href: '/haber',
  },
  analiz: {
    label: 'Analiz',
    emoji: '✍️',
    badgeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    href: '/analiz',
  },
  rehber: {
    label: 'Rehber',
    emoji: '📚',
    badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    href: '/rehber',
  },
}

export interface NavLink {
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  author: {
    name: string
    twitter?: string
  }
  nav: NavLink[]
}
