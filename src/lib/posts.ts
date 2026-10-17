import { Post } from "@/types";
import { cache } from "react";
import { unstable_cache } from "next/cache";

import {
  getAllPostsFromNotion,
  getPostBySlugFromNotion,
  getUnlistedPostBySlugFromNotion,
} from "./notion";

export const getAllPosts = cache(
  unstable_cache(
    async (): Promise<Post[]> => {
      const posts = await getAllPostsFromNotion();
      return posts;
    },
    ["all-posts"],
    {
      revalidate: 3600, // 1시간마다 갱신
      tags: ["notion"],
    }
  )
);

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    return unstable_cache(
      async () => {
        return await getPostBySlugFromNotion(slug);
      },
      [`post-${slug}`],
      {
        revalidate: 3600,
        tags: [`post-${slug}`, "notion"],
      }
    )();
  }
);

export const getUnlistedPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    return unstable_cache(
      async () => {
        return await getUnlistedPostBySlugFromNotion(slug);
      },
      [`unlisted-post-${slug}`],
      {
        revalidate: 3600,
        tags: [`post-${slug}`, "notion"],
      }
    )();
  }
);

export interface PostView {
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
}

export async function getPostView(slug: string): Promise<PostView | null> {
  const allPosts = await getAllPosts();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);

  if (postIndex !== -1) {
    return {
      post: allPosts[postIndex],
      nextPost: postIndex > 0 ? allPosts[postIndex - 1] : null,
      prevPost:
        postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null,
    };
  }

  // 목록에 없으면 unlisted 글인지 확인한다. 이웃 글은 붙이지 않는다.
  const unlistedPost = await getUnlistedPostBySlug(slug);
  if (!unlistedPost) {
    return null;
  }

  return { post: unlistedPost, prevPost: null, nextPost: null };
}
