"use client";

import Image from "next/image";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function StartComponent() {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <>
      {/* Header and hero section */}
      <div className="bg-slate-100 flex flex-col">
        <header className="absolute inset-x-0 top-0 z-50">
          <div className="mx-auto max-w-7xl">
            <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
              <nav
                className="flex items-center justify-between lg:justify-start"
                aria-label="Global"
              ></nav>
            </div>
          </div>
        </header>

        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
              <svg
                className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-slate-100 lg:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="0,0 90,0 50,100 0,100" />
              </svg>

              <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    <span className="block text-blue-600">Educdia</span>
                    <span className="block">Die Plattform für</span>
                    <span className="block">digitale Kurse</span>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Educdia ist eine Plattform, die dir zugriff auf eine
                    Vielzahl von digitalen Kursen bietet.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    {!isAuthenticated ? (
                      <>
                        <Link
                          href="/auth/signup"
                          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                          Registrieren
                        </Link>
                        <Link
                          href="/auth/login"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Einloggen
                        </Link>
                      </>
                    ) : (
                      <Link
                        href="/app/overview"
                        className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Zum Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              className="aspect-[3/2] object-cover w-full h-full lg:absolute lg:inset-0 lg:w-full lg:h-full lg:object-cover lg:object-center"
              width={1920}
              height={1280}
              src="/startimage.avif"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
