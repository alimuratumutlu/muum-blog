# Prompt 05: Notion API Client

## Bağımlılıklar
- Prompt 01 tamamlanmış olmalı (bağımlılıklar kurulu)
- Prompt 02 tamamlanmış olmalı (.env.local mevcut)

## Kural Referansları
- rules/tech-stack.md — Notion API kuralları (singleton, rate limit, cache)
- rules/content-schema.md — DB şeması, filtreleme, sıralama kuralları
- rules/code-standards.md — TypeScript strict, error handling

## Görev

### 1. lib/notion.ts — Notion API Client ve Query Fonksiyonları

Bu dosya projenin veri katmanıdır. Tüm Notion API çağrıları buradan yapılır.

**Gereksinimler:**

1. **Singleton client** — `@notionhq/client` ile tek instance
2. **getAllPosts()** — Tüm yayınlanmış makaleleri getir (Yayınla=true, Yayın Tarihi desc)
3. **getPostBySlug(slug)** — Tek makaleyi slug ile getir
4. **getPostContent(pageId)** — Makale page content'ini block olarak getir
5. **getCategories()** — Unique kategori listesi
6. **getTags()** — Unique etiket listesi

**Notion DB Şeması Mapping:**

```
Başlık      → title property
Slug        → rich_text property (adı: "Slug")
Özet        → rich_text property (adı: "Özet")
Kategori    → select property (adı: "Kategori")
Etiketler   → multi_select property (adı: "Etiketler")
Yayınla     → checkbox property (adı: "Yayınla")
Yayın Tarihi → date property (adı: "Yayın Tarihi")
Cover Image → url property (adı: "Cover Image")
Kaynak URL  → url property (adı: "Kaynak URL")
Kaynak Başlık → rich_text property (adı: "Kaynak Başlık")
Reading Time → number property (adı: "Reading Time")
Sıra        → number property (adı: "Sıra")
```

**Implementasyon:**

```typescript
import { Client } from '@notionhq/client'
import type { Post } from '@/lib/types'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const databaseId = process.env.NOTION_DATABASE_ID!

/** Notion page properties'den Post objesine dönüştür */
function pageToPost(page: any): Post {
  // Properties'den veri çekilir ve Post tipine dönüştürülür
  // Null safety — her property için fallback değer
}

/** Tüm yayınlanmış postları döner. Yayın tarihi desc sıralı. */
export async function getAllPosts(): Promise<Post[]> {
  // Filter: Yayınla = true
  // Sort: Yayın Tarihi descending
  // Pagination: has_more ile tüm sonuçları topla
}

/** Slug ile tek post getirir. Bulunamazsa null döner. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Filter: Yayınla = true AND Slug = slug
}

/** Post'un page content'ini Notion block'ları olarak getirir. */
export async function getPostContent(pageId: string): Promise<any[]> {
  // blocks.children.list recursive — nested block'lar dahil
}

/** Tüm unique kategorileri döner. */
export async function getCategories(): Promise<string[]> {
  // getAllPosts() sonucundan unique kategori çıkar
}

/** Tüm unique etiketleri döner. */
export async function getTags(): Promise<string[]> {
  // getAllPosts() sonucundan unique etiket çıkar
}
```

**Error Handling:**

```typescript
try {
  const response = await notion.databases.query({ ... })
} catch (error) {
  console.error('Notion API error:', error)
  return [] // veya null — site çökmesin
}
```

**Pagination handling:**

Notion API max 100 sonuç döner. `has_more` ve `next_cursor` ile tüm sonuçları topla.

**Notion block recursive fetch:**

`getPostContent` fonksiyonunda nested block'ları (bulleted_list > children gibi) recursive olarak çek. `has_children: true` olan block'lar için `blocks.children.list` çağır.

## Kabul Kriterleri
- [ ] `getAllPosts()` Notion'dan Yayınla=true postları çekiyor
- [ ] `getPostBySlug('test-slug')` tek post döndürüyor
- [ ] `getPostContent(pageId)` block listesi döndürüyor
- [ ] Notion API hatalarında site çökmüyor (try-catch)
- [ ] Pagination — 100+ post destekleniyor
- [ ] Nested block'lar recursive olarak çekiliyor
- [ ] NOTION_API_KEY ve NOTION_DATABASE_ID .env.local'den okunuyor
- [ ] `any` tipi minimize edilmiş (Notion SDK tipleri kullanılıyor)

## Dosya Çıktıları
- lib/notion.ts (yeni — tam implementasyon)
