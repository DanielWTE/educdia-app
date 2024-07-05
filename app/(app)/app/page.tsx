"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/elements/Loader";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    window.location.href = `/app/overview`;
  }, [router]);
  return (
    <div className="flex items-center justify-center h-screen">
      <PageLoader text="Leite weiter..." />
    </div>
  );
}
