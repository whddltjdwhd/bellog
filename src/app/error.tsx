"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold font-heading text-foreground">
        문제가 발생했습니다
      </h1>
      <p className="text-lg text-muted-foreground">
        페이지를 불러오는 중 오류가 발생했습니다.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90"
      >
        다시 시도
      </button>
    </div>
  );
}
