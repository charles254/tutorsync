import { prisma } from "@/lib/db";
import Link from "next/link";
import { TutorActions } from "./tutor-actions";

export default async function AdminTutorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const status = params.status || "all";
  const page = parseInt(params.page || "1");
  const perPage = 20;

  const where = {
    ...(query && {
      OR: [
        { user: { name: { contains: query } } },
        { user: { email: { contains: query } } },
        { headline: { contains: query } },
      ],
    }),
    ...(status === "verified" && { verified: true }),
    ...(status === "pending" && { verified: false }),
  };

  const [tutors, total] = await Promise.all([
    prisma.tutor.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        subjects: { include: { subject: { select: { name: true } } } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.tutor.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Tutors</h1>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form className="flex-1">
          <input
            name="q"
            defaultValue={query}
            placeholder="Search by name, email, or headline..."
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </form>
        <div className="flex gap-2">
          {["all", "pending", "verified"].map((s) => (
            <Link
              key={s}
              href={`/admin/tutors?status=${s}${query ? `&q=${query}` : ""}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                status === s
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Tutor
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Subjects
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Rate
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tutors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                    No tutors found
                  </td>
                </tr>
              ) : (
                tutors.map((tutor) => (
                  <tr key={tutor.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {tutor.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {tutor.user.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects.slice(0, 3).map((ts) => (
                          <span
                            key={ts.subjectId}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {ts.subject.name}
                          </span>
                        ))}
                        {tutor.subjects.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{tutor.subjects.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      ${tutor.hourlyRate}/hr
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          tutor.verified
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {tutor.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <TutorActions
                        tutorId={tutor.id}
                        verified={tutor.verified}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/admin/tutors?page=${i + 1}${status !== "all" ? `&status=${status}` : ""}${query ? `&q=${query}` : ""}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
