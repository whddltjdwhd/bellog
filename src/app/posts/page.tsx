import PostList from "@/components/PostList";
import TagList from "@/components/TagList";

import { getPosts } from "@/lib/posts";
import React from "react";

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const posts = await getPosts();
  const tags = Array.from(new Set(posts.map((post) => post.tag)));

  const filteredPosts = params.tag
    ? posts.filter((post) => post.tag === params.tag)
    : posts;

  return (
    <div className="w-full flex flex-col gap-[5px] mt-[30px]">
      <TagList tags={tags} />
      <PostList posts={filteredPosts} />
    </div>
  );
}
