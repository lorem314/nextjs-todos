"use client"
import Image from "next/image"

import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import { useSession } from "next-auth/react"

export default function UserProfile() {
  const session = useSession()

  return (
    <div className="my-4">
      {session.data ? (
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full border border-gray-200"
            src={session.data?.user?.image || ""}
            width={64}
            height={64}
            alt={`Profile Pic for ${session.data?.user?.name}`}
            priority={true}
          />
          <div className="flex-grow">
            <p className="text-lg font-bold">{session.data.user?.name}</p>
            <p className="text-neutral-600">{session.data.user?.email}</p>
          </div>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <LoginButton />
          <div className="text-sm">
            <p>可通过 Github 账户登录</p>
          </div>
        </div>
      )}
    </div>
  )
}
