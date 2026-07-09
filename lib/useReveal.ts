"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll Reveal 표준 (Design.md §6).
 * 확정 원본의 IntersectionObserver({threshold:.16}) 1회(unobserve) 패턴을 이식.
 * - 대상 요소는 `.r`(단일) 또는 `.stagger`(자식 순차) 클래스를 가진다.
 * - 뷰포트 진입 시 `.in`을 부여 → CSS transition으로 등장.
 * - prefers-reduced-motion 이면 즉시 `.in`(모션 없이 표시).
 *
 * 반환된 ref를 스코프 루트(예: 페이지/섹션)에 부착하면 그 하위의
 * `.r`/`.stagger` 요소를 자동 관찰한다. (root 미지정 시 document 기준)
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const scope: ParentNode = rootRef.current ?? document;
    const targets = Array.from(
      scope.querySelectorAll<HTMLElement>(
        ".r, .stagger, .lines, .midrule, .manifesto",
      ),
    );
    if (targets.length === 0) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return rootRef;
}
