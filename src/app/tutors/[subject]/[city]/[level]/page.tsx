import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TutorGrid } from "@/components/tutor-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSection } from "@/components/faq-section";
import { JsonLd } from "@/lib/safe-jsonld";
import { SEOContent } from "@/components/seo-content";
import { getPageTitle, getIntroText, getFAQs, getMetaDescription, getRelatedSubjects, getNearbyCities } from "@/lib/pseo-templates";
import Link from "next/link";
import type { Metadata } from "next";
import subjects from "@/data/subjects.json";
import citiesData from "@/data/cities.json";

const levelMap: Record<string, string> = {
  elementary: "ELEMENTARY",
  "middle-school": "MIDDLE_SCHOOL",
  "high-school": "HIGH_SCHOOL",
  college: "COLLEGE",
  adult: "ADULT",
};

const levelLabels: Record<string, string> = {
  elementary: "Elementary",
  "middle-school": "Middle School",
  "high-school": "High School",
  college: "College",
  adult: "Adult",
};

export const revalidate = 86400; // Revalidate every 24 hours

type Props = { params: Promise<{ subject: string; city: string; level: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, city, level } = await params;
  const subjectData = subjects.find((s) => s.slug === subject);
  const cityData = citiesData.find((c) => c.slug === city);
  if (!subjectData || !cityData || !levelMap[level]) return { title: "Not Found" };
  const subjectName = subjectData.name;
  const cityName = cityData.name;
  const stateName = cityData.state || "";
  const levelLabel = levelLabels[level];

  let tutorCount = 0;
  try {
    tutorCount = await prisma.tutor.count({
      where: {
        subjects: { some: { subject: { slug: subject } } },
        city: cityName,
        levels: { some: { level: levelMap[level] } },
      },
    });
  } catch {
    // DB might not be seeded
  }

  return {
    title: `${levelLabel} ${subjectName} Tutors in ${cityName} | TutorUSA`,
    description: `${levelLabel} ${subjectName} tutoring in ${cityName}, ${stateName}. Find verified ${levelLabel.toLowerCase()} level ${subjectName.toLowerCase()} tutors near you. Affordable rates, free first lessons available.`,
    alternates: {
      canonical: `https://tutorusa.com/tutors/${subject}/${city}/${level}`,
    },
    robots: tutorCount < 3 ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${levelLabel} ${subjectName} Tutors in ${cityName} | TutorUSA`,
      description: `Find ${levelLabel.toLowerCase()} level ${subjectName.toLowerCase()} tutors in ${cityName}, ${stateName}.`,
    },
  };
}

export async function generateStaticParams() {
  // Only pre-render top combos
  const topSubjects = subjects.slice(0, 5);
  const topCities = citiesData.slice(0, 5);
  const levels = Object.keys(levelMap);
  const params: { subject: string; city: string; level: string }[] = [];
  for (const s of topSubjects) {
    for (const c of topCities) {
      for (const l of levels) {
        params.push({ subject: s.slug, city: c.slug, level: l });
      }
    }
  }
  return params;
}

export default async function SubjectCityLevelPage({ params }: Props) {
  const { subject, city, level } = await params;
  const subjectData = subjects.find((s) => s.slug === subject);
  const cityData = citiesData.find((c) => c.slug === city);
  if (!subjectData || !cityData || !levelMap[level]) notFound();

  const subjectName = subjectData.name;
  const cityName = cityData.name;
  const stateName = cityData.state || "";
  const stateCode = cityData.stateCode || "";
  const levelLabel = levelLabels[level];
  const levelEnum = levelMap[level];

  let tutors: any[] = [];
  try {
    tutors = await prisma.tutor.findMany({
      where: {
        subjects: { some: { subject: { slug: subject } } },
        city: cityName,
        levels: { some: { level: levelEnum } },
      },
      take: 24,
      include: {
        user: true,
        subjects: { include: { subject: true } },
        reviews: true,
      },
    });
  } catch {
    // DB might not be seeded
  }

  const tutorCards = tutors.map((t) => ({
    name: t.user.name,
    headline: t.headline,
    hourlyRate: t.hourlyRate,
    city: t.city,
    state: t.state,
    rating: t.reviews.length > 0
      ? t.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / t.reviews.length
      : 0,
    reviewCount: t.reviews.length,
    subjects: t.subjects.map((s: any) => s.subject.name),
    firstLessonFree: t.firstLessonFree,
    slug: t.slug,
    verified: t.verified,
  }));

  const avgPrice = tutorCards.length > 0
    ? Math.round(tutorCards.reduce((s, t) => s + t.hourlyRate, 0) / tutorCards.length)
    : 35;

  const pageVars = { subject: subjectName, city: cityName, state: stateName, stateCode, tutorCount: tutorCards.length, avgPrice };
  const title = `${levelLabel} ${getPageTitle(pageVars)}`;
  const introText = getIntroText(pageVars).join("\n\n");
  const faqs = getFAQs(pageVars);

  const relatedSlugs = getRelatedSubjects(subject);
  const related = relatedSlugs.map((slug) => {
    const s = subjects.find((sub) => sub.slug === slug);
    return { name: s?.name || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), slug };
  });

  const nearbyCities = getNearbyCities(city, citiesData);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tutors", href: "/tutors" },
          { label: subjectName, href: `/tutors/${subject}` },
          { label: `${cityName}, ${stateCode}`, href: `/tutors/${subject}/${city}` },
          { label: levelLabel },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">{introText}</p>
      </div>

      {/* Other Levels */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Other Levels</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(levelLabels)
            .filter(([slug]) => slug !== level)
            .map(([slug, label]) => (
              <Link
                key={slug}
                href={`/tutors/${subject}/${city}/${slug}`}
                className="text-sm px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors"
              >
                {label}
              </Link>
            ))}
        </div>
      </div>

      <TutorGrid
        tutors={tutorCards}
        emptyMessage={`No ${levelLabel.toLowerCase()} level ${subjectName.toLowerCase()} tutors found in ${cityName} yet. Try removing the level filter.`}
      />

      <SEOContent
        title={`${levelLabel} ${subjectName} Tutoring in ${cityName}`}
        content={`Looking for ${levelLabel.toLowerCase()} level ${subjectName.toLowerCase()} help in ${cityName}? Our verified ${subjectName.toLowerCase()} tutors in ${cityName}, ${stateName} specialize in ${levelLabel.toLowerCase()} instruction, offering personalized one-on-one lessons tailored to your learning style and goals.`}
        relatedSubjects={related}
        nearbyCities={nearbyCities.map((c: { name: string; slug: string }) => ({
          name: c.name,
          slug: `${subject}/${c.slug}`,
        }))}
      />

      <FAQSection faqs={faqs} />

      {/* JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://tutorusa.com/" },
          { "@type": "ListItem", position: 2, name: "Tutors", item: "https://tutorusa.com/tutors" },
          { "@type": "ListItem", position: 3, name: `${subjectName} Tutors`, item: `https://tutorusa.com/tutors/${subject}` },
          { "@type": "ListItem", position: 4, name: cityName, item: `https://tutorusa.com/tutors/${subject}/${city}` },
          { "@type": "ListItem", position: 5, name: levelLabel, item: `https://tutorusa.com/tutors/${subject}/${city}/${level}` },
        ],
      }} />
    </div>
  );
}
