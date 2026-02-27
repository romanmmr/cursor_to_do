"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TodoAddFormProps {
  onAdd: (title: string) => void
}

export function TodoAddForm({ onAdd }: TodoAddFormProps) {
  const [title, setTitle] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-secondary border-border placeholder:text-muted-foreground/50"
        aria-label="New task title"
      />
      <Button type="submit" size="default" disabled={!title.trim()}>
        <Plus className="size-4" />
        <span className="sr-only sm:not-sr-only">Add</span>
      </Button>
    </form>
  )
}
