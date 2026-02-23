"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Giscus from "@giscus/react";
import { GISCUS_CONFIG } from "@/constants/site";

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
        repo={GISCUS_CONFIG.repo}
        repoId={GISCUS_CONFIG.repoId}
        category={GISCUS_CONFIG.category}
        categoryId={GISCUS_CONFIG.categoryId}
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
