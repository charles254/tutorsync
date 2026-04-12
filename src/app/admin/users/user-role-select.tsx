"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ROLES = ["STUDENT", "TUTOR", "ADMIN"];

export function UserRoleSelect({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = async (newRole: string) => {
    if (newRole === currentRole) return;
    setLoading(true);

    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      router.refresh();
    } catch {
      alert("Failed to update role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={currentRole}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className={`rounded-lg border px-2.5 py-1 text-xs font-medium outline-none ${
        currentRole === "ADMIN"
          ? "border-purple-200 bg-purple-50 text-purple-700"
          : currentRole === "TUTOR"
            ? "border-blue-200 bg-blue-50 text-blue-700"
            : "border-gray-200 bg-gray-50 text-gray-700"
      } ${loading ? "opacity-50" : ""}`}
    >
      {ROLES.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}
