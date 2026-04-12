import type { Metadata } from "next";
import { getMetaDescription, getFAQs } from "./pseo-templates";

// ── Types ────────────────────────────────────────────────────────────────────

interface SEOParams {
  subject: string;
  subjectSlug: string;
  city: string;
  citySlug: string;
  state: string;
  stateSlug: string;
  stateCode?: string;
  tutorCount: number;
  avgPrice: number;
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface StructuredDataOptions extends SEOParams {
  url: string;
  avgRating?: number;
  reviewCount?: number;
}

type JsonLdObject = Record<string, unknown>;

// ── Metadata Generation ──────────────────────────────────────────────────────

/**
 * Generates a Next.js Metadata object for a subject + city landing page.
 */
export function generateMetadata(params: SEOParams): Metadata {
  const { subject, subjectSlug, city, citySlug, state, stateSlug, stateCode, tutorCount, avgPrice } = params;

  const title = `Best ${subject} Tutors in ${city}, ${stateCode ?? state} | TutorSync`;
  const description = getMetaDescription({
    subject,
    city,
    state,
    stateCode,
    tutorCount,
    avgPrice,
  });
  const canonicalUrl = `https://tutorsync.net/tutors/${subjectSlug}/${stateSlug}/${citySlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "TutorSync",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    other: {
      "geo.region": `US-${stateCode ?? ""}`,
      "geo.placename": city,
    },
  };
}

// ── Structured Data (JSON-LD) ────────────────────────────────────────────────

/**
 * Generates all JSON-LD structured data for a subject + city page.
 * Returns an array of JSON-LD objects to be embedded in <script type="application/ld+json">.
 */
export function generateStructuredData(options: StructuredDataOptions): JsonLdObject[] {
  const schemas: JsonLdObject[] = [];

  schemas.push(generateEducationalOrganization(options));
  schemas.push(generateFAQPage(options));
  schemas.push(generateBreadcrumbListSchema(options));

  if (options.avgRating && options.reviewCount) {
    schemas.push(generateAggregateRating(options));
  }

  return schemas;
}

function generateEducationalOrganization(options: StructuredDataOptions): JsonLdObject {
  const { subject, city, state, url, tutorCount, avgPrice, avgRating, reviewCount } = options;

  const schema: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: `TutorSync - ${subject} Tutoring in ${city}`,
    description: `Find ${tutorCount} qualified ${subject} tutors in ${city}, ${state}. Personalized tutoring starting at $${avgPrice}/hour.`,
    url,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: state,
      },
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: tutorCount,
    },
    priceRange: `$20-$80/hr`,
  };

  if (avgRating && reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

function generateFAQPage(options: StructuredDataOptions): JsonLdObject {
  const { subject, city, state, stateCode, tutorCount, avgPrice } = options;

  const faqs = getFAQs({ subject, city, state, stateCode, tutorCount, avgPrice });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function generateBreadcrumbListSchema(options: StructuredDataOptions): JsonLdObject {
  const breadcrumbs = generateBreadcrumbs(options);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://tutorsync.net${item.href}`,
    })),
  };
}

function generateAggregateRating(options: StructuredDataOptions): JsonLdObject {
  const { subject, city, state, avgRating, reviewCount, avgPrice, tutorCount } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${subject} Tutoring in ${city}, ${state}`,
    description: `Professional ${subject} tutoring services in ${city}. ${tutorCount} verified tutors available.`,
    provider: {
      "@type": "Organization",
      name: "TutorSync",
      url: "https://tutorsync.net",
    },
    areaServed: {
      "@type": "City",
      name: city,
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: avgPrice,
        priceCurrency: "USD",
        unitText: "HOUR",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating?.toFixed(1),
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// ── Breadcrumbs ──────────────────────────────────────────────────────────────

/**
 * Generates breadcrumb navigation items for a subject + city page.
 */
export function generateBreadcrumbs(params: {
  subject: string;
  subjectSlug: string;
  city: string;
  citySlug: string;
  state: string;
  stateSlug: string;
}): BreadcrumbItem[] {
  const { subject, subjectSlug, city, citySlug, state, stateSlug } = params;

  return [
    { name: "Home", href: "/" },
    { name: "Tutors", href: "/tutors" },
    { name: subject, href: `/tutors/${subjectSlug}` },
    { name: state, href: `/tutors/${subjectSlug}/${stateSlug}` },
    { name: city, href: `/tutors/${subjectSlug}/${stateSlug}/${citySlug}` },
  ];
}
