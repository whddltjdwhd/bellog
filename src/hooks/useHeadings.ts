import { useEffect, useState } from "react";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { Section, headerDepth } from "@/types";

const slugger = new GithubSlugger();

export const useHeadings = (content: string) => {
  const [headings, setHeadings] = useState<Section[]>([]);

  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    slugger.reset();
    const extractedHeadings: Section[] = [];

    remark()
      .use(() => (tree) => {
        visit(tree, "heading", (node: any) => {
          const text = node.children
            .map((child: any) => ("value" in child ? child.value : ""))
            .join("");
          const id = slugger.slug(text);

          if (node.depth >= 1 && node.depth <= 3) {
            extractedHeadings.push({
              id,
              text,
              depth: node.depth as headerDepth,
            });
          }
        });
      })
      .processSync(content);

    setHeadings(extractedHeadings);
  }, [content]);

  return headings;
};
