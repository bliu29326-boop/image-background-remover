type SearchParams = Record<string, string | string[] | undefined>;

function getErrorMessage(error: string | undefined) {
  switch (error) {
    case "Configuration":
      return "登录配置有问题，通常是 NEXTAUTH_URL、AUTH_SECRET 或 Google OAuth 配置不一致。";
    case "AccessDenied":
      return "访问被拒绝，可能是 Google 账号未通过授权。";
    case "Verification":
      return "登录校验失败，请重试一次。";
    default:
      return error ? `登录失败：${error}` : "登录失败，请重试。";
  }
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const raw = searchParams?.error;
  const error = Array.isArray(raw) ? raw[0] : raw;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Google 登录失败</h1>
        <p className="mt-3 text-slate-600">{getErrorMessage(error)}</p>
        {error && (
          <p className="mt-2 text-sm text-slate-500">
            error code: <code>{error}</code>
          </p>
        )}
        <a
          href="/"
          className="mt-6 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          返回首页
        </a>
      </div>
    </main>
  );
}
