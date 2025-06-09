import { getPosts } from "@/lib/posts";
import PostNavigationWrapper from "@/components/PostNavigationWrapper";
import GiscusComments from "@/components/GiscusComments";
import MiddleFooter from "@/components/MiddleFooter";

interface TemplateProps {
  children: React.ReactNode;
}

export default async function Template({ children }: TemplateProps) {
  const posts = await getPosts();
  return (
    <>
      <article className="mdx-content">{children}</article>
      <PostNavigationWrapper posts={posts} />
      <MiddleFooter />
      <GiscusComments />
    </>
  );
}
