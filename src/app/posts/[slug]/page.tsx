import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";

import { getAdjacentPosts, getPostBySlug, getAllPosts } from "@/lib/posts";
import MDXToc from "@/components/mdx/MDXToc";
import { getMDXComponents } from "@/mdx-components";
import PostNavigation from "@/components/posts/PostNavigation";
import GiscusComments from "@/components/posts/GiscusComments";

// Function to generate dynamic metadata for each post
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "게시물을 찾을 수 없습니다",
      description: "요청하신 게시물을 찾을 수 없습니다.",
    };
  }

  const title = post.title;
  const description = post.description;
  const postUrl = `https://www.castle-bell.site/posts/${slug}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: postUrl,
      type: "article",
      images: [
        {
          url: "https://www.castle-bell.site/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["https://www.castle-bell.site/og-image.png"],
    },
    alternates: {
      canonical: postUrl,
    },
    keywords: post.tags.join(", "),
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { prev, next } = await getAdjacentPosts(slug);
  const components = getMDXComponents({});

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
