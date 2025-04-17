import React from "react";
import Link from "next/link";
import Tag from "@/components/Tag";
import { PostData } from "@/types";

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li>
      <Link
        href={`/${post.slug}`}
        className="flex flex-col md:flex-row items-start md:items-center justify-between
                   rounded-2xl max-w-full p-3 md:p-4 transition-all duration-150
                   hover:bg-[var(--border)]"
      >
        <div className="flex w-full md:w-5/6 items-center">
          {post.emoji && (
            <span
              aria-hidden
              className="mr-2 md:mr-4 text-3xl md:text-4xl lg:text-5xl"
            >
              {post.emoji}
            </span>
          )}

          <div className="flex flex-col flex-1 min-w-0">
            <h2
              className="truncate font-bold text-[var(--text)]
                           text-xl md:text-2xl lg:text-3xl"
            >
              {post.title}
            </h2>

            <span
              className="truncate mt-1 text-sm md:text-base lg:text-lg
                              text-[var(--text)]"
            >
              {post.preview}
            </span>
          </div>
        </div>

        <div
          className="flex w-full md:w-auto flex-row md:flex-col
                        items-start md:items-end gap-1 md:gap-2 mt-2 md:mt-0
                        justify-between md:justify-start"
        >
          <p
            className="text-[10px] md:text-xs lg:text-[11px]
                        text-[var(--text)]"
          >
            {post.date.slice(2)}
          </p>
          <Tag tagName={post.tag} />
        </div>
      </Link>
    </li>
  );
}
