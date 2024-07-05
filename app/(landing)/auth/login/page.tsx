import type { Metadata } from "next";
import LoginComponent from "@/components/auth/LoginComp";

export const metadata: Metadata = {
  title: "Educdia : Login",
};

export default function Login() {
  return (
    <main className="flex flex-col min-h-screen container mx-auto p-4">
      <LoginComponent />
    </main>
  );
}
