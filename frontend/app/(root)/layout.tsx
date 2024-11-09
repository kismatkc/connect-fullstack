import { ReactNode } from "react";
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <main className="relative">{children}</main>;
};

export default RootLayout;
