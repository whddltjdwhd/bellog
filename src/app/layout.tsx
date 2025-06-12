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
  title: "Bellog - Castle Bell's Blog",
  description:
    "Castle Bell의 개발 블로그입니다. 프로그래밍, 기술 트렌드, 개발 경험을 공유합니다.",
  keywords: ["블로그", "개발", "프로그래밍", "기술", "Castle Bell"],
  authors: [{ name: "Castle Bell" }],
  creator: "Castle Bell",
  publisher: "Bellog",
  openGraph: {
    title: "Bellog",
    description:
      "Castle Bell의 개발 블로그입니다. 프로그래밍, 기술 트렌드, 개발 경험을 공유합니다.",
    url: "https://www.castle-bell.site/",
    siteName: "Bellog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bellog 블로그",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellog",
    description: "Castle Bell의 개발 블로그입니다.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
