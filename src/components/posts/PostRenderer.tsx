"use client";

import { NotionRenderer } from "react-notion-x";
import { useTheme } from "next-themes";
import { ExtendedRecordMap } from "notion-types";

import { useState, useEffect } from "react";
import { Code } from "react-notion-x/build/third-party/code";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { Pdf } from "react-notion-x/build/third-party/pdf";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// custom notion styles
import "./notion-styles.css";

// code block theme
import "prism-themes/themes/prism-material-oceanic.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

interface PostRendererProps {
  recordMap: ExtendedRecordMap;
}

const PostRenderer = ({ recordMap }: PostRendererProps) => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDarkMode = isMounted && resolvedTheme === "dark";

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={isDarkMode}
      className="notion-container"
      components={{
        Code,
        Equation,
        Modal,
        Pdf,
      }}
    />
  );
};

export default PostRenderer;
