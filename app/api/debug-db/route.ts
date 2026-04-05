import { getCloudflareContext } from "@opennextjs/cloudflare"

type CloudflareEnv = {
  DB?: {
    prepare: (query: string) => {
      first: <T>() => Promise<T | null>
      all: <T>() => Promise<{ results?: T[] }>
    }
  }
}

export async function GET() {
  try {
    const { env } = getCloudflareContext({ async: false }) as unknown as {
      env?: CloudflareEnv
    }

    const hasDb = Boolean(env?.DB)
    let usersCount: number | null = null
    let tables: string[] = []
    let dbError: string | null = null

    if (env?.DB) {
      try {
        const countRes = await env.DB.prepare("SELECT COUNT(*) as count FROM users").first<{ count: number }>()
        usersCount = countRes?.count ?? 0

        const tablesRes = await env.DB
          .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
          .all<{ name: string }>()
        tables = (tablesRes.results ?? []).map((row) => row.name)
      } catch (error) {
        dbError = error instanceof Error ? error.message : String(error)
      }
    }

    return Response.json({
      ok: true,
      hasDb,
      usersCount,
      tables,
      dbError,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
