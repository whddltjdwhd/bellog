/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useRef } from "react";
import GithubSlugger from "github-slugger";
import { headerDepth, Section } from "@/types";
import { usePathname } from "next/navigation";

const MDXToc = () => {
  const [currentId, setCurrentId] = useState<string>("");
  const [headingSections, setHeadingSections] = useState<Section[]>([]);
  const pathname = usePathname();
  const rafId = useRef<number | null>(null);
  const isScheduled = useRef(false);

  const slugger = new GithubSlugger();
  const MARGIN = 90;

  const headerMap = {
    H2: 1,
    H3: 2,
    H4: 3,
  };

  const updateActiveSection = () => {
    if (!headingSections.length) {
      isScheduled.current = false;
      return;
    }

    const scrollTop = window.pageYOffset;

    const activeSection = headingSections.find((section) => {
      return scrollTop >= section.top && scrollTop < section.bottom;
    });

    if (activeSection && activeSection.id !== currentId) {
      setCurrentId(activeSection.id);
    } else if (!activeSection && currentId !== "") {
      setCurrentId("");
    }

    isScheduled.current = false;
  };

  const onScroll = () => {
    if (!isScheduled.current) {
      isScheduled.current = true;
      rafId.current = requestAnimationFrame(updateActiveSection);
    }
  };

  useEffect(() => {
    slugger.reset();

    const updateToc = () => {
      const main = document.querySelector(".mdx-content");
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
          ? next.offsetTop - MARGIN - 1
          : document.documentElement.scrollHeight;

        return { id: header.id, top, bottom, depth };
      });

      if (sections.length) {
        setHeadingSections(sections);
        setCurrentId("");
      } else {
        setHeadingSections([]);
        setCurrentId("");
      }
    };

    const timeoutId = setTimeout(updateToc, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    if (!headingSections.length) return;

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [headingSections]);

  if (!headingSections.length) return null;

  return (
    <nav className="max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-[var(--border)]">
      <h3 className="font-semibold mb-3 text-sm text-gray-500 dark:text-gray-400">
        On this page
      </h3>
      {headingSections.map((section) => {
        let indent = "py-[5px]";
        let fontSize = "text-md";
        const color = "text-gray-400";

        if (section.depth === 2) {
          indent = "py-[3px] pl-2";
          fontSize = "text-sm";
        } else if (section.depth === 3) {
          indent = "py-[2px] pl-4";
          fontSize = "text-xs";
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
              className="block break-keep"
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
