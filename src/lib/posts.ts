import { Post } from "@/types";
import { cache } from "react";

import { getAllPostsFromNotion, getPostRecordMap } from "./notion";

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const posts = await getAllPostsFromNotion();

  return posts;
});

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  const recordMap = await getPostRecordMap(post.id);

  return {
    ...post,
    recordMap,
  };
}


