import type { Metadata } from "next";
import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/GmarketSansTTFLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/GmarketSansTTFMedium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GmarketSansTTFBold.ttf",
      weight: "700",
      style: "normal",
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
    <html lang="ko" className={myFont.className}>
      <body className="bg-[#8CA496]">
        <Navbar />
        <div className="flex justify-center items-center w-full">
          <div className="flex-col justify-start items-center w-[1000px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
