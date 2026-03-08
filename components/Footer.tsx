import Container from '@/components/ui/Container'
import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Tüm hakları
          saklıdır.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/rss.xml"
            className="text-sm text-gray-500 transition-colors hover:text-accent-500 dark:text-gray-400"
          >
            RSS
          </a>
        </div>
      </Container>
    </footer>
  )
}
