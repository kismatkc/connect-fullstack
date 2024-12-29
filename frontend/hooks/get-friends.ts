import { Api, friendRequest } from "@/lib/axios-utils";
import { useQuery } from "@tanstack/react-query";

const useGetFriends = (userId: string | undefined) =>
    useQuery({
        queryKey: ["friends", userId],
        queryFn: async (): Promise<{
    id: any;
    first_name: any;
    last_name: any;
    profile_picture_url: any;
}[]> => {
            const friendsDetails = await Api.get("/get-friends", {
                params: {
                    query: userId,
                },
            });
            return friendsDetails.data.data;
        },
        enabled: !!userId,
    });

export default useGetFriends;
