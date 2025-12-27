"use client";

import { createContext, useContext } from "react";

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio?: number;
}

type ImageDimensionsMap = Map<string, ImageDimensions>;

const ImageDimensionsContext = createContext<ImageDimensionsMap>(new Map());

export function ImageDimensionsProvider({
  children,
  dimensions,
}: {
  children: React.ReactNode;
  dimensions: ImageDimensionsMap;
}) {
  return (
    <ImageDimensionsContext.Provider value={dimensions}>
      {children}
    </ImageDimensionsContext.Provider>
  );
}

export function useImageDimensions(src: string): ImageDimensions | undefined {
  const dimensionsMap = useContext(ImageDimensionsContext);

  // Try exact match first
  if (dimensionsMap.has(src)) {
    return dimensionsMap.get(src);
  }

  // Try to find by URL matching (handle different protocols or query params)
  for (const [url, dimensions] of dimensionsMap.entries()) {
    if (src.includes(url) || url.includes(src)) {
      return dimensions;
    }
  }

  return undefined;
}
