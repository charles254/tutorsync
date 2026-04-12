import Link from "next/link";
import {
  Calculator,
  BookOpen,
  FlaskConical,
  Languages,
  Atom,
  Globe,
  Code,
  Music,
  Palette,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categoryIcons: Record<string, React.ElementType> = {
  math: Calculator,
  english: BookOpen,
  science: FlaskConical,
  languages: Languages,
  physics: Atom,
  social: Globe,
  technology: Code,
  music: Music,
  arts: Palette,
  sports: Dumbbell,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  math: { bg: "bg-blue-50", text: "text-blue-600", border: "border-t-blue-500" },
  english: { bg: "bg-amber-50", text: "text-amber-600", border: "border-t-amber-500" },
  science: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-t-emerald-500" },
  languages: { bg: "bg-purple-50", text: "text-purple-600", border: "border-t-purple-500" },
  physics: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-t-indigo-500" },
  social: { bg: "bg-teal-50", text: "text-teal-600", border: "border-t-teal-500" },
  technology: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-t-cyan-500" },
  music: { bg: "bg-rose-50", text: "text-rose-600", border: "border-t-rose-500" },
  arts: { bg: "bg-pink-50", text: "text-pink-600", border: "border-t-pink-500" },
  sports: { bg: "bg-orange-50", text: "text-orange-600", border: "border-t-orange-500" },
};

const defaultColors = { bg: "bg-gray-50", text: "text-gray-600", border: "border-t-gray-500" };

interface SubjectCardProps {
  name: string;
  slug: string;
  tutorCount: number;
  category: string;
}

export function SubjectCard({
  name,
  slug,
  tutorCount,
  category,
}: SubjectCardProps) {
  const Icon = categoryIcons[category] ?? BookOpen;
  const colors = categoryColors[category] ?? defaultColors;

  return (
    <Link href={`/tutors/${slug}`} className="group block">
      <Card
        className={`border-t-4 ${colors.border} transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg`}
      >
        <CardContent className="flex items-center gap-4 p-5">
          <div
            className={`flex size-14 shrink-0 items-center justify-center rounded-full ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className={`size-7 ${colors.text}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1">
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${colors.bg} ${colors.text}`}
              >
                {category}
              </span>
            </div>
            <h3 className="truncate text-base font-semibold text-foreground">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {tutorCount.toLocaleString()}{" "}
              {tutorCount === 1 ? "tutor" : "tutors"}
            </p>
          </div>
          <ArrowRight
            className="size-5 shrink-0 text-muted-foreground/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-muted-foreground"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
