"use client";
import React from "react";
import Link from "next/link";
import Tag from "@/components/Tag";
import { useSearchParams } from "next/navigation";
import { TagProps } from "@/types";

interface TagListProps {
  tags: TagProps[];
}

export default function TagList({ tags }: TagListProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const totalPostsCount = tags.reduce((sum, tag) => sum + tag.counts, 0);

  return (
    <div className="mb-6 flex flex-wrap gap-2 px-2">
      <Link href={`/posts`}>
        <Tag
          tagName="ALL"
          variant="large"
          selected={!selectedTag}
          counts={totalPostsCount}
        />
      </Link>
      {tags.map(({ tagName, counts }) => (
        <Link key={tagName} href={`/posts?tag=${encodeURIComponent(tagName)}`}>
          <Tag
            tagName={tagName}
            variant="large"
            selected={selectedTag === tagName}
            counts={counts}
          />
        </Link>
      ))}
    </div>
  );
}
