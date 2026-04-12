import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle, DollarSign, Clock, Users, Star, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Tutor - Share Your Knowledge & Earn",
  description:
    "Join TutorSync as a tutor. Set your own rates, choose your schedule, and teach students across America. Free to join.",
};

const benefits = [
  {
    icon: DollarSign,
    title: "Set Your Own Rates",
    description: "You decide how much to charge. Most tutors earn $25-$80/hour.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Teach when it works for you. Morning, evening, or weekends.",
  },
  {
    icon: Users,
    title: "Reach Thousands of Students",
    description: "Get discovered by students actively searching for tutors in your area.",
  },
  {
    icon: Star,
    title: "Build Your Reputation",
    description: "Collect reviews and ratings to attract more students over time.",
  },
  {
    icon: Shield,
    title: "Verified Profile",
    description: "Get a verified badge that builds trust with potential students.",
  },
  {
    icon: CheckCircle,
    title: "Free to Join",
    description: "No upfront costs. Create your profile and start getting students.",
  },
];

export default function BecomeTutorPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Share Your Knowledge,{" "}
            <span className="text-cyan-300">Earn on Your Terms</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join 10,000+ tutors helping students across the USA. Set your own
            rates, choose your schedule, and make a difference.
          </p>
          <Link
            href="/become-tutor/register"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            Get Started — It&apos;s Free
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Become a Tutor" }]}
        />

        {/* Benefits Grid */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Why Tutor with Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="pt-6">
                  <benefit.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 border-t">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description: "Tell us about your expertise, experience, and teaching style. Add your subjects and set your hourly rate.",
              },
              {
                step: "2",
                title: "Get Discovered",
                description: "Students search for tutors by subject and location. Your profile appears in search results automatically.",
              },
              {
                step: "3",
                title: "Start Teaching",
                description: "Connect with students, schedule lessons, and start earning. Teach online or in-person.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50 rounded-2xl px-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Active Tutors" },
              { value: "$45", label: "Avg. Hourly Rate" },
              { value: "50", label: "States Covered" },
              { value: "200+", label: "Subjects" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
