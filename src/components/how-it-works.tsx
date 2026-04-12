import { Search, MessageCircle, Trophy, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search for a Tutor",
    description:
      "Browse thousands of verified tutors by subject, location, and price. Read reviews to find the perfect match.",
  },
  {
    icon: MessageCircle,
    title: "Connect and Schedule",
    description:
      "Message tutors directly, discuss your learning goals, and schedule a lesson at a time that works for you.",
  },
  {
    icon: Trophy,
    title: "Learn and Succeed",
    description:
      "Meet online or in person for personalized lessons. Track your progress and achieve your academic goals.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-blue-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Simple Process
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Getting started is simple. Three easy steps to find your perfect
            tutor and begin learning.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {/* Connecting lines on desktop */}
          <div className="absolute left-1/3 right-1/3 top-16 hidden h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative">
                  <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-110">
                    <Icon className="size-9 text-white" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600 shadow-md ring-2 ring-blue-100">
                    {index + 1}
                  </div>
                </div>

                {/* Card body */}
                <div className="mt-6 rounded-xl bg-white p-6 shadow-sm transition-all group-hover:shadow-md">
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps on mobile */}
                {index < steps.length - 1 && (
                  <div className="mt-4 flex items-center justify-center text-blue-300 md:hidden">
                    <ArrowRight className="size-5 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
