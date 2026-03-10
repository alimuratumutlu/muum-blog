import type { SiteConfig } from '@/lib/types'

export const SITE_CONFIG: SiteConfig = {
  name: 'ai pusulası',
  description:
    'Yapay zeka dünyasından derinlemesine analizler, teknik incelemeler ve rehberler.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.umutlu.net',
  author: {
    name: 'ai pusulası',
    twitter: '@muratumutlu',
  },
  nav: [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Haberler', href: '/haber' },
    { label: 'Analizler', href: '/analiz' },
    { label: 'Rehberler', href: '/rehber' },
    { label: 'Projeler', href: '/projects' },
    { label: 'Hakkımda', href: '/about' },
  ],
}
