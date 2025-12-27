"use client";

import { NotionRenderer } from "react-notion-x";
import { useTheme } from "next-themes";
import { ExtendedRecordMap } from "notion-types";

import { useState, useEffect, useMemo } from "react";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// custom notion styles
import "./notion-styles.css";

// code block theme
import "prism-themes/themes/prism-material-oceanic.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

import dynamic from "next/dynamic";
import Link from "next/link";
import { OptimizedNotionImage } from "./OptimizedNotionImage";
import { ImageDimensionsProvider } from "./ImageDimensionsContext";
import { extractImageDimensions } from "@/lib/extract-image-dimensions";

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

  // Extract image dimensions from recordMap
  const imageDimensions = useMemo(
    () => extractImageDimensions(recordMap),
    [recordMap]
  );

  return (
    <ImageDimensionsProvider dimensions={imageDimensions}>
      <NotionRenderer
        pageTitle={false}
        disableHeader={true}
        recordMap={recordMap}
        fullPage={true}
        darkMode={isDarkMode}
        className="notion-container"
        components={{
          nextLink: Link,
          nextImage: OptimizedNotionImage,
          Code,
          Equation,
          Modal,
          Pdf,
          Collection: () => null,
        }}
      />
    </ImageDimensionsProvider>
  );
};

export default PostRenderer;
