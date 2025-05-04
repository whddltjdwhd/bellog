"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getIntersectionObserver } from "@/lib/observer";

const MDXToc = () => {
  const pathname = usePathname();
  const [currentId, setCurrentId] = useState<string>("");
  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const observer = getIntersectionObserver(setCurrentId);
    const mainContent = document.querySelector("main");
    const headingElements = mainContent
      ? Array.from(mainContent.querySelectorAll("h2, h3"))
      : [];
    setHeadingEls(headingElements);

    headingElements.forEach((header) => {
      observer.observe(header);
    });

    return () => {
      headingElements.forEach((header) => {
        observer.unobserve(header);
      });
    };
  }, [pathname]);

  if (headingEls.length === 0) {
    return null;
  }

  return (
    <nav className="max-h-[calc(100vh-120px)] overflow-y-auto pl-4 border-l border-[var(--border)]">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold mb-3 text-sm text-gray-500 dark:text-gray-400">
          On this page
        </h4>
        {headingEls.map((h, i) =>
          h.nodeName === "H2" ? (
            <div
              key={`${h.id}-${i}`}
              data-depth="1"
              data-active={currentId === h.id}
              className={`text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-900 dark:hover:text-gray-100 pl-0 ${
                currentId === h.id
                  ? "text-sky-500 dark:text-sky-400 font-medium"
                  : ""
              }`}
            >
              <a href={`#${h.id}`} className="block">
                {h.textContent}
              </a>
            </div>
          ) : (
            <div
              key={`${h.id}-${i}`}
              data-depth="2"
              data-active={currentId === h.id}
              className={`text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200 ease-in-out hover:text-gray-900 dark:hover:text-gray-100 pl-4 ${
                currentId === h.id
                  ? "text-sky-500 dark:text-sky-400 font-medium"
                  : ""
              }`}
            >
              <a href={`#${h.id}`} className="block">
                {h.textContent}
              </a>
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default MDXToc;
