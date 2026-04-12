"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Something went wrong</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        We encountered an unexpected error. Please try again or return to the homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
