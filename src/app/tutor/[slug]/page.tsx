import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReviewStars } from "@/components/review-stars";
import { JsonLd } from "@/lib/safe-jsonld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, GraduationCap, CheckCircle, Video, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 86400; // Revalidate every 24 hours

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let tutor: any = null;
  try {
    tutor = await prisma.tutor.findUnique({
      where: { slug },
      include: { user: true, subjects: { include: { subject: true } } },
    });
  } catch {
    // DB not ready
  }

  if (!tutor) {
    return { title: "Tutor Not Found" };
  }

  const subjectNames = tutor.subjects.map((s: any) => s.subject.name).join(", ");
  const expText = tutor.experience === 1 ? "1 year" : `${tutor.experience} years`;
  return {
    title: `${tutor.user.name} - ${subjectNames} Tutor in ${tutor.city}`,
    description: `${tutor.user.name} is a verified ${subjectNames} tutor in ${tutor.city}, ${tutor.state}. $${tutor.hourlyRate}/hr. ${expText} experience.${tutor.firstLessonFree ? " First lesson free!" : ""}`,
    alternates: {
      canonical: `https://tutorsync.net/tutor/${slug}`,
    },
    openGraph: {
      title: `${tutor.user.name} - ${subjectNames} Tutor in ${tutor.city}`,
      description: `Book ${tutor.user.name} for ${subjectNames} tutoring in ${tutor.city}, ${tutor.state}. $${tutor.hourlyRate}/hr.`,
      url: `https://tutorsync.net/tutor/${slug}`,
    },
  };
}

export default async function TutorProfilePage({ params }: Props) {
  const { slug } = await params;

  let tutor: any = null;
  try {
    tutor = await prisma.tutor.findUnique({
      where: { slug },
      include: {
        user: true,
        subjects: { include: { subject: true } },
        levels: true,
        reviews: { include: { user: true }, orderBy: { createdAt: "desc" }, take: 10 },
      },
    });
  } catch {
    // DB not ready
  }

  if (!tutor) notFound();

  const avgRating =
    tutor.reviews.length > 0
      ? tutor.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / tutor.reviews.length
      : 0;

  const initials = tutor.user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  const levelLabels: Record<string, string> = {
    ELEMENTARY: "Elementary",
    MIDDLE_SCHOOL: "Middle School",
    HIGH_SCHOOL: "High School",
    COLLEGE: "College",
    ADULT: "Adult",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tutors", href: "/tutors" },
          { label: tutor.user.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{tutor.user.name}</h1>
                {tutor.verified && (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <p className="text-lg text-gray-600 mt-1">{tutor.headline}</p>
              <div className="flex items-center gap-4 mt-2">
                <ReviewStars rating={avgRating} count={tutor.reviews.length} />
                <span className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {tutor.city}, {tutor.state}
                </span>
              </div>
            </div>
          </div>

          {/* About */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-3">About Me</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {tutor.bio}
              </p>
            </CardContent>
          </Card>

          {/* Subjects */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-3">Subjects I Teach</h2>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((ts: any) => (
                  <Link key={ts.subject.slug} href={`/tutors/${ts.subject.slug}`}>
                    <Badge variant="secondary" className="text-sm px-3 py-1 cursor-pointer hover:bg-blue-100">
                      {ts.subject.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Levels */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-3">Levels</h2>
              <div className="flex flex-wrap gap-2">
                {tutor.levels.map((tl: any) => (
                  <Badge key={tl.id} variant="outline" className="text-sm px-3 py-1">
                    {levelLabels[tl.level] || tl.level}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Reviews ({tutor.reviews.length})
              </h2>
              {tutor.reviews.length > 0 ? (
                <div className="space-y-4">
                  {tutor.reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">
                          {review.user.name}
                        </span>
                        <ReviewStars rating={review.rating} />
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="sticky top-24">
            <CardContent className="pt-6 space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-gray-900">
                  ${tutor.hourlyRate}
                </span>
                <span className="text-gray-500">/hour</span>
              </div>

              {tutor.firstLessonFree && (
                <div className="bg-green-50 text-green-700 text-center py-2 rounded-lg font-medium text-sm">
                  First Lesson Free!
                </div>
              )}

              <Button className="w-full" size="lg">
                Contact {tutor.user.name.split(" ")[0]}
              </Button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${tutor.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{tutor.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>{tutor.education}</span>
                </div>
                {tutor.responseTime && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Responds in {tutor.responseTime}h</span>
                  </div>
                )}
                {tutor.isOnline && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Video className="w-4 h-4" />
                    <span>Online lessons available</span>
                  </div>
                )}
                {tutor.isInPerson && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>In-person lessons available</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: tutor.user.name,
        jobTitle: tutor.headline,
        description: tutor.bio,
        address: {
          "@type": "PostalAddress",
          addressLocality: tutor.city,
          addressRegion: tutor.state,
          addressCountry: "US",
        },
        ...(tutor.reviews.length > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating.toFixed(1),
            reviewCount: tutor.reviews.length,
            bestRating: 5,
            worstRating: 1,
          },
        }),
        makesOffer: tutor.subjects.map((ts: any) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${ts.subject.name} Tutoring`,
            serviceType: "Private Tutoring",
          },
        })),
      }} />
    </div>
  );
}
