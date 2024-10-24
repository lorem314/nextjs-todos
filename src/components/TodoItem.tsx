import Image from "next/image"
import type { Todo } from "@prisma/client"

export default function TodoItem({
  todo,
  removeTodoById,
  toggleTodoById,
}: {
  todo: Todo
  removeTodoById: (id: number) => void
  toggleTodoById: (id: number, isDone: boolean) => void
}) {
  const id = `todo-${todo.id}`
  return (
    <div className="my-2 flex items-center gap-2">
      <label className="flex-grow flex items-center gap-2" htmlFor={id}>
        <input
          className="w-6 h-6"
          type="checkbox"
          id={id}
          checked={todo.isDone}
          onChange={() => {
            toggleTodoById(todo.id, todo.isDone)
          }}
        />
        <span className="flex-grow text-lg font-bold">{todo.text}</span>
      </label>

      <div className="flex items-center gap-2">
        {todo.authorAvatar ? (
          <Image
            className="rounded-full border border-gray-200"
            src={todo.authorAvatar}
            width={32}
            height={32}
            alt={`${todo.authorName} 的 Git 头像`}
            priority={true}
          />
        ) : null}
        {todo.authorName ? <div>{todo.authorName}</div> : null}
      </div>

      <div>
        {todo.createdAt.toLocaleDateString("zh-CH")}{" "}
        {todo.createdAt.toLocaleTimeString("zh-CH")}
      </div>

      <button
        className="px-1.5 py-0.5 rounded text-sm text-red-600 border border-red-400 hover:bg-red-100"
        onClick={() => {
          removeTodoById(todo.id)
        }}
      >
        删除
      </button>
    </div>
  )
}
