import { ExtendedRecordMap } from "notion-types";

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio?: number;
}

/**
 * Extract image dimensions from Notion recordMap
 * Returns a Map of image URL -> dimensions
 */
export function extractImageDimensions(
  recordMap: ExtendedRecordMap
): Map<string, ImageDimensions> {
  const dimensionsMap = new Map<string, ImageDimensions>();

  if (!recordMap.block) {
    return dimensionsMap;
  }

  // Iterate through all blocks
  Object.values(recordMap.block).forEach((blockWrapper) => {
    const block = blockWrapper?.value;

    if (!block || block.type !== "image") {
      return;
    }

    // Extract image URL
    const source = block.properties?.source;
    let imageUrl: string | undefined;

    if (Array.isArray(source) && source[0] && Array.isArray(source[0])) {
      imageUrl = source[0][0];
    }

    if (!imageUrl) {
      return;
    }

    // Extract dimensions from format
    const format = block.format;
    if (!format) {
      return;
    }

    const width = format.block_width;
    const height = format.block_height;
    const aspectRatio = format.block_aspect_ratio;

    // If we have explicit width and height
    if (width && height) {
      dimensionsMap.set(imageUrl, {
        width,
        height,
        aspectRatio,
      });
      return;
    }

    // If we have aspect ratio, calculate dimensions
    if (aspectRatio && width) {
      dimensionsMap.set(imageUrl, {
        width,
        height: Math.round(width / aspectRatio),
        aspectRatio,
      });
      return;
    }

    // If we only have aspect ratio
    if (aspectRatio) {
      // Use a standard width (e.g., 1200px)
      const standardWidth = 1200;
      dimensionsMap.set(imageUrl, {
        width: standardWidth,
        height: Math.round(standardWidth / aspectRatio),
        aspectRatio,
      });
    }
  });

  return dimensionsMap;
}
