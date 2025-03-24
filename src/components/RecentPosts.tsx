import { getPosts } from "@/app/posts/utils";
import { Post } from "@/types";
import React from "react";
import PostCard from "@/components/PostCard";

export default function RecentPosts() {
  const posts: Post[] = getPosts();

  const sortedPosts = posts.sort(
    (a: Post, b: Post) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentPosts = sortedPosts.slice(0, 5);

  return (
    <div className="flex flex-col justify-items-center w-full">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <ul className="flex flex-col gap-6 w-full">
        {recentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
