import { ReactNode } from "react";
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <main id="main" className="h-full overflow-y-visible">
        {children}
      </main>
    </>
  );
};

export default RootLayout;
