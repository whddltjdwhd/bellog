import PostList from "@/components/PostList";
import TagList from "@/components/TagList";

import { getPosts } from "@/lib/posts";
import { getTags } from "@/lib/tags";
import React from "react";

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const posts = await getPosts();
  const tags = await getTags();

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
