"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, X, Pencil, Loader2 } from "lucide-react";
import Link from "next/link";

export function TutorActions({
  tutorId,
  verified,
}: {
  tutorId: string;
  verified: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (action: "verify" | "delete") => {
    setLoading(action);
    try {
      if (action === "verify") {
        await fetch(`/api/admin/tutors/${tutorId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verified: !verified }),
        });
      } else {
        if (!confirm("Are you sure you want to delete this tutor?")) {
          setLoading(null);
          return;
        }
        await fetch(`/api/admin/tutors/${tutorId}`, { method: "DELETE" });
      }
      router.refresh();
    } catch {
      alert("Action failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={() => handleAction("verify")}
        disabled={loading !== null}
        className={`rounded-lg p-1.5 transition-colors ${
          verified
            ? "text-yellow-600 hover:bg-yellow-50"
            : "text-green-600 hover:bg-green-50"
        }`}
        title={verified ? "Unverify" : "Verify"}
      >
        {loading === "verify" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Check className="size-4" />
        )}
      </button>
      <Link
        href={`/admin/tutors/${tutorId}/edit`}
        className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
        title="Edit"
      >
        <Pencil className="size-4" />
      </Link>
      <button
        onClick={() => handleAction("delete")}
        disabled={loading !== null}
        className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors"
        title="Delete"
      >
        {loading === "delete" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <X className="size-4" />
        )}
      </button>
    </div>
  );
}
