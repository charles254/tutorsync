import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const tutor = await prisma.tutor.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      subjects: { include: { subject: true } },
      levels: true,
    },
  });

  if (!tutor) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(tutor);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const allowedFields = [
    "headline",
    "bio",
    "hourlyRate",
    "experience",
    "education",
    "city",
    "state",
    "zipCode",
    "isOnline",
    "isInPerson",
    "verified",
  ];

  const data: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (field in body) {
      data[field] = body[field];
    }
  }

  const tutor = await prisma.tutor.update({
    where: { id },
    data,
  });

  return NextResponse.json(tutor);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.$transaction([
    prisma.tutorSubject.deleteMany({ where: { tutorId: id } }),
    prisma.tutorLevel.deleteMany({ where: { tutorId: id } }),
    prisma.review.deleteMany({ where: { tutorId: id } }),
    prisma.tutor.delete({ where: { id } }),
  ]);

  return NextResponse.json({ message: "Tutor deleted" });
}
