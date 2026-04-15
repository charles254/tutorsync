import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/lib/safe-jsonld";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Tutoring Tips & Education Resources",
  description:
    "Expert tutoring tips, study strategies, and education resources from TutorSync. Help your child succeed with our guides and articles.",
  alternates: {
    canonical: "https://tutorsync.net/blog",
  },
  openGraph: {
    title: "TutorSync Blog - Tutoring Tips & Education Resources",
    description:
      "Expert tutoring tips, study strategies, and education resources for students and parents.",
    url: "https://tutorsync.net/blog",
  },
};

const blogPosts = [
  {
    title: "How to Choose the Right Tutor for Your Child",
    excerpt: "Finding the perfect tutor can make all the difference. Here are the key factors to consider when selecting a tutor.",
    date: "April 8, 2026",
    readTime: "5 min read",
    slug: "#",
  },
  {
    title: "10 Study Habits of Successful Students",
    excerpt: "Research-backed study techniques that top students use to maximize their learning and ace their exams.",
    date: "April 2, 2026",
    readTime: "7 min read",
    slug: "#",
  },
  {
    title: "SAT Prep: A Complete Guide for Parents and Students",
    excerpt: "Everything you need to know about preparing for the SAT — from timelines to study strategies and when to get a tutor.",
    date: "March 25, 2026",
    readTime: "10 min read",
    slug: "#",
  },
  {
    title: "The Benefits of Online Tutoring vs. In-Person",
    excerpt: "Both formats have advantages. Learn which tutoring style works best for different subjects and learning needs.",
    date: "March 18, 2026",
    readTime: "6 min read",
    slug: "#",
  },
  {
    title: "How Music Lessons Boost Academic Performance",
    excerpt: "Studies show learning an instrument improves math skills, memory, and focus. Here is what the research says.",
    date: "March 10, 2026",
    readTime: "4 min read",
    slug: "#",
  },
  {
    title: "Getting Started with Python: A Beginner Parent Guide",
    excerpt: "Why coding matters for your child and how to find the right programming tutor to get them started.",
    date: "March 3, 2026",
    readTime: "8 min read",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <div className="py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          TutorSync Blog
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Expert tips, study strategies, and education resources for students and parents.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              href={post.slug}
              className="block group p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <BookOpen className="size-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TutorSync Blog",
          description:
            "Expert tutoring tips, study strategies, and education resources for students and parents.",
          url: "https://tutorsync.net/blog",
          publisher: {
            "@type": "Organization",
            name: "TutorSync",
            url: "https://tutorsync.net",
          },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: blogPosts.map((post, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                datePublished: new Date(post.date).toISOString().split("T")[0],
                image: "https://tutorsync.net/opengraph-image",
                author: {
                  "@type": "Organization",
                  name: "TutorSync",
                },
              },
            })),
          },
        }}
      />
    </div>
  );
}
