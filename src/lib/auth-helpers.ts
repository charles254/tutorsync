import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function getRequiredSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await getRequiredSession();
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}
