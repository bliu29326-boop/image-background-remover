import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { D1Adapter } from "@auth/d1-adapter"
import { getCloudflareContext } from "@opennextjs/cloudflare"

type CloudflareEnv = {
  DB?: Parameters<typeof D1Adapter>[0]
}

export const runtime = "edge"

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  let env: CloudflareEnv | undefined

  try {
    const context = getCloudflareContext({ async: false }) as unknown as { env?: CloudflareEnv }
    env = context.env
  } catch {
    env = undefined
  }

  const isCloudflareRuntime = typeof env !== "undefined"

  if (isCloudflareRuntime && !env?.DB) {
    throw new Error("D1 binding DB is missing at runtime")
  }

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
