import { ReactNode } from "react";
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="flex flex-col">
      <header className="w-full text-center text-4xl pt-6 bg-blue-500 bg-clip-text text-transparent select-none font-black">
        Connect
      </header>
      {children}
    </main>
  );
};

export default RootLayout;
