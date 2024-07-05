"use client";

import {
  CourseCardComponent,
  UnfinishedCourseCardComponent,
} from "@/components/app/courses/CourseCardComp";
import { useGetCourses } from "@/hooks/data/getCourses";
import { useGetUnfinishedCourses } from "@/hooks/data/getUnfinishedCourses";
import { useEffect, useState } from "react";
import { CourseData, UnfinishedCourseData } from "@/types/Course";

export default function Overview({ user }: any) {
  const { getCoursesData, getCoursesIsLoading, getCoursesError } =
    useGetCourses();
  const [courses, setCourses] = useState([] as CourseData[]);
  const {
    getUnfinishedCoursesData,
    getUnfinishedCoursesIsLoading,
    getUnfinishedCoursesError,
  } = useGetUnfinishedCourses();
  const [unfinishedCourses, setUnfinishedCourses] = useState(
    [] as UnfinishedCourseData[]
  );

  useEffect(() => {
    if (getCoursesData?.data) {
      setCourses(getCoursesData?.data);
    }
  }, [getCoursesData]);

  useEffect(() => {
    if (getUnfinishedCoursesData?.data) {
      setUnfinishedCourses(getUnfinishedCoursesData?.data);
    }
  }, [getUnfinishedCoursesData]);

  return (
    <div className="flex flex-col gap-4">
      {courses.filter(
        (course) =>
          !unfinishedCourses.some(
            (unfinished) => unfinished.course_id === course.course_id
          )
      ).length > 0 && (
        <div className="border-b border-gray-200 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Verfügbare Kurse
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Wähle einen Kurs aus um ihn zu starten.
          </p>
          <hr className="border-gray-200 border-b mt-4" />
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter(
                (course) =>
                  !unfinishedCourses.some(
                    (unfinished) => unfinished.course_id === course.course_id
                  )
              )
              .map((course) => (
                <CourseCardComponent
                  key={course.course_id}
                  id={course.course_id}
                  name={course.name}
                  description={course.description}
                />
              ))}
          </div>
        </div>
      )}

      {unfinishedCourses.length > 0 && (
        <div className="border-b border-gray-200 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Nicht abgeschlossene Kurse
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            In diesen Kursen hast du noch nicht alle Fragen beantwortet, klicke
            auf einen Kurs um fortzufahren.
          </p>
          <hr className="border-gray-200 border-b mt-4" />
          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {unfinishedCourses.map((course) => (
              <UnfinishedCourseCardComponent
                key={course.course_id}
                id={course.course_id}
                name={course.name}
                description={course.description}
                totalQuestions={course.totalQuestions}
                answeredQuestions={course.answeredQuestions}
                session={course.session}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
