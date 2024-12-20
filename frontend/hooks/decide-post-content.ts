import { useSession } from "next-auth/react";
import useGetFriendsPosts from "./get-friends-posts";
import useGetYourPosts from "./get-your-posts";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/types";

export default function useDecidePostContent() {
  const {
    data: friendsPostData,
    isPending: friendsPending,
    error: friendError,
  } = useGetFriendsPosts();
  const {
    data: yourPostData,
    isPending: yoursPending,
    error: yourError,
  } = useGetYourPosts();
  const [postData, setPostData] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { data } = useSession();
  const fullPath = usePathname();
  const id = (data && data.user.id) || null;
  const path =
    (fullPath && fullPath.length > 1 ? fullPath.slice(1) : fullPath) || null;

  useEffect(() => {
    if (!path || !id) {
      setError(null);
      setIsPending(true);
      return setPostData([]);
    }
    if (path === "/" || !(id && path === id)) {
      setError(friendError);
      setIsPending(friendsPending);
      return setPostData(friendsPostData || []);
    }
  }, [path, id, friendsPostData, friendsPending, friendError]);
  useEffect(() => {
    if (!path || !id) {
      setError(null);
      setIsPending(true);
      return setPostData([]);
    }
    if (id && path === id) {
      setError(yourError);
      setIsPending(yoursPending);
      return setPostData(yourPostData || []);
    }
  }, [path, id, yourPostData, yoursPending, yourError]);
  return { postData, isPending, error };
}
