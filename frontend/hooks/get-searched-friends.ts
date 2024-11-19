import { Api } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

async function getSearchedFriends(query: string) {
  try {
    const response = await Api.get("/get-searched-friends", {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const useGetSearchedFriends = () =>
  useMutation({
    mutationKey: ["searchedFriends"],
    mutationFn: getSearchedFriends,
  });

export default useGetSearchedFriends;
