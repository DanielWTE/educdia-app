import useSWR from "swr";
import swrGetFetcher from "../swrGetFetcher";

const sampleData = {};

export const useGetQuestion = ({ courseId }: { courseId: number }) => {
  let fetchedData, error;

  const swrOptions = {
    revalidateOnFocus: false,
  };

  if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
    ({ data: fetchedData, error } = useSWR(
      `/api/questions/get?cid=${courseId}`,
      swrGetFetcher,
      swrOptions,
    ));
  } else {
    fetchedData = sampleData;
  }

  return {
    getQuestionData: fetchedData,
    getQuestionIsLoading: !fetchedData && !error,
    getQuestionError: error,
  };
};
