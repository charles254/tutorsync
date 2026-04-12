import { Card, CardContent } from "@/components/ui/card";
import { ReviewStars } from "@/components/review-stars";

const testimonials = [
  {
    quote:
      "My SAT score went up 200 points after just two months of tutoring. My tutor explained concepts in a way my teachers never could.",
    name: "Sarah M.",
    subject: "SAT Prep",
    rating: 5,
    initials: "SM",
    color: "from-blue-500 to-indigo-600",
  },
  {
    quote:
      "Finding a Spanish tutor in my area was so easy. The lessons are fun, and I can already hold basic conversations after a few weeks.",
    name: "James L.",
    subject: "Spanish",
    rating: 5,
    initials: "JL",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote:
      "As a parent, I appreciate how simple it is to find qualified, verified tutors. My daughter now loves math thanks to her amazing tutor.",
    name: "Patricia K.",
    subject: "Math",
    rating: 5,
    initials: "PK",
    color: "from-orange-500 to-rose-600",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
      <div className="absolute -left-40 top-20 size-80 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute -right-40 bottom-20 size-80 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Students Are Saying
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Real results from real students across the country
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="group relative border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="relative space-y-5 p-7">
                {/* Large decorative quote mark */}
                <div className="absolute -top-1 right-6 font-serif text-7xl leading-none text-blue-100 select-none">
                  &ldquo;
                </div>

                <div className="relative">
                  <p className="text-sm leading-relaxed text-foreground/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <ReviewStars rating={t.rating} />

                <div className="flex items-center gap-3 border-t pt-4">
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-bold text-white shadow-sm`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.subject}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
