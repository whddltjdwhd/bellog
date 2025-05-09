import type { Metadata } from "next";
import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/NotoSansKR-VariableFont_wght.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-VariableFont_wght.ttf",
      weight: "400",
      style: "strong",
    },
  ],
});

export const metadata: Metadata = {
  title: "Bellog",
  description: "Castle Bell's Blog",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={myFont.className} suppressHydrationWarning>
      <body className="bg-[var(--bg)] w-full flex flex-col justify-center items-center">
        <Providers>
          <Navbar />
          <div className="w-full flex flex-col justify-center items-center">
            {children}
            <Analytics />
            <SpeedInsights />
          </div>
        </Providers>
      </body>
    </html>
  );
}
