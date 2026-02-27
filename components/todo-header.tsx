import { CheckCircle2 } from "lucide-react"

export function TodoHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="size-6 text-accent" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Taskflow
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">Stay organized</p>
      </div>
    </header>
  )
}
