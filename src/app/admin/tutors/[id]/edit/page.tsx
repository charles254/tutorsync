"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TutorData {
  id: string;
  headline: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  education: string;
  city: string;
  state: string;
  verified: boolean;
  isOnline: boolean;
  isInPerson: boolean;
}

export default function EditTutorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [tutor, setTutor] = useState<TutorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/tutors/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tutor.");
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    if (!tutor) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/tutors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutor),
      });

      if (!res.ok) {
        setError("Failed to save changes.");
        return;
      }

      router.push("/admin/tutors");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center py-20 text-gray-500">Tutor not found.</div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/tutors"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft className="size-4" />
        Back to Tutors
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Tutor</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Headline
          </label>
          <input
            type="text"
            value={tutor.headline}
            onChange={(e) => setTutor({ ...tutor, headline: e.target.value })}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            value={tutor.bio}
            onChange={(e) => setTutor({ ...tutor, bio: e.target.value })}
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Hourly Rate ($)
            </label>
            <input
              type="number"
              value={tutor.hourlyRate}
              onChange={(e) =>
                setTutor({ ...tutor, hourlyRate: parseFloat(e.target.value) })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Experience (years)
            </label>
            <input
              type="number"
              value={tutor.experience}
              onChange={(e) =>
                setTutor({ ...tutor, experience: parseInt(e.target.value) })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={tutor.city}
              onChange={(e) => setTutor({ ...tutor, city: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              value={tutor.state}
              onChange={(e) => setTutor({ ...tutor, state: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={tutor.verified}
              onChange={(e) =>
                setTutor({ ...tutor, verified: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm text-gray-700">Verified</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={tutor.isOnline}
              onChange={(e) =>
                setTutor({ ...tutor, isOnline: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm text-gray-700">Online</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={tutor.isInPerson}
              onChange={(e) =>
                setTutor({ ...tutor, isInPerson: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm text-gray-700">In-Person</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Link
            href="/admin/tutors"
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
