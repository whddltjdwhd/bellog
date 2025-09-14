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

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  websiteUrl: string;
  githubUrl: string;
  techStack: string[];
  emoji: string;
  image: string;
}

export interface TagProps {
  tagName: string;
  variant?: "large" | "small";
  selected?: boolean;
  counts: number;
}

export interface AdjacentPosts {
  prev: Post | null;
  next: Post | null;
}

export type headerDepth = 1 | 2 | 3;

export interface Section {
  id: string;
  text: string;
  depth: headerDepth;
}
