import { NextResponse } from "next/server";
import subjects from "@/data/subjects.json";

export async function GET() {
  // Group subjects by category
  const grouped: Record<string, typeof subjects> = {};
  for (const subject of subjects) {
    if (!grouped[subject.category]) {
      grouped[subject.category] = [];
    }
    grouped[subject.category].push(subject);
  }

  return NextResponse.json({ subjects, grouped });
}
