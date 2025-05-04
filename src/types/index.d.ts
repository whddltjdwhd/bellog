export interface PostData {
  slug: string;
  emoji: string;
  title: string;
  date: string;
  preview: string;
  tag: string;
}

export interface TagProps {
  tagName: string;
  variant?: "large" | "small";
  selected?: boolean;
  counts: number;
}

export interface Section {
  id: string;
  top: number;
  bottom: number;
  depth: 1 | 2 | 3;
}
