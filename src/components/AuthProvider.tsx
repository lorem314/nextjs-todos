"use client"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { ReactNode } from "react"

export default function AuthProvider({
  children,
  session,
}: {
  children: ReactNode
  session?: Session | null
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
