"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * SubNav — 스크롤 임계 후 등장하는 서브 내비(섹션 스크롤스파이).
 * 공통 컴포넌트: 스타일은 styles/components.css(항상 로드).
 * items의 각 key는 대상 섹션 id. accent(기본 --ink)로 활성 pill 색 지정(필러 페이지는 --p2 등).
 */
export type SubNavItem = { key: string; label: string };

export default function SubNav({
  items,
  accent,
  showAfter = 560,
  offset = 100,
}: {
  items: SubNavItem[];
  accent?: string;
  showAfter?: number;
  offset?: number;
}) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > showAfter);
      let cur: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.key);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < 160 && r.bottom > 160) {
          cur = it.key;
          break;
        }
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, showAfter]);

  const goTo = (key: string) => {
    const el = document.getElementById(key);
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav
      className={`subnav${show ? " show" : ""}`}
      aria-label="섹션 바로가기"
      style={accent ? ({ "--subnav-ac": accent } as CSSProperties) : undefined}
    >
      <div className="wrap subnav-in">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            className={`subnav-link${active === it.key ? " on" : ""}`}
            aria-current={active === it.key ? "true" : undefined}
            onClick={() => goTo(it.key)}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
