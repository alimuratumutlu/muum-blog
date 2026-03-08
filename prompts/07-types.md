# Prompt 07: TypeScript Type Definitions

## Bağımlılıklar
- Yok (diğer promptlardan önce veya Prompt 05 ile birlikte uygulanabilir)

## Kural Referansları
- rules/content-schema.md — Notion DB şeması
- rules/code-standards.md — interface tercih, strict types, `any` yasak

## Görev

### 1. lib/types.ts — Tüm Proje Tipleri

Notion DB şemasına birebir uyumlu TypeScript interface'leri tanımla.

```typescript
/** Notion DB'den gelen makale verisi */
export interface Post {
  /** Notion page ID */
  id: string
  /** Makale başlığı (Türkçe) */
  title: string
  /** URL slug — kebab-case, Türkçe karakter yok */
  slug: string
  /** Meta description, max 200 karakter */
  summary: string
  /** Kategori — sabit listeden biri */
  category: Category
  /** Etiketler — en az 1, en fazla 5 */
  tags: string[]
  /** Yayınlanma tarihi — ISO 8601 string */
  publishedAt: string
  /** Kapak görseli URL (opsiyonel) */
  coverImage: string | null
  /** Orijinal makale URL'i (opsiyonel, n8n pipeline'dan) */
  sourceUrl: string | null
  /** Orijinal İngilizce başlık (opsiyonel) */
  sourceTitle: string | null
  /** Tahmini okuma süresi (dakika) */
  readingTime: number | null
  /** Anasayfada öne çıkarma sırası */
  order: number | null
}

/** Sabit kategori listesi */
export type Category =
  | 'AI Araştırma'
  | 'Teknik Analiz'
  | 'Sektör Haberleri'
  | 'Görüş & Yorum'
  | 'Rehber & Tutorial'

/** Kategori listesi (runtime kullanımı için) */
export const CATEGORIES: Category[] = [
  'AI Araştırma',
  'Teknik Analiz',
  'Sektör Haberleri',
  'Görüş & Yorum',
  'Rehber & Tutorial',
] as const

/** Site navigasyon linki */
export interface NavLink {
  label: string
  href: string
}

/** Site konfigürasyonu */
export interface SiteConfig {
  name: string
  description: string
  url: string
  author: {
    name: string
    twitter?: string
  }
  nav: NavLink[]
}
```

### 2. Tip Uyumluluk Kontrolleri

- `Post` interface'i `lib/notion.ts`'deki `pageToPost()` fonksiyonunun return tipi olacak
- `Category` tipi Notion DB'deki "Kategori" select property'sine birebir karşılık gelmeli
- `SiteConfig` tipi `lib/constants.ts`'deki `SITE_CONFIG` ile uyumlu olmalı

### 3. lib/constants.ts Güncelleme

`constants.ts`'deki `SITE_CONFIG`'e `SiteConfig` tipini uygula:

```typescript
import type { SiteConfig } from '@/lib/types'

export const SITE_CONFIG: SiteConfig = {
  // ... mevcut değerler
}
```

## Kabul Kriterleri
- [ ] `Post` interface'i Notion DB şemasındaki tüm property'leri kapsıyor
- [ ] `Category` tipi 5 sabit kategoriye karşılık geliyor
- [ ] `any` tipi hiçbir yerde kullanılmamış
- [ ] `SiteConfig` tipi constants.ts ile uyumlu
- [ ] Tüm opsiyonel alanlar `| null` ile işaretli
- [ ] `npm run build` tip hatası vermiyor

## Dosya Çıktıları
- lib/types.ts (yeni — tam implementasyon)
- lib/constants.ts (güncelleme — SiteConfig tipi eklenir)
