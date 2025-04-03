import Intro from "@/components/Intro";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();
  const slicedPosts = posts.slice(0, 5);

  return (
    <div className="flex flex-col justify-between items-center gap-[10px] w-full">
      <Intro />
      <div className="w-full">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl pb-5">
            Recent Posts
          </h1>
        </div>
        <PostList posts={slicedPosts} />
      </div>
    </div>
  );
}
