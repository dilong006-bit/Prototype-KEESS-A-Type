"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * PageDots (Design.md §4) — 우측 세로 도트 네비게이션(홈 4필러).
 * 각 도트는 섹션 앵커로 스크롤. 현재 뷰포트 섹션을 active 표시.
 * ≤1040 숨김(CSS). accent는 active 색(--ac).
 */
export type Dot = { anchor: string; label: string };

type PageDotsProps = {
  dots: Dot[];
  accent?: string;
};

export default function PageDots({ dots, accent = "#2E1A6B" }: PageDotsProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = dots
      .map((d) => document.querySelector<HTMLElement>(d.anchor))
      .filter((el): el is HTMLElement => el != null);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dots]);

  const go = (anchor: string) => {
    const el = document.querySelector<HTMLElement>(anchor);
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="pdots" style={{ "--ac": accent } as CSSProperties}>
      {dots.map((d) => (
        <button
          key={d.anchor}
          className={active === d.anchor ? "active" : undefined}
          aria-label={d.label}
          aria-current={active === d.anchor ? "true" : undefined}
          onClick={() => go(d.anchor)}
        />
      ))}
    </div>
  );
}
