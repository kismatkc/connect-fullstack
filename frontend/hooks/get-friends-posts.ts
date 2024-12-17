import { useQuery } from "@tanstack/react-query";

import { Api, posts } from "@/lib/axios-utils";
import { useSession } from "next-auth/react";

export default function useGetFriendsPosts() {
  const user = useSession();

  return useQuery({
    queryKey: ["posts-friends"],
    queryFn: ({ queryKey }) => {
      const userId = user.data?.user?.id as string;
      if (!userId) return [];
      return posts.getFriendsPosts(userId);
    },

    enabled: !!user.data?.user.id,
  });
}
