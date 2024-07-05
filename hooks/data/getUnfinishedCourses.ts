import useSWR from "swr";
import swrGetFetcher from "../swrGetFetcher";

const sampleData = {};

export const useGetUnfinishedCourses = () => {
  let fetchedData, error;

  const swrOptions = {
    revalidateOnFocus: true,
  };

  if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
    ({ data: fetchedData, error } = useSWR(
      `/api/courses/unfinished`,
      swrGetFetcher,
      swrOptions,
    ));
  } else {
    fetchedData = sampleData;
  }

  return {
    getUnfinishedCoursesData: fetchedData,
    getUnfinishedCoursesIsLoading: !fetchedData && !error,
    getUnfinishedCoursesError: error,
  };
};
