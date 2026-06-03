# Muum Blog

Next.js and Notion-powered AI solutions blog for `blog.umutlu.net`.

## Development

```bash
npm install
npm run dev
```

## Cloudflare Deployment

The project is prepared for Cloudflare Workers through the OpenNext adapter.

```bash
npm run build:cloudflare
npm run preview:cloudflare
npm run deploy:cloudflare
```

Required deployment secrets are listed in [docs/cloudflare-domain.md](docs/cloudflare-domain.md).
