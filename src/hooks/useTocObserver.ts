import { useEffect, useState } from 'react';
import { Section } from '@/types';

const SCROLL_MARGIN = 90;

export const useTocObserver = (headings: Section[]) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${SCROLL_MARGIN}px 0px -80% 0px`,
        threshold: 0.1,
      }
    );

    const elements = headings.map(section => document.getElementById(section.id)).filter((el): el is HTMLElement => el !== null);

    elements.forEach((element) => {
        observer.observe(element);
    });

    return () => {
        elements.forEach((element) => {
            observer.unobserve(element);
        });
        observer.disconnect();
    };
  }, [headings]);

  return activeId;
};
