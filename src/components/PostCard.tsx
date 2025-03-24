import React from "react";
import Link from "next/link";
import Tag from "@/components/Tag";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li>
      <Link
        href={`/${post.slug}`}
        className="flex justify-between items-center flex-wrap hover:bg-black/[.2] transition-all duration-100 rounded-2xl max-w-full"
      >
        <section className="p-[10px_20px] flex justify-between items-center w-full">
          {post.emoji && (
            <span className="text-5xl" aria-hidden="true">
              {post.emoji}
            </span>
          )}

          <div className="flex flex-col items-start max-w-[80%]">
            <h2 className="w-full text-3xl text-[#332C2C] font-bold truncate">
              {post.title}
            </h2>
            <span className="w-full mt-1 text-lg text-[#F6F4E2] truncate">
              {post.preview}
            </span>
          </div>

          <div className="flex flex-col items-end mt-4 md:mt-0 text-right w-[100px]">
            {post.date && <p className="text-sm text-[#F6F4E2]">{post.date}</p>}
            {post.tag && <Tag tagName={post.tag} />}
          </div>
        </section>
      </Link>
    </li>
  );
}
