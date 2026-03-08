import type { MetadataRoute } from 'next'
import { getAllPublishedPosts } from '@/lib/notion'
import { SITE_CONFIG } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts()

  const postEntries = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/haber`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/analiz`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/rehber`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postEntries,
  ]
}
