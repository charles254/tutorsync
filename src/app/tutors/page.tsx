import { prisma } from "@/lib/db";
import { TutorGrid } from "@/components/tutor-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Tutors",
  description:
    "Browse thousands of verified tutors across the USA. Filter by subject, city, price, and level. Find your perfect tutor today.",
};

export default async function TutorsPage() {
  let tutors: any[] = [];
  try {
    tutors = await prisma.tutor.findMany({
      take: 24,
      include: {
        user: true,
        subjects: { include: { subject: true } },
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB might not be seeded yet
  }

  const tutorCards = tutors.map((t) => ({
    name: t.user.name,
    headline: t.headline,
    hourlyRate: t.hourlyRate,
    city: t.city,
    state: t.state,
    rating:
      t.reviews.length > 0
        ? t.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          t.reviews.length
        : 0,
    reviewCount: t.reviews.length,
    subjects: t.subjects.map((s: any) => s.subject.name),
    firstLessonFree: t.firstLessonFree,
    slug: t.slug,
    verified: t.verified,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tutors" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse All Tutors</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find the perfect tutor from our network of verified educators across
          the USA.
        </p>
      </div>

      {tutorCards.length > 0 ? (
        <TutorGrid tutors={tutorCards} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No tutors found yet
          </h2>
          <p className="text-gray-500 mb-6">
            Run the seed script to populate sample data.
          </p>
          <code className="bg-gray-100 px-4 py-2 rounded text-sm">
            npx prisma db seed
          </code>
        </div>
      )}

      {/* Subject Links for SEO */}
      <section className="mt-16 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Browse by Subject
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "math", "physics", "chemistry", "english", "spanish", "french",
            "piano", "guitar", "sat-prep", "act-prep", "python", "calculus",
            "biology", "writing", "algebra", "statistics",
          ].map((s) => (
            <Link
              key={s}
              href={`/tutors/${s}`}
              className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
            >
              {s
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}{" "}
              Tutors
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
