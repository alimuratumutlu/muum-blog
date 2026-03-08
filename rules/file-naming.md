# Kural: Dosya İsimlendirme ve Yapı

## Klasör Yapısı

PRD'deki yapı sabittir. Yeni klasör oluşturmak için gerekçe gerekir.

```
muum-blog/
├── app/           # Next.js App Router sayfaları
├── components/    # React componentleri
│   └── ui/        # Primitif UI componentleri
├── lib/           # Utility fonksiyonlar, Notion client, helpers
├── public/        # Statik dosyalar
│   └── images/    # Görseller
├── styles/        # Global CSS
```

**ÖNEMLİ:** `content/` klasörü YOKTUR. Tüm içerik Notion veritabanından gelir.

## Dosya İsimlendirme

| Dosya Tipi | Convention | Örnek |
|-----------|-----------|-------|
| React component | PascalCase.tsx | `PostCard.tsx` |
| Utility/lib | camelCase.ts | `notion.ts`, `renderer.ts` |
| Types | camelCase.ts | `types.ts` |
| Config | kebab-case | `next.config.ts`, `tailwind.config.ts` |
| CSS | kebab-case.css | `globals.css` |
| Next.js page | page.tsx (zorunlu) | `app/blog/page.tsx` |
| Next.js layout | layout.tsx (zorunlu) | `app/layout.tsx` |
| API route | route.ts (zorunlu) | `app/rss.xml/route.ts` |

## Slug Kuralları

Blog makalelerinin URL slug'ları Notion DB'deki `Slug` property'sinden gelir:

- Küçük harf, Türkçe karakter yok
- Sadece a-z, 0-9 ve tire (-)
- Kelimeler tire ile ayrılır

```
✅ anthropic-ai-is-izleri
✅ llm-karsilastirma-2026
❌ Anthropic-AI (büyük harf)
❌ anthropic_ai (alt çizgi)
❌ türkçe-karakter (Türkçe karakter)
```

## Component Dosya Kuralları

- Her component tek dosyada (co-location)
- Component adı = dosya adı
- Default export kullan
- Types aynı dosyada tanımlan (küçük componentler) veya `lib/types.ts`'de (paylaşılan tipler)

```typescript
// ✅ components/PostCard.tsx
export default function PostCard({ post }: PostCardProps) { ... }

// ❌ components/post-card/index.tsx (gereksiz karmaşıklık)
// ❌ components/PostCard/PostCard.tsx (gereksiz nesting)
```

## Import Sırası

```typescript
// 1. React/Next.js
import { Metadata } from 'next'

// 2. External packages
import { Client } from '@notionhq/client'

// 3. Internal lib
import { getAllPosts } from '@/lib/notion'

// 4. Components
import PostCard from '@/components/PostCard'

// 5. Types
import type { Post } from '@/lib/types'
```

## Yeni Dosya/Klasör Ekleme Kuralı

PRD'deki yapıda olmayan dosya veya klasör eklemek için:
1. Gerekçe sun
2. Hangi mevcut yapıya ait olduğunu belirt
3. Neden mevcut bir dosyaya eklenemediğini açıkla
