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
  metadataBase: new URL("https://ytree.vercel.app/"),
  title: {
    default: "Yplant - Y trees now you can buy",
    template: "%s | Y trees now you can buy",
  },
  description: "A site to buy Plants",
  openGraph: {
    title: "Yplants ",
    description: "A site to buy Plants",
    url: "https://ytree.vercel.app/",

    type: "website",
    images: [
      {
        url: "https://yplants.com/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Yplants",
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
      <body className={cn("min-h-screen font-sans antialiased")}>
        <Providers>
          <Toaster />
          <MaxWidthRappers>
            <div>
              <Navbar />
              <main className="flex flex-col md:flex-row w-full overflow-hidden">
                {/* Left */}
                <div className="hidden md:flex md:fixed md:h-full md:w-64">
                  <Lefttab />
                </div>

                {/* Middle */}
                <div className="flex-grow md:ml-64">
                  <MaxWidthRappers className="mx-auto">
                    {children}
                  </MaxWidthRappers>
                </div>
              </main>
              <div className="pt-4">
                <Footer />
              </div>
            </div>
          </MaxWidthRappers>
        </Providers>
      </body>
    </html>
  );
}
