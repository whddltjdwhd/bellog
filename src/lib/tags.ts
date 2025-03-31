import { getPosts } from "./posts";

export async function getTags() {
  const posts = await getPosts();
  return Array.from(new Set(posts.map((post) => post.tag)));
}
