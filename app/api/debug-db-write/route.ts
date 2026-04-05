import { getCloudflareContext } from "@opennextjs/cloudflare"

type CloudflareEnv = {
  DB?: {
    prepare: (query: string) => {
      bind: (...values: unknown[]) => {
        run: () => Promise<unknown>
      }
      all: <T>() => Promise<{ results?: T[] }>
    }
  }
}

export async function POST() {
  try {
    const { env } = getCloudflareContext({ async: false }) as unknown as {
      env?: CloudflareEnv
    }

    if (!env?.DB) {
      return Response.json(
        { ok: false, error: "D1 binding DB is missing at runtime" },
        { status: 500 }
      )
    }

    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS debug_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`
    ).bind().run()

    const message = `hello-from-runtime-${Date.now()}`

    await env.DB.prepare(
      "INSERT INTO debug_logs (message, created_at) VALUES (?, ?)"
    )
      .bind(message, new Date().toISOString())
      .run()

    const rows = await env.DB
      .prepare("SELECT id, message, created_at FROM debug_logs ORDER BY id DESC LIMIT 5")
      .all<{ id: number; message: string; created_at: string }>()

    return Response.json({
      ok: true,
      insertedMessage: message,
      latest: rows.results ?? [],
    })
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
