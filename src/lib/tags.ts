import { Post } from "@/types";

export function calculateTagCounts(posts: Post[]) {
  return posts.reduce((acc: Record<string, number>, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
}
