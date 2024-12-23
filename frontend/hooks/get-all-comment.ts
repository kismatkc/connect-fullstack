import { useQuery } from "@tanstack/react-query";

import { comments } from "@/lib/axios-utils";

export default function useGetAllPostComments(postId: string) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => comments.getAllComments(postId),
    enabled: !!postId,
  });
}
