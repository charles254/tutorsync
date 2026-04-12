import { Breadcrumbs } from "@/components/breadcrumbs";
import { Mail, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with TutorSync",
  description: "Have questions about TutorSync? Contact our team for support with finding tutors, account issues, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have a question or need help? We&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Mail, title: "Email", detail: "support@tutorsync.net", sub: "We respond within 24 hours" },
            { icon: MapPin, title: "Location", detail: "United States", sub: "Serving all 50 states" },
            { icon: Clock, title: "Hours", detail: "Mon-Fri 9am-6pm EST", sub: "Weekend support available" },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white border border-gray-200 rounded-xl text-center">
              <item.icon className="size-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-800 mt-1">{item.detail}</p>
              <p className="text-sm text-gray-500 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Common Questions</h2>
          <p className="text-gray-600 mb-6">Before reaching out, check if your question is answered below.</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> How do I find a tutor? Browse our subjects or search by city.</li>
            <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> How much does tutoring cost? Rates vary — most tutors charge $20-$80/hr.</li>
            <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> How do I become a tutor? Visit our Become a Tutor page to get started.</li>
            <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> Is the first lesson free? Many tutors offer a free first lesson.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
