import { ReactNode } from "react";
import Header from "@/components/Header";

import { Toaster } from "@/components/ui/sonner"
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <main id="main" className="h-full overflow-y-visible">
       
        <Header />
        {children}
        <Toaster />
     
      </main>
    </>
  );
};

export default RootLayout;
