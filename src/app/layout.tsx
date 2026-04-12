import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TutorSync - Find the Best Tutors Near You",
    template: "%s | TutorSync",
  },
  description:
    "Connect with 10,000+ verified tutors across the USA. Find expert tutoring in math, science, languages, music, test prep, and more. First lesson free.",
  keywords: [
    "tutoring",
    "tutor",
    "private tutor",
    "online tutoring",
    "math tutor",
    "science tutor",
    "SAT prep",
    "tutoring near me",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TutorSync",
    title: "TutorSync - Find the Best Tutors Near You",
    description:
      "Connect with 10,000+ verified tutors across the USA. Expert tutoring in 200+ subjects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorSync - Find the Best Tutors Near You",
    description:
      "Connect with 10,000+ verified tutors across the USA. Expert tutoring in 200+ subjects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
