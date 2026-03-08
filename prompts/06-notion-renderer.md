# Prompt 06: Notion Blocks to HTML Renderer

## Bağımlılıklar
- Prompt 05 tamamlanmış olmalı (lib/notion.ts — getPostContent)
- Prompt 07 tamamlanmış olmalı (lib/types.ts — Post tipi)

## Kural Referansları
- rules/content-schema.md — desteklenen Notion block tipleri
- rules/tech-stack.md — notion-to-md kullanımı
- rules/code-standards.md — TypeScript, error handling

## Görev

### 1. lib/renderer.ts — Notion Block → Markdown Dönüşümü

`notion-to-md` kütüphanesini kullanarak Notion block'larını Markdown string'e dönüştür.

```typescript
import { NotionToMarkdown } from 'notion-to-md'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

/** Notion page ID'den Markdown string üretir */
export async function getMarkdownFromPage(pageId: string): Promise<string> {
  const mdblocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdblocks)
  return mdString.parent
}
```

### 2. components/NotionRenderer.tsx — Markdown → HTML Render

Markdown'ı HTML'e dönüştürüp render eden Server Component.

**Yaklaşım seçenekleri (birini seç):**

**Seçenek A: notion-to-md + basit Markdown→HTML dönüşümü**

Markdown string'i parse edip HTML'e dönüştür. Basit bir Markdown parser kullan veya regex-based dönüşüm yap. Tailwind `prose` class'ı ile stillendir.

**Seçenek B: notion-to-md + doğrudan JSX render**

`notion-to-md`'den gelen MdBlock array'ini iterate edip her block tipini JSX'e çevir.

**Tercih edilen yaklaşım:** Seçenek A — `notion-to-md` ile Markdown string al, basit bir dönüştürücü ile HTML yap, `prose` class ile render et.

**NotionRenderer component:**

```tsx
import { getMarkdownFromPage } from '@/lib/renderer'

interface NotionRendererProps {
  pageId: string
}

export default async function NotionRenderer({ pageId }: NotionRendererProps) {
  const markdown = await getMarkdownFromPage(pageId)
  const html = markdownToHtml(markdown) // basit dönüştürücü

  return (
    <article
      className="prose prose-lg dark:prose-invert mx-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

**Desteklenen block tipleri (rules/content-schema.md):**

- Paragraph → `<p>`
- Heading 2 → `<h2>` (border-left accent, Prompt 03'te stili tanımlı)
- Heading 3 → `<h3>`
- Bulleted list → `<ul><li>`
- Numbered list → `<ol><li>`
- Code block → `<pre><code>` (dil bilgisi korunmalı — Prompt 15'te shiki ile highlight)
- Quote → `<blockquote>`
- Callout → `<div class="callout">` (özel stil)
- Image → `<img>` veya Next.js `<Image>` (width/height gerekli)
- Divider → `<hr>`
- Toggle → `<details><summary>`

**Callout özel stili (globals.css'e eklenecek):**

```css
.callout {
  @apply my-4 rounded-lg border-l-4 border-accent-400 bg-accent-50 p-4 dark:bg-accent-950/30;
}
```

**Image handling:**

Notion hosted görseller için URL'ler geçici olabilir (1 saat). ISR revalidate süresi ile uyumlu. External URL görselleri sorunsuz çalışır.

## Kabul Kriterleri
- [ ] `getMarkdownFromPage(pageId)` Markdown string döndürüyor
- [ ] `NotionRenderer` component'i server-side render yapıyor
- [ ] Tüm desteklenen block tipleri HTML'e dönüşüyor
- [ ] Code block'larda dil bilgisi korunuyor (shiki entegrasyonu Prompt 15'te)
- [ ] Callout özel stili görünüyor
- [ ] Prose class ile tipografi doğru
- [ ] Dark mode'da prose renkleri doğru (prose-invert)
- [ ] Image block'ları render ediliyor

## Dosya Çıktıları
- lib/renderer.ts (yeni — tam implementasyon)
- components/NotionRenderer.tsx (yeni — tam implementasyon)
- app/globals.css (güncelleme — callout stili eklenir)
