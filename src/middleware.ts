import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(
  ip: string,
  limit = 100,
  windowMs = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.lastReset > windowMs) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= limit) return false;
  record.count++;
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Enforce HTTPS in production
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get("host")}${pathname}${request.nextUrl.search}`,
      301
    );
  }

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip, 100, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request });

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
