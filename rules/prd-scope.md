# Kural: PRD Scope Kısıtlamaları

## MVP Kapsamı (İZİN VERİLEN)

Aşağıdaki özellikler MVP kapsamındadır ve uygulanabilir:

1. Makale listeleme (ana sayfa + /blog) — Notion API'dan çekilir
2. Makale detay (/blog/[slug]) — Notion page content render
3. Kategori & etiket filtreleme (client-side)
4. SEO — meta tags, Open Graph, Twitter Card, JSON-LD
5. RSS feed (/rss.xml)
6. Sitemap (/sitemap.xml)
7. Responsive tasarım — mobile-first
8. Dark/Light mode — system preference + toggle
9. Kaynak attribution — orijinal makale linki (varsa)
10. Kod bloğu syntax highlighting (shiki)
11. ISR — revalidate: 3600 (1 saat) + on-demand revalidation endpoint

## İçerik Kaynağı

**Notion veritabanı** tek veri kaynağıdır. Dosya tabanlı CMS (MDX, Markdown, Contentlayer) kullanılmaz.
- DB: AI Solution Blog (data_source_id: 8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86)
- Yayın kontrolü: `Yayınla` checkbox

## MVP DIŞI (YASAK — bu sprint'te uygulanmaz)

Aşağıdaki özellikler açıkça yasaktır. Bunlarla ilgili herhangi bir prompt veya kod üretilmez:

- ❌ Yorum sistemi (giscus, Disqus, vb.)
- ❌ Newsletter/email signup
- ❌ Full-text arama
- ❌ View counter / analytics entegrasyonu
- ❌ n8n → blog otomatik publish pipeline (Faz 2)
- ❌ X Articles cross-post
- ❌ i18n / çoklu dil desteği
- ❌ Analytics dashboard (Plausible, Umami, GA)
- ❌ Authentication / admin panel
- ❌ Veritabanı (Supabase, PostgreSQL, vb.) — Notion yeterli
- ❌ CMS entegrasyonu (Sanity, Contentful, vb.) — Notion CMS
- ❌ E-commerce / ödeme
- ❌ API routes (RSS + revalidation hariç)
- ❌ WebSocket / real-time özellikler
- ❌ Image optimization pipeline (Next.js built-in Image yeterli)
- ❌ MDX / dosya tabanlı içerik — tüm içerik Notion'da
- ❌ Docker — Vercel yeterli
- ❌ Test framework — MVP'de test yok

## Scope Creep Tespiti

Aşağıdaki durumlar scope creep olarak değerlendirilir:

1. Yasak listesindeki herhangi bir özelliğin eklenmesi
2. Yeni bir sayfa eklenmesi (/, /blog, /blog/[slug], /about dışında)
3. Yeni bir external dependency eklenmesi (gerekçelendirilmeden)
4. "Küçük bir ekleme" olarak sunulan yeni bir özellik
5. "Sonra da lazım olur" mantığıyla yapılan genişlemeler
6. Notion DB şemasına yeni property ekleme talebi

## Scope Creep Müdahalesi

Eğer kullanıcı yasak listesindeki bir özelliği isterse:

```
⚠️ SCOPE UYARISI: "[özellik adı]" PRD'de MVP dışı olarak tanımlanmış.
Bu özellik mevcut sprint kapsamına dahil değil.

Seçenekler:
1. Bu sprint'i MVP ile tamamla, sonraki sprint'e ekle
2. MVP'den bir özelliği çıkarıp bununla değiştir
3. Scope değişikliğini kabul et (PRD güncellenir)
```
