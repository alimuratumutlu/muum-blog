import type { Metadata } from 'next'
import { getPostsByType, getCategories, getTags } from '@/lib/notion'
import PostList from '@/components/PostList'
import Container from '@/components/ui/Container'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Rehberler',
  description: 'Adım adım teknik eğitim içerikleri ve AI rehberleri.',
}

export default async function RehberPage() {
  const [posts, categories, tags] = await Promise.all([
    getPostsByType('rehber'),
    getCategories('rehber'),
    getTags('rehber'),
  ])

  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">
          📚 Rehberler
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Adım adım teknik eğitim içerikleri ve AI rehberleri.
        </p>
        <PostList posts={posts} categories={categories} tags={tags} />
      </Container>
    </section>
  )
}
