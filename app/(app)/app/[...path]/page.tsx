"use client";

import { lazy, useEffect, useState, Suspense, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/outline";
import { PageLoader } from "@/components/elements/Loader";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LayoutDesktop from "@/components/app/layout/DesktopComp";
import LayoutMobile from "@/components/app/layout/MobileComp";
import { Disclosure } from "@headlessui/react";

const OverviewPage = lazy(() => import("@/subpages/app/overview"));

const PageContent = ({ path, user }: { path: string; user: any }) => {
  switch (path[0]) {
    case "overview":
      return <OverviewPage user={user} />;
    default:
      return <OverviewPage user={user} />;
  }
};

const MainPage = ({ params }: { params: { path: string } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated, user } = useKindeBrowserClient();
  const [validPath, setValidPath] = useState(true);

  const navigation = useMemo(
    () => [
      {
        name: "Übersicht",
        href: "/app/overview",
        icon: HomeIcon,
        current: pathname === "/app/overview",
      }
    ],
    [pathname]
  );

  useEffect(() => {
    const validRootPaths = ["overview"];
    if (!validRootPaths.includes(params.path[0])) {
      setValidPath(false);
      router.push("/app/overview");
    } else {
      setValidPath(true);
    }
  }, [params.path, router]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (!validPath) {
    return null;
  }

  return (
    <div className="min-h-full">
      {isAuthenticated && user ? (
        <>
          <Disclosure as="nav" className="bg-white shadow-sm">
            <LayoutDesktop navigation={navigation} user={user} />
            <LayoutMobile navigation={navigation} user={user} />
          </Disclosure>
          <div className="py-10">
            <header>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                  Deine {navigation.find((nav) => nav.current)?.name}
                </h1>
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <Suspense>
                  <PageContent path={params.path} user={user} />
                </Suspense>
              </div>
            </main>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <PageLoader text="Lade Daten..." />
        </div>
      )}
    </div>
  );
};

export default MainPage;
