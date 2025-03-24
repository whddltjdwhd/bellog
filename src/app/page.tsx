import Intro from "@/components/Intro";
import RecentPosts from "@/components/RecentPosts";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center gap-[10px] w-full">
      <Intro />
      <RecentPosts />
    </div>
  );
}
