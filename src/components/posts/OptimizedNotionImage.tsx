"use client";

import Image from "next/image";
import { useState } from "react";
import { useImageDimensions } from "./ImageDimensionsContext";

interface OptimizedNotionImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

/**
 * Optimized image component for Notion content
 * Extracts dimensions from Notion blocks to prevent layout shift
 */
export function OptimizedNotionImage({
  src,
  alt = "",
  width: propWidth,
  height: propHeight,
  className = "",
  style,
  loading = "lazy",
  priority = false,
}: OptimizedNotionImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Try to get dimensions from context
  const contextDimensions = useImageDimensions(src);

  // Use prop dimensions first, then context dimensions
  const width = propWidth || contextDimensions?.width;
  const height = propHeight || contextDimensions?.height;
  const aspectRatio = contextDimensions?.aspectRatio;

  // Calculate CSS aspect ratio
  const cssAspectRatio = aspectRatio
    ? `${aspectRatio}`
    : width && height
    ? `${width} / ${height}`
    : undefined;

  // If we have dimensions, use Next.js Image with optimization
  if (width && height) {
    return (
      <div
        className={`notion-image-wrapper ${className}`}
        style={{
          ...style,
          position: "relative",
          width: "100%",
          aspectRatio: cssAspectRatio,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className={`notion-image ${isLoaded ? "loaded" : "loading"}`}
          style={{
            objectFit: "contain",
          }}
          onLoad={() => setIsLoaded(true)}
          loading={loading}
          priority={priority}
        />
      </div>
    );
  }

  // Fallback: use standard img tag with min-height
  return (
    <div
      className={`notion-image-wrapper ${className}`}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        minHeight: "200px",
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`notion-image ${isLoaded ? "loaded" : "loading"}`}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
        onLoad={() => setIsLoaded(true)}
        loading={loading}
      />
    </div>
  );
}
