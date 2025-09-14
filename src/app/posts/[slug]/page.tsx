import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import GiscusComments from "@/components/posts/GiscusComments";
import PostNavigation from "@/components/posts/PostNavigation";
import { getAdjacentPosts, getPostBySlug, getAllPosts } from "@/lib/posts";
import { useMDXComponents } from "@/mdx-components";
import MDXToc from "@/components/mdx/MDXToc";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { prev, next } = await getAdjacentPosts(slug);
  const components = useMDXComponents({});

  return (
    <article className="w-full flex flex-col justify-center items-center">
      <section className="relative w-full max-w-[1300px] grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="hidden md:block md:col-span-2"></div>
        <main className="py-8 px-4 md:col-span-8">
          <header className="w-full mb-8">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500">{post.date}</p>
            <div className="flex gap-2 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="prose dark:prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
          <PostNavigation prev={prev} next={next} />
          <GiscusComments />
        </main>
        <aside className="hidden md:block md:col-span-2 sticky top-20 h-fit py-8 pr-3">
          <MDXToc content={post.content} />
        </aside>
      </section>
    </article>
  );
}
