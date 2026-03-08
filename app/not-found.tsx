import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center">
        <h1 className="text-6xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Aradığınız sayfa bulunamadı.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-accent-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-600"
        >
          Ana sayfaya dön
        </Link>
      </Container>
    </section>
  )
}
