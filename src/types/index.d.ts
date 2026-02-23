export type PostStatus = "draft" | "published" | "archived";

export interface Post {
  id: string;
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
  status: PostStatus;
}

export interface TagProps {
  tagName: string;
  variant?: "large" | "small";
  selected?: boolean;
  counts: number;
}

export type headerDepth = 1 | 2 | 3;

export interface Section {
  id: string;
  text: string;
  depth: headerDepth;
}
