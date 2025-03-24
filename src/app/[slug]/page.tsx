import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Metadata } from "next";

interface PostData {
  emoji: string;
  title: string;
  date?: string;
  preview: string;
  tag: string;
  contentHtml: string;
}

interface PageProps {
  params: { slug: string };
}

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export async function generateStaticParams() {
  const filenames = fs.readdirSync(postsDirectory);
  const slugs = filenames.map((filename) => filename.replace(/\.md$/, ""));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const postData = await getPostData(slug);
  return {
    title: postData.title,
    description:
      postData.preview ||
      (postData.date ? `게시 날짜: ${postData.date}` : "블로그 포스트"),
  };
}

async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    emoji: data.emoji || "",
    title: data.title || slug,
    date: data.date,
    preview: data.preview || "",
    tag: data.tag || "",
    contentHtml,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const postData = await getPostData(slug);

  return (
    <article>
      <h1>
        {postData.emoji} {postData.title}
      </h1>
      {postData.date && <p>{postData.date}</p>}
      <p>{postData.preview}</p>
      <p>Tag: {postData.tag}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}
