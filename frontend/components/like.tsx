import { like } from "@/lib/axios-utils";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const Like = ({ postId, userId }: { postId: string; userId: string }) => {
  const [likeDetails, setLikeDetails] = useState<{ id: string } | undefined>(
    undefined
  );
  const [likeStatus, setLikeStatus] = useState<boolean | undefined>(undefined);
  const [debounceFunction, setDebounceFunction] = useState<null | (() => void)>(
    null
  );
  const unMounting = useRef<boolean>(false);
  useEffect(() => {
    unMounting.current = false; // Reset flag when the effect runs

    (async function () {
      const response = await like.status(postId, userId);
      if (!response) return;
      setLikeStatus(response.length > 0);
      setLikeDetails(response && response[0]);
    })();
  }, []);

  useEffect(() => {
    unMounting.current = false; // Reset flag when the effect runs

    if (!debounceFunction) return;

    const clear = setTimeout(debounceFunction, 4000);

    return () => {
      if (unMounting.current) {
        return; // Skip cleanup on unmount
      }

      clearTimeout(clear); // Cleanup normally during dependency changes
    };
  }, [debounceFunction]);

  useLayoutEffect(() => {
    return () => {
      unMounting.current = true; // Set flag on unmount
    };
  }, []);

  if (likeStatus === undefined) return <Loader2 className="animate-spin" />;
  return (
    <figure className="flex">
      {likeStatus ? (
        <Image
          src="/posts/after-like.svg"
          onClick={() => {
            setLikeStatus(false);
            setDebounceFunction(() => async () => {
              if (!likeDetails) return;
              const response = await like.delete(likeDetails?.id);
              if (!response) setLikeStatus(true);
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
            setDebounceFunction(() => async () => {
              try {
                const response = await like.create(postId, userId);
                setLikeDetails(response);
                setLikeStatus(true);
              } catch (error) {
                setLikeStatus(false);
              }
            });
          }}
          alt="after-like icon"
          height={28}
          width={28}
          priority
        />
      )}
      <figcaption className="ml-1">4.1K</figcaption>
    </figure>
  );
};

export default Like;
