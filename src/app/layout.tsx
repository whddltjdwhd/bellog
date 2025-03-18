import type { Metadata } from "next";
import "@/styles/global.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Bellog",
  description: "Castle Bell's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="bg-[#8CA496]">
        <Header />
        <div className="flex justify-center items-center w-full">
          <div className="flex-col justify-start items-center w-[1000px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
