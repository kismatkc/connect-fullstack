"use client";

import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useSession } from "next-auth/react";
import { socketInstance } from "@/lib/web-sockets";

const SocketManager = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user.id) return;

    socketInstance.connect();
    socketInstance.emit("registerUser", { senderId: session.user.id });

    const userLeaving = () => {
      socketInstance.emit("unregisterUser", { senderId: session.user.id });

      socketInstance.disconnect();
    };

    setInterval(() => {
      socketInstance.emit("ping");
    }, 5 * 1000);

    window.addEventListener("beforeunload", userLeaving);

    window.addEventListener("offline", () => {
      console.log("offline");
    });
    window.addEventListener("online", () => {
      console.log("online");
    });

    return () => {
      socketInstance.emit("unregisterUser", { senderId: session.user.id });
      window.removeEventListener("beforeunload", userLeaving);
    };
  }, [session?.user?.id]);

  return children; // This component is for side-effects only
};

export default SocketManager;
