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
  fill?: boolean;
  preload?: boolean;
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
  fill = false,
  preload = false,
}: OptimizedNotionImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Try to get dimensions from context
  const contextDimensions = useImageDimensions(src);

  // react-notion-x 8.x는 페이지 아이콘, 페이지 커버, 북마크 아이콘과 커버를 fill 모드로 넘긴다.
  // 크기는 부모 컨테이너(.notion-page-icon-inline, .notion-bookmark-image 등)가 정하므로
  // 래퍼 없이 7.x 때와 같은 <img>만 그린다. 북마크 이미지는 호스트가 제각각이라 next/image를 쓰지 않는다.
  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className || undefined}
        style={style}
        loading={priority || preload ? "eager" : loading}
        decoding="async"
      />
    );
  }

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
