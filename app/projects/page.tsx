import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import PortfolioProjects from '@/components/portfolio/PortfolioProjects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio of projects and technical work by Murat Umutlu.',
}

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">Projects</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          A collection of projects showcasing full-stack development, AI, blockchain, and more.
        </p>
        <PortfolioProjects />
      </Container>
    </section>
  )
}
