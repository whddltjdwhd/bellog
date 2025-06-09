import { getPosts } from "@/lib/posts";
import PostNavigationWrapper from "@/components/PostNavigationWrapper";

interface TemplateProps {
  children: React.ReactNode;
}

export default async function Template({ children }: TemplateProps) {
  const posts = await getPosts();
  return (
    <>
      <article className="mdx-content">{children}</article>
      <PostNavigationWrapper posts={posts} />
    </>
  );
}
