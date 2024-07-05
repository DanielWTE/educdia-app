"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useValidateCourse } from "../../../../hooks/data/validateCourse";
import { PageLoader } from "@/components/elements/Loader";

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

  return (
    <div className="min-h-full">
      {!getValidateCourseIsLoading && courseData ? (
        <>
            <div className="flex items-center justify-center h-screen">
                <PageLoader text={`Lade Kurs ${courseData?.name}...`} />
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