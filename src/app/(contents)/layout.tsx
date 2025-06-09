import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ProgressBar";
import React, { ReactNode } from "react";
import MDXToc from "@/components/MDXToc";
import PostNavigation from "@/components/PostNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: LayoutProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ReadingProgress />
      <div className="relative w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="hidden md:block md:col-span-2"></div>
        <main className="py-8 px-4 md:col-span-8">
          <article className="mdx-content">{children}</article>
          <PostNavigation />
        </main>
        <aside className="hidden md:block md:col-span-2 sticky top-20 h-fit py-8 pr-3">
          <MDXToc />
        </aside>
      </div>
      <Footer />
    </div>
  );
}
