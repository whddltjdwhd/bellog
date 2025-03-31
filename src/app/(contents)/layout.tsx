import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ProgressBar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: LayoutProps) {
  return (
    <div>
      <ReadingProgress />
      {children}
      <Footer />
    </div>
  );
}
