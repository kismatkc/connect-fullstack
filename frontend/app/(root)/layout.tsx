import { ReactNode } from "react";
import Header from "@/components/Header";
import Messenger from "@/components/messenger";
import MessengerChatBox from "@/components/messenger-chat-box";
import { Toaster } from "@/components/ui/sonner"
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <main id="main" className="h-full overflow-y-visible">
        <Messenger />
        <Header />
        {children}
        <Toaster />
        <MessengerChatBox />
      </main>
    </>
  );
};

export default RootLayout;
