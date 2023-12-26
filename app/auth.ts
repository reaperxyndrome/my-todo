import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    session:{
        strategy: 'jwt'
    },
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          if(!credentials?.password || !credentials?.email){
            return null
          }
  
          const user = await prisma.user.findUnique({
            where:{
              email: credentials.email
            }
          })
  
          if (!user){
            return null
          }
          
          const isPasswordValid = await compare(credentials.password, user.password)
  
          if(!isPasswordValid){
            return null
          }
  
          return {
            id: user.id + "",
            email: user.email,
            name: user.name,
          }
        }
      })
    ],
    callbacks: {
      session: async ({session, token}) => {
        // console.log("Session Callback", {session, token})
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          }
        }
      },
      jwt: async ({token, user}) => {
        // console.log("JWT Callback", {token, user})
        if (user) {
          const u = user as unknown as User
          return {
            ...token,
            id: u.id,
          }
        }
        return token
      }
    },
  }
  