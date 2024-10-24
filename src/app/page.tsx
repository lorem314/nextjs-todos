// import { sql } from "@vercel/postgres"
import { PrismaClient } from "@prisma/client"

import { getServerSession } from "next-auth/next"
import { SessionProvider } from "next-auth/react"
import { options } from "@/app/api/auth/[...nextauth]/options"

import AuthProvider from "@/components/AuthProvider"
import UserProfile from "@/components/UserProfile"
import TodoForm from "@/components/TodoForm"
import TodoList from "@/components/TodoList"

const prisma = new PrismaClient()

export default async function Home() {
  // const data = await sql`
  //   SELECT * FROM Pets;
  // `
  // console.log("data", data.rows)

  // const todos = await prisma.todo.findMany({})

  // const newTodo = await prisma.todo.create({
  //   data: {
  //     text: "todo text 001",
  //     authorEmail: "authorEmail-001",
  //     authorName: "authorName-001",
  //     authorAvatar: "authorAvatar-001",
  //   },
  // })
  // console.log("newTodo", newTodo)
  const session = await getServerSession(options)

  return (
    <div className="max-w-xl mt-16 mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="py-2">
        <h1 className="font-bold text-2xl uppercase">待办事项清单</h1>
      </div>
      <AuthProvider session={session}>
        <UserProfile />
        <TodoForm />
        <TodoList todos={[]} />
      </AuthProvider>
    </div>
  )
}
