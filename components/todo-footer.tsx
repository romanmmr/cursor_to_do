export function TodoFooter({ totalTasks, completedTasks }: { totalTasks: number; completedTasks: number }) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <p className="text-sm text-muted-foreground">
          {completedTasks} of {totalTasks} tasks completed
        </p>
        <p className="text-xs text-muted-foreground/60">
          Taskflow
        </p>
      </div>
    </footer>
  )
}
