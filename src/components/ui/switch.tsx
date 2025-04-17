"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "bg-[var(--border)]",
        "peer inline-flex h-5 w-10 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
        "data-[state=unchecked]:bg-input data-[state=checked]:bg-primary",
        "dark:data-[state=unchecked]:bg-input/80 dark:data-[state=checked]:bg-primary/80",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full ring-0 transition-transform",
          "w-4 h-4",
          "bg-[var(--surface)] dark:bg-[var(--surface)]",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-[22px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
