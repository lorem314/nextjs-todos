"use client"
import type { Todo } from "@prisma/client"

import TodoItem from "./TodoItem"

export default function TodoList({
  todos,
  removeTodoById,
  toggleTodoById,
}: {
  todos: Todo[]
  removeTodoById: (id: number) => void
  toggleTodoById: (id: number, isDone: boolean) => void
}) {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              removeTodoById={removeTodoById}
              toggleTodoById={toggleTodoById}
            />
          </li>
        )
      })}
    </ul>
  )
}
