import { Post } from "@/types";
import { cache } from "react";
import { unstable_cache } from "next/cache";

import { getAllPostsFromNotion, getPostBySlugFromNotion } from "./notion";

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


