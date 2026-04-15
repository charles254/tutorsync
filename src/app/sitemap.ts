import type { MetadataRoute } from "next";
import subjects from "@/data/subjects.json";
import cities from "@/data/cities.json";
import { prisma } from "@/lib/db";

const BASE_URL = "https://tutorsync.net";
const levels = [
  "elementary",
  "middle-school",
  "high-school",
  "college",
  "adult",
];

// Next.js generates a sitemap index when generateSitemaps is exported
export async function generateSitemaps() {
  return [
    { id: 0 }, // Static + subject pages
    { id: 1 }, // Subject+City pages (first half)
    { id: 2 }, // Subject+City pages (second half)
    { id: 3 }, // Level pages (first half)
    { id: 4 }, // Level pages (second half)
    { id: 5 }, // Tutor profile pages
  ];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  if (id === 0) {
    // Static + subject pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${BASE_URL}/tutors`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/subjects`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/become-tutor`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${BASE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      },
      {
        url: `${BASE_URL}/terms`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/privacy`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ];

    const subjectPages: MetadataRoute.Sitemap = subjects.map((s) => ({
      url: `${BASE_URL}/tutors/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...subjectPages];
  }

  if (id === 1 || id === 2) {
    // Subject+City pages split in half
    const allPairs: MetadataRoute.Sitemap = [];
    for (const s of subjects) {
      for (const c of cities) {
        allPairs.push({
          url: `${BASE_URL}/tutors/${s.slug}/${c.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        });
      }
    }
    const mid = Math.ceil(allPairs.length / 2);
    return id === 1 ? allPairs.slice(0, mid) : allPairs.slice(mid);
  }

  if (id === 3 || id === 4) {
    // Subject+City+Level pages (top 20 subjects) split in half
    const topSubjects = subjects.slice(0, 20);
    const allLevelPages: MetadataRoute.Sitemap = [];
    for (const s of topSubjects) {
      for (const c of cities) {
        for (const l of levels) {
          allLevelPages.push({
            url: `${BASE_URL}/tutors/${s.slug}/${c.slug}/${l}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.6,
          });
        }
      }
    }
    const mid = Math.ceil(allLevelPages.length / 2);
    return id === 3 ? allLevelPages.slice(0, mid) : allLevelPages.slice(mid);
  }

  if (id === 5) {
    // Tutor profile pages
    try {
      const tutors = await prisma.tutor.findMany({
        select: { slug: true, createdAt: true },
      });
      return tutors.map((t) => ({
        url: `${BASE_URL}/tutor/${t.slug}`,
        lastModified: t.createdAt,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }));
    } catch {
      return [];
    }
  }

  return [];
}
