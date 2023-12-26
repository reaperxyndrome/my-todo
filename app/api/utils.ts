import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { User } from "@prisma/client"

export async function getUserId() {
    const session = await getServerSession(authOptions)
    const user = session?.user as User
    return user.id
  }