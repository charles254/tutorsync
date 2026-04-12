import type { MetadataRoute } from "next";
import subjects from "@/data/subjects.json";
import cities from "@/data/cities.json";
import { prisma } from "@/lib/db";

const BASE_URL = "https://tutorusa.com";
const levels = ["elementary", "middle-school", "high-school", "college", "adult"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/tutors`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/subjects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/become-tutor`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Subject pages
  const subjectPages: MetadataRoute.Sitemap = subjects.map((s) => ({
    url: `${BASE_URL}/tutors/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Subject + City pages (all combinations)
  const subjectCityPages: MetadataRoute.Sitemap = [];
  for (const s of subjects) {
    for (const c of cities) {
      subjectCityPages.push({
        url: `${BASE_URL}/tutors/${s.slug}/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  }

  // Subject + City + Level pages (top 20 subjects only to keep sitemap manageable)
  const topSubjects = subjects.slice(0, 20);
  const levelPages: MetadataRoute.Sitemap = [];
  for (const s of topSubjects) {
    for (const c of cities) {
      for (const l of levels) {
        levelPages.push({
          url: `${BASE_URL}/tutors/${s.slug}/${c.slug}/${l}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        });
      }
    }
  }

  // Tutor profile pages
  let tutorPages: MetadataRoute.Sitemap = [];
  try {
    const tutors = await prisma.tutor.findMany({
      select: { slug: true, createdAt: true },
    });
    tutorPages = tutors.map((t) => ({
      url: `${BASE_URL}/tutor/${t.slug}`,
      lastModified: t.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch {
    // DB might not be available
  }

  return [
    ...staticPages,
    ...subjectPages,
    ...subjectCityPages,
    ...levelPages,
    ...tutorPages,
  ];
}
