import Footer from "@/components/common/Footer";
import Intro from "@/components/common/Intro";
import PostList from "@/components/posts/PostList";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();
  const slicedPosts = posts.slice(0, 5);

  return (
    <div className="flex flex-col justify-between items-center gap-[10px] w-full max-w-[1010px]">
      <Intro />
      <div className="w-full px-4">
        <div className="w-full pt-7 mb-4 border-b-1 border-[var(--border)]">
          <h1 className="text-foreground sm:text-2xl md:text-3xl pb-5 ">
            Recent Posts
          </h1>
        </div>
        <PostList posts={slicedPosts} />
        <Footer />
      </div>
    </div>
  );
}
