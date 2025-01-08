import { ReactNode } from "react";
import Header from "@/components/Header";
import SocketManager from "@/components/web-sockets-wrapper";

import { Toaster } from "@/components/ui/sonner";
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <SocketManager>
      <main id="main" className="h-full overflow-y-visible">
        <Header />
        {children}
        <Toaster />
      </main>
    </SocketManager>
  );
};

export default RootLayout;
