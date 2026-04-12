import Link from "next/link";
import { MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReviewStars } from "@/components/review-stars";

export interface Tutor {
  name: string;
  headline: string;
  hourlyRate: number;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  subjects: string[];
  firstLessonFree: boolean;
  slug: string;
  verified: boolean;
}

interface TutorCardProps {
  tutor: Tutor;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function nameToHash(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

const gradients = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-blue-600",
];

const borderColors = [
  "border-l-blue-500",
  "border-l-emerald-500",
  "border-l-violet-500",
  "border-l-rose-500",
  "border-l-amber-500",
  "border-l-cyan-500",
];

const subjectBgs = [
  "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
];

export function TutorCard({ tutor }: TutorCardProps) {
  const hash = nameToHash(tutor.name);
  const gradientClass = gradients[hash % gradients.length];
  const borderClass = borderColors[hash % borderColors.length];

  return (
    <Card
      className={`border-l-4 ${borderClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <CardContent className="flex gap-4 pt-5">
        <div
          className={`flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientClass} text-lg font-bold tracking-wide text-white shadow-md`}
        >
          {getInitials(tutor.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">
              {tutor.name}
            </h3>
            {tutor.verified && (
              <span className="group relative" title="Verified tutor">
                <BadgeCheck className="size-5 shrink-0 fill-blue-100 text-blue-600 dark:fill-blue-950 dark:text-blue-400" />
              </span>
            )}
          </div>
          <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {tutor.headline}
          </p>
          <ReviewStars
            rating={tutor.rating}
            count={tutor.reviewCount}
            className="mt-1.5"
          />
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">
              {tutor.city}, {tutor.state}
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {tutor.subjects.slice(0, 3).map((subject, idx) => (
              <Badge
                key={subject}
                variant="secondary"
                className={`border-0 text-xs font-medium ${subjectBgs[idx % subjectBgs.length]}`}
              >
                {subject}
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                +{tutor.subjects.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/30 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-bold text-foreground">
              ${tutor.hourlyRate}
            </span>
            <span className="text-sm text-muted-foreground">/hr</span>
          </div>
          {tutor.firstLessonFree && (
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
              First lesson free
            </span>
          )}
        </div>
        <Link
          href={`/tutor/${tutor.slug}`}
          className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          View Profile
          <ArrowRight className="size-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
