import type { Metadata } from 'next'
import { getPostsByType, getCategories, getTags } from '@/lib/notion'
import PostList from '@/components/PostList'
import Container from '@/components/ui/Container'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Analizler',
  description: 'Yapay zeka üzerine derinlemesine analizler ve yorumlar.',
}

export default async function AnalizPage() {
  const [posts, categories, tags] = await Promise.all([
    getPostsByType('analiz'),
    getCategories('analiz'),
    getTags('analiz'),
  ])

  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          ✍️ Analizler
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          AI dünyası üzerine derinlemesine analizler ve yorumlar.
        </p>
        <PostList posts={posts} categories={categories} tags={tags} />
      </Container>
    </section>
  )
}
