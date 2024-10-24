import { router, publicProcedure } from "./trpc"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const todos = await prisma.todo.findMany()
    return todos
  }),
  addTodo: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async (req) => {
      const { text } = req.input
      await prisma.todo.create({ data: { text } })
      return true
    }),
  toggleIsDone: publicProcedure
    .input(z.object({ id: z.number(), isDone: z.boolean() }))
    .mutation(async (req) => {
      const { id, isDone } = req.input
      await prisma.todo.update({
        where: { id },
        data: { isDone: !isDone },
      })
      return true
    }),
  removeTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async (req) => {
      const { id } = req.input
      await prisma.todo.delete({ where: { id } })
      return true
    }),
})

export type AppRouter = typeof appRouter
