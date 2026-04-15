import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TutorGrid } from "@/components/tutor-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSection } from "@/components/faq-section";
import { SEOContent } from "@/components/seo-content";
import { JsonLd } from "@/lib/safe-jsonld";
import { getPageTitle, getIntroText, getFAQs, getRelatedSubjects, getMetaDescription, getNearbyCities } from "@/lib/pseo-templates";
import Link from "next/link";
import type { Metadata } from "next";
import subjects from "@/data/subjects.json";
import citiesData from "@/data/cities.json";

export const revalidate = 86400; // Revalidate every 24 hours

type Props = { params: Promise<{ subject: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, city } = await params;
  const subjectData = subjects.find((s) => s.slug === subject);
  const cityData = citiesData.find((c) => c.slug === city);
  if (!subjectData || !cityData) return { title: "Not Found" };
  const subjectName = subjectData.name;
  const cityName = cityData.name;
  const stateName = cityData.state || "";

  let tutorCount = 0;
  try {
    tutorCount = await prisma.tutor.count({
      where: {
        subjects: { some: { subject: { slug: subject } } },
        city: cityName,
      },
    });
  } catch {
    // DB might not be seeded
  }

  return {
    title: `${subjectName} Tutors in ${cityName}, ${cityData?.stateCode || ""} - Best ${subjectName} Tutoring`,
    description: getMetaDescription({ subject: subjectName, city: cityName, state: stateName, tutorCount: tutorCount || 50, avgPrice: 35 }),
    alternates: {
      canonical: `https://tutorsync.net/tutors/${subject}/${city}`,
    },
    openGraph: {
      title: `${subjectName} Tutors in ${cityName}`,
      description: `Find the best ${subjectName} tutors in ${cityName}, ${stateName}. Verified reviews, affordable rates.`,
      url: `https://tutorsync.net/tutors/${subject}/${city}`,
    },
  };
}

export async function generateStaticParams() {
  // Generate top 10 subjects × top 20 cities for static build
  const topSubjects = subjects.slice(0, 10);
  const topCities = citiesData.slice(0, 20);
  const params: { subject: string; city: string }[] = [];
  for (const s of topSubjects) {
    for (const c of topCities) {
      params.push({ subject: s.slug, city: c.slug });
    }
  }
  return params;
}

export default async function SubjectCityPage({ params }: Props) {
  const { subject, city } = await params;
  const subjectData = subjects.find((s) => s.slug === subject);
  const cityData = citiesData.find((c) => c.slug === city);
  if (!subjectData || !cityData) notFound();

  const subjectName = subjectData.name;
  const cityName = cityData.name;
  const stateName = cityData.state || "";
  const stateCode = cityData.stateCode || "";

  let tutors: any[] = [];
  try {
    tutors = await prisma.tutor.findMany({
      where: {
        subjects: { some: { subject: { slug: subject } } },
        city: cityName,
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
  const title = getPageTitle(pageVars);
  const introText = getIntroText(pageVars).join("\n\n");
  const faqs = getFAQs(pageVars);
  const relatedSlugs = getRelatedSubjects(subject);
  const related = relatedSlugs.map((slug) => {
    const s = subjects.find((sub) => sub.slug === slug);
    return { name: s?.name || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), slug };
  });

  // Find nearby cities by geographic distance
  const nearbyCities = getNearbyCities(city, citiesData);

  // Level links
  const levels = [
    { label: "Elementary", slug: "elementary" },
    { label: "Middle School", slug: "middle-school" },
    { label: "High School", slug: "high-school" },
    { label: "College", slug: "college" },
    { label: "Adult", slug: "adult" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tutors", href: "/tutors" },
          { label: `${subjectName}`, href: `/tutors/${subject}` },
          { label: `${cityName}, ${stateCode}` },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">{introText}</p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-8 p-4 bg-blue-50 rounded-lg">
        <div>
          <span className="text-2xl font-bold text-blue-700">{tutorCards.length}</span>
          <span className="ml-2 text-gray-600">{subjectName} Tutors in {cityName}</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-blue-700">${avgPrice}/hr</span>
          <span className="ml-2 text-gray-600">Average Rate</span>
        </div>
        {tutorCards.length > 0 && (() => {
          const rated = tutorCards.filter((t) => t.rating > 0);
          if (rated.length === 0) return null;
          const avg = (rated.reduce((s, t) => s + t.rating, 0) / rated.length).toFixed(1);
          return (
            <div>
              <span className="text-2xl font-bold text-blue-700">{avg}★</span>
              <span className="ml-2 text-gray-600">Average Rating</span>
            </div>
          );
        })()}
      </div>

      {/* Level Links */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Filter by Level</h2>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <Link
              key={level.slug}
              href={`/tutors/${subject}/${city}/${level.slug}`}
              className="text-sm px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              {level.label}
            </Link>
          ))}
        </div>
      </div>

      <TutorGrid
        tutors={tutorCards}
        emptyMessage={`No ${subjectName} tutors found in ${cityName} yet. Try browsing all ${subjectName} tutors or a nearby city.`}
      />

      <SEOContent
        title={`${subjectName} Tutoring in ${cityName}, ${stateName}`}
        content={`Looking for ${subjectName.toLowerCase()} help in ${cityName}? Our verified ${subjectName.toLowerCase()} tutors in ${cityName}, ${stateName} offer personalized one-on-one lessons tailored to your learning style and goals. Whether you need help with homework, exam prep, or want to advance your skills, find the perfect tutor today.`}
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
          { "@type": "ListItem", position: 1, name: "Home", item: "https://tutorsync.net/" },
          { "@type": "ListItem", position: 2, name: "Tutors", item: "https://tutorsync.net/tutors" },
          { "@type": "ListItem", position: 3, name: `${subjectName} Tutors`, item: `https://tutorsync.net/tutors/${subject}` },
          { "@type": "ListItem", position: 4, name: `${cityName}`, item: `https://tutorsync.net/tutors/${subject}/${city}` },
        ],
      }} />
    </div>
  );
}
