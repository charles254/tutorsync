"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  BookOpen,
  DollarSign,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Check,
} from "lucide-react";

const STEPS = [
  { label: "Personal Info", icon: User },
  { label: "Subjects & Levels", icon: BookOpen },
  { label: "Rates", icon: DollarSign },
  { label: "Location", icon: MapPin },
];

const LEVELS = [
  { value: "ELEMENTARY", label: "Elementary" },
  { value: "MIDDLE_SCHOOL", label: "Middle School" },
  { value: "HIGH_SCHOOL", label: "High School" },
  { value: "COLLEGE", label: "College" },
  { value: "ADULT", label: "Adult" },
];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

interface Subject {
  id: string;
  name: string;
  slug: string;
  category: string;
}

export function TutorRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Subject[]>>({});

  const [form, setForm] = useState({
    headline: "",
    bio: "",
    education: "",
    experience: "",
    subjectIds: [] as string[],
    levels: [] as string[],
    hourlyRate: "",
    isOnline: true,
    isInPerson: false,
    firstLessonFree: false,
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    fetch("/api/subjects")
      .then((r) => r.json())
      .then((data) => {
        setSubjects(data.subjects);
        setGrouped(data.grouped);
      })
      .catch(() => {});
  }, []);

  const updateForm = (updates: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...updates }));
    setError("");
  };

  const toggleSubject = (id: string) => {
    setForm((prev) => ({
      ...prev,
      subjectIds: prev.subjectIds.includes(id)
        ? prev.subjectIds.filter((s) => s !== id)
        : [...prev.subjectIds, id],
    }));
  };

  const toggleLevel = (level: string) => {
    setForm((prev) => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter((l) => l !== level)
        : [...prev.levels, level],
    }));
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 0:
        if (!form.headline.trim()) {
          setError("Please enter a headline.");
          return false;
        }
        if (!form.bio.trim() || form.bio.length < 20) {
          setError("Please write a bio (at least 20 characters).");
          return false;
        }
        return true;
      case 1:
        if (form.subjectIds.length === 0) {
          setError("Please select at least one subject.");
          return false;
        }
        if (form.levels.length === 0) {
          setError("Please select at least one education level.");
          return false;
        }
        return true;
      case 2:
        if (!form.hourlyRate || parseFloat(form.hourlyRate) <= 0) {
          setError("Please enter a valid hourly rate.");
          return false;
        }
        return true;
      case 3:
        if (!form.city.trim() || !form.state) {
          setError("Please enter your city and state.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      setError("");
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tutors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      router.push(`/become-tutor/success?slug=${data.slug}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [subjectSearch, setSubjectSearch] = useState("");
  const filteredGrouped = Object.entries(grouped).reduce(
    (acc, [category, subs]) => {
      const filtered = subs.filter((s) =>
        s.name.toLowerCase().includes(subjectSearch.toLowerCase())
      );
      if (filtered.length > 0) acc[category] = filtered;
      return acc;
    },
    {} as Record<string, Subject[]>
  );

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step Indicator */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isCompleted = i < step;
          return (
            <div key={s.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="size-5" />
                  ) : (
                    <Icon className="size-5" />
                  )}
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 sm:w-16 ${
                    i < step ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        )}

        {/* Step 1: Personal Info */}
        {step === 0 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900">
              Tell us about yourself
            </h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Headline *
              </label>
              <input
                type="text"
                value={form.headline}
                onChange={(e) => updateForm({ headline: e.target.value })}
                placeholder="e.g. Experienced Math Tutor with 10+ Years"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Bio *
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => updateForm({ bio: e.target.value })}
                rows={4}
                placeholder="Tell students about your teaching style, experience, and what makes you a great tutor..."
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
              <p className="mt-1 text-xs text-gray-400">
                {form.bio.length}/500 characters
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Education
                </label>
                <input
                  type="text"
                  value={form.education}
                  onChange={(e) => updateForm({ education: e.target.value })}
                  placeholder="e.g. M.S. Mathematics"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={form.experience}
                  onChange={(e) => updateForm({ experience: e.target.value })}
                  placeholder="e.g. 5"
                  min="0"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Subjects & Levels */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900">
              What do you teach?
            </h2>

            {/* Subject Search */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Subjects * ({form.subjectIds.length} selected)
              </label>
              <input
                type="text"
                value={subjectSearch}
                onChange={(e) => setSubjectSearch(e.target.value)}
                placeholder="Search subjects..."
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 mb-3"
              />
              <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200 p-3 space-y-4">
                {Object.entries(filteredGrouped).map(([category, subs]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {subs.map((subject) => (
                        <button
                          key={subject.id}
                          type="button"
                          onClick={() => toggleSubject(subject.id)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            form.subjectIds.includes(subject.id)
                              ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {subject.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {Object.keys(filteredGrouped).length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No subjects found
                  </p>
                )}
              </div>
            </div>

            {/* Levels */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Education Levels * ({form.levels.length} selected)
              </label>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => toggleLevel(level.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      form.levels.includes(level.value)
                        ? "bg-blue-100 text-blue-700 ring-1 ring-blue-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Rates & Availability */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900">
              Set your rates
            </h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Hourly Rate (USD) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={form.hourlyRate}
                  onChange={(e) => updateForm({ hourlyRate: e.target.value })}
                  placeholder="45"
                  min="1"
                  max="500"
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  /hour
                </span>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Lesson Mode
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isOnline}
                    onChange={(e) => updateForm({ isOnline: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Online tutoring (video call)
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isInPerson}
                    onChange={(e) =>
                      updateForm({ isInPerson: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    In-person tutoring
                  </span>
                </label>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={form.firstLessonFree}
                onChange={(e) =>
                  updateForm({ firstLessonFree: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  First lesson free
                </span>
                <p className="text-xs text-gray-500">
                  Offer a free trial lesson to attract more students
                </p>
              </div>
            </label>
          </div>
        )}

        {/* Step 4: Location */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900">
              Where are you located?
            </h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => updateForm({ city: e.target.value })}
                placeholder="e.g. New York"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                State *
              </label>
              <select
                value={form.state}
                onChange={(e) => updateForm({ state: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white"
              >
                <option value="">Select a state</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                value={form.zipCode}
                onChange={(e) => updateForm({ zipCode: e.target.value })}
                placeholder="e.g. 10001"
                maxLength={10}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-1.5 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="size-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:from-blue-700 hover:to-indigo-700"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition-all hover:shadow-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
              {loading ? "Creating..." : "Create Profile"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
