"use client";

import { ExtendedRecordMap, PageBlock } from "notion-types";
import { getPageTableOfContents, TableOfContentsEntry } from "notion-utils";
import useScrollSpy from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

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
    if (indentLevel === 0) return "text-base";
    if (indentLevel === 1) return "ml-4 text-sm";
    if (indentLevel === 2) return "ml-8 text-sm";
    return "ml-12 text-sm";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const parsedId = id.replace(/-/g, ""); // 하이픈 제거
    const element = document.querySelector(`[data-id="${parsedId}"]`);

    if (element instanceof HTMLElement) {
      window.scrollTo({
        top: element.offsetTop - 80, // 고정 헤더 높이 고려
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <h2 className="mb-4 text-lg font-bold text-[var(--text)]">목차</h2>
      <ul className="mb-2">
        {tableOfContents.map((toc: TableOfContentsEntry) => {
          const parsedId = toc.id.replace(/-/g, ""); // 하이픈 제거

          return (
            <li className="mb-1 font-light tracking-tighter" key={parsedId}>
              <a
                href={`#${parsedId}`}
                onClick={(e) => handleClick(e, parsedId)}
                className={cn(
                  "transition-colors duration-200 ease-in-out hover:text-[var(--link)] cursor-pointer",
                  getStyle(toc.indentLevel),
                  activeId === parsedId
                    ? "text-sky-500 dark:text-sky-400 font-semibold"
                    : "text-gray-400"
                )}
              >
                {toc.text}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NotionToc;
