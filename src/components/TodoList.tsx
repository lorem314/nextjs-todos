"use client"
import { trpc } from "../trpc/client"
import { serverClient } from "@/trpc/serverClient"

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>
}) {
  const todos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos.map((todo) => {
      return {
        ...todo,
        createdAt: todo.createdAt.toLocaleDateString("zh-CN"),
      }
    }),
  })

  return (
    <div>
      {/* <div>{JSON.stringify(todos.data)}</div> */}
      <ul>
        {todos.data.map((todo) => {
          return (
            <li key={todo.id}>
              <label htmlFor={`todo-${todo.id}`}>
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  // checked={todo.isDone}
                />
                {todo.text}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
