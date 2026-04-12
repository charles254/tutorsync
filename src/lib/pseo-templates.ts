// ── PSEO Content Template Engine ─────────────────────────────────────────────
// Generates programmatic SEO content for subject + city landing pages.

interface PageVariables {
  subject: string;
  city: string;
  state: string;
  stateCode?: string;
  tutorCount: number;
  avgPrice: number;
}

// ── Page Titles ──────────────────────────────────────────────────────────────

const titleTemplates = [
  (v: PageVariables) =>
    `Best ${v.subject} Tutors in ${v.city}, ${v.state}`,
  (v: PageVariables) =>
    `${v.subject} Tutoring in ${v.city} - Find Your Perfect Tutor`,
  (v: PageVariables) =>
    `Top ${v.subject} Tutors in ${v.city}, ${v.stateCode ?? v.state}`,
  (v: PageVariables) =>
    `Find ${v.subject} Tutors Near You in ${v.city}, ${v.state}`,
  (v: PageVariables) =>
    `${v.city} ${v.subject} Tutors - Expert Help Available Now`,
  (v: PageVariables) =>
    `${v.subject} Tutoring Services in ${v.city}, ${v.state}`,
  (v: PageVariables) =>
    `Affordable ${v.subject} Tutors in ${v.city} | Verified Experts`,
  (v: PageVariables) =>
    `Private ${v.subject} Tutoring in ${v.city}, ${v.state}`,
];

/**
 * Returns a page title for the subject+city combination.
 * Pass a variant index (0-based) to select a specific template,
 * or omit for a deterministic pick based on the subject+city hash.
 */
export function getPageTitle(
  vars: PageVariables,
  variant?: number
): string {
  const idx =
    variant !== undefined
      ? variant % titleTemplates.length
      : simpleHash(vars.subject + vars.city) % titleTemplates.length;
  return titleTemplates[idx](vars);
}

// ── Intro Paragraphs ─────────────────────────────────────────────────────────

const introTemplates = [
  (v: PageVariables) =>
    `Looking for expert ${v.subject} tutoring in ${v.city}, ${v.state}? You've come to the right place. We connect students with ${v.tutorCount} qualified ${v.subject} tutors in the ${v.city} area, with rates starting at around $${v.avgPrice}/hour.`,

  (v: PageVariables) =>
    `Whether you're a beginner or looking to master advanced concepts, our ${v.tutorCount} ${v.subject} tutors in ${v.city} are ready to help. Each tutor is carefully vetted and brings real-world expertise to every session.`,

  (v: PageVariables) =>
    `Finding the right ${v.subject} tutor in ${v.city}, ${v.state} doesn't have to be difficult. Browse our directory of ${v.tutorCount} local tutors, read reviews from real students, and book your first session today.`,

  (v: PageVariables) =>
    `${v.city} students deserve the best ${v.subject} instruction available. Our platform features ${v.tutorCount} experienced tutors offering personalized one-on-one sessions, with an average rate of $${v.avgPrice}/hour.`,

  (v: PageVariables) =>
    `Get ahead in ${v.subject} with private tutoring in ${v.city}. Our network of ${v.tutorCount} tutors offers flexible scheduling, online and in-person options, and proven teaching methods that deliver results.`,

  (v: PageVariables) =>
    `Struggling with ${v.subject}? ${v.city}'s top-rated tutors are here to help. With ${v.tutorCount} tutors available and prices averaging $${v.avgPrice}/hour, you'll find the perfect match for your learning goals.`,

  (v: PageVariables) =>
    `Join thousands of students in ${v.city} who have improved their ${v.subject} skills with personalized tutoring. Our ${v.tutorCount} local tutors are ready to help you succeed, whether you need homework help or exam preparation.`,

  (v: PageVariables) =>
    `Take your ${v.subject} skills to the next level with a private tutor in ${v.city}, ${v.state}. Our tutors have an average of 5+ years of teaching experience and are committed to helping you achieve your academic goals.`,

  (v: PageVariables) =>
    `Need ${v.subject} help in ${v.city}? Our verified tutors offer personalized lesson plans, flexible scheduling, and both online and in-person sessions. Browse ${v.tutorCount} tutors and find the right fit for you.`,

  (v: PageVariables) =>
    `Unlock your potential in ${v.subject} with the guidance of an experienced tutor in ${v.city}. From elementary to college-level instruction, our ${v.tutorCount} tutors cover all skill levels at rates averaging $${v.avgPrice}/hour.`,

  (v: PageVariables) =>
    `The best ${v.subject} tutors in ${v.city}, ${v.state} are just a click away. Compare profiles, read student reviews, and book a session with one of our ${v.tutorCount} available tutors today.`,

  (v: PageVariables) =>
    `Personalized ${v.subject} tutoring makes all the difference. In ${v.city}, we have ${v.tutorCount} tutors who tailor their teaching to your specific needs, helping you build confidence and master the material.`,
];

/**
 * Returns 2-3 intro paragraphs assembled from templates.
 */
export function getIntroText(vars: PageVariables): string[] {
  const hash = simpleHash(vars.subject + vars.city);
  const count = 2 + (hash % 2); // 2 or 3 paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (hash + i * 3) % introTemplates.length;
    paragraphs.push(introTemplates[idx](vars));
  }
  return paragraphs;
}

// ── FAQ Generation ───────────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
}

const faqTemplates: Array<(v: PageVariables) => FAQ> = [
  (v) => ({
    question: `How much does a ${v.subject} tutor cost in ${v.city}?`,
    answer: `${v.subject} tutoring rates in ${v.city} typically range from $20 to $80 per hour, with an average rate of $${v.avgPrice}/hour. Rates vary based on the tutor's experience, qualifications, and the complexity of the subject matter.`,
  }),
  (v) => ({
    question: `Where can I find ${v.subject} tutoring in ${v.city}, ${v.state}?`,
    answer: `You can find ${v.tutorCount} ${v.subject} tutors in ${v.city} right here on TutorSync. Browse tutor profiles, read student reviews, and book sessions online. Many tutors offer both in-person and online sessions for maximum flexibility.`,
  }),
  (v) => ({
    question: `How do I choose the best ${v.subject} tutor in ${v.city}?`,
    answer: `When choosing a ${v.subject} tutor in ${v.city}, consider their experience, student reviews, teaching style, and availability. We recommend reading reviews from other students, checking their qualifications, and booking a trial session to see if the tutor is a good fit.`,
  }),
  (v) => ({
    question: `Do ${v.subject} tutors in ${v.city} offer online sessions?`,
    answer: `Yes, many ${v.subject} tutors in ${v.city} offer online tutoring sessions via video call. This gives you the flexibility to learn from home while still receiving personalized one-on-one instruction. Filter for online tutors when browsing our directory.`,
  }),
  (v) => ({
    question: `What levels of ${v.subject} tutoring are available in ${v.city}?`,
    answer: `Our ${v.city} ${v.subject} tutors cover all levels, from elementary through college and adult education. Whether you need help with basic concepts, AP exam preparation, or college-level coursework, you'll find a qualified tutor to match your needs.`,
  }),
  (v) => ({
    question: `Can I get a free trial ${v.subject} lesson in ${v.city}?`,
    answer: `Many ${v.subject} tutors in ${v.city} offer a free first lesson so you can see if they're the right fit. Look for the "First Lesson Free" badge on tutor profiles when browsing our directory.`,
  }),
  (v) => ({
    question: `How quickly can I start ${v.subject} tutoring in ${v.city}?`,
    answer: `Most ${v.subject} tutors in ${v.city} respond within 24 hours and can schedule your first session within a few days. Some tutors are available for same-day sessions. Check individual tutor profiles for their response times and availability.`,
  }),
  (v) => ({
    question: `Are ${v.subject} tutors in ${v.city} qualified?`,
    answer: `All ${v.subject} tutors on TutorSync in ${v.city} have verified qualifications and experience. Many hold advanced degrees in their subject area and have years of professional teaching experience. Student reviews and ratings help you evaluate each tutor's effectiveness.`,
  }),
];

/**
 * Returns 5-6 FAQs specific to the subject+city combination.
 */
export function getFAQs(vars: PageVariables): FAQ[] {
  const hash = simpleHash(vars.subject + vars.city);
  const count = 5 + (hash % 2); // 5 or 6
  const faqs: FAQ[] = [];
  const used = new Set<number>();

  // Always include the first two (price + location)
  faqs.push(faqTemplates[0](vars));
  faqs.push(faqTemplates[1](vars));
  used.add(0);
  used.add(1);

  // Fill remaining from the pool
  for (let i = 0; faqs.length < count; i++) {
    const idx = (hash + i * 7) % faqTemplates.length;
    if (!used.has(idx)) {
      faqs.push(faqTemplates[idx](vars));
      used.add(idx);
    }
  }

  return faqs;
}

// ── Related Subjects ─────────────────────────────────────────────────────────

const subjectRelations: Record<string, string[]> = {
  // Academic / Math
  math: ["algebra", "calculus", "geometry", "statistics", "trigonometry"],
  algebra: ["math", "pre-calculus", "geometry", "calculus", "trigonometry"],
  calculus: ["math", "algebra", "pre-calculus", "physics", "statistics"],
  geometry: ["math", "algebra", "trigonometry", "pre-calculus", "physics"],
  statistics: ["math", "data-science", "calculus", "economics", "python"],
  trigonometry: ["math", "algebra", "geometry", "pre-calculus", "calculus"],
  "pre-calculus": ["math", "algebra", "calculus", "trigonometry", "geometry"],
  // Science
  physics: ["math", "calculus", "chemistry", "engineering", "statistics"],
  chemistry: ["biology", "physics", "math", "anatomy", "environmental-science"],
  biology: ["chemistry", "anatomy", "environmental-science", "earth-science", "physics"],
  "earth-science": ["biology", "environmental-science", "chemistry", "geography", "physics"],
  "environmental-science": ["biology", "earth-science", "chemistry", "geography", "ecology"],
  anatomy: ["biology", "chemistry", "nursing", "medical-terminology", "nutrition"],
  // Language Arts
  english: ["writing", "reading", "literature", "grammar", "essay-writing"],
  writing: ["english", "creative-writing", "essay-writing", "grammar", "reading"],
  reading: ["english", "writing", "literature", "grammar", "esl"],
  literature: ["english", "writing", "reading", "creative-writing", "history"],
  grammar: ["english", "writing", "reading", "esl", "essay-writing"],
  "creative-writing": ["writing", "english", "literature", "essay-writing", "grammar"],
  // Languages
  spanish: ["french", "italian", "portuguese", "esl", "english"],
  french: ["spanish", "italian", "german", "esl", "english"],
  german: ["french", "spanish", "italian", "esl", "english"],
  "mandarin-chinese": ["japanese", "korean", "esl", "english", "spanish"],
  japanese: ["mandarin-chinese", "korean", "esl", "english", "spanish"],
  italian: ["spanish", "french", "portuguese", "german", "esl"],
  portuguese: ["spanish", "italian", "french", "esl", "english"],
  korean: ["japanese", "mandarin-chinese", "esl", "english", "spanish"],
  arabic: ["esl", "french", "spanish", "english", "mandarin-chinese"],
  asl: ["esl", "english", "special-education", "reading", "writing"],
  esl: ["english", "grammar", "reading", "writing", "toefl-prep"],
  // Social Studies
  history: ["us-history", "world-history", "government", "geography", "economics"],
  "us-history": ["history", "world-history", "government", "economics", "geography"],
  "world-history": ["history", "us-history", "geography", "government", "philosophy"],
  government: ["history", "us-history", "economics", "philosophy", "sociology"],
  economics: ["finance", "statistics", "accounting", "business-management", "math"],
  psychology: ["sociology", "biology", "philosophy", "special-education", "adhd-coaching"],
  sociology: ["psychology", "philosophy", "history", "government", "economics"],
  geography: ["history", "earth-science", "world-history", "environmental-science", "government"],
  philosophy: ["history", "sociology", "psychology", "literature", "government"],
  // Technology
  "computer-science": ["python", "java", "javascript", "data-science", "web-development"],
  python: ["computer-science", "data-science", "machine-learning", "java", "javascript"],
  java: ["computer-science", "python", "javascript", "web-development", "data-science"],
  javascript: ["web-development", "computer-science", "python", "java", "graphic-design"],
  "web-development": ["javascript", "computer-science", "python", "graphic-design", "java"],
  "data-science": ["python", "statistics", "machine-learning", "computer-science", "math"],
  cybersecurity: ["computer-science", "python", "web-development", "java", "data-science"],
  "machine-learning": ["python", "data-science", "statistics", "computer-science", "math"],
  // Test Prep
  "sat-prep": ["act-prep", "math", "english", "writing", "reading"],
  "act-prep": ["sat-prep", "math", "english", "writing", "reading"],
  "gre-prep": ["sat-prep", "math", "writing", "english", "statistics"],
  "gmat-prep": ["gre-prep", "math", "statistics", "finance", "economics"],
  "lsat-prep": ["gre-prep", "reading", "writing", "philosophy", "government"],
  "mcat-prep": ["biology", "chemistry", "physics", "anatomy", "gre-prep"],
  "ap-exam-prep": ["sat-prep", "act-prep", "math", "english", "history"],
  "toefl-prep": ["ielts-prep", "esl", "english", "grammar", "writing"],
  "ielts-prep": ["toefl-prep", "esl", "english", "grammar", "writing"],
  // Music
  piano: ["guitar", "music-theory", "violin", "voice", "saxophone"],
  guitar: ["piano", "music-theory", "drums", "voice", "saxophone"],
  violin: ["piano", "music-theory", "flute", "voice", "guitar"],
  voice: ["piano", "guitar", "music-theory", "acting", "drums"],
  drums: ["guitar", "music-theory", "piano", "saxophone", "voice"],
  "music-theory": ["piano", "guitar", "violin", "voice", "drums"],
  saxophone: ["music-theory", "piano", "flute", "guitar", "drums"],
  flute: ["violin", "music-theory", "piano", "saxophone", "voice"],
  // Arts
  drawing: ["painting", "graphic-design", "photography", "film-production", "acting"],
  painting: ["drawing", "graphic-design", "photography", "film-production", "acting"],
  photography: ["film-production", "graphic-design", "drawing", "painting", "acting"],
  "graphic-design": ["web-development", "drawing", "painting", "photography", "film-production"],
  acting: ["voice", "film-production", "public-speaking", "creative-writing", "dance"],
  "film-production": ["photography", "acting", "graphic-design", "creative-writing", "drawing"],
  // Fitness
  yoga: ["personal-training", "dance", "swimming", "martial-arts", "nutrition"],
  "personal-training": ["yoga", "nutrition", "swimming", "martial-arts", "dance"],
  swimming: ["personal-training", "yoga", "martial-arts", "tennis", "dance"],
  tennis: ["personal-training", "swimming", "martial-arts", "yoga", "dance"],
  "martial-arts": ["personal-training", "yoga", "swimming", "tennis", "dance"],
  dance: ["yoga", "acting", "personal-training", "music-theory", "martial-arts"],
  // Business
  accounting: ["finance", "economics", "business-management", "math", "statistics"],
  finance: ["accounting", "economics", "business-management", "math", "statistics"],
  marketing: ["business-management", "graphic-design", "public-speaking", "writing", "economics"],
  "business-management": ["marketing", "finance", "accounting", "economics", "public-speaking"],
  "public-speaking": ["acting", "business-management", "marketing", "writing", "english"],
  // Healthcare
  nursing: ["anatomy", "biology", "medical-terminology", "chemistry", "nutrition"],
  "medical-terminology": ["nursing", "anatomy", "biology", "mcat-prep", "nutrition"],
  nutrition: ["biology", "anatomy", "nursing", "personal-training", "chemistry"],
  // Special Needs
  "special-education": ["adhd-coaching", "dyslexia-support", "reading", "study-skills", "homework-help"],
  "adhd-coaching": ["special-education", "study-skills", "homework-help", "psychology", "dyslexia-support"],
  "dyslexia-support": ["special-education", "reading", "adhd-coaching", "english", "writing"],
  // Academic Support
  "study-skills": ["homework-help", "adhd-coaching", "special-education", "college-admissions", "essay-writing"],
  "homework-help": ["study-skills", "math", "english", "special-education", "adhd-coaching"],
  "college-admissions": ["essay-writing", "sat-prep", "act-prep", "study-skills", "writing"],
  "essay-writing": ["writing", "english", "creative-writing", "college-admissions", "grammar"],
};

/**
 * Returns up to 5 related subject slugs for a given subject slug.
 */
export function getRelatedSubjects(subjectSlug: string): string[] {
  return subjectRelations[subjectSlug] ?? [];
}

// ── Nearby Cities ───────────────────────────────────────────────────────────

interface CityData {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
  stateCode: string;
  population: number;
  latitude: number;
  longitude: number;
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Returns the closest cities to the given city, sorted by geographic distance.
 */
export function getNearbyCities(
  citySlug: string,
  citiesData: CityData[],
  limit = 8
): Array<{ name: string; slug: string }> {
  const currentCity = citiesData.find((c) => c.slug === citySlug);
  if (!currentCity) return [];

  return citiesData
    .filter((c) => c.slug !== citySlug)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      distance: haversineDistance(currentCity.latitude, currentCity.longitude, c.latitude, c.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ name, slug }) => ({ name, slug }));
}

// ── Meta Description ─────────────────────────────────────────────────────────

const metaDescriptionTemplates = [
  (v: PageVariables) =>
    `Find ${v.tutorCount} ${v.subject} tutors in ${v.city}, ${v.state}. Compare profiles, read reviews, and book sessions starting at $${v.avgPrice}/hr. Online & in-person options available.`,
  (v: PageVariables) =>
    `Looking for ${v.subject} help in ${v.city}? Browse ${v.tutorCount} verified tutors starting at $${v.avgPrice}/hr. Read reviews and book your first lesson.`,
  (v: PageVariables) =>
    `Top-rated ${v.subject} tutors in ${v.city}. ${v.tutorCount} tutors available with prices from $${v.avgPrice}/hr. Many offer free first lessons!`,
  (v: PageVariables) =>
    `Find your ideal ${v.subject} tutor in ${v.city}. Compare ${v.tutorCount} qualified tutors, read student reviews, and schedule lessons online or in-person.`,
  (v: PageVariables) =>
    `Need ${v.subject} tutoring in ${v.city}? ${v.tutorCount} expert tutors available. Average rate $${v.avgPrice}/hr. Verified reviews and flexible scheduling.`,
  (v: PageVariables) =>
    `${v.subject} tutoring made easy in ${v.city}. Choose from ${v.tutorCount} tutors starting at $${v.avgPrice}/hr. Book online or in-person sessions today.`,
  (v: PageVariables) =>
    `Connect with ${v.tutorCount} ${v.subject} tutors in ${v.city}. Affordable rates averaging $${v.avgPrice}/hr. First lesson free with many tutors.`,
  (v: PageVariables) =>
    `Expert ${v.subject} help in ${v.city} — ${v.tutorCount} verified tutors ready to help you succeed. Rates from $${v.avgPrice}/hr. Schedule your lesson now.`,
  (v: PageVariables) =>
    `Get ${v.subject} tutoring in ${v.city} from $${v.avgPrice}/hr. ${v.tutorCount} experienced tutors with verified reviews. Online and in-person options.`,
  (v: PageVariables) =>
    `Discover ${v.tutorCount} top ${v.subject} tutors in ${v.city}. Personalized lessons from $${v.avgPrice}/hr. Read reviews and find your perfect match.`,
];

/**
 * Returns a meta description for the subject+city page.
 */
export function getMetaDescription(vars: PageVariables): string {
  const idx =
    simpleHash(vars.subject + vars.city) % metaDescriptionTemplates.length;
  return metaDescriptionTemplates[idx](vars);
}

// ── Utility ──────────────────────────────────────────────────────────────────

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit int
  }
  return Math.abs(hash);
}
