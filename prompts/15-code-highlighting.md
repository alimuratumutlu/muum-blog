# Prompt 15: Syntax Highlighting (Shiki)

## Bağımlılıklar
- Prompt 06 tamamlanmış olmalı (lib/renderer.ts, NotionRenderer)

## Kural Referansları
- rules/tech-stack.md — shiki kullanımı
- rules/content-schema.md — code block dil bilgisi korunmalı
- rules/performance.md — bundle size bütçesi

## Tasarım Notu

**Referans:** joshwcomeau.com kod blokları — güzel renkli tema, dil etiketi, rounded corners.

## Görev

### 1. lib/renderer.ts — Shiki Entegrasyonu

Markdown→HTML dönüşümünde code block'ları tespit et ve shiki ile highlight yap.

```typescript
import { codeToHtml } from 'shiki'

/** Code block'u shiki ile highlight eder */
export async function highlightCode(code: string, lang: string): Promise<string> {
  const html = await codeToHtml(code, {
    lang: lang || 'text',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  })
  return html
}
```

**Shiki dual theme:**

CSS `prefers-color-scheme` veya `.dark` class'a göre tema değişimi. Shiki'nin `themes` seçeneği ile iki tema birden üretilir ve CSS ile birisi gizlenir.

### 2. Markdown Renderer'a Entegrasyon

`lib/renderer.ts` veya `components/NotionRenderer.tsx` içinde:

1. Markdown string'deki code fence'leri (` ```lang ... ``` `) tespit et
2. Her code block için `highlightCode(code, lang)` çağır
3. Sonucu HTML'e yerleştir

**Alternatif:** notion-to-md çıktısını işlerken code block'ları yakalayıp shiki'den geçir.

### 3. Code Block Stili (globals.css)

```css
/* Shiki code blocks */
pre:has(code) {
  @apply my-6 overflow-x-auto rounded-xl border border-border p-4;
  font-size: 15px;
  line-height: 1.6;
}

/* Dil etiketi */
pre[data-language]::before {
  content: attr(data-language);
  @apply mb-2 block text-xs font-medium uppercase text-gray-500 dark:text-gray-400;
}

/* Dark/Light tema geçişi */
html:not(.dark) .shiki .dark {
  display: none;
}
html.dark .shiki .light {
  display: none;
}
html.dark .shiki {
  background-color: var(--shiki-dark-bg) !important;
}
```

### 4. Desteklenen Diller

Shiki tüm dilleri destekler ama bundle size'ı kontrol altında tutmak için yaygın olanları yükle:

```
javascript, typescript, python, bash, json, yaml, css, html, jsx, tsx, sql, markdown, diff
```

Bilinmeyen dil geldiğinde `text` olarak render et.

## Kabul Kriterleri
- [ ] Code block'lar shiki ile syntax highlighted
- [ ] Light mode'da github-light, dark mode'da github-dark tema
- [ ] Tema geçişinde kod renkleri doğru
- [ ] Dil etiketi code block üstünde görünüyor
- [ ] Code block'lar rounded, border'lı, overflow-x scroll
- [ ] Bilinmeyen dilde hata yok (fallback: text)
- [ ] Bundle size bütçesi aşılmıyor (shiki lazy load)
- [ ] Font: JetBrains Mono / monospace

## Dosya Çıktıları
- lib/renderer.ts (güncelleme — shiki entegrasyonu)
- components/NotionRenderer.tsx (güncelleme — highlighted code render)
- app/globals.css (güncelleme — code block stilleri)
