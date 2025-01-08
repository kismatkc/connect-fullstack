import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
export const metadata: Metadata = {
  title: "Connect",
  description: "Connect with new people",
};
import SessionProviderWrapper from "@/components/session-provider";

const interFont = Inter({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});
import ReactQueryProvider from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.className} antialiased `}>
        <ReactQueryProvider>
          <SessionProviderWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionProviderWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
