import Link from "next/link";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const params = await searchParams;
  const slug = params.slug;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="size-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          You&apos;re All Set!
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Your tutor profile has been created successfully. Our team will review
          and verify your profile shortly.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {slug && (
            <Link
              href={`/tutor/${slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:from-blue-700 hover:to-indigo-700"
            >
              View Your Profile
              <ArrowRight className="size-4" />
            </Link>
          )}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Home className="size-4" />
            Go Home
          </Link>
        </div>

        <div className="mt-8 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
          <strong>What happens next?</strong>
          <p className="mt-1 text-blue-600">
            Our team reviews new profiles within 24 hours. Once verified,
            you&apos;ll appear in search results and students can find you.
          </p>
        </div>
      </div>
    </div>
  );
}
