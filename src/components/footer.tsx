"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const popularSubjects = [
  { name: "Math", slug: "math" },
  { name: "English", slug: "english" },
  { name: "Science", slug: "science" },
  { name: "Spanish", slug: "spanish" },
  { name: "SAT Prep", slug: "sat-prep" },
  { name: "Physics", slug: "physics" },
];

const topCities = [
  { name: "New York", slug: "new-york", subject: "math" },
  { name: "Los Angeles", slug: "los-angeles", subject: "spanish" },
  { name: "Chicago", slug: "chicago", subject: "english" },
  { name: "Houston", slug: "houston", subject: "physics" },
  { name: "Phoenix", slug: "phoenix", subject: "piano" },
  { name: "San Antonio", slug: "san-antonio", subject: "sat-prep" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Gradient accent line at top */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand + Newsletter */}
          <div className="col-span-2 md:col-span-1 md:pr-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-7 text-blue-400" />
              <span className="text-lg font-bold text-white">TutorSync</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Connecting students with the best tutors across America.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Popular Subjects
            </h3>
            <ul className="space-y-2.5">
              {popularSubjects.map((subject) => (
                <li key={subject.slug}>
                  <Link
                    href={`/tutors/${subject.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {subject.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Top Cities
            </h3>
            <ul className="space-y-2.5">
              {topCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/tutors/${city.subject}/${city.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Stay Updated
            </h3>
            <p className="mb-3 text-sm text-gray-400">
              Get tutoring tips and updates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex gap-2"
            >
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 border-gray-700 bg-gray-800 text-sm text-gray-200 placeholder:text-gray-500 focus-visible:ring-blue-500"
              />
              <Button
                type="submit"
                size="sm"
                className="h-10 bg-blue-600 px-3 hover:bg-blue-700"
              >
                <Send className="size-4" />
              </Button>
            </form>

            {/* Social icons placeholder */}
            <div className="mt-6 flex gap-3">
              {["X", "FB", "IG", "LI"].map((label) => (
                <span
                  key={label}
                  className="flex size-9 items-center justify-center rounded-full bg-gray-800 text-xs font-semibold text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-gray-800 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TutorSync. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with care for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
