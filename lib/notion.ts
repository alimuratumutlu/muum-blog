import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { unstable_cache } from 'next/cache'
import type { BlogPost, PostType } from '@/lib/types'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const DATABASES = {
  haberler: {
    id: process.env.NOTION_DB_HABERLER!,
    type: 'haber' as PostType,
    titleField: 'Başlık',
    publishFilter: { property: 'Durum', select: { equals: 'Yayınlandı' } },
    coverField: 'Görsel URL',
    tagsField: 'Anahtar Kelimeler',
  },
  gelisim: {
    id: process.env.NOTION_DB_GELISIM!,
    type: 'rehber' as PostType,
    titleField: 'Konu',
    publishFilter: { property: 'Durum', select: { equals: 'Yayında' } },
    coverField: 'Cover Image',
    tagsField: null,
  },
  blog: {
    id: process.env.NOTION_DB_BLOG!,
    type: 'analiz' as PostType,
    titleField: 'Başlık',
    publishFilter: { property: 'Yayınla', checkbox: { equals: true } },
    coverField: 'Cover Image',
    tagsField: 'Etiketler',
  },
}

type DBKey = keyof typeof DATABASES
type DBConfig = (typeof DATABASES)[DBKey]

/* ── Property helpers ────────────────────────────────── */

function getTextProp(props: PageObjectResponse['properties'], name: string): string {
  const prop = props[name]
  if (!prop) return ''
  if (prop.type === 'rich_text') return prop.rich_text.map((t) => t.plain_text).join('')
  if (prop.type === 'title') return prop.title.map((t) => t.plain_text).join('')
  return ''
}

function getSelectProp(props: PageObjectResponse['properties'], name: string): string {
  const prop = props[name]
  if (prop?.type === 'select' && prop.select) return prop.select.name
  return ''
}

function getMultiSelectProp(props: PageObjectResponse['properties'], name: string): string[] {
  const prop = props[name]
  if (prop?.type === 'multi_select') return prop.multi_select.map((s) => s.name)
  return []
}

function getUrlProp(props: PageObjectResponse['properties'], name: string): string | null {
  const prop = props[name]
  if (prop?.type === 'url' && prop.url) return prop.url
  return null
}

function getDateProp(props: PageObjectResponse['properties'], name: string): string {
  const prop = props[name]
  if (prop?.type === 'date' && prop.date) return prop.date.start
  return new Date().toISOString()
}

function getNumberProp(props: PageObjectResponse['properties'], name: string): number | null {
  const prop = props[name]
  if (prop?.type === 'number' && prop.number !== null) return prop.number
  return null
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[çÇ]/g, 'c')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[şŞ]/g, 's')
    .replace(/[üÜ]/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/* ── Page → BlogPost mapping ────────────────────────── */

function mapPageToPost(page: PageObjectResponse, db: DBConfig): BlogPost {
  const props = page.properties

  const titleProp = props[db.titleField]
  const title =
    titleProp?.type === 'title'
      ? titleProp.title.map((t) => t.plain_text).join('')
      : ''

  const slug = getTextProp(props, 'Slug') || generateSlug(title)
  const excerpt = getTextProp(props, 'Özet')
  const coverImage = getUrlProp(props, db.coverField)
  const publishedAt = getDateProp(props, 'Yayın Tarihi')
  const category = getSelectProp(props, 'Kategori')
  const tags = db.tagsField ? getMultiSelectProp(props, db.tagsField) : []

  const post: BlogPost = {
    id: page.id,
    title,
    slug,
    excerpt,
    type: db.type,
    category,
    tags,
    coverImage,
    publishedAt,
    source: getTextProp(props, 'Kaynak') || undefined,
    sourceUrl: getUrlProp(props, 'Kaynak URL') || undefined,
  }

  if (db.type === 'analiz') {
    post.readingTime = getNumberProp(props, 'Reading Time') ?? undefined
    post.videoUrl = getUrlProp(props, 'Video URL') ?? undefined
    post.order = getNumberProp(props, 'Sıra') ?? undefined
    post.sourceTitle = getTextProp(props, 'Kaynak Başlık') || undefined
  }

  if (db.type === 'rehber') {
    post.level = getSelectProp(props, 'Seviye') || undefined
    post.targetAudience = getSelectProp(props, 'Hedef Kitle') || undefined
  }

  if (db.type === 'haber') {
    post.tweet = getTextProp(props, 'Tweet') || undefined
    post.flood = getTextProp(props, 'Flood') || undefined
  }

  return post
}

/* ── Data fetching ───────────────────────────────────── */

async function fetchFromDB(dbKey: DBKey): Promise<BlogPost[]> {
  const db = DATABASES[dbKey]

  try {
    const posts: BlogPost[] = []
    let cursor: string | undefined
    let hasMore = true

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: db.id,
        filter: db.publishFilter,
        sorts: [{ property: 'Yayın Tarihi', direction: 'descending' }],
        start_cursor: cursor,
        page_size: 100,
      })

      for (const page of response.results) {
        if ('properties' in page) {
          const post = mapPageToPost(page as PageObjectResponse, db)
          if (post.slug) posts.push(post)
        }
      }

      hasMore = response.has_more
      cursor = response.next_cursor ?? undefined
    }

    return posts
  } catch (error) {
    console.error(`Notion API error (${dbKey}):`, error)
    return []
  }
}

/* ── Cached data fetching ─────────────────────────────── */

const CACHE_TTL = 300 // 5 dakika — revalidate ile aynı

/** 3 DB'den tüm yayınlanmış içerikleri paralel getirir, tarihe göre sıralar */
export const getAllPublishedPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const [haberler, gelisim, blog] = await Promise.all([
      fetchFromDB('haberler'),
      fetchFromDB('gelisim'),
      fetchFromDB('blog'),
    ])

    return [...haberler, ...gelisim, ...blog].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  },
  ['all-posts'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

/** Belirli bir türdeki postları getirir */
export const getPostsByType = unstable_cache(
  async (type: PostType): Promise<BlogPost[]> => {
    const dbKey: DBKey =
      type === 'haber' ? 'haberler' : type === 'rehber' ? 'gelisim' : 'blog'
    return fetchFromDB(dbKey)
  },
  ['posts-by-type'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

/** Slug ile 3 DB'de paralel arama */
export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    const results = await Promise.all(
      (Object.keys(DATABASES) as DBKey[]).map(async (key) => {
        const db = DATABASES[key]
        try {
          const response = await notion.databases.query({
            database_id: db.id,
            filter: {
              and: [
                db.publishFilter,
                { property: 'Slug', rich_text: { equals: slug } },
              ],
            },
            page_size: 1,
          })

          if (response.results.length > 0 && 'properties' in response.results[0]) {
            return mapPageToPost(response.results[0] as PageObjectResponse, db)
          }
          return null
        } catch {
          return null
        }
      })
    )

    return results.find((r) => r !== null) || null
  },
  ['post-by-slug'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

/** Tüm unique kategorileri döner (opsiyonel tür filtresi) */
export const getCategories = unstable_cache(
  async (type?: PostType): Promise<string[]> => {
    const posts = type ? await getPostsByType(type) : await getAllPublishedPosts()
    return [...new Set(posts.map((p) => p.category).filter(Boolean))]
  },
  ['categories'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

/** Tüm unique etiketleri döner (opsiyonel tür filtresi) */
export const getTags = unstable_cache(
  async (type?: PostType): Promise<string[]> => {
    const posts = type ? await getPostsByType(type) : await getAllPublishedPosts()
    return [...new Set(posts.flatMap((p) => p.tags))]
  },
  ['tags'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)
