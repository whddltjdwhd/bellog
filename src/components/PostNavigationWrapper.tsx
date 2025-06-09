"use client";

import { usePathname } from "next/navigation";
import PostNavigation from "./PostNavigation";
import { PostData } from "@/types";

interface PostNavigationWrapperProps {
  posts: PostData[];
}

export default function PostNavigationWrapper({
  posts,
}: PostNavigationWrapperProps) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "";

  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return <PostNavigation prev={prev} next={next} />;
}
