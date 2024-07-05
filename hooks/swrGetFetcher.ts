export const swrGetFetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    credentials: "include", // Important to send application cookies with the request
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export default swrGetFetcher;
