"use client";

import { NotionRenderer } from "react-notion-x";
import { useTheme } from "next-themes";
import { ExtendedRecordMap } from "notion-types";

import { useState, useEffect } from "react";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// custom notion styles
import "./notion-styles.css";

// code block theme
import "prism-themes/themes/prism-material-oceanic.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code)
);

const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

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
      pageTitle={false}
      disableHeader={true}
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
