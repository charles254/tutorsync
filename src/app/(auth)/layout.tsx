import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2.5 group"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20">
          <GraduationCap className="size-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-gray-900">
          Tutor<span className="text-blue-600">USA</span>
        </span>
      </Link>
      {children}
    </div>
  );
}
