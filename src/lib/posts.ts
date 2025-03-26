import { PostData } from "@/types";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";

export async function getPosts(): Promise<PostData[]> {
  // 게시물 라우트에서 슬러그 목록을 가져옵니다.
  const dirents = await readdir("./src/app/(posts)", { withFileTypes: true });
  const slugs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // MDX 파일에서 gray-matter를 이용해 메타데이터를 추출합니다.
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = `./src/app/(posts)/${slug}/page.mdx`;
      const fileContent = await readFile(filePath, "utf-8");
      const { data: metadata } = matter(fileContent);
      return { slug, ...metadata } as PostData;
    })
  );

  // 최신 순으로 정렬합니다.
  posts.sort(
    (a: PostData, b: PostData) =>
      +new Date(b.publishDate) - +new Date(a.publishDate)
  );

  return posts;
}
