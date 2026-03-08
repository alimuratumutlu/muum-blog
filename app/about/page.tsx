import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Hakkımda',
  description:
    'Murat Umutlu hakkında — yapay zeka, teknoloji ve yazılım üzerine.',
}

export default function AboutPage() {
  return (
    <section className="py-16">
      <Container className="max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Hakkımda
        </h1>

        <div className="prose prose-lg dark:prose-invert mt-8">
          <p>
            Merhaba, ben <strong>Murat Umutlu</strong>.
          </p>
          <p>
            Yapay zeka, LLM teknolojileri ve modern yazılım geliştirme üzerine
            çalışmalar yapıyorum. Bu blogda AI dünyasındaki en önemli
            gelişmeleri, teknik analizleri ve pratik rehberleri paylaşıyorum.
          </p>
          <p>
            Amacım, karmaşık AI konularını anlaşılır bir dille aktarmak ve
            Türkiye&apos;deki teknoloji topluluğuna katkıda bulunmak.
          </p>

          <h2>İletişim</h2>
          <p>
            Benimle iletişime geçmek için aşağıdaki kanalları
            kullanabilirsiniz:
          </p>
          <ul>
            <li>
              X (Twitter):{' '}
              <a
                href="https://x.com/muratumutlu"
                target="_blank"
                rel="noopener noreferrer"
              >
                @muratumutlu
              </a>
            </li>
            <li>
              GitHub:{' '}
              <a
                href="https://github.com/muratumutlu"
                target="_blank"
                rel="noopener noreferrer"
              >
                muratumutlu
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
