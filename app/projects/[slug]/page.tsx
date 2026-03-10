import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import MarkdownContent from '@/components/markdown/MarkdownContent'
import { getProjectsContentBySlug, getProjectsSlugs } from '@/lib/markdown'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getProjectsSlugs('en')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const item = getProjectsContentBySlug(slug, 'en')
  if (!item) return { title: 'Not Found' }
  return {
    title: item.meta.title,
    description: item.meta.description || item.meta.title,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = getProjectsContentBySlug(slug, 'en')

  if (!item) {
    notFound()
  }

  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-4 font-mono text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
          {item.meta.title}
        </h1>
        {item.meta.description && (
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
            {item.meta.description}
          </p>
        )}
        <MarkdownContent content={item.content} />
      </Container>
    </section>
  )
}
