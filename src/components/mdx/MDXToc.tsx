"use client";

import { useCallback } from "react";
import { Section } from "@/types";
import { useHeadings } from "@/hooks/useHeadings";
import { useTocObserver } from "@/hooks/useTocObserver";

const SCROLL_MARGIN = 90;

interface TocLinkProps {
  section: Section;
  isActive: boolean;
  onClick: (id: string) => void;
}

const TocLink = ({ section, isActive, onClick }: TocLinkProps) => {
  const getStyles = () => {
    let indent = "py-[5px]";
    let fontSize = "text-md";
    const color = "text-gray-400";
    if (section.depth === 1) {
      indent = "py-[5px]";
      fontSize = "text-md font-medium";
    } else if (section.depth === 2) {
      indent = "py-[4px] pl-1";
      fontSize = "text-sm";
    } else if (section.depth === 3) {
      indent = "py-[3px] pl-2";
      fontSize = "text-sm";
    }

    const activeColor = isActive ? "text-sky-500 dark:text-sky-400" : color;
    return [
      "transition-colors duration-200 ease-in-out hover:text-[var(--link)] cursor-pointer",
      indent,
      fontSize,
      activeColor,
    ].join(" ");
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick(section.id);
  };

  return (
    <div
      key={section.id}
      data-depth={section.depth}
      data-active={isActive}
      className={getStyles()}
    >
      <a
        href={`#${section.id}`}
        className="block break-keep"
        onClick={handleClick}
      >
        {section.text}
      </a>
    </div>
  );
};

interface MDXTocProps {
  content: string;
}

const MDXToc = ({ content }: MDXTocProps) => {
  const headings = useHeadings(content);
  const activeId = useTocObserver(headings);

  const handleLinkClick = useCallback((id: string) => {
    const header = document.getElementById(id);
    if (!header) return;

    window.scrollTo({
      top: header.offsetTop - SCROLL_MARGIN,
      behavior: "smooth",
    });

    history.replaceState(null, "", `#${id}`);
  }, []);

  if (!headings.length) return null;

  return (
    <nav className="max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-[var(--border)]">
      <h3 className="font-semibold mb-3 text-sm text-gray-500 dark:text-gray-400">
        On this page
      </h3>
      {headings.map((section) => (
        <TocLink
          key={section.id}
          section={section}
          isActive={activeId === section.id}
          onClick={handleLinkClick}
        />
      ))}
    </nav>
  );
};

export default MDXToc;
