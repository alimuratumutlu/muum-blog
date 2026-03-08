import { getAllPublishedPosts, getCategories } from '@/lib/notion'
import HomeContent from '@/components/HomeContent'
import Container from '@/components/ui/Container'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 300

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPublishedPosts(),
    getCategories(),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — sky background matching header */}
      <section className="relative bg-sky-200 pb-24 pt-16 dark:bg-sky-900">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl">
            Yapay zeka dünyasını keşfet.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-800 dark:text-gray-300">
            Derinlemesine analizler, teknik incelemeler ve pratik rehberler. AI
            dünyasındaki en önemli gelişmeleri anlaşılır bir dille aktarıyorum.
          </p>
        </Container>
        <div className="hero-curve" />
      </section>

      {/* Main content — Articles + Sidebar */}
      <section className="py-12">
        <Container>
          <HomeContent posts={posts} categories={categories} />
        </Container>
      </section>
    </>
  )
}
