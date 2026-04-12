import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.href || item.label}
              className="flex items-center gap-1"
            >
              {index > 0 && (
                <ChevronRight className="size-3 text-muted-foreground/50" />
              )}
              {isLast || !item.href ? (
                <span
                  className={
                    isLast
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {isFirst && <Home className="size-3" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
