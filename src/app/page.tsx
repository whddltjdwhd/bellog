import Intro from "@/components/Intro";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col justify-between items-center gap-[10px] w-full">
      <Intro />
      <PostList posts={posts} />
    </div>
  );
}
