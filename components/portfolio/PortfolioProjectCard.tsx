export interface PortfolioProject {
  slug: string
  title: string
  description: string
  date?: string
  url?: string
  repository?: string
  categories?: string[]
  techStack?: string[]
  platforms?: string[]
  opensource?: boolean
  youtube?: string
}

interface PortfolioProjectCardProps {
  project: PortfolioProject
  onClick?: () => void
}

export default function PortfolioProjectCard({ project, onClick }: PortfolioProjectCardProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'SOON'
    return new Date(dateStr).toLocaleDateString(undefined, { dateStyle: 'medium' })
  }

  return (
    <div
      className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-surface-raised p-5 card-hover"
      style={{ cursor: project.url ? 'pointer' : 'default' }}
      onClick={project.url ? onClick : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(project.date)}
        </span>
        {project.url ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-500"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-60"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        )}
      </div>
      <h3 className="font-mono text-lg font-semibold text-gray-900 dark:text-gray-100">
        {project.title}
      </h3>
      <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
        {project.description}
      </p>
      {project.techStack && project.techStack.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
