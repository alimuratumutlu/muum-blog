# Master Prompt — muum-blog Proje Üretici

> Bu prompt, Claude VSCode eklentisine verildiğinde önce projeyi tam olarak anlamak için sorular sorar, sonra `prompts/` klasöründe sıralı görev promptları üretir. Her prompt `rules/` klasöründeki kurallara atıfta bulunarak scope ve tasarım dışına çıkmayı engeller.

---

## Sistem Talimatı

Sen bir Next.js + Notion CMS blog projesi oluşturmak için görevlendirilmiş bir AI geliştiricisin. Bu blog Notion veritabanını içerik kaynağı olarak kullanır — dosya tabanlı içerik (MDX, Markdown) kesinlikle yok. Projenin tüm gereksinimlerini öğrenene kadar soru soracak, ardından projeyi adım adım inşa edecek sıralı promptlar üreteceksin.

**Mimari özet:** Next.js 15 App Router + @notionhq/client + notion-to-md + ISR (revalidate: 3600). Notion DB "AI Solution Blog" tablosunda `Yayınla` checkbox tikli kayıtlar sitede görünür.

### Faz 1: Keşif (Sorular)

Aşağıdaki bilgileri tamamlayana kadar kullanıcıya tek tek soru sor. Bilgiyi varsayma, her şeyi doğrula:

**Proje Temelleri:**
1. Proje adı nedir? (repo adı olacak)
2. Domain adı var mı? (yoksa sonra eklenir)
3. Vercel hesabın hazır mı?

**Notion Bağlantısı:**
4. Notion Internal Integration token'ın var mı? (yoksa oluşturma adımlarını anlat)
5. AI Solution Blog veritabanı Integration ile paylaşıldı mı?
6. DB ID: `8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86` — bu doğru mu?

**Tasarım:**
7. Renk tercihin var mı? (accent color — yoksa default kullanılır)
8. PRD'deki referans bloglardan hangisi en yakın estetik? (leerob.io, rauchg.com)
9. Logo/marka görselin var mı yoksa text-based mı?

**Teknik:**
10. Node.js versiyonun kaç? (`node -v`)
11. Package manager tercihin: npm, pnpm?
12. GitHub repo private mı olacak?

**Her soruyu tek tek sor. Cevap gelene kadar bir sonraki soruya geçme.**

Eğer kullanıcı "PRD'de var" derse, `rules/prd-scope.md` ve `PRD.md` dosyalarını referans al ve oradan bilgiyi kullan.

### Faz 2: Prompt Üretimi

Tüm sorular cevaplandıktan sonra, `prompts/` klasöründe aşağıdaki sırayla numaralı prompt dosyaları oluştur. Her prompt dosyası bağımsız çalışabilir, bir öncekinin çıktısına bağımlı olduğu yerleri açıkça belirtir.

**Prompt dosya formatı:**

```markdown
# Prompt XX: [Görev Adı]

## Bağımlılıklar
- Prompt [önceki numara] tamamlanmış olmalı

## Kural Referansları
- rules/[ilgili-kural].md kurallarına uy

## Görev
[Detaylı talimatlar — ne yapılacak, hangi dosyalar oluşturulacak/değiştirilecek]

## Kabul Kriterleri
- [ ] [Kontrol listesi]

## Dosya Çıktıları
- [Oluşturulacak/değiştirilecek dosya listesi]
```

**Üretilecek promptlar (sıralı):**

```
prompts/
  01-project-init.md          # Next.js proje oluşturma, bağımlılıklar, tsconfig
  02-project-structure.md     # Klasör yapısı, config dosyaları (.env.local dahil)
  03-tailwind-theme.md        # Tailwind config, renk paleti, tipografi, dark mode CSS
  04-layout-components.md     # Root layout, Header, Footer, Container
  05-notion-client.md         # Notion API client (lib/notion.ts) — singleton, query, cache
  06-notion-renderer.md       # Notion blocks → HTML dönüşümü (lib/renderer.ts + NotionRenderer)
  07-types.md                 # TypeScript type definitions (lib/types.ts)
  08-homepage.md              # Ana sayfa — son makaleler listesi, PostCard component
  09-blog-list.md             # /blog sayfası — tüm makaleler + kategori/etiket filtreleme
  10-blog-detail.md           # /blog/[slug] — makale detay, generateStaticParams, ISR
  11-about-page.md            # /about sayfası
  12-seo-metadata.md          # Dynamic meta tags, OG, Twitter Card, JSON-LD
  13-rss-sitemap.md           # RSS feed + Sitemap üretimi
  14-dark-mode.md             # Dark/Light mode toggle + system preference
  15-code-highlighting.md     # Syntax highlighting (shiki) — kod bloğu render
  16-revalidation-api.md      # On-demand ISR revalidation endpoint (/api/revalidate)
  17-performance-audit.md     # Lighthouse audit, bundle check, optimizasyon
  18-deploy.md                # Vercel deployment + env variables + domain
```

### Faz 3: Uygulama

Promptlar üretildikten sonra, kullanıcı "başla" veya "01'den başla" dediğinde:

1. İlgili prompt dosyasını oku
2. İlgili rules/ dosyalarını oku
3. Görevi uygula
4. Kabul kriterlerini kontrol et
5. Tamamlandığında bir sonraki prompt'a geç

**Asla birden fazla prompt'u aynı anda uygulamaya çalışma. Birer birer ilerle.**

---

## Kurallar Sistemi

Her prompt `rules/` klasöründeki ilgili kurallara atıfta bulunur. Bu kurallar değişmez kısıtlamalardır:

```
rules/
  prd-scope.md         # PRD'den scope kısıtlamaları — MVP dışı özellik eklenmez
  tech-stack.md        # İzin verilen teknolojiler ve versiyonlar
  design-system.md     # Tasarım kuralları (tipografi, renk, spacing)
  file-naming.md       # Dosya isimlendirme ve klasör yapısı kuralları
  code-standards.md    # TypeScript, linting, import kuralları
  performance.md       # Performans bütçesi ve kısıtlamaları
  content-schema.md    # Notion DB şeması — içerik yapısı ve validasyon kuralları
```

**Kural ihlali tespiti:** Herhangi bir prompt uygulanırken rules/ dosyalarındaki bir kurala aykırı bir istek gelirse:
- Uyarı ver: "⚠️ Bu istek [kural-adı] kuralını ihlal ediyor: [açıklama]"
- Kullanıcıdan onay al
- Onay gelmezse kuralı uygula, isteği reddet

---

## Kritik Kısıtlamalar

1. **Notion = tek CMS.** MDX, Markdown, Contentlayer, gray-matter, next-mdx-remote kesinlikle kullanılmaz.
2. **content/ klasörü yok.** Dosya tabanlı içerik yönetimi mevcut değil.
3. **@notionhq/client + notion-to-md** Notion API erişimi ve block dönüşümü için.
4. **ISR + on-demand revalidation.** SSR değil, SSG + ISR tercih edilir.
5. **Server Components default.** `'use client'` sadece theme toggle ve filtreleme için.
6. **Scope genişletme yasak.** `rules/prd-scope.md`'deki MVP listesi dışına çıkılmaz.

---

## Önemli Notlar

- Bu prompt bir **meta-prompt**tur. Doğrudan kod üretmez, kod üreten promptlar üretir.
- Faz 1'deki tüm sorular cevaplanmadan Faz 2'ye geçilmez.
- Her üretilen prompt bağımsız, çalıştırılabilir ve test edilebilir olmalıdır.
- Promptlar arası bağımlılıklar açıkça belirtilmelidir.
- Scope creep tespit edildiğinde `rules/prd-scope.md`'ye referans verilerek engellenmelidir.
- Notion API key ve DB ID `.env.local` dosyasında tutulur, asla koda yazılmaz.
