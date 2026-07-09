"use client";

import { useEffect, useState } from "react";

/**
 * ToTop (Design.md §4·§5) — 우하단 48px 원형 FAB.
 * 스크롤 후 등장(.show), 클릭 시 최상단 이동. hover 시 --p1.
 * prefers-reduced-motion이면 즉시 이동(스무스 스크롤 미적용).
 */
type ToTopProps = {
  /** 등장 임계값(px) */
  threshold?: number;
};

export default function ToTop({ threshold = 480 }: ToTopProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const toTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      className={`to-top${show ? " show" : ""}`}
      aria-label="맨 위로 이동"
      onClick={toTop}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
