"use client";

import { ProgressProvider } from "@bprogress/next/app";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#7a9cb9"
      options={{ showSpinner: false }}
      shallowRouting={false}
    >
      {children}
    </ProgressProvider>
  );
};

export default Providers;
