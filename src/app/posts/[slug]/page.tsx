import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import PostNavigation from "@/components/posts/PostNavigation";
import GiscusComments from "@/components/posts/GiscusComments";
import PostRenderer from "@/components/posts/PostRenderer";
import NotionToc from "@/components/posts/NotionToc";
import ScrollProgress from "@/components/common/ProgressBar";
import { getPostRecordMap } from "@/lib/notion";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // 1. Slug로 현재 포스트 정보만 빠르게 fetch
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // 2. 이전/다음 포스트 구성을 위해 전체 목록 fetch 및 인덱스 찾기
  const allPosts = await getAllPosts();
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const prevPost =
    postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  // 3. 포스트 내용(recordMap) fetch
  const recordMap = await getPostRecordMap(post.id);

  return (
    <article className="w-full flex flex-col justify-center items-center">
      <ScrollProgress />
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
          <PostRenderer recordMap={recordMap} />
          <PostNavigation prev={prevPost} next={nextPost} />
          <GiscusComments />
        </main>
        <aside className="hidden md:block md:col-span-2 sticky top-20 h-fit py-8 pr-3">
          <NotionToc recordMap={recordMap} />
        </aside>
      </section>
    </article>
  );
}
