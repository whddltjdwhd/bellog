import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseMeta(className?: string) {
  const input = {
    highlight: [] as number[],
    title: "",
    language: "javascript",
  };

  if (!className) return input;

  const lang = className.match(/language-([\w]+)/);
  if (lang) input.language = lang[1];

  const hl = className.match(/{([^}]+)}/);
  if (hl) {
    hl[1].split(",").forEach((p) => {
      const range = p.trim().match(/^(\d+)-(\d+)$/);
      if (range)
        for (let i = +range[1]; i <= +range[2]; i++) input.highlight.push(i);
      else {
        const n = parseInt(p.trim(), 10);
        if (!isNaN(n)) input.highlight.push(n);
      }
    });
  }

  const title = className.match(/title=([\w\s.\-]+)/);
  if (title) input.title = title[1].trim();
  return input;
}
