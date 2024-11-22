import { Api } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

async function getUserProfileDetails(query: string) {
  try {

    const response = await Api.get("/get-user-profile-details", {
      params: {
        query,
      },
    });

    return response.data.data;
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
