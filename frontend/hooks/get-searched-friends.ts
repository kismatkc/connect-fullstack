import { Api } from "@/lib/axios-utils";
import { useMutation } from "@tanstack/react-query";

async function getSearchedFriends(query: string) {
  try {
    const response = await Api.get("/get-searched-friends", {
      params: {
        query,
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
}

const useGetSearchedFriends = () =>
  useMutation({
    mutationKey: ["searchedFriends"],
    mutationFn: getSearchedFriends,
  });

export default useGetSearchedFriends;
