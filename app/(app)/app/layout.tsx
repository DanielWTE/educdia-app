import Footer from "@/components/Footer";
import "../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educdia : Dashboard",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex flex-col min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
