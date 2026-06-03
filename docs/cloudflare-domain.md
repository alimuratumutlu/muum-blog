# Cloudflare Domain Plan

## Goal

Deploy Muum Blog to Cloudflare Workers and attach:

- `blog.umutlu.net`

## Deployment Target

This app uses Next.js App Router, Notion-backed content, ISR/revalidation, RSS, sitemap, and an API revalidation route. It should be deployed as a Cloudflare Worker through OpenNext, not as a plain static export.

## Required GitHub Secrets

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
NOTION_API_KEY
NOTION_DATABASE_ID
NOTION_DB_BLOG
NOTION_DB_GELISIM
NOTION_DB_HABERLER
REVALIDATION_SECRET
```

`NEXT_PUBLIC_SITE_URL` is set by the workflow to `https://blog.umutlu.net`.

## DNS

`blog.umutlu.net` currently has no A, AAAA, or CNAME record. Wrangler can attach it as a Worker custom domain when the token has zone permissions for `umutlu.net`.

