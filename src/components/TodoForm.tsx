"use client"
import { useRef } from "react"
import { useSession } from "next-auth/react"

export default function TodoForm() {
  const session = useSession()
  const refInput = useRef<HTMLInputElement>(null)

  const submit = async () => {
    const value = refInput.current?.value
    if (!value) {
      return
    } else {
      console.log("submit", {
        text: value,
        authorEmail: session.data?.user?.email || "",
        authorName: session.data?.user?.name || "",
        authorAvatar: session.data?.user?.image || "",
      })
      refInput.current.value = ""
    }
  }

  return (
    <div className="mb-6">
      <form className="flex items-center gap-2" action={submit}>
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
        >
          添加
        </button>
      </form>
    </div>
  )
}
