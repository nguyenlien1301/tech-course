import "./globals.scss";

import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@/shared/components/common";
import { SidebarContextProvider, UserContextProvider } from "@/shared/contexts";
import ReactQueryContext from "@/shared/contexts/react-query-context";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "TechCourse",
  description: "Tech Course App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <ReactQueryContext>
              <UserContextProvider>
                <SidebarContextProvider>
                  <NuqsAdapter>
                    <Suspense>{children}</Suspense>
                  </NuqsAdapter>
                </SidebarContextProvider>
              </UserContextProvider>
            </ReactQueryContext>
            <SpeedInsights />
            <Analytics />
            <ToastContainer autoClose={2000} draggable />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
