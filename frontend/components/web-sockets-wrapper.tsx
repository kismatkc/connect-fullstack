"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { socketInstance } from "@/lib/web-sockets";

const SocketManager = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      console.log("Registering user via socket:", session.user.id);
      socketInstance.emit("registerUser", { senderId: session.user.id });

      const handleReconnect = () => {
        console.log("Re-registering user after reconnect:", session.user.id);
        socketInstance.emit("registerUser", { senderId: session.user.id });
      };

      window.addEventListener("online", handleReconnect);

      return () => {
        console.log(
          "Unregistering user and disconnecting socket:",
          session.user.id
        );
        socketInstance.emit("unregisterUser", { senderId: session.user.id });
        socketInstance.disconnect();
        window.removeEventListener("online", handleReconnect);
      };
    }
  }, [status, session?.user?.id]);

  return null; // This component is for side-effects only
};

export default SocketManager;
