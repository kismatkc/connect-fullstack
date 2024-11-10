import { ReactNode } from "react";
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <main  id="main" className="h-full">
        {children}
      </main>
    </>
  );
};

export default RootLayout;
