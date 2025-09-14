import React from "react";
import Link from "next/link";
import { Post } from "@/types";
import Tag from "../ui/Tag";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li>
      <Link
        href={`/posts/${post.slug}`}
        className="flex flex-col md:flex-row items-start md:items-center justify-between
                   rounded-2xl max-w-full p-3 md:p-4 transition-all duration-150
                   hover:bg-[var(--border)]"
      >
        <div className="flex w-full md:w-5/6 items-center">
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
              {post.description}
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
            {post.date}
          </p>
          <div className="flex gap-1">
            {post.tags.map(tag => (
              <Tag key={tag} tagName={tag} counts={-1} />
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
}
