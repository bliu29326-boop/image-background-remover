import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { D1Adapter } from "@auth/d1-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  const env = process.env as any
  
  return {
    adapter: env.DB ? D1Adapter(env.DB) : undefined,
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.AUTH_SECRET,
  }
})
