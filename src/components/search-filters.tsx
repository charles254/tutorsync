"use client";

import { useState } from "react";
import {
  BookOpen,
  MapPin,
  DollarSign,
  GraduationCap,
  Monitor,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subjects = [
  "Math",
  "English",
  "Science",
  "Spanish",
  "French",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "SAT Prep",
  "ACT Prep",
  "Computer Science",
];

const levels = [
  "Elementary",
  "Middle School",
  "High School",
  "College",
  "Graduate",
];

interface SearchFiltersProps {
  onApply?: (filters: FilterValues) => void;
}

export interface FilterValues {
  subject: string;
  city: string;
  priceMin: string;
  priceMax: string;
  levels: string[];
  mode: "all" | "online" | "in-person";
}

export function SearchFilters({ onApply }: SearchFiltersProps) {
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [mode, setMode] = useState<"all" | "online" | "in-person">("all");

  function toggleLevel(level: string) {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  }

  function handleReset() {
    setSubject("");
    setCity("");
    setPriceMin("");
    setPriceMax("");
    setSelectedLevels([]);
    setMode("all");
  }

  function handleApply() {
    onApply?.({
      subject,
      city,
      priceMin,
      priceMax,
      levels: selectedLevels,
      mode,
    });
  }

  const hasActiveFilters =
    subject || city || priceMin || priceMax || selectedLevels.length > 0 || mode !== "all";

  return (
    <aside className="sticky top-24 space-y-1 rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-5 p-5">
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
            <BookOpen className="size-3.5 text-muted-foreground" />
            Subject
          </label>
          <Select value={subject} onValueChange={(val) => setSubject(val ?? "")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem
                  key={s}
                  value={s.toLowerCase().replace(/\s+/g, "-")}
                >
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
            <MapPin className="size-3.5 text-muted-foreground" />
            City
          </label>
          <Input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
            <DollarSign className="size-3.5 text-muted-foreground" />
            Price Range ($/hr)
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-full"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="mb-2.5 flex items-center gap-1.5 text-sm font-medium text-foreground">
            <GraduationCap className="size-3.5 text-muted-foreground" />
            Level
          </label>
          <div className="space-y-2.5">
            {levels.map((level) => (
              <label
                key={level}
                className="group flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={() => toggleLevel(level)}
                    className="peer size-4 cursor-pointer appearance-none rounded border border-input bg-background transition-colors checked:border-primary checked:bg-primary"
                  />
                  <svg
                    className="pointer-events-none absolute size-3 text-primary-foreground opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                </div>
                <span className="text-foreground transition-colors group-hover:text-primary">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Monitor className="size-3.5 text-muted-foreground" />
            Lesson Type
          </label>
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {(["all", "online", "in-person"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                  mode === option
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option === "all"
                  ? "All"
                  : option === "online"
                    ? "Online"
                    : "In-Person"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t px-5 py-4">
        <Button className="w-full" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </aside>
  );
}
