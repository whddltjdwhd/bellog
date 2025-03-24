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
    <main className="flex flex-col w-full p-5">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold">ALL Posts</h1>
      </div>
      <ul className="flex flex-col gap-6 w-full">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}`}
              className="flex justify-between items-center flex-wrap hover:bg-black/[.2] transition-all duration-100 rounded-2xl max-w-full"
            >
              <section className="p-[10px_20px] flex justify-between items-center w-full">
                {post.emoji && (
                  <span className="text-5xl" aria-hidden="true">
                    {post.emoji}
                  </span>
                )}

                <div className="flex flex-col items-start max-w-[80%]">
                  <h2 className="w-full text-3xl text-[#332C2C] font-bold truncate">
                    {post.title}
                  </h2>
                  <span className="w-full mt-1 text-lg text-[#F6F4E2] truncate">
                    {post.preview}
                  </span>
                </div>

                <div className="mt-4 md:mt-0 text-right">
                  {post.date && (
                    <p className="text-sm text-[#F6F4E2]">{post.date}</p>
                  )}
                  {post.tag && (
                    <p className="text-sm text-[#F6F4E2]">{post.tag}</p>
                  )}
                </div>
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
