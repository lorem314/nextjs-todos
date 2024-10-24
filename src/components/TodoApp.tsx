"use client"
import { useRef } from "react"
import { type Todo } from "@prisma/client"
import { useSession } from "next-auth/react"

import { trpc } from "@/trpc/client"
import TodoList from "./TodoList"

export default function TodoApp({ initialTodos }: { initialTodos: Todo[] }) {
  const session = useSession()
  const refInput = useRef<HTMLInputElement>(null)

  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toLocaleDateString("zh-CN"),
    })),
  })
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      if (refInput.current) {
        refInput.current.value = ""
      }
    },
  })
  const toggleTodo = trpc.toggleIsDone.useMutation({
    onSettled: () => {
      getTodos.refetch()
    },
  })

  const removeTodo = trpc.removeTodo.useMutation({
    onSettled: () => {
      getTodos.refetch()
    },
  })

  const handleSubmit = () => {
    if (refInput.current?.value) {
      const data = {
        text: refInput.current.value,
        authorAvatar: session.data?.user?.image || "",
        authorEmail: session.data?.user?.email || "",
        authorName: session.data?.user?.name || "",
      }
      addTodo.mutate(data)
    }
  }
  const toggleTodoById = (id: number, isDone: boolean) => {
    toggleTodo.mutate({ id, isDone })
  }
  const removeTodoById = (id: number) => {
    removeTodo.mutate({ id })
  }

  return (
    <div>
      <form className="flex items-center gap-2" action={handleSubmit}>
        <label
          htmlFor="todo-input"
          className="flex-grow block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <input
            ref={refInput}
            id="todo-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="text"
            placeholder="请输入待办事项..."
            autoComplete="off"
          />
        </label>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={addTodo.isLoading}
        >
          添加
        </button>
      </form>
      <section>
        <h3 className="text-md font-bold flex justify-between items-center">
          <span>
            待办事项 (
            {getTodos.isFetching ? "正在重新获取..." : getTodos.data.length})
          </span>
          {toggleTodo.isLoading ? (
            <span>
              正在{toggleTodo.variables?.isDone ? "取消勾选" : "勾选"}{" "}
              {toggleTodo.variables?.id}
            </span>
          ) : null}
          {removeTodo.isLoading ? (
            <span>正在删除 {removeTodo.variables?.id}</span>
          ) : null}
        </h3>
        <TodoList
          todos={getTodos.data.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          }))}
          removeTodoById={removeTodoById}
          toggleTodoById={toggleTodoById}
        />
      </section>
    </div>
  )
}
