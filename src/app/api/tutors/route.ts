import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Sanitize string input — alphanumeric, hyphens, spaces only
function sanitizeSlug(input: string): string {
  return input.replace(/[^a-zA-Z0-9\-]/g, "").substring(0, 100);
}

function sanitizeCity(input: string): string {
  return input.replace(/[^a-zA-Z\s\-'.]/g, "").substring(0, 100);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Validate and sanitize inputs
  const subject = searchParams.get("subject")
    ? sanitizeSlug(searchParams.get("subject")!)
    : null;
  const city = searchParams.get("city")
    ? sanitizeCity(searchParams.get("city")!)
    : null;
  const level = searchParams.get("level")
    ? sanitizeSlug(searchParams.get("level")!)
    : null;
  const online = searchParams.get("online") === "true";

  // Validate numeric inputs with bounds
  const page = Math.max(1, Math.min(1000, parseInt(searchParams.get("page") || "1") || 1));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "24") || 24));

  const minPriceRaw = parseFloat(searchParams.get("minPrice") || "");
  const maxPriceRaw = parseFloat(searchParams.get("maxPrice") || "");
  const minPrice = !isNaN(minPriceRaw) && minPriceRaw >= 0 ? Math.min(minPriceRaw, 10000) : null;
  const maxPrice = !isNaN(maxPriceRaw) && maxPriceRaw >= 0 ? Math.min(maxPriceRaw, 10000) : null;

  try {
    // Build query with validated inputs only
    const where: Record<string, unknown> = {};

    if (subject) {
      where.subjects = { some: { subject: { slug: subject } } };
    }
    if (city) {
      where.city = { contains: city };
    }
    if (minPrice !== null || maxPrice !== null) {
      const hourlyRate: Record<string, number> = {};
      if (minPrice !== null) hourlyRate.gte = minPrice;
      if (maxPrice !== null) hourlyRate.lte = maxPrice;
      where.hourlyRate = hourlyRate;
    }
    if (level) {
      where.levels = { some: { level } };
    }
    if (online) {
      where.isOnline = true;
    }

    const [tutors, total] = await Promise.all([
      prisma.tutor.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { name: true, image: true } },
          subjects: { include: { subject: { select: { name: true, slug: true } } } },
          reviews: { select: { rating: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.tutor.count({ where }),
    ]);

    const results = tutors.map((t) => ({
      slug: t.slug,
      name: t.user.name,
      image: t.user.image,
      headline: t.headline,
      hourlyRate: t.hourlyRate,
      city: t.city,
      state: t.state,
      experience: t.experience,
      isOnline: t.isOnline,
      isInPerson: t.isInPerson,
      firstLessonFree: t.firstLessonFree,
      verified: t.verified,
      subjects: t.subjects.map((s) => s.subject.name),
      rating:
        t.reviews.length > 0
          ? t.reviews.reduce((sum, r) => sum + r.rating, 0) / t.reviews.length
          : 0,
      reviewCount: t.reviews.length,
    }));

    return NextResponse.json({
      tutors: results,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    // Never expose internal error details
    console.error("[API /tutors] Database query failed");
    return NextResponse.json(
      { error: "Failed to fetch tutors" },
      { status: 500 }
    );
  }
}
