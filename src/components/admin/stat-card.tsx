import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "purple";
  subtitle?: string;
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-l-blue-500",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    border: "border-l-green-500",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    border: "border-l-orange-500",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    border: "border-l-purple-500",
  },
};

export function StatCard({ title, value, icon: Icon, color, subtitle }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-5 border-l-4 ${colors.border}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className={`rounded-xl p-2.5 ${colors.bg}`}>
          <Icon className={`size-5 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}
