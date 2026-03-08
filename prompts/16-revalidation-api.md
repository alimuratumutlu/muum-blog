# Prompt 16: On-Demand ISR Revalidation Endpoint

## Bağımlılıklar
- Prompt 02 tamamlanmış olmalı (.env.local — REVALIDATION_SECRET)

## Kural Referansları
- rules/tech-stack.md — on-demand revalidation, API routes
- rules/prd-scope.md — revalidation endpoint MVP kapsamında

## Görev

### 1. app/api/revalidate/route.ts

Secret-based on-demand revalidation endpoint. Gelecekte n8n pipeline'ı bu endpoint'i çağırarak yeni makale yayınlandığında cache'i temizleyecek.

```typescript
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json().catch(() => null)
  const secret = body?.secret || request.nextUrl.searchParams.get('secret')

  // Secret doğrulama
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // Hangi path'ler revalidate edilecek
  const slug = body?.slug as string | undefined

  try {
    // Ana sayfa her zaman revalidate
    revalidatePath('/')
    revalidatePath('/blog')

    // Slug verilmişse makale detay da revalidate
    if (slug) {
      revalidatePath(`/blog/${slug}`)
    }

    return NextResponse.json({
      revalidated: true,
      paths: ['/', '/blog', ...(slug ? [`/blog/${slug}`] : [])],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
```

**Kullanım:**

```bash
# Tüm sayfaları revalidate
curl -X POST https://blog.umutlu.net/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret-here"}'

# Belirli bir makaleyi revalidate
curl -X POST https://blog.umutlu.net/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret-here", "slug": "makale-slug"}'
```

## Kabul Kriterleri
- [ ] POST /api/revalidate çalışıyor
- [ ] Secret doğrulama — yanlış secret'ta 401
- [ ] Secret olmadan 401
- [ ] Başarılı revalidation'da revalidated: true dönüyor
- [ ] `/`, `/blog` her zaman revalidate ediliyor
- [ ] slug parametresi ile tek makale revalidate edilebiliyor
- [ ] Hata durumunda 500 dönüyor, site çökmüyor

## Dosya Çıktıları
- app/api/revalidate/route.ts (tam implementasyon)
