"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PostData } from "@/types";

export default function PostNavigation() {
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

  if (loading || (!adjacentPosts.prev && !adjacentPosts.next)) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-[var(--border)]">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {adjacentPosts.prev ? (
          <Link
            href={`/${adjacentPosts.prev.slug}`}
            className="group flex-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              이전 글
            </div>
            <div className="flex items-center gap-2">
              <div>
                <h3 className="font-medium text-[var(--text)] text-sm sm:text-base md:text-lg group-hover:text-[var(--primary)] transition-colors break-keep">
                  {adjacentPosts.prev.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--accent)] mt-1 line-clamp-2 break-keep">
                  {adjacentPosts.prev.preview}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}

        {adjacentPosts.next ? (
          <Link
            href={`/${adjacentPosts.next.slug}`}
            className="group flex-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200 text-right"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              다음 글
            </div>
            <div className="flex items-center justify-end gap-2">
              <div>
                <h3 className="font-medium text-[var(--text)] text-sm sm:text-base md:text-lg group-hover:text-[var(--primary)] transition-colors break-keep">
                  {adjacentPosts.next.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--accent)] mt-1 line-clamp-2 break-keep">
                  {adjacentPosts.next.preview}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}
      </div>
    </nav>
  );
}
