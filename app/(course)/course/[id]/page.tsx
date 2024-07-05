"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useValidateCourse } from "../../../../hooks/data/validateCourse";
import { PageLoader } from "@/components/elements/Loader";
import CourseHandlerComponent from "@/components/course/CourseHandler";
import { useSearchParams } from "next/navigation";
import { generateSessionString } from "@/utils/generator";

const MainPage = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useKindeBrowserClient();
  const { getValidateCourseData, getValidateCourseIsLoading } =
    useValidateCourse({
      courseId: params.id,
    });
  const [courseData, setCourseData] = useState<any>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!getValidateCourseIsLoading) {
      if (!getValidateCourseData.success) {
        router.push("/app/overview");
      }
      setCourseData(getValidateCourseData?.data);
    }
  }, [getValidateCourseData]);

  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // generate session and set to search params
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams.toString());
    let sessionString = urlParams.get("session");

    if (!sessionString) {
      sessionString = generateSessionString();
      urlParams.set("session", sessionString);
    }

    // Update the URL without reloading the page
    const newUrl = `/course/${params.id}?${urlParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [searchParams, params.id]);

  return (
    <div className="min-h-full">
      {!getValidateCourseIsLoading && courseData ? (
        <>
          <div className="flex items-center justify-center min-h-screen">
            {showLoader ? (
              <PageLoader text={`Lade Kurs ${courseData?.name}...`} />
            ) : (
              <CourseHandlerComponent courseId={params.id} />
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <PageLoader text="Lade Kurs..." />
        </div>
      )}
    </div>
  );
};

export default MainPage;
