"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Giscus from "@giscus/react";

export default function GiscusComments() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-32" />; // 로딩 중 placeholder
  }

  return (
    <div className="mt-8">
      <Giscus
        id="comments"
        repo="whddltjdwhd/bellogComments" // 여기에 실제 레포지토리 정보 입력
        repoId="R_kgDOO4u0wA" // GitHub에서 가져온 실제 repo ID
        category="General"
        categoryId="DIC_kwDOO4u0wM4CrP29" // GitHub에서 가져온 실제 category ID
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
