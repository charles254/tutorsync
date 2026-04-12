import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewStarsProps {
  rating: number;
  count?: number;
  className?: string;
}

export function ReviewStars({ rating, count, className }: ReviewStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: fullStars }, (_, i) => (
        <Star
          key={`full-${i}`}
          className="size-4 fill-amber-400 text-amber-400"
        />
      ))}
      {hasHalf && (
        <div className="relative size-4">
          <Star className="absolute inset-0 size-4 fill-muted text-muted" />
          <StarHalf className="absolute inset-0 size-4 fill-amber-400 text-amber-400" />
        </div>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star
          key={`empty-${i}`}
          className="size-4 fill-muted/40 text-muted-foreground/30"
        />
      ))}
      {count !== undefined && (
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
}
