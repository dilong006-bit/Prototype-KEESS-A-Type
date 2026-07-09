"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND, NAV_ITEMS, NAV_CTA, type NavItem } from "@/data/site";

/**
 * Nav + MobileMenu (Design.md §4·§5) — 홈 canonical 이식.
 * - fixed 72px, 스크롤 시 `.solid`(배경·보더 페이드) 전환.
 * - 데스크톱 메뉴 + 우측 CTA / ≤940 햄버거 → 풀스크린 .mmenu 오버레이.
 * - a11y: 햄버거 aria-expanded, 메뉴 열릴 때 body 스크롤 잠금, ESC 닫기.
 *
 * linkMode: "anchor"(홈, #p1..) | "route"(필러 페이지, /ax-ai..).
 * solidByDefault: 다크 히어로가 없는 페이지는 처음부터 solid.
 */
type NavProps = {
  items?: NavItem[];
  linkMode?: "anchor" | "route";
  solidByDefault?: boolean;
  /** 스크롤 solid 전환 임계값(px) */
  threshold?: number;
  /** 현재 페이지(라우트 slug, 예: "ax-ai") — 해당 메뉴 항목 활성 표시 */
  current?: string;
  /** CTA 클릭(모달 오픈 등). 미지정 시 data-scroll 앵커 버튼 */
  onCtaClick?: () => void;
};

export default function Nav({
  items = NAV_ITEMS,
  linkMode = "anchor",
  solidByDefault = false,
  threshold = 40,
  current,
  onCtaClick,
}: NavProps) {
  const [solid, setSolid] = useState(solidByDefault);
  const [open, setOpen] = useState(false);
  const hambRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (solidByDefault) return;
    const onScroll = () => setSolid(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solidByDefault, threshold]);

  // 모바일 메뉴 열림: body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        hambRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const href = (it: NavItem) => (linkMode === "route" ? it.route : it.anchor);
  const isCurrent = (it: NavItem) =>
    current != null && it.route === `/${current}`;

  const Cta = ({ mobile = false }: { mobile?: boolean }) =>
    onCtaClick ? (
      <button
        className={mobile ? "btn btn-ink" : "btn btn-glass nav-cta"}
        onClick={() => {
          setOpen(false);
          onCtaClick();
        }}
      >
        {NAV_CTA.label}
      </button>
    ) : (
      <a
        className={mobile ? "btn btn-ink" : "btn btn-glass nav-cta"}
        href={NAV_CTA.target}
        onClick={() => setOpen(false)}
      >
        {NAV_CTA.label}
      </a>
    );

  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`}>
        <div className="wrap nav-in">
          <a className="logo" href="/">
            {BRAND}
          </a>
          <nav className="menu" aria-label="주요 메뉴">
            {items.map((it) => (
              <a
                key={it.label}
                href={href(it)}
                aria-current={isCurrent(it) ? "page" : undefined}
              >
                {it.label}
              </a>
            ))}
          </nav>
          <Cta />
          <button
            ref={hambRef}
            className="hamb"
            aria-label="메뉴"
            aria-expanded={open}
            aria-controls="mmenu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav
        id="mmenu"
        className={`mmenu${open ? " open" : ""}`}
        aria-label="모바일 메뉴"
        aria-hidden={!open}
      >
        {items.map((it) => (
          <a
            key={it.label}
            href={href(it)}
            aria-current={isCurrent(it) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {it.label}
          </a>
        ))}
        <Cta mobile />
      </nav>
    </>
  );
}
