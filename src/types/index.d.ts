export interface PostData {
  slug: string;
  title: string;
  publishDate: string;
  categories: string[];
}

interface Post {
  slug: string;
  emoji: string;
  title: string;
  date: string;
  preview: string;
  tag: string;
}
