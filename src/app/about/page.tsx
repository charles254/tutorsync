import { Breadcrumbs } from "@/components/breadcrumbs";
import { GraduationCap, Users, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TutorUSA - Our Mission & Story",
  description: "TutorUSA connects students with verified tutors across the USA. Learn about our mission to make quality education accessible to everyone.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div className="py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          About <span className="text-blue-600">TutorUSA</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          TutorUSA is the leading tutoring marketplace connecting students with
          qualified, verified tutors across the United States. Our mission is to
          make quality education accessible, affordable, and personalized for every learner.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
          {[
            { icon: Users, value: "10,000+", label: "Verified Tutors" },
            { icon: GraduationCap, value: "200+", label: "Subjects" },
            { icon: MapPin, value: "500+", label: "Cities" },
            { icon: Star, value: "4.8", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-blue-50 rounded-xl">
              <stat.icon className="size-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Story</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Founded with a simple belief: every student deserves access to great
          tutoring, regardless of where they live. TutorUSA bridges the gap between
          students seeking academic support and skilled educators ready to share
          their knowledge.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Whether you need help with algebra, want to learn piano, or are preparing
          for the SAT, our platform makes it easy to find, compare, and connect
          with the right tutor for your unique learning goals.
        </p>
      </div>
    </div>
  );
}
