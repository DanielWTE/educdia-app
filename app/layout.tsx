import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Educdia : Online Kurse",
  description: "Educdia bietet verschiedene gratis Online Kurse an.",
  keywords: "LAP, Fachgespräch, Applikationsentwicklung, Coding, Prüfung, Vorbereitung, Kurs, gratis, kostenlos, österreich, berufsschule, lehre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="top-right"
        />
        {children}
      </body>
    </html>
  );
}
