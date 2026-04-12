import { prisma } from "@/lib/db";
import { Star } from "lucide-react";
import { ReviewActions } from "./review-actions";

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const perPage = 20;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        tutor: { select: { slug: true, user: { select: { name: true } } } },
      },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.review.count(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Reviews</h1>
        <span className="text-sm text-gray-500">{total} total</span>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Reviewer
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Tutor
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Rating
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Comment
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    No reviews yet
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {review.user.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {review.tutor.user.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3.5 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                      {review.comment}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ReviewActions reviewId={review.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
