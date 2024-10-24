import Image from "next/image"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

export default async function () {
  const session = await getServerSession(options)

  return (
    <div>
      {!session ? (
        <div>未登录</div>
      ) : (
        <div>
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              width={200}
              height={200}
              alt={`Profile Pic for ${session.user.name}`}
              priority={true}
            />
          ) : null}
        </div>
      )}
    </div>
  )
}
