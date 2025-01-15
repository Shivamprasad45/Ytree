import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "./lib/Providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import MaxWidthRappers from "@/components/MaxWidthRapper";

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
          <Toaster />
          <MaxWidthRappers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex flex-col md:flex-row w-full flex-grow overflow-hidden">
                {/* Left */}
                <div className="hidden md:flex md:fixed md:h-[calc(100vh-64px)] md:w-64 top-16">
                  <Lefttab />
                </div>

                {/* Middle */}
                <div className="flex-grow md:ml-64 pt-12">
                  <MaxWidthRappers className="mx-auto">
                    {children}
                  </MaxWidthRappers>
                </div>
              </main>
              <div className="mt-auto">
                <Footer />
              </div>
            </div>
          </MaxWidthRappers>
        </Providers>
      </body>
    </html>
  );
}
