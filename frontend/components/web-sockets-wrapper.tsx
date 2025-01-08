"use client";

import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useSession } from "next-auth/react";
import { socketInstance } from "@/lib/web-sockets";

const SocketManager = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("hook mounted");

    if (!session?.user.id) return;

    socketInstance.connect();
    socketInstance.emit("registerUser", { senderId: session.user.id });

    const userLeaving = () => {
      socketInstance.emit("unregisterUser", { senderId: session.user.id });

      socketInstance.disconnect();
    };

    window.addEventListener("beforeunload", userLeaving);
    return () => {
      socketInstance.emit("unregisterUser", { senderId: session.user.id });
      window.removeEventListener("beforeunload", userLeaving);
    };
  }, [session?.user?.id]);

  return children; // This component is for side-effects only
};

export default SocketManager;
