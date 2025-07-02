import MiddleFooter from "@/components/common/MiddleFooter";
import GiscusComments from "@/components/posts/GiscusComments";
import PostNavigationWrapper from "@/components/posts/PostNavigationWrapper";
import { getPosts } from "@/lib/posts";

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
