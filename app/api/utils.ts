import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { User } from "@prisma/client"

export async function getUser() {
  try {
    const session = await getServerSession(authOptions)
    const user = session?.user as User
    console.log(user)
    return { userId: user.id, username: user.username }
  } catch (error) {
    console.error(error)
    throw error
  }
}
