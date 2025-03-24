"use client";
import React from "react";
import Link from "next/link";
import Tag from "@/components/Tag";
import { useSearchParams } from "next/navigation";

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Link href={`/posts`}>
        <Tag tagName="ALL" variant="large" selected={!selectedTag} />
      </Link>
      {tags.map((tag) => (
        <Link key={tag} href={`/posts?tag=${encodeURIComponent(tag)}`}>
          <Tag tagName={tag} variant="large" selected={selectedTag === tag} />
        </Link>
      ))}
    </div>
  );
}
