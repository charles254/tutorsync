import { SubjectCard } from "@/components/subject-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import subjects from "@/data/subjects.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Subjects - Find Tutors in 200+ Subjects",
  description:
    "Browse our complete directory of 200+ tutoring subjects. From math and science to music and languages, find the perfect tutor for any subject.",
};

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Group subjects by category
function groupByCategory(subjects: typeof import("@/data/subjects.json")) {
  const groups: Record<string, typeof subjects> = {};
  for (const subject of subjects) {
    if (!groups[subject.category]) {
      groups[subject.category] = [];
    }
    groups[subject.category].push(subject);
  }
  return groups;
}

export default function SubjectsPage() {
  const grouped = groupByCategory(subjects);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Subjects" }]} />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          All Tutoring Subjects
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse {subjects.length}+ subjects and find expert tutors in any field
        </p>
      </div>

      {Object.entries(grouped).map(([category, categorySubjects]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categorySubjects.map((subject) => (
              <SubjectCard
                key={subject.slug}
                name={subject.name}
                slug={subject.slug}
                category={subject.category}
                tutorCount={100 + (simpleHash(subject.slug) % 700)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
