import useSWR from "swr";
import swrGetFetcher from "../swrGetFetcher";

const sampleData = {};

export const useGetCourses = () => {
  let fetchedData, error;

  const swrOptions = {
    revalidateOnFocus: true,
  };

  if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
    ({ data: fetchedData, error } = useSWR(
      `/api/courses/get`,
      swrGetFetcher,
      swrOptions,
    ));
  } else {
    fetchedData = sampleData;
  }

  return {
    getCoursesData: fetchedData,
    getCoursesIsLoading: !fetchedData && !error,
    getCoursesError: error,
  };
};
