import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = Math.random().toString(36).substring(2, 8);
  return `${base}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already has a tutor profile
    const existingTutor = await prisma.tutor.findUnique({
      where: { userId: session.user.id },
    });

    if (existingTutor) {
      return NextResponse.json(
        { error: "You already have a tutor profile.", slug: existingTutor.slug },
        { status: 409 }
      );
    }

    const body = await request.json();
    const {
      headline,
      bio,
      hourlyRate,
      experience,
      education,
      city,
      state,
      zipCode,
      isOnline,
      isInPerson,
      firstLessonFree,
      subjectIds,
      levels,
    } = body;

    // Validation
    if (!headline || !bio || !hourlyRate || !city || !state) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!subjectIds || subjectIds.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one subject." },
        { status: 400 }
      );
    }

    if (!levels || levels.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one education level." },
        { status: 400 }
      );
    }

    const slug = generateSlug(session.user.name || "tutor");

    // Create tutor with subjects and levels in a transaction
    const tutor = await prisma.$transaction(async (tx) => {
      const newTutor = await tx.tutor.create({
        data: {
          userId: session.user.id,
          slug,
          headline,
          bio,
          hourlyRate: parseFloat(hourlyRate),
          experience: parseInt(experience) || 0,
          education: education || "",
          city,
          state,
          zipCode: zipCode || "",
          isOnline: isOnline ?? true,
          isInPerson: isInPerson ?? false,
          firstLessonFree: firstLessonFree ?? false,
          verified: false,
        },
      });

      // Create subject associations
      if (subjectIds.length > 0) {
        await tx.tutorSubject.createMany({
          data: subjectIds.map((subjectId: string) => ({
            tutorId: newTutor.id,
            subjectId,
          })),
        });
      }

      // Create level associations
      if (levels.length > 0) {
        await tx.tutorLevel.createMany({
          data: levels.map((level: string) => ({
            tutorId: newTutor.id,
            level,
          })),
        });
      }

      // Update user role to TUTOR
      await tx.user.update({
        where: { id: session.user.id },
        data: { role: "TUTOR" },
      });

      return newTutor;
    });

    return NextResponse.json(
      { message: "Tutor profile created!", slug: tutor.slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("Tutor registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
