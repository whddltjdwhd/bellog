import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import fs from "fs/promises";
import path from "path";

interface MDXImageProps {
  src: string;
  alt: string;
}

interface ImageMetadata {
  width: number;
  height: number;
  blurDataURL?: string;
}

// This function can be used with getStaticProps or in a Server Component
export async function getImageMetadata(src: string): Promise<ImageMetadata> {
  try {
    const imagePath = path.join(process.cwd(), "public", src);
    const buffer = await fs.readFile(imagePath);

    // Get image dimensions and optional blur placeholder
    const { metadata, base64 } = await getPlaiceholder(buffer);

    return {
      width: metadata.width,
      height: metadata.height,
      blurDataURL: base64,
    };
  } catch (error) {
    console.error(`Error processing image ${src}:`, error);
    return { width: 700, height: 475 };
  }
}

// For use in Server Components (App Router)
export default async function MDXImage({ src, alt }: MDXImageProps) {
  const imageMetadata = await getImageMetadata(src);

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={imageMetadata.width}
      height={imageMetadata.height}
      placeholder={imageMetadata.blurDataURL ? "blur" : "empty"}
      blurDataURL={imageMetadata.blurDataURL}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
      className="rounded-[10px]"
    />
  );
}
