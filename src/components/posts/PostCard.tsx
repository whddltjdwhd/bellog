import React from "react";
import Link from "next/link";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li className="break-inside-avoid">
      <Link
        href={`/posts/${post.slug}`}
        className="flex flex-col p-6 rounded-3xl bg-card border border-border/50 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-primary/20 hover:bg-accent/40 group"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
            <span>{post.date}</span>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[11px] font-medium border border-border/50 transition-colors hover:bg-secondary/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
