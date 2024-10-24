import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "../api/auth/[...nextauth]/options"

import LogoutButton from "@/components/LogoutButton"

export default async function () {
  const session = await getServerSession(options)

  if (!session) {
    redirect("/")
  }

  return (
    <div>
      <div>
        <h2>logout page</h2>
        <LogoutButton />
      </div>
    </div>
  )
}
