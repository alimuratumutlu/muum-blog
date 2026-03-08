import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllPublishedPosts, getPostBySlug } from '@/lib/notion'
import NotionRenderer from '@/components/NotionRenderer'
import TypeBadge from '@/components/ui/TypeBadge'
import Container from '@/components/ui/Container'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 300

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Bulunamadı' }

  const url = `${SITE_CONFIG.url}/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: [SITE_CONFIG.author.name],
      tags: post.tags,
      ...(post.coverImage && {
        images: [{ url: post.coverImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
    ...(post.coverImage && { image: post.coverImage }),
    ...(post.videoUrl && {
      video: {
        '@type': 'VideoObject',
        embedUrl: post.videoUrl
          .replace('watch?v=', 'embed/')
          .replace('youtu.be/', 'youtube.com/embed/'),
      },
    }),
    url: `${SITE_CONFIG.url}/${post.slug}`,
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero header — sky background with curved bottom */}
      <div className="relative bg-sky-200 pb-24 pt-16 dark:bg-sky-900">
        <Container className="max-w-4xl">
          <div className="flex items-center gap-3">
            <TypeBadge type={post.type} />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">
                {post.category}
              </span>
              {' '}kategorisinde
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.readingTime && <span>· {post.readingTime} dk okuma</span>}
            {post.level && <span>· Seviye: {post.level}</span>}
          </div>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Container>

        {/* Decorative animals at sky-ground boundary */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
          {/* Eskimo — left-center */}
          <div className="absolute bottom-5 left-[32%]">
            <Image
              src="/images/eskimo.png"
              alt=""
              width={280}
              height={280}
              className="h-auto w-48 drop-shadow-md sm:w-56 md:w-70"
            />
          </div>
          {/* Penguin — right-center */}
          <div className="absolute bottom-[35px] right-[calc(20%+80px)]">
            <Image
              src="/images/penguen.png"
              alt=""
              width={140}
              height={140}
              className="h-auto w-24 drop-shadow-md sm:w-28 md:w-35"
            />
          </div>
          {/* Polar bear — right side */}
          <div className="absolute bottom-3.75 right-[6%]">
            <Image
              src="/images/kutup-ayisi.png"
              alt=""
              width={300}
              height={300}
              className="h-auto w-54 drop-shadow-md sm:w-66 md:w-75"
            />
          </div>
        </div>

        <div className="hero-curve" />
      </div>

      {/* Content area */}
      <div className="mt-8 pb-16">
        <Container className="max-w-5xl">
          {/* Cover image */}
          {post.coverImage && (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-xl shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
            </div>
          )}

          {/* Video embed */}
          {post.videoUrl && (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={post.videoUrl
                  .replace('watch?v=', 'embed/')
                  .replace('youtu.be/', 'youtube.com/embed/')}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          )}

          {/* Source attribution */}
          {post.sourceUrl && (
            <div className="mb-8 rounded-lg border border-accent-200 bg-accent-50 p-4 dark:border-accent-800 dark:bg-accent-950/30">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kaynak:{' '}
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 underline hover:text-accent-500 dark:text-accent-400"
                >
                  {post.sourceTitle || post.source || 'Orijinal makale'}
                </a>
              </p>
            </div>
          )}

          {/* Author sidebar + Article body */}
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
            {/* Author sidebar — sticky on desktop, inline on mobile */}
            <aside className="lg:sticky lg:top-16 lg:self-start">
              <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:text-center">
                <Image
                  src="/images/murat-umutlu.png"
                  alt={SITE_CONFIG.author.name}
                  width={200}
                  height={200}
                  className="w-full rounded-xl"
                />
                <div className="lg:mt-3">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {SITE_CONFIG.author.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  {post.readingTime && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readingTime} dk okuma
                    </p>
                  )}
                  {SITE_CONFIG.author.twitter && (
                    <a
                      href={`https://x.com/${SITE_CONFIG.author.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-accent-600 transition-colors hover:text-accent-500 dark:text-accent-400"
                    >
                      {SITE_CONFIG.author.twitter}
                    </a>
                  )}
                </div>
              </div>
            </aside>

            {/* Article body */}
            <div className="min-w-0">
              <NotionRenderer pageId={post.id} />
            </div>
          </div>
        </Container>
      </div>
    </article>
  )
}
