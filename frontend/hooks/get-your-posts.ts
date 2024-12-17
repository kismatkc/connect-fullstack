import { useMutation, useQuery } from "@tanstack/react-query";

import { Api, posts } from "@/lib/axios-utils";
import { useSession } from "next-auth/react";

export default function useGetYourPosts() {
  const user = useSession();

  return useQuery({
    queryKey: ["posts-yours"],
    queryFn: ({ queryKey }) => {
      const userId = user.data?.user?.id as string;
      if (!userId) return [];
      return posts.getYourPosts(userId);
    },

    enabled: !!user.data?.user.id,
  });
}
