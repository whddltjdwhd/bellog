import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostCard from "@/components/PostCard";

interface Post {
  slug: string;
  emoji: string;
  title: string;
  date?: string;
  preview: string;
  tag: string;
}

export default async function PostsPage() {
  const postsDirectory = path.join(process.cwd(), "src/app/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts: Post[] = filenames
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

  return (
    <main className="flex flex-col w-full p-5">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold">ALL Posts</h1>
      </div>
      <ul className="flex flex-col gap-6 w-full">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </main>
  );
}
