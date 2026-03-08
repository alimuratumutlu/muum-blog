# Prompt 11: Hakkımda Sayfası

## Bağımlılıklar
- Prompt 04 tamamlanmış olmalı (layout, Container)

## Kural Referansları
- rules/prd-scope.md — /about sayfası MVP kapsamında
- rules/design-system.md — prose tipografi

## Görev

### 1. app/about/page.tsx

Statik "Hakkımda" sayfası. İçerik hard-coded (Notion'dan gelmiyor).

```tsx
import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Hakkimda',
  description: 'Murat Umutlu hakkinda — yapay zeka, teknoloji ve yazilim uzerine.',
}

export default function AboutPage() {
  return (
    <section className="py-16">
      <Container className="max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Hakkimda
        </h1>

        <div className="prose prose-lg dark:prose-invert mt-8">
          <p>
            Merhaba, ben <strong>Murat Umutlu</strong>.
          </p>
          <p>
            Yapay zeka, LLM teknolojileri ve modern yazilim gelistirme uzerine
            calismalar yapiyorum. Bu blogda AI dunyasindaki en onemli
            gelismeleri, teknik analizleri ve pratik rehberleri paylasiyorum.
          </p>
          <p>
            Amacim, karmasik AI konularini anlasılır bir dille aktarmak ve
            Turkiye'deki teknoloji topluluguna katkida bulunmak.
          </p>

          <h2>Iletisim</h2>
          <p>
            Benimle iletisime gecmek icin asagidaki kanalları kullanabilirsiniz:
          </p>
          <ul>
            <li>
              X (Twitter): <a href="https://x.com/muratumutlu" target="_blank" rel="noopener noreferrer">@muratumutlu</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/muratumutlu" target="_blank" rel="noopener noreferrer">muratumutlu</a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
```

**Not:** Bu sayfa placeholder içerik ile oluşturulacak. Kullanıcı daha sonra kendi bilgilerini güncelleyecek.

## Kabul Kriterleri
- [ ] /about sayfası render ediliyor
- [ ] Prose tipografi doğru görünüyor
- [ ] Meta tags (title, description) doğru
- [ ] Dark mode'da okunabilir
- [ ] Mobile responsive

## Dosya Çıktıları
- app/about/page.tsx (tam implementasyon)
