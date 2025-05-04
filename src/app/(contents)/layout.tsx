import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ProgressBar";
import React, { ReactNode } from "react";
import MDXToc from "@/components/MDXToc";

interface LayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: LayoutProps) {
  return (
    <>
      <ReadingProgress />
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6">
        <main className="py-8 px-4 md:col-span-4">{children}</main>
        <aside className="hidden md:block md:col-span-1 sticky top-20 h-fit pl-4 py-8">
          <MDXToc />
        </aside>
      </div>
      <Footer />
    </>
  );
}
