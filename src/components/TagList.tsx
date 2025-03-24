import React from "react";
import Link from "next/link";
import Tag from "@/components/Tag";

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Link href={`/posts`}>
        <Tag tagName={"ALL"} variant="large" />
      </Link>
      {tags.map((tag) => (
        <Link key={tag} href={`/posts?tag=${encodeURIComponent(tag)}`}>
          <Tag tagName={tag} variant="large" />
        </Link>
      ))}
    </div>
  );
}
