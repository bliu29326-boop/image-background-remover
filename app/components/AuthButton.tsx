"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-32 animate-pulse rounded-md bg-slate-200" />
    );
  }

  if (session) {
    return (
      <div className="text-right text-sm text-slate-700">
        <div className="font-medium">{session.user?.email}</div>
        <button
          onClick={() => signOut()}
          className="mt-1 text-blue-600 hover:underline"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
    >
      Sign in with Google
    </button>
  );
}
