import { HeroSearch } from "@/components/hero-search";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { SubjectCard } from "@/components/subject-card";
import { JsonLd } from "@/lib/safe-jsonld";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const popularSubjects = [
  { name: "Mathematics", slug: "math", category: "Academic", tutorCount: 1250 },
  { name: "Spanish", slug: "spanish", category: "Languages", tutorCount: 890 },
  { name: "Physics", slug: "physics", category: "Science", tutorCount: 720 },
  { name: "Piano", slug: "piano", category: "Music", tutorCount: 650 },
  { name: "SAT Prep", slug: "sat-prep", category: "Test Prep", tutorCount: 980 },
  { name: "English", slug: "english", category: "Language Arts", tutorCount: 1100 },
  { name: "Chemistry", slug: "chemistry", category: "Science", tutorCount: 680 },
  { name: "Python", slug: "python", category: "Technology", tutorCount: 540 },
  { name: "Guitar", slug: "guitar", category: "Music", tutorCount: 470 },
  { name: "French", slug: "french", category: "Languages", tutorCount: 620 },
  { name: "Writing", slug: "writing", category: "Language Arts", tutorCount: 830 },
  { name: "Calculus", slug: "calculus", category: "Academic", tutorCount: 590 },
];

const citySubjects = ["math", "english", "spanish", "physics", "piano", "chemistry", "sat-prep", "python"];

const topCities = [
  { name: "New York", slug: "new-york", state: "NY" },
  { name: "Los Angeles", slug: "los-angeles", state: "CA" },
  { name: "Chicago", slug: "chicago", state: "IL" },
  { name: "Houston", slug: "houston", state: "TX" },
  { name: "Phoenix", slug: "phoenix", state: "AZ" },
  { name: "Philadelphia", slug: "philadelphia", state: "PA" },
  { name: "San Diego", slug: "san-diego", state: "CA" },
  { name: "Dallas", slug: "dallas", state: "TX" },
  { name: "San Francisco", slug: "san-francisco", state: "CA" },
  { name: "Austin", slug: "austin", state: "TX" },
  { name: "Seattle", slug: "seattle", state: "WA" },
  { name: "Denver", slug: "denver", state: "CO" },
  { name: "Boston", slug: "boston", state: "MA" },
  { name: "Miami", slug: "miami", state: "FL" },
  { name: "Atlanta", slug: "atlanta", state: "GA" },
  { name: "Nashville", slug: "nashville", state: "TN" },
];

export default function HomePage() {
  return (
    <>
      <HeroSearch />

      {/* Popular Subjects */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Browse by subject</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Popular Subjects
            </h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
              Explore our most in-demand tutoring categories and find your perfect match
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularSubjects.map((subject) => (
              <SubjectCard key={subject.slug} {...subject} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/subjects"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-lg group"
            >
              View All 200+ Subjects
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Top Cities */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Nationwide coverage</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Find Tutors in Your City
            </h2>
            <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
              We have verified tutors in 500+ cities across all 50 states
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {topCities.map((city, index) => (
              <Link
                key={city.slug}
                href={`/tutors/${citySubjects[index % citySubjects.length]}/${city.slug}`}
                className="group flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{city.name}</span>
                  <span className="block text-xs text-gray-400">{city.state}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMHY2aC02VjE0aDZ6bTAgMTB2NmgtNlYyNGg2em0tMTAtMTB2NmgtNlYxNGg2em0wIDEwdjZoLTZWMjRoNnptLTEwLTEwdjZINlYxNGg2em0wIDEwdjZINlYyNGg2em0wIDEwdjZINlYzNGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Ready to Start Teaching?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join thousands of tutors and share your knowledge with students across
            America. Set your own rates, choose your schedule.
          </p>
          <Link
            href="/become-tutor"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-0.5"
          >
            Become a Tutor — It&apos;s Free
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      {/* SEO Internal Links Footer */}
      <section className="py-14 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Popular Tutoring Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Math Tutor New York", subject: "math", city: "new-york" },
              { label: "Spanish Tutor Los Angeles", subject: "spanish", city: "los-angeles" },
              { label: "SAT Prep Chicago", subject: "sat-prep", city: "chicago" },
              { label: "Piano Lessons San Francisco", subject: "piano", city: "san-francisco" },
              { label: "Physics Tutor Houston", subject: "physics", city: "houston" },
              { label: "Chemistry Tutor Boston", subject: "chemistry", city: "boston" },
              { label: "Python Tutor Seattle", subject: "python", city: "seattle" },
              { label: "English Tutor Miami", subject: "english", city: "miami" },
              { label: "Guitar Lessons Austin", subject: "guitar", city: "austin" },
              { label: "French Tutor Philadelphia", subject: "french", city: "philadelphia" },
              { label: "ACT Prep Dallas", subject: "act-prep", city: "dallas" },
              { label: "Calculus Tutor Denver", subject: "calculus", city: "denver" },
            ].map((search) => (
                <Link
                  key={search.label}
                  href={`/tutors/${search.subject}/${search.city}`}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                >
                  {search.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Organization JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TutorUSA",
        url: "https://tutorusa.com",
        logo: "https://tutorusa.com/logo.png",
        description: "Find expert tutors across the USA in 200+ subjects. Verified reviews, affordable rates, and free first lessons.",
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English"],
        },
      }} />
      {/* WebSite + SearchAction JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TutorUSA",
        url: "https://tutorusa.com",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://tutorusa.com/tutors?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      }} />
    </>
  );
}
