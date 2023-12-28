import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/app/auth";

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}