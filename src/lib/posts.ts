import { Post } from "@/types";
import { cache } from "react";

import { getAllPostsFromNotion, getPostBySlugFromNotion } from "./notion";

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const posts = await getAllPostsFromNotion();

  return posts;
});

export async function getPostBySlug(slug: string) {
  const post = await getPostBySlugFromNotion(slug);

  return post;
}


