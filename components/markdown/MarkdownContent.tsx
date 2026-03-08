'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="mb-4 mt-8 font-mono text-3xl font-bold text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mb-3 mt-6 font-mono text-2xl font-bold text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-2 mt-4 font-mono text-xl font-bold text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-4 list-disc pl-6">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-4 list-decimal pl-6">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-1 text-gray-700 dark:text-gray-300">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-4 border-l-4 border-accent-400 pl-4 text-gray-500 dark:text-gray-400">
      {children}
    </blockquote>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="my-4 overflow-auto rounded-xl border border-border bg-surface-sunken p-4 text-sm">
      {children}
    </pre>
  ),
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="rounded bg-surface-sunken px-1.5 py-0.5 text-sm font-medium">
          {children}
        </code>
      )
    }
    return <code className={className}>{children}</code>
  },
}

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]} components={components}>
      {content}
    </ReactMarkdown>
  )
}
