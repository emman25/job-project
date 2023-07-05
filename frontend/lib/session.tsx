import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function getSession() {
    return await await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession()
    console.log("session >>>")
    console.log(session?.user)

  return session?.user
}
