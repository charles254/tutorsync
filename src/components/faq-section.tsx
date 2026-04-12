interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
}: FAQSectionProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Everything you need to know about finding the right tutor.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border bg-card transition-shadow hover:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-open:bg-primary group-open:text-primary-foreground">
                  <span className="absolute h-0.5 w-3 rounded-full bg-current transition-transform" />
                  <span className="absolute h-0.5 w-3 rotate-90 rounded-full bg-current transition-transform group-open:rotate-0" />
                </span>
              </summary>
              <div className="overflow-hidden">
                <p className="border-t px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
