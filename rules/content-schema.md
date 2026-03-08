# Kural: İçerik Şeması (Notion DB)

## Veri Kaynağı

İçerik **Notion** veritabanında yaşar. Dosya tabanlı içerik (MDX, Markdown) kullanılmaz.

- **DB Adı:** AI Solution Blog
- **Data Source ID:** 8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86
- **Yayın Kuralı:** `Yayınla` checkbox = true olan kayıtlar sitede görünür

## Notion DB Şeması

| Property | Tip | Zorunlu | Açıklama |
|----------|-----|---------|----------|
| Başlık | Title | ✅ | Makale başlığı (Türkçe), max 120 karakter |
| Slug | Text | ✅ | URL slug — küçük harf, a-z 0-9 tire, Türkçe karakter yok |
| Özet | Text | ✅ | Meta description, max 200 karakter |
| Kategori | Select | ✅ | Sabit listeden biri (aşağıda) |
| Etiketler | Multi-select | ✅ | En az 1, en fazla 5 etiket |
| Yayınla | Checkbox | ✅ | ✅ = sitede görünür |
| Yayın Tarihi | Date | ✅ | Yayınlanma tarihi (ISO 8601) |
| Cover Image | URL | ❌ | Kapak görseli URL |
| Kaynak URL | URL | ❌ | Orijinal makale linki (n8n pipeline'dan gelen) |
| Kaynak Başlık | Text | ❌ | Orijinal İngilizce başlık |
| Reading Time | Number | ❌ | Tahmini okuma süresi (dakika) |
| Sıra | Number | ❌ | Anasayfada öne çıkarma sıralaması |

## Kategori Listesi (Sabit)

Yeni kategori eklemek için kullanıcı onayı gerekir.

```
AI Araştırma
Teknik Analiz
Sektör Haberleri
Görüş & Yorum
Rehber & Tutorial
```

## Etiket Listesi (Genişletilebilir)

```
ai, llm, anthropic, openai, google, saas, startup, turkiye, egitim, mcp, n8n, nextjs, career
```

Yeni etiket eklenebilir ancak mevcut etiketler değiştirilemez.

## Makale İçeriği

Makale gövdesi Notion sayfasının **page content**'i olarak yazılır. Notion API ile block'lar çekilir ve `notion-to-md` kütüphanesi ile Markdown'a, ardından HTML'e dönüştürülür.

### Notion Block Desteği (MVP)

- ✅ Paragraph, Heading 2/3, Bulleted list, Numbered list
- ✅ Code block (dil bilgisi ile birlikte → shiki syntax highlight)
- ✅ Quote, Callout
- ✅ Image (Notion hosted veya external URL)
- ✅ Divider
- ✅ Toggle (collapsible)
- ❌ Embed (YouTube, Twitter) — MVP'de desteklenmez
- ❌ Table — MVP'de desteklenmez (gerekirse sonra eklenir)
- ❌ Database mention — desteklenmez

## Validasyon Kuralları

1. **Başlık** — boş olamaz, max 120 karakter
2. **Slug** — küçük harf, sadece a-z, 0-9 ve tire (-), Türkçe karakter yasak, unique olmalı
3. **Yayın Tarihi** — Yayınla=true ise zorunlu
4. **Özet** — max 200 karakter (meta description limiti)
5. **Kategori** — sabit listeden biri olmalı
6. **Etiketler** — en az 1, en fazla 5

## Notion API Çağrı Kuralları

- **Filtreleme:** `Yayınla` checkbox = true olanları getir
- **Sıralama:** `Yayın Tarihi` descending (en yeni en üstte)
- **Rate limit:** 3 request/saniye — batch query kullan
- **Cache:** Next.js ISR cache yeterli, ekstra cache katmanı yok
- **Error handling:** Notion API hatalarında fallback göster, site çökmesin

## Şema Değişikliği Kuralı

Bu şema sabit bir sözleşmedir. Değiştirmek için:
1. Gerekçe sun
2. Mevcut içerikle uyumluluk göster
3. Migration planı hazırla
4. Kullanıcı onayı al
