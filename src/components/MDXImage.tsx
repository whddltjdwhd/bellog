import fs from "fs";
import sizeOf from "image-size";
import Image from "next/image";
import path from "path";
import { useMemo } from "react";

interface MDXImageProps {
  src: string;
  alt: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export default function MDXImage({ src, alt }: MDXImageProps) {
  const dimensions: ImageDimensions = useMemo(() => {
    // 클라이언트 측에서는 실행하지 않음
    if (typeof window !== "undefined") {
      return { width: 700, height: 475 }; // 기본값 설정
    }

    try {
      // public 폴더 내의 이미지 경로 구성
      const imagePath = path.join(process.cwd(), "public", src);

      // 파일이 존재하는지 확인
      if (!fs.existsSync(imagePath)) {
        console.warn(`Image not found: ${imagePath}`);
        return { width: 700, height: 475 }; // 이미지를 찾지 못한 경우 기본값 반환
      }

      // 파일을 바이너리로 읽기
      const buffer = fs.readFileSync(imagePath);

      // image-size를 사용하여 이미지 크기 계산
      const dimensions = sizeOf(buffer);

      return {
        width: dimensions.width || 700,
        height: dimensions.height || 475,
      };
    } catch (error) {
      console.error("Error getting image dimensions:", error);
      return { width: 700, height: 475 }; // 오류 발생 시 기본값 반환
    }
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
      className="rounded-[10px]"
    />
  );
}
