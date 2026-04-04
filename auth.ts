import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { D1Adapter } from "@auth/d1-adapter"
import { getCloudflareContext } from "@opennextjs/cloudflare"

export const runtime = "edge"

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const { env } = getCloudflareContext({ async: false }) as unknown as { env: { DB?: any } }

  return {
    adapter: env?.DB ? D1Adapter(env.DB) : undefined,
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    trustHost: true,
  }
})
