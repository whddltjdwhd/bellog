import { PostData } from "@/types";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";

export async function getPosts(): Promise<PostData[]> {
  const dirents = await readdir("./src/app/(posts)", { withFileTypes: true });
  const slugs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = `./src/app/(posts)/${slug}/page.mdx`;
      const fileContent = await readFile(filePath, "utf-8");
      const { data: metadata } = matter(fileContent);
      return { slug, ...metadata } as PostData;
    })
  );

  posts.sort(
    (a: PostData, b: PostData) => +new Date(b.date) - +new Date(a.date)
  );

  return posts;
}
