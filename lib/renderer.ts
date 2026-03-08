// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NotionToMarkdown } = require('notion-to-md')
import { Client } from '@notionhq/client'
import { codeToHtml } from 'shiki'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

/** Notion page ID'den Markdown string üretir */
export async function getMarkdownFromPage(pageId: string): Promise<string> {
  const mdblocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdblocks)
  return mdString.parent
}

/** notion-to-md dil adını shiki'nin tanıdığı formata çevirir */
function normalizeLang(lang: string): string {
  const map: Record<string, string> = {
    'plain text': 'text',
    'plain_text': 'text',
    'c++': 'cpp',
    'c#': 'csharp',
    'objective-c': 'objc',
    'shell': 'bash',
    'sh': 'bash',
    'zsh': 'bash',
  }
  const lower = lang.toLowerCase().trim()
  return map[lower] || lower || 'text'
}

/** Code block'u shiki ile highlight eder */
async function highlightCode(code: string, lang: string): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: normalizeLang(lang),
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    })
    return html
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Markdown'ı HTML'e dönüştürür, code block'ları shiki ile highlight eder */
export async function markdownToHtml(markdown: string): Promise<string> {
  const codeBlockRegex = /```([^\n]*)\n([\s\S]*?)```/g
  const parts: (string | Promise<string>)[] = []
  let lastIndex = 0

  let match: RegExpExecArray | null
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const beforeCode = markdown.slice(lastIndex, match.index)
    parts.push(simpleMarkdownToHtml(beforeCode))
    const lang = match[1].trim() || 'text'
    const displayLang = normalizeLang(lang)
    parts.push(
      highlightCode(match[2].trimEnd(), lang).then(
        (html) =>
          `<div class="code-block"><div class="code-block-header"><span class="code-block-lang">${displayLang}</span><button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').textContent).then(()=>{this.textContent='Kopyalandı!';setTimeout(()=>this.textContent='Kopyala',2000)})">Kopyala</button></div>${html}</div>`
      )
    )
    lastIndex = match.index + match[0].length
  }

  parts.push(simpleMarkdownToHtml(markdown.slice(lastIndex)))

  const resolved = await Promise.all(parts)
  return resolved.join('')
}

/** Basit Markdown → HTML dönüşümü (code block'lar hariç) */
function simpleMarkdownToHtml(md: string): string {
  let html = md

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<figure><img src="$2" alt="$1" loading="lazy" /><figcaption>$1</figcaption></figure>'
  )

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr />')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(
    /(<li>.*<\/li>\n?)+/g,
    (match) => `<ul>${match}</ul>`
  )

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

  // Callout blocks (notion-to-md outputs these as blockquotes with emoji)
  html = html.replace(
    /<blockquote><p>([💡⚠️📌🔥ℹ️✅❌]) (.+?)<\/p><\/blockquote>/g,
    '<div class="callout"><span class="callout-icon">$1</span> $2</div>'
  )

  // Paragraphs — wrap standalone lines
  html = html.replace(
    /^(?!<[a-z]|$)(.+)$/gm,
    '<p>$1</p>'
  )

  // Toggle / details
  html = html.replace(
    /<p><details>(.+?)<\/details><\/p>/g,
    '<details><summary>$1</summary></details>'
  )

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}
