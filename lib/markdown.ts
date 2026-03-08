import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export type ContentType =
  | 'projects-projects'
  | 'projects-tech'

export interface MarkdownMeta {
  title: string
  description: string
  slug?: string
  date?: string
  published?: string
  tags?: string[]
  category?: string
}

export interface MarkdownContent {
  slug: string
  meta: MarkdownMeta
  content: string
}

function getContentPath(contentType: ContentType, locale: string): string {
  const pathMap: Record<string, string> = {
    'projects-projects': 'projects/projects',
    'projects-tech': 'projects/tech',
  }
  const subPath = pathMap[contentType] || contentType
  return path.join(contentDir, locale, subPath)
}

export function getContentSlugs(contentType: ContentType, locale: string): string[] {
  const dir = getContentPath(contentType, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getContentBySlug(
  contentType: ContentType,
  slug: string,
  locale: string,
): MarkdownContent | null {
  const dir = getContentPath(contentType, locale)
  const fullPath = path.join(dir, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const meta = { ...data, slug: data.slug || slug } as MarkdownMeta
  const raw = data as Record<string, unknown>
  if (raw.date instanceof Date) meta.date = raw.date.toISOString()
  if (raw.published instanceof Date) meta.published = raw.published.toISOString()
  return { slug, meta, content }
}

export function getProjectsContentBySlug(
  slug: string,
  locale: string,
): MarkdownContent | null {
  const projects = getContentBySlug('projects-projects', slug, locale)
  if (projects) return projects
  return getContentBySlug('projects-tech', slug, locale)
}

export function getProjectsSlugs(locale: string): string[] {
  const projects = getContentSlugs('projects-projects', locale)
  const tech = getContentSlugs('projects-tech', locale)
  return [...new Set([...projects, ...tech])]
}
