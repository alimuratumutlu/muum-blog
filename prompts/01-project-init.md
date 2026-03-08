# Prompt 01: Proje Oluşturma ve Bağımlılık Kurulumu

## Bağımlılıklar
- Yok (ilk prompt)

## Kural Referansları
- rules/tech-stack.md — izin verilen teknolojiler ve versiyonlar
- rules/prd-scope.md — scope kısıtlamaları

## Görev

### 1. Next.js projesi oluştur

```bash
npx create-next-app@latest blog-umutlu-net \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --use-npm
```

Proje dizinine gir: `cd blog-umutlu-net`

### 2. Production bağımlılıkları kur

```bash
npm install @notionhq/client notion-to-md shiki reading-time
```

### 3. Dev bağımlılıkları kur

```bash
npm install -D @tailwindcss/typography prettier prettier-plugin-tailwindcss
```

### 4. tsconfig.json güncelle

Strict mode aktif olmalı. Path alias `@/*` zaten create-next-app ile ayarlanmış olacak. Aşağıdaki ayarları doğrula:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5. .prettierrc oluştur

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 6. .gitignore doğrula

create-next-app'in oluşturduğu .gitignore'a `.env.local` satırının dahil olduğunu kontrol et.

### 7. Gereksiz dosyaları temizle

- `app/page.tsx` içeriğini boşalt (sadece basit bir "Merhaba" placeholder bırak)
- `app/globals.css`'deki custom stilleri temizle, sadece Tailwind direktiflerini bırak
- `public/` altındaki Next.js default SVG/ico dosyalarını sil (next.svg, vercel.svg)

## Kabul Kriterleri
- [ ] `npm run dev` çalışıyor, localhost:3000'de sayfa açılıyor
- [ ] TypeScript strict mode aktif
- [ ] Tüm bağımlılıklar package.json'da mevcut: next, react, react-dom, @notionhq/client, notion-to-md, shiki, reading-time
- [ ] Dev dependencies: @tailwindcss/typography, prettier, prettier-plugin-tailwindcss
- [ ] Path alias `@/*` çalışıyor
- [ ] .env.local .gitignore'da

## Dosya Çıktıları
- package.json (güncellenmiş)
- tsconfig.json (doğrulanmış)
- .prettierrc (yeni)
- app/page.tsx (temizlenmiş)
- app/globals.css (temizlenmiş)
