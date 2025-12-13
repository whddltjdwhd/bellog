"use client";
import { useEffect, useState, useRef } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const isScheduled = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setProgress(0);
      } else {
        const scrolled = Math.min(
          100,
          Math.max(0, (scrollTop / docHeight) * 100)
        );
        setProgress(scrolled);
      }

      isScheduled.current = false;
    };

    const handleScroll = () => {
      if (!isScheduled.current) {
        isScheduled.current = true;
        rafId.current = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div
        style={{
          width: `${progress}%`,
        }}
        className="h-full bg-primary will-change-[width]"
      />
    </div>
  );
}
