import { Breadcrumbs } from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TutorUSA",
  description: "Read the TutorUSA Terms of Service. Understand your rights and obligations when using our tutoring marketplace platform.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />

      <div className="py-12 prose prose-gray max-w-none">
        <h1>Terms of Service</h1>
        <p className="text-gray-500">Last updated: April 11, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using TutorUSA, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our platform.</p>

        <h2>2. Description of Service</h2>
        <p>TutorUSA is an online marketplace that connects students with tutors. We provide a platform for tutors to list their services and for students to discover, compare, and contact tutors. TutorUSA does not directly provide tutoring services.</p>

        <h2>3. User Accounts</h2>
        <p>You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

        <h2>4. Tutor Listings</h2>
        <p>Tutors are independent contractors, not employees of TutorUSA. We do not guarantee the quality, safety, or legality of tutoring services offered. We encourage students to review tutor profiles, ratings, and reviews before engaging.</p>

        <h2>5. Payments</h2>
        <p>Payment terms are agreed upon directly between students and tutors. TutorUSA is not responsible for payment disputes between users.</p>

        <h2>6. Prohibited Conduct</h2>
        <p>Users may not misuse the platform, post false information, harass other users, or engage in any unlawful activity through our services.</p>

        <h2>7. Intellectual Property</h2>
        <p>All content on TutorUSA, including text, graphics, logos, and software, is the property of TutorUSA and protected by applicable intellectual property laws.</p>

        <h2>8. Limitation of Liability</h2>
        <p>TutorUSA is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the platform or interactions with tutors.</p>

        <h2>9. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>

        <h2>10. Contact</h2>
        <p>For questions about these Terms, contact us at legal@tutorusa.com.</p>
      </div>
    </div>
  );
}
