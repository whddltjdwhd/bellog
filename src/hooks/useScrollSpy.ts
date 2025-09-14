import { useEffect, useRef, useState, useCallback } from "react";

interface HeadingElementPosition {
  id: string;
  top: number;
}

const useScrollSpy = () => {
  const hElementPositions = useRef<HeadingElementPosition[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const getHTagPositions = useCallback(() => {
    // NotionRenderer가 렌더링하는 헤딩 요소는 .notion-h 클래스를 가집니다.
    // 각 헤딩 요소의 data-id 속성에서 id를 가져옵니다.
    const headers = Array.from(
      document.querySelectorAll<HTMLElement>(".notion-h")
    ).filter((header) => header.dataset.id);

    hElementPositions.current = headers.map((header) => ({
      id: header.dataset.id as string,
      top: header.offsetTop,
    }));
  }, []);

  const handleScroll = useCallback(() => {
    getHTagPositions(); // 스크롤 시 헤딩 위치를 다시 계산
    const scrollY = window.scrollY;
    let currentActiveId = "";

    // 헤딩 요소가 없으면 activeId를 비웁니다.
    if (hElementPositions.current.length === 0) {
      setActiveId("");
      return;
    }

    // 현재 스크롤 위치에 따라 활성 헤딩을 찾습니다.
    for (let i = 0; i < hElementPositions.current.length; i++) {
      const { id, top } = hElementPositions.current[i];
      // 헤딩의 상단 위치가 현재 스크롤 위치보다 작거나 같으면 활성 후보
      // 80px는 고정 헤더나 상단 여백을 고려한 값입니다.
      if (scrollY >= top - 80) {
        currentActiveId = id;
      } else {
        // 이미 현재 스크롤 위치를 넘어선 헤딩이므로, 이전 헤딩이 활성
        break;
      }
    }
    setActiveId(currentActiveId);
  }, [getHTagPositions]);

  useEffect(() => {
    // 컴포넌트 마운트 시 초기 헤딩 위치 설정 및 스크롤 이벤트 리스너 등록
    getHTagPositions();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // 리사이즈 시에도 위치 재계산

    // 클린업 함수
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [getHTagPositions, handleScroll]);

  return activeId;
};

export default useScrollSpy;
