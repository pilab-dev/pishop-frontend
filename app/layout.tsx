import "@/styles/globals.css";
import "@fontsource/lato";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { HeaderSection } from "@/components/header-section";
import { PageFooter } from "@/components/page-footer";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: "PiShop - The next generation of e-commerce",
    template: `%s - PiShop`,
  },
  alternates: {
    canonical: "https://shop.pilab.hu",
  },
  description:
    "The next generation of e-commerce - Performance optimized, horizontal scalable, SEO friendly, and fully customizable.",
  icons: {
    icon: "/favicon.ico",
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
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ forcedTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen">
            <HeaderSection />

            {/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
            {children}
            {/* </main> */}
            <PageFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
