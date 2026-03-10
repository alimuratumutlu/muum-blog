'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import portfolioProjects from '@/constants/portfolio-projects.json'
import PortfolioProjectCard, { type PortfolioProject } from './PortfolioProjectCard'
import PortfolioFilterSidebar from './PortfolioFilterSidebar'

const ALL_CATEGORIES = 'All'
const projects = portfolioProjects as PortfolioProject[]

function getUniqueCategories() {
  const set = new Set<string>()
  projects.forEach((p) => (p.categories || []).forEach((c) => set.add(c)))
  return [ALL_CATEGORIES, ...Array.from(set).sort()]
}

function getUniqueTechStack() {
  const set = new Set<string>()
  projects.forEach((p) => (p.techStack || []).forEach((t) => set.add(t)))
  return Array.from(set).sort()
}

function getUniquePlatforms() {
  const set = new Set<string>()
  projects.forEach((p) => (p.platforms || []).forEach((pl) => set.add(pl)))
  return Array.from(set).sort()
}

const allCategories = getUniqueCategories()
const allTechStack = getUniqueTechStack()
const allPlatforms = getUniquePlatforms()

export default function PortfolioProjects() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [filterOpen])

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const searchLower = search.toLowerCase()
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(searchLower) ||
        (p.description || '').toLowerCase().includes(searchLower) ||
        (p.techStack || []).some((t) => t.toLowerCase().includes(searchLower)) ||
        (p.categories || []).some((c) => c.toLowerCase().includes(searchLower))

      const matchesCategory =
        category === ALL_CATEGORIES || (p.categories || []).includes(category)

      const matchesTech =
        selectedTechStack.length === 0 ||
        selectedTechStack.every((t) => (p.techStack || []).includes(t))

      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.every((pl) => (p.platforms || []).includes(pl))

      return matchesSearch && matchesCategory && matchesTech && matchesPlatform
    })
  }, [search, category, selectedTechStack, selectedPlatforms])

  const toggleTech = (tech: string) => {
    setSelectedTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    )
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform],
    )
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Soon'
    return new Date(dateStr).toLocaleDateString(undefined, { dateStyle: 'medium' })
  }

  const hasActiveFilters = selectedTechStack.length > 0 || selectedPlatforms.length > 0

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Portfolio</h2>

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1" style={{ minWidth: 200 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-raised py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 dark:text-gray-100"
            />
          </div>

          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                hasActiveFilters
                  ? 'border-accent-500 bg-accent-500 text-white'
                  : 'border-border bg-surface-raised text-gray-600 hover:border-border-hover dark:text-gray-400'
              }`}
              aria-label="Filters"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-xl border border-border bg-surface-raised p-4 shadow-lg">
                <PortfolioFilterSidebar
                  selectedTechStack={selectedTechStack}
                  selectedPlatforms={selectedPlatforms}
                  onTechStackChange={toggleTech}
                  onPlatformChange={togglePlatform}
                  techStack={allTechStack}
                  platforms={allPlatforms}
                />
              </div>
            )}
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                viewMode === 'grid'
                  ? 'border-accent-500 bg-accent-500 text-white'
                  : 'border-border bg-surface-raised text-gray-600 hover:border-border-hover dark:text-gray-400'
              }`}
              aria-label="Grid view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition-colors ${
                viewMode === 'table'
                  ? 'border-accent-500 bg-accent-500 text-white'
                  : 'border-border bg-surface-raised text-gray-600 hover:border-border-hover dark:text-gray-400'
              }`}
              aria-label="Table view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                category === c
                  ? 'border-accent-500 bg-accent-500 text-white'
                  : 'border-border text-gray-600 hover:border-accent-400 hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <PortfolioProjectCard
              key={project.slug}
              project={project}
              onClick={() => project.url && window.open(project.url, '_blank')}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-sunken">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Title</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Date</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                  Categories
                </th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Tech</th>
                <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProjects.map((project) => (
                <tr
                  key={project.slug}
                  className="transition-colors hover:bg-surface-sunken"
                  style={{ cursor: project.url ? 'pointer' : 'default' }}
                  onClick={() => project.url && window.open(project.url, '_blank')}
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </p>
                    <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                      {project.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(project.date)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {(project.categories || []).slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="line-clamp-2">
                      {(project.techStack || []).join(', ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {project.url ? (
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        Live
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Soon</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <p className="py-12 text-center text-gray-500 dark:text-gray-400">
          No projects found matching your criteria.
        </p>
      )}
    </div>
  )
}
