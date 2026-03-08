import type { Metadata } from 'next'
import { getPostsByType, getCategories, getTags } from '@/lib/notion'
import PostList from '@/components/PostList'
import Container from '@/components/ui/Container'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'AI Haberler',
  description: 'Yapay zeka dünyasından en güncel haberler ve gelişmeler.',
}

export default async function HaberPage() {
  const [posts, categories, tags] = await Promise.all([
    getPostsByType('haber'),
    getCategories('haber'),
    getTags('haber'),
  ])

  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          📰 AI Haberler
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Yapay zeka dünyasından en güncel haberler — kategoriye göre filtrele.
        </p>
        <PostList posts={posts} categories={categories} tags={tags} />
      </Container>
    </section>
  )
}
