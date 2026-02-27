"use client"

import { ClipboardList } from "lucide-react"
import { TodoItem, type Todo } from "@/components/todo-item"

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: string, updates: Partial<Pick<Todo, "title" | "completed">>) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
        <ClipboardList className="size-10 text-muted-foreground/40" />
        <p className="text-sm">No tasks yet. Add one above to get started.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
