/**
 * Safely renders JSON-LD structured data, preventing XSS via </script> injection.
 * Always use this instead of raw dangerouslySetInnerHTML for JSON-LD.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escape </script> sequences to prevent breaking out of the script tag
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
