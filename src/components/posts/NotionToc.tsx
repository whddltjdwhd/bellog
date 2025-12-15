"use client";

import { ExtendedRecordMap, PageBlock } from "notion-types";
import { getPageTableOfContents, TableOfContentsEntry } from "notion-utils";
import useScrollSpy from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { HEADER_OFFSET } from "@/constants/ui";

interface NotionTocProps {
  recordMap: ExtendedRecordMap;
}

const NotionToc = ({ recordMap }: NotionTocProps) => {
  const activeId = useScrollSpy();

  // recordMap에서 rootPageId를 가져옵니다.
  const rootPageId = Object.keys(recordMap.block)[0];
  // rootPageId를 사용하여 해당 페이지 블록을 가져옵니다.
  const page = recordMap.block[rootPageId]?.value;

  let tableOfContents: TableOfContentsEntry[] = [];
  if (page) {
    tableOfContents = getPageTableOfContents(page as PageBlock, recordMap);
  }

  const getStyle = (indentLevel: number) => {
    if (indentLevel === 0) return "";
    if (indentLevel === 1) return "ml-2";
    if (indentLevel === 2) return "ml-4";
    return "ml-6";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const parsedId = id.replace(/-/g, ""); // 하이픈 제거
    const element = document.querySelector(`[data-id="${parsedId}"]`);

    if (element instanceof HTMLElement) {
      window.scrollTo({
        top: element.offsetTop - HEADER_OFFSET, // 고정 헤더 높이 고려 + offset
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-32 p-6 rounded-2xl bg-background/50 backdrop-blur-md border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md w-full max-h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar">
      <h2 className="mb-4 text-lg font-bold font-heading text-foreground border-b border-border/50 pb-2">
        Contents
      </h2>
      <ul className="space-y-1">
        {tableOfContents.map((toc: TableOfContentsEntry) => {
          const parsedId = toc.id.replace(/-/g, ""); // 하이픈 제거

          return (
            <li className="font-light tracking-tight break-keep" key={parsedId}>
              <a
                href={`#${parsedId}`}
                onClick={(e) => handleClick(e, parsedId)}
                className={cn(
                  "block py-1 pr-2 transition-all duration-200 border-l-2 pl-4 text-sm break-keep hover:bg-accent/50 rounded-r-md",
                  getStyle(toc.indentLevel),
                  activeId === parsedId
                    ? "border-primary text-primary font-medium bg-primary/5 rounded-r-md"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {toc.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotionToc;
