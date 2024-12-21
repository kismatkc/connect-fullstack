import { like } from "@/lib/axios-utils";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SelectOptions from "./select-options";
import { count } from "console";

const Like = ({ postId, userId }: { postId: string; userId: string }) => {
  const [likeDetails, setLikeDetails] = useState<{ id: string } | undefined>(
    undefined
  );
  const [likeStatus, setLikeStatus] = useState<boolean | undefined>(undefined);
  const [debounceFunction, setDebounceFunction] = useState<null | (() => void)>(
    null
  );
  const [peopleWhoLikedThePost, setPeopleWhoLikedThePost] = useState<
    | {
        id: string;
        firstName: string;
        lastName: string;
        profilePictureUrl: string;
      }[]
    | undefined
  >(undefined);
  const [peopleWhoLikedThePostCount, setPeopleWhoLikedThePostCount] = useState<
    number | undefined
  >(undefined);
  const unMounting = useRef<boolean>(false);
  useEffect(() => {
    unMounting.current = false;

    (async function () {
      const status = await like.status(postId, userId);
      const likes = await like.getPeopleWhoLikedThePost(postId);

      if (!status || !likes) return;
      setPeopleWhoLikedThePost(likes);
      setLikeStatus(status.length > 0);
      setLikeDetails(status && status[0]);
      setPeopleWhoLikedThePostCount(likes.length);
    })();
  }, []);

  useEffect(() => {
    unMounting.current = false;

    if (!debounceFunction) return;

    const clear = setTimeout(debounceFunction, 4000);

    return () => {
      if (unMounting.current) {
        return;
      }

      clearTimeout(clear);
    };
  }, [debounceFunction]);

  useLayoutEffect(() => {
    return () => {
      unMounting.current = true;
    };
  }, []);

  if (likeStatus === undefined || peopleWhoLikedThePost === undefined)
    return <Loader2 className="animate-spin" />;
  return (
    <div className="flex">
      {likeStatus ? (
        <Image
          src="/posts/after-like.svg"
          onClick={() => {
            setLikeStatus(false);
            setPeopleWhoLikedThePostCount((count) => {
              if (!(count || count === 0)) return count;
              return --count;
            });

            setDebounceFunction(() => async () => {
              if (!likeDetails) return;

              const response = await like.delete(likeDetails?.id);
              if (!response) {
                setPeopleWhoLikedThePostCount(peopleWhoLikedThePostCount);

                return setLikeStatus(true);
              }
              setLikeStatus(false);
            });
          }}
          alt="after-like icon"
          height={28}
          width={28}
          priority
        />
      ) : (
        <Image
          src="/posts/before-like.svg"
          onClick={() => {
            setLikeStatus(true);
            setPeopleWhoLikedThePostCount((count) => {
              if (!(count || count === 0)) return count;
              return ++count;
            });
            setDebounceFunction(() => async () => {
              try {
                const response = await like.create(postId, userId);
                setLikeDetails(response);
                setLikeStatus(true);
              } catch (error) {
                setLikeStatus(false);
                setPeopleWhoLikedThePostCount(peopleWhoLikedThePostCount);
              }
            });
          }}
          alt="after-like icon"
          height={28}
          width={28}
          priority
        />
      )}
      <SelectOptions
        triggerValue={peopleWhoLikedThePostCount as number}
        options={peopleWhoLikedThePost}
        userId={userId}
      />
    </div>
  );
};

export default Like;
