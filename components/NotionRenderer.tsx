import { getMarkdownFromPage, markdownToHtml } from '@/lib/renderer'

interface NotionRendererProps {
  pageId: string
}

export default async function NotionRenderer({ pageId }: NotionRendererProps) {
  const markdown = await getMarkdownFromPage(pageId)
  const html = await markdownToHtml(markdown)

  return (
    <article
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
