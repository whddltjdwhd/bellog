import Footer from "@/components/common/Footer";
import PostList from "@/components/posts/PostList";
import TagList from "@/components/ui/TagList";
import { getAllPosts } from "@/lib/posts";
import { calculateTagCounts } from "@/lib/tags";

import React from "react";

interface PageProps {
  searchParams: { tag?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const { tag } = searchParams;
  const posts = await getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const filteredPosts = tag
    ? posts.filter((post) => post.tags.includes(tag))
    : posts;

  const tagCounts = calculateTagCounts(posts);

  const tagsWithCounts = allTags.map((tagName) => ({
    tagName,
    counts: Number(tagCounts[tagName]) || 0,
  }));

  return (
    <div className="w-full max-w-[1010px] flex flex-col gap-[5px] mt-[30px]">
      <TagList tags={tagsWithCounts} />
      <PostList posts={filteredPosts} />
      <Footer />
    </div>
  );
}
