import { getRequiredSession } from "@/lib/auth-helpers";
import { TutorRegistrationForm } from "@/components/tutor-registration-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register as a Tutor",
  description:
    "Create your tutor profile on TutorUSA and start teaching students across America.",
};

export default async function TutorRegisterPage() {
  await getRequiredSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Tutor Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Fill in your details to start connecting with students
          </p>
        </div>
        <TutorRegistrationForm />
      </div>
    </div>
  );
}
