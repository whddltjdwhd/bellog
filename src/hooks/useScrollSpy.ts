import { useEffect, useRef, useState, useCallback } from "react";
import { SCROLL_SPY_OFFSET } from "@/constants/ui";

interface HeadingElementPosition {
  id: string;
  top: number;
}

const useScrollSpy = () => {
  const hElementPositions = useRef<HeadingElementPosition[]>([]);
  const rafId = useRef<number>(0);
  const [activeId, setActiveId] = useState<string>("");

  const updatePositions = useCallback(() => {
    const headers = Array.from(
      document.querySelectorAll<HTMLElement>(".notion-h")
    ).filter((header) => header.dataset.id);

    hElementPositions.current = headers.map((header) => ({
      id: header.dataset.id as string,
      top: header.offsetTop,
    }));
  }, []);

  const computeActiveId = useCallback(() => {
    const scrollY = window.scrollY;
    let currentActiveId = "";

    if (hElementPositions.current.length === 0) {
      setActiveId("");
      return;
    }

    for (let i = 0; i < hElementPositions.current.length; i++) {
      const { id, top } = hElementPositions.current[i];
      if (scrollY >= top - SCROLL_SPY_OFFSET) {
        currentActiveId = id;
      } else {
        break;
      }
    }
    setActiveId(currentActiveId);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      computeActiveId();
      rafId.current = 0;
    });
  }, [computeActiveId]);

  const handleResize = useCallback(() => {
    updatePositions();
    computeActiveId();
  }, [updatePositions, computeActiveId]);

  useEffect(() => {
    updatePositions();
    computeActiveId();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updatePositions, computeActiveId, handleScroll, handleResize]);

  return activeId;
};

export default useScrollSpy;
