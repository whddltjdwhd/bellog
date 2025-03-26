import PostCard from "@/components/PostCard";
import TagList from "@/components/TagList";
import { getPosts } from "./utils";
import { Post } from "@/types";

interface PostsPageProps {
  searchParams: { tag?: string };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const posts: Post[] = getPosts();

  const tag = await searchParams?.tag;

  const uniqueTags = Array.from(
    new Set(posts.map((post) => post.tag).filter((tag) => tag !== ""))
  );

  const filteredPosts = tag ? posts.filter((post) => post.tag === tag) : posts;

  return (
    <main className="flex flex-col w-full p-5">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold">Posts</h1>
      </div>
      {uniqueTags.length > 0 && <TagList tags={uniqueTags} />}
      <ul className="flex flex-col gap-6 w-full">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </main>
  );
}
