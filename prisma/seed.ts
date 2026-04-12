import { PrismaClient } from "@prisma/client";
import subjectsData from "../src/data/subjects.json";
import citiesData from "../src/data/cities.json";

const prisma = new PrismaClient();

// ── Name pools ──────────────────────────────────────────────────────────────

const firstNames = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
  "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Christopher", "Karen", "Charles", "Lisa", "Daniel", "Nancy",
  "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Steven", "Ashley",
  "Andrew", "Dorothy", "Paul", "Kimberly", "Joshua", "Emily", "Kenneth", "Donna",
  "Kevin", "Michelle", "Brian", "Carol", "George", "Amanda", "Timothy", "Melissa",
  "Ronald", "Deborah", "Jason", "Stephanie", "Edward", "Rebecca", "Ryan", "Sharon",
  "Jacob", "Laura", "Gary", "Cynthia", "Nicholas", "Kathleen", "Eric", "Amy",
  "Jonathan", "Angela", "Stephen", "Shirley", "Larry", "Brenda", "Justin", "Emma",
  "Scott", "Anna", "Brandon", "Pamela", "Benjamin", "Nicole", "Samuel", "Helen",
  "Raymond", "Samantha", "Gregory", "Katherine", "Frank", "Christine", "Alexander", "Debra",
  "Patrick", "Rachel", "Jack", "Carolyn", "Dennis", "Janet", "Jerry", "Catherine",
  "Tyler", "Maria", "Aaron", "Heather", "Jose", "Diane", "Nathan", "Ruth",
  "Adam", "Julie", "Henry", "Olivia", "Douglas", "Joyce", "Peter", "Virginia",
  "Zachary", "Victoria", "Kyle", "Kelly", "Noah", "Lauren", "Ethan", "Christina",
  "Jeremy", "Joan", "Walter", "Evelyn", "Christian", "Judith", "Keith", "Megan",
  "Roger", "Andrea", "Terry", "Cheryl", "Austin", "Hannah", "Sean", "Jacqueline",
  "Gerald", "Martha", "Carl", "Gloria", "Dylan", "Teresa", "Harold", "Ann",
  "Jordan", "Sara", "Jesse", "Madison", "Bryan", "Frances", "Lawrence", "Kathryn",
  "Arthur", "Janice", "Gabriel", "Jean", "Bruce", "Abigail", "Albert", "Alice",
  "Willie", "Judy", "Alan", "Sophia", "Wayne", "Grace", "Elijah", "Denise",
  "Randy", "Amber", "Philip", "Doris", "Vincent", "Marilyn", "Bobby", "Danielle",
  "Johnny", "Beverly", "Howard", "Isabella", "Eugene", "Theresa", "Russell", "Diana",
  "Roy", "Natalie", "Louis", "Brittany", "Russell", "Charlotte", "Ralph", "Marie",
  "Harry", "Kayla", "Mason", "Alexis", "Liam", "Lori",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
  "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill",
  "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell",
  "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner", "Diaz",
  "Parker", "Cruz", "Edwards", "Collins", "Reyes", "Stewart", "Morris", "Morales",
  "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper", "Peterson",
  "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward",
  "Richardson", "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray",
  "Mendoza", "Ruiz", "Hughes", "Price", "Alvarez", "Castillo", "Sanders", "Patel",
  "Myers", "Long", "Ross", "Foster", "Jimenez", "Powell", "Jenkins", "Perry",
  "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes", "Gonzales",
  "Fisher", "Vasquez", "Simmons", "Griffin", "McDaniel", "Wallace", "Mason", "Spencer",
];

const educationLevels = [
  "Bachelor's in Education",
  "Bachelor's in Mathematics",
  "Bachelor's in English",
  "Bachelor's in Science",
  "Bachelor's in Computer Science",
  "Bachelor's in Music",
  "Bachelor's in Fine Arts",
  "Bachelor's in Psychology",
  "Bachelor's in History",
  "Master's in Education",
  "Master's in Mathematics",
  "Master's in English Literature",
  "Master's in Physics",
  "Master's in Computer Science",
  "Master's in Music Performance",
  "Master's in Business Administration",
  "Master's in Psychology",
  "Ph.D. in Education",
  "Ph.D. in Mathematics",
  "Ph.D. in Chemistry",
  "Ph.D. in Physics",
  "Ph.D. in Computer Science",
  "Ph.D. in English",
  "Ph.D. in Psychology",
];

const levels = ["ELEMENTARY", "MIDDLE_SCHOOL", "HIGH_SCHOOL", "COLLEGE", "ADULT"] as const;

const reviewComments: Record<number, string[]> = {
  5: [
    "Absolutely fantastic tutor! My grades improved significantly after just a few sessions.",
    "Best tutor I've ever had. Explains concepts clearly and is very patient.",
    "Highly recommend! Made the subject so much easier to understand.",
    "Incredible teacher. My child went from a C to an A in just two months.",
    "Worth every penny. Knowledgeable, prepared, and genuinely cares about student success.",
    "Outstanding tutor who goes above and beyond. Always comes prepared with great materials.",
    "Transformed my understanding of the subject. I actually enjoy studying now!",
    "Could not have passed my exam without this tutor. Life saver!",
    "The most dedicated tutor I've worked with. Always available for questions between sessions.",
    "My daughter loves her sessions. She went from dreading homework to actually enjoying it.",
    "Five stars isn't enough. This tutor is simply the best in the area.",
    "Professional, knowledgeable, and incredibly patient. A perfect tutor.",
    "Made complex topics feel simple. I gained so much confidence in the subject.",
    "Exceeded all expectations. My son's test scores improved dramatically.",
    "A truly gifted educator. I wish all teachers were this effective.",
  ],
  4: [
    "Great tutor with solid knowledge of the subject. Very helpful overall.",
    "Really good sessions. I learned a lot and feel much more confident.",
    "Very knowledgeable and patient. Would recommend to anyone needing help.",
    "Good tutor who explains things well. Scheduling was sometimes tricky.",
    "Solid tutoring experience. My grades have definitely improved.",
    "Helpful and well-prepared. A bit fast-paced at times but overall very good.",
    "Very professional and knowledgeable. I've seen real improvement in my work.",
    "Great experience overall. My child really enjoys the sessions.",
    "Strong understanding of the material and good at explaining concepts.",
    "Dependable and effective. Has helped me build a strong foundation.",
    "Very satisfied with the tutoring. Would recommend to friends.",
    "Good communicator and clearly passionate about teaching.",
    "I've improved a full letter grade since starting sessions.",
    "Excellent at breaking down difficult topics. Minor scheduling issues.",
    "Really helped me prepare for my exam. Feel much more confident now.",
  ],
  3: [
    "Decent tutor. Knows the material but sessions could be more structured.",
    "Okay experience. Some sessions were great, others felt a bit unfocused.",
    "Knowledgeable but could improve on teaching methods for my learning style.",
    "Average tutoring experience. Got some help but expected a bit more.",
    "Met my basic needs but I was hoping for more in-depth explanations.",
    "Fine for the price. Not the best I've had but certainly not the worst.",
    "Has good knowledge but sometimes rushes through complex topics.",
    "Helpful enough to get me through the course, but nothing exceptional.",
    "Decent experience overall. Would be great with more personalized attention.",
    "Satisfactory tutoring. The basics were covered well.",
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomElements<T>(arr: T[], min: number, max: number): T[] {
  const count = randomInt(min, max);
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

function toSlug(first: string, last: string, index: number): string {
  const base = `${first}-${last}`.toLowerCase().replace(/[^a-z0-9-]/g, "");
  return index > 0 ? `${base}-${index}` : base;
}

let idCounter = 0;
function generateId(): string {
  idCounter++;
  const timestamp = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${rand}${idCounter.toString(36).padStart(4, "0")}`;
}

function generateBio(name: string, subjectNames: string[], experience: number): string {
  const templates = [
    `Hi, I'm ${name}! With ${experience} years of teaching experience, I specialize in ${subjectNames.join(" and ")}. I'm passionate about helping students build confidence and achieve their academic goals.`,
    `I'm ${name}, a dedicated tutor with ${experience} years of experience in ${subjectNames.join(", ")}. My approach focuses on understanding each student's unique learning style and adapting my teaching methods accordingly.`,
    `Hello! I'm ${name} and I've been tutoring ${subjectNames.join(" and ")} for ${experience} years. I believe every student can succeed with the right guidance, and I love seeing those lightbulb moments.`,
    `${name} here! I bring ${experience} years of hands-on teaching experience in ${subjectNames.join(", ")}. Whether you're struggling with the basics or looking to excel, I can help you reach your goals.`,
    `As a ${subjectNames[0]} specialist with ${experience} years of experience, I (${name}) am committed to making learning engaging and effective. I tailor my sessions to match each student's pace and goals.`,
    `I'm ${name}, and I've spent ${experience} years helping students master ${subjectNames.join(" and ")}. My students consistently improve their grades and develop a genuine love for learning.`,
    `With ${experience} years in education, I'm ${name}, and I know what it takes to help students succeed in ${subjectNames.join(", ")}. My patient, step-by-step approach makes complex topics accessible.`,
    `Hi there! I'm ${name}. Over the past ${experience} years, I've helped hundreds of students excel in ${subjectNames.join(" and ")}. I focus on building strong foundations that last.`,
  ];
  return randomElement(templates);
}

function generateHeadline(subjectNames: string[]): string {
  const templates = [
    `Experienced ${subjectNames[0]} Tutor`,
    `${subjectNames[0]} & ${subjectNames.length > 1 ? subjectNames[1] : "More"} Specialist`,
    `Passionate ${subjectNames[0]} Educator`,
    `Expert ${subjectNames[0]} Tutor | Patient & Effective`,
    `Dedicated ${subjectNames[0]} Teacher`,
    `${subjectNames[0]} Tutor | Helping Students Succeed`,
    `Professional ${subjectNames[0]} Instructor`,
    `Certified ${subjectNames[0]} Tutor with Proven Results`,
  ];
  return randomElement(templates);
}

// ── Main seed ────────────────────────────────────────────────────────────────

interface SubjectJson {
  name: string;
  slug: string;
  category: string;
  icon: string;
  description: string;
}

interface CityJson {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
  stateCode: string;
  population: number;
  latitude: number;
  longitude: number;
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await prisma.review.deleteMany();
  await prisma.tutorLevel.deleteMany();
  await prisma.tutorSubject.deleteMany();
  await prisma.tutor.deleteMany();
  await prisma.user.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.city.deleteMany();

  // ── Seed subjects ───────────────────────────────────────────────────────
  console.log("Creating subjects...");
  const subjects = await Promise.all(
    (subjectsData as SubjectJson[]).map((s) =>
      prisma.subject.create({
        data: {
          id: generateId(),
          name: s.name,
          slug: s.slug,
          category: s.category,
          icon: s.icon,
          description: s.description,
        },
      })
    )
  );
  console.log(`Created ${subjects.length} subjects.`);

  // ── Seed cities ─────────────────────────────────────────────────────────
  console.log("Creating cities...");
  const cities = await Promise.all(
    (citiesData as CityJson[]).map((c) =>
      prisma.city.create({
        data: {
          id: generateId(),
          name: c.name,
          slug: c.slug,
          state: c.state,
          stateSlug: c.stateSlug,
          stateCode: c.stateCode,
          population: c.population,
          latitude: c.latitude,
          longitude: c.longitude,
        },
      })
    )
  );
  console.log(`Created ${cities.length} cities.`);

  // ── Seed tutors ─────────────────────────────────────────────────────────
  console.log("Creating tutors...");
  const slugSet = new Set<string>();
  const tutorCount = 220;
  const tutorRecords: Array<{ id: string; subjectNames: string[] }> = [];

  for (let i = 0; i < tutorCount; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const fullName = `${firstName} ${lastName}`;

    // Ensure unique slug
    let slug = toSlug(firstName, lastName, 0);
    let slugSuffix = 1;
    while (slugSet.has(slug)) {
      slug = toSlug(firstName, lastName, slugSuffix);
      slugSuffix++;
    }
    slugSet.add(slug);

    const city = randomElement(cities);
    const tutorSubjects = randomElements(subjects, 1, 4);
    const tutorLevels = randomElements([...levels], 1, 3);
    const experience = randomInt(1, 15);
    const hourlyRate = randomInt(20, 80);
    const subjectNames = tutorSubjects.map((s) => s.name);

    const email = `${slug}@example.com`;
    const userId = generateId();
    const tutorId = generateId();

    // Create User
    await prisma.user.create({
      data: {
        id: userId,
        name: fullName,
        email,
        role: "TUTOR",
        image: null,
      },
    });

    // Create Tutor
    await prisma.tutor.create({
      data: {
        id: tutorId,
        userId,
        slug,
        headline: generateHeadline(subjectNames),
        bio: generateBio(fullName, subjectNames, experience),
        hourlyRate,
        experience,
        education: randomElement(educationLevels),
        city: city.name,
        state: city.state,
        zipCode: String(randomInt(10000, 99999)),
        latitude: city.latitude + (Math.random() - 0.5) * 0.1,
        longitude: city.longitude + (Math.random() - 0.5) * 0.1,
        isOnline: Math.random() > 0.2,
        isInPerson: Math.random() > 0.4,
        firstLessonFree: Math.random() > 0.6,
        verified: Math.random() > 0.3,
        responseTime: randomInt(1, 48),
        subjects: {
          create: tutorSubjects.map((s) => ({
            subjectId: s.id,
          })),
        },
        levels: {
          create: tutorLevels.map((level) => ({
            id: generateId(),
            level,
          })),
        },
      },
    });

    tutorRecords.push({ id: tutorId, subjectNames });

    if ((i + 1) % 50 === 0) {
      console.log(`  Created ${i + 1}/${tutorCount} tutors...`);
    }
  }
  console.log(`Created ${tutorCount} tutors.`);

  // ── Seed reviews ────────────────────────────────────────────────────────
  console.log("Creating reviews...");
  const reviewCount = 550;
  const reviewerIds: string[] = [];

  // Create reviewer users
  for (let i = 0; i < 150; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const reviewerId = generateId();
    await prisma.user.create({
      data: {
        id: reviewerId,
        name: `${firstName} ${lastName}`,
        email: `reviewer-${i}-${reviewerId.slice(-6)}@example.com`,
        role: "STUDENT",
      },
    });
    reviewerIds.push(reviewerId);
  }

  for (let i = 0; i < reviewCount; i++) {
    const tutor = randomElement(tutorRecords);
    const reviewer = randomElement(reviewerIds);
    // Weighted towards higher ratings
    const ratingRoll = Math.random();
    const rating = ratingRoll < 0.5 ? 5 : ratingRoll < 0.8 ? 4 : 3;
    const comment = randomElement(reviewComments[rating]);

    await prisma.review.create({
      data: {
        id: generateId(),
        rating,
        comment,
        tutorId: tutor.id,
        userId: reviewer,
        createdAt: new Date(
          Date.now() - randomInt(1, 365) * 24 * 60 * 60 * 1000
        ),
      },
    });

    if ((i + 1) % 100 === 0) {
      console.log(`  Created ${i + 1}/${reviewCount} reviews...`);
    }
  }
  console.log(`Created ${reviewCount} reviews.`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
