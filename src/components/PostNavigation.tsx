import Link from "next/link";
import { PostData } from "@/types";

interface PostNavigationProps {
  prev: PostData | null;
  next: PostData | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-[var(--border)]">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {prev ? (
          <Link
            href={`/${prev.slug}`}
            className="group flex-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              이전 글
            </div>
            <div className="flex items-center gap-2">
              <div>
                <h3 className="font-medium text-[var(--text)] text-sm sm:text-base md:text-lg group-hover:text-[var(--primary)] transition-colors break-keep">
                  {prev.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--accent)] mt-1 line-clamp-2 break-keep">
                  {prev.preview}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}

        {next ? (
          <Link
            href={`/${next.slug}`}
            className="group flex-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200 text-right"
          >
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              다음 글
            </div>
            <div className="flex items-center justify-end gap-2">
              <div>
                <h3 className="font-medium text-[var(--text)] text-sm sm:text-base md:text-lg group-hover:text-[var(--primary)] transition-colors break-keep">
                  {next.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--accent)] mt-1 line-clamp-2 break-keep">
                  {next.preview}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}
      </div>
    </nav>
  );
}
