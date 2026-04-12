import Link from "next/link";

interface RelatedItem {
  name: string;
  slug: string;
}

interface SEOContentProps {
  title: string;
  content: string;
  relatedSubjects?: RelatedItem[];
  nearbyCities?: RelatedItem[];
}

export function SEOContent({
  title,
  content,
  relatedSubjects = [],
  nearbyCities = [],
}: SEOContentProps) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <div className="prose prose-sm mt-4 max-w-none text-muted-foreground">
          <p>{content}</p>
        </div>

        {relatedSubjects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-foreground">
              Related Subjects
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedSubjects.map((subject) => (
                <Link
                  key={subject.slug}
                  href={`/tutors/${subject.slug}`}
                  className="rounded-full border px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {subject.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {nearbyCities.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-foreground">
              Nearby Cities
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {nearbyCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/tutors/${city.slug}`}
                  className="rounded-full border px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
