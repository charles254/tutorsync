import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl font-extrabold text-gray-200">404</span>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-3 text-lg text-gray-600 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/tutors"
          className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Browse Tutors
        </Link>
      </div>
    </div>
  );
}
