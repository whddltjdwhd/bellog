import Footer from "@/components/common/Footer";
import PostList from "@/components/posts/PostList";
import TagList from "@/components/ui/TagList";
import { getPosts } from "@/lib/posts";
import { calculateTagCounts } from "@/lib/tags";

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

  const tagCounts = calculateTagCounts(posts);

  const tagsWithCounts = tags.map((tag) => ({
    tagName: tag,
    counts: Number(tagCounts[tag]) || 0,
  }));

  return (
    <div className="w-full max-w-[1010px] flex flex-col gap-[5px] mt-[30px]">
      <TagList tags={tagsWithCounts} />
      <PostList posts={filteredPosts} />
      <Footer />
    </div>
  );
}
