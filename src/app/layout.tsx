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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
