import { auth } from "@/auth";
import HomeClient from "./components/HomeClient";

export const runtime = "edge";

export default async function Home() {
  const session = await auth();
  return <HomeClient userEmail={session?.user?.email ?? null} />;
}
