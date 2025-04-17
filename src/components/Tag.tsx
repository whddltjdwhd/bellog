"use client";

import React from "react";

interface TagProps {
  tagName: string;
  variant?: "large" | "small";
  selected?: boolean;
}

export default function Tag({
  tagName,
  variant = "small",
  selected = false,
}: TagProps) {
  const baseClass =
    "rounded-full text-center cursor-pointer transition-colors duration-200 max-w-full w-fit truncate";

  const selectedBg = "bg-[var(--primary)] hover:bg-[var(--primary-dark)]";
  const unselectedBg = "bg-[var(--surface)] hover:bg-[var(--border)]";
  const selectedText = "text-[var(--surface)]";
  const unselectedText = "text-[var(--text)]";

  const largeSize = "px-3 py-1 sm:px-4 sm:py-2";
  const smallSize = "px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-[12px]";

  const sizeClass = variant === "large" ? largeSize : smallSize;
  const colorClass = selected
    ? `${selectedBg} ${selectedText}`
    : `${unselectedBg} ${unselectedText}`;

  return (
    <div className={`${baseClass} ${sizeClass} ${colorClass}`}>{tagName}</div>
  );
}
