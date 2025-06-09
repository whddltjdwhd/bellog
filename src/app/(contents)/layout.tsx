import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ProgressBar";
import MDXToc from "@/components/MDXToc";
import React from "react";

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ReadingProgress />
      <div className="relative w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="hidden md:block md:col-span-2"></div>
        <main className="py-8 px-4 md:col-span-8">{children}</main>
        <aside className="hidden md:block md:col-span-2 sticky top-20 h-fit py-8 pr-3">
          <MDXToc />
        </aside>
      </div>
      <Footer />
    </div>
  );
}
