export interface PostData {
  slug: string;
  emoji: string;
  title: string;
  date: string;
  preview: string;
  tag: string;
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

export type headerDepth = 1 | 2 | 3;

export interface Section {
  id: string;
  top: number;
  bottom: number;
  depth: headerDepth;
}
