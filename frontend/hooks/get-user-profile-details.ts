import { Api } from "@/lib/axios-utils";
import { useMutation } from "@tanstack/react-query";

async function getUserProfileDetails(query: string) {
  try {
    const introDetails = await Api.get("/get-user-profile-details", {
      params: {
        query,
      },
    });
    const friendsDetails = await Api.get("/get-friends", {
      params: {
        query,
      },
    });
    
    const user = {...introDetails.data.data,friends: friendsDetails.data.data};

    return user;
  } catch (error) {
    throw error;
  }
}

const useGetUserProfileDetails = () =>
  useMutation({
    mutationKey: ["profileDetails"],
    mutationFn: getUserProfileDetails,
  });

export default useGetUserProfileDetails;
