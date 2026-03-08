'use client'

import { useState } from 'react'

interface PortfolioFilterSidebarProps {
  selectedTechStack: string[]
  selectedPlatforms: string[]
  onTechStackChange: (tech: string) => void
  onPlatformChange: (platform: string) => void
  techStack: string[]
  platforms: string[]
}

export default function PortfolioFilterSidebar({
  selectedTechStack,
  selectedPlatforms,
  onTechStackChange,
  onPlatformChange,
  techStack,
  platforms,
}: PortfolioFilterSidebarProps) {
  const [platformsOpen, setPlatformsOpen] = useState(true)
  const [techOpen, setTechOpen] = useState(true)

  const handleClearPlatforms = () => {
    selectedPlatforms.forEach((p) => onPlatformChange(p))
  }

  const handleClearTech = () => {
    selectedTechStack.forEach((t) => onTechStackChange(t))
  }

  return (
    <div className="flex flex-col gap-4">
      {platforms.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPlatformsOpen(!platformsOpen)}
              className="flex items-center gap-2 font-mono text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Platforms
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
                className={`transition-transform ${platformsOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {selectedPlatforms.length > 0 && (
              <button
                onClick={handleClearPlatforms}
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Reset
              </button>
            )}
          </div>
          {platformsOpen && (
            <div className="flex max-h-[200px] flex-col gap-1.5 overflow-y-auto">
              {platforms.map((p) => (
                <label key={p} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(p)}
                    onChange={() => onPlatformChange(p)}
                    className="rounded border-gray-300 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{p}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setTechOpen(!techOpen)}
            className="flex items-center gap-2 font-mono text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tech Stack
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
              className={`transition-transform ${techOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {selectedTechStack.length > 0 && (
            <button
              onClick={handleClearTech}
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Reset
            </button>
          )}
        </div>
        {techOpen && (
          <div className="flex max-h-[300px] flex-col gap-1.5 overflow-y-auto">
            {techStack.map((t) => (
              <label key={t} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedTechStack.includes(t)}
                  onChange={() => onTechStackChange(t)}
                  className="rounded border-gray-300 text-accent-500 focus:ring-accent-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{t}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
