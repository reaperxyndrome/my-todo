import NextAuth, {type NextAuthOptions} from "next-auth";
import { authOptions } from "@/app/auth";

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}