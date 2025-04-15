import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "./lib/Providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import MaxWidthRappers from "@/components/MaxWidthRapper";
import { Analytics } from "@vercel/analytics/react";
import Lefttab from "./Components/lefttab";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanagrow.com/"),
  title: {
    default: "vanagrow -  Grow Your Own Forest",
    template: "%s | vanagrow  Grow Your Own Forest",
  },
  description: "Grow Your Own Forest",
  openGraph: {
    title: "vanagrow ",
    description: "Grow Your Own Forest",
    url: "https://vanagrow.com/",

    type: "website",
    images: [
      {
        url: "https://vanagrow.com/",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "vanagrow",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the favicon link with specific size */}
        <link rel="icon" href="/favicon.ico" sizes="40x40" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className={cn("min-h-screen font-sans antialiased")}>
        <Providers>
          <Analytics />
          <Toaster />

          {/* Root layout container */}
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Page body: sidebar + main content */}
            <div className="flex flex-1 w-full">
              {/* Sidebar - visible on md and above */}
              <div className="hidden md:block fixed top-16 h-[calc(100vh-64px)] w-64 border-r bg-white z-10">
                <Lefttab />
              </div>

              {/* Main content area with padding for footer space */}
              <main className="flex-1 md:ml-64 px-4 pt-4 pb-8">
                <MaxWidthRappers>{children}</MaxWidthRappers>
              </main>
            </div>

            {/* Footer at the bottom */}
            {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
