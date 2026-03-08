export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">
      {children}
    </span>
  )
}
