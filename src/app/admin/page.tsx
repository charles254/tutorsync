import { prisma } from "@/lib/db";
import { StatCard } from "@/components/admin/stat-card";
import { GraduationCap, Users, Star, Clock } from "lucide-react";

export default async function AdminDashboard() {
  const [totalTutors, totalUsers, totalReviews, pendingTutors, recentTutors, recentReviews] =
    await Promise.all([
      prisma.tutor.count(),
      prisma.user.count(),
      prisma.review.count(),
      prisma.tutor.count({ where: { verified: false } }),
      prisma.tutor.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.review.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true } },
          tutor: { select: { slug: true } },
        },
      }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Tutors"
          value={totalTutors}
          icon={GraduationCap}
          color="blue"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Reviews"
          value={totalReviews}
          icon={Star}
          color="orange"
        />
        <StatCard
          title="Pending Approval"
          value={pendingTutors}
          icon={Clock}
          color="purple"
          subtitle="Unverified tutors"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tutors */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Tutors
          </h2>
          {recentTutors.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No tutors yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {tutor.user.name}
                    </p>
                    <p className="text-xs text-gray-500">{tutor.user.email}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      tutor.verified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tutor.verified ? "Verified" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Reviews
          </h2>
          {recentReviews.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No reviews yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {review.user.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
