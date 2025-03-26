import { PostData } from "@/types";
import Link from "next/link";
import React from "react";

export default function PostList({ posts }: { posts: PostData[] }) {
  console.log(posts);
  return (
    <ol>
      {posts.map(({ slug, title, publishDate }) => (
        <li key={slug}>
          <h2>
            <Link href={`/${slug}`}>{title}</Link>
          </h2>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(publishDate).toLocaleDateString()}{" "}
            <strong>Categories:</strong>{" "}
          </p>
        </li>
      ))}
    </ol>
  );
}
