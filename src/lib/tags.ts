import { PostData } from "@/types";

export function calculateTagCounts(posts: PostData[]) {
  return posts.reduce((acc: Record<string, number>, post) => {
    acc[post.tag] = (acc[post.tag] || 0) + 1;
    return acc;
  }, {});
}
