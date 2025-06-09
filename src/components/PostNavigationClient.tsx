"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PostData } from "@/types";
import PostNavigation from "./PostNavigation";

export default function PostNavigationClient() {
  const pathname = usePathname();
  const [adjacentPosts, setAdjacentPosts] = useState<{
    prev: PostData | null;
    next: PostData | null;
  }>({ prev: null, next: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = pathname.split("/").pop();

    if (slug && slug !== "" && slug !== "contents") {
      fetch(`/api/posts/${slug}/adjacent`)
        .then((res) => res.json())
        .then((data) => {
          setAdjacentPosts(data);
          setLoading(false);
        })
        .catch(() => {
          setAdjacentPosts({ prev: null, next: null });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [pathname]);

  if (loading) {
    return null;
  }

  return <PostNavigation prev={adjacentPosts.prev} next={adjacentPosts.next} />;
}
