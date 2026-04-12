"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

export function ReviewActions({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setLoading(true);
    try {
      await fetch(`/api/admin/reviews/${reviewId}`, { method: "DELETE" });
      router.refresh();
    } catch {
      alert("Failed to delete review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Delete review"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4" />
      )}
    </button>
  );
}
