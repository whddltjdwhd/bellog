"use client";

import { TagProps } from "@/types";
import React from "react";

export default function Tag({
  tagName,
  variant = "small",
  selected = false,
  counts,
}: TagProps) {
  const baseClass =
    "rounded-full text-center cursor-pointer transition-colors duration-200 max-w-full w-fit truncate";

  const selectedBg = "bg-primary hover:bg-primary/90";
  const unselectedBg = "bg-secondary hover:bg-border";
  const selectedText = "text-primary-foreground";
  const unselectedText = "text-foreground";

  const largeSize = "px-3 py-1 sm:px-4 sm:py-2";
  const smallSize = "px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-[12px]";

  const sizeClass = variant === "large" ? largeSize : smallSize;
  const colorClass = selected
    ? `${selectedBg} ${selectedText}`
    : `${unselectedBg} ${unselectedText}`;

  const shouldShowCount = counts !== undefined && counts > 0;

  return (
    <div
      className={`${baseClass} ${sizeClass} ${colorClass} flex items-center gap-1`}
    >
      {tagName}
      {shouldShowCount && (
        <span className={`rounded-full text-[10px] sm:text-xs px-1 py-0.5 `}>
          {counts}
        </span>
      )}
    </div>
  );
}
