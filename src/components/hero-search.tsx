"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Users, BookOpen, MapPin, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [city, setCity] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const subjectSlug = subject.trim().toLowerCase().replace(/\s+/g, "-");
    const citySlug = city.trim().toLowerCase().replace(/\s+/g, "-");

    if (subjectSlug && citySlug) {
      router.push(`/tutors/${subjectSlug}/${citySlug}`);
    } else if (subjectSlug) {
      router.push(`/tutors/${subjectSlug}`);
    } else {
      router.push("/tutors");
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 py-24 text-white md:py-32">
      {/* Abstract pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating decorative shapes */}
      <div className="absolute -left-20 -top-20 size-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute left-1/2 top-20 size-48 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-2xl" />
      <div className="absolute bottom-20 left-10 size-24 rotate-45 rounded-2xl bg-white/5" />
      <div className="absolute right-20 top-32 size-16 rotate-12 rounded-xl bg-white/5" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Find the Perfect Tutor
            </span>
            <br />
            <span className="text-white">Near You</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 md:text-xl">
            Connect with 10,000+ verified tutors across the USA. Personalized
            learning that fits your schedule and goals.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur-sm"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <BookOpen className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Subject (e.g. Math, English)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-12 border-0 bg-transparent pl-11 text-base text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="hidden h-8 w-px bg-gray-200 sm:block" />
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="City (e.g. New York)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 border-0 bg-transparent pl-11 text-base text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-xl bg-blue-600 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
            >
              <Search className="mr-2 size-5" />
              Search
            </Button>
          </div>
        </form>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-sm">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/20">
              <Users className="size-4" />
            </div>
            <span className="text-sm font-semibold sm:text-base">
              10,000+ Tutors
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-sm">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/20">
              <BookOpen className="size-4" />
            </div>
            <span className="text-sm font-semibold sm:text-base">
              500+ Subjects
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-sm">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/20">
              <Award className="size-4" />
            </div>
            <span className="text-sm font-semibold sm:text-base">
              50 States
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
