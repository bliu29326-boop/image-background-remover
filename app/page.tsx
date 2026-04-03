import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import HomeClient from "./components/HomeClient";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <HomeClient userEmail={session?.user?.email ?? null} />;
}
