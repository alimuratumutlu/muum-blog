# Kural: Kod Standartları

## TypeScript

- **Strict mode** açık (`strict: true` in tsconfig)
- **`any` yasak** — her değişken tiplendirilmeli
- **Interface > Type** — obje tipleri için interface tercih et (extend edilebilirlik)
- **Explicit return types** — fonksiyonlara return type yaz
- **Const assertion** — sabit değerler için `as const`

```typescript
// ✅
interface Post {
  title: string
  slug: string
  date: string
  tags: string[]
}

function getPost(slug: string): Post | null { ... }

// ❌
type Post = { title: any, slug: any }
function getPost(slug) { ... }
```

## React / Next.js

- **Server Components default** — `'use client'` sadece interaktivite gerektiğinde
- **Named function components** — arrow function yerine named function tercih et

```typescript
// ✅ Server Component (default)
export default function BlogPage() { ... }

// ✅ Client Component (sadece gerektiğinde)
'use client'
export default function ThemeToggle() { ... }
```

- **Props inline** — basit componentlerde props tipini inline tanımla

```typescript
// ✅ Basit component
export default function PostCard({ post }: { post: Post }) { ... }

// ✅ Karmaşık component — ayrı interface
interface PostListProps {
  posts: Post[]
  category?: string
  limit?: number
}
export default function PostList({ posts, category, limit }: PostListProps) { ... }
```

## Tailwind CSS

- **Utility-first** — custom CSS yazmaktan kaçın
- **Responsive prefix sırası**: default → sm → md → lg
- **Dark mode**: `dark:` prefix ile
- **Class sırası** (mantıksal gruplama):
  1. Layout (flex, grid, position)
  2. Spacing (m, p)
  3. Sizing (w, h)
  4. Typography (text, font)
  5. Visual (bg, border, shadow)
  6. State (hover, focus, dark)

```tsx
// ✅ Sıralı
<div className="flex flex-col gap-4 p-6 max-w-2xl text-gray-900 bg-white border border-gray-200 rounded-lg hover:border-blue-500 dark:bg-gray-900 dark:text-white">

// ❌ Rastgele
<div className="hover:border-blue-500 bg-white p-6 flex text-gray-900 border gap-4 rounded-lg">
```

## Import / Export

- **Path alias** kullan: `@/` → proje root
- **Named export yok** component dosyalarında — sadece default export
- **Barrel export (index.ts) yasak** — doğrudan dosyadan import

```typescript
// ✅
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'

// ❌
import { PostCard } from '@/components'  // barrel export
import PostCard from '../../components/PostCard'  // relative path
```

## Error Handling

- **Try-catch** sadece async operasyonlarda (Notion API çağrıları, block render)
- **Null check** — `?? fallback` veya early return pattern
- **Console.log yasak** production kodda — geliştirme sırasında bile temizle

## Dosya Büyüklüğü

- Tek component dosyası **max 150 satır**
- Daha büyükse parçala
- `lib/posts.ts` istisna — tüm post utility'leri tek yerde

## Yorum (Comments)

- **Yorum yazma gereksiz yere** — kod kendi kendini açıklamalı
- **JSDoc sadece** lib/ fonksiyonları için (public API)
- **TODO yasak** — ya yap ya yapma

```typescript
// ✅ JSDoc for lib function
/** Tüm postları tarih sıralı döner. Published olmayanları filtreler. */
export function getAllPosts(): Post[] { ... }

// ❌ Gereksiz yorum
// This function gets all posts  ← kod zaten bunu söylüyor
export function getAllPosts() { ... }
```
