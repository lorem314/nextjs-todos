import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "../api/auth/[...nextauth]/options"

import LoginButton from "@/components/LoginButton"

export default async function () {
  const session = await getServerSession(options)

  console.log("login page", session)
  if (session) {
    redirect("/profile")
  } else {
    return (
      <div>
        <div>
          <h2>login page</h2>
          <LoginButton />
        </div>
      </div>
    )
  }
}
