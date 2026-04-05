import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { D1Adapter } from "@auth/d1-adapter"
import { getCloudflareContext } from "@opennextjs/cloudflare"

type CloudflareEnv = {
  DB?: Parameters<typeof D1Adapter>[0]
}

export const runtime = "edge"

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  let db: CloudflareEnv["DB"] | undefined

  try {
    const { env } = getCloudflareContext({ async: false }) as unknown as { env: CloudflareEnv }
    db = env?.DB
  } catch {
    db = undefined
  }

  return {
    adapter: db ? D1Adapter(db) : undefined,
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
