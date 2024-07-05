import useSWR from "swr";
import swrGetFetcher from "../swrGetFetcher";

const sampleData = {};

export const useValidateCourse = ({ courseId }: { courseId: number }) => {
  let fetchedData, error;

  const swrOptions = {
    revalidateOnFocus: false,
  };

  if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
    ({ data: fetchedData, error } = useSWR(
      `/api/courses/validate?cid=${courseId}`,
      swrGetFetcher,
      swrOptions,
    ));
  } else {
    fetchedData = sampleData;
  }

  return {
    getValidateCourseData: fetchedData,
    getValidateCourseIsLoading: !fetchedData && !error,
    getValidateCourseError: error,
  };
};
