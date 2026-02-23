import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <h1 className="text-6xl font-bold font-heading text-foreground">404</h1>
      <p className="text-lg text-muted-foreground">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
