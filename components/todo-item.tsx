"use client"

import { useState, useRef, useEffect } from "react"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: string, updates: Partial<Pick<Todo, "title" | "completed">>) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  function handleSave() {
    const trimmed = editValue.trim()
    if (!trimmed) return
    onUpdate(todo.id, { title: trimmed })
    setIsEditing(false)
  }

  function handleCancel() {
    setEditValue(todo.title)
    setIsEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") handleCancel()
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-accent/40",
        todo.completed && "opacity-60"
      )}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={(checked) =>
          onUpdate(todo.id, { completed: checked === true })
        }
        aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
        className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 flex-1 bg-secondary border-border"
            aria-label="Edit task title"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleSave}
            disabled={!editValue.trim()}
            aria-label="Save changes"
          >
            <Check className="size-4 text-accent" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCancel}
            aria-label="Cancel editing"
          >
            <X className="size-4 text-muted-foreground" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              "flex-1 text-sm text-foreground",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </span>

          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit "${todo.title}"`}
            >
              <Pencil className="size-3.5 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete "${todo.title}"`}
            >
              <Trash2 className="size-3.5 text-destructive" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
