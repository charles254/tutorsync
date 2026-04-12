import { SearchX } from "lucide-react";
import { TutorCard, type Tutor } from "@/components/tutor-card";

interface TutorGridProps {
  tutors: Tutor[];
  emptyMessage?: string;
}

export function TutorGrid({
  tutors,
  emptyMessage = "No tutors found. Try adjusting your search criteria.",
}: TutorGridProps) {
  if (tutors.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 p-10 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="size-8 text-muted-foreground/60" />
        </div>
        <p className="mt-4 text-base font-medium text-foreground">
          No tutors found
        </p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tutors.map((tutor, index) => (
        <div
          key={tutor.slug}
          className="animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
        >
          <TutorCard tutor={tutor} />
        </div>
      ))}
    </div>
  );
}
