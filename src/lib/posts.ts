import type { PostData } from "@/types";
import { readdir } from "fs/promises";

export async function getPosts(): Promise<PostData[]> {
  const dirents = await readdir("./src/app/(posts)", { withFileTypes: true });
  const slugs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const data = await import(`../app/(posts)/${slug}/page.mdx`);
      const metadata = data.meta;
      return { slug, ...metadata } as PostData;
    })
  );

  posts.sort(
    (a: PostData, b: PostData) => +new Date(b.date) - +new Date(a.date)
  );

  return posts;
}
