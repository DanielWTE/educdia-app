import type { Metadata } from "next";
import SignUpComponent from "@/components/auth/SignUpComp";

export const metadata: Metadata = {
  title: "Educdia : Registrieren",
};

export default function SignUp() {
  return (
    <main className="flex flex-col min-h-screen container mx-auto p-4">
      <SignUpComponent />
    </main>
  );
}
