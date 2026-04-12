"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  GraduationCap,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  User,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "/tutors", label: "Find Tutors" },
  { href: "/subjects", label: "Subjects" },
  { href: "/become-tutor", label: "Become a Tutor" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-600/20 group-hover:shadow-lg group-hover:shadow-blue-600/30 transition-shadow">
            <GraduationCap className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Tutor<span className="text-blue-600">USA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-6 bg-gray-200 mx-2" />

          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden lg:inline">
                  {session.user.name?.split(" ")[0]}
                </span>
                <ChevronDown className="size-3.5 text-gray-400" />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    {session.user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard className="size-4 text-gray-400" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/become-tutor"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="size-4 text-gray-400" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:text-gray-900 hover:bg-gray-50"
              >
                <LogIn className="size-4" />
                Log In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:from-blue-700 hover:to-indigo-700"
              >
                <UserPlus className="size-4" />
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in-up">
          <nav className="flex flex-col px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-colors hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-gray-100" />

            {session ? (
              <>
                <div className="px-4 py-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                {session.user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="size-5 text-gray-400" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 px-4 py-3 text-base font-medium text-red-600 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="size-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="size-4" />
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  <UserPlus className="size-4" />
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
