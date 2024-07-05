import useSWR from "swr";
import swrGetFetcher from "../swrGetFetcher";

const sampleData = {};

export const useGetQuestion = ({ courseId, session }: { courseId: number; session: string }) => {
  let fetchedData, error;

  if (!session) {
    return {
      getQuestionData: null,
      getQuestionIsLoading: false,
      getQuestionError: "Session not found",
    };
  }

  const swrOptions = {
    revalidateOnFocus: false,
  };

  if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
    ({ data: fetchedData, error } = useSWR(
      `/api/questions/get?cid=${courseId}&cs=${session}`,
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
