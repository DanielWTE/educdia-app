"use client";

import { CourseCardComponent } from "@/components/app/courses/CourseCardComp";
import { useGetCourses } from "@/hooks/data/getCourses";
import { useEffect, useState } from "react";
import { CourseData } from "@/types/Course";

export default function Overview({ user }: any) {
  const { getCoursesData, getCoursesIsLoading, getCoursesError } =
    useGetCourses();
  const [courses, setCourses] = useState([] as CourseData[]);

  useEffect(() => {
    if (getCoursesData?.data) {
      setCourses(getCoursesData?.data);
      console.log(courses);
    }
  }, [getCoursesData]);
  return (
    <div className="border-b border-gray-200 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Verfügbare Kurse
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Wähle einen Kurs aus um ihn zu starten.
      </p>
      <hr className="border-gray-200 border-b mt-4" />
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCardComponent
            key={course.course_id}
            id={course.course_id}
            name={course.name}
            description={course.description}
          />
        ))}
      </div>
    </div>
  );
}
