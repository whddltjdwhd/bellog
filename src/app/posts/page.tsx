import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
    <div className="flex flex-col w-full ">
      <h1 className="flex justify-start items-center mb-4">ALL Posts</h1>
      <ul className="flex flex-col gap-4 w-full">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="hover:bg-black/[.1] transition-all duration-100 cursor-pointer w-full p-4 rounded-[20px]"
          >
            <Link href={`/${post.slug}`}>
              <h2 className="text-xl font-bold">
                {post.emoji && <span>{post.emoji} </span>}
                {post.title}
              </h2>
            </Link>
            {post.date && (
              <p className="text-sm text-gray-500">게시 날짜: {post.date}</p>
            )}
            <p className="mt-2 truncate">{post.preview}</p>
            {post.tag && <p className="mt-1 text-sm">{post.tag}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
