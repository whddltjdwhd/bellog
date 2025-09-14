import { Post } from "@/types";

import { getAllPostsFromNotion, getPostRecordMap } from "./notion";

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getAllPostsFromNotion();

  return posts;
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPostsFromNotion();
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

export async function getAdjacentPosts(currentSlug: string): Promise<{
  prev: Post | null;
  next: Post | null;
}> {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}
