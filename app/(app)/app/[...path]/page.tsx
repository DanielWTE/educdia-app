"use client";

import { lazy, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/outline";
import { PageLoader } from "@/components/elements/Loader";
import LayoutHeader from "@/components/app/layout/header";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const OverviewPage = lazy(() => import("@/subpages/app/overview"));
const SettingsPage = lazy(() => import("@/subpages/app/settings"));

const PageContent = ({ path }: { path: string }) => {
  switch (path[0]) {
    case "overview":
      return <OverviewPage />;
    case "settings":
      return <SettingsPage />;
    default:
      return <OverviewPage />;
  }
};

const MainPage = ({ params }: { params: { path: string } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated, user } = useKindeBrowserClient();

  const navigation = [
    {
      name: "Übersicht",
      href: "/app/overview",
      icon: HomeIcon,
      current: pathname === "/app/overview",
    },
    {
      name: "Einstellungen",
      href: "/app/settings",
      current: pathname === "/app/settings",
    },
  ];

  useEffect(() => {
    // valid paths
    const validRootPaths = ["overview", "settings"];

    if (!validRootPaths.includes(params.path[0])) {
      // if not valid user path, redirect to user overview
      window.location.href = `/app/overview`;
    }
  }, [params.path]);

  // if bro is not authenticated after loading, redirect to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <>
      {!isLoading && isAuthenticated ? (
        <>
          <div className="min-h-full">
            <LayoutHeader navigation={navigation} user={user} />
            <div className="py-10">
              <header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                    {navigation.find((nav) => nav.current)?.name}
                  </h1>
                </div>
              </header>
              <main>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                  <PageContent path={params.path} />
                </div>
              </main>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <PageLoader text="Lade Daten..." />
        </div>
      )}
    </>
  );
};

export default MainPage;
