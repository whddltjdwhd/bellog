import { Post } from "@/types";
import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
      {posts.map((post: Post, index: number) => (
        <PostCard key={index} post={post} />
      ))}
    </ul>
  );
}
