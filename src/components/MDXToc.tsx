/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";
import { headerDepth, Section } from "@/types";
import { throttle } from "es-toolkit";

const MDXToc = () => {
  const [currentId, setCurrentId] = useState<string>("");
  const [headingSections, setHeadingSections] = useState<Section[]>([]);

  const slugger = new GithubSlugger();
  const MARGIN = 90;

  const headerMap = {
    H2: 1,
    H3: 2,
    H4: 3,
  };

  const onScroll = throttle(() => {
    const pos = window.scrollY;
    const found = headingSections.find(
      (section) => pos >= section.top && pos < section.bottom
    );

    if (found && found.id !== currentId) {
      setCurrentId(found.id);
    }
  }, 16);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const headings = Array.from(
      main.querySelectorAll<HTMLHeadingElement>("h2, h3, h4")
    );

    const sections: Section[] = headings.map((header, idx) => {
      if (!header.id && header.textContent) {
        header.id = slugger.slug(header.textContent);
      }

      const depth = headerMap[
        header.tagName as keyof typeof headerMap
      ] as headerDepth;

      const top = header.offsetTop - MARGIN;
      const next = headings[idx + 1];
      const bottom = next
        ? next.offsetTop - MARGIN
        : document.body.scrollHeight;

      return { id: header.id, top, bottom, depth };
    });

    if (sections.length) {
      setHeadingSections(sections);
      const pos = window.scrollY;
      const found = sections.find(
        (section) => pos >= section.top && pos < section.bottom
      );
      setCurrentId(found?.id || sections[0].id);
    }
  }, []);

  useEffect(() => {
    if (!headingSections.length) return;

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentId]);

  if (!headingSections.length) return null;

  return (
    <nav className="max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-[var(--border)]">
      <h3 className="font-semibold mb-3 text-sm text-gray-500 dark:text-gray-400">
        On this page
      </h3>
      {headingSections.map((section) => {
        let indent = "py-[5px]";
        let fontSize = "text-lg";
        const color = "text-gray-400";

        if (section.depth === 2) {
          indent = "py-[3px] pl-4";
          fontSize = "text-md";
        } else if (section.depth === 3) {
          indent = "py-[2px] pl-8";
          fontSize = "text-sm";
        }

        const isActive = currentId === section.id;
        const activeColor = isActive ? "text-sky-500 dark:text-sky-400" : color;
        const styles = [
          "transition-colors duration-200 ease-in-out hover:text-[var(--link)] cursor-pointer",
          indent,
          fontSize,
          activeColor,
        ].join(" ");

        return (
          <div
            key={section.id}
            data-depth={section.depth}
            data-active={isActive}
            className={styles}
          >
            <a
              href={`#${section.id}`}
              className="block"
              onClick={(e) => {
                e.preventDefault();
                const header = document.getElementById(section.id);

                if (!header) return;
                window.scrollTo({
                  top: header.offsetTop - 90,
                  behavior: "smooth",
                });

                setCurrentId(section.id);
                history.replaceState(null, "", `#${section.id}`);
              }}
            >
              {document.getElementById(section.id)?.textContent}
            </a>
          </div>
        );
      })}
    </nav>
  );
};

export default MDXToc;
