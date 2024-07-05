import useSWR from "swr";
import swrGetFetcher from "../swrGetFetcher";

const sampleData = {};

export const useGetCourseProgress = ({ courseId, session }: { courseId: number; session: string }) => {
  let fetchedData, error;

  const swrOptions = {
    revalidateOnFocus: false,
  };

  if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
    ({ data: fetchedData, error } = useSWR(
      `/api/courses/progress?cid=${courseId}&cs=${session}`,
      swrGetFetcher,
      swrOptions,
    ));
  } else {
    fetchedData = sampleData;
  }

  return {
    getCourseProgressData: fetchedData,
    getCourseProgressIsLoading: !fetchedData && !error,
    getCourseProgressError: error,
  };
};
