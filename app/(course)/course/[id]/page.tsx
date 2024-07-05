"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useValidateCourse } from "../../../../hooks/data/validateCourse";
import { PageLoader } from "@/components/elements/Loader";
import CourseHandlerComponent from "@/components/course/CourseHandler";

const MainPage = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useKindeBrowserClient();
  const { getValidateCourseData, getValidateCourseIsLoading } =
    useValidateCourse({
      courseId: params.id,
    });
  const [courseData, setCourseData] = useState<any>({});

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
