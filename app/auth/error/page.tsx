type ErrorPageProps = {
  searchParams?: {
    error?: string
  }
}

export default function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const error = searchParams?.error ?? "Unknown"

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h1 className="text-2xl font-bold text-red-700">Authentication Error</h1>
        <p className="mt-3 text-slate-700">
          Sign-in failed. Error code: <span className="font-mono font-semibold">{error}</span>
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Go back to the homepage and try again after we inspect this error.
        </p>
        <a href="/" className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-white">
          Back to home
        </a>
      </div>
    </main>
  )
}
