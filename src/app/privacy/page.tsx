import { Breadcrumbs } from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TutorUSA",
  description: "TutorUSA Privacy Policy. Learn how we collect, use, and protect your personal information on our tutoring platform.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

      <div className="py-12 prose prose-gray max-w-none">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500">Last updated: April 11, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly, including your name, email address, and profile information when you create an account. We also collect usage data such as pages visited, search queries, and device information.</p>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information to provide and improve our services, connect students with tutors, personalize your experience, and communicate with you about our platform.</p>

        <h2>3. Information Sharing</h2>
        <p>We do not sell your personal information. We share information only with tutors you choose to contact, service providers who help us operate the platform, and as required by law.</p>

        <h2>4. Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and access controls.</p>

        <h2>5. Cookies</h2>
        <p>We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. Contact us to exercise these rights.</p>

        <h2>7. Children&apos;s Privacy</h2>
        <p>TutorUSA is not directed to children under 13. We do not knowingly collect information from children under 13 without parental consent.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy periodically. We will notify you of significant changes by posting the updated policy on this page.</p>

        <h2>9. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, contact us at privacy@tutorusa.com.</p>
      </div>
    </div>
  );
}
