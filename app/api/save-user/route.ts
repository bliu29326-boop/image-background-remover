import { getCloudflareContext } from "@opennextjs/cloudflare"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }

    if (!body.email) {
      return Response.json({ ok: false, error: "email is required" }, { status: 400 })
    }

    const { env } = getCloudflareContext({ async: false }) as unknown as {
      env?: {
        DB?: {
          prepare: (query: string) => {
            bind: (...values: unknown[]) => { run: () => Promise<unknown> }
          }
        }
      }
    }

    if (!env?.DB) {
      return Response.json({ ok: false, error: "D1 binding DB is missing" }, { status: 500 })
    }

    const userId = body.id ?? crypto.randomUUID()
    const updatedAt = new Date().toISOString()

    await env.DB
      .prepare(
        `INSERT INTO users (id, name, email, image, updated_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(email) DO UPDATE SET
           name = excluded.name,
           image = excluded.image,
           updated_at = excluded.updated_at`
      )
      .bind(userId, body.name ?? null, body.email, body.image ?? null, updatedAt)
      .run()

    return Response.json({ ok: true, userId, email: body.email, updatedAt })
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
