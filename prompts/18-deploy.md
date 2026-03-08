# Prompt 18: Railway Deployment

## Bağımlılıklar
- Tüm önceki promptlar (01-17) tamamlanmış olmalı
- `npm run build` hatasız çalışıyor olmalı

## Kural Referansları
- rules/performance.md — deploy öncesi kontrol listesi

## Not

PRD'de deploy platformu Vercel olarak belirtilmiş ancak kullanıcı Railway tercih etti. Bu prompt Railway'e göre hazırlanmıştır.

## Görev

### 1. Railway Hazırlığı

**package.json scripts kontrolü:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p ${PORT:-3000}"
  }
}
```

**Not:** Railway `PORT` environment variable'ı inject eder. `next start` bunu kullanmalı.

### 2. GitHub Repo Oluşturma

```bash
git init
git add .
git commit -m "Initial commit: AI Solutions Blog - Next.js + Notion CMS"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/blog-umutlu-net.git
git push -u origin main
```

**Repo: Private**

### 3. Railway'de Proje Oluşturma

1. [railway.app](https://railway.app) → "New Project"
2. "Deploy from GitHub repo" seç
3. `blog-umutlu-net` repo'sunu seç
4. Railway otomatik olarak Next.js projesini algılayacak

### 4. Environment Variables (Railway Dashboard)

Railway dashboard'da aşağıdaki env variable'ları ekle:

```
NOTION_API_KEY=secret_xxx          # Gerçek Notion token
NOTION_DATABASE_ID=8e889c4d-03ef-49b1-8b8c-deb7ddc4eb86
REVALIDATION_SECRET=xxx            # Güçlü random string
NEXT_PUBLIC_SITE_URL=https://blog.umutlu.net
```

### 5. Custom Domain

Railway dashboard → Settings → Domains:
1. "Add Custom Domain" → `blog.umutlu.net`
2. Railway CNAME kaydını gösterecek
3. DNS provider'da CNAME kaydı ekle:
   ```
   blog.umutlu.net → CNAME → [railway-provided-domain].railway.app
   ```
4. SSL sertifikası otomatik (Let's Encrypt)

### 6. Deploy Sonrası Kontrol

```bash
# Siteye erişim
curl -I https://blog.umutlu.net

# RSS feed
curl https://blog.umutlu.net/rss.xml

# Sitemap
curl https://blog.umutlu.net/sitemap.xml

# Revalidation endpoint
curl -X POST https://blog.umutlu.net/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret"}'
```

### 7. Son Kontrol Listesi

- [ ] Site https://blog.umutlu.net adresinde erişilebilir
- [ ] SSL sertifikası aktif (HTTPS)
- [ ] Ana sayfa Notion'dan postları çekiyor
- [ ] /blog sayfası çalışıyor
- [ ] /blog/[slug] makale detay çalışıyor
- [ ] /about sayfası çalışıyor
- [ ] /rss.xml valid XML döndürüyor
- [ ] /sitemap.xml erişilebilir
- [ ] Dark/Light mode çalışıyor
- [ ] Mobile responsive
- [ ] /api/revalidate endpoint'i çalışıyor
- [ ] Lighthouse Performance > 95
- [ ] Console'da hata yok

## Dosya Çıktıları
- package.json (scripts güncelleme — PORT)
- Deployment gerçekleştirilmiş
