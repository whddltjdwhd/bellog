import Footer from "@/components/Footer";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: LayoutProps) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
