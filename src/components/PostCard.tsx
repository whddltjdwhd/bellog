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
        className="flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-black/[.2] transition-all duration-100 rounded-2xl max-w-full p-3 md:p-4"
      >
        <div className="flex items-center w-full md:w-5/6">
          {post.emoji && (
            <span
              className="text-3xl md:text-4xl lg:text-5xl mr-2 md:mr-4"
              aria-hidden="true"
            >
              {post.emoji}
            </span>
          )}

          <div className="flex flex-col flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-[#332C2C] font-bold truncate">
              {post.title}
            </h2>
            <span className="mt-1 text-sm md:text-base lg:text-lg text-[#F6F4E2] truncate">
              {post.preview}
            </span>
          </div>
        </div>

        <div className="flex w-full md:w-auto flex-row md:flex-col items-start md:items-end mt-2 md:mt-0 gap-1 md:gap-2 justify-between md:justify-start">
          <p className="text-[10px] md:text-xs lg:text-[11px] text-[#F6F4E2]">
            {post.date.slice(2)}
          </p>
          <Tag tagName={post.tag} />
        </div>
      </Link>
    </li>
  );
}
