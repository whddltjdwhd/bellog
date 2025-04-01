import { PostData } from "@/types";
import { readdir } from "fs/promises";
import path from "path";

export async function getPosts(): Promise<PostData[]> {
  // MDX 파일들이 위치한 디렉토리
  const postsDir = path.join(process.cwd(), "src", "app", "(contents)");

  // 각 포스트 디렉토리 조회
  const slugs = (await readdir(postsDir, { withFileTypes: true })).filter(
    (dirent) => dirent.isDirectory()
  );

  // 각 MDX 파일에서 metadata를 추출한 후 PostData 형태로 매핑
  const posts = await Promise.all(
    slugs.map(async (dirent) => {
      const { meta } = await import(
        `../app/(contents)/${dirent.name}/page.mdx`
      );

      return {
        slug: dirent.name,
        emoji: meta.emoji || "",
        title: meta.title || "",
        date: meta.date || meta.publishDate || "",
        preview: meta.preview || "",
        tag: meta.tag || "",
      } as PostData;
    })
  );

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return posts;
}
