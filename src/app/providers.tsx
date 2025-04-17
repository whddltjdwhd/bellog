"use client";

import { ThemeProvider } from "next-themes";
import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ProgressProvider
        height="4px"
        color="#7a9cb9"
        options={{ showSpinner: false }}
        shallowRouting={false}
      >
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default Providers;
