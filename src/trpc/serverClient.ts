import { httpBatchLink } from "@trpc/client"
import { createCallerFactory } from "@trpc/server"
import { appRouter } from "@/server"

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: process.env.VERCEL_URL
        ? `${process.env.VERCEL_URL}/api/trpc`
        : "http://localhost:3000/api/trpc",
    }),
  ],
})
