# Prompt 02: Klasör Yapısı ve Config Dosyaları

## Bağımlılıklar
- Prompt 01 tamamlanmış olmalı

## Kural Referansları
- rules/file-naming.md — klasör yapısı ve dosya isimlendirme kuralları
- rules/tech-stack.md — izin verilen teknolojiler

## Görev

### 1. Klasör yapısını oluştur

Aşağıdaki klasör ve boş dosyaları oluştur:

```
app/
├── blog/
│   ├── page.tsx         # (boş placeholder)
│   └── [slug]/
│       └── page.tsx     # (boş placeholder)
├── about/
│   └── page.tsx         # (boş placeholder)
├── rss.xml/
│   └── route.ts         # (boş placeholder)
├── api/
│   └── revalidate/
│       └── route.ts     # (boş placeholder)
├── sitemap.ts           # (boş placeholder)
├── layout.tsx           # (mevcut, sonra güncellenecek)
├── page.tsx             # (mevcut, Prompt 01'de temizlendi)
└── globals.css          # (mevcut)

components/
├── Header.tsx           # (boş placeholder)
├── Footer.tsx           # (boş placeholder)
├── PostCard.tsx         # (boş placeholder)
├── PostList.tsx         # (boş placeholder)
├── NotionRenderer.tsx   # (boş placeholder)
├── ThemeToggle.tsx      # (boş placeholder)
└── ui/
    ├── Badge.tsx        # (boş placeholder)
    └── Container.tsx    # (boş placeholder)

lib/
├── notion.ts            # (boş placeholder)
├── renderer.ts          # (boş placeholder)
├── types.ts             # (boş placeholder)
└── constants.ts         # (boş placeholder)

public/
└── images/              # (boş klasör)

styles/
└── globals.css          # → app/globals.css'e import edilecek
```

**Not:** Placeholder dosyalar en az bir export veya yorum içermeli ki TypeScript hata vermesin.

Placeholder örneği:
```tsx
// components/PostCard.tsx
export default function PostCard() {
  return null
}
```

### 2. .env.local oluştur

```
NOTION_API_KEY=secret_your_notion_api_key_here
NOTION_DATABASE_ID=8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86
REVALIDATION_SECRET=your_revalidation_secret_here
NEXT_PUBLIC_SITE_URL=https://blog.umutlu.net
```

**DİKKAT:** Gerçek NOTION_API_KEY kullanıcıdan alınacak. Bu dosya .gitignore'da olmalı.

### 3. .env.example oluştur

.env.local ile aynı yapıda ama değerler placeholder:

```
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86
REVALIDATION_SECRET=xxx
NEXT_PUBLIC_SITE_URL=https://blog.umutlu.net
```

### 4. next.config.ts güncelle

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
```

## Kabul Kriterleri
- [ ] Tüm klasörler ve placeholder dosyalar mevcut
- [ ] `npm run build` hatasız tamamlanıyor (placeholder'lar build'ı bozmuyor)
- [ ] .env.local oluşturulmuş ve .gitignore'da
- [ ] .env.example repo'ya commit edilebilir durumda
- [ ] next.config.ts Notion image domain'lerini içeriyor
- [ ] Path alias `@/components/PostCard` gibi importlar çalışıyor

## Dosya Çıktıları
- Tüm placeholder dosyalar (yukarıdaki yapıya göre)
- .env.local (yeni)
- .env.example (yeni)
- next.config.ts (güncellenmiş)
