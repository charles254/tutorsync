import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TutorGrid } from "@/components/tutor-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FAQSection } from "@/components/faq-section";
import { SEOContent } from "@/components/seo-content";
import { JsonLd } from "@/lib/safe-jsonld";
import { getPageTitle, getIntroText, getFAQs, getRelatedSubjects, getMetaDescription } from "@/lib/pseo-templates";
import Link from "next/link";
import type { Metadata } from "next";
import subjects from "@/data/subjects.json";
import cities from "@/data/cities.json";

export const revalidate = 86400; // Revalidate every 24 hours

type Props = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject } = await params;
  const subjectData = subjects.find((s) => s.slug === subject);
  if (!subjectData) return { title: "Not Found" };
  const name = subjectData.name;

  return {
    title: `${name} Tutors - Find Expert ${name} Tutoring`,
    description: `Find expert ${name} tutors across the USA. ${name} tutoring from $35/hr. 500+ experienced tutors with verified reviews. Online and in-person options available.`,
    alternates: {
      canonical: `https://tutorsync.net/tutors/${subject}`,
    },
    openGraph: {
      title: `${name} Tutors - Find Expert ${name} Tutoring`,
      description: `Find expert ${name} tutors across the USA. Affordable rates starting at $20/hr.`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${name} Tutors - TutorSync` }],
    },
  };
}

export async function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;
  const subjectData = subjects.find((s) => s.slug === subject);
  if (!subjectData) notFound();
  const name = subjectData.name;

  let tutors: any[] = [];
  try {
    tutors = await prisma.tutor.findMany({
      where: { subjects: { some: { subject: { slug: subject } } } },
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

  const pageVars = { subject: name, city: "USA", state: "Nationwide", tutorCount: tutorCards.length, avgPrice };
  const title = `Find Expert ${name} Tutors Across the USA`;
  const introText = `Browse ${tutorCards.length} verified ${name} tutors nationwide. Whether you need online or in-person tutoring, our experts are ready to help you succeed. Rates start at $${avgPrice}/hr with many offering free first lessons.`;
  const faqs = getFAQs({ ...pageVars, city: "your area", state: "the USA" });
  const relatedSlugs = getRelatedSubjects(subject);
  const related = relatedSlugs.map((slug) => {
    const s = subjects.find((sub) => sub.slug === slug);
    return { name: s?.name || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "), slug };
  });
  const topCities = cities.slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tutors", href: "/tutors" },
          { label: `${name} Tutors` },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl">{introText}</p>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-6 mb-8 p-4 bg-blue-50 rounded-lg">
        <div>
          <span className="text-2xl font-bold text-blue-700">{tutorCards.length}</span>
          <span className="ml-2 text-gray-600">Tutors Available</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-blue-700">${avgPrice}</span>
          <span className="ml-2 text-gray-600">Average per hour</span>
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

      {/* City Quick Links */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Find {name} Tutors by City
        </h2>
        <div className="flex flex-wrap gap-2">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/tutors/${subject}/${city.slug}`}
              className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              {name} in {city.name}
            </Link>
          ))}
        </div>
      </div>

      <TutorGrid
        tutors={tutorCards}
        emptyMessage={`No ${name} tutors found yet. Check back soon!`}
      />

      <SEOContent
        title={`About ${name} Tutoring`}
        content={subjectData?.description || `Find the best ${name} tutors in the USA. Our verified tutors offer personalized lessons tailored to your learning goals and schedule.`}
        relatedSubjects={related}
        nearbyCities={topCities.map((c) => ({ name: c.name, slug: `${subject}/${c.slug}` }))}
      />

      <FAQSection faqs={faqs} />

      {/* JSON-LD Structured Data */}
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
          { "@type": "ListItem", position: 3, name: `${name} Tutors`, item: `https://tutorsync.net/tutors/${subject}` },
        ],
      }} />
    </div>
  );
}
