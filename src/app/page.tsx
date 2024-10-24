import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

import { serverClient } from "@/trpc/serverClient"
import AuthProvider from "@/components/AuthProvider"
import UserProfile from "@/components/UserProfile"

import TodoApp from "@/components/TodoApp"

export default async function Home() {
  const session = await getServerSession(options)
  const todos = await serverClient.getTodos()

  return (
    <div className="max-w-2xl mt-16 mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="">
        <h1 className="font-bold text-2xl uppercase">待办事项清单</h1>
      </div>
      <AuthProvider session={session}>
        <UserProfile />
        <TodoApp initialTodos={todos} />
      </AuthProvider>
    </div>
  )
}
