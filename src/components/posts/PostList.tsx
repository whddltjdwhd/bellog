import { PostData } from "@/types";
import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: PostData[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 w-full">
      {posts.map((post: PostData, index: number) => (
        <PostCard key={index} post={post} />
      ))}
    </ul>
  );
}
