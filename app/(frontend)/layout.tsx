import "@/styles/globals.css";
import "@fontsource/inter";
import "@fontsource/lato";

import { HeaderSection } from "@/components/header-section";
import { PageFooter } from "@/components/page-footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default:
      "ShopPi - 2nd hand tech marketplace | Buy and sell second hand tech products",
    template: `%s | ShopPi - 2nd hand tech marketplace`,
  },
  description:
    "ShopPi is a 2nd hand tech marketplace where you can buy and sell second hand tech stuffs.",
  icons: {
    icon: "/favicon.ico",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("bg-background font-sans antialiased")}>
        <Providers themeProps={{ forcedTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen">
            <HeaderSection />
            {/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
            {children}
            {/* </main> */}
            <PageFooter />
          </div>
        </Providers>
        <GoogleAnalytics gaId={gaId as string} />
      </body>
    </html>
  );
}
