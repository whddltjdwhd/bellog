import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPosts() {
  const postsDirectory = path.join(process.cwd(), "src/app/posts");
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        emoji: data.emoji || "",
        title: data.title || slug,
        date: data.date || "",
        preview: data.preview || content.slice(0, 80),
        tag: data.tag || "",
      };
    });
}
