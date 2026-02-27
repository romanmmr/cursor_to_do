"use client"

import { useState, useCallback } from "react"
import type { Todo } from "@/components/todo-item"
import { TodoHeader } from "@/components/todo-header"
import { TodoFooter } from "@/components/todo-footer"
import { TodoAddForm } from "@/components/todo-add-form"
import { TodoList } from "@/components/todo-list"

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Design new landing page", completed: false },
    { id: "2", title: "Review pull requests", completed: true },
    { id: "3", title: "Write API documentation", completed: false },
  ])

  const handleAdd = useCallback((title: string) => {
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, completed: false },
    ])
  }, [])

  const handleUpdate = useCallback(
    (id: string, updates: Partial<Pick<Todo, "title" | "completed">>) => {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      )
    },
    []
  )

  const handleDelete = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TodoHeader />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
              Your Tasks
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your daily tasks and stay productive.
            </p>
          </div>

          <TodoAddForm onAdd={handleAdd} />

          <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </main>

      <TodoFooter totalTasks={todos.length} completedTasks={completedCount} />
    </div>
  )
}
