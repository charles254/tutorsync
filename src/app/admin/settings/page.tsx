import { prisma } from "@/lib/db";
import {
  GraduationCap,
  Users,
  Star,
  BookOpen,
  MapPin,
  Server,
} from "lucide-react";

export default async function AdminSettingsPage() {
  const [tutorCount, userCount, reviewCount, subjectCount, cityCount] =
    await Promise.all([
      prisma.tutor.count(),
      prisma.user.count(),
      prisma.review.count(),
      prisma.subject.count(),
      prisma.city.count(),
    ]);

  const stats = [
    { label: "Tutors", value: tutorCount, icon: GraduationCap },
    { label: "Users", value: userCount, icon: Users },
    { label: "Reviews", value: reviewCount, icon: Star },
    { label: "Subjects", value: subjectCount, icon: BookOpen },
    { label: "Cities", value: cityCount, icon: MapPin },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* System Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Server className="size-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">System Info</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Framework
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              Next.js 16
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Database
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">SQLite</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Auth
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              NextAuth.js
            </p>
          </div>
        </div>
      </div>

      {/* Database Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Database Records
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center rounded-lg bg-gray-50 p-4">
                <Icon className="size-5 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
