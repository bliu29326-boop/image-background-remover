import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getCloudflareContext } from "@opennextjs/cloudflare"

type PreparedStatement = {
  bind: (...values: unknown[]) => {
    run: () => Promise<unknown>
  }
}

type CloudflareEnv = {
  DB?: {
    prepare: (query: string) => PreparedStatement
  }
}

function getDb() {
  try {
    const context = getCloudflareContext({ async: false }) as unknown as { env?: CloudflareEnv }
    return context.env?.DB
  } catch {
    return undefined
  }
}

export const runtime = "edge"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      const db = getDb()

      if (!db) {
        throw new Error("D1 binding DB is missing at runtime")
      }

      if (!user.email) {
        return false
      }

      const userId = user.id ?? crypto.randomUUID()

      await db
        .prepare(
          `INSERT INTO users (id, name, email, image)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(email) DO UPDATE SET
             name = excluded.name,
             image = excluded.image`
        )
        .bind(userId, user.name ?? null, user.email, user.image ?? null)
        .run()

      user.id = userId
      return true
    },
  },
})
