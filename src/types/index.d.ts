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
