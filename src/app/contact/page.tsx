import { Breadcrumbs } from "@/components/breadcrumbs";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Phone, title: "Phone", detail: "+1 (888) 888-8867", sub: "Mon-Fri 9am-6pm EST", href: "tel:+18888888867" },
            { icon: Mail, title: "Email", detail: "support@tutorsync.net", sub: "We respond within 24 hours", href: "mailto:support@tutorsync.net" },
            { icon: MapPin, title: "Location", detail: "United States", sub: "Serving all 50 states" },
            { icon: Clock, title: "Hours", detail: "Mon-Fri 9am-6pm EST", sub: "Weekend support available" },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-white border border-gray-200 rounded-xl text-center">
              <item.icon className="size-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              {item.href ? (
                <a href={item.href} className="text-gray-800 mt-1 inline-block hover:text-blue-600 transition-colors">{item.detail}</a>
              ) : (
                <p className="text-gray-800 mt-1">{item.detail}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <p className="text-3xl font-bold text-blue-700">10,000+</p>
            <p className="text-gray-600 mt-1">Verified Tutors</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <p className="text-3xl font-bold text-blue-700">200+</p>
            <p className="text-gray-600 mt-1">Subjects Offered</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <p className="text-3xl font-bold text-blue-700">50</p>
            <p className="text-gray-600 mt-1">States Covered</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I find a tutor?</h3>
              <p className="text-gray-600">
                Browse tutors by subject or city using our search pages. You can filter by location, price range, and experience level to find the perfect match. Each tutor profile includes reviews, qualifications, and availability.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is it free to sign up?</h3>
              <p className="text-gray-600">
                Yes, creating a TutorSync account is completely free for students and parents. You can browse tutor profiles, read reviews, and compare rates at no cost. You only pay when you book a lesson with a tutor.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How does tutor matching work?</h3>
              <p className="text-gray-600">
                Our platform lets you search by subject, city, and level to find tutors who meet your needs. You can review each tutor&apos;s profile, qualifications, and student reviews before reaching out. Many tutors offer a free first lesson so you can find the right fit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What subjects are available?</h3>
              <p className="text-gray-600">
                TutorSync covers over 200 subjects, including math, science, English, foreign languages, test prep (SAT, ACT, GRE), music, coding, and more. Whether you need help with elementary school homework or college-level coursework, we have tutors who specialize in your area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
